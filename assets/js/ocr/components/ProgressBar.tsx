import React from 'react';

interface ProgressBarProps {
  percent: number;       // 0–100
  label?: string;
  visible: boolean;
}

export function ProgressBar({ percent, label, visible }: ProgressBarProps) {
  if (!visible) return null;
  return (
    <div style={{ marginTop: '0.75rem' }}>
      {label && (
        <p style={{ fontSize: '0.75rem', marginBottom: '0.3rem', opacity: 0.7 }}>{label}</p>
      )}
      <div className="ocr-progress-track">
        <div
          className="ocr-progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      <p style={{ fontSize: '0.7rem', marginTop: '0.2rem', textAlign: 'right', opacity: 0.6 }}>
        {Math.round(percent)}%
      </p>
    </div>
  );
}
