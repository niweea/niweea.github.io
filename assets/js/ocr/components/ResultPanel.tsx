import React from 'react';
import type { OcrStatus } from '../types';
import type { OcrResult } from '../hooks/useOcr';

interface ResultPanelProps {
  result: OcrResult | null;
  ocrStatus: OcrStatus;
  onCopy: () => void;
  onDownload: () => void;
}

export function ResultPanel({ result, ocrStatus, onCopy, onDownload }: ResultPanelProps) {
  const hasResult = !!result?.text;

  return (
    <div className="ocr-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>识别结果</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="ocr-btn ocr-btn-secondary" disabled={!hasResult} onClick={onCopy}
            style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
            复制文本
          </button>
          <button className="ocr-btn ocr-btn-secondary" disabled={!hasResult} onClick={onDownload}
            style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
            导出 .txt
          </button>
        </div>
      </div>

      {/* Text output */}
      <div className="ocr-result-text" aria-live="polite" aria-label="OCR 识别结果">
        {ocrStatus === 'recognizing' ? (
          <span style={{ opacity: 0.5 }}>
            <span className="ocr-spinner" style={{ marginRight: '0.5rem' }} />
            正在识别文本中…
          </span>
        ) : hasResult ? (
          result!.text
        ) : (
          <span style={{ opacity: 0.4 }}>
            {ocrStatus === 'error'
              ? '⚠ 识别失败，请检查图片或重试。'
              : '选择图片后点击「开始识别」，识别出的文字将在此处展示。'}
          </span>
        )}
      </div>

      {/* Stats bar */}
      {hasResult && result!.stats && (
        <div className="ocr-stats">
          <span className="ocr-stat-item">
            行数: <span className="ocr-stat-value">{result!.stats.lineCount}</span>
          </span>
          <span className="ocr-stat-item">
            字数: <span className="ocr-stat-value">{result!.stats.charCount}</span>
          </span>
          <span className="ocr-stat-item">
            耗时: <span className="ocr-stat-value">{result!.stats.durationMs} ms</span>
          </span>
          <span className="ocr-stat-item">
            模型: <span className="ocr-stat-value">{result!.stats.modelScale.toUpperCase()}</span>
          </span>
        </div>
      )}
    </div>
  );
}
