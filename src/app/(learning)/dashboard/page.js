"use client";

import Link from 'next/link';
import { Play, CheckCircle2, Lock, Activity, Zap, ArrowRight, BookOpen, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="flex-1 w-full flex flex-col p-8 md:p-16 gap-12 bg-[#FDFBF7] dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Welcome & Live Status Feed */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-black/5 dark:border-white/10 pb-8">
        <div className="flex flex-col gap-2">
          <div className="text-rose-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 font-bold">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" aria-hidden="true" />
            Laboratory Active
          </div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">Student Dashboard</h1>
        </div>
        
        <div className="bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-1 w-full md:w-auto shadow-sm">
          <div className="text-[10px] font-mono text-slate-500 dark:text-[#AAAAAA] uppercase tracking-widest">Current Objective</div>
          <div className="text-sm font-mono text-slate-900 dark:text-white flex items-center gap-3 font-bold">
            <Activity size={14} className="text-blue-500" aria-hidden="true" />
            Chapter 5: Matter and Pressure — 3 of 4 Labs Completed
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Challenges & Dock */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Daily Physics Challenge */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#111] dark:to-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-3xl relative overflow-hidden group shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-700">
              <Beaker size={120} aria-hidden="true" className="text-slate-900 dark:text-white" />
            </div>
            <div className="p-8 flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-3">
                <Zap size={20} className="text-rose-500" aria-hidden="true" />
                <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 dark:text-white">Daily Computation</h2>
              </div>
              <div className="flex flex-col gap-4 max-w-lg">
                <p className="text-slate-600 dark:text-[#CCC] font-mono text-sm leading-relaxed">
                  A 5kg solid iron block (density = 7874 kg/m³) is fully submerged in a tank of water. 
                  Calculate the exact buoyant force acting on it. (Assume g = 9.8 m/s²)
                </p>
                <div className="flex gap-4 items-center mt-2">
                  <input 
                    type="text" 
                    placeholder="ENTER VALUE [N]" 
                    aria-label="Enter calculated buoyant force value"
                    className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#333] text-slate-900 dark:text-white font-mono text-sm px-4 py-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors w-48 shadow-inner"
                  />
                  <Button variant="primary" className="uppercase font-bold text-[10px] tracking-widest px-6 py-3 h-auto">
                    Verify
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Launch Dock */}
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-[#AAAAAA]">Quick-Launch Simulators</h2>
              <Link href="/catalog" className="text-[10px] font-mono text-blue-500 uppercase tracking-widest hover:text-blue-600 dark:hover:text-white flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500">
                View All <ArrowRight size={10} aria-hidden="true" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sim Card 1 */}
              <div className="bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-2xl hover:border-rose-500 transition-colors p-5 flex flex-col gap-4 group cursor-pointer shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-[#111] rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-[#CCC] group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all">
                    5.3
                  </div>
                  <div className="text-[10px] font-mono font-bold text-blue-500 uppercase px-2 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full">
                    98% Mastery
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">Archimedes Principle</h3>
                  <p className="text-xs text-slate-500 dark:text-[#AAAAAA] font-mono mt-1">Buoyancy & Displacement</p>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-4">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-[#AAAAAA] uppercase">Last active: 2h ago</span>
                  <Link href="/workspace/5.3-archimedes" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-full">
                    <Button variant="secondary" size="sm" className="h-8 text-[10px]">
                      <Play size={10} className="mr-2" aria-hidden="true" /> Launch
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sim Card 2 */}
              <div className="bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-2xl hover:border-rose-500 transition-colors p-5 flex flex-col gap-4 group cursor-pointer shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-[#111] rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-[#CCC] group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all">
                    6.1
                  </div>
                  <div className="text-[10px] font-mono font-bold text-rose-500 uppercase px-2 py-1 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-full animate-pulse">
                    In Progress
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">Thermal Expansion</h3>
                  <p className="text-xs text-slate-500 dark:text-[#AAAAAA] font-mono mt-1">Linear, Superficial, Cubical</p>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-4">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-[#AAAAAA] uppercase">Last active: 1d ago</span>
                  <Link href="/workspace/6.1-thermal-expansion" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-full">
                    <Button variant="secondary" size="sm" className="h-8 text-[10px]">
                      <Play size={10} className="mr-2" aria-hidden="true" /> Resume
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Curriculum Grid */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-3xl p-6 h-full flex flex-col gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/10 pb-4">
              <BookOpen size={18} className="text-slate-900 dark:text-white" aria-hidden="true" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Curriculum Sequence</h2>
            </div>

            <div className="flex flex-col gap-2 relative">
              {/* Progress Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-[#1A1A1A] z-0" />
              
              {[
                { ch: 1, name: 'Physical Quantities', status: 'done' },
                { ch: 2, name: 'Motion & Kinematics', status: 'done' },
                { ch: 3, name: 'Force & Dynamics', status: 'done' },
                { ch: 4, name: 'Work, Power, Energy', status: 'done' },
                { ch: 5, name: 'Matter & Pressure', status: 'current' },
                { ch: 6, name: 'Thermodynamics', status: 'locked' },
                { ch: 7, name: 'Waves & Sound', status: 'locked' },
                { ch: 8, name: 'Optics & Light', status: 'locked' },
              ].map((chapter, i) => (
                <div key={i} className="flex items-center gap-4 relative z-10 group">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-black border-2 ${
                    chapter.status === 'done' ? 'border-blue-500 text-blue-500' : 
                    chapter.status === 'current' ? 'border-rose-500 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 
                    'border-slate-200 dark:border-white/10 text-slate-400 dark:text-[#333]'
                  }`}>
                    {chapter.status === 'done' ? <CheckCircle2 size={14} aria-hidden="true" /> : 
                     chapter.status === 'locked' ? <Lock size={14} aria-hidden="true" /> : 
                     <Activity size={14} aria-hidden="true" />}
                  </div>
                  <div className={`flex flex-col ${chapter.status === 'locked' ? 'opacity-40' : 'opacity-100'} transition-opacity group-hover:opacity-100`}>
                    <span className="text-[9px] font-mono text-slate-500 dark:text-[#AAAAAA] uppercase tracking-widest font-bold">Chapter {chapter.ch}</span>
                    <span className={`text-sm font-bold ${chapter.status === 'current' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-[#CCC]'}`}>{chapter.name}</span>
                  </div>
                </div>
              ))}
              
            </div>
            
            <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/10">
              <div className="w-full h-1.5 bg-slate-100 dark:bg-[#1A1A1A] overflow-hidden rounded-full">
                <div className="h-full bg-blue-500 w-[45%] rounded-full" />
              </div>
              <div className="text-[9px] font-mono text-slate-500 dark:text-[#AAAAAA] uppercase tracking-widest mt-2 flex justify-between font-bold">
                <span>Course Completion</span>
                <span className="text-slate-900 dark:text-white">45%</span>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
