'use client';

import { useSimulationStore } from '@/lib/store';
import { Box, Droplet, Hammer, CircleEqual } from 'lucide-react';

export function Presets() {
  const applyPreset = useSimulationStore(state => state.applyPreset);

  const presets = [
    { id: 'wood', label: 'কাঠের গুঁড়ি', icon: Box, color: 'text-orange-400' },
    { id: 'ice', label: 'বরফের ব্লক', icon: Droplet, color: 'text-cyan-400' },
    { id: 'metal', label: 'ভারী ধাতব ব্লক', icon: Hammer, color: 'text-zinc-400' },
    { id: 'neutral', label: 'নিমজ্জিত অবস্থায় ভাসমান বস্তু', icon: CircleEqual, color: 'text-emerald-400' },
  ] as const;

  return (
    <div className="bg-[#111111] p-4 rounded-xl border border-white/10 flex flex-col gap-3 font-body">
      <h3 className="text-white/90 font-medium tracking-wide text-sm font-heading">প্রিসেট</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {presets.map(p => (
          <button
            key={p.id}
            onClick={() => applyPreset(p.id)}
            className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors font-heading text-center"
          >
            <p.icon className={`w-5 h-5 ${p.color}`} />
            <span className="text-[11px] text-white/80">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
