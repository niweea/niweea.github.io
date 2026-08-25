// Shared types for the OCR application

export type ModelScale = 'tiny' | 'small' | 'medium';
export type OrtBackend = 'wasm' | 'webgpu';
export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error';
export type OcrStatus = 'idle' | 'recognizing' | 'done' | 'error';
export type ProgressStage = 'download_det' | 'download_rec' | 'init_session';

export interface ProgressMessage {
  type: 'PROGRESS';
  stage: ProgressStage;
  loaded: number;
  total: number;
  percent: number;
  modelScale: ModelScale;
}

export interface ReadyMessage {
  type: 'READY';
  modelScale: ModelScale;
}

export interface ErrorMessage {
  type: 'ERROR';
  message: string;
}

export interface ResultMessage {
  type: 'RESULT';
  boxes: BoundingBox[];
  text: string;
  lines: string[];
  stats: OcrStats;
}

export type WorkerOutMessage =
  | ProgressMessage
  | ReadyMessage
  | ErrorMessage
  | ResultMessage;

export interface InitCommand {
  type: 'INIT';
  modelScale: ModelScale;
  backend: OrtBackend;
}

export interface RecognizeCommand {
  type: 'RECOGNIZE';
  imageData: ImageData;
}

export interface DisposeCommand {
  type: 'DISPOSE';
}

export type WorkerInCommand = InitCommand | RecognizeCommand | DisposeCommand;

export interface BoundingBox {
  /** Polygon points [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] */
  points: [number, number][];
  text: string;
  confidence: number;
}

export interface OcrStats {
  lineCount: number;
  charCount: number;
  durationMs: number;
  modelScale: ModelScale;
}

export interface ModelManifestEntry {
  det: string;
  rec: string;
  dict: string;
  detSizeBytes: number;
  recSizeBytes: number;
}

export interface ModelManifest {
  version: string;
  tiny: ModelManifestEntry;
  small: ModelManifestEntry;
  medium: ModelManifestEntry;
}
