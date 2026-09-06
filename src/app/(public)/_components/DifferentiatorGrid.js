"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Microscope, Lightbulb, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function DifferentiatorGrid() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray('.diff-card');
      
      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set('.diff-card', { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const features = [
    {
      icon: <Microscope size={24} className="text-rose-500" aria-hidden="true" />,
      title: "Visual Physics",
      description: "When a student sees a block sliding on a page, they must imagine the physics. Here, the block moves. If friction changes, the simulation reacts at 60 FPS."
    },
    {
      icon: <BookOpen size={24} className="text-rose-500" aria-hidden="true" />,
      title: "Mastery over Memorization",
      description: "We don't measure recall. We track precise interactions within the simulation to map variables manipulated and hypotheses tested."
    },
    {
      icon: <Lightbulb size={24} className="text-slate-900 dark:text-white" aria-hidden="true" />,
      title: "Interactive Rigor",
      description: "Truth is derived from mathematics, not authority. Visuals serve the physics engine, empowering students to break limits safely."
    }
  ];

  return (
    <section ref={containerRef} className="py-32 px-8 md:px-16 border-b border-black/5 dark:border-white/10 bg-[#FDFBF7] dark:bg-black">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col gap-4 mb-16">
          <div className="text-[10px] font-mono text-slate-500 dark:text-[#555] uppercase tracking-[0.2em]">Methodology</div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-balance text-slate-900 dark:text-white">
            Pedagogical <span className="text-rose-500">Philosophy</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div key={index} className="diff-card p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 group">
              <div className="w-full h-full bg-white dark:bg-[#050505] rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-10 flex flex-col gap-6 relative overflow-hidden transition-all duration-500">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/10 group-hover:scale-110 group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 transition-all duration-500">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white relative z-10">{feat.title}</h3>
                <p className="text-sm font-sans text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
