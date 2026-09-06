"use client";

import { User, Award, Activity, Settings, ChevronRight, Download, BookOpen, Clock, Target, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useLanguage } from '@/i18n/LanguageContext';

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
  const { t } = useLanguage();

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
            <div className="absolute -bottom-0 -right-0 bg-slate-900 dark:bg-white px-2 py-1 text-[9px] font-mono font-bold text-white dark:text-black rounded-tl-xl shadow-sm">{t('profile.level')}</div>
          </motion.div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 w-full text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">Farhan Ahmed</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-[#888888] font-bold">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-md">
                  <Award size={12} aria-hidden="true" /> {t('profile.level')}
                </span>
                <span>{t('profile.college')}</span>
                <span className="hidden md:inline">•</span>
                <span>{t('profile.id')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="w-full md:w-auto mt-4 md:mt-0 uppercase text-[10px] tracking-widest border-black/10 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 font-bold shadow-sm active:scale-95 transition-all">
              <Download size={14} className="mr-2" aria-hidden="true" /> {t('profile.export_transcript')}
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="primary" className="uppercase text-[10px] tracking-widest flex items-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-black border-none shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
              <Settings size={14} aria-hidden="true" /> {t('profile.settings')}
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
          <motion.div variants={itemEnter} className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl p-8 flex flex-col gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-blue-500" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">{t('profile.academic_mastery')}</h2>
              </div>
            </div>

            <div className="flex flex-col gap-8 flex-1 mt-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-700 dark:text-slate-300 uppercase tracking-widest">{t('profile.mechanics')}</span>
                  <span className="text-blue-600 dark:text-blue-400">92%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.5, ...springConfig }}
                    className="h-full bg-blue-500 rounded-full" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-700 dark:text-slate-300 uppercase tracking-widest">{t('profile.pressure')}</span>
                  <span className="text-blue-600 dark:text-blue-400">85%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, ...springConfig }}
                    className="h-full bg-blue-500 rounded-full" 
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div variants={itemEnter} className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl p-8 flex flex-col gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-slate-400" aria-hidden="true" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">{t('profile.system_preferences')}</h2>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-[#888888]">
              {[
                { label: t('profile.sim_precision'), value: t('profile.high_64bit') },
                { label: t('profile.data_logging'), value: t('profile.verbose') },
                { label: t('profile.theme_accent'), value: 'Slate Blue' }
              ].map((pref, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                  <span>{pref.label}</span>
                  <span className="text-slate-900 dark:text-white">{pref.value}</span>
                </div>
              ))}
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
