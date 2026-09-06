import * as React from 'react';
import { cn } from '@/lib/utils';
import { toBanglaNumber } from '@/lib/i18n';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export function Slider({ label, value, min, max, step = 1, unit = '', className, ...props }: SliderProps) {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      <div className="flex justify-between items-end">
        <label className="text-[11px] font-bold uppercase inherit">{label}</label>
        <span className="text-sm font-mono font-bold bg-white px-2 py-0.5 border border-slate-200 rounded text-slate-800">
          {toBanglaNumber(value.toFixed(step < 1 ? 1 : 0))}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className={cn("w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer", className)}
        {...props}
      />
    </div>
  );
}
