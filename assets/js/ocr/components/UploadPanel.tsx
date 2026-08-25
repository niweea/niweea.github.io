import React, { useCallback, useRef, useState } from 'react';
import type { ModelStatus, OcrStatus } from '../types';
import { ProgressBar } from './ProgressBar';

interface ProgressState {
  stage: string;
  percent: number;
  label: string;
}

interface UploadPanelProps {
  imageUrl: string | null;
  modelStatus: ModelStatus;
  ocrStatus: OcrStatus;
  progress: ProgressState | null;
  onImageLoad: (url: string, data: ImageData) => void;
  onRecognize: () => void;
  onClear: () => void;
  onError: (msg: string) => void;
}

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'];

export function UploadPanel({
  imageUrl,
  modelStatus,
  ocrStatus,
  progress,
  onImageLoad,
  onRecognize,
  onClear,
  onError,
}: UploadPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const loadFile = useCallback((file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      onError('不支持的文件格式，请使用 JPG、PNG、WebP 或 BMP。');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      onError('图片体积过大（最大支持 20MB）。');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        onImageLoad(dataUrl, imageData);
      };
      img.onerror = () => onError('图片解码失败，请更换其他图片。');
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [onImageLoad, onError]);

  /* Drag & drop */
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }, [loadFile]);

  /* Clipboard paste */
  const onPaste = useCallback((e: React.ClipboardEvent) => {
    const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'));
    if (!item) return;
    const file = item.getAsFile();
    if (file) loadFile(file);
  }, [loadFile]);

  /* File input */
  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
    e.target.value = '';
  }, [loadFile]);

  const canRecognize = modelStatus === 'ready' && !!imageUrl && ocrStatus !== 'recognizing';

  const stageLabels: Record<string, string> = {
    download_det: '正在下载检测模型 (1/2)…',
    download_rec: '正在下载识别模型 (2/2)…',
    init_session:  '正在初始化推理引擎…',
  };

  return (
    <div className="ocr-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Upload zone / preview */}
      <div
        className={`ocr-upload-zone${dragging ? ' drag-over' : ''}`}
        style={imageUrl ? { minHeight: 0, border: 'none', padding: 0 } : {}}
        onClick={() => !imageUrl && fileInputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onPaste={onPaste}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && !imageUrl && fileInputRef.current?.click()}
        role="button"
        aria-label="上传待识别图片"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="已选图片" className="ocr-preview-img" />
        ) : (
          <>
            <svg style={{ width: '2.5rem', height: '2.5rem', marginBottom: '0.75rem', opacity: 0.4 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>拖拽图片至此处</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>或点击浏览选择 · 支持截图直接 Ctrl+V 粘贴</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.5 }}>支持 JPG · PNG · WebP · BMP · 最大 20MB</p>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <button
          className="ocr-btn ocr-btn-primary"
          style={{ flex: '1 1 auto' }}
          disabled={!canRecognize}
          onClick={onRecognize}
        >
          {ocrStatus === 'recognizing' ? (
            <><span className="ocr-spinner" />正在识别中…</>
          ) : modelStatus === 'loading' ? (
            <><span className="ocr-spinner" />模型加载中…</>
          ) : (
            '开始识别'
          )}
        </button>
        {imageUrl && (
          <button className="ocr-btn ocr-btn-secondary" onClick={() => { onClear(); }}>
            清空
          </button>
        )}
        <button className="ocr-btn ocr-btn-secondary" onClick={() => fileInputRef.current?.click()}>
          {imageUrl ? '更换图片' : '选择图片'}
        </button>
      </div>

      {/* Model loading progress */}
      {progress && modelStatus === 'loading' && (
        <ProgressBar
          visible
          percent={progress.percent}
          label={stageLabels[progress.stage] ?? progress.stage}
        />
      )}
    </div>
  );
}
