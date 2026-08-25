import React from 'react';
import type { OtpAccount } from '../types';
import { fmtCode } from '../lib/totp';

const ICON_COLORS = [
  '#059669',
  '#0d9488',
  '#7c3aed',
  '#d97706',
  '#4f46e5',
  '#ea580c',
  '#0891b2',
  '#db2777',
];

interface TicketCardProps {
  account: OtpAccount;
  code?: string;
  ttl: number;
  isActive: boolean;
  colorIndex: number;
  onSelect: () => void;
  onCopyCode: () => void;
  onOpenQR: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TicketCard({
  account,
  code,
  ttl,
  isActive,
  colorIndex,
  onSelect,
  onCopyCode,
  onOpenQR,
  onEdit,
  onDelete,
}: TicketCardProps) {
  const iconBg = ICON_COLORS[colorIndex % ICON_COLORS.length];
  const period = account.period || 30;
  const rem = ttl;
  const ringOff = 63.5 * (1 - rem / period);
  const codeCls = rem <= 5 ? 'danger' : rem <= 10 ? 'warn' : 'calm';

  const label = account.issuer || account.label || '未命名账户';
  const initial = label.charAt(0).toUpperCase();

  return (
    <div
      className={`twofa-ticket ${isActive ? 'active' : ''}`}
      onClick={onSelect}
    >
      <div className="twofa-ticket-icon" style={{ background: iconBg }}>
        {initial}
      </div>

      <div className="twofa-ticket-info">
        <div className="twofa-ticket-label">{label}</div>
        {account.account && (
          <div className="twofa-ticket-account">{account.account}</div>
        )}
      </div>

      <div
        className={`twofa-ticket-code ${codeCls}`}
        onClick={(e) => {
          e.stopPropagation();
          onCopyCode();
        }}
        title="点击复制验证码"
      >
        {fmtCode(code)}
      </div>

      <svg className="twofa-ticket-ring" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10.1"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="2.8"
        />
        <circle
          className={`twofa-ticket-ring-fill ${codeCls}`}
          cx="12"
          cy="12"
          r="10.1"
          fill="none"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeDasharray="63.5"
          strokeDashoffset={ringOff}
          transform="rotate(-90 12 12)"
        />
      </svg>

      <div className="twofa-ticket-actions" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="twofa-ticket-btn"
          onClick={onOpenQR}
          title="查看二维码"
          aria-label="查看二维码"
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
        </button>

        <button
          type="button"
          className="twofa-ticket-btn"
          onClick={onEdit}
          title="重命名 / 编辑"
          aria-label="重命名 / 编辑"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        <button
          type="button"
          className="twofa-ticket-btn del"
          onClick={onDelete}
          title="删除此账户"
          aria-label="删除此账户"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
