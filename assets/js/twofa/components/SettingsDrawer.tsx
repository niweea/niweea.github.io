import React, { useRef } from 'react';
import type { OtpAccount } from '../types';

interface SettingsDrawerProps {
  isOpen: boolean;
  accounts: OtpAccount[];
  onClose: () => void;
  onImportJSON: (accounts: OtpAccount[]) => void;
  onClearAll: () => void;
  onAddToast: (msg: string, kind?: 'success' | 'error' | 'info') => void;
}

export function SettingsDrawer({
  isOpen,
  accounts,
  onClose,
  onImportJSON,
  onClearAll,
  onAddToast,
}: SettingsDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    if (!accounts.length) {
      onAddToast('暂无数据可导出', 'error');
      return;
    }
    const data = accounts.map(({ id, ...rest }) => rest);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `2fa-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onAddToast('已导出 JSON 备份文件', 'success');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (!Array.isArray(parsed)) throw new Error('Invalid format');
        const valid = parsed.filter((item) => item && typeof item.secret === 'string');
        if (!valid.length) {
          onAddToast('未在文件中找到有效 2FA 账户', 'error');
          return;
        }
        onImportJSON(valid);
        onAddToast(`成功导入 ${valid.length} 个账户`, 'success');
      } catch {
        onAddToast('JSON 文件格式无效或解析失败', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handlePurgeAll = () => {
    if (!accounts.length) {
      onAddToast('账户列表已经是空的', 'info');
      return;
    }
    if (window.confirm('确定要清空所有已保存账户吗？此操作无法撤销。')) {
      onClearAll();
      onAddToast('已清空所有账户数据', 'info');
    }
  };

  return (
    <>
      <div
        className={`twofa-panel-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`twofa-panel ${isOpen ? 'open' : ''}`}>
        <div className="twofa-panel-head">
          <h3>设置与数据备份</h3>
          <button
            type="button"
            className="twofa-panel-close"
            onClick={onClose}
            aria-label="关闭设置"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="twofa-panel-body">
          {/* Backup Section */}
          <div className="twofa-panel-section">
            <div className="twofa-panel-section-title">数据备份与迁移</div>
            <button
              type="button"
              className="twofa-panel-btn"
              onClick={handleExportJSON}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              导出 JSON 备份文件
            </button>

            <button
              type="button"
              className="twofa-panel-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              导入 JSON 备份文件
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {/* Danger Zone */}
          <div className="twofa-panel-section">
            <div className="twofa-panel-section-title">危险操作</div>
            <button
              type="button"
              className="twofa-panel-btn danger"
              onClick={handlePurgeAll}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
              清空所有账户数据
            </button>
          </div>
        </div>

        <div className="twofa-panel-footer">
          数据仅保存在您本地浏览器的 LocalStorage 中
          <br />
          绝不上传服务器 · 纯离线安全
        </div>
      </div>
    </>
  );
}
