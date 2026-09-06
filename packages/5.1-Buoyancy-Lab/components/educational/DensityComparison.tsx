'use client';

import { useSimulationStore } from '@/lib/store';
import { useMemo } from 'react';

export function DensityComparison() {
  const waterDensity = useSimulationStore(state => state.waterDensity);
  const brickMass = useSimulationStore(state => state.brickMass);
  const brickHeight = useSimulationStore(state => state.brickHeight);
  const brickWidth = useSimulationStore(state => state.brickWidth);
  const brickDepth = useSimulationStore(state => state.brickDepth);

  const brickVolume = brickHeight * brickWidth * brickDepth;
  const brickDensity = brickMass / brickVolume;

  const maxDensity = Math.max(brickDensity, waterDensity, 1500) * 1.1;

  const brickPercent = (brickDensity / maxDensity) * 100;
  const waterPercent = (waterDensity / maxDensity) * 100;

  const status = useMemo(() => {
    // using a tiny margin for float precision
    if (Math.abs(brickDensity - waterDensity) < 1) return 'নিমজ্জিত অবস্থায় ভাসবে';
    if (brickDensity < waterDensity) return 'ভাসবে';
    return 'ডুবে যাবে';
  }, [brickDensity, waterDensity]);

  return (
    <div className="bg-[#111111] p-4 rounded-xl border border-white/10 flex flex-col gap-4 font-body">
      <div className="flex justify-between items-center">
        <h3 className="text-white/90 font-medium tracking-wide text-sm font-heading">ঘনত্ব তুলনা</h3>
        <span className={`text-xs font-bold px-2 py-1 rounded font-heading ${
          status.includes('ভাসবে') && !status.includes('নিমজ্জিত') ? 'bg-emerald-500/20 text-emerald-400' :
          status.includes('নিমজ্জিত') ? 'bg-blue-500/20 text-blue-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {status}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Brick Density */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-white/60">
            <span>ইটের ঘনত্ব (ρ_ইট)</span>
            <span className="font-mono text-white/90">{brickDensity.toFixed(0)} kg/m³</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${brickPercent}%` }}
            />
          </div>
        </div>

        {/* Water Density */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-white/60">
            <span>পানির ঘনত্ব (ρ_পানি)</span>
            <span className="font-mono text-white/90">{waterDensity.toFixed(0)} kg/m³</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${waterPercent}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="text-[11px] text-white/50 text-center font-mono mt-2 bg-white/5 p-2 rounded">
        {brickDensity < waterDensity && 'ρ_ইট < ρ_পানি → বস্তুটি ভাসবে'}
        {Math.abs(brickDensity - waterDensity) < 1 && 'ρ_ইট = ρ_পানি → নিমজ্জিত অবস্থায় ভাসবে'}
        {brickDensity > waterDensity && 'ρ_ইট > ρ_পানি → বস্তুটি ডুবে যাবে'}
      </div>
    </div>
  );
}
