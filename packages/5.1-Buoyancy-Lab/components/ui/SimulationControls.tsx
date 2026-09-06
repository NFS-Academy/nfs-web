"use client";

import { useSimulationStore } from '@/lib/store';
import { Play, Pause, RotateCcw, Eye, EyeOff, Activity, ArrowDownUp, Ruler, LineChart } from 'lucide-react';

export function SimulationControls() {
  const { 
    isPlaying, 
    setIsPlaying, 
    resetSimulation, 
    animationSpeed, 
    setVariable,
    showForces,
    showPressure,
    showMeasurement,
    showGraphs
  } = useSimulationStore();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl font-heading">
      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center justify-center gap-2 py-1.5 px-4 rounded-lg text-xs font-bold transition-all ${isPlaying ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]'}`}
        >
          {isPlaying ? <><Pause size={14} /> পজ</> : <><Play size={14} /> প্লে</>}
        </button>
        <button 
          onClick={() => {
            resetSimulation();
            window.dispatchEvent(new Event('reset-camera'));
          }}
          className="flex items-center justify-center p-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          title="সবকিছু রিসেট"
        >
          <RotateCcw size={16} />
        </button>
        <button 
          onClick={() => {
            window.dispatchEvent(new Event('reset-camera'));
          }}
          className="flex items-center justify-center p-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          title="ভিউ রিসেট"
        >
          <Eye size={16} />
        </button>
      </div>

      <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
        <button
          onClick={() => setVariable('showForces', !showForces)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${showForces ? 'bg-blue-500/20 text-blue-300' : 'text-gray-400 hover:bg-white/10'}`}
          title="বলসমূহের দিক দেখান"
        >
          <ArrowDownUp size={14} />
          <span className="hidden sm:inline">বলসমূহ</span>
        </button>
        <button
          onClick={() => setVariable('showPressure', !showPressure)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${showPressure ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:bg-white/10'}`}
          title="বস্তুর উপর চাপ দেখান"
        >
          <Activity size={14} />
          <span className="hidden sm:inline">চাপ</span>
        </button>
        <button
          onClick={() => setVariable('showMeasurement', !showMeasurement)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${showMeasurement ? 'bg-yellow-500/20 text-yellow-300' : 'text-gray-400 hover:bg-white/10'}`}
          title="পরিমাপ"
        >
          <Ruler size={14} />
          <span className="hidden sm:inline">পরিমাপ</span>
        </button>
        <button
          onClick={() => setVariable('showGraphs', !showGraphs)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${showGraphs ? 'bg-emerald-500/20 text-emerald-300' : 'text-gray-400 hover:bg-white/10'}`}
          title="গ্রাফ দেখান"
        >
          <LineChart size={14} />
          <span className="hidden sm:inline">গ্রাফ</span>
        </button>
      </div>
    </div>
  );
}
