import React from 'react';
import { createRoot } from 'react-dom/client';
import { OcrApp } from './OcrApp';

const container = document.getElementById('ocr-root');
if (container) {
  const root = createRoot(container);
  root.render(<OcrApp />);
}
