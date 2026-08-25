import React, { useCallback, useRef, useState } from 'react';
import type { ModelStatus, OcrStatus } from '../types';

interface UploadPanelProps {
  imageUrl: string | null;
  modelStatus: ModelStatus;
  ocrStatus: OcrStatus;
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

  return (
    <div className="ocr-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>预览</h2>
        {imageUrl && (
          <button
            className="ocr-btn ocr-btn-secondary"
            onClick={onClear}
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem', color: '#ef4444', borderColor: '#fca5a5' }}
          >
            移除
          </button>
        )}
      </div>

      {/* Upload zone / preview */}
      <div
        className={`ocr-upload-zone${dragging ? ' drag-over' : ''}`}
        style={{
          flex: 1,
          minHeight: '240px',
          maxHeight: '400px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(imageUrl ? { border: '1px solid #e5e7eb', padding: '0.25rem', cursor: 'pointer', background: '#fafafa' } : { cursor: 'pointer' })
        }}
        onClick={() => fileInputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onPaste={onPaste}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
        role="button"
        aria-label="上传待识别图片"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="已选图片"
            className="ocr-preview-img"
            style={{ width: '100%', height: '100%', maxHeight: '380px', objectFit: 'contain', display: 'block', margin: 'auto' }}
          />
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

      {/* Action button */}
      <button
        className="ocr-btn ocr-btn-primary"
        style={{
          width: '100%',
          minHeight: '40px',
          fontSize: '0.875rem',
          fontWeight: 700,
          boxShadow: canRecognize ? '0 2px 8px rgba(124, 58, 237, 0.35)' : 'none',
        }}
        disabled={!canRecognize}
        onClick={onRecognize}
      >
        {ocrStatus === 'recognizing' ? (
          <><span className="ocr-spinner" /> 正在识别中…</>
        ) : modelStatus === 'loading' ? (
          <><span className="ocr-spinner" /> 模型加载中…</>
        ) : !imageUrl ? (
          '请先上传图片'
        ) : (
          '开始识别'
        )}
      </button>
    </div>
  );
}
