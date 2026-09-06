"use client";

import { Activity, Clock, Settings, User, Download, Shield, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <div className="flex-1 w-full flex flex-col p-8 md:p-16 gap-12 bg-[#FDFBF7] dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Header / Identity Block */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-b border-black/5 dark:border-white/10 pb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white dark:bg-[#111] border-4 border-white dark:border-[#111] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex items-center justify-center relative overflow-hidden group ring-2 ring-rose-500">
            <User size={40} className="text-rose-500 group-hover:scale-110 transition-transform duration-500 ease-out" aria-hidden="true" />
            <div className="absolute top-0 left-0 w-full h-full bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-2 -right-2 bg-slate-900 dark:bg-black px-2 py-1 text-[8px] font-mono font-bold text-white border border-rose-500 rounded-tl-lg">Lvl. 4</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">Cipher_77</h1>
              <Shield size={16} className="text-blue-500" aria-hidden="true" />
            </div>
            <div className="font-mono text-xs text-slate-500 dark:text-[#AAAAAA] font-bold uppercase tracking-widest flex items-center gap-2">
              <span>Dhaka College</span>
              <span className="w-1 h-1 bg-slate-300 dark:bg-[#333] rounded-full" />
              <span>ID: 8492-AX</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button variant="secondary" className="uppercase text-[10px] tracking-widest flex items-center gap-2">
            <Download size={14} aria-hidden="true" /> Export Transcript
          </Button>
          <Button variant="primary" className="uppercase text-[10px] tracking-widest flex items-center gap-2">
            <Settings size={14} aria-hidden="true" /> Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Mastery & Stats */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          
          {/* Formula Mastery Telemetry */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-3xl p-6 hover:border-black/10 dark:hover:border-white/20 transition-colors shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-black/5 dark:border-white/10 pb-4">
              <Target size={18} className="text-rose-500" aria-hidden="true" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Academic Mastery</h2>
            </div>
            
            <div className="flex flex-col gap-6">
              {[
                { name: 'Mechanics (Ch 2-4)', value: 85, color: 'bg-rose-500' },
                { name: 'Pressure (Ch 5)', value: 60, color: 'bg-blue-500' },
                { name: 'Thermodynamics (Ch 6)', value: 40, color: 'bg-slate-700 dark:bg-white' },
                { name: 'Wave Optics (Ch 7-8)', value: 15, color: 'bg-slate-300 dark:bg-[#555]' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-2 group">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest font-bold text-slate-500 dark:text-[#AAAAAA]">
                    <span>{stat.name}</span>
                    <span className="text-slate-900 dark:text-white">{stat.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-[#111] overflow-hidden rounded-full">
                    <div 
                      className={`h-full ${stat.color} transition-all duration-1000 ease-out origin-left rounded-full`} 
                      style={{ width: `${stat.value}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-3xl p-6 hover:border-black/10 dark:hover:border-white/20 transition-colors shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-black/5 dark:border-white/10 pb-4">
              <Settings size={18} className="text-slate-900 dark:text-white" aria-hidden="true" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">System Preferences</h2>
            </div>
            
            <div className="flex flex-col gap-4 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-[#AAAAAA]">
              <div tabIndex={0} className="flex justify-between items-center p-3 rounded-xl border border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
                <span>Simulation Precision</span>
                <span className="text-blue-500">High (64-bit)</span>
              </div>
              <div tabIndex={0} className="flex justify-between items-center p-3 rounded-xl border border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
                <span>Data Logging</span>
                <span className="text-rose-500">Verbose</span>
              </div>
              <div tabIndex={0} className="flex justify-between items-center p-3 rounded-xl border border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
                <span>Theme Accent</span>
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white dark:border-black shadow-sm" />
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-white" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Experiment Ledger */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-3xl p-6 min-h-full hover:border-black/10 dark:hover:border-white/20 transition-colors shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-black/5 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-blue-500" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Laboratory Records</h2>
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-[#555] uppercase tracking-widest">Total: 42 Runs</div>
            </div>
            
            <div className="flex flex-col gap-3">
              {/* Ledger Header */}
              <div className="grid grid-cols-12 gap-4 text-[10px] font-mono font-bold text-slate-400 dark:text-[#555] uppercase tracking-widest pb-2">
                <div className="col-span-2">Date</div>
                <div className="col-span-5">Simulation Protocol</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-3 text-right">Result</div>
              </div>

              {/* Ledger Rows */}
              {[
                { date: '12.09', name: '5.3 Archimedes Principle', duration: '14m 22s', result: '98% ACCURACY', status: 'success' },
                { date: '11.09', name: '5.2 Pascal\'s Law Hydraulic', duration: '08m 15s', result: '85% ACCURACY', status: 'success' },
                { date: '10.09', name: '6.1 Thermal Expansion', duration: '22m 04s', result: 'ERR: VARIABLES', status: 'error' },
                { date: '08.09', name: '4.1 Newton\'s Second Law', duration: '11m 40s', result: '100% ACCURACY', status: 'success' },
                { date: '05.09', name: '3.1 Free Fall Kinematics', duration: '05m 12s', result: '92% ACCURACY', status: 'success' },
              ].map((log, i) => (
                <div 
                  key={i} 
                  tabIndex={0}
                  className="grid grid-cols-12 gap-4 text-xs font-mono font-bold items-center p-4 rounded-xl border border-black/5 dark:border-white/5 bg-slate-50 dark:bg-[#050505] hover:border-black/10 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#111] transition-all cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  <div className="col-span-2 text-slate-500 dark:text-[#AAAAAA]">{log.date}</div>
                  <div className="col-span-5 text-slate-700 dark:text-[#CCC] group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">{log.name}</div>
                  <div className="col-span-2 flex items-center gap-2 text-slate-500 dark:text-[#AAAAAA]">
                    <Clock size={12} aria-hidden="true" />
                    {log.duration}
                  </div>
                  <div className={`col-span-3 text-right ${log.status === 'success' ? 'text-blue-500' : 'text-rose-500'}`}>
                    {log.result}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="secondary" className="w-full text-[10px] font-mono uppercase tracking-widest font-bold">
                Load Older Records
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
