"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function MeshBackground() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Rose Orb
      gsap.to('.mesh-orb-1', {
        x: '20vw',
        y: '20vh',
        scale: 1.2,
        rotation: 45,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Blue Orb
      gsap.to('.mesh-orb-2', {
        x: '-25vw',
        y: '15vh',
        scale: 1.3,
        rotation: -45,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });

      // Violet Orb
      gsap.to('.mesh-orb-3', {
        x: '15vw',
        y: '-25vh',
        scale: 1.1,
        rotation: 90,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
      });
      
      // Emerald Orb
      gsap.to('.mesh-orb-4', {
        x: '-10vw',
        y: '-20vh',
        scale: 1.4,
        rotation: -90,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-50] overflow-hidden pointer-events-none bg-[#FDFBF7] dark:bg-[#050505] transition-colors duration-500 ease-out">
      {/* Heavy noise overlay to make it look physical instead of digital */}
      <div className="absolute inset-0 z-10 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      {/* Fluid Mesh Orbs */}
      <div className="mesh-orb-1 absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-[40%_60%_70%_30%] bg-rose-500/20 dark:bg-rose-500/30 blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
      <div className="mesh-orb-2 absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-[60%_40%_30%_70%] bg-blue-500/20 dark:bg-blue-500/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      <div className="mesh-orb-3 absolute top-[20%] right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-[70%_30%_50%_50%] bg-violet-500/15 dark:bg-violet-500/25 blur-[90px] mix-blend-multiply dark:mix-blend-screen" />
      <div className="mesh-orb-4 absolute bottom-[20%] left-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-[30%_70%_70%_30%] bg-emerald-500/15 dark:bg-emerald-500/20 blur-[80px] mix-blend-multiply dark:mix-blend-screen" />
    </div>
  );
}
