'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ArchimedesSimulation() {
  const [fluid, setFluid] = useState('water');
  const [mass, setMass] = useState(10);
  const [volume, setVolume] = useState(0.005); // m^3
  
  const fluidDensities = {
    water: 1000,
    honey: 1420,
    oil: 800
  };

  const density = fluidDensities[fluid];
  const g = 9.8;
  const weight = mass * g;
  
  // F_b = V * rho * g (assuming fully submerged for this basic model)
  const maxBuoyancy = volume * density * g;
  
  const state = maxBuoyancy >= weight ? 'FLOATING' : 'SINKING';
  const apparentWeight = state === 'SINKING' ? (weight - maxBuoyancy).toFixed(2) : '0.00';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-8 font-mono relative z-20">
      
      {/* Simulation Telemetry Panel */}
      <div className="absolute top-4 left-4 border-l-4 border-[#FF3366] pl-4">
        <h3 className="text-[#FF3366] font-bold uppercase tracking-widest text-xs mb-2">Live Telemetry</h3>
        <div className="text-white text-sm space-y-1">
          <p>Fluid: {fluid.toUpperCase()} (ρ = {density} kg/m³)</p>
          <p>Object Mass: {mass} kg</p>
          <p>Object Vol: {volume} m³</p>
          <p>Weight (W): {weight.toFixed(2)} N</p>
          <p>Max Buoyancy (Fb): {maxBuoyancy.toFixed(2)} N</p>
          <p className="mt-4 font-bold text-[#00FFCC]">Apparent Weight: {apparentWeight} N</p>
        </div>
      </div>

      {/* Visual Canvas (Brutalist Mock) */}
      <div className="w-64 h-96 border-2 border-white relative flex flex-col justify-end bg-[#050505]">
        {/* Fluid Level */}
        <div 
          className={`w-full absolute bottom-0 transition-all duration-500 ${fluid === 'water' ? 'bg-blue-900/50' : fluid === 'honey' ? 'bg-yellow-700/50' : 'bg-yellow-900/50'}`}
          style={{ height: '70%' }}
        >
          <div className="w-full h-px bg-white opacity-50 relative">
            <span className="absolute -top-4 right-2 text-[10px] text-white">Fluid Surface</span>
          </div>
        </div>
        
        {/* The Object */}
        <div 
          className="w-16 h-16 bg-[#FF3366] border-2 border-white z-10 mx-auto transition-all duration-1000 flex items-center justify-center text-black font-bold text-xs"
          style={{ 
            marginBottom: state === 'FLOATING' ? '60%' : '0%', 
            transform: state === 'FLOATING' ? 'translateY(50%)' : 'translateY(0)' 
          }}
        >
          {mass}kg
        </div>
      </div>

      {/* Controls */}
      <Card className="absolute bottom-4 right-4 bg-black border-[#333333] w-80">
        <CardContent className="p-4 space-y-4">
          <div>
            <label className="text-[10px] uppercase text-[#888888] tracking-widest block mb-1">Fluid Medium</label>
            <div className="flex gap-2">
              <Button size="sm" variant={fluid === 'water' ? 'default' : 'outline'} onClick={() => setFluid('water')}>WATER</Button>
              <Button size="sm" variant={fluid === 'honey' ? 'default' : 'outline'} onClick={() => setFluid('honey')}>HONEY</Button>
              <Button size="sm" variant={fluid === 'oil' ? 'default' : 'outline'} onClick={() => setFluid('oil')}>OIL</Button>
            </div>
          </div>
          
          <div>
            <label className="text-[10px] uppercase text-[#888888] tracking-widest flex justify-between mb-1">
              <span>Object Mass (kg)</span>
              <span className="text-white">{mass}</span>
            </label>
            <input 
              type="range" min="1" max="20" step="1" 
              value={mass} onChange={(e) => setMass(Number(e.target.value))}
              className="w-full accent-[#FF3366]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase text-[#888888] tracking-widest flex justify-between mb-1">
              <span>Object Volume (m³)</span>
              <span className="text-white">{volume}</span>
            </label>
            <input 
              type="range" min="0.001" max="0.02" step="0.001" 
              value={volume} onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[#FF3366]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
