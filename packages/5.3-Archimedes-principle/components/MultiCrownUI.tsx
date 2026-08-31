"use client";

import { useExperimentStore } from "@/store/experimentStore";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Info, RefreshCcw } from "lucide-react";
import React from "react";

const bn = (num: number | string) => {
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/[0-9]/g, (w) => digits[+w]);
};

function InstructionPanel() {
  const store = useExperimentStore();
  const [expanded, setExpanded] = React.useState(false);

  const allMeasured = ['A', 'B', 'C'].every(
    (c) => store.multiData[c as 'A' | 'B' | 'C'].m1 !== null && store.multiData[c as 'A' | 'B' | 'C'].m2 !== null
  );
  
  const isCalculated = ['A', 'B', 'C'].every(
    (c) => store.multiData[c as 'A' | 'B' | 'C'].calcDensity !== ''
  );

  const isIdentified = ['A', 'B', 'C'].every(
    (c) => store.multiData[c as 'A' | 'B' | 'C'].guess !== ''
  );

  let feedback = "";
  if (store.appState === 'MULTI_INTRO' || store.appState === 'MULTI_EXPERIMENT') {
    if (!allMeasured) {
      const act = store.multiActiveCrown;
      const data = store.multiData[act];
      if (data.m1 === null) {
         feedback = `এখন মুকুট ${act}-এর বাতাসে ভর M₁ মাপো।`;
      } else if (data.m2 === null) {
         if (store.crownState === 'AIR_MEASUREMENT') {
            feedback = `এখন মুকুটটিকে পানিতে নামানোর জন্য ↓ নিচে বোতাম ব্যবহার করো।`;
         } else if (store.crownState === 'PARTIAL_SUBMERGENCE') {
            feedback = `মুকুটটি সম্পূর্ণ নিমজ্জিত হয়নি। আরও নিচে নামাও।`;
         } else if (store.crownState === 'FULL_SUBMERGENCE') {
            feedback = `✓ মুকুট সম্পূর্ণ নিমজ্জিত। এখন M₂-এর পাঠ নাও।`;
         } else if (store.crownState === 'INVALID_CONTACT') {
            feedback = `⚠️ মুকুট পাত্রের তলা স্পর্শ করেছে! একটু উপরে তোলো।`;
         } else {
            feedback = `মুকুটটিকে পানিতে নামাও।`;
         }
      } else {
         feedback = `মুকুট ${act}-এর পরিমাপ সম্পন্ন। অন্য মুকুট নির্বাচন করো।`;
      }
    } else {
      feedback = `✓ তিনটি মুকুটের পরিমাপ সম্পন্ন। এখন ঘনত্ব নির্ণয় করো।`;
    }
  } else if (store.appState === 'MULTI_CALCULATION') {
    if (!isCalculated) {
      feedback = `এখন প্রতিটি মুকুটের ঘনত্ব নির্ণয় করো (ρ = M₁ / V)।`;
    } else if (!isIdentified) {
      feedback = `এখন ঘনত্বের সঙ্গে খাঁটি সোনা ও খাঁটি রূপার ঘনত্ব তুলনা করে মুকুটগুলোর পরিচয় নির্ণয় করো।`;
    } else {
      feedback = `✓ সব তথ্য পূরণ হয়েছে। 'উত্তর জমা দাও' বোতামে চাপ দাও।`;
    }
  } else if (store.appState === 'MULTI_RESULT') {
    feedback = `ফলাফল মিলিয়ে দেখো।`;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-full lg:overflow-hidden">
      <div className="lg:hidden p-4 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
         <h2 className="text-amber-400 font-bold font-sans">পরীক্ষার নির্দেশনা</h2>
         <span className="text-slate-300 font-bold text-xs bg-slate-700 px-3 py-1 rounded-full border border-slate-600">
           {expanded ? 'লুকাও' : '☰ নির্দেশনা দেখাও'}
         </span>
      </div>
      
      <div className={`flex-1 overflow-y-auto p-5 ${expanded ? 'block' : 'hidden lg:block'}`}>
        
        <div className="mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
           <h3 className="text-xs text-slate-400 uppercase font-bold mb-3 tracking-wider font-sans">পরীক্ষার অগ্রগতি</h3>
           <ul className="space-y-2 text-sm font-sans">
             {['A', 'B', 'C'].map(c => {
                const done = store.multiData[c as 'A'|'B'|'C'].m1 !== null && store.multiData[c as 'A'|'B'|'C'].m2 !== null;
                return (
                  <li key={c} className={`flex items-center gap-2 ${done ? "text-emerald-400 font-bold" : "text-slate-500"}`}>
                    {done ? '✓' : '○'} মুকুট {c}-এর পরিমাপ {done ? 'সম্পন্ন' : ''}
                  </li>
                );
             })}
             <li className={`flex items-center gap-2 ${isCalculated ? "text-emerald-400 font-bold" : "text-slate-500"}`}>
               {isCalculated ? "✓" : "○"} ঘনত্ব নির্ণয় {isCalculated ? 'সম্পন্ন' : ''}
             </li>
             <li className={`flex items-center gap-2 ${store.appState === 'MULTI_RESULT' ? "text-emerald-400 font-bold" : "text-slate-500"}`}>
               {store.appState === 'MULTI_RESULT' ? "✓" : "○"} মুকুট শনাক্তকরণ {store.appState === 'MULTI_RESULT' ? 'সম্পন্ন' : ''}
             </li>
           </ul>
        </div>

        <div className="mb-8 bg-indigo-950/40 p-4 rounded-xl border border-indigo-900/50">
           <h3 className="text-[10px] text-indigo-400 uppercase font-bold mb-2 tracking-wider font-sans">বর্তমান কাজ</h3>
           <p className="text-sm font-bold text-indigo-200">{feedback || 'ধাপ ১ অনুসরণ করে একটি মুকুট নির্বাচন করো।'}</p>
        </div>

        <h2 className="text-xl text-amber-400 font-bold mb-4 font-sans">৩টি মুকুট শনাক্তকরণ ল্যাব</h2>
        <p className="text-sm text-slate-300 mb-8 font-serif leading-relaxed">
          তিনটি দেখতে একই মুকুটের মধ্যে একটি খাঁটি সোনা, একটি নকল/ভেজাল সোনা এবং একটি খাঁটি রূপার তৈরি। পরীক্ষার মাধ্যমে প্রতিটি মুকুটের ঘনত্ব নির্ণয় করে তাদের প্রকৃত পরিচয় শনাক্ত করো।
        </p>

        <h3 className="text-lg text-slate-200 font-bold mb-4 font-sans border-b border-slate-700 pb-2">পরীক্ষার লক্ষ্য</h3>
        <ul className="list-disc list-outside ml-5 text-sm text-slate-300 space-y-3 mb-8 font-serif">
          <li>প্রতিটি মুকুটের বাতাসে ভর নির্ণয় করা।</li>
          <li>পানিতে সম্পূর্ণ নিমজ্জিত অবস্থায় আপাত ভর নির্ণয় করা।</li>
          <li>অপসারিত পানির ভর থেকে মুকুটের আয়তন নির্ণয় করা।</li>
          <li>মুকুটের ঘনত্ব নির্ণয় করা।</li>
          <li>খাঁটি সোনা ও খাঁটি রূপার ঘনত্বের সঙ্গে তুলনা করা।</li>
          <li>প্রতিটি মুকুটের প্রকৃত পরিচয় শনাক্ত করা।</li>
        </ul>

        <h3 className="text-lg text-slate-200 font-bold mb-4 font-sans border-b border-slate-700 pb-2">নির্দেশনা</h3>
        
        <div className="space-y-6 font-serif">
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ১ — মুকুট নির্বাচন করো</h4>
            <p className="text-sm text-slate-300 leading-relaxed">প্রথমে মুকুট A, B অথবা C নির্বাচন করো। একটি মুকুট নির্বাচন করলে সেটি স্প্রিং ব্যালেন্সের সঙ্গে যুক্ত হবে।</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ২ — বাতাসে ভর মাপো</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">↑ উপরে এবং ↓ নিচে বোতাম ব্যবহার করে মুকুটটিকে পানির উপরে রাখো। স্প্রিং ব্যালেন্সের পাঠ স্থির হলে বাতাসে মুকুটের ভর M₁ নোট করো।</p>
            <div className="bg-black/40 text-center py-2 rounded text-indigo-300 font-mono text-sm border border-slate-700">বাতাসে ভর = M₁</div>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ৩ — মুকুট পানিতে নামাও</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-2">↓ নিচে বোতাম ব্যবহার করে মুকুটটিকে ধীরে ধীরে পানিতে নামাও।</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">মুকুটটি সম্পূর্ণ পানিতে নিমজ্জিত করতে হবে।</p>
            <div className="bg-red-950/30 text-red-400 p-3 rounded border border-red-900/50 text-xs flex gap-2 items-start">
               <AlertCircle className="w-4 h-4 shrink-0 mt-0.5"/>
               <span>মুকুট যেন পাত্রের তলা বা দেয়াল স্পর্শ না করে।</span>
            </div>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ৪ — পানিতে আপাত ভর মাপো</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">মুকুট সম্পূর্ণ নিমজ্জিত হলে স্প্রিং ব্যালেন্সের নতুন পাঠ M₂ নোট করো।</p>
            <div className="bg-black/40 text-center py-2 rounded text-cyan-300 font-mono text-sm border border-slate-700">পানিতে আপাত ভর = M₂</div>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ৫ — মান সংরক্ষণ করো</h4>
            <p className="text-sm text-slate-300 leading-relaxed">বাতাসে ভর M₁ এবং পানিতে আপাত ভর M₂ সংরক্ষণ করো। এরপর পরবর্তী মুকুট নির্বাচন করো।</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ৬ — তিনটি মুকুটের পরীক্ষা সম্পন্ন করো</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-2">একইভাবে মুকুট A, B এবং C—তিনটিরই M₁ ও M₂-এর মান সংগ্রহ করো।</p>
            <p className="text-sm text-slate-400 italic">তিনটি মুকুটের পরিমাপ সম্পন্ন না হওয়া পর্যন্ত ঘনত্ব নির্ণয়ের ধাপে যেও না।</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ৭ — ভর হ্রাস নির্ণয় করো</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">প্রতিটি মুকুটের জন্য বাতাসে ভর ও পানিতে আপাত ভরের পার্থক্য নির্ণয় করো।</p>
            <div className="bg-black/40 text-center py-2 rounded text-slate-300 font-mono text-sm border border-slate-700 mb-3">M₁ − M₂</div>
            <p className="text-sm text-slate-400 italic">এই ভর হ্রাসই অপসারিত পানির ভর।</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ৮ — মুকুটের আয়তন নির্ণয় করো</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">পানির ঘনত্ব ব্যবহার করে মুকুটের আয়তন নির্ণয় করো।</p>
            <div className="bg-black/40 text-center py-3 rounded text-slate-300 font-mono text-sm border border-slate-700 space-y-1">
              <div>V = (M₁ − M₂) / ρwater</div>
              <div className="text-xs text-slate-500 mt-2">ρwater = {bn(1000)} kg/m³</div>
            </div>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ৯ — মুকুটের ঘনত্ব নির্ণয় করো</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">মুকুটের বাতাসে প্রকৃত ভরকে তার আয়তন দিয়ে ভাগ করে ঘনত্ব নির্ণয় করো।</p>
            <div className="bg-black/40 text-center py-2 rounded text-slate-300 font-mono text-sm border border-slate-700">ρ = M₁ / V</div>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ১০ — পরিচিত ঘনত্বের সঙ্গে তুলনা করো</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">এখন তোমার হিসাব করা ঘনত্বের সঙ্গে খাঁটি সোনা ও খাঁটি রূপার ঘনত্ব তুলনা করো।</p>
            
            <div className="flex gap-4 justify-center mb-4 text-center">
              <div className="bg-black/40 border border-yellow-900/50 rounded p-2 flex-1">
                <p className="text-[10px] text-slate-400 mb-1">খাঁটি সোনা</p>
                <p className="text-sm text-yellow-500 font-mono">{bn(19300)} kg/m³</p>
              </div>
              <div className="bg-black/40 border border-slate-700 rounded p-2 flex-1">
                <p className="text-[10px] text-slate-400 mb-1">খাঁটি রূপা</p>
                <p className="text-sm text-slate-300 font-mono">{bn(10500)} kg/m³</p>
              </div>
            </div>
            
            <p className="text-[11px] text-amber-500 bg-amber-950/20 p-2 rounded border border-amber-900/30 text-center">নকল/ভেজাল সোনার ঘনত্ব খাঁটি সোনার চেয়ে কম হবে。</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ১১ — মুকুট শনাক্ত করো</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">ঘনত্বের তুলনার ভিত্তিতে মুকুট A, B এবং C-এর প্রকৃত পরিচয় নির্বাচন করো।</p>
            <div className="flex flex-wrap justify-center gap-2 text-[10px] text-slate-300 border border-slate-700 rounded-lg p-2 bg-black/30">
              <span className="bg-slate-800 px-2 py-1 rounded">খাঁটি সোনা</span>
              <span className="bg-slate-800 px-2 py-1 rounded">নকল/ভেজাল সোনা</span>
              <span className="bg-slate-800 px-2 py-1 rounded">খাঁটি রূপা</span>
            </div>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            <h4 className="text-amber-400 font-bold font-sans text-sm mb-2">STEP ১২ — উত্তর জমা দাও</h4>
            <p className="text-sm text-slate-300 leading-relaxed">তোমার উত্তর জমা দাও এবং প্রকৃত ফলাফলের সঙ্গে তোমার উত্তর মিলিয়ে দেখো।</p>
          </div>
        </div>

        <div className="mt-8 bg-amber-950/20 p-5 rounded-xl border border-amber-900/50">
           <h3 className="text-amber-500 font-bold mb-4 font-sans flex items-center gap-2 border-b border-amber-900/50 pb-2">
             <AlertCircle className="w-5 h-5"/>
             ⚠️ গুরুত্বপূর্ণ
           </h3>
           <ul className="list-disc list-outside ml-5 text-[13px] text-slate-300 space-y-3 font-serif leading-relaxed">
             <li>মুকুট সম্পূর্ণ নিমজ্জিত না হলে M₂-এর পাঠ গ্রহণ করবে না।</li>
             <li>মুকুট পাত্রের তলা স্পর্শ করলে পরিমাপ সঠিক হবে না।</li>
             <li>মুকুট পাত্রের দেয়াল স্পর্শ করলে পরিমাপ সঠিক হবে না।</li>
             <li>প্রতিটি মুকুটের জন্য আলাদাভাবে M₁ ও M₂ সংগ্রহ করতে হবে।</li>
             <li>ঘনত্ব নির্ণয়ের আগে তিনটি মুকুটের পরিমাপ সম্পন্ন করো।</li>
             <li>শুধু চেহারা দেখে মুকুটের ধাতু শনাক্ত করার চেষ্টা করবে না।</li>
             <li>ঘনত্বের তুলনার মাধ্যমেই চূড়ান্ত পরিচয় নির্ণয় করতে হবে।</li>
           </ul>
        </div>

        <div className="mt-8 bg-slate-800/50 p-5 rounded-xl border border-slate-700">
           <h3 className="text-slate-200 font-bold mb-4 font-sans border-b border-slate-700 pb-2">প্রয়োজনীয় সূত্র</h3>
           <ol className="list-decimal list-outside ml-5 text-sm text-indigo-300 space-y-3 font-mono">
             <li>M₁ − M₂ = অপসারিত পানির ভর</li>
             <li>V = (M₁ − M₂) / ρwater</li>
             <li>ρ = M₁ / V</li>
             <li><span className="text-cyan-400">ρwater = {bn(1000)} kg/m³</span></li>
             <li><span className="text-yellow-500">ρgold = {bn(19300)} kg/m³</span></li>
             <li><span className="text-slate-300">ρsilver = {bn(10500)} kg/m³</span></li>
           </ol>
        </div>

      </div>
    </div>
  );
}

export function MultiCrownUI({ children }: { children: React.ReactNode }) {
  const store = useExperimentStore();

  const handleAirMeasure = () => {
    const masses = { A: 9.65, B: 8.00, C: 5.25 };
    store.setMultiData(store.multiActiveCrown, { m1: masses[store.multiActiveCrown] });
    checkAllMeasured();
  };

  const handleWaterMeasure = () => {
    const masses = { A: 9.15, B: 7.50, C: 4.75 };
    store.setMultiData(store.multiActiveCrown, { m2: masses[store.multiActiveCrown] });
    checkAllMeasured();
  };

  const checkAllMeasured = () => {
    // If we have all 6 measurements, wait and move to multi calc? Or manually?
    // Let's add a manual button that appears when all 6 are done.
  };

  const allMeasured = ['A', 'B', 'C'].every(
    c => store.multiData[c as 'A' | 'B' | 'C'].m1 !== null && store.multiData[c as 'A' | 'B' | 'C'].m2 !== null
  );

  const m1Active = store.multiData[store.multiActiveCrown].m1 === null && store.crownState === 'AIR_MEASUREMENT';
  const m2Active = store.multiData[store.multiActiveCrown].m1 !== null && store.multiData[store.multiActiveCrown].m2 === null && store.crownState === 'FULL_SUBMERGENCE';

  return (
    <>
      <header className='flex justify-between items-center mb-4 px-2'>
        <div className='flex items-center gap-4'>
          <div className='bg-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-slate-900 text-xl'>?</div>
          <div>
            <h1 className='text-2xl font-bold text-white font-sans'>৩টি মুকুট শনাক্তকরণ ল্যাব</h1>
            <p className='text-xs text-slate-400 uppercase tracking-widest font-serif'>ভৌত বিজ্ঞান ল্যাবরেটরি • নবম-দশম শ্রেণী</p>
          </div>
        </div>
        <div className='flex gap-2 pointer-events-auto'>
          <button onClick={() => { store.resetExperiment(); store.setExperimentMode('MULTI'); store.setAppState('MULTI_INTRO'); }} className='bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-sm border border-slate-700 text-red-400 flex items-center gap-2'>
            <RefreshCcw className="w-4 h-4" /> পুনরায় পরীক্ষা
          </button>
        </div>
      </header>

      <main className='flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 h-full min-h-0 overflow-y-auto lg:overflow-hidden pb-8 lg:pb-0'>
        {/* Left Panel - Instructions */}
        <div className='lg:col-span-3 order-2 lg:order-1 flex flex-col gap-4 lg:overflow-y-auto'>
          <InstructionPanel />
        </div>

        {/* Center Panel - 3D Scene */}
        <div className='lg:col-span-5 order-1 lg:order-2 bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col shadow-2xl min-h-[45vh] lg:min-h-0'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)] opacity-50 pointer-events-none z-0'></div>
          <div className="absolute inset-0 z-10">
            {children}
          </div>
          
          <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 flex items-center gap-3 z-20 pointer-events-none'>
            <div className={`w-3 h-3 rounded-full ${store.crownState === 'FULL_SUBMERGENCE' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
            <span className='text-xs font-mono text-slate-300'>
              {store.crownState.replace('_', ' ')}
            </span>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 pointer-events-auto">
             {/* Up/Down Controls */}
             <div className='bg-slate-800/80 backdrop-blur-sm p-3 rounded-xl border border-slate-700 font-sans flex gap-4'>
                <button 
                  onPointerDown={() => store.setIsMoving('UP')}
                  onPointerUp={() => store.setIsMoving(null)}
                  onPointerLeave={() => store.setIsMoving(null)}
                  className='bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 select-none shadow-lg'
                >
                  ↑ উপরে
                </button>
                <button 
                  onPointerDown={() => store.setIsMoving('DOWN')}
                  onPointerUp={() => store.setIsMoving(null)}
                  onPointerLeave={() => store.setIsMoving(null)}
                  className='bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 select-none shadow-lg'
                >
                  ↓ নিচে
                </button>
              </div>
          </div>
        </div>

        {/* Right Panel - Data & Calculations */}
        <div className='lg:col-span-4 order-3 lg:order-3 flex flex-col gap-4 lg:overflow-y-auto pb-8 lg:pb-0'>
          
          {/* ALWAYS VISIBLE MEASUREMENT TABLE */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col">
             <h3 className={`text-sm uppercase font-bold mb-4 tracking-wider font-sans border-b border-slate-800 pb-2 ${allMeasured ? 'text-emerald-400' : 'text-slate-400'}`}>
               {allMeasured ? '✓ সব পরিমাপ সম্পন্ন' : 'পরিমাপের ফলাফল'}
             </h3>
             <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 font-sans text-xs">
               <table className="w-full text-center">
                 <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-800">
                   <tr>
                     <th className="py-2 font-normal">মুকুট</th>
                     <th className="py-2 font-normal">বাতাসে ভর M₁</th>
                     <th className="py-2 font-normal">পানিতে আপাত ভর M₂</th>
                     <th className="py-2 font-normal">পানির ঘনত্ব</th>
                   </tr>
                 </thead>
                 <tbody className="text-slate-300">
                   {['A', 'B', 'C'].map((c) => (
                     <tr key={c} className="border-b border-slate-800/50 last:border-0">
                       <td className="py-2 font-bold">{c}</td>
                       <td className="py-2">{store.multiData[c as 'A' | 'B' | 'C'].m1 !== null ? `${bn(store.multiData[c as 'A' | 'B' | 'C'].m1!)} kg` : '-'}</td>
                       <td className="py-2">{store.multiData[c as 'A' | 'B' | 'C'].m2 !== null ? `${bn(store.multiData[c as 'A' | 'B' | 'C'].m2!)} kg` : '-'}</td>
                       <td className="py-2">{bn(1000)} kg/m³</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

          {(store.appState === 'MULTI_INTRO' || store.appState === 'MULTI_EXPERIMENT') && (
             <div className='bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col'>
                <h3 className='text-sm text-slate-400 uppercase font-bold mb-4 tracking-wider font-sans border-b border-slate-800 pb-2'>মুকুট নির্বাচন ও পরিমাপ</h3>
                
                <div className="flex gap-2 mb-6">
                  {['A', 'B', 'C'].map((crown) => {
                    const isDone = store.multiData[crown as 'A' | 'B' | 'C'].m1 !== null && store.multiData[crown as 'A' | 'B' | 'C'].m2 !== null;
                    return (
                      <button
                        key={crown}
                        onClick={() => store.setMultiActiveCrown(crown as 'A' | 'B' | 'C')}
                        className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors flex flex-col items-center justify-center gap-1 ${store.multiActiveCrown === crown ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'}`}
                      >
                        <span>মুকুট {crown}</span>
                        {isDone && <span className="text-[10px] text-emerald-400">✓ সম্পন্ন</span>}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-8 mb-6 mt-4">
                   <div className="relative">
                     {m1Active && (
                       <div className="absolute -top-6 left-0 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                         ← প্রথমে এই বোতামটি চাপো
                       </div>
                     )}
                     <div className={`rounded-xl transition-all duration-700 ${m1Active ? 'p-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse' : 'p-0'}`}>
                       <button 
                         disabled={store.crownState !== 'AIR_MEASUREMENT' || store.multiData[store.multiActiveCrown].m1 !== null}
                         onClick={handleAirMeasure}
                         className={`w-full hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border text-slate-200 py-3 rounded-lg font-bold text-sm transition-colors flex justify-between px-4 ${m1Active ? 'bg-slate-900 border-transparent' : 'bg-slate-800 border-slate-700'}`}
                       >
                         <span>বাতাসে ভর (M₁) পরিমাপ করো</span>
                         {store.multiData[store.multiActiveCrown].m1 !== null && <span className="text-green-400">✓ পরিমাপ সম্পন্ন</span>}
                       </button>
                     </div>
                   </div>

                   <div className="relative">
                     {m2Active && (
                       <div className="absolute -top-6 left-0 text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                         ← ধাপ ২: এখন M₂-এর পাঠ নাও
                       </div>
                     )}
                     <div className={`rounded-xl transition-all duration-700 ${m2Active ? 'p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse' : 'p-0'}`}>
                       <button 
                         disabled={store.crownState !== 'FULL_SUBMERGENCE' || store.multiData[store.multiActiveCrown].m2 !== null}
                         onClick={handleWaterMeasure}
                         className={`w-full hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border text-slate-200 py-3 rounded-lg font-bold text-sm transition-colors flex justify-between px-4 ${m2Active ? 'bg-slate-900 border-transparent' : 'bg-slate-800 border-slate-700'}`}
                       >
                         <span>পানিতে আপাত ভর (M₂) পরিমাপ করো</span>
                         {store.multiData[store.multiActiveCrown].m2 !== null && <span className="text-green-400">✓ পরিমাপ সম্পন্ন</span>}
                       </button>
                     </div>
                   </div>
                </div>

                {allMeasured && (
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    onClick={() => store.setAppState('MULTI_CALCULATION')}
                    className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
                  >
                    ঘনত্ব নির্ণয় করো
                  </motion.button>
                )}
             </div>
          )}

          {(store.appState === 'MULTI_CALCULATION' || store.appState === 'MULTI_RESULT') && (
            <div className='bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col'>
               <h3 className='text-sm text-slate-400 uppercase font-bold mb-4 tracking-wider font-sans border-b border-slate-800 pb-2'>ঘনত্ব নির্ণয় ও শনাক্তকরণ</h3>

               <div className="space-y-4 mb-6">
                 {['A', 'B', 'C'].map(c => (
                   <div key={c} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                     <label className="text-sm text-slate-300 font-bold">মুকুট {c}-এর ঘনত্ব:</label>
                     <div className="flex items-center gap-2">
                       <input 
                         type="number" 
                         value={store.multiData[c as 'A' | 'B' | 'C'].calcDensity}
                         onChange={(e) => store.setMultiData(c as 'A'|'B'|'C', { calcDensity: e.target.value })}
                         disabled={store.appState === 'MULTI_RESULT'}
                         className="bg-slate-950 border border-slate-700 rounded px-3 py-1 w-24 text-center text-slate-200 outline-none focus:border-indigo-500"
                       />
                       <span className="text-xs text-slate-400">kg/m³</span>
                     </div>
                   </div>
                 ))}
               </div>

               {store.appState !== 'MULTI_RESULT' && (
                 <button onClick={() => store.setShowFormulas(!store.showFormulas)} className="text-indigo-400 text-sm hover:underline mb-4 self-start">
                   {store.showFormulas ? 'সূত্র লুকান' : 'সূত্র দেখাও'}
                 </button>
               )}

               <AnimatePresence>
                 {store.showFormulas && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-900/50 mb-6 font-mono text-sm text-indigo-300 space-y-2 overflow-hidden">
                     <p>V = (M₁ − M₂) / ρ_water</p>
                     <p>ρ = M₁ / V</p>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Comparison and Identification */}
               <div className="bg-black/40 p-4 rounded-xl border border-slate-800 mb-6">
                 <h4 className="text-xs text-slate-400 uppercase mb-3">পরিচিত ধাতুর ঘনত্বের সঙ্গে তুলনা</h4>
                 <div className="flex justify-between items-end mb-4 px-2 border-l-2 border-indigo-500/30 pl-4 h-32 relative text-[10px] text-slate-500">
                    <div className="absolute left-0 bottom-0 w-full h-px bg-slate-800"></div>
                    <div className="absolute left-0 top-0 w-full h-px bg-slate-800"></div>
                    
                    <div className="absolute left-2 top-0 translate-y-[-50%] text-yellow-500 flex items-center gap-2">
                       <div className="w-2 h-0.5 bg-yellow-500"></div> 
                       খাঁটি সোনা ({bn(19300)} kg/m³)
                    </div>
                    
                    <div className="absolute left-2 top-[45%] translate-y-[-50%] text-slate-300 flex items-center gap-2">
                       <div className="w-2 h-0.5 bg-slate-400"></div> 
                       খাঁটি রূপা ({bn(10500)} kg/m³)
                    </div>
                    
                    <div className="absolute left-2 bottom-0 translate-y-[50%] text-slate-600 flex items-center gap-2">
                       <div className="w-2 h-0.5 bg-slate-600"></div> 
                       {bn(0)}
                    </div>

                    {store.appState === 'MULTI_RESULT' && (
                       <>
                         <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="absolute right-4 top-0 translate-y-[-50%] text-amber-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">মুকুট A</motion.div>
                         <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="absolute right-4 top-[17%] translate-y-[-50%] text-amber-600 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">মুকুট B ({bn(16000)})</motion.div>
                         <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="absolute right-4 top-[45%] translate-y-[-50%] text-slate-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">মুকুট C</motion.div>
                       </>
                    )}
                 </div>
               </div>

               <h4 className="text-sm font-bold text-slate-300 mb-3">তিনটি মুকুটের প্রকৃত পরিচয় নির্ণয় করো:</h4>
               <div className="space-y-3 mb-6">
                 {['A', 'B', 'C'].map(c => (
                   <div key={c} className="flex items-center justify-between bg-slate-800/30 p-2 rounded-lg border border-slate-700/50">
                     <span className="text-sm font-bold w-16">মুকুট {c}:</span>
                     <select 
                       value={store.multiData[c as 'A'|'B'|'C'].guess}
                       onChange={(e) => store.setMultiData(c as 'A'|'B'|'C', { guess: e.target.value as any })}
                       disabled={store.appState === 'MULTI_RESULT'}
                       className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm outline-none text-slate-200"
                     >
                       <option value="">নির্বাচন করুন...</option>
                       <option value="GOLD">খাঁটি সোনা</option>
                       <option value="FAKE">নকল সোনা</option>
                       <option value="SILVER">খাঁটি রূপা</option>
                     </select>
                   </div>
                 ))}
               </div>

               {store.appState !== 'MULTI_RESULT' && (
                 <button 
                   disabled={['A', 'B', 'C'].some(c => store.multiData[c as 'A'|'B'|'C'].guess === '' || store.multiData[c as 'A'|'B'|'C'].calcDensity === '')}
                   onClick={() => store.setAppState('MULTI_RESULT')}
                   className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
                 >
                   উত্তর জমা দাও
                 </button>
               )}
            </div>
          )}

          {store.appState === 'MULTI_RESULT' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-6'>
               
               <div>
                  <h3 className='text-amber-400 uppercase font-bold mb-4 font-sans border-b border-slate-800 pb-2'>প্রকৃত ফলাফল</h3>
                  <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 font-sans text-xs">
                    <table className="w-full text-center">
                      <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="py-2">মুকুট</th>
                          <th className="py-2">তোমার উত্তর</th>
                          <th className="py-2">প্রকৃত পরিচয়</th>
                          <th className="py-2">ফলাফল</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {['A', 'B', 'C'].map((c) => {
                           const actual = c === 'A' ? 'GOLD' : (c === 'B' ? 'FAKE' : 'SILVER');
                           const guess = store.multiData[c as 'A'|'B'|'C'].guess;
                           const correct = actual === guess;
                           const labels = { GOLD: 'খাঁটি সোনা', FAKE: 'নকল/ভেজাল সোনা', SILVER: 'খাঁটি রূপা' };
                           return (
                             <tr key={c} className="border-b border-slate-800/50 last:border-0">
                               <td className="py-2 font-bold">{c}</td>
                               <td className="py-2">{labels[guess as keyof typeof labels]}</td>
                               <td className="py-2">{labels[actual as keyof typeof labels]}</td>
                               <td className={`py-2 font-bold ${correct ? 'text-green-500' : 'text-red-500'}`}>{correct ? '✓' : '✗'}</td>
                             </tr>
                           )
                        })}
                      </tbody>
                    </table>
                  </div>
               </div>

               <div className="bg-indigo-950/30 border border-indigo-900/40 p-4 rounded-xl">
                  <h3 className='text-indigo-400 font-bold mb-3 font-sans'>একটি গুরুত্বপূর্ণ বিষয় লক্ষ্য করো</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4 font-serif">
                    তিনটি মুকুট দেখতে একই এবং তাদের আয়তন একই: <br/>
                    V = 500 cm³ <br/><br/>
                    তাই তিনটি মুকুট সম্পূর্ণ পানিতে নিমজ্জিত করলে তিনটিই সমান পরিমাণ পানি অপসারণ করবে। <br/>
                    For all three: <br/>
                    M₁ − M₂ = 0.50 kg <br/><br/>
                    কিন্তু তাদের বাতাসে ভর আলাদা। Therefore their densities are different.
                  </p>
                  
                  <div className="font-mono text-sm bg-black/40 p-3 rounded-lg text-slate-300 space-y-2 border border-slate-800 mb-4">
                    <p><span className="text-amber-400">খাঁটি সোনা:</span> 9.65 kg / 500 cm³ = {bn(19.30)} g/cm³</p>
                    <p><span className="text-amber-600">নকল সোনা:</span> 8.00 kg / 500 cm³ = {bn(16.00)} g/cm³</p>
                    <p><span className="text-slate-400">খাঁটি রূপা:</span> 5.25 kg / 500 cm³ = {bn(10.50)} g/cm³</p>
                  </div>

                  <p className="text-sm font-bold text-emerald-400 bg-emerald-950/40 p-3 rounded border border-emerald-900/50 leading-relaxed text-center">
                    “একই আয়তন হলে বেশি ভরের পদার্থের ঘনত্ব বেশি। শুধু বাহ্যিক চেহারা দেখে মুকুটের ধাতু শনাক্ত করা যায় না; ঘনত্ব পরিমাপ করে শনাক্ত করা যায়।”
                  </p>
               </div>

               <div className="bg-slate-800/30 border border-slate-700/50 p-4 rounded-xl">
                  <h3 className='text-slate-200 font-bold mb-3 font-sans'>তিনটি মুকুটের আপাত ভর হ্রাস একই কেন?</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-serif">
                    কারণ তিনটি মুকুটের আয়তন একই। আর্কিমিডিসের সূত্র অনুযায়ী, সম্পূর্ণ নিমজ্জিত অবস্থায় বস্তুর আয়তন = অপসারিত পানির আয়তন। 
                    <br/><br/>
                    500 cm³ crown → 500 cm³ water displaced → 0.50 kg displaced water.
                    <br/><br/>
                    এভাবেই আর্কিমিডিসের সূত্র ব্যবহার করে অনিয়মিত আকৃতির বস্তুর আয়তন নির্ণয় করা যায়।
                  </p>
               </div>

               {/* Student Performance */}
               <div className="bg-indigo-900/50 border border-indigo-700/50 p-4 rounded-xl text-center">
                  <h3 className='text-white font-bold mb-4 font-sans text-lg'>তোমার ফলাফল</h3>
                  <div className="flex justify-center gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">পরিমাপ সম্পন্ন</span>
                      <span className="text-2xl font-mono text-cyan-400 font-bold">৩ / ৩</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">সঠিক ঘনত্ব</span>
                      <span className="text-2xl font-mono text-amber-400 font-bold">
                        {bn(['A', 'B', 'C'].filter(c => {
                          const val = parseFloat(store.multiData[c as 'A'|'B'|'C'].calcDensity);
                          const target = c === 'A' ? 19300 : (c === 'B' ? 16000 : 10500);
                          return !isNaN(val) && Math.abs(val - target) <= target * 0.05;
                        }).length)} / {bn(3)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">সঠিক শনাক্তকরণ</span>
                      <span className="text-2xl font-mono text-emerald-400 font-bold">
                        {bn(['A', 'B', 'C'].filter(c => {
                          const actual = c === 'A' ? 'GOLD' : (c === 'B' ? 'FAKE' : 'SILVER');
                          return store.multiData[c as 'A'|'B'|'C'].guess === actual;
                        }).length)} / {bn(3)}
                      </span>
                    </div>
                  </div>
               </div>

               <div className="border-t border-slate-800 pt-6 mt-2">
                 <h3 className='text-cyan-400 font-bold mb-4 font-sans text-center text-lg'>সম্পূর্ণ হিসাব</h3>
                 <div className="space-y-6">
                   {/* Crown A Detailed Math */}
                   <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-amber-400 font-bold mb-3 text-center border-b border-slate-800 pb-2">মুকুট A</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                        <div>
                          <p className="text-slate-500 font-sans mb-1">ভর হ্রাস:</p>
                          <p>M₁ − M₂</p>
                          <p>= 9.65 − 9.15</p>
                          <p className="text-slate-100">= 0.50 kg</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-sans mb-1">আয়তন:</p>
                          <p>V = 0.50 / 1000</p>
                          <p className="text-slate-100">= 0.0005 m³</p>
                          <p className="text-slate-500 text-[10px] mt-1">অথবা V = 500 cm³</p>
                        </div>
                        <div className="col-span-2 border-t border-slate-800/50 pt-2 mt-2">
                          <p className="text-slate-500 font-sans mb-1">ঘনত্ব ও তুলনা:</p>
                          <p>ρ = 9.65 / 0.0005</p>
                          <p className="text-cyan-300 text-sm my-1">ρ = 19,300 kg/m³</p>
                          <p>19,300 = 19,300 kg/m³</p>
                          <p className="text-amber-400 font-bold font-sans mt-2">সুতরাং: মুকুট A = খাঁটি সোনা</p>
                        </div>
                      </div>
                   </div>

                   {/* Crown B Detailed Math */}
                   <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-amber-600 font-bold mb-3 text-center border-b border-slate-800 pb-2">মুকুট B</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                        <div>
                          <p className="text-slate-500 font-sans mb-1">ভর হ্রাস:</p>
                          <p>M₁ − M₂</p>
                          <p>= 8.00 − 7.50</p>
                          <p className="text-slate-100">= 0.50 kg</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-sans mb-1">আয়তন:</p>
                          <p>V = 0.50 / 1000</p>
                          <p className="text-slate-100">= 0.0005 m³</p>
                          <p className="text-slate-500 text-[10px] mt-1">অথবা V = 500 cm³</p>
                        </div>
                        <div className="col-span-2 border-t border-slate-800/50 pt-2 mt-2">
                          <p className="text-slate-500 font-sans mb-1">ঘনত্ব ও তুলনা:</p>
                          <p>ρ = 8.00 / 0.0005</p>
                          <p className="text-cyan-300 text-sm my-1">ρ = 16,000 kg/m³</p>
                          <p>16,000 &lt; 19,300 kg/m³</p>
                          <p>16,000 &gt; 10,500 kg/m³</p>
                          <p className="text-amber-600 font-bold font-sans mt-2">সুতরাং: মুকুট B = নকল/ভেজাল সোনা</p>
                        </div>
                      </div>
                   </div>

                   {/* Crown C Detailed Math */}
                   <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-slate-300 font-bold mb-3 text-center border-b border-slate-800 pb-2">মুকুট C</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                        <div>
                          <p className="text-slate-500 font-sans mb-1">ভর হ্রাস:</p>
                          <p>M₁ − M₂</p>
                          <p>= 5.25 − 4.75</p>
                          <p className="text-slate-100">= 0.50 kg</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-sans mb-1">আয়তন:</p>
                          <p>V = 0.50 / 1000</p>
                          <p className="text-slate-100">= 0.0005 m³</p>
                          <p className="text-slate-500 text-[10px] mt-1">অথবা V = 500 cm³</p>
                        </div>
                        <div className="col-span-2 border-t border-slate-800/50 pt-2 mt-2">
                          <p className="text-slate-500 font-sans mb-1">ঘনত্ব ও তুলনা:</p>
                          <p>ρ = 5.25 / 0.0005</p>
                          <p className="text-cyan-300 text-sm my-1">ρ = 10,500 kg/m³</p>
                          <p>10,500 = 10,500 kg/m³</p>
                          <p className="text-slate-300 font-bold font-sans mt-2">সুতরাং: মুকুট C = খাঁটি রূপা</p>
                        </div>
                      </div>
                   </div>
                 </div>
               </div>

            </motion.div>
          )}

        </div>
      </main>
    </>
  );
}
