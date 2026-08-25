import type { OtpAccount } from '../types';

const STORAGE_KEY = 'vault_2fa_accounts';

export function loadAccountsFromStorage(): OtpAccount[] {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data.filter(item => item && typeof item.secret === 'string');
    }
    return [];
  } catch (err) {
    console.error('Failed to load 2FA accounts from localStorage:', err);
    return [];
  }
}

export function saveAccountsToStorage(accounts: OtpAccount[]): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    const data = accounts.map(({ id, secret, algo, digits, period, issuer, account, label }) => ({
      id,
      secret,
      algo: algo || 'SHA-1',
      digits: digits || 6,
      period: period || 30,
      issuer: issuer || '',
      account: account || '',
      label: label || issuer || 'Account',
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save 2FA accounts to localStorage:', err);
    return false;
  }
}

export function clearAccountsStorage(): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Failed to clear 2FA localStorage:', err);
    return false;
  }
}
