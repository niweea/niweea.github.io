import React, { useState, useEffect } from 'react';

interface AccountModalProps {
  isOpen: boolean;
  mode: 'save' | 'edit';
  initialIssuer?: string;
  initialAccount?: string;
  onSave: (issuer: string, account: string) => void;
  onClose: () => void;
}

export function AccountModal({
  isOpen,
  mode,
  initialIssuer = '',
  initialAccount = '',
  onSave,
  onClose,
}: AccountModalProps) {
  const [issuer, setIssuer] = useState('');
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIssuer(initialIssuer);
      setAccountName(initialAccount);
    }
  }, [isOpen, initialIssuer, initialAccount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(issuer.trim() || '自定义账户', accountName.trim());
    onClose();
  };

  const title = mode === 'save' ? '保存账户到列表' : '编辑账户信息';
  const submitText = mode === 'save' ? '确认保存' : '保存修改';

  return (
    <div
      className="twofa-modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="twofa-modal-card">
        <div className="twofa-modal-title">
          <span>{title}</span>
          <button
            type="button"
            className="twofa-modal-close"
            onClick={onClose}
            aria-label="关闭弹窗"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="twofa-modal-field">
            <label htmlFor="twofa-account-issuer">服务名称（必填）</label>
            <input
              id="twofa-account-issuer"
              type="text"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="例如：GitHub, Google, AWS, 公司邮箱"
              autoComplete="off"
              autoFocus
              required
            />
          </div>

          <div className="twofa-modal-field">
            <label htmlFor="twofa-account-name">绑定账户 / 邮箱（可选）</label>
            <input
              id="twofa-account-name"
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="例如：user@example.com 或 个人号"
              autoComplete="off"
            />
          </div>

          <div className="twofa-modal-actions">
            <button
              type="button"
              className="twofa-modal-btn"
              onClick={onClose}
            >
              取消
            </button>
            <button
              type="submit"
              className="twofa-modal-btn primary"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
