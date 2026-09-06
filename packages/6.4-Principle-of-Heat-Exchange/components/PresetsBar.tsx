import React from 'react';
import { SimMode } from '@/hooks/useSimulation';

interface Preset {
  label: string;
  apply: () => void;
}

export function PresetsBar({
  mode,
  setMassA, setTempA, setMatA,
  setMassB, setTempB, setMatB,
  setEnvLoss,
  isDisabled
}: {
  mode: SimMode;
  setMassA: (v: number) => void; setTempA: (v: number) => void; setMatA: (v: string) => void;
  setMassB: (v: number) => void; setTempB: (v: number) => void; setMatB: (v: string) => void;
  setEnvLoss: (v: boolean) => void;
  isDisabled: boolean;
}) {
  let presets: Preset[] = [];

  if (mode === 'LEARN') {
    presets = [
      { label: 'সাধারণ', apply: () => { setMassA(2); setTempA(75); setMassB(1); setTempB(20); } },
      { label: 'সমান ভর', apply: () => { setMassA(1); setTempA(80); setMassB(1); setTempB(20); } },
    ];
  } else if (mode === 'EXPERIMENT') {
    presets = [
      { label: 'সমান ভর', apply: () => { setMatA('Water'); setMassA(2); setTempA(80); setMatB('Water'); setMassB(2); setTempB(20); setEnvLoss(false); } },
      { label: 'গরম বস্তুর ভর বেশি', apply: () => { setMatA('Water'); setMassA(4); setTempA(80); setMatB('Water'); setMassB(1); setTempB(20); setEnvLoss(false); } },
      { label: 'ঠান্ডা বস্তুর ভর বেশি', apply: () => { setMatA('Water'); setMassA(1); setTempA(80); setMatB('Water'); setMassB(4); setTempB(20); setEnvLoss(false); } },
      { label: 'পানি বনাম ধাতু', apply: () => { setMatA('Iron'); setMassA(2); setTempA(90); setMatB('Water'); setMassB(2); setTempB(20); setEnvLoss(false); } },
      { label: 'বেশি তাপমাত্রার পার্থক্য', apply: () => { setMatA('Water'); setMassA(2); setTempA(100); setMatB('Water'); setMassB(2); setTempB(0); setEnvLoss(false); } },
      { label: 'কম তাপমাত্রার পার্থক্য', apply: () => { setMatA('Water'); setMassA(2); setTempA(40); setMatB('Water'); setMassB(2); setTempB(30); setEnvLoss(false); } },
    ];
  } else if (mode === 'PHASE_CHANGE') {
    presets = [
      { label: 'বরফ + পানি', apply: () => { setMassA(1); setTempA(-10); setMassB(1); setTempB(50); } },
      { label: 'পানি + বরফ', apply: () => { setMassA(1); setTempA(50); setMassB(1); setTempB(-10); } },
      { label: 'বাষ্প + পানি', apply: () => { setMassA(0.5); setTempA(110); setMassB(2); setTempB(20); } },
      { label: 'বরফ উত্তপ্তকরণ → পানি → বাষ্প', apply: () => { setMassA(1); setTempA(-50); setMassB(4); setTempB(100); } },
      { label: 'বাষ্প শীতলীকরণ → পানি → বরফ', apply: () => { setMassA(1); setTempA(110); setMassB(5); setTempB(-20); } },
    ];
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-3 border-t border-slate-200 mt-4 font-heading">
      <span className="font-bold text-slate-700 uppercase">প্রিসেট:</span>
      {presets.map((p, i) => (
        <React.Fragment key={p.label}>
          <button disabled={isDisabled} onClick={p.apply} className="hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {p.label}
          </button>
          {i < presets.length - 1 && <span className="text-slate-300">|</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
