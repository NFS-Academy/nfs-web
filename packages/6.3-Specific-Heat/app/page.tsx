'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MaterialBlock } from '@/components/MaterialBlock';
import { Heater } from '@/components/Heater';
import { LiveGraph } from '@/components/LiveGraph';
import { PredictionOverlay } from '@/components/PredictionOverlay';
import { SummaryPanel } from '@/components/SummaryPanel';
import { DynamicFormula } from '@/components/DynamicFormula';

import { ArrowRight } from 'lucide-react';

const MASS_KG = 0.01; // 10 grams
const MAX_HEAT = 1000;
const INITIAL_TEMP = 25;

const MATERIALS = {
  water: { name: 'পানি', c: 4200 },
  iron: { name: 'লোহা', c: 450 },
  copper: { name: 'তামা', c: 385 },
};

interface DataPoint {
  heat: number;
  water: number;
  iron: number;
  copper: number;
}

export default function SimulationPage() {
  const [mode, setMode] = useState<'sameHeat' | 'sameTemp'>('sameHeat');
  const [targetTemp, setTargetTemp] = useState(100);
  const [heatAdded, setHeatAdded] = useState(0); // For sameTemp, represents total heat supplied
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 4>(1);
  const [dataHistory, setDataHistory] = useState<DataPoint[]>([{ heat: 0, water: 25, iron: 25, copper: 25 }]);
  const [prediction, setPrediction] = useState<'water' | 'iron' | 'copper' | null>(null);
  const [predictionResultShown, setPredictionResultShown] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const lastUpdateRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  const getHeat = useCallback((materialKey: keyof typeof MATERIALS) => {
    const c = MATERIALS[materialKey].c;
    if (mode === 'sameHeat') {
      return heatAdded;
    } else {
      const requiredHeat = MASS_KG * c * (targetTemp - INITIAL_TEMP);
      const maxAllowedHeat = MASS_KG * MATERIALS.water.c * (targetTemp - INITIAL_TEMP);
      const progress = maxAllowedHeat > 0 ? Math.min(1, Math.max(0, heatAdded / maxAllowedHeat)) : 0;
      return requiredHeat * progress;
    }
  }, [heatAdded, mode, targetTemp]);

  // Calculate temperatures based on current heat
  const getTemp = useCallback((materialKey: keyof typeof MATERIALS) => {
    const c = MATERIALS[materialKey].c;
    const actualHeat = getHeat(materialKey);
    const deltaT = actualHeat / (MASS_KG * c);
    return INITIAL_TEMP + deltaT;
  }, [getHeat]);

  const waterTemp = getTemp('water');
  const ironTemp = getTemp('iron');
  const copperTemp = getTemp('copper');
  
  const waterHeat = getHeat('water');
  const ironHeat = getHeat('iron');
  const copperHeat = getHeat('copper');

  // Animation Loop for Auto Heating
  const updatePhysicsRef = useRef<(time: number) => void>(null);

  const updatePhysics = useCallback((time: number) => {
    if (!lastUpdateRef.current) lastUpdateRef.current = time;
    const deltaTime = time - lastUpdateRef.current;
    
    let maxAllowedHeat = MAX_HEAT;
    if (mode === 'sameTemp') {
       maxAllowedHeat = MASS_KG * MATERIALS.water.c * (targetTemp - INITIAL_TEMP);
    }

    if (isPlaying && heatAdded < maxAllowedHeat) {
      // Heat addition rate depends on speed.
      // At 1x, it takes 10 seconds to reach 1000J -> 100J/sec
      const heatRate = mode === 'sameHeat' ? 100 * speed : 500 * speed;
      const addedThisFrame = (heatRate * deltaTime) / 1000;
      
      setHeatAdded(prev => {
        const next = Math.min(prev + addedThisFrame, maxAllowedHeat);
        if (next >= maxAllowedHeat) {
          setIsPlaying(false);
          setIsFinished(true);
        }
        return next;
      });
    }
    
    lastUpdateRef.current = time;
    requestRef.current = requestAnimationFrame((t) => updatePhysicsRef.current?.(t));
  }, [isPlaying, heatAdded, speed, mode, targetTemp]);

  useEffect(() => {
    updatePhysicsRef.current = updatePhysics;
  }, [updatePhysics]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame((t) => updatePhysicsRef.current?.(t));
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Record data points for graph every ~20J
  useEffect(() => {
    const lastPoint = dataHistory[dataHistory.length - 1];
    let maxAllowedHeat = MAX_HEAT;
    if (mode === 'sameTemp') {
       maxAllowedHeat = MASS_KG * MATERIALS.water.c * (targetTemp - INITIAL_TEMP);
    }
    
    if (heatAdded > 0 && (heatAdded - lastPoint.heat >= 20 || (heatAdded >= maxAllowedHeat && lastPoint.heat < maxAllowedHeat))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDataHistory(prev => [...prev, {
        heat: heatAdded,
        water: getTemp('water'),
        iron: getTemp('iron'),
        copper: getTemp('copper')
      }]);
    }
  }, [heatAdded, dataHistory, getTemp, mode, targetTemp]);

  const handleReset = () => {
    setIsPlaying(false);
    setHeatAdded(0);
    setDataHistory([{ heat: 0, water: INITIAL_TEMP, iron: INITIAL_TEMP, copper: INITIAL_TEMP }]);
    setIsFinished(false);
    lastUpdateRef.current = 0;
  };

  const handleSpeedToggle = () => {
    setSpeed(prev => prev === 1 ? 2 : prev === 2 ? 4 : 1);
  };

  const isHeatingActive = isPlaying || heatAdded > 0;
  // Calculate a generic intensity for visual effects
  const visualIntensity = mode === 'sameHeat' 
    ? heatAdded / MAX_HEAT 
    : heatAdded / (MASS_KG * MATERIALS.water.c * (targetTemp - INITIAL_TEMP));

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f0] text-[#3a3a30] overflow-y-auto overflow-x-hidden font-sans select-none">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 border-b border-[#d1d1c4] bg-[#fdfdfb] shrink-0">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#8a8a70] uppercase">পদার্থবিজ্ঞান | নবম-দশম শ্রেণি (NCTB)</span>
          <h1 className="text-3xl font-heading font-bold text-[#5a5a40]">আপেক্ষিক তাপ (Specific Heat)</h1>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center space-x-6">
            {/* Heat / Target Temp Slider */}
            <div className="flex flex-col items-center min-w-[250px]">
              {mode === 'sameHeat' ? (
                <>
                  <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider text-[#8a8a70] mb-2">
                    <span>0 J</span>
                    <span className="text-[#5a5a40]">তাপ শক্তি (Q): {Math.round(heatAdded)} J</span>
                    <span>{MAX_HEAT} J</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={MAX_HEAT} 
                    value={heatAdded}
                    onChange={(e) => {
                      setIsPlaying(false); // Stop auto if manual drag
                      setHeatAdded(Number(e.target.value));
                    }}
                    className="w-full h-2 bg-[#e1e1d8] rounded-lg appearance-none cursor-pointer accent-[#5a5a40]"
                  />
                </>
              ) : (
                <>
                  <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider text-[#8a8a70] mb-2">
                    <span>25°C</span>
                    <span className="text-[#5a5a40]">লক্ষ্য তাপমাত্রা: {Math.round(targetTemp)} °C</span>
                    <span>100°C</span>
                  </div>
                  <input 
                    type="range" 
                    min="25" 
                    max="100" 
                    value={targetTemp} 
                    onChange={(e) => {
                      setIsPlaying(false);
                      handleReset();
                      setTargetTemp(Number(e.target.value));
                    }}
                    className="w-full h-2 bg-[#e1e1d8] rounded-lg appearance-none cursor-pointer accent-[#5a5a40]"
                  />
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-2 border-l border-[#d1d1c4] pl-6 font-heading">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center justify-center px-6 py-4 rounded-2xl font-bold transition-all active:scale-95 ${isPlaying ? 'bg-[#f5f5f0] text-[#5a5a40] border border-[#d1d1c4]' : 'bg-[#5a5a40] text-white hover:opacity-90'}`}
                title={isPlaying ? "থামুন" : "শুরু করুন"}
              >
                {isPlaying ? "থামুন" : "তাপ প্রয়োগ শুরু"}
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center justify-center px-6 py-4 rounded-2xl bg-[#f5f5f0] text-[#5a5a40] border border-[#d1d1c4] font-bold hover:bg-[#e1e1d8] transition-all active:scale-95"
                title="রিসেট"
              >
                রিসেট
              </button>

              <div className="flex items-center gap-4 ml-4">
                <span className="text-[10px] font-bold text-[#8a8a70] uppercase tracking-wider">গতি</span>
                <div className="flex bg-[#f5f5f0] p-1 rounded-lg border border-[#d1d1c4]">
                  {[1, 2, 4].map(s => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s as 1|2|4)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${speed === s ? 'bg-white shadow-sm text-[#3a3a30]' : 'text-[#8a8a70] hover:text-[#5a5a40]'}`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TOP SECTION */}
      <main className="flex-1 flex flex-col relative w-full items-center justify-end pb-32 bg-gradient-to-b from-white to-[#f5f5f0]">
         <PredictionOverlay onPredict={(m) => setPrediction(m)} predicted={prediction} mode={mode} />
         {isFinished && !predictionResultShown && (
           <SummaryPanel 
             predicted={prediction} 
             onClose={() => {
               setPredictionResultShown(true);
             }}
             waterTemp={waterTemp}
             ironTemp={ironTemp}
             copperTemp={copperTemp}
             heatAdded={heatAdded}
             mode={mode}
             waterHeat={waterHeat}
             ironHeat={ironHeat}
             copperHeat={copperHeat}
           />
         )}

         {/* Mode Selector */}
         <div className="absolute top-8 w-full flex justify-center z-20 font-heading">
           <div className="bg-white p-1 rounded-xl shadow-sm border border-[#d1d1c4] flex">
             <button
               onClick={() => { setMode('sameHeat'); handleReset(); }}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'sameHeat' ? 'bg-[#5a5a40] text-white shadow-md' : 'text-[#8a8a70] hover:bg-[#f5f5f0]'}`}
             >
               একই তাপ
             </button>
             <button
               onClick={() => { setMode('sameTemp'); handleReset(); }}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'sameTemp' ? 'bg-[#5a5a40] text-white shadow-md' : 'text-[#8a8a70] hover:bg-[#f5f5f0]'}`}
             >
               একই তাপমাত্রা
             </button>
           </div>
         </div>

         {/* Educational Comparison Panel */}
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow-sm border border-[#d1d1c4] z-10 flex items-center gap-6">
           <h3 className="text-[10px] font-bold text-[#8a8a70] uppercase tracking-widest whitespace-nowrap">ধারণা যাচাই</h3>
           {mode === 'sameHeat' ? (
             <div className="flex gap-6 items-center">
               <div className="flex flex-col">
                 <span className="text-xs text-[#8a8a70]">ইনপুট</span>
                 <span className="font-bold text-[#3a3a30] text-sm flex items-center gap-2"><ArrowRight className="w-4 h-4 text-orange-500" /> একই তাপ</span>
               </div>
               <div className="h-8 w-px bg-[#d1d1c4]"></div>
               <div className="flex flex-col">
                 <span className="text-xs text-[#8a8a70]">আউটপুট</span>
                 <span className="font-bold text-[#3a3a30] text-sm flex items-center gap-2"><ArrowRight className="w-4 h-4 text-blue-500" /> ভিন্ন তাপমাত্রা বৃদ্ধি</span>
               </div>
             </div>
           ) : (
             <div className="flex gap-6 items-center">
               <div className="flex flex-col">
                 <span className="text-xs text-[#8a8a70]">ইনপুট</span>
                 <span className="font-bold text-[#3a3a30] text-sm flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-500" /> একই তাপমাত্রা</span>
               </div>
               <div className="h-8 w-px bg-[#d1d1c4]"></div>
               <div className="flex flex-col">
                 <span className="text-xs text-[#8a8a70]">আউটপুট</span>
                 <span className="font-bold text-[#3a3a30] text-sm flex items-center gap-2"><ArrowRight className="w-4 h-4 text-orange-500" /> ভিন্ন পরিমাণ তাপ প্রয়োজন</span>
               </div>
             </div>
           )}
         </div>

         <div className="flex w-full justify-around items-end max-w-5xl mx-auto mt-4 px-8 gap-8 pt-[70px]">
           <MaterialBlock 
             name={MATERIALS.water.name} 
             material="water"
             temp={waterTemp}
             specificHeat={MATERIALS.water.c}
             mass={MASS_KG}
             heatAdded={waterHeat}
             mode={mode}
             targetTemp={targetTemp}
           />
           <MaterialBlock 
             name={MATERIALS.iron.name} 
             material="iron"
             temp={ironTemp}
             specificHeat={MATERIALS.iron.c}
             mass={MASS_KG}
             heatAdded={ironHeat}
             mode={mode}
             targetTemp={targetTemp}
           />
           <MaterialBlock 
             name={MATERIALS.copper.name} 
             material="copper"
             temp={copperTemp}
             specificHeat={MATERIALS.copper.c}
             mass={MASS_KG}
             heatAdded={copperHeat}
             mode={mode}
             targetTemp={targetTemp}
           />
         </div>

         <Heater isHeating={isPlaying} intensity={visualIntensity} />
      </main>

      {/* BOTTOM SECTION */}
      <footer className="h-[280px] bg-white border-t border-[#d1d1c4] relative z-30 shrink-0 flex p-8 gap-8">
        {/* Dynamic Formula */}
        <div className="w-1/4 flex flex-col justify-center">
           <DynamicFormula isHeating={isPlaying || heatAdded > 0} heatAdded={heatAdded} />
           
           <div className="mt-4 bg-[#fef3c7] p-4 rounded-xl border border-[#b45309]/20 text-sm font-medium text-[#92400e] font-body">
             {heatAdded === 0 && 'পরীক্ষা শুরু করার জন্য প্রস্তুত।'}
             {heatAdded > 0 && !isFinished && mode === 'sameHeat' && 'পানির তাপমাত্রা ধীরে বৃদ্ধি পাচ্ছে।'}
             {heatAdded > 0 && !isFinished && mode === 'sameTemp' && 'পানি একই তাপমাত্রায় পৌঁছাতে বেশি তাপ শোষণ করে! তামা দ্রুত লক্ষ্য তাপমাত্রায় পৌঁছায়।'}
             {isFinished && mode === 'sameHeat' && 'পরীক্ষা সম্পন্ন। তামার তাপমাত্রা সবচেয়ে বেশি বৃদ্ধি পেয়েছে।'}
             {isFinished && mode === 'sameTemp' && 'পরীক্ষা সম্পন্ন। পানির সবচেয়ে বেশি তাপ শক্তির প্রয়োজন হয়েছে।'}
           </div>
        </div>

        {/* Live Table */}
        <div className="w-1/4 bg-[#5a5a40] text-white p-4 rounded-3xl relative overflow-hidden flex flex-col">
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-[10px] font-bold tracking-widest opacity-70 mb-2 uppercase font-heading">পর্যবেক্ষণ সারণি</h3>
            <table className="w-full text-xs flex-1">
              <tbody>
                <tr className="border-b border-white/20">
                  <td className="py-2 opacity-70">পদার্থ</td>
                  <td className="py-2 text-right">Δθ (°C)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 font-medium">পানি</td>
                  <td className="py-2 text-right font-mono text-blue-200">{(waterTemp - 25).toFixed(1)}</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 font-medium">লোহা</td>
                  <td className="py-2 text-right font-mono text-gray-300">{(ironTemp - 25).toFixed(1)}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">তামা</td>
                  <td className="py-2 text-right font-mono text-orange-300">{(copperTemp - 25).toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Live Graph */}
        <div className="flex-1 bg-[#fdfdfb] border border-[#e1e1d8] rounded-3xl p-4">
           <LiveGraph mode={mode} dataHistory={dataHistory} currentHeats={{ water: waterHeat, iron: ironHeat, copper: copperHeat }} />
        </div>
      </footer>
    </div>
  );
}
