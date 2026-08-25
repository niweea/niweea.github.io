import { useState, useEffect, useRef, useCallback } from 'react';
import type { OtpAccount, OtpInputState } from '../types';
import { genTOTP, getTTL } from '../lib/totp';

export function useTotpTicker(
  currentInput: OtpInputState,
  accounts: OtpAccount[]
) {
  const [currentCode, setCurrentCode] = useState<string>('');
  const [vaultCodes, setVaultCodes] = useState<Record<string, string>>({});
  const [ttl, setTtl] = useState<number>(() => getTTL(currentInput.period || 30));
  const [isFlash, setIsFlash] = useState<boolean>(false);

  const prevCodeRef = useRef<string>('');

  const computeAll = useCallback(async () => {
    const period = currentInput.period || 30;
    const rem = getTTL(period);
    setTtl(rem);

    const currentTimeStep = Math.floor(Date.now() / 1000 / period);

    // Calculate current active code based on real clock
    if (currentInput.secret) {
      try {
        const code = await genTOTP(
          currentInput.secret,
          currentInput.algo,
          currentInput.digits,
          currentTimeStep
        );

        setCurrentCode(code);

        if (prevCodeRef.current && prevCodeRef.current !== code) {
          setIsFlash(false);
          setTimeout(() => {
            setIsFlash(true);
            setTimeout(() => setIsFlash(false), 450);
          }, 20);
        }
        prevCodeRef.current = code;
      } catch {
        setCurrentCode('');
      }
    } else {
      setCurrentCode('');
      prevCodeRef.current = '';
    }

    // Calculate vault accounts codes (strictly synced to real clock)
    const newCodes: Record<string, string> = {};
    await Promise.all(
      accounts.map(async (acc) => {
        try {
          const p = acc.period || 30;
          const accStep = Math.floor(Date.now() / 1000 / p);
          const code = await genTOTP(acc.secret, acc.algo, acc.digits, accStep);
          newCodes[acc.id] = code;
        } catch {
          newCodes[acc.id] = '';
        }
      })
    );
    setVaultCodes(newCodes);
  }, [currentInput.secret, currentInput.algo, currentInput.digits, currentInput.period, accounts]);

  useEffect(() => {
    computeAll();
    const interval = setInterval(() => {
      computeAll();
    }, 1000);

    return () => clearInterval(interval);
  }, [computeAll]);

  return {
    currentCode,
    vaultCodes,
    ttl,
    isFlash,
  };
}
