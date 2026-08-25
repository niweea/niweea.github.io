import React from 'react';

interface TitleBlockProps {
  onOpenSettings: () => void;
}

export function TitleBlock({ onOpenSettings }: TitleBlockProps) {
  return (
    <div className="twofa-titleblock">
      <div className="twofa-titleblock-name">
        <svg className="twofa-compass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
          <line x1="12" y1="17.5" x2="12.01" y2="17.5" strokeWidth="2.5" />
          <line x1="9" y1="7" x2="15" y2="7" />
        </svg>
        2FA 动态验证码
      </div>
      <div className="twofa-titleblock-actions">
        <button
          className="twofa-iconbtn"
          onClick={onOpenSettings}
          title="设置与数据备份"
          aria-label="设置与数据备份"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
