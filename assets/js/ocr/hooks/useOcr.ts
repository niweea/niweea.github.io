import { useCallback, useEffect, useReducer, useRef } from 'react';
import type {
  ModelScale, OrtBackend, ModelStatus, OcrStatus,
  WorkerOutMessage, ProgressMessage, BoundingBox, OcrStats,
} from '../types';

export interface OcrResult {
  boxes: BoundingBox[];
  text: string;
  lines: string[];
  stats: OcrStats;
}

interface ProgressState {
  stage: string;
  percent: number;
  label: string;
}

interface OcrHookState {
  modelStatus: ModelStatus;
  ocrStatus: OcrStatus;
  modelScale: ModelScale;
  backend: OrtBackend;
  progress: ProgressState | null;
  result: OcrResult | null;
}

type OcrHookAction =
  | { type: 'MODEL_LOADING'; scale: ModelScale }
  | { type: 'MODEL_PROGRESS'; progress: ProgressState }
  | { type: 'MODEL_READY' }
  | { type: 'MODEL_ERROR' }
  | { type: 'OCR_START' }
  | { type: 'OCR_DONE'; result: OcrResult }
  | { type: 'OCR_ERROR' }
  | { type: 'SET_SCALE'; scale: ModelScale }
  | { type: 'SET_BACKEND'; backend: OrtBackend };

function reducer(state: OcrHookState, action: OcrHookAction): OcrHookState {
  switch (action.type) {
    case 'MODEL_LOADING':
      return { ...state, modelStatus: 'loading', modelScale: action.scale, progress: null };
    case 'MODEL_PROGRESS':
      return { ...state, progress: action.progress };
    case 'MODEL_READY':
      return { ...state, modelStatus: 'ready', progress: null };
    case 'MODEL_ERROR':
      return { ...state, modelStatus: 'error', progress: null };
    case 'OCR_START':
      return { ...state, ocrStatus: 'recognizing' };
    case 'OCR_DONE':
      return { ...state, ocrStatus: 'done', result: action.result };
    case 'OCR_ERROR':
      return { ...state, ocrStatus: 'error' };
    case 'SET_SCALE':
      return { ...state, modelScale: action.scale };
    case 'SET_BACKEND':
      return { ...state, backend: action.backend };
    default:
      return state;
  }
}

const STAGE_LABELS: Record<string, string> = {
  download_det: '正在下载检测模型 (1/2)',
  download_rec: '正在下载识别模型 (2/2)',
  init_session: '正在初始化推理引擎',
};

export function useOcr() {
  const [state, dispatch] = useReducer(reducer, {
    modelStatus: 'idle',
    ocrStatus: 'idle',
    modelScale: 'tiny',
    backend: 'wasm',
    progress: null,
    result: null,
  });

  const workerRef = useRef<Worker | null>(null);
  const pendingScaleRef = useRef<ModelScale>('tiny');
  const pendingBackendRef = useRef<OrtBackend>('wasm');

  // ── Worker message handler ─────────────────────────────────────
  const handleMessage = useCallback((ev: MessageEvent<WorkerOutMessage>) => {
    const msg = ev.data;
    switch (msg.type) {
      case 'PROGRESS': {
        const p = msg as ProgressMessage;
        dispatch({
          type: 'MODEL_PROGRESS',
          progress: {
            stage: p.stage,
            percent: p.percent,
            label: STAGE_LABELS[p.stage] ?? p.stage,
          },
        });
        break;
      }
      case 'READY':
        dispatch({ type: 'MODEL_READY' });
        break;
      case 'ERROR':
        console.error('[OCR Worker Error]', msg.message);
        dispatch({ type: msg.message.startsWith('[OCR]') ? 'OCR_ERROR' : 'MODEL_ERROR' });
        break;
      case 'RESULT':
        dispatch({
          type: 'OCR_DONE',
          result: {
            boxes: msg.boxes,
            text: msg.text,
            lines: msg.lines,
            stats: msg.stats,
          },
        });
        break;
    }
  }, []);

  // ── Spawn / re-spawn worker ────────────────────────────────────
  const spawnWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'DISPOSE' });
      workerRef.current.terminate();
    }
    const rootEl = document.getElementById('ocr-root');
    const workerUrl = (typeof window !== 'undefined' && (window as any).__OCR_WORKER_URL__) || rootEl?.getAttribute('data-worker-url') || '/js/ocr/worker.js';
    const worker = new Worker(workerUrl, { type: 'module' });
    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', (err) => {
      console.error('[OCR Worker Process Crash/Error]', err);
      dispatch({ type: 'MODEL_ERROR' });
    });
    workerRef.current = worker;
    return worker;
  }, [handleMessage]);

  // ── Init model ────────────────────────────────────────────────
  const initModel = useCallback((scale: ModelScale, backend: OrtBackend) => {
    dispatch({ type: 'MODEL_LOADING', scale });
    const worker = spawnWorker();
    worker.postMessage({ type: 'INIT', modelScale: scale, backend });
  }, [spawnWorker]);

  // ── Auto-init on mount ────────────────────────────────────────
  useEffect(() => {
    initModel('tiny', 'wasm');
    return () => {
      workerRef.current?.terminate();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Re-init when scale or backend changes ─────────────────────
  useEffect(() => {
    // Only re-init if we've already been initialized (not on first mount)
    if (state.modelStatus === 'idle') return;
    if (pendingScaleRef.current === state.modelScale && pendingBackendRef.current === state.backend) return;
    pendingScaleRef.current = state.modelScale;
    pendingBackendRef.current = state.backend;
    initModel(state.modelScale, state.backend);
  }, [state.modelScale, state.backend]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Public API ────────────────────────────────────────────────
  const recognize = useCallback((imageData: ImageData) => {
    if (!workerRef.current || state.modelStatus !== 'ready') return;
    dispatch({ type: 'OCR_START' });
    workerRef.current.postMessage({ type: 'RECOGNIZE', imageData }, [imageData.data.buffer]);
  }, [state.modelStatus]);

  const setModelScale = useCallback((scale: ModelScale) => {
    dispatch({ type: 'SET_SCALE', scale });
  }, []);

  const setBackend = useCallback((backend: OrtBackend) => {
    dispatch({ type: 'SET_BACKEND', backend });
  }, []);

  const retryInit = useCallback(() => {
    initModel(state.modelScale, state.backend);
  }, [initModel, state.modelScale, state.backend]);

  return {
    ...state,
    recognize,
    setModelScale,
    setBackend,
    retryInit,
  };
}
