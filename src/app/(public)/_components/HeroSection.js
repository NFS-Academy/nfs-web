"use client";

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Beaker, Play } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef(null);

  // GSAP Animations
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-badge', {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });

      tl.fromTo('.hero-text-line', {
        y: 80,
        opacity: 0,
        filter: "blur(8px)"
      }, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      }, "-=0.6");

      tl.fromTo('.hero-element', {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.8");
    });
    
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.to(['.hero-badge', '.hero-text-line', '.hero-element'], {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden border-b border-black/5 dark:border-white/10 px-4 md:px-8 bg-transparent">
      
      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="hero-badge opacity-0 mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
          <Beaker size={12} className="text-rose-500" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-medium text-slate-700 dark:text-slate-300">
            NFS Academy • Premium Education
          </span>
        </div>

        {/* Massive Typography */}
        <div className="flex flex-col items-center justify-center gap-2 mb-10 w-full">
          <div className="overflow-hidden w-full">
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.9] text-slate-900 dark:text-white hero-text-line opacity-0">
              Master the Sciences
            </h1>
          </div>
          <div className="overflow-hidden w-full flex items-center justify-center gap-4 flex-wrap">
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.9] text-slate-400 dark:text-slate-500 hero-text-line opacity-0">
              with
            </h1>
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.9] text-rose-500 hero-text-line opacity-0">
              Precision.
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-sans mb-12 hero-element leading-relaxed opacity-0">
          An elite academic curriculum built for students who demand excellence. Physics, Chemistry, and Mathematics taught with unrivaled clarity.
        </p>

        {/* Nested Double-Bezel CTA Architecture */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-element opacity-0 w-full sm:w-auto">
          
          {/* Primary Button */}
          <div className="p-1.5 rounded-full ring-1 ring-black/5 dark:ring-white/10 bg-black/5 dark:bg-white/5 w-full sm:w-auto">
            <Link href="/dashboard" className="w-full">
              <button className="group relative flex items-center justify-between gap-6 w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full hover:scale-[0.98] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <span className="text-sm font-semibold tracking-wide pl-2">Start Learning</span>
                <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <ArrowRight size={14} className="text-white dark:text-slate-900" />
                </div>
              </button>
            </Link>
          </div>

          {/* Secondary Button */}
          <Link href="/catalog" className="w-full sm:w-auto">
            <button className="group flex items-center justify-center gap-3 w-full sm:w-auto bg-transparent text-slate-700 dark:text-slate-300 px-8 py-4 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300">
              <Play size={14} className="opacity-70" />
              <span className="text-sm font-medium tracking-wide">Explore Curriculum</span>
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
}
