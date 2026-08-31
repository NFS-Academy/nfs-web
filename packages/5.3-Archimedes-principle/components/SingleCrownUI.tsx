"use client";

import { useExperimentStore } from "@/store/experimentStore";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Info, RefreshCcw } from "lucide-react";
import React from "react";

// Bangla numbers helper
const bn = (num: number | string) => {
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/[0-9]/g, (w) => digits[+w]);
};

export function SingleCrownUI({ children }: { children: React.ReactNode }) {
  const store = useExperimentStore();

  return (
    <>
      <header className='flex justify-between items-center mb-4 px-2'>
        <div className='flex items-center gap-4'>
          <div className='bg-amber-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-slate-900 text-xl'>Au</div>
          <div>
            <h1 className='text-2xl font-bold text-white font-sans'>আর্কিমিডিসের সূত্রের সাহায্যে নকল সোনার মুকুট শনাক্তকরণ পরীক্ষা</h1>
            <p className='text-xs text-slate-400 uppercase tracking-widest font-serif'>ভৌত বিজ্ঞান ল্যাবরেটরি • নবম-দশম শ্রেণী</p>
          </div>
        </div>
        <div className='flex gap-2 pointer-events-auto'>
          <button onClick={() => store.resetExperiment()} className='bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-sm border border-slate-700 text-red-400 flex items-center gap-2'>
            <RefreshCcw className="w-4 h-4" /> পুনরায় পরীক্ষা
          </button>
        </div>
      </header>

      <main className='flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 h-full min-h-0 overflow-y-auto lg:overflow-hidden pb-8 lg:pb-0'>
        {/* Left Panel */}
        <div className='lg:col-span-3 order-3 lg:order-1 flex flex-col gap-4 lg:overflow-y-auto'>
          {/* Instructions */}
          <div className='bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex-1 flex flex-col'>
             <div className="lg:hidden flex justify-between items-center cursor-pointer mb-2" onClick={(e) => {
                const content = e.currentTarget.parentElement?.querySelector('.instructions-content');
                if (content) content.classList.toggle('hidden');
             }}>
                <h2 className='text-amber-400 font-semibold flex items-center gap-2'>
                  <span className='w-2 h-2 bg-amber-400 rounded-full'></span>নির্দেশনা (Instructions)
                </h2>
                <span className="text-slate-300 font-bold text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  ☰ দেখাও
                </span>
             </div>
             
             <h2 className='hidden lg:flex text-amber-400 font-semibold mb-4 border-b border-slate-800 pb-2 items-center gap-2'>
               <span className='w-2 h-2 bg-amber-400 rounded-full'></span>নির্দেশনা (Instructions)
             </h2>
             <div className='hidden lg:block space-y-4 font-serif instructions-content'>
                <div className={`p-3 rounded-lg border-l-4 ${store.appState === 'INTRO' ? 'bg-slate-800/50 border-amber-500' : 'bg-slate-800/20 border-slate-700 opacity-60'}`}>
                  <p className={`text-sm mb-1 ${store.appState === 'INTRO' ? 'text-slate-300 font-bold' : 'text-slate-400'}`}>ধাপ ১: বাতাসে ভর পরিমাপ</p>
                  <p className={`text-xs leading-relaxed ${store.appState === 'INTRO' ? 'text-slate-100' : 'text-slate-500'}`}>মুকুটটিকে স্প্রিং ব্যালেন্সে ঝুলিয়ে বাতাসে এর প্রকৃত ভর পরিমাপ করো।</p>
                </div>
                <div className={`p-3 rounded-lg border-l-4 ${store.appState === 'EXPERIMENT' ? 'bg-slate-800/50 border-amber-500' : 'bg-slate-800/20 border-slate-700 opacity-60'}`}>
                  <p className={`text-sm mb-1 ${store.appState === 'EXPERIMENT' ? 'text-slate-300 font-bold' : 'text-slate-400'}`}>ধাপ ২: পানিতে নিমজ্জন</p>
                  <p className={`text-xs leading-relaxed ${store.appState === 'EXPERIMENT' ? 'text-slate-100' : 'text-slate-500'}`}>মুকুটটিকে পানিতে সম্পূর্ণ নিমজ্জিত করো যেন এটি পাত্র স্পর্শ না করে।</p>
                </div>
                <div className={`p-3 rounded-lg border-l-4 ${(store.appState === 'CALCULATION' || store.appState === 'RESULT' || store.appState.includes('DISCOVERY')) ? 'bg-slate-800/50 border-amber-500' : 'bg-slate-800/20 border-slate-700 opacity-60'}`}>
                  <p className={`text-sm mb-1 ${(store.appState === 'CALCULATION' || store.appState === 'RESULT' || store.appState.includes('DISCOVERY')) ? 'text-slate-300 font-bold' : 'text-slate-400'}`}>ধাপ ৩: সিদ্ধান্ত গ্রহণ</p>
                  <p className={`text-xs leading-relaxed ${(store.appState === 'CALCULATION' || store.appState === 'RESULT' || store.appState.includes('DISCOVERY')) ? 'text-slate-100' : 'text-slate-500'}`}>পরিমাপ করা উপাত্ত থেকে ঘনত্বের পার্থক্য নির্ণয় করো।</p>
                </div>
             </div>
             
             {/* Messages */}
             <div className="mt-4 hidden lg:block">
                <AnimatePresence>
                  {store.crownState === 'INVALID_CONTACT' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-red-200 bg-red-950/80 p-3 rounded border border-red-900 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      মুকুটটি পাত্রের তলা স্পর্শ করছে। একটু উপরে তুলুন।
                    </motion.div>
                  )}
                  {store.crownState === 'PARTIAL_SUBMERGENCE' && store.appState === 'EXPERIMENT' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-amber-200 bg-amber-950/80 p-3 rounded border border-amber-900 flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 shrink-0" />
                      মুকুটটি এখনো সম্পূর্ণ নিমজ্জিত হয়নি।
                    </motion.div>
                  )}
                  {store.crownState === 'FULL_SUBMERGENCE' && store.appState === 'EXPERIMENT' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-green-200 bg-green-950/80 p-3 rounded border border-green-900 flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 shrink-0" />
                      ✓ মুকুট সম্পূর্ণ নিমজ্জিত
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
          
          <div className='bg-indigo-900/30 border border-indigo-800/50 p-5 rounded-2xl'>
            <h3 className='text-indigo-300 text-xs font-bold uppercase mb-3 font-sans'>সূত্রাবলি (Formulas)</h3>
            <div className='space-y-2 font-mono text-sm'>
              <p className='text-indigo-200'>V = (M₁ - M₂) / ρ_w</p>
              <p className='text-indigo-200'>ρ_crown = M₁ / V</p>
            </div>
          </div>
        </div>

        {/* Center 3D View */}
        <div className='lg:col-span-6 order-1 lg:order-2 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col shadow-2xl min-h-[45vh] lg:min-h-0'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)] opacity-50 pointer-events-none z-0'></div>
          <div className="absolute inset-0 z-10">
            {children}
          </div>
          
          {/* Status Overlay in 3D view */}
          <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 flex items-center gap-3 z-20 pointer-events-none'>
            <div className={`w-3 h-3 rounded-full ${store.appState === 'EXPERIMENT' ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className='text-xs font-mono text-slate-300'>
              {store.crownState.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Right Panel */}
        <div className='lg:col-span-3 order-2 lg:order-3 flex flex-col gap-4 lg:overflow-y-auto pb-8 lg:pb-0'>
          <div className='bg-slate-900 border border-slate-800 p-5 rounded-2xl flex-1 flex flex-col'>
            
            {/* Up/Down Controls */}
            <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-4 font-sans order-1 lg:order-3'>
              <h4 className='text-xs text-slate-400 uppercase tracking-wider mb-3 text-center'>মুকুটের অবস্থান</h4>
              <div className='flex justify-center gap-4 mb-3'>
                <button 
                  onPointerDown={() => store.setIsMoving('UP')}
                  onPointerUp={() => store.setIsMoving(null)}
                  onPointerLeave={() => store.setIsMoving(null)}
                  className='bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 select-none shadow-lg'
                >
                  ↑ উপরে
                </button>
                <button 
                  onPointerDown={() => store.setIsMoving('DOWN')}
                  onPointerUp={() => store.setIsMoving(null)}
                  onPointerLeave={() => store.setIsMoving(null)}
                  className='bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 select-none shadow-lg'
                >
                  ↓ নিচে
                </button>
              </div>
              <div className='text-center'>
                <span className='text-xs text-slate-400'>উচ্চতা: </span>
                <span className='text-sm font-mono text-amber-400'>
                  {Math.max(0, (store.apparatusY + 0.5) * 10).toFixed(1)} cm
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="order-2 lg:order-4 w-full">
              {store.appState === 'INTRO' && (
                <div className={`relative w-full ${store.crownState === 'AIR_MEASUREMENT' ? 'p-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse rounded-xl' : 'p-0'}`}>
                  <button 
                    disabled={store.crownState !== 'AIR_MEASUREMENT'}
                    onClick={() => { store.setMeasuredAirMass(10.0); store.setAppState('EXPERIMENT'); }}
                    className={`w-full hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-lg transition-colors font-sans ${store.crownState === 'AIR_MEASUREMENT' ? 'bg-amber-400 border-transparent' : 'bg-amber-500'}`}
                  >
                    বাতাসে ভর (M₁) পরিমাপ করো
                  </button>
                </div>
              )}
              
              {store.appState === 'EXPERIMENT' && (
                <div className={`relative w-full ${store.crownState === 'FULL_SUBMERGENCE' ? 'p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse rounded-xl' : 'p-0'}`}>
                  <button 
                    disabled={store.crownState !== 'FULL_SUBMERGENCE'}
                    onClick={() => { store.setMeasuredWaterMass(9.4); store.setAppState('CALCULATION'); setTimeout(() => store.setShowFormulas(true), 500); }}
                    className={`w-full hover:bg-cyan-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-lg transition-colors font-sans ${store.crownState === 'FULL_SUBMERGENCE' ? 'bg-cyan-400 border-transparent' : 'bg-cyan-500'}`}
                  >
                    পানিতে আপাত ভর (M₂) পরিমাপ করো
                  </button>
                </div>
              )}
            </div>

            {/* Status Messages on Mobile */}
            <div className="mb-4 lg:hidden block order-3 lg:order-5 mt-4">
               <h3 className='text-xs text-slate-400 uppercase font-bold tracking-wider font-sans mb-2'>বর্তমান অবস্থা</h3>
               {store.crownState === 'INVALID_CONTACT' && (
                 <div className="text-xs text-red-200 bg-red-950/80 p-3 rounded border border-red-900 flex items-start gap-2">
                   <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                   মুকুটটি পাত্রের তলা স্পর্শ করছে। একটু উপরে তুলুন।
                 </div>
               )}
               {store.crownState === 'PARTIAL_SUBMERGENCE' && store.appState === 'EXPERIMENT' && (
                 <div className="text-xs text-amber-200 bg-amber-950/80 p-3 rounded border border-amber-900 flex items-start gap-2">
                   <Info className="w-4 h-4 mt-0.5 shrink-0" />
                   মুকুটটি এখনো সম্পূর্ণ নিমজ্জিত হয়নি।
                 </div>
               )}
               {store.crownState === 'FULL_SUBMERGENCE' && store.appState === 'EXPERIMENT' && (
                 <div className="text-xs text-green-200 bg-green-950/80 p-3 rounded border border-green-900 flex items-start gap-2">
                   <Info className="w-4 h-4 mt-0.5 shrink-0" />
                   ✓ মুকুট সম্পূর্ণ নিমজ্জিত — এখন M₂ পরিমাপ করো।
                 </div>
               )}
               {store.appState === 'INTRO' && (
                 <div className="text-xs text-amber-200 bg-amber-950/80 p-3 rounded border border-amber-900 flex items-start gap-2">
                   <Info className="w-4 h-4 mt-0.5 shrink-0" />
                   মুকুটটি বাতাসে রয়েছে — M₁ পরিমাপ করো।
                 </div>
               )}
            </div>

            <div className="order-4 lg:order-1 mt-6 lg:mt-0">
               <h3 className='text-sm text-slate-400 uppercase font-bold mb-4 tracking-wider font-sans'>পরিমাপ (Live Stats)</h3>
            </div>

            <div className='space-y-4 flex-1 order-5 lg:order-2'>
              <div className={`p-4 rounded-xl border ${store.appState === 'INTRO' ? 'bg-black border-slate-700' : 'bg-black/50 border-slate-800/50 opacity-80'}`}>
                <p className='text-xs text-slate-500 mb-1 font-sans'>বাতাসে ভর (M₁)</p>
                <div className='flex items-baseline gap-2'>
                  <span className={`text-3xl font-mono ${store.appState === 'INTRO' ? 'text-amber-500' : 'text-slate-300'}`}>
                    {store.crownState === 'AIR_MEASUREMENT' || store.measuredAirMass ? (store.measuredAirMass || 10.0).toFixed(2) : '--.--'}
                  </span>
                  <span className='text-sm text-slate-400 font-sans'>kg</span>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border ${store.appState === 'EXPERIMENT' ? 'bg-black border-slate-700' : 'bg-black/50 border-slate-800/50 opacity-80'}`}>
                <p className='text-xs text-slate-500 mb-1 font-sans'>পানিতে আপাত ভর (M₂)</p>
                <div className='flex items-baseline gap-2'>
                  <span className={`text-3xl font-mono ${store.appState === 'EXPERIMENT' && store.crownState === 'FULL_SUBMERGENCE' ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {store.measuredWaterMass ? store.measuredWaterMass.toFixed(2) : (store.crownState === 'FULL_SUBMERGENCE' ? '9.40' : (store.crownState === 'PARTIAL_SUBMERGENCE' ? '9.70' : '--.--'))}
                  </span>
                  <span className='text-sm text-slate-400 font-sans'>kg</span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-2'>
                <div className={`bg-slate-800/40 p-2 rounded-lg text-center ${store.appState === 'CALCULATION' || store.appState === 'RESULT' || store.appState.includes('DISCOVERY') ? 'ring-1 ring-slate-700' : ''}`}>
                  <p className='text-[10px] text-slate-500 uppercase font-sans'>আয়তন (V)</p>
                  <p className='text-sm font-mono text-slate-300 mt-1'>
                    {((store.appState === 'CALCULATION' && store.calcStep >= 1) || store.appState === 'RESULT' || store.appState.includes('DISCOVERY')) ? (store.activeCrown === 'GOLD' ? bn(0.000518) + ' m³' : bn(0.0006) + ' m³') : '--'}
                  </p>
                </div>
                <div className={`bg-slate-800/40 p-2 rounded-lg text-center ${store.appState === 'CALCULATION' || store.appState === 'RESULT' || store.appState.includes('DISCOVERY') ? 'ring-1 ring-slate-700' : ''}`}>
                  <p className='text-[10px] text-slate-500 uppercase font-sans'>ঘনত্ব (ρ)</p>
                  <p className='text-sm font-mono text-slate-300 mt-1'>
                    {((store.appState === 'CALCULATION' && store.calcStep >= 2) || store.appState === 'RESULT' || store.appState.includes('DISCOVERY')) ? (store.activeCrown === 'GOLD' ? bn(19300) + ' kg/m³' : bn(16667) + ' kg/m³') : '--'}
                  </p>
                </div>
              </div>

              {/* Dynamic Calculation / Discovery Content */}
              <AnimatePresence mode="wait">
                {(store.appState === 'CALCULATION' || store.appState === 'RESULT') && store.showFormulas && !store.appState.includes('DISCOVERY') && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 mt-4 w-full font-serif pb-6">
                    
                    {/* Step 0: Mass Loss */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
                       <h4 className="text-amber-400 font-bold mb-3 font-sans text-sm border-b border-slate-800 pb-2">ধাপ ৩: মুকুটের ঘনত্ব নির্ণয়</h4>
                       <p className="text-xs text-slate-300 mb-2">পানিতে মুকুটের আপাত ভর হ্রাস</p>
                       <div className="bg-black/50 p-3 rounded font-mono text-sm text-slate-300 space-y-1 border border-slate-800 mb-3 overflow-x-auto whitespace-nowrap">
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>M₁ − M₂</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>= {bn(10)} − {bn(9.4)}</motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-amber-400 font-bold">= {bn(0.6)} kg</motion.div>
                       </div>
                       <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                          আর্কিমিডিসের সূত্র অনুযায়ী, মুকুটের আপাত ভর হ্রাস = অপসারিত পানির ভর।
                       </motion.p>
                       {store.calcStep === 0 && (
                          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} onClick={() => store.setCalcStep(1)} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded transition-colors font-sans border border-slate-700">
                             আয়তন নির্ণয়
                          </motion.button>
                       )}
                    </motion.div>
        
                    {/* Step 1: Volume */}
                    {store.calcStep >= 1 && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
                          <p className="text-xs text-slate-300 mb-2">পানির ঘনত্ব, ρ_water = {bn(1000)} kg/m³</p>
                          <div className="bg-black/50 p-3 rounded font-mono text-sm text-slate-300 space-y-1 border border-slate-800 mb-3 overflow-x-auto whitespace-nowrap">
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>V = (M₁ − M₂) / ρ_water</motion.div>
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>V = {bn(0.6)} / {bn(1000)}</motion.div>
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-cyan-400 font-bold">V = {bn(0.0006)} m³</motion.div>
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-cyan-400 font-bold">V = {bn(600)} cm³</motion.div>
                          </div>
                          {store.calcStep === 1 && (
                             <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} onClick={() => store.setCalcStep(2)} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded transition-colors font-sans border border-slate-700">
                                ঘনত্ব নির্ণয়
                             </motion.button>
                          )}
                       </motion.div>
                    )}
        
                    {/* Step 2: Density */}
                    {store.calcStep >= 2 && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
                          <p className="text-xs text-slate-300 mb-2">এখন মুকুটের ঘনত্ব নির্ণয় করি।</p>
                          <div className="bg-black/50 p-3 rounded font-mono text-sm text-slate-300 space-y-1 border border-slate-800 mb-3 overflow-x-auto whitespace-nowrap">
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>ρ = M₁ / V</motion.div>
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>ρ_crown = {bn(10)} / {bn(0.0006)}</motion.div>
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-amber-400 font-bold">ρ_crown ≈ {bn(16667)} kg/m³</motion.div>
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-amber-400 font-bold">≈ {bn(16.67)} g/cm³</motion.div>
                          </div>
                          {store.calcStep === 2 && (
                             <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} onClick={() => store.setCalcStep(3)} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded transition-colors font-sans border border-slate-700">
                                খাঁটি সোনার সঙ্গে তুলনা
                             </motion.button>
                          )}
                       </motion.div>
                    )}
        
                    {/* Step 3 & 4 & 5: Prediction and Comparison */}
                    {store.calcStep >= 3 && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-indigo-950/30 border border-indigo-900/50 p-4 rounded-xl shadow-lg">
                          <h4 className="text-indigo-400 font-bold mb-4 font-sans text-sm border-b border-indigo-900/50 pb-2">ধাপ ৪: খাঁটি সোনার ঘনত্বের সঙ্গে তুলনা</h4>
                          
                          {store.calcStep === 3 ? (
                             <div className="text-center py-2">
                                <p className="text-sm text-slate-200 mb-4 font-bold leading-relaxed">তোমার মতে মুকুটটি কি খাঁটি সোনা?</p>
                                <div className="flex gap-2 justify-center font-sans text-xs">
                                   <button onClick={() => store.setCalcStep(4)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded border border-slate-700 transition-colors">হ্যাঁ</button>
                                   <button onClick={() => store.setCalcStep(4)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded border border-slate-700 transition-colors">না</button>
                                   <button onClick={() => store.setCalcStep(4)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded border border-slate-700 transition-colors">নিশ্চিত নই</button>
                                </div>
                             </div>
                          ) : (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="mb-4">
                                   <div className="flex justify-between items-end mb-1">
                                      <span className="text-[11px] text-slate-400">মুকুটের ঘনত্ব</span>
                                      <span className="text-[11px] font-mono text-amber-400">{bn(16667)} kg/m³</span>
                                   </div>
                                   <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                                      <motion.div initial={{ width: 0 }} animate={{ width: '86.3%' }} transition={{ duration: 1, ease: "easeOut" }} className="bg-amber-500 h-full rounded-full"></motion.div>
                                   </div>
                                </div>
                                <div className="mb-5">
                                   <div className="flex justify-between items-end mb-1">
                                      <span className="text-[11px] text-slate-400">খাঁটি সোনা</span>
                                      <span className="text-[11px] font-mono text-yellow-400">{bn(19300)} kg/m³</span>
                                   </div>
                                   <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, ease: "easeOut" }} className="bg-yellow-400 h-full rounded-full"></motion.div>
                                   </div>
                                </div>
                                
                                <div className="text-center font-mono text-sm text-slate-300 mb-3 bg-black/40 py-2 rounded border border-slate-800">
                                   {bn(16667)} kg/m³ &lt; {bn(19300)} kg/m³
                                </div>
                                <p className="text-xs text-slate-300 text-center mb-5 leading-relaxed">মুকুটের ঘনত্ব খাঁটি সোনার ঘনত্বের চেয়ে কম।</p>
                                
                                {store.calcStep === 4 && (
                                   <button onClick={() => store.setCalcStep(5)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 rounded transition-colors font-sans">
                                      সিদ্ধান্ত দেখুন
                                   </button>
                                )}
                                
                                {store.calcStep >= 5 && (
                                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                                      <div className="bg-red-950/40 border border-red-900/40 p-4 rounded-lg mb-5 shadow-inner">
                                         <p className="text-red-400 font-bold text-sm mb-2">সিদ্ধান্ত: মুকুটটি খাঁটি সোনা দিয়ে তৈরি নয়।</p>
                                         <p className="text-[11px] text-slate-300 leading-relaxed">মুকুটের ঘনত্ব খাঁটি সোনার ঘনত্বের চেয়ে কম হওয়ায় এতে সোনার চেয়ে কম ঘনত্বের কোনো ধাতু মেশানো হয়েছে বলে ধারণা করা যায়।</p>
                                      </div>
        
                                      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-lg">
                                         <p className="text-emerald-400 font-bold text-sm mb-3 font-sans border-b border-slate-800 pb-2">যা শিখলে:</p>
                                         <ul className="text-[11px] text-slate-300 space-y-2 list-disc list-outside ml-4 leading-relaxed">
                                            <li>পানিতে বস্তুর আপাত ভর হ্রাস থেকে তার আয়তন নির্ণয় করা যায়।</li>
                                            <li>ঘনত্ব = ভর / আয়তন।</li>
                                            <li>একই ভরের বিভিন্ন পদার্থের আয়তন ভিন্ন হতে পারে।</li>
                                            <li>কম ঘনত্বের পদার্থ একই ভরে বেশি আয়তন দখল করে।</li>
                                            <li>খাঁটি সোনার ঘনত্ব {bn(19300)} kg/m³।</li>
                                            <li>পরীক্ষায় মুকুটের ঘনত্ব কম পাওয়ায় এটি খাঁটি সোনা নয় বলে শনাক্ত করা যায়।</li>
                                         </ul>
                                      </div>
        
                                      <button 
                                        onClick={() => { store.setAppState('DISCOVERY_INTRO'); store.setActiveCrown('GOLD'); store.setCalcStep(0); }}
                                        className='w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl mt-6 transition-colors font-sans shadow-lg'
                                      >
                                        কারণ অনুসন্ধান (Discovery)
                                      </button>
                                   </motion.div>
                                )}
                             </motion.div>
                          )}
                       </motion.div>
                    )}
                  </motion.div>
                )}

                {store.appState.includes('DISCOVERY') && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-indigo-950/30 border border-indigo-900/50 p-4 rounded-xl mt-4 font-serif">
                    <p className="text-xs font-bold text-indigo-300 mb-3">সমান ভর, কিন্তু আয়তন?</p>
                    <div className="flex gap-2 text-xs mb-2">
                      <button onClick={() => store.setActiveCrown('GOLD')} className={`flex-1 py-1.5 rounded transition-colors ${store.activeCrown === 'GOLD' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>খাঁটি সোনা</button>
                      <button onClick={() => store.setActiveCrown('FAKE')} className={`flex-1 py-1.5 rounded transition-colors ${store.activeCrown === 'FAKE' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>ভেজাল</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Button for Discovery mode */}
            {store.appState === 'DISCOVERY_INTRO' && (
              <div className="order-5 lg:order-5 mt-4">
                <button 
                  onClick={() => { store.setAppState('DISCOVERY_EXPERIMENT'); store.setActiveCrown('GOLD'); store.setCrownState('IDLE'); }}
                  className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors font-sans'
                >
                  খাঁটি সোনা দিয়ে পরীক্ষা করো
                </button>
              </div>
            )}
          </div>
        </div>
      </main>


      <footer className='h-16 mt-4 flex items-center justify-between px-6 bg-slate-900/80 border border-slate-800 rounded-2xl'>
        <div className='flex gap-8'>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-slate-500 font-sans'>অবস্থা:</span>
            <span className='text-xs font-bold text-green-400 tracking-wide bg-green-400/10 px-2 py-0.5 rounded font-sans'>{store.appState}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-slate-500 font-sans'>পানির ঘনত্ব:</span>
            <span className='text-xs font-bold text-slate-300 font-sans'>১০০০ kg/m³</span>
          </div>
        </div>
        <div className='flex gap-4'>
          {store.appState !== 'INTRO' && (
             <button onClick={() => store.resetExperiment()} className='text-xs font-bold text-slate-400 hover:text-white uppercase tracking-tighter transition-colors font-sans'>প্রথম ধাপ</button>
          )}
        </div>
      </footer>
    </>
  );
}
