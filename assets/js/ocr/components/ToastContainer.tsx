import React from 'react';

export interface Toast {
  id: string;
  message: string;
  kind: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const KIND_CLASS: Record<Toast['kind'], string> = {
  success: 'ocr-toast ocr-toast-success',
  error: 'ocr-toast ocr-toast-error',
  info: 'ocr-toast ocr-toast-info',
};

const KIND_ICON: Record<Toast['kind'], string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (!toasts.length) return null;
  return (
    <div className="ocr-toast-container">
      {toasts.map(t => (
        <div key={t.id} className={KIND_CLASS[t.kind]} onClick={() => onDismiss(t.id)} style={{ cursor: 'pointer' }}>
          <span>{KIND_ICON[t.kind]}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
