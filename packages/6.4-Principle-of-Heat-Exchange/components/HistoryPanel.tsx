import React from 'react';
import { ExperimentResult } from '@/hooks/useSimulation';

export function HistoryPanel({ history }: { history: ExperimentResult[] }) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
      <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Experiment History</h2>
      
      <div className="space-y-3">
        {history.slice().reverse().map((h, idx) => (
          <div key={h.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-4">
              <div className="text-xl font-bold text-slate-300 w-8">#{history.length - idx}</div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                <div>
                  <span className="text-red-500 font-bold">Bucket A</span>
                  <div className="text-slate-600">{h.massA}kg {h.matA} @ {h.tempA}°C</div>
                </div>
                <div>
                  <span className="text-blue-500 font-bold">Bucket B</span>
                  <div className="text-slate-600">{h.massB}kg {h.matB} @ {h.tempB}°C</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end justify-center border-t md:border-t-0 border-slate-200 pt-2 md:pt-0">
              <div className="text-[10px] uppercase font-bold text-slate-500">Final Temp</div>
              <div className="text-lg font-black text-emerald-600">{h.finalTemp.toFixed(1)}°C</div>
              {h.qEnv > 0 && <div className="text-[10px] text-amber-500 font-bold mt-1">Heat lost to env: {h.qEnv.toFixed(1)} kJ</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
