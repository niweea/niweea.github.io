import React from 'react';
import { fmtCode } from '../lib/totp';

interface DialTimerProps {
  code: string;
  ttl: number;
  period: number;
  isFlash: boolean;
  onCopy: () => void;
}

const CIRC = 552.92; // 2 * PI * 88

export function DialTimer({ code, ttl, period, isFlash, onCopy }: DialTimerProps) {
  const p = period > 0 ? period : 30;
  const fraction = Math.max(0, Math.min(1, ttl / p));
  const strokeDashoffset = CIRC * (1 - fraction);

  const stateClass = ttl <= 5 ? 'danger' : ttl <= 10 ? 'warn' : 'calm';

  return (
    <div className="twofa-dial-wrap">
      <div className="twofa-dial">
        <svg viewBox="0 0 200 200">
          <circle className="twofa-dial-track" cx="100" cy="100" r="88" />
          <circle
            className={`twofa-dial-fill ${stateClass}`}
            cx="100"
            cy="100"
            r="88"
            strokeDasharray={CIRC}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div
          className="twofa-dial-center"
          onClick={onCopy}
          title="点击复制验证码"
        >
          <div className={`twofa-dial-code ${isFlash ? 'flash' : ''}`}>
            {fmtCode(code)}
          </div>
          <div className={`twofa-dial-ttl ${stateClass}`}>
            <span className="twofa-timer-dot" />
            <span>{ttl} 秒</span>
          </div>
        </div>
      </div>
    </div>
  );
}
