'use client';

import { usePhysics } from '@/lib/physics-context';
import { Settings2, RotateCcw, Droplet, Play, Pause, FastForward } from 'lucide-react';

export default function ControlPanel() {
  const physics = usePhysics();

  const handleStart = () => physics.setExperimentState('running');
  const handlePause = () => physics.setExperimentState('paused');
  const handleReset = () => {
    physics.reset();
    physics.setExperimentState('idle');
  };

  return (
    <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <h2 className="text-xl font-heading font-semibold text-blue-400 flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-blue-500" />
          নিয়ন্ত্রণ প্যানেল
        </h2>
        <div className="flex flex-wrap gap-2">
          {physics.experimentState === 'idle' || physics.experimentState === 'completed' ? (
            <button
              onClick={handleStart}
              className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Play className="w-4 h-4" />
              পরীক্ষা শুরু করুন
            </button>
          ) : physics.experimentState === 'running' ? (
            <button
              onClick={handlePause}
              className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Pause className="w-4 h-4" />
              বিরতি
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="px-4 py-1.5 rounded bg-green-600 hover:bg-green-500 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-green-500/20"
            >
              <Play className="w-4 h-4" />
              চালিয়ে যান
            </button>
          )}

          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-2">
            <span className="text-[10px] uppercase text-slate-400 font-bold mr-1">গতি:</span>
            {[0.25, 0.5, 1, 2].map(speed => (
              <button
                key={speed}
                onClick={() => physics.setPlaybackSpeed(speed)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-mono ${
                  physics.playbackSpeed === speed ? 'bg-blue-500/30 text-blue-300' : 'text-slate-400 hover:bg-white/10'
                }`}
              >
                {speed}×
              </button>
            ))}
          </div>

          <button
            onClick={() => physics.setFluidMode(physics.fluidMode === 'normal' ? 'xray' : 'normal')}
            className={`px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${
              physics.fluidMode === 'xray' 
                ? 'bg-blue-600/30 text-blue-300' 
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Droplet className="w-4 h-4" />
            তরল দৃশ্যমান করুন
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded bg-red-900/30 border border-red-500/30 text-red-200 text-xs uppercase tracking-wider hover:bg-red-900/50 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            রিসেট
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Presets */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-300 font-heading">প্রিসেট (Preset)</label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <button onClick={() => physics.applyPreset(1)} className="px-3 py-2 text-sm bg-black/40 hover:bg-white/10 text-slate-300 rounded-lg transition-colors border border-white/10">১০:১ অনুপাত</button>
            <button onClick={() => physics.applyPreset(2)} className="px-3 py-2 text-sm bg-black/40 hover:bg-white/10 text-slate-300 rounded-lg transition-colors border border-white/10">৫:১ অনুপাত</button>
            <button onClick={() => physics.applyPreset(3)} className="px-3 py-2 text-sm bg-black/40 hover:bg-white/10 text-slate-300 rounded-lg transition-colors border border-white/10">সমান ক্ষেত্রফল</button>
            <button onClick={physics.reset} className="px-3 py-2 text-sm bg-black/40 hover:bg-white/10 text-slate-300 rounded-lg transition-colors border border-white/10">নিজে সেট করো</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Small Piston */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-slate-300 text-lg border-b border-white/10 pb-2">ছোট পিস্টন</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-400">প্রয়োগকৃত বল, F₁ (N)</label>
                <span className="text-sm font-mono text-blue-400">{physics.f1} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={physics.f1}
                onChange={(e) => physics.setF1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <input
                type="number"
                min="0"
                max="1000"
                value={physics.f1}
                onChange={(e) => physics.setF1(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 text-slate-100 rounded-lg text-sm font-mono"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-400">ক্ষেত্রফল, A₁ (cm²)</label>
                <span className="text-sm font-mono text-blue-400">{physics.a1} cm²</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={physics.a1}
                onChange={(e) => physics.setA1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <input
                type="number"
                min="1"
                max="1000"
                value={physics.a1}
                onChange={(e) => physics.setA1(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 text-slate-100 rounded-lg text-sm font-mono"
              />
            </div>
          </div>

          {/* Large Piston */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-slate-300 text-lg border-b border-white/10 pb-2">বড় পিস্টন</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-400">ক্ষেত্রফল, A₂ (cm²)</label>
                <span className="text-sm font-mono text-blue-400">{physics.a2} cm²</span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                step="1"
                value={physics.a2}
                onChange={(e) => physics.setA2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <input
                type="number"
                min="1"
                max="10000"
                value={physics.a2}
                onChange={(e) => physics.setA2(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 text-slate-100 rounded-lg text-sm font-mono"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-400">ভারের ভর, m (kg)</label>
                <span className="text-sm font-mono text-blue-400">{physics.m} kg</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={physics.m}
                onChange={(e) => physics.setM(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <input
                type="number"
                min="0"
                max="1000"
                value={physics.m}
                onChange={(e) => physics.setM(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 text-slate-100 rounded-lg text-sm font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
