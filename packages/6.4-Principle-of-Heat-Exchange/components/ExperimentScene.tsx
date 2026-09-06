import React from 'react';
import { motion } from 'motion/react';
import { SimulationPhase, ViewMode } from '@/hooks/useSimulation';
import { PhysicsBody } from '@/lib/physics';
import { toBanglaNumber } from '@/lib/i18n';

interface ExperimentSceneProps {
  phase: SimulationPhase;
  currentA: PhysicsBody;
  currentB: PhysicsBody;
  view: ViewMode;
}

export function ExperimentScene({ phase, currentA, currentB, view }: ExperimentSceneProps) {
  
  const getTempColor = (temp: number, isSteam: boolean = false) => {
    if (isSteam) return `hsl(210, 20%, ${Math.max(50, 95 - (temp - 100))}%)`;
    if (temp <= 0) return '#cbd5e1'; // বরফ
    // from 0 (blue) to 100 (red)
    const hue = 240 - (temp * 2.4);
    return `hsl(${Math.max(0, hue)}, 100%, 60%)`;
  };

  const isMixingOrLater = ['MIXING', 'EXCHANGE', 'EQUILIBRIUM'].includes(phase);
  const totalMass = currentA.mass + currentB.mass;
  const hA = (currentA.mass / Math.max(5, totalMass)) * 100;
  const hB = (currentB.mass / Math.max(5, totalMass)) * 100;

  const renderPhaseBar = (body: PhysicsBody) => {
    // If it has ice/liquid/steam fractions, render them stacked
    const icePct = (body.massIce / body.mass) * 100;
    const liqPct = (body.massLiquid / body.mass) * 100;
    const stmPct = (body.massSteam / body.mass) * 100;
    
    return (
      <div className="absolute bottom-0 w-full flex flex-col justify-end overflow-hidden opacity-80" style={{ height: '100%' }}>
        {stmPct > 0 && <div style={{ height: `${stmPct}%`, backgroundColor: getTempColor(body.temp, true) }} />}
        {liqPct > 0 && <div style={{ height: `${liqPct}%`, backgroundColor: getTempColor(body.temp) }} />}
        {icePct > 0 && <div style={{ height: `${icePct}%`, backgroundColor: getTempColor(body.temp) }} />}
        {icePct === 0 && liqPct === 0 && stmPct === 0 && (
          <div style={{ height: '100%', backgroundColor: getTempColor(body.temp) }} />
        )}
      </div>
    );
  };

  const getMaterialLabel = (b: PhysicsBody) => {
     if (b.material !== 'পানি') return b.material;
     if (b.massIce === b.mass) return 'বরফ';
     if (b.massSteam === b.mass) return 'বাষ্প';
     if (b.massIce > 0 && b.massLiquid > 0) return 'বরফ+পানি';
     if (b.massLiquid > 0 && b.massSteam > 0) return 'পানি+বাষ্প';
     return 'পানি';
  };

  return (
    <div className="relative w-full h-[400px] bg-white rounded-xl flex items-end justify-center pb-12 gap-12 perspective-1000 font-heading">
      
      {/* State Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-50">
        <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase border border-slate-200">
          অবস্থা: {phase === 'SETUP' ? 'প্রস্তুতি' : phase === 'POURING_A' ? 'A ঢালা হচ্ছে' : phase === 'POURING_B' ? 'B ঢালা হচ্ছে' : phase === 'MIXING' ? 'মিশ্রণ' : phase === 'EXCHANGE' ? 'তাপের আদান-প্রদান' : phase === 'EQUILIBRIUM' ? 'সাম্যাবস্থা' : phase}
        </span>
        {phase === 'EXCHANGE' && (
          <span className="px-3 py-1 bg-amber-50 rounded-full text-[10px] font-bold text-amber-600 uppercase border border-amber-200 animate-pulse">
            তাপ প্রবাহ চলছে
          </span>
        )}
      </div>

      {/* Bucket A (Hot) */}
      <div className="flex flex-col items-center gap-4 relative z-20">
        <motion.div 
          className="relative"
          initial={{ x: 0, rotate: 0, y: 0 }}
          animate={{ x: phase === 'POURING_A' ? 120 : 0, y: phase === 'POURING_A' ? -80 : 0, rotate: phase === 'POURING_A' ? 45 : 0, opacity: isMixingOrLater ? 0.3 : 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ originX: '100%', originY: '0%' }}
        >
          <div className="w-32 h-32 bg-slate-100 border-x-4 border-b-4 border-slate-300 rounded-b-2xl relative overflow-hidden">
            <motion.div className="absolute bottom-0 w-full"
              initial={{ height: `${hA}%` }}
              animate={{ height: phase === 'POURING_A' ? 0 : isMixingOrLater ? 0 : `${hA}%` }}
              transition={{ duration: phase === 'POURING_A' ? 1 : 0, delay: phase === 'POURING_A' ? 0.5 : 0 }}
            >
              {renderPhaseBar(currentA)}
            </motion.div>
          </div>
          <div className="absolute -top-4 -right-4 bg-red-100 border border-red-200 text-red-600 p-2 rounded-lg shadow-sm text-center min-w-[60px]">
            <div className="text-[10px] uppercase font-bold">তাপমাত্রা</div>
            <div className="text-lg font-black">{toBanglaNumber(currentA.temp.toFixed(1))}°C</div>
          </div>
        </motion.div>
        <div className="text-center absolute -bottom-16">
          <div className="text-xs font-bold text-slate-400 uppercase">Bucket A (Hot)</div>
          <div className="text-sm font-medium">{toBanglaNumber(currentA.mass.toFixed(1))} kg {getMaterialLabel(currentA)}</div>
        </div>
      </div>

      {/* Central Calorimeter */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-56 h-48 bg-slate-200 border-x-8 border-b-8 border-slate-400 rounded-b-3xl relative flex flex-col items-center justify-end overflow-hidden shadow-xl">
          {isMixingOrLater && (
             <div className="absolute bottom-0 w-full flex flex-col items-center justify-center relative" style={{ height: `${((currentA.mass + currentB.mass) / Math.max(5, totalMass)) * 100}%` }}>
               <div className="absolute inset-0 flex">
                 <div className="w-1/2 h-full opacity-90 relative">{renderPhaseBar(currentA)}</div>
                 <div className="w-1/2 h-full opacity-90 relative">{renderPhaseBar(currentB)}</div>
               </div>
               
               <div className="z-10 flex flex-col items-center pt-8">
                  <div className="text-white text-3xl font-black drop-shadow-md">
                    {toBanglaNumber(currentA.temp.toFixed(1))}°C / {toBanglaNumber(currentB.temp.toFixed(1))}°C
                  </div>
                  <div className="text-white/80 text-[10px] font-bold uppercase drop-shadow-md">
                    বর্তমান তাপমাত্রা
                  </div>
               </div>

               {(phase === 'EXCHANGE') && currentA.temp > currentB.temp && (
                 <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <motion.div animate={{ x: [-20, 20], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="text-white font-bold text-4xl drop-shadow-md">→</motion.div>
                 </motion.div>
               )}
               {(phase === 'EXCHANGE') && currentB.temp > currentA.temp && (
                 <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <motion.div animate={{ x: [20, -20], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="text-white font-bold text-4xl drop-shadow-md">←</motion.div>
                 </motion.div>
               )}
             </div>
          )}
        </div>
        <div className="mt-4 text-center absolute -bottom-16">
          <div className="text-xs font-bold text-slate-700 uppercase">আদর্শ ক্যালরিমিটার</div>
          <div className="text-[10px] text-slate-500 italic">মিশ্রণ পাত্র</div>
        </div>
      </div>
      
      {/* Bucket B (Cold) */}
      <div className="flex flex-col items-center gap-4 relative z-20">
        <motion.div 
          className="relative"
          initial={{ x: 0, rotate: 0, y: 0 }}
          animate={{ x: phase === 'POURING_B' ? -120 : 0, y: phase === 'POURING_B' ? -80 : 0, rotate: phase === 'POURING_B' ? -45 : 0, opacity: phase === 'MIXING' || phase === 'EXCHANGE' || phase === 'EQUILIBRIUM' ? 0.3 : 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ originX: '0%', originY: '0%' }}
        >
          <div className="w-32 h-32 bg-slate-100 border-x-4 border-b-4 border-slate-300 rounded-b-2xl relative overflow-hidden">
            <motion.div className="absolute bottom-0 w-full"
              initial={{ height: `${hB}%` }}
              animate={{ height: phase === 'POURING_B' ? 0 : isMixingOrLater ? 0 : `${hB}%` }}
              transition={{ duration: phase === 'POURING_B' ? 1 : 0, delay: phase === 'POURING_B' ? 0.5 : 0 }}
            >
              {renderPhaseBar(currentB)}
            </motion.div>
          </div>
          <div className="absolute -top-4 -left-4 bg-blue-100 border border-blue-200 text-blue-600 p-2 rounded-lg shadow-sm text-center min-w-[60px]">
            <div className="text-[10px] uppercase font-bold">তাপমাত্রা</div>
            <div className="text-lg font-black">{toBanglaNumber(currentB.temp.toFixed(1))}°C</div>
          </div>
        </motion.div>
        <div className="text-center absolute -bottom-16">
          <div className="text-xs font-bold text-slate-400 uppercase">Bucket B (Cold)</div>
          <div className="text-sm font-medium">{toBanglaNumber(currentB.mass.toFixed(1))} kg {getMaterialLabel(currentB)}</div>
        </div>
      </div>

      {phase === 'EQUILIBRIUM' && (
        <motion.div 
          className="absolute top-10 flex flex-col items-center bg-emerald-50 border border-emerald-500 text-emerald-800 px-6 py-3 rounded-full shadow-lg z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
        >
          <span className="font-bold uppercase tracking-wider text-xs">সাম্যাবস্থা অর্জিত</span>
          <span className="text-2xl font-black">{toBanglaNumber(currentA.temp.toFixed(1))}°C</span>
        </motion.div>
      )}
      
    </div>
  );
}
