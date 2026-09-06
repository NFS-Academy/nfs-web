"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CategoryGrid() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray('.editorial-card');
      
      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out'
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set('.editorial-card', { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const categories = [
    {
      id: "01",
      title: "Physics Core",
      desc: "Tweak gravity, mass, and friction in real-time. Watch the computational formulas evaluate live.",
      img: "/images/physics.jpg",
      href: "/catalog?subject=physics-9-10"
    },
    {
      id: "02",
      title: "Chemistry Subsystems",
      desc: "Interact with molecular structures and balance chemical equations with precision.",
      img: "/images/chemistry.jpg",
      href: "/catalog?subject=chemistry-9-10"
    },
    {
      id: "03",
      title: "Mathematical Logic",
      desc: "Visualize complex calculus and linear algebra matrices through interactive geometric rendering.",
      img: "/images/math.jpg",
      href: "/catalog?subject=math-9-10"
    }
  ];

  return (
    <section ref={containerRef} className="py-24 px-8 md:px-16 border-b border-black/5 dark:border-white/10 bg-transparent">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex flex-col gap-4 mb-16">
          <div className="text-[10px] font-mono text-[#AAAAAA] uppercase tracking-[0.2em]">Academic Modules</div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-balance text-white">
            Core <span className="text-[#FF3366]">Disciplines</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl">
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              href={cat.href}
              className="editorial-card bg-white/40 dark:bg-black/40 p-8 lg:p-12 flex flex-col justify-between group hover:bg-white/60 dark:hover:bg-black/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 border-r border-b border-black/5 dark:border-white/5"
            >
              <div className="space-y-4 mb-12">
                <div className="text-xs font-mono text-[#AAAAAA] uppercase tracking-widest flex items-center justify-between">
                  <span>Module {cat.id}</span>
                  <ArrowRight size={14} className="text-[#FF3366] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tighter text-white group-hover:text-[#FF3366] transition-colors">{cat.title}</h3>
                <p className="text-[#AAAAAA] text-sm leading-relaxed">{cat.desc}</p>
              </div>
              
              <div className="relative aspect-square w-full overflow-hidden border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 rounded-xl">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 opacity-[0.05] z-0" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                <Image 
                  src={cat.img} 
                  alt={`${cat.title} Cover`}
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-60 mix-blend-screen grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-in-out relative z-10" 
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
