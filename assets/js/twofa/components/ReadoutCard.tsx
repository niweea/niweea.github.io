import React, { useState } from 'react';
import type { OtpInputState } from '../types';
import { DialTimer } from './DialTimer';

interface ReadoutCardProps {
  currentInput: OtpInputState;
  code: string;
  ttl: number;
  isFlash: boolean;
  isSaved: boolean;
  onSave: () => void;
  onCopy: () => void;
  onOpenQR: () => void;
}

export function ReadoutCard({
  currentInput,
  code,
  ttl,
  isFlash,
  isSaved,
  onSave,
  onCopy,
  onOpenQR,
}: ReadoutCardProps) {
  const [copied, setCopied] = useState(false);

  if (!currentInput.secret) return null;

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="twofa-readout-zone show">
      <div className="twofa-readout">
        {/* Head: service info & save badge */}
        <div className="twofa-readout-head">
          <div className="twofa-readout-service">
            <div className="twofa-readout-service-dot" />
            <div className="twofa-readout-service-text">
              <div className="twofa-readout-service-name">
                {currentInput.issuer || '当前验证码'}
              </div>
              {currentInput.account && (
                <div className="twofa-readout-service-account">
                  {currentInput.account}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className={`twofa-stamp-badge ${isSaved ? 'saved' : ''}`}
            onClick={isSaved ? undefined : onSave}
            disabled={isSaved}
          >
            {isSaved ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                已保存
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px' }}>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                保存
              </>
            )}
          </button>
        </div>

        {/* Dial */}
        <DialTimer
          code={code}
          ttl={ttl}
          period={currentInput.period}
          isFlash={isFlash}
          onCopy={handleCopy}
        />

        {/* Foot actions */}
        <div className="twofa-readout-foot">
          <button
            type="button"
            className={`twofa-instr-btn primary ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            <span>{copied ? '已复制！' : '复制验证码'}</span>
          </button>

          <button
            type="button"
            className="twofa-instr-btn"
            onClick={onOpenQR}
            title="查看此密钥的二维码"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <line x1="14" y1="14" x2="14" y2="21" />
              <line x1="21" y1="14" x2="21" y2="14.01" />
              <line x1="14" y1="21" x2="21" y2="21" />
              <line x1="17.5" y1="17.5" x2="17.5" y2="17.51" />
            </svg>
            <span>二维码</span>
          </button>
        </div>
      </div>
    </div>
  );
}
