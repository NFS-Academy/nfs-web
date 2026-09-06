import React from 'react';

interface DynamicFormulaProps {
  isHeating: boolean;
  heatAdded: number;
}

export function DynamicFormula({ isHeating, heatAdded }: DynamicFormulaProps) {
  const showDeltaT = heatAdded > 0;
  
  return (
    <div className="bg-[#fdfdfb] p-4 rounded-2xl border border-[#e1e1d8] flex flex-col items-center">
      <h3 className="text-[10px] font-bold text-[#8a8a70] uppercase tracking-widest mb-4 font-heading">সূত্র</h3>
      <div className="text-4xl font-heading font-bold text-[#5a5a40] flex items-center gap-2">
        <span className={`transition-colors duration-300 ${isHeating ? 'text-orange-500 font-bold' : ''}`}>Q</span>
        <span>=</span>
        <span>mc</span>
        <span className={`transition-colors duration-300 ${showDeltaT ? 'text-red-500 font-bold' : ''}`}>ΔT</span>
      </div>
    </div>
  );
}
