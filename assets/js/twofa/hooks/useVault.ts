import { useState, useEffect, useMemo, useCallback } from 'react';
import type { OtpAccount } from '../types';
import { loadAccountsFromStorage, saveAccountsToStorage, clearAccountsStorage } from '../lib/storage';
import { mkId } from '../lib/totp';

export function useVault() {
  const [accounts, setAccounts] = useState<OtpAccount[]>(() => loadAccountsFromStorage());
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    saveAccountsToStorage(accounts);
  }, [accounts]);

  const addAccount = useCallback((acc: Omit<OtpAccount, 'id'>): OtpAccount => {
    const newAcc: OtpAccount = {
      ...acc,
      id: mkId(),
      label: acc.label || acc.issuer || 'Account',
    };
    setAccounts((prev) => {
      // Check if already exists by secret
      if (prev.some((a) => a.secret === newAcc.secret)) {
        return prev;
      }
      return [newAcc, ...prev];
    });
    return newAcc;
  }, []);

  const deleteAccount = useCallback((id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const updateAccount = useCallback((id: string, updates: Partial<OtpAccount>) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, label: updates.issuer || a.label } : a))
    );
  }, []);

  const clearAll = useCallback(() => {
    setAccounts([]);
    clearAccountsStorage();
  }, []);

  const importAccounts = useCallback((newAccounts: OtpAccount[]) => {
    let count = 0;
    setAccounts((prev) => {
      const existingSecrets = new Set(prev.map((a) => a.secret));
      const toAdd: OtpAccount[] = [];
      for (const item of newAccounts) {
        if (item.secret && !existingSecrets.has(item.secret)) {
          existingSecrets.add(item.secret);
          toAdd.push({
            id: item.id || mkId(),
            secret: item.secret,
            algo: item.algo || 'SHA-1',
            digits: item.digits || 6,
            period: item.period || 30,
            issuer: item.issuer || '',
            account: item.account || '',
            label: item.label || item.issuer || 'Account',
          });
          count++;
        }
      }
      return [...toAdd, ...prev];
    });
    return count;
  }, []);

  const filteredAccounts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return accounts;
    return accounts.filter((acc) => {
      const label = (acc.issuer || acc.label || '').toLowerCase();
      const account = (acc.account || '').toLowerCase();
      return label.includes(q) || account.includes(q);
    });
  }, [accounts, searchQuery]);

  return {
    accounts,
    filteredAccounts,
    searchQuery,
    setSearchQuery,
    addAccount,
    deleteAccount,
    updateAccount,
    clearAll,
    importAccounts,
  };
}
