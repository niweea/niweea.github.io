import React, { useState, useCallback, useMemo, useRef } from 'react';
import type { OtpAccount, OtpInputState, ToastItem } from './types';
import { normalize, validateSecret } from './lib/parser';
import { useVault } from './hooks/useVault';
import { useTotpTicker } from './hooks/useTotpTicker';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { TitleBlock } from './components/TitleBlock';
import { SpecInput } from './components/SpecInput';
import { ReadoutCard } from './components/ReadoutCard';
import { VaultList } from './components/VaultList';
import { SettingsDrawer } from './components/SettingsDrawer';
import { QrModal } from './components/QrModal';
import { AccountModal } from './components/AccountModal';
import { ToastContainer } from './components/ToastContainer';

export function TwoFaApp() {
  const [rawInput, setRawInput] = useState<string>('');
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastSeq = useRef(0);

  const addToast = useCallback((message: string, kind: ToastItem['kind'] = 'success') => {
    const id = String(++toastSeq.current);
    setToasts((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  }, []);

  const inputValidation = useMemo(() => {
    return validateSecret(rawInput);
  }, [rawInput]);

  const currentInput: OtpInputState = useMemo(() => {
    return normalize(rawInput);
  }, [rawInput]);

  const {
    accounts,
    filteredAccounts,
    searchQuery,
    setSearchQuery,
    addAccount,
    deleteAccount,
    updateAccount,
    clearAll,
    importAccounts,
  } = useVault();

  const { currentCode, vaultCodes, ttl, isFlash } = useTotpTicker(currentInput, accounts);

  // Modals & Panels State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [qrModalData, setQrModalData] = useState<{
    secret: string;
    issuer?: string;
    account?: string;
    algo?: any;
    digits?: number;
    period?: number;
  } | null>(null);
  const [editingAccount, setEditingAccount] = useState<OtpAccount | null>(null);

  // Check if current secret is already saved in vault
  const isSaved = useMemo(() => {
    if (!currentInput.secret) return false;
    return accounts.some((a) => a.secret === currentInput.secret);
  }, [accounts, currentInput.secret]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text.trim()) {
        addToast('剪贴板中无内容', 'info');
        return;
      }
      setRawInput(text.trim());
      addToast('已粘贴密钥并解析', 'success');
    } catch {
      addToast('无法直接访问剪贴板，请使用 Ctrl+V / Cmd+V 手动粘贴', 'error');
    }
  }, [addToast]);

  const handleCopyCode = useCallback(
    async (codeToCopy?: string) => {
      const target = codeToCopy || currentCode;
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target);
        addToast('验证码已复制到剪贴板', 'success');
      } catch {
        addToast('复制失败，请手动选取复制', 'error');
      }
    },
    [currentCode, addToast]
  );

  const handleOpenSave = useCallback(() => {
    if (!currentInput.secret || !inputValidation.valid) {
      addToast('请先输入有效的 2FA 密钥', 'error');
      return;
    }
    if (isSaved) return;
    setIsSaveModalOpen(true);
  }, [currentInput.secret, inputValidation.valid, isSaved, addToast]);

  const handleConfirmSave = useCallback(
    (issuer: string, account: string) => {
      const finalIssuer = issuer.trim() || '自定义账户';
      addAccount({
        secret: currentInput.secret,
        algo: currentInput.algo,
        digits: currentInput.digits,
        period: currentInput.period,
        issuer: finalIssuer,
        account: account.trim(),
        label: finalIssuer,
      });
      setIsSaveModalOpen(false);
      addToast(`已保存账户「${finalIssuer}」至列表`, 'success');
    },
    [currentInput, addAccount, addToast]
  );

  const handleDeleteAccount = useCallback(
    (id: string, name: string) => {
      if (window.confirm(`确定要删除账户 "${name}" 吗？`)) {
        deleteAccount(id);
        addToast(`已删除账户 "${name}"`, 'info');
      }
    },
    [deleteAccount, addToast]
  );

  const handleSelectAccount = useCallback((acc: OtpAccount) => {
    setRawInput(acc.secret);
  }, []);

  const handleEscape = useCallback(() => {
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
      return;
    }
    if (isSaveModalOpen) {
      setIsSaveModalOpen(false);
      return;
    }
    if (qrModalData) {
      setQrModalData(null);
      return;
    }
    if (editingAccount) {
      setEditingAccount(null);
      return;
    }
    setRawInput('');
  }, [isSettingsOpen, isSaveModalOpen, qrModalData, editingAccount]);

  useKeyboardShortcuts({
    onPaste: handlePaste,
    onCopy: () => handleCopyCode(),
    onEscape: handleEscape,
  });

  return (
    <div className="twofa-app">
      {/* Title block */}
      <TitleBlock onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main responsive grid following page layout */}
      <div className="twofa-grid">
        {/* Left Column: Key input & Active readout instrument */}
        <div className="twofa-col-left">
          <SpecInput
            value={rawInput}
            error={inputValidation.error}
            onChange={setRawInput}
            onPaste={handlePaste}
          />

          <ReadoutCard
            currentInput={currentInput}
            code={currentCode}
            ttl={ttl}
            isFlash={isFlash}
            isSaved={isSaved}
            onSave={handleOpenSave}
            onCopy={() => handleCopyCode(currentCode)}
            onOpenQR={() =>
              setQrModalData({
                secret: currentInput.secret,
                issuer: currentInput.issuer || '当前验证码',
                account: currentInput.account,
                algo: currentInput.algo,
                digits: currentInput.digits,
                period: currentInput.period,
              })
            }
          />
        </div>

        {/* Right Column: Saved accounts list */}
        <div className="twofa-col-right">
          <VaultList
            accounts={accounts}
            filteredAccounts={filteredAccounts}
            vaultCodes={vaultCodes}
            ttl={ttl}
            activeSecret={currentInput.secret}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectAccount={handleSelectAccount}
            onCopyCode={handleCopyCode}
            onOpenQR={(acc) => setQrModalData(acc)}
            onEdit={(acc) => setEditingAccount(acc)}
            onDelete={handleDeleteAccount}
          />
        </div>
      </div>

      {/* Privacy & Security Guarantee */}
      <div className="twofa-privacy-card">
        <div className="twofa-privacy-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span>纯本地离线计算 · 零网络传输 · 隐私安全保障</span>
        </div>
        <p className="twofa-privacy-text">
          所有 2FA 动态验证码均在您的浏览器本地实时计算，密钥仅存储在当前设备的 LocalStorage 中，绝不上传至任何服务器。
        </p>
      </div>

      {/* Bottom shortcut legend */}
      <div className="twofa-footer">
        <kbd>V</kbd> 粘贴 &nbsp; <kbd>Enter</kbd> 复制验证码 &nbsp; <kbd>Esc</kbd> 清空 / 关闭
      </div>

      {/* Settings drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        accounts={accounts}
        onClose={() => setIsSettingsOpen(false)}
        onImportJSON={importAccounts}
        onClearAll={clearAll}
        onAddToast={addToast}
      />

      {/* QR Modal */}
      <QrModal
        isOpen={Boolean(qrModalData)}
        data={qrModalData}
        onClose={() => setQrModalData(null)}
        onAddToast={addToast}
      />

      {/* Save Account Modal */}
      <AccountModal
        isOpen={isSaveModalOpen}
        mode="save"
        initialIssuer={currentInput.issuer || ''}
        initialAccount={currentInput.account || ''}
        onSave={handleConfirmSave}
        onClose={() => setIsSaveModalOpen(false)}
      />

      {/* Edit Account Modal */}
      <AccountModal
        isOpen={Boolean(editingAccount)}
        mode="edit"
        initialIssuer={editingAccount?.issuer || editingAccount?.label || ''}
        initialAccount={editingAccount?.account || ''}
        onSave={(issuer, account) => {
          if (editingAccount) {
            updateAccount(editingAccount.id, { issuer, account });
            if (currentInput.secret === editingAccount.secret) {
              setRawInput(editingAccount.secret);
            }
            addToast(`已更新账户「${issuer}」`, 'success');
            setEditingAccount(null);
          }
        }}
        onClose={() => setEditingAccount(null)}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
