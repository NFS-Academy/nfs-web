'use client';

import { usePhysics } from '@/lib/physics-context';
import { Activity } from 'lucide-react';

export default function PressureGauge() {
  const { p } = usePhysics();

  // Assuming max reasonable pressure is around 10 for the gauge display
  const maxP = 10;
  const percentage = Math.min(100, Math.max(0, (p / maxP) * 100));

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 p-6 text-slate-100">
      <h2 className="text-lg font-heading font-semibold flex items-center gap-2 mb-4 text-slate-100">
        <Activity className="w-5 h-5 text-blue-400" />
        তরলের চাপ (Fluid Pressure)
      </h2>
      
      <div className="relative h-4 bg-white/10 rounded-full overflow-hidden mb-2">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400 font-mono">0</span>
        <div className="font-mono text-center">
          <span className="block text-2xl font-bold text-white">{p.toFixed(2)}</span>
          <span className="text-slate-400 text-xs">N/cm²</span>
        </div>
        <span className="text-slate-400 font-mono">{maxP}+</span>
      </div>
    </div>
  );
}
