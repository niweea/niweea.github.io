import { useEffect } from 'react';

interface KeyboardShortcutsOptions {
  onPaste?: () => void;
  onCopy?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts({ onPaste, onCopy, onEscape }: KeyboardShortcutsOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }

      if (isInput) return;

      if (e.key === 'v' || e.key === 'V') {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          onPaste?.();
        }
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        onCopy?.();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPaste, onCopy, onEscape]);
}
