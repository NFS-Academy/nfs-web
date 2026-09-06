import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { SimulationPhase } from '@/hooks/useSimulation';
import { PhysicsBody } from '@/lib/physics';

interface MolecularViewProps {
  phase: SimulationPhase;
  currentA: PhysicsBody;
  currentB: PhysicsBody;
}

export function MolecularView({ phase, currentA, currentB }: MolecularViewProps) {
  
  const generateParticles = (count: number, body: PhysicsBody) => {
    let speed = Math.max(0.5, (body.temp + 100) / 40);
    let range = 4;
    
    if (body.material === 'Water') {
      const isSolid = body.massIce > 0 && body.massLiquid === 0 && body.massSteam === 0;
      const isGas = body.massSteam > 0;
      if (isSolid) {
        speed = 0.5;
        range = 1;
      } else if (isGas) {
        speed = speed * 2;
        range = 10;
      }
    } else {
      speed = Math.max(0.5, (body.temp + 100) / 50);
      range = 1.5;
    }

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      delay: Math.random() * 2,
      animX: (Math.random() - 0.5) * range * 10,
      animY: (Math.random() - 0.5) * range * 10,
      speed,
      temp: body.temp
    }));
  };

  // We only regenerate particles when material or phase changes drastically, 
    // not on every temp tick to avoid jittering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  const particlesA = useMemo(() => generateParticles(12, currentA), [currentA.material, currentA.massIce, currentA.massLiquid, currentA.massSteam]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const particlesB = useMemo(() => generateParticles(12, currentB), [currentB.material, currentB.massIce, currentB.massLiquid, currentB.massSteam]);

  const getColor = (temp: number) => {
    if (temp <= 0) return '#94a3b8'; // Slate for ice
    const hue = 240 - (temp * 2.4);
    return `hsl(${Math.max(0, hue)}, 100%, 60%)`;
  };

  return (
    <div className="w-full flex gap-4 h-48 overflow-hidden">
      <div className="flex-1 relative border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
        <div className="absolute top-2 left-2 text-slate-500 text-[10px] font-bold uppercase z-10">Bucket A Particles</div>
        {particlesA.map((p, i) => (
          <motion.div
            key={`a-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`,
              backgroundColor: getColor(currentA.temp)
            }}
            animate={{
              x: [0, p.animX, 0],
              y: [0, p.animY, 0]
            }}
            transition={{ duration: p.speed, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>
      
      {phase !== 'SETUP' && phase !== 'POURING_A' && phase !== 'POURING_B' && (
        <div className="flex flex-col justify-center items-center px-2">
          <div className="h-full w-[2px] bg-slate-800 relative">
            {(phase === 'EXCHANGE') && currentA.temp > currentB.temp && (
              <motion.div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-red-500 font-bold" animate={{ x: [-15, 15], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>►</motion.div>
            )}
            {(phase === 'EXCHANGE') && currentB.temp > currentA.temp && (
              <motion.div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-blue-500 font-bold" animate={{ x: [15, -15], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>◄</motion.div>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 relative border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
        <div className="absolute top-2 right-2 text-slate-500 text-[10px] font-bold uppercase z-10">Bucket B Particles</div>
        {particlesB.map((p, i) => (
          <motion.div
            key={`b-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`,
              backgroundColor: getColor(currentB.temp)
            }}
            animate={{
              x: [0, p.animX, 0],
              y: [0, p.animY, 0]
            }}
            transition={{ duration: p.speed, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>
    </div>
  );
}
