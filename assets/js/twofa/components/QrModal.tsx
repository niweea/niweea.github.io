import React, { useEffect, useRef } from 'react';
import { renderQRCodeToElement } from '../lib/qrcode';
import { buildOtpauthUrl } from '../lib/parser';
import type { TotpAlgorithm } from '../types';

interface QrModalProps {
  isOpen: boolean;
  data: {
    secret: string;
    issuer?: string;
    account?: string;
    algo?: TotpAlgorithm;
    digits?: number;
    period?: number;
  } | null;
  onClose: () => void;
  onAddToast: (msg: string, kind?: 'success' | 'error' | 'info') => void;
}

export function QrModal({ isOpen, data, onClose, onAddToast }: QrModalProps) {
  const qrBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && data && qrBoxRef.current) {
      const url = buildOtpauthUrl(data);
      renderQRCodeToElement(qrBoxRef.current, url, {
        width: 190,
        height: 190,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
      });
    }
  }, [isOpen, data]);

  if (!isOpen || !data) return null;

  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(data.secret);
      onAddToast('已复制密钥到剪贴板', 'success');
    } catch {
      onAddToast('复制失败，请手动选取复制', 'error');
    }
  };

  return (
    <div
      className="twofa-modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="twofa-modal-card">
        <div className="twofa-modal-title">
          <span>{data.issuer ? `${data.issuer} - 扫码录入` : '扫码录入'}</span>
          <button
            type="button"
            className="twofa-modal-close"
            onClick={onClose}
            aria-label="关闭二维码弹窗"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="twofa-qr-box" ref={qrBoxRef} />

        <div className="twofa-qr-hint">
          使用任意身份验证器（如 Google Authenticator、1Password 等）扫码：
          <br />
          <code
            onClick={handleCopySecret}
            title="点击复制密钥"
            style={{ cursor: 'pointer', wordBreak: 'break-all', display: 'inline-block', marginTop: '6px' }}
          >
            {data.secret}
          </code>
        </div>
      </div>
    </div>
  );
}
