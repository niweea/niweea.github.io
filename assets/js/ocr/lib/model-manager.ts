/**
 * ModelManager — handles fetching, caching, and switching PP-OCR ONNX models.
 *
 * Cache strategy: Cache API (browser cache storage).
 * WASM runtime: served from jsDelivr CDN so no manual file copying is needed.
 */

import * as ort from 'onnxruntime-web';
import type { ModelManifest, ModelManifestEntry, ModelScale, OrtBackend, ProgressMessage } from '../../types';

// Local WASM runtime path served with the site — 100% version matched with node_modules
export const WASM_PATH = '/ort/';

export const MANIFEST_URL = '/models/ocr/manifest.json';

const CACHE_NAME = 'ppocr-models-v2';

// ── Fetch with progress reporting ────────────────────────────────────────────

type ProgressCallback = (loaded: number, total: number) => void;

async function doFetch(url: string): Promise<Response> {
  const fullUrl = url.startsWith('/')
    ? (typeof self !== 'undefined' && self.location ? self.location.origin + url : url)
    : url;

  try {
    const resp = await fetch(fullUrl);
    if (resp.ok) return resp;
  } catch (err) {
    console.warn(`[OCR ModelManager] Failed to fetch ${fullUrl}:`, err);
  }

  // Fallback to hf-mirror if huggingface.co fails
  if (url.includes('huggingface.co')) {
    const mirrorUrl = url.replace('huggingface.co', 'hf-mirror.com');
    console.info(`[OCR ModelManager] Retrying with mirror: ${mirrorUrl}`);
    const resp = await fetch(mirrorUrl);
    if (resp.ok) return resp;
  }

  throw new Error(`Failed to fetch ${url}`);
}

function isLfsPointer(buf: ArrayBuffer): boolean {
  if (buf.byteLength > 1024) return false;
  const str = new TextDecoder().decode(new Uint8Array(buf));
  return str.startsWith('version https://git-lfs') || str.includes('oid sha256:');
}

async function fetchWithProgress(url: string, onProgress: ProgressCallback): Promise<ArrayBuffer> {
  // Try cache first
  try {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(url);
    if (cached) {
      const buf = await cached.arrayBuffer();
      if (!isLfsPointer(buf)) {
        onProgress(buf.byteLength, buf.byteLength);
        return buf;
      }
      // If cached content is invalid LFS pointer, evict it
      await cache.delete(url);
    }
  } catch (err) {
    console.warn('[OCR ModelManager] Cache match error, continuing with network fetch:', err);
  }

  const resp = await doFetch(url);

  const contentLength = Number(resp.headers.get('content-length') ?? 0);
  const reader = resp.clone().body!.getReader();
  let loaded = 0;
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    onProgress(loaded, contentLength || loaded);
  }

  const total = chunks.reduce((s, c) => s + c.byteLength, 0);
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  // Store in cache for next time
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(url, new Response(merged.buffer, { headers: { 'content-type': 'application/octet-stream' } }));
  } catch (err) {
    console.warn('[OCR ModelManager] Failed to store in cache:', err);
  }

  return merged.buffer;
}

// ── Manifest loader ──────────────────────────────────────────────────────────

let manifest: ModelManifest | null = null;

export async function getManifest(): Promise<ModelManifest> {
  if (manifest) return manifest;
  const resp = await fetch(MANIFEST_URL);
  if (!resp.ok) throw new Error(`Cannot load model manifest: ${resp.status}`);
  manifest = await resp.json() as ModelManifest;
  return manifest;
}

export function parseDict(text: string): string[] {
  if (text.includes('character_dict:')) {
    const lines = text.split('\n');
    const dict: string[] = [];
    let inDict = false;
    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      if (!inDict) {
        if (line.trim() === 'character_dict:') {
          inDict = true;
        }
        continue;
      }
      // If line is indented and starts with '-'
      const match = line.match(/^\s*-\s*(.*)$/);
      if (match) {
        let val = match[1].trim();
        if (val.startsWith("'") && val.endsWith("'") && val.length >= 2) {
          val = val.slice(1, -1).replace(/''/g, "'");
        } else if (val.startsWith('"') && val.endsWith('"') && val.length >= 2) {
          try {
            val = JSON.parse(val);
          } catch {
            val = val.slice(1, -1);
          }
        }
        dict.push(val);
      } else if (line.trim() && !line.startsWith('#') && !line.startsWith(' ')) {
        // Exited character_dict section
        break;
      }
    }
    if (dict.length > 0) return dict;
  }
  return text.split('\n').map((l: string) => l.trim()).filter(Boolean);
}

// ── Main load function ────────────────────────────────────────────────────────

export interface LoadedModel {
  detSession: unknown;  // ort.InferenceSession
  recSession: unknown;
  dict: string[];
  entry: ModelManifestEntry;
}

type ProgressReporter = (msg: Omit<ProgressMessage, 'type'>) => void;

export async function loadModel(
  scale: ModelScale,
  backend: OrtBackend,
  reportProgress: ProgressReporter,
): Promise<LoadedModel> {
  // Configure WASM paths to same-origin /ort/ (with full origin resolution in worker)
  const wasmBase = typeof self !== 'undefined' && self.location ? self.location.origin + '/ort/' : '/ort/';
  ort.env.wasm.wasmPaths = wasmBase;
  ort.env.wasm.numThreads = 1; // Single thread to avoid SharedArrayBuffer requirement
  if (backend === 'webgpu') {
    ort.env.wasm.proxy = false;
  }

  const mf = await getManifest();
  const entry = mf[scale];
  if (!entry) throw new Error(`Unknown model scale: ${scale}`);

  // Download detection model
  const detBuf = await fetchWithProgress(entry.det, (loaded, total) => {
    reportProgress({
      stage: 'download_det',
      loaded,
      total: total || entry.detSizeBytes,
      percent: total ? (loaded / total) * 50 : 25, // 0–50%
      modelScale: scale,
    });
  });

  // Download recognition model
  const recBuf = await fetchWithProgress(entry.rec, (loaded, total) => {
    reportProgress({
      stage: 'download_rec',
      loaded,
      total: total || entry.recSizeBytes,
      percent: 50 + (total ? (loaded / total) * 40 : 20), // 50–90%
      modelScale: scale,
    });
  });

  // Create ONNX sessions with safe fallback
  reportProgress({ stage: 'init_session', loaded: 0, total: 1, percent: 90, modelScale: scale });

  let detSession: unknown;
  let recSession: unknown;

  if (backend === 'webgpu') {
    try {
      if (typeof navigator === 'undefined' || !('gpu' in navigator) || !navigator.gpu) {
        throw new Error('WebGPU not supported in current environment');
      }
      const gpuOptions: Record<string, unknown> = { executionProviders: ['webgpu', 'wasm'] };
      [detSession, recSession] = await Promise.all([
        ort.InferenceSession.create(new Uint8Array(detBuf), gpuOptions),
        ort.InferenceSession.create(new Uint8Array(recBuf), gpuOptions),
      ]);
    } catch (gpuErr) {
      console.warn('[OCR ModelManager] WebGPU init failed, falling back to WASM:', gpuErr);
      const wasmOptions: Record<string, unknown> = { executionProviders: ['wasm'] };
      [detSession, recSession] = await Promise.all([
        ort.InferenceSession.create(new Uint8Array(detBuf), wasmOptions),
        ort.InferenceSession.create(new Uint8Array(recBuf), wasmOptions),
      ]);
    }
  } else {
    const wasmOptions: Record<string, unknown> = { executionProviders: ['wasm'] };
    [detSession, recSession] = await Promise.all([
      ort.InferenceSession.create(new Uint8Array(detBuf), wasmOptions),
      ort.InferenceSession.create(new Uint8Array(recBuf), wasmOptions),
    ]);
  }

  // Load dictionary (fetch with Cache API support via fetchWithProgress or direct cache)
  let dictText = '';
  try {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(entry.dict);
    if (cached) {
      dictText = await cached.text();
    } else {
      const dictResp = await fetch(entry.dict);
      if (!dictResp.ok) throw new Error(`Cannot load dict: ${dictResp.status}`);
      dictText = await dictResp.text();
      await cache.put(entry.dict, new Response(dictText, { headers: { 'content-type': 'text/plain' } }));
    }
  } catch {
    // Fallback if Cache API fails
    const dictResp = await fetch(entry.dict);
    if (!dictResp.ok) throw new Error(`Cannot load dict: ${dictResp.status}`);
    dictText = await dictResp.text();
  }

  const dict = parseDict(dictText);

  reportProgress({ stage: 'init_session', loaded: 1, total: 1, percent: 100, modelScale: scale });

  return { detSession, recSession, dict, entry };
}

