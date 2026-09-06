'use client';

import { usePhysics } from '@/lib/physics-context';
import { Target, CheckCircle2, XCircle, Trophy, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ChallengeTab() {
  const { f1, a1, a2, p, f2, f_load, m, setF1, setA1, setA2, setM, equilibrium, isLifting } = usePhysics();
  const [predicted, setPredicted] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [targetLoad, setTargetLoad] = useState(500);

  // Challenge Generator
  const generateChallenge = (difficulty: 'easy' | 'medium' | 'hard') => {
    setHasStarted(false);
    setPredicted(null);
    let target = 0;
    if (difficulty === 'easy') {
      target = 200; // 200kg
      setA1(10);
      setF1(20);
    } else if (difficulty === 'medium') {
      target = 800; // 800kg
      setA1(5);
      setF1(10);
    } else {
      target = 2500; // 2500kg
      setA1(2);
      setF1(50);
    }
    setM(target);
    setTargetLoad(target);
    // Reset A2 to a bad value so they have to fix it
    setA2(10); 
  };

  useEffect(() => {
    // Generate an initial challenge on mount without triggering sync update warnings
    const timer = setTimeout(() => {
      generateChallenge('easy');
    }, 0);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePredict = (prediction: string) => {
    setPredicted(prediction);
    setHasStarted(true);
  };

  const actualOutcome = isLifting ? 'up' : equilibrium ? 'stay' : 'down';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Target Card */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl shadow-sm border border-indigo-500/30 p-6 relative overflow-hidden">
        <Trophy className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-500/10" />
        <h2 className="text-xl font-heading font-semibold text-indigo-300 flex items-center gap-2 mb-2">
          <Target className="w-5 h-5" />
          চ্যালেঞ্জ: বড় ওজনটি তুলতে পারবে?
        </h2>
        <p className="text-slate-300 font-body text-sm mb-6 max-w-lg">
          নিচের লক্ষ্যমাত্রার ভরটি তুলতে তোমার A₁, A₂ এবং F₁ পরিবর্তন করতে হবে। এমনভাবে মান সেট করো যেন F₂ বলটি ভারের ওজনের চেয়ে বেশি হয়।
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <button onClick={() => generateChallenge('easy')} className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-green-300 hover:bg-white/10 transition-colors">সহজ (200 kg)</button>
          <button onClick={() => generateChallenge('medium')} className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-yellow-300 hover:bg-white/10 transition-colors">মাঝারি (800 kg)</button>
          <button onClick={() => generateChallenge('hard')} className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-red-300 hover:bg-white/10 transition-colors">কঠিন (2500 kg)</button>
        </div>

        <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 inline-block">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">টার্গেট লোড</div>
          <div className="text-3xl font-mono font-bold text-white">{targetLoad} kg</div>
        </div>
      </div>

      {/* Prediction Mode */}
      {!hasStarted ? (
        <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6 text-center">
          <HelpCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-heading text-slate-200 mb-2">পূর্বানুমান করো (Predict)</h3>
          <p className="text-slate-400 font-body text-sm mb-6">বর্তমান সেটিংসে ছোট পিস্টনে বল প্রয়োগ করলে বড় পিস্টনের কী হবে?</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => handlePredict('up')} className="px-6 py-3 bg-blue-900/30 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-900/50 transition-colors font-semibold">উপরে উঠবে</button>
            <button onClick={() => handlePredict('stay')} className="px-6 py-3 bg-slate-800 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-semibold">স্থির থাকবে</button>
            <button onClick={() => handlePredict('down')} className="px-6 py-3 bg-red-900/30 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-900/50 transition-colors font-semibold">নিচে নামবে (তুলতে পারবে না)</button>
          </div>
        </div>
      ) : (
        <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 border-b border-white/10 pb-2">তোমার পূর্বানুমান</h3>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-center">
                <span className="text-lg font-bold text-blue-400">
                  {predicted === 'up' ? 'উপরে উঠবে' : predicted === 'stay' ? 'স্থির থাকবে' : 'নিচে নামবে'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 border-b border-white/10 pb-2">বাস্তব ফলাফল</h3>
              <div className={`p-4 rounded-xl border text-center ${
                isLifting 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                  : equilibrium
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <span className="text-lg font-bold flex items-center justify-center gap-2">
                  {isLifting ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  {isLifting ? 'লোড উঠবে ✓' : 'লোড উঠবে না'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">ব্যাখ্যা</h4>
            <p className="text-sm text-slate-400 font-body leading-relaxed">
              তোমার উৎপন্ন বল F₂ হলো <span className="font-mono text-white">{f2.toFixed(1)} N</span>। আর {m} kg ভরের বস্তুর ওজন হলো <span className="font-mono text-white">{f_load.toFixed(1)} N</span>।
              যেহেতু F₂ {isLifting ? 'বড়' : 'ছোট'}, তাই এটি {isLifting ? 'সহজেই লোডটিকে উপরে তুলবে।' : 'লোডটিকে তুলতে পারবে না। A₂ বাড়িয়ে বা F₁ বাড়িয়ে আবার চেষ্টা করো!'}
            </p>
          </div>
          
          <div className="flex justify-center">
             <button onClick={() => setHasStarted(false)} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-semibold">
               আবার অনুমান করো
             </button>
          </div>
        </div>
      )}

    </div>
  );
}
