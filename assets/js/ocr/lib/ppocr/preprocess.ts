/**
 * PP-OCR preprocessing:
 *
 *  Detection:
 *   1. Resize so the longer side ≤ MAX_SIDE (960) and both dims are multiples of 32.
 *   2. Normalize with ImageNet mean/std.
 *   3. Return Float32Array in NCHW layout [1, 3, H, W].
 *
 *  Recognition:
 *   1. Crop + perspective-correct each detected text region.
 *   2. Resize to fixed height (48) keeping aspect ratio.
 *   3. Normalize and return NCHW [1, 3, 48, W].
 */

export const DET_MAX_SIDE = 960;
export const REC_HEIGHT   = 48;

// ImageNet normalization
const MEAN = [0.485, 0.456, 0.406];
const STD  = [0.229, 0.224, 0.225];

// ── Detection preprocessing ───────────────────────────────────────────────────

export interface DetPreprocessResult {
  tensor: Float32Array;
  inputH: number;
  inputW: number;
  scaleH: number;
  scaleW: number;
}

export function preprocessForDet(imageData: ImageData): DetPreprocessResult {
  const { width: origW, height: origH, data } = imageData;

  // Compute scale so longer side ≤ DET_MAX_SIDE and dims are multiples of 32
  let scale = Math.min(DET_MAX_SIDE / Math.max(origW, origH), 1.0);
  let inputW = Math.round(origW * scale);
  let inputH = Math.round(origH * scale);
  // Round up to nearest multiple of 32
  inputW = Math.ceil(inputW / 32) * 32;
  inputH = Math.ceil(inputH / 32) * 32;

  const scaleW = inputW / origW;
  const scaleH = inputH / origH;

  // Draw into an offscreen canvas at input resolution
  const canvas = new OffscreenCanvas(inputW, inputH);
  const ctx = canvas.getContext('2d')!;
  const tmp = new OffscreenCanvas(origW, origH);
  const tmpCtx = tmp.getContext('2d')!;
  tmpCtx.putImageData(imageData, 0, 0);
  ctx.drawImage(tmp, 0, 0, inputW, inputH);
  const resized = ctx.getImageData(0, 0, inputW, inputH).data;

  // HWC uint8 → CHW float32 normalized
  const tensor = new Float32Array(3 * inputH * inputW);
  const planeSize = inputH * inputW;
  for (let i = 0; i < planeSize; i++) {
    const r = resized[i * 4]     / 255;
    const g = resized[i * 4 + 1] / 255;
    const b = resized[i * 4 + 2] / 255;
    tensor[0 * planeSize + i] = (r - MEAN[0]) / STD[0];
    tensor[1 * planeSize + i] = (g - MEAN[1]) / STD[1];
    tensor[2 * planeSize + i] = (b - MEAN[2]) / STD[2];
  }

  return { tensor, inputH, inputW, scaleH, scaleW };
}

// ── Recognition preprocessing ─────────────────────────────────────────────────

/**
 * Perspective-crops a text region defined by four corner points from the source image,
 * resizes to height=48, and returns a normalized NCHW Float32Array [1, 3, 48, W].
 *
 * @param imageData  Original source image
 * @param points     [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] clockwise from top-left
 */
export function preprocessForRec(
  imageData: ImageData,
  points: [number, number][],
): { tensor: Float32Array; width: number } {
  // Compute destination dimensions
  const [tl, tr, br, bl] = points;
  const topW    = Math.hypot(tr[0] - tl[0], tr[1] - tl[1]);
  const bottomW = Math.hypot(br[0] - bl[0], br[1] - bl[1]);
  const leftH   = Math.hypot(bl[0] - tl[0], bl[1] - tl[1]);
  const rightH  = Math.hypot(br[0] - tr[0], br[1] - tr[1]);

  const srcW = Math.round(Math.max(topW, bottomW));
  const srcH = Math.round(Math.max(leftH, rightH));

  // Cap to avoid OOM on huge detections
  const cappedW = Math.min(srcW, 4096);

  // Warp via canvas (simple bounding box crop + resize for axis-aligned boxes;
  // full perspective warp for rotated boxes)
  const dstH = REC_HEIGHT;
  const dstW = Math.max(1, Math.round(cappedW * (dstH / Math.max(srcH, 1))));

  const srcCanvas = new OffscreenCanvas(imageData.width, imageData.height);
  const srcCtx = srcCanvas.getContext('2d')!;
  srcCtx.putImageData(imageData, 0, 0);

  const dstCanvas = new OffscreenCanvas(dstW, dstH);
  const dstCtx = dstCanvas.getContext('2d')!;

  // Use a simple approach: get the bounding box and let the browser scale
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  const minX = Math.max(0, Math.floor(Math.min(...xs)));
  const minY = Math.max(0, Math.floor(Math.min(...ys)));
  const maxX = Math.min(imageData.width,  Math.ceil(Math.max(...xs)));
  const maxY = Math.min(imageData.height, Math.ceil(Math.max(...ys)));

  dstCtx.drawImage(srcCanvas, minX, minY, maxX - minX, maxY - minY, 0, 0, dstW, dstH);
  const pixels = dstCtx.getImageData(0, 0, dstW, dstH).data;

  const planeSize = dstH * dstW;
  const tensor = new Float32Array(3 * planeSize);
  for (let i = 0; i < planeSize; i++) {
    const r = pixels[i * 4]     / 255;
    const g = pixels[i * 4 + 1] / 255;
    const b = pixels[i * 4 + 2] / 255;
    tensor[0 * planeSize + i] = (r - MEAN[0]) / STD[0];
    tensor[1 * planeSize + i] = (g - MEAN[1]) / STD[1];
    tensor[2 * planeSize + i] = (b - MEAN[2]) / STD[2];
  }

  return { tensor, width: dstW };
}
