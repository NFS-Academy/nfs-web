"use client";

import Link from 'next/link';
import { Play, CheckCircle2, Lock, Activity, Zap, ArrowRight, BookOpen, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

// Soft Structuralism: Spring configurations for tactile Apple-like motion
const springConfig = { type: "spring", damping: 20, stiffness: 300 };
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
const itemEnter = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springConfig }
};

export default function DashboardPage() {
  return (
    <div className="flex-1 w-full flex flex-col p-8 md:p-16 gap-12 bg-[#FDFBF7] dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Welcome & Live Status Feed */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-black/5 dark:border-white/10 pb-8"
      >
        <div className="flex flex-col gap-2">
          <div className="text-blue-600 dark:text-blue-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 font-bold">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" aria-hidden="true" />
            Laboratory Active
          </div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">Student Dashboard</h1>
        </div>
        
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-1 w-full md:w-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          <div className="text-[10px] font-mono text-slate-500 dark:text-[#888888] uppercase tracking-widest">Current Objective</div>
          <div className="text-sm font-mono text-slate-900 dark:text-white flex items-center gap-3 font-bold">
            <Activity size={14} className="text-blue-500" aria-hidden="true" />
            Chapter 5: Matter and Pressure — 3 of 4 Labs Completed
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        
        {/* Left Column: Challenges & Dock */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Daily Physics Challenge */}
          <motion.div 
            variants={itemEnter}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            className="bg-white/80 dark:bg-gradient-to-br dark:from-[#151515]/90 dark:to-[#0A0A0A]/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2rem] relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.03)] cursor-pointer"
          >
            {/* Subtle inner highlight for glass refraction */}
            <div className="absolute inset-0 border border-white/40 dark:border-white/5 rounded-[2rem] pointer-events-none" />
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-5 group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
              <Beaker size={160} aria-hidden="true" className="text-slate-900 dark:text-white" />
            </div>
            
            <div className="p-8 md:p-10 flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-3">
                <Zap size={20} className="text-blue-500" aria-hidden="true" />
                <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 dark:text-white">Daily Computation</h2>
              </div>
              <div className="flex flex-col gap-5 max-w-lg">
                <p className="text-slate-600 dark:text-[#CCCCCC] font-mono text-sm leading-relaxed">
                  A 5kg solid iron block (density = 7874 kg/m³) is fully submerged in a tank of water. 
                  Calculate the exact buoyant force acting on it. (Assume g = 9.8 m/s²)
                </p>
                <div className="flex gap-4 items-center mt-2">
                  <input 
                    type="text" 
                    placeholder="ENTER VALUE [N]" 
                    aria-label="Enter calculated buoyant force value"
                    className="bg-slate-50/50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm px-5 py-3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors w-48 shadow-inner backdrop-blur-md"
                  />
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button variant="primary" className="uppercase font-bold text-[10px] tracking-widest px-8 py-3 rounded-2xl h-auto bg-blue-600 hover:bg-blue-700 text-white border-none shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">
                      Verify
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Launch Dock */}
          <motion.div variants={itemEnter} className="flex flex-col gap-6 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-[#888888]">Quick-Launch Simulators</h2>
              <Link href="/catalog" className="text-[10px] font-mono text-blue-500 uppercase tracking-widest hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500">
                View All <ArrowRight size={10} aria-hidden="true" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sim Card 1 */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/70 dark:bg-[#111111]/70 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-colors p-6 flex flex-col gap-5 group cursor-pointer shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-black rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-[#AAAAAA] group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all shadow-sm">
                    <span className="font-mono text-xs font-bold tracking-tighter">5.3</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full flex items-center gap-2 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 dark:group-hover:bg-blue-500/10 dark:group-hover:border-blue-500/20 dark:group-hover:text-blue-400 transition-all">
                    <CheckCircle2 size={12} className="hidden group-hover:block" />
                    98% Mastery
                  </div>
                </div>
                <div className="relative z-10 mt-2">
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight text-lg">Archimedes Principle</h3>
                  <p className="text-xs text-slate-500 dark:text-[#888888] font-mono mt-1">Buoyancy & Displacement</p>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-5 relative z-10">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-[#666666] uppercase">Last active: 2h ago</span>
                  <Link href="/workspace/5.3-archimedes" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full" onClick={(e) => e.stopPropagation()}>
                    <Button variant="secondary" size="sm" className="h-8 text-[10px] rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border-transparent">
                      <Play size={10} className="mr-2" aria-hidden="true" /> Launch
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Sim Card 2 */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/70 dark:bg-[#111111]/70 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl hover:border-slate-400 dark:hover:border-white/30 transition-colors p-6 flex flex-col gap-5 group cursor-pointer shadow-sm relative overflow-hidden"
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-black rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-[#AAAAAA] group-hover:bg-slate-800 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all shadow-sm">
                    <span className="font-mono text-xs font-bold tracking-tighter">6.1</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-slate-900 dark:text-white uppercase px-3 py-1.5 bg-slate-100 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
                    In Progress
                  </div>
                </div>
                <div className="relative z-10 mt-2">
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight text-lg">Thermal Expansion</h3>
                  <p className="text-xs text-slate-500 dark:text-[#888888] font-mono mt-1">Linear, Superficial, Cubical</p>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-5 relative z-10">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-[#666666] uppercase">Last active: 1d ago</span>
                  <Link href="/workspace/6.1-thermal-expansion" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 rounded-full" onClick={(e) => e.stopPropagation()}>
                    <Button variant="secondary" size="sm" className="h-8 text-[10px] rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border-transparent">
                      <Play size={10} className="mr-2" aria-hidden="true" /> Resume
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Curriculum Grid */}
        <motion.div variants={itemEnter} className="lg:col-span-1">
          <div className="bg-white/60 dark:bg-[#111111]/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2rem] p-8 h-full flex flex-col gap-8 shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute inset-0 border border-white/40 dark:border-white/5 rounded-[2rem] pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-5 relative z-10">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-slate-900 dark:text-white" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Curriculum Sequence</h2>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative flex-1 z-10">
              {/* Progress Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-white/5 z-0" />
              
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
                <motion.div 
                  key={i} 
                  whileHover={chapter.status !== 'locked' ? { x: 4 } : {}}
                  className={`flex items-center gap-5 relative z-10 group ${chapter.status !== 'locked' ? 'cursor-pointer' : ''}`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-[#151515] shadow-sm z-10 transition-colors duration-300 ${
                    chapter.status === 'done' ? 'border border-blue-200 dark:border-blue-900/50 text-blue-500' : 
                    chapter.status === 'current' ? 'border-2 border-blue-500 text-blue-500 ring-4 ring-blue-500/10' : 
                    'border border-slate-200 dark:border-white/10 text-slate-300 dark:text-[#444]'
                  }`}>
                    {chapter.status === 'done' ? <CheckCircle2 size={14} aria-hidden="true" /> : 
                     chapter.status === 'locked' ? <Lock size={14} aria-hidden="true" /> : 
                     <Activity size={14} aria-hidden="true" />}
                  </div>
                  <div className={`flex flex-col ${chapter.status === 'locked' ? 'opacity-40' : 'opacity-100'} transition-opacity group-hover:opacity-100`}>
                    <span className="text-[9px] font-mono text-slate-500 dark:text-[#888888] uppercase tracking-widest font-bold">Chapter {chapter.ch}</span>
                    <span className={`text-sm font-bold tracking-tight ${chapter.status === 'current' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-[#CCCCCC]'}`}>{chapter.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/10 relative z-10">
              <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 overflow-hidden rounded-full shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-blue-500 rounded-full" 
                />
              </div>
              <div className="text-[9px] font-mono text-slate-500 dark:text-[#888888] uppercase tracking-widest mt-3 flex justify-between font-bold">
                <span>Course Completion</span>
                <span className="text-slate-900 dark:text-white font-black">45%</span>
              </div>
            </div>

          </div>
        </motion.div>
        
      </motion.div>
    </div>
  );
}
