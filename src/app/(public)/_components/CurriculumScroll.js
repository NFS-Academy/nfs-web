"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Atom, FlaskConical, TestTube, ThermometerSun } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CurriculumScroll() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  const chapters = [
    { title: 'Chapter 01', desc: 'Vector Mechanics & Kinematics', icon: <Atom size={48} strokeWidth={1} aria-hidden="true" />, color: "from-blue-500/20 to-transparent" },
    { title: 'Chapter 02', desc: 'Newtonian Dynamics', icon: <TestTube size={48} strokeWidth={1} aria-hidden="true" />, color: "from-rose-500/20 to-transparent" },
    { title: 'Chapter 05', desc: 'Pressure & Buoyancy', icon: <FlaskConical size={48} strokeWidth={1} aria-hidden="true" />, color: "from-emerald-500/20 to-transparent" },
    { title: 'Chapter 06', desc: 'Thermodynamics & Heat Exchange', icon: <ThermometerSun size={48} strokeWidth={1} aria-hidden="true" />, color: "from-amber-500/20 to-transparent" },
  ];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Horizontal Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          end: () => "+=" + (scrollWrapperRef.current.scrollWidth - window.innerWidth),
          snap: {
            snapTo: 1 / (chapters.length - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: "power2.inOut"
          }
        }
      });

      // Move the track to the left
      tl.to('.scroll-track', {
        x: () => -(scrollWrapperRef.current.scrollWidth - window.innerWidth),
        ease: "none"
      }, 0);

      // 2. Kinetic Background Typography Parallax (Moves slower/opposite direction)
      tl.to('.kinetic-bg-text', {
        xPercent: 30,
        ease: "none"
      }, 0);

      // 3. Card Internal Parallax (Windowing effect)
      gsap.utils.toArray('.curriculum-card').forEach((card, i) => {
        const innerContent = card.querySelector('.parallax-inner');
        const iconLayer = card.querySelector('.parallax-icon');
        
        // Content moves slightly opposite to the scroll direction inside the card
        tl.to(innerContent, {
          x: 100,
          ease: "none"
        }, 0);
        
        // Icon moves at a different speed for heavy depth
        tl.to(iconLayer, {
          x: -50,
          rotate: 15,
          ease: "none"
        }, 0);
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#FDFBF7] dark:bg-[#050505] overflow-hidden border-b border-black/5 dark:border-white/10 h-screen flex flex-col justify-center">
      
      {/* Kinetic Background Typography */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200vw] pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.02] flex items-center whitespace-nowrap kinetic-bg-text">
        <h1 className="text-[30vw] font-bold tracking-tighter leading-none uppercase">
          Physics • Chemistry • Math • Science • 
        </h1>
      </div>

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="px-8 md:px-16 mb-8 max-w-7xl mx-auto absolute top-[-10vh] left-0 w-full pointer-events-none">
          <div className="text-[10px] font-mono text-slate-500 dark:text-[#555] uppercase tracking-[0.2em]">Academic Directory</div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-balance text-slate-900 dark:text-white">
            The <span className="text-rose-500">Curriculum</span>
          </h2>
        </div>

        {/* Scroll Wrapper */}
        <div ref={scrollWrapperRef} className="flex w-[400vw] h-[55vh] min-h-[400px] scroll-track">
          {chapters.map((ch, i) => (
            <div key={i} className="curriculum-card w-screen h-full px-4 md:px-16 flex items-center shrink-0 justify-center">
              
              {/* Premium Double-Bezel Card Container */}
              <div className="w-full max-w-4xl h-full p-2 rounded-[2.5rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-3xl overflow-hidden shadow-2xl relative">
                
                {/* Inner Core */}
                <div className="w-full h-full bg-white dark:bg-[#0a0a0a] rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-10 md:p-16 relative overflow-hidden flex flex-col justify-end group">
                  
                  {/* Dynamic Glowing Radial Gradient */}
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${ch.color} opacity-50 pointer-events-none`} />
                  
                  {/* Subtle Noise Texture */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

                  {/* Parallax Icon */}
                  <div className="parallax-icon absolute top-12 right-12 text-slate-300 dark:text-[#222] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-hover:text-rose-500/50">
                    {ch.icon}
                  </div>
                  
                  {/* Internal Parallax Content */}
                  <div className="parallax-inner relative z-10 w-full max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-rose-500" />
                      <div className="text-rose-500 font-mono text-xs tracking-[0.2em] uppercase font-bold">{ch.title}</div>
                    </div>
                    
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
                      {ch.desc}
                    </h3>
                    
                    {/* Progress Track */}
                    <div className="mt-12 flex gap-3 max-w-sm">
                      <div className="h-1.5 flex-1 bg-slate-100 dark:bg-[#1a1a1a] rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full w-full bg-rose-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] delay-100" />
                      </div>
                      <div className="h-1.5 w-8 bg-slate-100 dark:bg-[#1a1a1a] rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full w-full bg-rose-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] delay-200" />
                      </div>
                      <div className="h-1.5 w-4 bg-slate-100 dark:bg-[#1a1a1a] rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full w-full bg-rose-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] delay-300" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
