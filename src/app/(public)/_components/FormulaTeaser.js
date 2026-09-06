"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function FormulaTeaser() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from('.teaser-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set('.teaser-content', { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-8 md:px-16 bg-transparent border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center teaser-content opacity-0">
        
        {/* Left: Interactive Physics Sandbox (3D iframe) */}
        <div className="flex-1 w-full relative z-10">
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-3xl shadow-2xl p-2 md:p-3 group">
            <div className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem] ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
            <iframe 
              src="/simulations/archimedes" 
              className="w-full h-full border-0 rounded-3xl bg-transparent relative z-10"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </div>
        </div>

        {/* Right: Copy */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-balance text-slate-900 dark:text-white">
            Don't Memorize. <br/>
            <span className="text-blue-500">Experiment.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-[#AAAAAA] font-sans leading-relaxed">
            The fundamental laws of nature aren't abstract concepts to be memorized from a chalkboard. They are systems waiting to be tested.
          </p>
          <p className="text-lg text-slate-600 dark:text-[#AAAAAA] font-sans leading-relaxed">
            The fundamental laws of nature aren't abstract concepts to be memorized from a chalkboard. Interact with the simulation to experience the physics firsthand.
          </p>
        </div>

      </div>
    </section>
  );
}
