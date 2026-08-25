export type TotpAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

export interface OtpAccount {
  id: string;
  secret: string;
  algo: TotpAlgorithm;
  digits: number;
  period: number;
  issuer: string;
  account: string;
  label?: string;
}

export interface OtpInputState {
  secret: string;
  algo: TotpAlgorithm;
  digits: number;
  period: number;
  issuer: string;
  account: string;
}

export interface ToastItem {
  id: string;
  message: string;
  kind?: 'success' | 'error' | 'info';
}
