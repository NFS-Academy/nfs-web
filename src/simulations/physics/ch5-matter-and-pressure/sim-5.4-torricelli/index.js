"use client";

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
