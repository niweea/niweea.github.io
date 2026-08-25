const fs = require('fs');
const path = require('path');
const https = require('https');

const TARGET_DIR = path.join(__dirname, '..', 'static', 'models', 'ocr');

const ALL_ASSETS = [
  // ── Tiny ───────────────────────────────────────────────
  {
    name: 'tiny_det.onnx',
    urls: [
      'https://huggingface.co/PaddlePaddle/PP-OCRv6_tiny_det_onnx/resolve/main/inference.onnx',
      'https://hf-mirror.com/PaddlePaddle/PP-OCRv6_tiny_det_onnx/resolve/main/inference.onnx',
    ],
    minSize: 1000000, // ~1.78 MB
    scale: 'tiny',
  },
  {
    name: 'tiny_rec.onnx',
    urls: [
      'https://huggingface.co/PaddlePaddle/PP-OCRv6_tiny_rec_onnx/resolve/main/inference.onnx',
      'https://hf-mirror.com/PaddlePaddle/PP-OCRv6_tiny_rec_onnx/resolve/main/inference.onnx',
    ],
    minSize: 3000000, // ~4.46 MB
    scale: 'tiny',
  },
  {
    name: 'inference.yml',
    urls: [
      'https://huggingface.co/PaddlePaddle/PP-OCRv6_tiny_rec_onnx/raw/main/inference.yml',
      'https://hf-mirror.com/PaddlePaddle/PP-OCRv6_tiny_rec_onnx/raw/main/inference.yml',
    ],
    minSize: 10000, // ~54 KB
    scale: 'tiny',
  },
  // ── Small ──────────────────────────────────────────────
  {
    name: 'small_det.onnx',
    urls: [
      'https://huggingface.co/PaddlePaddle/PP-OCRv6_small_det_onnx/resolve/main/inference.onnx',
      'https://hf-mirror.com/PaddlePaddle/PP-OCRv6_small_det_onnx/resolve/main/inference.onnx',
    ],
    minSize: 5000000, // ~9.88 MB
    scale: 'small',
  },
  {
    name: 'small_rec.onnx',
    urls: [
      'https://huggingface.co/PaddlePaddle/PP-OCRv6_small_rec_onnx/resolve/main/inference.onnx',
      'https://hf-mirror.com/PaddlePaddle/PP-OCRv6_small_rec_onnx/resolve/main/inference.onnx',
    ],
    minSize: 15000000, // ~21.16 MB
    scale: 'small',
  },
  // ── Medium ─────────────────────────────────────────────
  {
    name: 'medium_det.onnx',
    urls: [
      'https://huggingface.co/PaddlePaddle/PP-OCRv6_medium_det_onnx/resolve/main/inference.onnx',
      'https://hf-mirror.com/PaddlePaddle/PP-OCRv6_medium_det_onnx/resolve/main/inference.onnx',
    ],
    minSize: 40000000, // ~62.03 MB
    scale: 'medium',
  },
  {
    name: 'medium_rec.onnx',
    urls: [
      'https://huggingface.co/PaddlePaddle/PP-OCRv6_medium_rec_onnx/resolve/main/inference.onnx',
      'https://hf-mirror.com/PaddlePaddle/PP-OCRv6_medium_rec_onnx/resolve/main/inference.onnx',
    ],
    minSize: 50000000, // ~76.55 MB
    scale: 'medium',
  },
];

function downloadUrl(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, destPath).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
      file.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function fetchAsset(asset) {
  const destPath = path.join(TARGET_DIR, asset.name);

  // Check if file already exists and is valid
  if (fs.existsSync(destPath)) {
    const stat = fs.statSync(destPath);
    if (stat.size >= asset.minSize) {
      console.log(`[OCR Models] ${asset.name} already exists (${(stat.size / 1024 / 1024).toFixed(2)} MB), skipping.`);
      return;
    }
    fs.unlinkSync(destPath);
  }

  let lastError = null;
  for (const url of asset.urls) {
    try {
      console.log(`[OCR Models] Downloading ${asset.name} from ${url}...`);
      await downloadUrl(url, destPath);
      const stat = fs.statSync(destPath);
      if (stat.size < asset.minSize) {
        throw new Error(`Downloaded file too small (${stat.size} bytes), likely LFS pointer or error page.`);
      }
      console.log(`[OCR Models] ✓ ${asset.name} downloaded successfully (${(stat.size / 1024 / 1024).toFixed(2)} MB).`);
      return;
    } catch (err) {
      lastError = err;
      console.warn(`[OCR Models] Failed from ${url}:`, err.message);
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
    }
  }

  throw new Error(`Failed to download ${asset.name} from all sources: ${lastError?.message}`);
}

async function main() {
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  const targetScale = process.argv[2] || process.env.MODEL_SCALE || 'all';
  const assetsToDownload = targetScale === 'all'
    ? ALL_ASSETS
    : ALL_ASSETS.filter(a => a.scale === targetScale || a.scale === 'tiny');

  console.log(`[OCR Models] Preparing OCR model assets (target: ${targetScale}) in static/models/ocr/ ...`);
  for (const asset of assetsToDownload) {
    await fetchAsset(asset);
  }
  console.log('[OCR Models] All assets ready for build!');
}

main().catch((err) => {
  console.error('[OCR Models Error]', err);
  process.exit(1);
});
