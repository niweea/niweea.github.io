import React from 'react';
import type { OtpAccount } from '../types';
import { TicketCard } from './TicketCard';

interface VaultListProps {
  accounts: OtpAccount[];
  filteredAccounts: OtpAccount[];
  vaultCodes: Record<string, string>;
  ttl: number;
  activeSecret: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectAccount: (acc: OtpAccount) => void;
  onCopyCode: (code?: string) => void;
  onOpenQR: (acc: OtpAccount) => void;
  onEdit: (acc: OtpAccount) => void;
  onDelete: (id: string, name: string) => void;
}

export function VaultList({
  accounts,
  filteredAccounts,
  vaultCodes,
  ttl,
  activeSecret,
  searchQuery,
  onSearchChange,
  onSelectAccount,
  onCopyCode,
  onOpenQR,
  onEdit,
  onDelete,
}: VaultListProps) {
  return (
    <div className="twofa-vault">
      <div className="twofa-vault-head">
        <span className="twofa-vault-title">已保存账户列表</span>
        <span className="twofa-vault-count">{accounts.length}</span>
      </div>

      {accounts.length > 0 && (
        <div className="twofa-vault-search-wrap show">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="twofa-vault-search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索服务名称或绑定邮箱…"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      )}

      <div className="twofa-vault-list">
        {accounts.length === 0 ? (
          <div className="twofa-vault-empty">
            暂无已保存账户。在上方输入密钥并点击 <b>保存</b> 即可保存在此列表中，随时获取验证码。
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className="twofa-vault-no-match">
            未找到匹配 “{searchQuery}” 的账户
          </div>
        ) : (
          filteredAccounts.map((acc, index) => (
            <TicketCard
              key={acc.id}
              account={acc}
              code={vaultCodes[acc.id]}
              ttl={ttl}
              isActive={acc.secret === activeSecret}
              colorIndex={index}
              onSelect={() => onSelectAccount(acc)}
              onCopyCode={() => onCopyCode(vaultCodes[acc.id])}
              onOpenQR={() => onOpenQR(acc)}
              onEdit={() => onEdit(acc)}
              onDelete={() => onDelete(acc.id, acc.issuer || acc.label || '未命名账户')}
            />
          ))
        )}
      </div>
    </div>
  );
}
