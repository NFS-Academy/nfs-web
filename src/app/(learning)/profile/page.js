"use client";

import { Activity, Clock, Settings, User, Download, Shield, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

// Spring configurations for tactile Apple-like motion
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

export default function ProfilePage() {
  return (
    <div className="flex-1 w-full flex flex-col p-8 md:p-16 gap-12 bg-[#FDFBF7] dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Header / Identity Block */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-b border-black/5 dark:border-white/10 pb-8"
      >
        <div className="flex items-center gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-24 h-24 bg-white/50 dark:bg-[#111]/50 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgb(0,0,0,0.2)] flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <User size={36} className="text-blue-500 group-hover:scale-110 transition-transform duration-500 ease-out" aria-hidden="true" />
            <div className="absolute -bottom-0 -right-0 bg-slate-900 dark:bg-white px-2 py-1 text-[9px] font-mono font-bold text-white dark:text-black rounded-tl-xl shadow-sm">Lvl. 4</div>
          </motion.div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">Cipher_77</h1>
              <Shield size={16} className="text-blue-500" aria-hidden="true" />
            </div>
            <div className="font-mono text-xs text-slate-500 dark:text-[#888888] font-bold uppercase tracking-widest flex items-center gap-2">
              <span>Dhaka College</span>
              <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-white/20 rounded-full" />
              <span>ID: 8492-AX</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="secondary" className="uppercase text-[10px] tracking-widest flex items-center gap-2 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-lg border border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/20 shadow-sm">
              <Download size={14} aria-hidden="true" /> Export Transcript
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="primary" className="uppercase text-[10px] tracking-widest flex items-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-black border-none shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
              <Settings size={14} aria-hidden="true" /> Settings
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        
        {/* Left Column: Mastery & Stats */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          
          {/* Formula Mastery Telemetry */}
          <motion.div variants={itemEnter} className="bg-white/60 dark:bg-[#111111]/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2rem] p-8 hover:border-black/10 dark:hover:border-white/20 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute inset-0 border border-white/40 dark:border-white/5 rounded-[2rem] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8 border-b border-black/5 dark:border-white/10 pb-5 relative z-10">
              <Target size={18} className="text-blue-500" aria-hidden="true" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Academic Mastery</h2>
            </div>
            
            <div className="flex flex-col gap-7 relative z-10">
              {[
                { name: 'Mechanics (Ch 2-4)', value: 85, color: 'bg-blue-500' },
                { name: 'Pressure (Ch 5)', value: 60, color: 'bg-blue-400' },
                { name: 'Thermodynamics (Ch 6)', value: 40, color: 'bg-slate-700 dark:bg-white' },
                { name: 'Wave Optics (Ch 7-8)', value: 15, color: 'bg-slate-300 dark:bg-white/20' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest font-bold text-slate-500 dark:text-[#888888]">
                    <span>{stat.name}</span>
                    <span className="text-slate-900 dark:text-white">{stat.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 overflow-hidden rounded-full shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 + 0.3 }}
                      className={`h-full ${stat.color} rounded-full`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div variants={itemEnter} className="bg-white/60 dark:bg-[#111111]/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2rem] p-8 hover:border-black/10 dark:hover:border-white/20 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute inset-0 border border-white/40 dark:border-white/5 rounded-[2rem] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8 border-b border-black/5 dark:border-white/10 pb-5 relative z-10">
              <Settings size={18} className="text-slate-900 dark:text-white" aria-hidden="true" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">System Preferences</h2>
            </div>
            
            <div className="flex flex-col gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-[#888888] relative z-10">
              <motion.div whileHover={{ x: 2 }} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <span>Simulation Precision</span>
                <span className="text-blue-500">High (64-bit)</span>
              </motion.div>
              <motion.div whileHover={{ x: 2 }} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <span>Data Logging</span>
                <span className="text-slate-900 dark:text-white">Verbose</span>
              </motion.div>
              <motion.div whileHover={{ x: 2 }} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <span>Theme Accent</span>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-black shadow-sm ring-2 ring-blue-500/20" />
                  <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-white" />
                  <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-[#333]" />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Experiment Ledger */}
        <motion.div variants={itemEnter} className="lg:col-span-2">
          <div className="bg-white/60 dark:bg-[#111111]/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2rem] p-8 min-h-full hover:border-black/10 dark:hover:border-white/20 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute inset-0 border border-white/40 dark:border-white/5 rounded-[2rem] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-2 border-b border-black/5 dark:border-white/10 pb-5 relative z-10">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-blue-500" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Laboratory Records</h2>
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-[#666666] uppercase tracking-widest">Total: 42 Runs</div>
            </div>
            
            <div className="flex flex-col relative z-10">
              {/* Ledger Header */}
              <div className="grid grid-cols-12 gap-4 text-[10px] font-mono font-bold text-slate-400 dark:text-[#666666] uppercase tracking-widest py-4 px-4 border-b border-black/5 dark:border-white/10">
                <div className="col-span-2">Date</div>
                <div className="col-span-5">Simulation Protocol</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-3 text-right">Result</div>
              </div>

              {/* Ledger Rows */}
              <div className="flex flex-col divide-y divide-black/5 dark:divide-white/5">
                {[
                  { date: '12.09', name: '5.3 Archimedes Principle', duration: '14m 22s', result: '98% ACCURACY', status: 'success' },
                  { date: '11.09', name: '5.2 Pascal\'s Law Hydraulic', duration: '08m 15s', result: '85% ACCURACY', status: 'success' },
                  { date: '10.09', name: '6.1 Thermal Expansion', duration: '22m 04s', result: 'ERR: VARIABLES', status: 'error' },
                  { date: '08.09', name: '4.1 Newton\'s Second Law', duration: '11m 40s', result: '100% ACCURACY', status: 'success' },
                  { date: '05.09', name: '3.1 Free Fall Kinematics', duration: '05m 12s', result: '92% ACCURACY', status: 'success' },
                ].map((log, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    className="grid grid-cols-12 gap-4 text-xs font-mono font-bold items-center p-4 -mx-4 rounded-xl cursor-pointer group transition-colors dark:hover:bg-white/5"
                  >
                    <div className="col-span-2 text-slate-500 dark:text-[#888]">{log.date}</div>
                    <div className="col-span-5 text-slate-700 dark:text-[#CCC] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{log.name}</div>
                    <div className="col-span-2 flex items-center gap-2 text-slate-500 dark:text-[#888]">
                      <Clock size={12} aria-hidden="true" />
                      {log.duration}
                    </div>
                    <div className={`col-span-3 text-right ${log.status === 'success' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-[#555]'}`}>
                      {log.result}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center relative z-10 border-t border-black/5 dark:border-white/10 pt-8">
              <motion.div whileTap={{ scale: 0.98 }} className="w-full">
                <Button variant="secondary" className="w-full h-12 rounded-2xl text-[10px] font-mono uppercase tracking-widest font-bold bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm">
                  Load Older Records
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
