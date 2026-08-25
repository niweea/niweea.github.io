import React, { useState } from 'react';

interface SpecInputProps {
  value: string;
  error?: string | null;
  onChange: (val: string) => void;
  onPaste: () => void;
}

export function SpecInput({ value, error, onChange, onPaste }: SpecInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="twofa-spec">
      <div className="twofa-spec-label">密钥录入</div>
      <div className="twofa-spec-row">
        <div className={`twofa-spec-field ${isFocused ? 'focus' : ''} ${error ? 'has-error' : ''}`}>
          <input
            type="text"
            className="twofa-spec-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="粘贴 Base32 密钥、otpauth:// 链接或 Hex 编码…"
            autoComplete="off"
            spellCheck={false}
            maxLength={1024}
          />
        </div>
        <button
          type="button"
          className="twofa-paste-btn"
          onClick={onPaste}
          title="从剪贴板粘贴"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
          粘贴
        </button>
      </div>

      {error ? (
        <div className="twofa-spec-hint error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      ) : (
        <div className="twofa-spec-hint">
          支持 <b>otpauth://</b> 协议链接、<b>Base32</b> 密钥及 <b>十六进制 Hex</b> — 自动解析服务名与账户。
        </div>
      )}
    </div>
  );
}
