"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CatalogPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-12 px-8">
      <div className="border-b border-[#1A1A1A] pb-8">
        <div className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.2em] mb-4">Directory / Index</div>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-white">Curriculum</h1>
        <p className="text-[#888888] max-w-xl">Explore the full index of interactive computational models across physics and chemistry.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 border-b border-[#1A1A1A] pb-8">
        <Button variant="primary" size="sm" className="uppercase text-[10px] tracking-widest">Class 9-10</Button>
        <Button variant="ghost" size="sm" className="uppercase text-[10px] tracking-widest hover:text-white hover:border-[#333333] border border-transparent">Class 11-12</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1A1A] border border-[#1A1A1A]">
        {/* Course Card */}
        <Link href="/concept/physics-force" className="block group">
          <Card className="h-full border-none p-0 flex flex-col hover:bg-[#050505]">
            <div className="h-48 bg-[#050505] border-b border-[#1A1A1A] flex items-center justify-center p-8 relative overflow-hidden group-hover:bg-black transition-colors">
              <div className="text-8xl font-black text-[#1A1A1A] absolute -right-4 -bottom-4 group-hover:text-[#333333] transition-colors">F</div>
              <h3 className="text-3xl font-bold text-white relative z-10 text-center uppercase tracking-tighter">Physics<br/><span className="text-[#FF3366] text-xl">Force & Motion</span></h3>
            </div>
            <CardContent className="p-8 flex flex-col flex-1">
              <p className="text-[#888888] text-sm mb-8 flex-1">Master Newton's laws, momentum, and friction through 5 interactive computational models.</p>
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest border-t border-[#1A1A1A] pt-4">
                <span className="text-[#FF3366]">12 Concepts</span>
                <span className="text-white">Class 9-10</span>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Chemistry Card */}
        <Link href="/concept/chemistry-bonds" className="block group">
          <Card className="h-full border-none p-0 flex flex-col hover:bg-[#050505]">
            <div className="h-48 bg-[#050505] border-b border-[#1A1A1A] flex items-center justify-center p-8 relative overflow-hidden group-hover:bg-black transition-colors">
              <div className="text-8xl font-black text-[#1A1A1A] absolute -right-4 -bottom-4 group-hover:text-[#333333] transition-colors">H₂O</div>
              <h3 className="text-3xl font-bold text-white relative z-10 text-center uppercase tracking-tighter">Chemistry<br/><span className="text-[#00FFCC] text-xl">Chemical Bonds</span></h3>
            </div>
            <CardContent className="p-8 flex flex-col flex-1">
              <p className="text-[#888888] text-sm mb-8 flex-1">Visualize ionic and covalent bonding, valency, and molecular lattice structures.</p>
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest border-t border-[#1A1A1A] pt-4">
                <span className="text-[#00FFCC]">8 Concepts</span>
                <span className="text-white">Class 9-10</span>
              </div>
            </CardContent>
          </Card>
        </Link>
        
      </div>
    </div>
  );
}
