import React from 'react';
import type { ModelScale } from '../types';

interface ModelSelectorProps {
  value: ModelScale;
  disabled: boolean;
  onChange: (scale: ModelScale) => void;
}

const OPTIONS: { value: ModelScale; label: string; hint: string }[] = [
  { value: 'tiny',   label: 'Tiny 超轻量',   hint: '约 6MB · 速度最快' },
  { value: 'small',  label: 'Small 均衡版',  hint: '约 30MB · 推荐' },
  { value: 'medium', label: 'Medium 精准版', hint: '约 139MB · 最精准' },
];

export function ModelSelector({ value, disabled, onChange }: ModelSelectorProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <span style={{ fontSize: '0.75rem', color: 'inherit', opacity: 0.7 }}>模型规格:</span>
      <select
        className="ocr-model-select"
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.target.value as ModelScale)}
      >
        {OPTIONS.map(o => (
          <option key={o.value} value={o.value}>
            {o.label} ({o.hint})
          </option>
        ))}
      </select>
    </div>
  );
}
