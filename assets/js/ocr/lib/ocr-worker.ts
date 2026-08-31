/**
 * OCR Web Worker
 *
 * Message protocol:
 *   IN:  INIT { modelScale, backend }
 *        RECOGNIZE { imageData }
 *        DISPOSE
 *
 *   OUT: PROGRESS { stage, loaded, total, percent, modelScale }
 *        READY    { modelScale }
 *        RESULT   { boxes, text, lines, stats }
 *        ERROR    { message }
 */

import * as ort from 'onnxruntime-web';
import type {
  WorkerInCommand, InitCommand, RecognizeCommand,
  BoundingBox, OcrStats,
} from '../types';
import { loadModel, type LoadedModel } from './model-manager';
import { preprocessForDet, preprocessForRec } from './ppocr/preprocess';
import { postprocessDet, postprocessRec } from './ppocr/postprocess';

let currentModel: LoadedModel | null = null;
let currentModelScale: ModelScale = 'small';

async function handleInit(cmd: InitCommand) {
  try {
    const model = await loadModel(cmd.modelScale, cmd.backend, (progress) => {
      self.postMessage({ type: 'PROGRESS', ...progress });
    });
    currentModel = model;
    currentModelScale = cmd.modelScale;
    self.postMessage({ type: 'READY', modelScale: cmd.modelScale });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    self.postMessage({ type: 'ERROR', message });
  }
}

async function handleRecognize(cmd: RecognizeCommand) {
  if (!currentModel) {
    self.postMessage({ type: 'ERROR', message: '[OCR] Model not loaded' });
    return;
  }

  const startMs = Date.now();
  const { detSession, recSession, dict } = currentModel as any;

  try {
    const { imageData } = cmd;

    // ── Detection ──────────────────────────────────────────────
    const { tensor: detTensor, inputH, inputW, scaleH, scaleW } =
      preprocessForDet(imageData);

    const detInput = new ort.Tensor('float32', detTensor, [1, 3, inputH, inputW]);
    const detFeed: Record<string, unknown> = {};
    // The first input name (varies by export; try 'x' first, fall back to model's actual name)
    const detInputName = detSession.inputNames[0] ?? 'x';
    detFeed[detInputName] = detInput;

    const detOutput = await detSession.run(detFeed);
    const detOutName = detSession.outputNames[0];
    const detOutData = detOutput[detOutName].data as Float32Array;

    // The output map may be [1,1,H,W] or [1,H,W] — extract innermost HW plane
    const mapH = inputH;
    const mapW = inputW;
    // Slice out the single [H,W] plane (skip batch + channel dims)
    const mapOffset = detOutData.length - mapH * mapW;
    const probMap = detOutData.slice(mapOffset);

    const detBoxes = postprocessDet(probMap, mapH, mapW, scaleH, scaleW);

    if (detBoxes.length === 0) {
      const durationMs = Date.now() - startMs;
      self.postMessage({
        type: 'RESULT',
        boxes: [],
        text: '',
        lines: [],
        stats: { lineCount: 0, charCount: 0, durationMs, modelScale: currentModelScale } as OcrStats,
      });
      return;
    }

    // ── Recognition ────────────────────────────────────────────
    const recInputName = recSession.inputNames[0] ?? 'x';
    const resultBoxes: BoundingBox[] = [];
    const lines: string[] = [];

    // Sort boxes top-to-bottom
    const sorted = [...detBoxes].sort((a, b) => {
      const aY = Math.min(...a.points.map(p => p[1]));
      const bY = Math.min(...b.points.map(p => p[1]));
      return aY - bY;
    });

    let totalConfidence = 0;

    for (const box of sorted) {
      const { tensor: recTensor, width: recW } = preprocessForRec(imageData, box.points);
      const recInput = new ort.Tensor('float32', recTensor, [1, 3, 48, recW]);
      const recFeed: Record<string, unknown> = {};
      recFeed[recInputName] = recInput;

      const recOutput = await recSession.run(recFeed);
      const recOutName = recSession.outputNames[0];
      const recOutTensor = recOutput[recOutName];

      // Output shape varies: [T, 1, C] or [1, T, C] or [T, C]
      const outData = recOutTensor.data as Float32Array;
      const dims: number[] = recOutTensor.dims;
      // Figure out T and C
      let T: number, C: number;
      if (dims.length === 3) {
        // [T,1,C] or [1,T,C]
        if (dims[0] === 1) { T = dims[1]; C = dims[2]; }
        else               { T = dims[0]; C = dims[2]; }
      } else {
        T = dims[0]; C = dims[1];
      }

      const { text, confidence } = postprocessRec(outData, T, C, dict);
      if (text.trim()) {
        resultBoxes.push({ points: box.points, text, confidence });
        lines.push(text);
        totalConfidence += confidence;
      }
    }

    const fullText = lines.join('\n');
    const durationMs = Date.now() - startMs;
    const avgConfidence = lines.length > 0 ? (totalConfidence / lines.length) : 0;

    self.postMessage({
      type: 'RESULT',
      boxes: resultBoxes,
      text: fullText,
      lines,
      stats: {
        lineCount: lines.length,
        charCount: fullText.replace(/\s/g, '').length,
        durationMs,
        modelScale: currentModelScale,
        confidence: avgConfidence,
      } as OcrStats,
    });
  } catch (err) {
    const message = `[OCR] ${err instanceof Error ? err.message : String(err)}`;
    self.postMessage({ type: 'ERROR', message });
  }
}

self.addEventListener('message', async (ev: MessageEvent<WorkerInCommand>) => {
  const cmd = ev.data;
  switch (cmd.type) {
    case 'INIT':
      await handleInit(cmd);
      break;
    case 'RECOGNIZE':
      await handleRecognize(cmd);
      break;
    case 'DISPOSE':
      currentModel = null;
      break;
  }
});
