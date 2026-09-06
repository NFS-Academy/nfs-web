"use client";

import { useSimulationStore } from '@/lib/store';

function SliderControl({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step, 
  unit 
}: { 
  label: string, 
  value: number, 
  onChange: (val: number) => void, 
  min: number, 
  max: number, 
  step: number, 
  unit: string 
}) {
  const isEnv = label.includes('পানি') || label.includes('ত্বরণ');
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <div className="flex justify-between items-center">
        <label className="text-[13px] text-gray-300 font-body">{label}</label>
        <div className="flex items-center gap-1">
          <input 
            type="number" 
            value={Number(value).toString()} 
            onChange={(e) => {
              let val = parseFloat(e.target.value);
              if (!isNaN(val)) {
                if (val < min) val = min;
                if (val > max) val = max;
                onChange(val);
              }
            }}
            className={`w-16 text-right text-xs font-mono bg-[#050505] border border-white/10 rounded px-1 py-0.5 focus:outline-none focus:border-white/30 ${isEnv ? 'text-emerald-400' : 'text-blue-400'}`}
          />
          <span className="text-[10px] text-gray-500 w-8">{unit}</span>
        </div>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer ${isEnv ? 'accent-emerald-500' : 'accent-blue-500'}`}
      />
    </div>
  );
}

export default function VariableControls() {
  const state = useSimulationStore();

  return (
    <div className="flex flex-col gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/10 min-h-[500px] overflow-visible font-body">
      <h3 className="text-[12px] text-gray-500 font-bold border-b border-white/10 pb-3 bg-[#0a0a0a] font-heading">চলকসমূহ</h3>
      
      <div className="space-y-2 mt-2">
        <div>
          <h4 className="text-[11px] font-bold text-gray-600 mb-4 font-heading">ইটের বৈশিষ্ট্য</h4>
          <SliderControl label="ভর" value={state.brickMass} onChange={(v) => state.setVariable('brickMass', v)} min={100} max={10000} step={10} unit="kg" />
          <SliderControl label="উচ্চতা" value={state.brickHeight} onChange={(v) => state.setVariable('brickHeight', v)} min={0.5} max={5} step={0.1} unit="m" />
          <SliderControl label="প্রস্থ" value={state.brickWidth} onChange={(v) => state.setVariable('brickWidth', v)} min={0.5} max={4} step={0.1} unit="m" />
          <SliderControl label="গভীরতা" value={state.brickDepth} onChange={(v) => state.setVariable('brickDepth', v)} min={0.5} max={4} step={0.1} unit="m" />
        </div>

        <div className="pt-4 border-t border-white/5">
          <h4 className="text-[11px] font-bold text-gray-600 mb-4 font-heading">পরিবেশ</h4>
          <SliderControl label="পানির স্তর" value={state.waterLevel} onChange={(v) => state.setVariable('waterLevel', v)} min={1} max={state.tankHeight} step={0.1} unit="m" />
          <SliderControl label="পানির ঘনত্ব" value={state.waterDensity} onChange={(v) => state.setVariable('waterDensity', v)} min={500} max={2000} step={10} unit="kg/m³" />
          <SliderControl label="অভিকর্ষজ ত্বরণ" value={state.gravity} onChange={(v) => state.setVariable('gravity', v)} min={1} max={25} step={0.1} unit="m/s²" />
        </div>
      </div>
    </div>
  );
}
