import React from 'react';
import { Play, RotateCcw, FastForward, Pause } from 'lucide-react';
import { Slider } from './ui/slider';
import { SimulationPhase, SimMode } from '@/hooks/useSimulation';
import { toBanglaNumber } from '@/lib/i18n';

interface ControlsProps {
  mode: SimMode;
  massA: number; setMassA: (v: number) => void;
  tempA: number; setTempA: (v: number) => void;
  matA: string; setMatA: (v: string) => void;
  massB: number; setMassB: (v: number) => void;
  tempB: number; setTempB: (v: number) => void;
  matB: string; setMatB: (v: string) => void;
  envLoss: boolean; setEnvLoss: (v: boolean) => void;
  phase: SimulationPhase;
  startSimulation: () => void;
  resetSimulation: () => void;
  isPaused: boolean;
  setIsPaused: (v: boolean | ((prev: boolean) => boolean)) => void;
  speed: number;
  setSpeed: (v: number) => void;
}

export function Controls({
  mode,
  massA, setMassA, tempA, setTempA, matA, setMatA,
  massB, setMassB, tempB, setTempB, matB, setMatB,
  envLoss, setEnvLoss,
  phase, startSimulation, resetSimulation, isPaused, setIsPaused, speed, setSpeed
}: ControlsProps) {
  const isDisabled = phase !== 'SETUP';

  const MATERIALS = mode === 'PHASE_CHANGE' ? ['H2O'] : ['Water', 'Iron', 'Copper', 'Aluminum'];
  const minTemp = mode === 'PHASE_CHANGE' ? -100 : 0;
  const maxTemp = mode === 'PHASE_CHANGE' ? 110 : 100;

  const renderপদার্থSelect = (label: string, value: string, onChange: (v: string) => void) => {
    if (mode === 'LEARN' || mode === 'PHASE_CHANGE') return null;
    return (
      <div className="flex justify-between items-center text-[11px] font-bold uppercase inherit mt-2 mb-1">
        <label>{label} পদার্থ</label>
        <select disabled={isDisabled} value={value} onChange={e => onChange(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-0.5 text-slate-700 font-sans cursor-pointer focus:outline-none">
          {MATERIALS.map(m => <option key={m} value={m}>{m === 'Water' ? 'পানি' : m === 'Iron' ? 'লোহা' : m === 'Copper' ? 'তামা' : m === 'Aluminum' ? 'অ্যালুমিনিয়াম' : m === 'H2O' ? 'পানি (H2O)' : m}</option>)}
        </select>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <div className="space-y-4">
        {renderপদার্থSelect('গরম বস্তু', matA, setMatA)}
        <Slider
          label="গরম বস্তু: ভর" value={massA} min={0.1} max={5} step={0.1} unit=" kg"
          onChange={(e) => setMassA(parseFloat(e.target.value))} disabled={isDisabled} className="accent-red-500 text-red-500"
        />
        <Slider
          label="প্রাথমিক তাপমাত্রা" value={tempA} min={minTemp} max={maxTemp} step={1} unit="°C"
          onChange={(e) => setTempA(parseFloat(e.target.value))} disabled={isDisabled} className="accent-red-500 text-red-500"
        />
      </div>

      <div className="space-y-4">
        {renderপদার্থSelect('ঠান্ডা বস্তু', matB, setMatB)}
        <Slider
          label="ঠান্ডা বস্তু: ভর" value={massB} min={0.1} max={5} step={0.1} unit=" kg"
          onChange={(e) => setMassB(parseFloat(e.target.value))} disabled={isDisabled} className="accent-blue-500 text-blue-500"
        />
        <Slider
          label="প্রাথমিক তাপমাত্রা" value={tempB} min={minTemp} max={maxTemp} step={1} unit="°C"
          onChange={(e) => setTempB(parseFloat(e.target.value))} disabled={isDisabled} className="accent-blue-500 text-blue-500"
        />
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 mt-2">
        <div className="flex flex-wrap gap-2">
          {phase === 'SETUP' ? (
            <button disabled={isDisabled} onClick={startSimulation} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2">
              <Play className="w-4 h-4" /> শুরু করুন
            </button>
          ) : (
            <>
              {phase === 'EXCHANGE' && (
                <button onClick={() => setIsPaused(p => !p)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                  {isPaused ? <><Play className="w-4 h-4" /> আবার শুরু করুন</> : <><Pause className="w-4 h-4" /> থামান</>}
                </button>
              )}
              <button onClick={resetSimulation} className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-500 px-6 py-2 rounded-lg font-bold transition-colors border border-slate-200">
                <RotateCcw className="w-4 h-4" /> পুনরায় সেট করুন
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          {mode === 'EXPERIMENT' && (
            <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
              <input type="checkbox" checked={envLoss} onChange={e => setEnvLoss(e.target.checked)} disabled={isDisabled} className="accent-amber-500 w-4 h-4" />
              পরিবেশের সাথে তাপের আদান-প্রদান
            </label>
          )}

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 uppercase flex items-center gap-1">
              <FastForward className="w-3 h-3" /> গতি:
            </span>
            <div className="flex border border-slate-200 rounded-md bg-white overflow-hidden shadow-sm">
              {[0.5, 1, 2, 5].map(s => (
                <button key={s} onClick={() => setSpeed(s)} className={`px-3 py-1 border-r last:border-r-0 border-slate-100 text-xs transition-colors ${speed === s ? 'bg-slate-200 font-bold text-slate-800' : 'hover:bg-slate-50 text-slate-500'}`}>
                  {s.toFixed(1)}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
