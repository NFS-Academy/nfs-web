import React, { useEffect, useRef } from 'react';
import { Thermometer } from './Thermometer';
import { Droplet, Hexagon, Box } from 'lucide-react';

interface MaterialBlockProps {
  name: string;
  material: 'water' | 'iron' | 'copper';
  temp: number;
  specificHeat: number;
  mass: number;
  heatAdded: number;
  mode?: 'sameHeat' | 'sameTemp';
  targetTemp?: number;
}

export function MaterialBlock({
  name,
  material,
  temp,
  specificHeat,
  mass,
  heatAdded,
  mode,
  targetTemp,
}: MaterialBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate a vibration intensity from 0 to 1 based on temperature (max ~300)
  const baseTemp = 25;
  const intensity = Math.min(1, Math.max(0, (temp - baseTemp) / 275));

  const molecules = Array.from({ length: material === 'water' ? 12 : 16 });

  return (
    <div className="flex flex-col items-center group w-48">
      {/* Thermometer & Temp */}
      <div className="flex items-end gap-3 mb-4 w-full justify-center">
        <div className="mb-[-12px]"> {/* Adjusting to align thermometer visually */}
          <Thermometer temp={temp} />
        </div>
        <div className="text-left pb-2">
          <div className="text-2xl font-bold font-heading text-[#5a5a40]">{temp.toFixed(1)}°C</div>
          <div className="text-[10px] uppercase font-bold text-[#8a8a70] font-heading">তাপমাত্রা (ΔT: +{(temp - 25).toFixed(1)})</div>
        </div>
      </div>

      {/* Material Container */}
      <div className="relative flex flex-col items-center justify-end h-48 w-full">
         <div 
            className={`w-full h-full relative border-4 flex items-center justify-center overflow-hidden shadow-sm
             ${material === 'water' ? 'border-[#3b82f6] bg-[#dbeafe] rounded-3xl' : 
               material === 'iron' ? 'border-[#4b5563] bg-[#e5e7eb] rounded-xl' : 
               'border-[#b45309] bg-[#fef3c7] rounded-xl'}`}
         >
            <div className={`absolute inset-0 grid grid-cols-4 gap-2 p-4 ${material === 'water' ? 'opacity-40' : material === 'iron' ? 'opacity-60' : 'opacity-80'}`}>
               {molecules.map((_, i) => (
                 <Molecule key={i} intensity={intensity} material={material} index={i} />
               ))}
            </div>
            <span className={`text-lg font-heading font-bold relative z-10 
              ${material === 'water' ? 'text-[#1d4ed8]' : 
                material === 'iron' ? 'text-[#374151]' : 'text-[#92400e]'}`}
            >
              {name}
            </span>
         </div>
      </div>

      {/* Stats */}
      <div className="mt-4 text-center w-full">
        {mode === 'sameTemp' && targetTemp ? (
          <div className="mb-3">
             <div className="flex justify-between text-[10px] font-bold text-[#8a8a70] mb-1 font-heading">
               <span>প্রয়োজনীয় তাপ</span>
               <span>{heatAdded.toFixed(0)} / {(mass * specificHeat * (targetTemp - 25)).toFixed(0)} J</span>
             </div>
             <div className="h-2 w-full bg-[#e1e1d8] rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-300 ease-linear ${material === 'water' ? 'bg-[#1d4ed8]' : material === 'iron' ? 'bg-[#374151]' : 'bg-[#92400e]'}`}
                 style={{ width: `${Math.min(100, (heatAdded / (mass * specificHeat * (targetTemp - 25))) * 100)}%` }}
               />
             </div>
          </div>
        ) : null}
        <span className="block text-xs font-bold text-[#8a8a70] font-heading">আপেক্ষিক তাপ (s)</span>
        <span className="text-sm font-mono text-[#3a3a30]">{specificHeat} J/kg°C</span>
      </div>
    </div>
  );
}

function Molecule({ intensity, material, index }: { intensity: number, material: string, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let animationId: number;
    const el = ref.current;
    if (!el) return;

    let posX = 0;
    let posY = 0;
    
    // Water has more liquid-like movement, solids just vibrate in place
    const isLiquid = material === 'water';

    const animate = () => {
      // Base vibration (always a little bit of jiggle due to room temp)
      const baseJiggle = 0.5;
      // Max vibration at 300C
      const maxJiggle = isLiquid ? 6 : 4; 
      
      const currentJiggle = baseJiggle + intensity * maxJiggle;
      
      // Random movement
      const dx = (Math.random() - 0.5) * currentJiggle * 2;
      const dy = (Math.random() - 0.5) * currentJiggle * 2;
      
      // Pull back to center to avoid drifting away
      posX = posX * 0.5 + dx;
      posY = posY * 0.5 + dy;
      
      if (el) {
        el.style.transform = `translate(${posX}px, ${posY}px) rotate(${intensity * dx * 10}deg)`;
      }
      
      // Throttle slightly so it doesn't look like static noise, but actual vibration
      // We can use setTimeout or just let RAF run wild.
      animationId = requestAnimationFrame(() => {
        setTimeout(animate, 30); // ~30fps for chunky molecular vibration
      });
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [intensity, material]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div 
        ref={ref}
        className={`w-3 h-3 rounded-full shadow-sm ${
          material === 'water' ? 'bg-blue-600' : 
          material === 'iron' ? 'bg-gray-600' : 'bg-amber-700'
        }`}
        style={{
          opacity: 0.8 + intensity * 0.2
        }}
      />
    </div>
  );
}
