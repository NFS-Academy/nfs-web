"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Maximize2, X } from 'lucide-react';

const simulations = {
  'archimedes': dynamic(() => import('@/../packages/5.3-Archimedes-principle/app/page.tsx'), { ssr: false }),
  'torricelli-experiment': dynamic(() => import('@/../packages/5.4-Torricelli-Experiment/src/app/page.tsx'), { ssr: false }),
  'pascals-law': dynamic(() => import('@/../packages/5.2-Pascals-Law/app/page.tsx'), { ssr: false }),
  'buoyancy-lab': dynamic(() => import('@/../packages/5.1-Buoyancy-Lab/app/page.tsx'), { ssr: false }),
  'principle-of-heat-exchange': dynamic(() => import('@/../packages/6.4-Principle-of-Heat-Exchange/app/page.tsx'), { ssr: false }),
  'specific-heat': dynamic(() => import('@/../packages/6.3-Specific-Heat/app/page.tsx'), { ssr: false }),
  'liquid-real-apparent-expansion': dynamic(() => import('@/../packages/6.2-Liquid-Real-Apparent-Expansion/app/page.tsx'), { ssr: false }),
  'thermal-expansion': dynamic(() => import('@/../packages/6.1-Thermal-Expansion/app/page.tsx'), { ssr: false }),
};

export default function SimulationViewer({ simulationUrl }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!simulationUrl) return null;

  // simulationUrl is formatted as `/simulations/sim-name`. We extract `sim-name`.
  const simId = simulationUrl.split('/').pop();
  const SimulationComponent = simulations[simId];

  if (!SimulationComponent) return null;

  return (
    <div className="lg:col-span-2">
      <div className="sticky top-24 space-y-6">
        <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-4">
          <h3 className="text-sm font-mono text-[#AAAAAA] uppercase tracking-widest">Interactive Laboratory</h3>
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">Native Engine</span>
        </div>
        
        {/* Preview Container */}
        <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-3xl shadow-2xl p-2 md:p-3 group">
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem] ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
          
          {/* Native component rendering directly in the DOM! We constrain it so it acts like a viewport */}
          <div className="w-[125%] h-[125%] origin-top-left scale-[0.8] overflow-hidden relative z-10 rounded-3xl">
             <SimulationComponent />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded-[2.5rem]">
            <button 
              onClick={() => setIsExpanded(true)} 
              className="bg-white text-black font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
            >
              <Maximize2 size={16} /> Expand to Workspace
            </button>
            <p className="text-white/60 font-mono text-[10px] mt-4 uppercase tracking-widest">Launch Fullscreen Physics Engine</p>
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-500 dark:text-[#AAAAAA] font-mono">
          The physics engine runs natively inside this workspace. Zero iframe overhead.
        </p>
      </div>

      {/* Expanded Modal Workspace */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
          <div className="absolute top-6 right-6 z-50">
            <button 
              onClick={() => setIsExpanded(false)} 
              className="bg-black/50 hover:bg-black backdrop-blur-md text-white font-bold uppercase tracking-widest text-xs py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 transition-all hover:scale-105"
            >
              <X size={16} /> Close Workspace
            </button>
          </div>
          {/* Native component rendered full-screen without iframes */}
          <div className="w-full h-full overflow-auto">
            <SimulationComponent />
          </div>
        </div>
      )}
    </div>
  );
}
