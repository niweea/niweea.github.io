/**
 * PP-OCR postprocessing:
 *
 *  Detection (DB – Differentiable Binarization):
 *   1. Threshold the probability map at THRESH.
 *   2. Dilate with a small kernel to merge nearby pixels.
 *   3. Find connected components (simple flood-fill based).
 *   4. For each component, compute a bounding quad expanded by UNCLIP_RATIO.
 *
 *  Recognition (SVTR / CRNN with CTC):
 *   1. Argmax over character dimension at each time step.
 *   2. Collapse consecutive duplicates and remove blank token (index 0).
 *   3. Map indices to characters from the dictionary.
 */

// ── Detection postprocessing ──────────────────────────────────────────────────

export const DET_THRESH        = 0.2;   // binarization threshold (from inference.yml)
export const DET_BOX_THRESH    = 0.4;   // minimum mean score inside a box (from inference.yml)
export const DET_UNCLIP_RATIO  = 1.4;   // box expansion ratio (from inference.yml)
export const DET_MIN_SIZE      = 4;     // minimum box side in pixels

export interface DetBox {
  /** Pixel coordinates in the *original* image space */
  points: [number, number][];
  score: number;
}

/**
 * @param probMap  Flat Float32Array of shape [mapH * mapW] – values in [0,1]
 * @param mapH     Height of the probability map
 * @param mapW     Width of the probability map
 * @param scaleH   origH / mapH  (to convert back to original image space)
 * @param scaleW   origW / mapW
 */
export function postprocessDet(
  probMap: Float32Array,
  mapH: number,
  mapW: number,
  scaleH: number,
  scaleW: number,
): DetBox[] {
  // Step 1: binarize
  const binary = new Uint8Array(mapH * mapW);
  for (let i = 0; i < binary.length; i++) {
    binary[i] = probMap[i] >= DET_THRESH ? 1 : 0;
  }

  // Step 2: simple dilation (3×3 max-pool)
  const dilated = dilate3x3(binary, mapH, mapW);

  // Step 3: connected components via flood-fill
  const boxes: DetBox[] = [];
  const visited = new Uint8Array(mapH * mapW);

  for (let y = 0; y < mapH; y++) {
    for (let x = 0; x < mapW; x++) {
      const idx = y * mapW + x;
      if (!dilated[idx] || visited[idx]) continue;

      // BFS
      const pixels: [number, number][] = [];
      const queue: number[] = [idx];
      visited[idx] = 1;

      while (queue.length) {
        const cur = queue.pop()!;
        const cy = Math.floor(cur / mapW);
        const cx = cur % mapW;
        pixels.push([cx, cy]);

        for (const [ny, nx] of [[cy-1,cx],[cy+1,cx],[cy,cx-1],[cy,cx+1]]) {
          if (ny < 0 || ny >= mapH || nx < 0 || nx >= mapW) continue;
          const ni = ny * mapW + nx;
          if (!dilated[ni] || visited[ni]) continue;
          visited[ni] = 1;
          queue.push(ni);
        }
      }

      if (pixels.length < DET_MIN_SIZE * DET_MIN_SIZE) continue;

      // Step 4: bounding box from pixels
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      let scoreSum = 0;
      for (const [px, py] of pixels) {
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
        scoreSum += probMap[py * mapW + px];
      }
      const score = scoreSum / pixels.length;
      if (score < DET_BOX_THRESH) continue;

      // Expand (unclip) the box
      const w = maxX - minX;
      const h = maxY - minY;
      if (w < DET_MIN_SIZE || h < DET_MIN_SIZE) continue;

      const expandW = (w * DET_UNCLIP_RATIO - w) / 2;
      const expandH = (h * DET_UNCLIP_RATIO - h) / 2;
      const exMinX = Math.max(0, minX - expandW);
      const exMinY = Math.max(0, minY - expandH);
      const exMaxX = Math.min(mapW - 1, maxX + expandW);
      const exMaxY = Math.min(mapH - 1, maxY + expandH);

      // Convert back to original image coordinates
      const toOrigX = (v: number) => v * scaleW;
      const toOrigY = (v: number) => v * scaleH;

      boxes.push({
        score,
        points: [
          [toOrigX(exMinX), toOrigY(exMinY)],
          [toOrigX(exMaxX), toOrigY(exMinY)],
          [toOrigX(exMaxX), toOrigY(exMaxY)],
          [toOrigX(exMinX), toOrigY(exMaxY)],
        ],
      });
    }
  }

  return boxes;
}

function dilate3x3(src: Uint8Array, H: number, W: number): Uint8Array {
  const dst = new Uint8Array(H * W);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let val = 0;
      outer: for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy, nx = x + dx;
          if (ny >= 0 && ny < H && nx >= 0 && nx < W && src[ny * W + nx]) {
            val = 1;
            break outer;
          }
        }
      }
      dst[y * W + x] = val;
    }
  }
  return dst;
}

// ── Recognition postprocessing (CTC) ──────────────────────────────────────────

export interface RecResult {
  text: string;
  confidence: number;
}

/**
 * @param logits   Float32Array of shape [T, C] (time steps × char classes)
 * @param T        Number of time steps
 * @param C        Number of character classes (including blank at index 0)
 * @param dict     Array of characters indexed 1…C-1 (dict[0] = first real char)
 */
export function postprocessRec(
  logits: Float32Array,
  T: number,
  C: number,
  dict: string[],
): RecResult {
  let text = '';
  let confSum = 0;
  let confCount = 0;
  let prevIdx = -1;

  for (let t = 0; t < T; t++) {
    // Argmax over C
    let maxVal = -Infinity;
    let maxIdx = 0;
    const offset = t * C;
    for (let c = 0; c < C; c++) {
      if (logits[offset + c] > maxVal) {
        maxVal = logits[offset + c];
        maxIdx = c;
      }
    }

    // Softmax probability for confidence
    let expSum = 0;
    for (let c = 0; c < C; c++) expSum += Math.exp(logits[offset + c] - maxVal);
    const prob = 1 / expSum; // exp(maxVal - maxVal) / expSum = 1/expSum

    if (maxIdx !== 0 && maxIdx !== prevIdx) {
      // blank=0 is skipped; dict is 0-indexed to char index 1
      const ch = dict[maxIdx - 1] ?? '?';
      text += ch;
      confSum += prob;
      confCount++;
    }
    prevIdx = maxIdx;
  }

  return {
    text,
    confidence: confCount > 0 ? confSum / confCount : 0,
  };
}

// ── Dictionary loader ──────────────────────────────────────────────────────────

let cachedDict: string[] | null = null;

export async function loadDict(url: string): Promise<string[]> {
  if (cachedDict) return cachedDict;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch dictionary: ${resp.status}`);
  const text = await resp.text();
  cachedDict = text.split('\n').map(l => l.trim()).filter(Boolean);
  return cachedDict;
}
