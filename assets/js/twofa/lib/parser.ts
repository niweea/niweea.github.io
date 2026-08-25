import type { OtpInputState, TotpAlgorithm } from '../types';

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}

export function parseOTP(raw: string): OtpInputState | null {
  const s = raw.trim();
  if (s.startsWith('otpauth://')) {
    try {
      const u = new URL(s);
      const lbl = decodeURIComponent(u.pathname.replace(/^\/(totp|hotp)\//i, ''));
      const parts = lbl.split(':');
      const algoMap: Record<string, TotpAlgorithm> = {
        SHA1: 'SHA-1',
        SHA256: 'SHA-256',
        SHA512: 'SHA-512',
      };
      const secret = (u.searchParams.get('secret') || '').replace(/[\s\-]/g, '').toUpperCase();
      const rawAlgo = (u.searchParams.get('algorithm') || 'SHA1').toUpperCase();
      const algo: TotpAlgorithm = algoMap[rawAlgo] || 'SHA-1';
      const digits = parseInt(u.searchParams.get('digits') || '6', 10);
      const period = parseInt(u.searchParams.get('period') || '30', 10);
      const issuerParam = u.searchParams.get('issuer');
      const issuer = issuerParam || (parts.length > 1 ? parts[0].trim() : '');
      const account = parts.length > 1 ? parts.slice(1).join(':').trim() : (issuerParam ? lbl.trim() : '');

      return {
        secret,
        issuer,
        account,
        digits: Number.isFinite(digits) && digits > 0 ? digits : 6,
        period: Number.isFinite(period) && period > 0 ? period : 30,
        algo,
      };
    } catch {
      return null;
    }
  }
  return null;
}

export function validateSecret(raw: string): ValidationResult {
  const s = raw.trim();
  if (!s) return { valid: true, error: null };

  if (s.startsWith('otpauth://')) {
    try {
      const u = new URL(s);
      const secret = (u.searchParams.get('secret') || '').replace(/[\s\-]/g, '').toUpperCase();
      if (!secret) return { valid: false, error: 'otpauth:// 链接未包含 secret 密钥参数' };
      if (/[^A-Z2-7=]/.test(secret)) return { valid: false, error: '链接中的密钥包含非 Base32 字符' };
      if (secret.length < 8) return { valid: false, error: `链接中的密钥过短（当前 ${secret.length} 位）` };
      return { valid: true, error: null };
    } catch {
      return { valid: false, error: 'otpauth:// 链接格式无效' };
    }
  }

  if (/[\u4e00-\u9fa5]/.test(s)) {
    return { valid: false, error: '密钥不能包含中文字符，请输入标准 Base32 密钥' };
  }

  const clean = s.replace(/[\s\-]/g, '').toUpperCase();

  if (clean.startsWith('0X') || clean.startsWith('HEX:')) {
    const hex = clean.replace(/^(0X|HEX:)/, '');
    if (!/^[0-9A-F]+$/i.test(hex)) return { valid: false, error: '十六进制 Hex 密钥仅支持 0-9 与 A-F 字符' };
    if (hex.length < 8) return { valid: false, error: `Hex 密钥过短（当前 ${hex.length} 位）` };
    return { valid: true, error: null };
  }

  if (/[^A-Z2-7=]/.test(clean)) {
    const invalidMatches = clean.match(/[^A-Z2-7=]/g);
    const invalidChars = invalidMatches ? Array.from(new Set(invalidMatches)).join(', ') : '';
    return {
      valid: false,
      error: `包含非 Base32 字符 [ ${invalidChars} ]（Base32 仅支持英文字母 A-Z 及数字 2-7）`,
    };
  }

  if (clean.length < 8) {
    return {
      valid: false,
      error: `密钥长度较短（当前 ${clean.length} 位，标准通常为 16 或 32 位）`,
    };
  }

  return { valid: true, error: null };
}

export function normalize(raw: string): OtpInputState {
  const s = raw.trim();
  const parsed = parseOTP(s);
  if (parsed) return parsed;
  return {
    secret: s.replace(/[\s\-]/g, '').toUpperCase(),
    issuer: '',
    account: '',
    digits: 6,
    period: 30,
    algo: 'SHA-1',
  };
}

export function buildOtpauthUrl(acc: {
  secret: string;
  issuer?: string;
  account?: string;
  algo?: TotpAlgorithm;
  digits?: number;
  period?: number;
}): string {
  const issuer = acc.issuer || 'Account';
  const label = acc.account
    ? `${encodeURIComponent(issuer)}:${encodeURIComponent(acc.account)}`
    : encodeURIComponent(issuer);

  const algoMap: Record<TotpAlgorithm, string> = {
    'SHA-1': 'SHA1',
    'SHA-256': 'SHA256',
    'SHA-512': 'SHA512',
  };

  const params = new URLSearchParams({
    secret: acc.secret,
    issuer,
    algorithm: algoMap[acc.algo || 'SHA-1'] || 'SHA1',
    digits: String(acc.digits || 6),
    period: String(acc.period || 30),
  });

  return `otpauth://totp/${label}?${params.toString()}`;
}
