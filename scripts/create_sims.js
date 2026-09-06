const fs = require('fs');
const path = require('path');

const sims = [
  { path: 'ch5-matter-and-pressure/sim-5.1-buoyancy', title: '5.1 Buoyancy Engine' },
  { path: 'ch5-matter-and-pressure/sim-5.2-pascals-law', title: '5.2 Pascal\'s Law' },
  { path: 'ch5-matter-and-pressure/sim-5.4-torricelli', title: '5.4 Torricelli Barometer' },
  { path: 'ch6-heat-and-thermodynamics/sim-6.1-thermal-expansion', title: '6.1 Thermal Expansion' },
  { path: 'ch6-heat-and-thermodynamics/sim-6.2-liquid-expansion', title: '6.2 Liquid Apparent Expansion' },
  { path: 'ch6-heat-and-thermodynamics/sim-6.3-specific-heat', title: '6.3 Specific Heat Capacity' },
  { path: 'ch6-heat-and-thermodynamics/sim-6.4-heat-exchange', title: '6.4 Principle of Heat Exchange' },
];

const template = (title) => `"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Simulation() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-8 bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="w-32 h-32 border border-[#FF3366] flex items-center justify-center mb-8 relative">
        <div className="absolute inset-0 bg-[#FF3366]/10 animate-pulse" />
        <div className="w-16 h-16 bg-[#00FFCC] animate-spin" style={{ animationDuration: '3s' }} />
      </div>
      
      <h2 className="text-3xl font-bold uppercase tracking-tighter text-white z-10">{title}</h2>
      <p className="text-[#888] font-mono text-sm mt-4 max-w-md text-center z-10">
        Simulation engine mounted successfully. Waiting for physics variables from telemetry controller...
      </p>
    </div>
  );
}
`;

const basePath = path.join(__dirname, '..', 'src', 'simulations', 'physics');

sims.forEach(sim => {
  const fullDir = path.join(basePath, sim.path);
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
  }
  fs.writeFileSync(path.join(fullDir, 'index.js'), template(sim.title));
  console.log('Created:', sim.title);
});
