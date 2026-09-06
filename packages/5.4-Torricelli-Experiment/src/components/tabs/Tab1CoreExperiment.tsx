'use client';

import React, { useState } from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import {
  toBanglaNumber,
  DENSITY_MERCURY_KG_M3,
  GRAVITATIONAL_ACCELERATION_MS2,
} from '../../lib/physics';
import { ApparatusComponentId, DropZoneId } from '../../lib/types';
import {
  FlaskConical,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  HelpCircle,
  Play,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Layers,
  Hand,
  Lock,
} from 'lucide-react';

export const Tab1CoreExperiment: React.FC = () => {
  const {
    setupState,
    currentStepIndex,
    setDraggedItem,
    bubblesRemaining,
    popBubble,
    tubeRotationAngle,
    setTubeRotationAngle,
    invertTubeComplete,
    handleComponentDrop,
    setupFeedback,
    clearSetupFeedback,
    showHint,
    toggleHint,
    currentHintText,
    startPhysicalExperiment,
    isExperimentRunning,
    isExperimentCompleted,
    showForces,
    setShowForces,
    resetSetup,
    pressureHPa,
    mercuryHeightCm,
    setActiveTab,
  } = useExperiment();

  const [clickWarningToast, setClickWarningToast] = useState<string | null>(null);

  // Component Drag Handlers
  const handleDragStart = (e: React.DragEvent, id: ApparatusComponentId) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedItem(id);
    setClickWarningToast(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Strictly reject click-to-complete and prompt user to Drag and Drop
  const handleCardClickAttempt = (id: ApparatusComponentId) => {
    if (
      (setupState === 'SETUP_EMPTY' && id === 'mercury_flask') ||
      (setupState === 'AIR_REMOVED' && id === 'finger_stopper') ||
      (setupState === 'TUBE_INVERTED' && id === 'glass_tube') ||
      (setupState === 'TUBE_IMMERSED' && id === 'finger_stopper')
    ) {
      setClickWarningToast('🖱️ এটি ক্লিক করে নয়! মাউস দিয়ে চেপে ধরে টেনে এনে (Drag) বাম পাশের ৩ডি ল্যাবের চিহ্নিত স্থানে ফেলুন (Drop)।');
    }
  };

  // Setup tasks definition
  const setupSteps = [
    { num: 1, title: 'পারদ দিয়ে নল পূর্ণ করুন', isDone: currentStepIndex >= 1 },
    { num: 2, title: 'বায়ুর বুদবুদ সরান', isDone: currentStepIndex >= 2 },
    { num: 3, title: 'নলের মুখ আঙুল দিয়ে বন্ধ করুন', isDone: currentStepIndex >= 3 },
    { num: 4, title: 'নলটি ১৮০° উল্টো করুন', isDone: currentStepIndex >= 4 },
    { num: 5, title: 'পারদের পাত্রে মুখ ডুবিয়ে দিন', isDone: currentStepIndex >= 5 },
    { num: 6, title: 'নলের মুখ থেকে আঙুল সরান', isDone: currentStepIndex >= 6 },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header & Setup Preparation Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/50 text-cyan-400 text-xs font-semibold mb-2">
              <FlaskConical className="w-3.5 h-3.5" />
              অধ্যায় ৫: পদার্থের অবস্থা ও চাপ
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-slate-100 font-heading leading-tight">
              পরীক্ষার প্রস্তুতি ও ল্যাব সেটআপ
            </h2>
            <p className="text-[18px] font-normal text-slate-300 mt-2 leading-relaxed">
              প্রয়োজনীয় যন্ত্রপাতি <strong>টেনে এনে ড্রপ (Drag & Drop)</strong> করার মাধ্যমে কাচনলে পারদ ভরা, বুদবুদ সরানো ও উল্টানোর মাধ্যমে টরিসেলির ব্যারোমিটার সেটআপ নিজে হাতে প্রস্তুত করুন।
            </p>
          </div>

          <button
            onClick={resetSetup}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition flex-shrink-0"
            title="ল্যাব সেটআপ পুনরায় শুরু করুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            রিসেট
          </button>
        </div>

        {/* 6 Step Progress Dot Trackers */}
        <div className="mt-5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {setupSteps.map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  s.isDone
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-600/50'
                    : currentStepIndex === s.num - 1
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md animate-pulse'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}
              >
                <span>{s.isDone ? '✓' : toBanglaNumber(s.num, 0)}</span>
                <span className="hidden md:inline-block font-normal">{s.title}</span>
              </div>
            ))}
          </div>

          <button
            onClick={toggleHint}
            className="flex items-center gap-1 px-3 py-1 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-600/40 rounded-lg text-xs font-semibold transition flex-shrink-0"
            title="সহায়ক ইঙ্গিত দেখুন"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>ইঙ্গিত</span>
          </button>
        </div>

        {/* Hint Dropdown */}
        {showHint && (
          <div className="mt-3 p-3 bg-amber-950/50 border border-amber-500/50 rounded-xl text-xs text-amber-200 flex items-start gap-2 animate-fadeIn">
            <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <strong>💡 সহায়ক ইঙ্গিত:</strong> {currentHintText}
            </div>
          </div>
        )}
      </div>

      {/* Click-to-Drag Warning Toast */}
      {clickWarningToast && (
        <div className="bg-amber-950/90 border-2 border-amber-500 p-4 rounded-xl text-amber-200 text-sm flex items-start justify-between gap-3 shadow-xl animate-bounce">
          <div className="flex items-start gap-2.5">
            <Hand className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="font-semibold leading-relaxed">{clickWarningToast}</div>
          </div>
          <button
            onClick={() => setClickWarningToast(null)}
            className="text-xs text-amber-300 hover:text-white px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Interactive Component Tray ("প্রয়োজনীয় যন্ত্রপাতি") */}
      {!isExperimentCompleted && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              প্রয়োজনীয় যন্ত্রপাতি (টেনে আনুন - Drag & Drop)
            </h3>
            <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
              <Hand className="w-3.5 h-3.5" />
              মাউস দিয়ে টেনে ৩ডি ল্যাবে ড্রপ করুন
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Component 1: Mercury Flask */}
            <div
              draggable={setupState === 'SETUP_EMPTY'}
              onDragStart={(e) => handleDragStart(e, 'mercury_flask')}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClickAttempt('mercury_flask')}
              className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 ${
                setupState === 'SETUP_EMPTY'
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-100 shadow-xl shadow-cyan-500/20 ring-4 ring-cyan-400/40 cursor-grab active:cursor-grabbing hover:scale-105 animate-pulse'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="text-3xl mb-1">🧪</span>
              <span className="text-xs font-bold">পারদ ফ্লাস্ক</span>
              <span className="text-[11px] font-semibold mt-1">
                {setupState === 'SETUP_EMPTY' ? (
                  <span className="text-cyan-300 bg-cyan-900/60 px-2 py-0.5 rounded-full border border-cyan-500/40 inline-flex items-center gap-1">
                    টেনে আনুন ➔
                  </span>
                ) : (
                  <span className="text-slate-500">ব্যবহৃত ✓</span>
                )}
              </span>
            </div>

            {/* Component 2: Glass Tube */}
            <div
              draggable={setupState === 'TUBE_INVERTED'}
              onDragStart={(e) => handleDragStart(e, 'glass_tube')}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClickAttempt('glass_tube')}
              className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 ${
                setupState === 'TUBE_INVERTED'
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-100 shadow-xl shadow-cyan-500/20 ring-4 ring-cyan-400/40 cursor-grab active:cursor-grabbing hover:scale-105 animate-pulse'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="text-3xl mb-1">📏</span>
              <span className="text-xs font-bold">১ মি কাচনল</span>
              <span className="text-[11px] font-semibold mt-1">
                {setupState === 'TUBE_INVERTED' ? (
                  <span className="text-cyan-300 bg-cyan-900/60 px-2 py-0.5 rounded-full border border-cyan-500/40 inline-flex items-center gap-1">
                    পাত্রে ফেলুন ➔
                  </span>
                ) : (
                  <span className="text-slate-500">ল্যাবে স্থাপিত</span>
                )}
              </span>
            </div>

            {/* Component 3: Finger / Rubber Stopper */}
            <div
              draggable={setupState === 'AIR_REMOVED' || setupState === 'TUBE_IMMERSED'}
              onDragStart={(e) => handleDragStart(e, 'finger_stopper')}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClickAttempt('finger_stopper')}
              className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 ${
                setupState === 'AIR_REMOVED' || setupState === 'TUBE_IMMERSED'
                  ? 'bg-amber-950/60 border-amber-400 text-amber-100 shadow-xl shadow-amber-500/20 ring-4 ring-amber-400/40 cursor-grab active:cursor-grabbing hover:scale-105 animate-pulse'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="text-3xl mb-1">🔒</span>
              <span className="text-xs font-bold">রাবার কর্ক / আঙুল</span>
              <span className="text-[11px] font-semibold mt-1">
                {setupState === 'AIR_REMOVED' ? (
                  <span className="text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded-full border border-amber-500/40 inline-flex items-center gap-1">
                    মুখে ড্র্যাগ করুন ➔
                  </span>
                ) : setupState === 'TUBE_IMMERSED' ? (
                  <span className="text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded-full border border-amber-500/40 inline-flex items-center gap-1">
                    টেনে সরান ➔
                  </span>
                ) : (
                  <span className="text-slate-500">ল্যাবে প্রস্তুত</span>
                )}
              </span>
            </div>

            {/* Component 4: Mercury Reservoir */}
            <div className="p-3.5 rounded-xl border bg-slate-950/60 border-slate-800 text-slate-400 flex flex-col items-center justify-center text-center opacity-80">
              <span className="text-3xl mb-1">🥣</span>
              <span className="text-xs font-bold">পারদের পাত্র</span>
              <span className="text-[10px] text-slate-500 mt-1">টেবিলে প্রস্তুত</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Step-Specific Interactive Action Workspaces */}

      {/* STEP 2: Remove Air Bubbles Interactive Panel */}
      {setupState === 'TUBE_FILLED' && (
        <div className="bg-slate-900/90 border border-cyan-700/60 rounded-2xl p-5 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-lg border border-cyan-500/30">
              ধাপ ২: বায়ুর বুদবুদ অপসারণ
            </span>
            <span className="text-xs text-amber-400 font-semibold font-mono">
              বাকি বুদবুদ: {toBanglaNumber(bubblesRemaining, 0)}টি
            </span>
          </div>

          <h3 className="text-lg font-semibold text-slate-100">
            নলের কাচ হালকা টোকা বা ঝাঁকিয়ে ভেতরের বায়ুর বুদবুদ বের করে দিন
          </h3>

          <div className="flex items-center justify-center gap-3 py-3">
            {[...Array(4)].map((_, i) => (
              <button
                key={i}
                onClick={popBubble}
                disabled={i >= bubblesRemaining}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all transform ${
                  i < bubblesRemaining
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 animate-bounce hover:scale-110 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-600 opacity-40 cursor-default'
                }`}
                title="বুদবুদ পপ করুন"
              >
                {i < bubblesRemaining ? '🫧' : '✓'}
              </button>
            ))}
          </div>

          <button
            onClick={popBubble}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2"
          >
            ✨ নলে টোকা দিন ও বুদবুদ সরান ({toBanglaNumber(bubblesRemaining, 0)}টি বাকি)
          </button>
        </div>
      )}

      {/* STEP 4: Invert Tube Interactive Panel */}
      {setupState === 'TUBE_SEALED' && (
        <div className="bg-slate-900/90 border border-cyan-700/60 rounded-2xl p-5 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-lg border border-cyan-500/30">
              ধাপ ৪: নলটি উল্লম্বভাবে উল্টো করুন
            </span>
            <span className="text-xs text-amber-400 font-mono font-bold">
              কোণ: {toBanglaNumber(tubeRotationAngle, 0)}° / ১৮০°
            </span>
          </div>

          <h3 className="text-lg font-semibold text-slate-100">
            নলের মুখ বন্ধ রাখা অবস্থাতেই সাবধানে সম্পূর্ণ নলটিকে ১৮০ ডিগ্রি উল্টো করুন
          </h3>

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="180"
              step="5"
              value={tubeRotationAngle}
              onChange={(e) => {
                const angle = parseInt(e.target.value);
                setTubeRotationAngle(angle);
                if (angle >= 180) invertTubeComplete();
              }}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>০° (সোজা)</span>
              <span>৯০°</span>
              <span className="text-cyan-400 font-bold">১৮০° (উল্টো)</span>
            </div>
          </div>

          <button
            onClick={invertTubeComplete}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2"
          >
            🔄 নলটি সম্পূর্ণ ১৮০° উল্টো করুন
          </button>
        </div>
      )}

      {/* Feedback Toast Notification */}
      {setupFeedback && (
        <div
          className={`p-4 rounded-xl border animate-fadeIn flex items-start justify-between gap-3 ${
            setupFeedback.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-600/70 text-emerald-200'
              : setupFeedback.type === 'error'
              ? 'bg-rose-950/50 border-rose-600/70 text-rose-200'
              : 'bg-cyan-950/50 border-cyan-600/70 text-cyan-200'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {setupFeedback.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
            )}
            <div className="text-sm font-medium leading-relaxed">{setupFeedback.message}</div>
          </div>
          <button
            onClick={clearSetupFeedback}
            className="text-xs opacity-70 hover:opacity-100 text-slate-300"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4. Start Physical Experiment Action Card (Enabled only when READY_TO_START) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">পরীক্ষা চালনা নিয়ন্ত্রণ</span>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              setupState === 'READY_TO_START' || isExperimentCompleted
                ? 'bg-emerald-950 border border-emerald-600/60 text-emerald-300'
                : 'bg-slate-800 text-slate-500'
            }`}
          >
            {setupState === 'READY_TO_START'
              ? 'ল্যাব প্রস্তুত ✓'
              : isExperimentCompleted
              ? 'পরীক্ষা সম্পন্ন ✓'
              : 'প্রস্তুতি অসম্পূর্ণ (ধাপ ১-৬ সম্পন্ন করুন)'}
          </span>
        </div>

        <button
          onClick={startPhysicalExperiment}
          disabled={setupState !== 'READY_TO_START' && setupState !== 'TUBE_RELEASED'}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base shadow-xl transition-all flex items-center justify-center gap-3 ${
            setupState === 'READY_TO_START' || setupState === 'TUBE_RELEASED'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400/40 animate-pulse active:scale-98'
              : 'bg-slate-800/60 text-slate-600 border border-slate-800 cursor-not-allowed'
          }`}
        >
          {isExperimentRunning ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              পারদ নামছে ও সাম্যাবস্থায় পৌঁছাচ্ছে...
            </span>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              ▶ পরীক্ষা শুরু করুন
            </>
          )}
        </button>
      </div>

      {/* 5. Experiment Result Summary & Force Vectors (Upon Completion) */}
      {isExperimentCompleted && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-emerald-950/40 border border-emerald-600/60 rounded-2xl p-5 shadow-xl">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-semibold text-emerald-200">✓ পরীক্ষা সফলভাবে সম্পন্ন হয়েছে!</h3>
                <p className="text-[18px] font-normal text-emerald-300/90 mt-1 leading-relaxed">
                  কাচনলের মুখের বাঁধন খুলে যাওয়ার পর পারদস্তম্ভ নিচে নেমে এসে প্রমাণ বায়ুচাপে ঠিক{' '}
                  <strong className="text-white font-mono text-xl">{toBanglaNumber(mercuryHeightCm, 1)} cm</strong>{' '}
                  উচ্চতায় স্থির হয়েছে এবং নলের শীর্ষে একটি শূন্যস্থান (টরিসেলির শূন্যস্থান) তৈরি হয়েছে।
                </p>
              </div>
            </div>
          </div>

          {/* Physics Readout Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">
                বায়ুমণ্ডলীয় চাপ (<strong>P</strong>)
              </span>
              <span className="text-lg font-bold font-mono text-cyan-400">
                {toBanglaNumber(pressureHPa, 1)} <span className="text-xs text-slate-400">hPa</span>
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">
                পারদের উচ্চতা (<strong>h</strong>)
              </span>
              <span className="text-lg font-bold font-mono text-amber-400">
                {toBanglaNumber(mercuryHeightCm, 1)} <span className="text-xs text-slate-400">cm</span>
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">
                পারদের ঘনত্ব (<strong>ρ</strong>)
              </span>
              <span className="text-lg font-bold font-mono text-slate-200">
                {toBanglaNumber(DENSITY_MERCURY_KG_M3, 0)}{' '}
                <span className="text-xs text-slate-400">kg/m³</span>
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">
                অভিকর্ষজ ত্বরণ (<strong>g</strong>)
              </span>
              <span className="text-lg font-bold font-mono text-slate-200">
                {toBanglaNumber(GRAVITATIONAL_ACCELERATION_MS2, 1)}{' '}
                <span className="text-xs text-slate-400">m/s²</span>
              </span>
            </div>
          </div>

          {/* Force Vectors Toggle & Action bar */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setShowForces((prev) => !prev)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                showForces
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {showForces ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showForces ? 'বল ও চাপ ভেক্টর লুকান' : 'বল ও চাপ ভেক্টর দেখান (P_atm vs ρgh)'}
            </button>

            <button
              onClick={() => setActiveTab('measurement')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition"
            >
              পরবর্তী: কেন ৭৬ সেমিতে থেমে যায় ব্যাখ্যা দেখুন
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Educational Note Box */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-[20px] text-slate-200">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          শিক্ষণীয় তথ্য (NCTB পাঠ্যবই নির্দেশিকা):
        </div>
        <p className="text-[18px] font-normal leading-relaxed text-slate-300">
          ১ মিটার দীর্ঘ নলের পুরো পারদ কিন্তু পাত্রে নেমে যায় না। পাত্রের উন্মুক্ত পারদের ওপর চারপাশের বায়ুমণ্ডল যে চাপ দেয়, তা তরলের ভেতর দিয়ে সঞ্চালিত হয়ে নলের পারদস্তম্ভকে একটি নির্দিষ্ট উচ্চতায় ধরে রাখে।
        </p>
      </div>
    </div>
  );
};
