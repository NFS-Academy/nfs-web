'use client';

import React from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import { toBanglaNumber } from '../../lib/physics';
import {
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const Tab2MeasurementTheory: React.FC = () => {
  const {
    explanationStage,
    setExplanationStage,
    setActiveTab,
  } = useExperiment();

  // 5 Progressive Stages of Theory Explanation with clear typography
  const stages = [
    {
      stage: 1,
      title: 'ধাপ ১: পাত্রের উন্মুক্ত পারদের ওপর বায়ুর চাপ',
      icon: '🌬️',
      summary: 'বায়ুমণ্ডলীয় চাপ (P_atm) পাত্রের পারদের মুক্ত তলে নিচের দিকে বল প্রয়োগ করে।',
      explanation:
        'পৃথিবীর বায়ুমণ্ডলে থাকা বিপুল পরিমাণ বায়ুর ওজনের কারণে পাত্রের উন্মুক্ত পারদের ওপর প্রতি বর্গমিটারে প্রায় ১০১,৩২৫ নিউটন বল (বায়ুচাপ) নিচের দিকে ক্রিয়া করে। এটি তরলের উপরিভাগে এক ধরনের অবিরাম ধাক্কা বা চাপ তৈরি করে।',
      formula: 'P (বায়ুমণ্ডলীয় চাপ) = P_atm',
    },
    {
      stage: 2,
      title: 'ধাপ ২: তরলে চাপ সঞ্চালন ও ঊর্ধ্বমুখী ক্রিয়া',
      icon: '🌊',
      summary: 'প্যাসকেলের সূত্রানুসারে পাত্রের এই চাপ তরলের মাধ্যমে চারদিকে এবং নলের মুখে ওপরের দিকে সঞ্চালিত হয়।',
      explanation:
        'পাত্রের ওপর প্রযুক্ত এই বায়ুমণ্ডলীয় চাপ তরলের ভেতর দিয়ে প্রবাহিত হয়ে উল্টানো কাচনলের উন্মুক্ত নিচের মুখে একটি ঊর্ধ্বমুখী বল প্রয়োগ করে। এই ঊর্ধ্বমুখী বল নলের ভেতরের পারদকে নিচের দিকে পড়ে যেতে বাধা দেয়।',
      formula: 'F (ঊর্ধ্বমুখী বল) = P_atm × A',
    },
    {
      stage: 3,
      title: 'ধাপ ৩: পারদস্তম্ভের নিজস্ব ওজন ও নিম্নমুখী চাপ',
      icon: '⚖️',
      summary: 'নলের ভেতরের পারদস্তম্ভের নিজস্ব ওজন (W = mg = ρ·A·h·g) নিচের দিকে চাপ সৃষ্টি করে।',
      explanation:
        'কাচনলে থাকা ১ মিটার দীর্ঘ পারদের ভর এবং পৃথিবীর অভিকর্ষ বলের কারণে তা নিচের দিকে চাপ দিতে থাকে। উচ্চতা h হলে এর তলদেশে তরলের চাপ হয় P = ρgh, যা নিচের দিকে ক্রিয়াশীল।',
      formula: 'P (পারদস্তম্ভের চাপ) = ρgh',
    },
    {
      stage: 4,
      title: 'ধাপ ৪: চাপের সাম্যাবস্থা (Equilibrium)',
      icon: '⚖️',
      summary: 'পারদস্তম্ভের চাপ এবং বায়ুমণ্ডলীয় চাপ যখন সমান হয়, তখনই পারদের পতন থেমে যায়।',
      explanation:
        'নলের মুখ খুলে দিলে পারদ নিচে নামতে থাকে। নামার সাথে সাথে পারদস্তম্ভের উচ্চতা h কমতে থাকে এবং এর তলদেশীয় চাপ ρgh হ্রাস পায়। যে মুহূর্তে ρgh ঠিক বায়ুমণ্ডলীয় চাপের সমান হয়ে যায় (P_atm = ρgh), তখন দুই বিপরীতমুখী চাপ সমান হয়ে পূর্ণ সাম্যাবস্থায় পৌঁছায়।',
      formula: 'P_atm = ρgh (চাপের সাম্যাবস্থা)',
    },
    {
      stage: 5,
      title: 'ধাপ ৫: প্রমাণ অবস্থায় কেন ঠিক প্রায় ৭৬ সেমি?',
      icon: '📐',
      summary: 'প্রমাণ বায়ুচাপ ১০১,৩২৫ Pa এবং পারদের ঘনত্বের কারণে উচ্চতা হিসাব করলে ঠিক ৭৬ সেমি পাওয়া যায়।',
      explanation:
        'সমীকরণ h = P / (ρg)-তে মান বসালে:\n\nh = 101325 Pa / (13600 kg/m³ × 9.8 m/s²) = 101325 / 133280 ≈ 0.7602 m = 76.02 cm\n\nযেহেতু পারদ অত্যন্ত ভারী (পানির চেয়ে প্রায় ১৩.৬ গুণ ভারী), তাই মাত্র ৭৬ সেমি পারদস্তম্ভ দিয়েই সুবিশাল বায়ুমণ্ডলের পুরো চাপকে ব্যালেন্স করা সম্ভব হয়! পানির ক্ষেত্রে প্রায় ১০.৩ মিটার দীর্ঘ নলের প্রয়োজন হতো।',
      formula: 'h = P_atm / (ρg) ≈ ৭৬.০ cm',
    },
  ];

  const currentTheory = stages[explanationStage - 1];

  return (
    <div className="space-y-6">
      {/* PROGRESSIVE THEORY & EQUILIBRIUM MECHANISM */}
      <div className="space-y-5 animate-fadeIn">
        {/* Stepper Navigation */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-lg border border-cyan-500/30">
              ব্যাখ্যা ধাপ: {toBanglaNumber(explanationStage, 0)} / ৫
            </span>
            <div className="flex gap-1.5">
              {stages.map((s) => (
                <button
                  key={s.stage}
                  onClick={() => setExplanationStage(s.stage)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition ${
                    explanationStage === s.stage
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {toBanglaNumber(s.stage, 0)}
                </button>
              ))}
            </div>
          </div>

          {/* Current Stage Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2.5 bg-slate-800 rounded-2xl">{currentTheory.icon}</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-100">{currentTheory.title}</h3>
                <p className="text-[18px] text-cyan-400 font-normal mt-0.5">{currentTheory.summary}</p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 text-[18px] font-normal text-slate-200 leading-relaxed whitespace-pre-line">
              {currentTheory.explanation}
            </div>

            {/* Mathematical Equation Highlight */}
            <div className="bg-cyan-950/40 border border-cyan-700/50 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-cyan-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                সম্পর্কিত সূত্র:
              </span>
              <span className="font-mono text-amber-300 font-bold text-sm sm:text-base bg-slate-950 px-3.5 py-1.5 rounded-lg border border-cyan-900 shadow-inner">
                {currentTheory.formula}
              </span>
            </div>

            {/* Next/Prev Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setExplanationStage((prev) => Math.max(1, prev - 1))}
                disabled={explanationStage === 1}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  explanationStage === 1
                    ? 'text-slate-600 bg-slate-800/40 cursor-not-allowed'
                    : 'text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                পূর্ববর্তী ধাপ
              </button>

              {explanationStage < 5 ? (
                <button
                  onClick={() => setExplanationStage((prev) => Math.min(5, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition"
                >
                  পরবর্তী ধাপ
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('variation')}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition"
                >
                  চাপ পরিবর্তন পরীক্ষায় যান
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
