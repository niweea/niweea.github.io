import React from 'react';
import type { ToastItem } from '../types';

interface ToastContainerProps {
  toasts: ToastItem[];
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  if (!toasts.length) return null;

  return (
    <div className="twofa-toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`twofa-toast ${t.kind === 'error' ? 'r' : 'g'} show`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
