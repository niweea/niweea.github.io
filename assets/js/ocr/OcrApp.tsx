import React, { useCallback, useReducer, useRef, useEffect } from 'react';
import type { ModelScale, OrtBackend, BoundingBox, OcrStats } from './types';
import { UploadPanel } from './components/UploadPanel';
import { ResultPanel } from './components/ResultPanel';
import { ModelSelector } from './components/ModelSelector';
import { StatusBadge } from './components/StatusBadge';
import { ProgressBar } from './components/ProgressBar';
import { ToastContainer, type Toast } from './components/ToastContainer';
import { useOcr } from './hooks/useOcr';

interface AppState {
  imageUrl: string | null;
  imageData: ImageData | null;
  toasts: Toast[];
}

type AppAction =
  | { type: 'SET_IMAGE'; url: string; data: ImageData }
  | { type: 'CLEAR_IMAGE' }
  | { type: 'ADD_TOAST'; toast: Toast }
  | { type: 'REMOVE_TOAST'; id: string };

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_IMAGE':
      return { ...state, imageUrl: action.url, imageData: action.data };
    case 'CLEAR_IMAGE':
      return { ...state, imageUrl: null, imageData: null };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.toast] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };
    default:
      return state;
  }
}

export function OcrApp() {
  const [state, dispatch] = useReducer(reducer, {
    imageUrl: null,
    imageData: null,
    toasts: [],
  });

  const {
    modelStatus,
    ocrStatus,
    modelScale,
    backend,
    progress,
    result,
    setModelScale,
    setBackend,
    recognize,
    retryInit,
    clearResult,
    updateResultText,
  } = useOcr();

  const toastCounter = useRef(0);

  const addToast = useCallback((message: string, kind: Toast['kind'] = 'info') => {
    const id = String(++toastCounter.current);
    dispatch({ type: 'ADD_TOAST', toast: { id, message, kind } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', id }), 3500);
  }, []);

  const handleImageLoad = useCallback((url: string, data: ImageData) => {
    dispatch({ type: 'SET_IMAGE', url, data });
  }, []);

  const handleRecognize = useCallback(() => {
    if (!state.imageData) return;
    recognize(state.imageData);
  }, [state.imageData, recognize]);

  const handleCopy = useCallback(() => {
    if (!result?.text) return;
    navigator.clipboard.writeText(result.text).then(() => {
      addToast('已复制到剪贴板', 'success');
    }).catch(() => {
      addToast('复制失败，请手动选取复制', 'error');
    });
  }, [result?.text, addToast]);

  const handleDownload = useCallback(() => {
    if (!result?.text) return;
    const blob = new Blob([result.text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ocr-result.txt';
    a.click();
    URL.revokeObjectURL(url);
    addToast('已导出为 ocr-result.txt', 'success');
  }, [result?.text, addToast]);

  const handleModelChange = useCallback((scale: ModelScale) => {
    const sizeHint: Record<ModelScale, string> = {
      tiny: '约 6 MB · 速度最快',
      small: '约 30 MB · 均衡推荐',
      medium: '约 139 MB · 最精准',
    };
    if (scale !== 'tiny') {
      addToast(`正在切换到 ${scale} 模型（${sizeHint[scale]}）…`, 'info');
    }
    setModelScale(scale);
  }, [setModelScale, addToast]);

  // Surface OCR errors as toasts
  useEffect(() => {
    if (ocrStatus === 'error') {
      addToast('文字识别失败，请重试。', 'error');
    }
  }, [ocrStatus, addToast]);

  return (
    <>
      {/* Header row: title + model selector + status badge */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'inherit' }}>
            PP-OCR 文字识别
          </h1>
          <p style={{ marginTop: '0.15rem', fontSize: '0.8125rem', opacity: 0.6 }}>
            基于 WebAssembly 纯本地离线推理 · 零数据上传 · 隐私全隔离
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
          <ModelSelector
            value={modelScale}
            disabled={modelStatus === 'loading' || ocrStatus === 'recognizing'}
            onChange={handleModelChange}
          />
          <StatusBadge
            modelStatus={modelStatus}
            backend={backend}
            onSetBackend={setBackend}
            onRetry={retryInit}
          />
        </div>
      </div>

      {/* Model loading progress */}
      {progress && modelStatus === 'loading' && (
        <div style={{ marginBottom: '1rem' }}>
          <ProgressBar
            visible
            percent={progress.percent}
            label={{
              download_det: '正在下载检测模型 (1/2)…',
              download_rec: '正在下载识别模型 (2/2)…',
              init_session: '正在初始化推理引擎…',
            }[progress.stage] ?? progress.stage}
          />
        </div>
      )}

      {/* Main grid: left upload / right results */}
      <div className="ocr-grid">
        <UploadPanel
          imageUrl={state.imageUrl}
          modelStatus={modelStatus}
          ocrStatus={ocrStatus}
          onImageLoad={handleImageLoad}
          onRecognize={handleRecognize}
          onClear={() => {
            dispatch({ type: 'CLEAR_IMAGE' });
            clearResult();
          }}
          onError={(msg) => addToast(msg, 'error')}
        />
        <ResultPanel
          result={result}
          ocrStatus={ocrStatus}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onChangeText={updateResultText}
        />
      </div>

      {/* Feature cards */}
      <div className="ocr-feature-grid">
        {[
          { icon: '🌐', title: '多语言混合支持', desc: '6,900+ 字符字典库，支持简繁中文、英数及标点' },
          { icon: '🔒', title: '纯本地隐私安全', desc: '基于 WebAssembly 端侧推理，零数据上传服务器' },
          { icon: '⚡', title: '三档模型自由切换', desc: 'Tiny (6 MB) · Small (30 MB) · Medium (139 MB)' },
        ].map(f => (
          <div key={f.title} className="ocr-feature-card">
            <div className="ocr-feature-icon">{f.icon}</div>
            <div className="ocr-feature-title">{f.title}</div>
            <div className="ocr-feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <ToastContainer toasts={state.toasts} onDismiss={(id) => dispatch({ type: 'REMOVE_TOAST', id })} />
    </>
  );
}
