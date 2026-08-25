import React from 'react';
import type { ModelStatus, OrtBackend } from '../types';

interface StatusBadgeProps {
  modelStatus: ModelStatus;
  backend: OrtBackend;
  onSetBackend: (b: OrtBackend) => void;
  onRetry: () => void;
}

const LABELS: Record<ModelStatus, string> = {
  idle: '待就绪',
  loading: '模型加载中…',
  ready: '模型就绪',
  error: '加载失败',
};

const CLASS_MAP: Record<ModelStatus, string> = {
  idle:    'ocr-badge ocr-badge-idle',
  loading: 'ocr-badge ocr-badge-loading',
  ready:   'ocr-badge ocr-badge-ready',
  error:   'ocr-badge ocr-badge-error',
};

export function StatusBadge({ modelStatus, backend, onSetBackend, onRetry }: StatusBadgeProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      {/* Backend selector */}
      <select
        className="ocr-model-select"
        value={backend}
        onChange={e => onSetBackend(e.target.value as OrtBackend)}
        title="推理后端加速引擎"
        style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
      >
        <option value="wasm">WASM (CPU)</option>
        <option value="webgpu">WebGPU (显卡加速)</option>
      </select>

      {/* Status pill */}
      <span className={CLASS_MAP[modelStatus]}>
        {modelStatus === 'loading' && <span className="ocr-spinner" style={{ width: '0.7rem', height: '0.7rem' }} />}
        {modelStatus === 'ready' && '✓ '}
        {modelStatus === 'error' && '✕ '}
        {LABELS[modelStatus]}
      </span>

      {/* Retry button on error */}
      {modelStatus === 'error' && (
        <button className="ocr-btn ocr-btn-secondary" onClick={onRetry} style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
          重试
        </button>
      )}
    </div>
  );
}
