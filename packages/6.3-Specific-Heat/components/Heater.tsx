import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';

interface HeaterProps {
  isHeating: boolean;
  intensity: number; // 0 to 1
}

interface Particle {
  id: number;
  targetIndex: number; // 0, 1, or 2 (which box)
  startX: number;
}

export function Heater({ isHeating, intensity }: HeaterProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isHeating) return;
    
    // Spawn particles when heating
    const clampedIntensity = Math.min(1, Math.max(0, intensity));
    const spawnRate = 50 + (1 - clampedIntensity) * 200; // faster spawn when intensity is higher
    
    const interval = setInterval(() => {
      setParticles(prev => {
        // keep max 30 particles to avoid performance issues
        if (prev.length > 30) return prev;
        
        // Spawn 3 particles at once, one for each target
        const newParticles = [0, 1, 2].map(targetIndex => ({
          id: Math.random(),
          targetIndex,
          // Calculate approximate horizontal starting position based on target
          startX: targetIndex === 0 ? -30 : targetIndex === 1 ? 0 : 30,
        }));
        
        return [...prev, ...newParticles];
      });
    }, spawnRate);

    return () => clearInterval(interval);
  }, [isHeating, intensity]);

  // Cleanup old particles
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles(prev => prev.slice(3)); // remove oldest 3
      }, 1000); // particles live for 1s
      return () => clearTimeout(timer);
    }
  }, [particles]);

  return (
    <div className="flex flex-col items-center relative w-full mt-8 z-0">
      {/* Particles Area */}
      <div className="absolute bottom-14 left-0 right-0 h-40 pointer-events-none z-10 overflow-visible">
        <AnimatePresence>
          {particles.map(p => {
            // Target X depends on the block positions (roughly 15%, 50%, 85%)
            // Since heater is centered, we use left %
            const targetX = p.targetIndex === 0 ? '16%' : p.targetIndex === 1 ? '50%' : '84%';
            
            return (
              <motion.div
                key={p.id}
                initial={{ 
                  opacity: 0, 
                  y: 0, 
                  left: '50%',
                  x: `${p.startX}px`,
                  scale: 0.5 
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  y: -150, 
                  left: targetX,
                  x: '0px',
                  scale: 1.5
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1, ease: 'easeIn' }}
                className="absolute bottom-0 w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_10px_#f97316]"
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Heater Bar */}
      <div className="w-96 h-12 bg-[#5a5a40] rounded-2xl flex items-center justify-center shadow-lg relative z-20">
         <div className={`absolute inset-0 bg-orange-500 rounded-2xl opacity-0 transition-opacity duration-300 ${isHeating ? 'opacity-20' : ''}`}></div>
         <div className="flex items-center space-x-2 z-10 font-heading">
           {isHeating && <Flame className="w-5 h-5 text-orange-400 animate-pulse" />}
           <span className="text-white font-bold tracking-widest uppercase text-sm">প্রাথমিক তাপ উৎস</span>
         </div>
      </div>
    </div>
  );
}
