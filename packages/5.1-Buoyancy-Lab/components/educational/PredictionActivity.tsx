"use client";
import { useState, useEffect } from 'react';
import { useSimulationStore } from '@/lib/store';
import { Play } from 'lucide-react';

export function PredictionActivity() {
  const [prediction, setPrediction] = useState<'float' | 'neutral' | 'sink' | null>(null);
  const [result, setResult] = useState<'pending' | 'correct' | 'incorrect' | null>(null);
  const [actualOutcome, setActualOutcome] = useState<'float' | 'neutral' | 'sink' | null>(null);

  const isPlaying = useSimulationStore(state => state.isPlaying);
  const setIsPlaying = useSimulationStore(state => state.setIsPlaying);
  const brickPosition = useSimulationStore(state => state.brickPosition);
  const brickVelocity = useSimulationStore(state => state.brickVelocity);
  const getCurrentWaterLevel = useSimulationStore(state => state.getCurrentWaterLevel);
  const brickHeight = useSimulationStore(state => state.brickHeight);

  const isDragging = useSimulationStore(state => state.isDragging);
  useEffect(() => {
    if (isDragging) {
      setTimeout(() => {
        setPrediction(null);
        setResult(null);
        setActualOutcome(null);
      }, 0);
    }
  }, [isDragging]);

  useEffect(() => {
    if (prediction && isPlaying && result === 'pending') {
      const waterLevel = getCurrentWaterLevel();
      const bottomY = brickPosition.y - brickHeight / 2;
      const topY = brickPosition.y + brickHeight / 2;
      
      const isSettled = Math.abs(brickVelocity.y) < 0.02;
      
      if (isSettled) {
        let outcome: 'float' | 'neutral' | 'sink' | null = null;
        if (bottomY <= 0.05) {
          outcome = 'sink';
        } else if (topY > waterLevel) {
          outcome = 'float';
        } else {
          outcome = 'neutral';
        }

        if (outcome) {
          setTimeout(() => {
            setActualOutcome(outcome);
            setResult(prediction === outcome ? 'correct' : 'incorrect');
          }, 0);
        }
      }
    }
  }, [isPlaying, brickPosition, brickVelocity, brickHeight, getCurrentWaterLevel, prediction, result]);

  const handlePredict = (p: 'float' | 'neutral' | 'sink') => {
    setPrediction(p);
    setResult('pending');
  };

  return (
    <div className="bg-[#111111] p-4 rounded-xl border border-white/10 flex flex-col gap-3 font-body">
      <h3 className="text-[12px] text-blue-400 font-bold border-b border-white/10 pb-2 font-heading">পূর্বাভাস</h3>
      
      {!prediction ? (
        <>
          <p className="text-[13px] text-gray-300">ইটটি পানিতে ছেড়ে দিলে কী হবে?</p>
          <div className="grid grid-cols-3 gap-2 font-heading">
            <button onClick={() => handlePredict('float')} className="py-2 px-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-[11px] transition-colors">ভাসবে</button>
            <button onClick={() => handlePredict('neutral')} className="py-2 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[11px] transition-colors">নিমজ্জিত অবস্থায় ভাসা</button>
            <button onClick={() => handlePredict('sink')} className="py-2 px-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-[11px] transition-colors">ডুবে যাবে</button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/10">
            <span className="text-[11px] text-gray-400">তোমার পূর্বাভাস:</span>
            <span className={`text-[12px] font-bold font-heading ${prediction === 'float' ? 'text-blue-400' : prediction === 'neutral' ? 'text-emerald-400' : 'text-purple-400'}`}>
              {prediction === 'float' ? 'ভাসবে' : prediction === 'neutral' ? 'নিমজ্জিত অবস্থায় ভাসবে' : 'ডুবে যাবে'}
            </span>
          </div>

          {result === 'pending' ? (
            <button 
              onClick={() => setIsPlaying(true)}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[12px] font-bold flex items-center justify-center gap-2 transition-colors font-heading"
            >
              <Play size={14} /> পরীক্ষা করে দেখো
            </button>
          ) : (
            <div className={`p-3 rounded border ${result === 'correct' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <p className={`text-[12px] font-bold mb-1 font-heading ${result === 'correct' ? 'text-emerald-400' : 'text-red-400'}`}>
                {result === 'correct' ? 'সঠিক অনুমান!' : 'অনুমানটি সঠিক হয়নি।'}
              </p>
              <p className="text-[11px] text-gray-300">
                প্রকৃত ফলাফল: <strong className="text-white font-heading">{actualOutcome === 'float' ? 'ভাসছে' : actualOutcome === 'neutral' ? 'নিমজ্জিত অবস্থায় আছে' : 'ডুবে গেছে'}</strong>
              </p>
              <button 
                onClick={() => { setPrediction(null); setResult(null); setActualOutcome(null); }}
                className="mt-3 text-[11px] tracking-wider text-gray-400 hover:text-white underline decoration-white/30 font-heading"
              >
                আবার চেষ্টা করো
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
