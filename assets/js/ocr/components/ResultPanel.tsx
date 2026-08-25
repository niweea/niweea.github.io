import React from 'react';
import type { OcrStatus } from '../types';
import type { OcrResult } from '../hooks/useOcr';

interface ResultPanelProps {
  result: OcrResult | null;
  ocrStatus: OcrStatus;
  onCopy: () => void;
  onDownload: () => void;
  onChangeText: (text: string) => void;
}

export function ResultPanel({
  result,
  ocrStatus,
  onCopy,
  onDownload,
  onChangeText,
}: ResultPanelProps) {
  const hasResult = !!result?.text;
  const isRecognizing = ocrStatus === 'recognizing';

  return (
    <div className="ocr-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>识别结果</h2>
          {hasResult && (
            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>（可直接编辑）</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            className="ocr-btn ocr-btn-secondary"
            disabled={!hasResult}
            onClick={onCopy}
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}
          >
            复制文本
          </button>
          <button
            className="ocr-btn ocr-btn-secondary"
            disabled={!hasResult}
            onClick={onDownload}
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}
          >
            导出 .txt
          </button>
        </div>
      </div>

      {/* Text output / Editor */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <textarea
          className="ocr-result-text"
          value={result?.text ?? ''}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={
            isRecognizing
              ? '正在识别文本中…'
              : ocrStatus === 'error'
              ? '⚠ 识别失败，请检查图片或重试。'
              : '选择图片后点击「开始识别」，识别出的文字将在此处展示（支持直接编辑校对）。'
          }
          disabled={isRecognizing}
          aria-label="OCR 识别结果编辑框"
          style={{ width: '100%', height: '100%', minHeight: '260px', resize: 'vertical' }}
        />
        {isRecognizing && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.75)',
              borderRadius: '0.375rem',
              backdropFilter: 'blur(2px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#7c3aed' }}>
              <span className="ocr-spinner" />
              正在识别文本中…
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      {hasResult && result?.stats && (
        <div className="ocr-stats">
          <span className="ocr-stat-item">
            置信度: <span className="ocr-stat-value">{result.stats.confidence ? (result.stats.confidence * 100).toFixed(1) + '%' : '-'}</span>
          </span>
          <span className="ocr-stat-item">
            识别行数: <span className="ocr-stat-value">{result.stats.lineCount}</span>
          </span>
          <span className="ocr-stat-item">
            字数: <span className="ocr-stat-value">{result.stats.charCount}</span>
          </span>
          <span className="ocr-stat-item">
            耗时: <span className="ocr-stat-value">{result.stats.durationMs} ms</span>
          </span>
        </div>
      )}
    </div>
  );
}
