'use client';

import React, { useState } from 'react';
import { useExperiment } from '../context/ExperimentContext';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  Info,
  Sparkles,
  FlaskConical,
  X,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { isMuted, toggleMute, resetAllLabData } = useExperiment();
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleResetConfirm = () => {
    resetAllLabData();
    setShowResetConfirm(false);
  };

  return (
    <>
      <header className="w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3 sm:px-6 shadow-xl">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 flex-shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/40">
                  NCTB ৯ম-১০ম শ্রেণি • পদার্থবিজ্ঞান (অধ্যায় ৫)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-[40px] font-semibold text-slate-100 font-heading leading-tight">
                টরিসেলির পরীক্ষা ও আবহাওয়া পরিবর্তনের সম্পর্ক
              </h1>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 ${
                isMuted
                  ? 'bg-slate-800/60 text-slate-400 border-slate-700'
                  : 'bg-cyan-950/50 text-cyan-300 border-cyan-800/50 shadow'
              }`}
              title={isMuted ? 'শব্দ চালু করুন' : 'শব্দ বন্ধ করুন'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline-block text-xs">{isMuted ? 'মিউট' : 'সাউন্ড'}</span>
            </button>

            {/* Info / Guide Modal Trigger */}
            <button
              onClick={() => setShowInfoModal(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
              title="ল্যাব ব্যবহারের নির্দেশিকা ও শিক্ষণীয় লক্ষ্য"
            >
              <Info className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline-block text-xs">নির্দেশিকা</span>
            </button>

            {/* Reset All */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-800/50 text-xs transition flex items-center gap-1.5"
              title="সকল ল্যাব ডাটা রিসেট"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline-block text-xs">রিসেট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-slate-100 font-heading">
                  সিমুলেশনের শিক্ষণীয় লক্ষ্য ও সারসংক্ষেপ
                </h3>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-800/40 space-y-1">
                <span className="font-bold text-cyan-300 block">মৌলিক সূত্র:</span>
                <p className="font-mono text-slate-200 text-sm">
                  P = ρgh ⟹ h = P / (ρg)
                </p>
                <p className="text-[11px] text-slate-400">
                  যেখানে, ρ (পারদের ঘনত্ব) = ১৩৬০০ kg/m³, g = ৯.৮ m/s², প্রমাণ বায়ুচাপ = ১০১,৩২৫ Pa।
                </p>
              </div>

              <h4 className="font-bold text-slate-200 text-sm">শিক্ষার্থীরা যা শিখবে:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li>টরিসেলি কীভাবে উল্টানো পারদ নলের মাধ্যমে প্রমাণ বায়ুচাপ প্রদর্শন করেছিলেন।</li>
                <li>কেন প্রমাণ অবস্থায় পারদস্তম্ভ প্রায় ৭৬ সেমিতে এসে থেমে যায় (চাপের সাম্যাবস্থা)।</li>
                <li>বায়ুমণ্ডলীয় চাপ বৃদ্ধি বা হ্রাসের সাথে পারদের উচ্চতার পরিবর্তন।</li>
                <li>ব্যারোমিটারের পরিবর্তনের ধারা থেকে আবহাওয়া পূর্বাভাস অনুমানের সঠিক বৈজ্ঞানিক নিয়ম।</li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition"
              >
                বুঝেছি, ল্যাবে ফিরে যান
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-100">ল্যাব ডাটা রিসেট করবেন?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              এটি আপনার বর্তমান পরীক্ষার ধাপ, সংগৃহীত টেবিলের রেকর্ডসমূহ এবং চ্যালেঞ্জের উত্তরগুলো পুনরায় প্রাথমিক অবস্থায় নিয়ে যাবে।
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700 transition"
              >
                বাতিল
              </button>
              <button
                onClick={handleResetConfirm}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
              >
                হ্যাঁ, রিসেট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
