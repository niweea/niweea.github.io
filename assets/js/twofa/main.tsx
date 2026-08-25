import React from 'react';
import { createRoot } from 'react-dom/client';
import { TwoFaApp } from './TwoFaApp';

const container = document.getElementById('twofa-root');
if (container) {
  const root = createRoot(container);
  root.render(<TwoFaApp />);
}
