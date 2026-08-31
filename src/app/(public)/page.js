"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useFadeIn, useStaggerReveal } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export default function Home() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  
  useFadeIn(heroRef, { y: 20 });
  useStaggerReveal(gridRef, ".editorial-card");

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#FF3366] selection:text-black">
      
      {/* Stark Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-24 border-b border-[#1A1A1A] flex flex-col items-start justify-end min-h-[70vh] px-8 md:px-16"
      >
        <div className="max-w-5xl space-y-6">
          <div className="inline-block border border-[#333333] px-3 py-1 text-xs font-mono uppercase tracking-widest text-[#888888] mb-8">
            System Iteration 2.0
          </div>
          
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.9]">
            Master <br/>
            Science <br/>
            <span className="text-[#FF3366]">Dynamically.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-[#888888] max-w-2xl font-sans mt-8">
            An architectural, computational approach to physics and chemistry education. Replace static diagrams with real-time computational models.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-12">
            <Link href="/dashboard">
              <Button size="lg" variant="primary" className="w-full sm:w-auto uppercase tracking-wider text-xs">
                Initialize Workspace
              </Button>
            </Link>
            <Link href="/catalog">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto uppercase tracking-wider text-xs">
                View Curriculum
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Grid Section */}
      <section ref={gridRef} className="py-24 px-8 md:px-16 border-b border-[#1A1A1A]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1A1A1A] border border-[#1A1A1A]">
          
          {/* Physics Module */}
          <div className="editorial-card bg-black p-12 flex flex-col justify-between group">
            <div className="space-y-4 mb-16">
              <div className="text-xs font-mono text-[#888888] uppercase tracking-widest">Module 01</div>
              <h2 className="text-4xl font-bold uppercase tracking-tighter">Physics Core</h2>
              <p className="text-[#888888]">Tweak gravity, mass, and friction in real-time. Watch the computational formulas evaluate live.</p>
            </div>
            <div className="relative aspect-square w-full overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A]">
              <Image 
                src="/images/physics.jpg" 
                alt="Physics Pendulum Render" 
                fill 
                className="object-cover opacity-80 mix-blend-screen grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" 
              />
            </div>
          </div>

          {/* Chemistry Module */}
          <div className="editorial-card bg-black p-12 flex flex-col justify-between group">
            <div className="space-y-4 mb-16">
              <div className="text-xs font-mono text-[#888888] uppercase tracking-widest">Module 02</div>
              <h2 className="text-4xl font-bold uppercase tracking-tighter">Chemistry Subsystems</h2>
              <p className="text-[#888888]">Interact with molecular structures and balance chemical equations with precision.</p>
            </div>
            <div className="relative aspect-square w-full overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A]">
              <Image 
                src="/images/chemistry.jpg" 
                alt="Chemistry Molecular Render" 
                fill 
                className="object-cover opacity-80 mix-blend-screen grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" 
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
