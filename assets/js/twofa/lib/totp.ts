import type { TotpAlgorithm } from '../types';

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function mkId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function b32dec(str: string): Uint8Array {
  const c = str.replace(/[\s=\-]/g, '').toUpperCase();
  if (c.startsWith('0X') || c.startsWith('HEX:')) {
    const hex = c.replace(/^(0X|HEX:)/, '');
    if (/^[0-9A-F]+$/i.test(hex) && hex.length % 2 === 0) {
      const b = new Uint8Array(hex.length / 2);
      for (let i = 0; i < b.length; i++) {
        b[i] = parseInt(hex.substr(i * 2, 2), 16);
      }
      return b;
    }
  }

  let bits = '';
  for (const ch of c) {
    const v = B32.indexOf(ch);
    if (v === -1) continue;
    bits += v.toString(2).padStart(5, '0');
  }
  const len = Math.floor(bits.length / 8);
  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    out[i] = parseInt(bits.substr(i * 8, 8), 2);
  }
  return out;
}

export async function hmacSign(algo: TotpAlgorithm, keyBytes: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const hm: Record<TotpAlgorithm, string> = {
    'SHA-1': 'SHA-1',
    'SHA-256': 'SHA-256',
    'SHA-512': 'SHA-512',
  };
  const k = await crypto.subtle.importKey(
    'raw',
    keyBytes as BufferSource,
    { name: 'HMAC', hash: { name: hm[algo] || 'SHA-1' } },
    false,
    ['sign']
  );
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, data as BufferSource));
}

export async function genTOTP(
  secret: string,
  algo: TotpAlgorithm = 'SHA-1',
  digits = 6,
  timeStep: number = 0
): Promise<string> {
  if (!secret) return '';
  const key = b32dec(secret);
  if (key.length < 4) return '';
  const buf = new ArrayBuffer(8);
  new DataView(buf).setUint32(4, timeStep, false);
  const mac = await hmacSign(algo, key, new Uint8Array(buf));
  const off = mac[mac.length - 1] & 0x0f;
  const val =
    ((mac[off] & 0x7f) << 24) |
    ((mac[off + 1] & 0xff) << 16) |
    ((mac[off + 2] & 0xff) << 8) |
    (mac[off + 3] & 0xff);
  return (val % 10 ** digits).toString().padStart(digits, '0');
}

export function getTTL(period = 30): number {
  const p = period > 0 ? period : 30;
  return p - (Math.floor(Date.now() / 1000) % p);
}

export function fmtCode(code?: string): string {
  if (!code) return '------';
  if (code.length === 6) {
    return `${code.slice(0, 3)} ${code.slice(3)}`;
  }
  if (code.length === 8) {
    return `${code.slice(0, 4)} ${code.slice(4)}`;
  }
  return code.match(/.{1,3}/g)?.join(' ') || code;
}
