import { SimMode } from '@/hooks/useSimulation';

export function ModeSelector({ mode, setMode }: { mode: SimMode; setMode: (m: SimMode) => void }) {
  return (
    <div className="flex bg-slate-100 p-1 rounded-lg font-heading">
      <button 
        onClick={() => setMode('LEARN')}
        className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'LEARN' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
        শেখা
      </button>
      <button 
        onClick={() => setMode('EXPERIMENT')}
        className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'EXPERIMENT' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
        পরীক্ষা
      </button>
      <button 
        onClick={() => setMode('PHASE_CHANGE')}
        className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'PHASE_CHANGE' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
        দশা পরিবর্তন
      </button>
    </div>
  );
}
