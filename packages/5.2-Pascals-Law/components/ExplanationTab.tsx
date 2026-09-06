'use client';

import { usePhysics } from '@/lib/physics-context';
import { BookOpen, Info, ArrowRight, Activity, ArrowDown, MoveUp } from 'lucide-react';
import { useState } from 'react';

export default function ExplanationTab() {
  const { f1, a1, a2, p, f2, d1, d2, w1, w2 } = usePhysics();
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6">
        <h2 className="text-xl font-heading font-semibold text-blue-400 flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <BookOpen className="w-5 h-5" />
          কীভাবে ছোট বল দিয়ে বড় ওজন ওঠে?
        </h2>

        {/* Stepper Guide */}
        <div className="space-y-6">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  step === s 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : step > s 
                      ? 'bg-blue-900/30 text-blue-300 border border-blue-500/20' 
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                ধাপ {s}
              </button>
            ))}
          </div>

          <div className="bg-black/40 p-6 rounded-xl border border-white/5 min-h-[160px] flex flex-col justify-center">
            {step === 1 && (
              <div className="space-y-3 text-center">
                <ArrowDown className="w-8 h-8 text-red-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-heading text-slate-200">ছোট পিস্টনে বল প্রয়োগ করা হলো</h3>
                <p className="text-slate-400 font-body">তুমি ছোট পিস্টনে <span className="text-blue-400 font-mono font-bold">{f1} N</span> বল প্রয়োগ করছো যার ক্ষেত্রফল <span className="text-blue-400 font-mono font-bold">{a1} cm²</span>।</p>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3 text-center">
                <Activity className="w-8 h-8 text-blue-400 mx-auto" />
                <h3 className="text-lg font-heading text-slate-200">চাপ তরলের সর্বত্র সঞ্চারিত হয়</h3>
                <p className="text-slate-400 font-body">প্যাসকেলের সূত্র অনুযায়ী, তরলে প্রয়োগ করা চাপ কোনোদিকে না কমে তরলের সর্বত্র সমানভাবে সঞ্চারিত হয়। (P₁ = P₂)</p>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-3 text-center">
                <div className="w-16 h-4 bg-slate-700 mx-auto rounded" />
                <h3 className="text-lg font-heading text-slate-200">বড় পিস্টনের ক্ষেত্রফল বেশি</h3>
                <p className="text-slate-400 font-body">এই চাপ যখন বড় পিস্টনে পৌঁছায়, তখন সেটি অনেক বড় একটি ক্ষেত্রফলের (<span className="text-green-400 font-mono font-bold">{a2} cm²</span>) উপর কাজ করে।</p>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-3 text-center">
                <h3 className="text-lg font-heading text-slate-200">বল বহুগুণ বেড়ে যায়</h3>
                <div className="font-mono text-sm space-y-1 my-2 bg-black/40 py-3 rounded-lg border border-white/5 mx-auto max-w-sm">
                  <p className="text-slate-400">P = {p.toFixed(2)} N/cm²</p>
                  <p className="text-green-300">F₂ = P × A₂</p>
                  <p className="text-green-400 font-bold">F₂ = {p.toFixed(2)} × {a2} = {f2.toFixed(1)} N</p>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-3 text-center">
                <MoveUp className="w-8 h-8 text-green-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-heading text-slate-200">একই চাপ বড় ক্ষেত্রফলের উপর কাজ করায় বড় পিস্টনে বেশি বল পাওয়া যায়।</h3>
                <p className="text-amber-300 font-body italic text-sm mt-2 flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" />
                  তরল কোনো অতিরিক্ত বল সৃষ্টি করে না। এটি শুধুমাত্র ক্ষেত্রফলের অনুপাত ব্যবহার করে বলকে বহুগুণ করে।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Mathematical Explanation */}
      <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6">
        <h3 className="text-sm font-semibold text-slate-300 text-center mb-6">চাপ একই, বল ভিন্ন (P₁ = P₂ কিন্তু F₁ ≠ F₂)</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-sm">
          {/* Small Piston Logic */}
          <div className="bg-black/40 p-4 rounded-xl border border-blue-500/20 text-center flex-1 w-full">
            <h4 className="text-blue-300 font-sans mb-3 font-semibold text-xs uppercase tracking-wider">ছোট পিস্টন</h4>
            <p className="text-slate-400">A₁ = {a1} cm²</p>
            <p className="text-slate-400 mb-2">F₁ = {f1} N</p>
            <ArrowDown className="w-4 h-4 mx-auto text-slate-600 mb-2" />
            <p className="text-blue-200">P = F₁ / A₁</p>
            <p className="text-blue-400 font-bold">P = {p.toFixed(2)} N/cm²</p>
          </div>

          <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block" />
          <ArrowDown className="w-6 h-6 text-slate-600 md:hidden" />

          {/* Large Piston Logic */}
          <div className="bg-black/40 p-4 rounded-xl border border-green-500/20 text-center flex-1 w-full">
            <h4 className="text-green-300 font-sans mb-3 font-semibold text-xs uppercase tracking-wider">বড় পিস্টন</h4>
            <p className="text-slate-400">A₂ = {a2} cm²</p>
            <p className="text-slate-400 mb-2">P = {p.toFixed(2)} N/cm²</p>
            <ArrowDown className="w-4 h-4 mx-auto text-slate-600 mb-2" />
            <p className="text-green-200">F₂ = P × A₂</p>
            <p className="text-green-400 font-bold">F₂ = {f2.toFixed(1)} N</p>
          </div>
        </div>
      </div>

      {/* Displacement & Work */}
      <details className="group bg-[#111114] rounded-2xl shadow-sm border border-white/10 [&_summary::-webkit-details-marker]:hidden">
        <summary className="p-6 cursor-pointer flex items-center justify-between font-heading font-semibold text-blue-400 outline-none">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            উন্নত ধারণা: বল বাড়ে, কিন্তু সরণ কমে
          </div>
          <span className="transition group-open:rotate-180">
            <ArrowDown className="w-5 h-5 text-slate-500" />
          </span>
        </summary>
        <div className="p-6 pt-0 border-t border-white/5 mt-2">
          <div className="grid md:grid-cols-2 gap-8 mt-4">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-300">সরণ (Displacement)</h4>
              <p className="text-sm text-slate-400 font-body">তরলের আয়তন ধ্রুবক থাকে। তাই ছোট পিস্টন যে আয়তনের তরল নিচে নামায়, বড় পিস্টন ঠিক ততটুকু আয়তনের তরলই উপরে তোলে। (A₁d₁ = A₂d₂)</p>
              
              <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs space-y-2">
                <div className="flex justify-between text-blue-300">
                  <span>d₁ (ছোট পিস্টন নামলো)</span>
                  <span>{d1.toFixed(1)} cm</span>
                </div>
                <div className="flex justify-between text-green-300">
                  <span>d₂ (বড় পিস্টন উঠলো)</span>
                  <span>{d2.toFixed(1)} cm</span>
                </div>
                <div className="pt-2 border-t border-white/10 text-slate-400 italic">
                  দ্যাখো, d₂ অনেক ছোট d₁ এর থেকে!
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-300">কাজ ও শক্তি (Work & Energy)</h4>
              <p className="text-sm text-slate-400 font-body">আদর্শ হাইড্রোলিক সিস্টেমে কাজ (Work) সংরক্ষিত থাকে। অর্থাৎ, ছোট পিস্টনে যতটুকু কাজ করা হয়, বড় পিস্টন ঠিক ততটুকুই কাজ ফেরত দেয়।</p>
              
              <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs space-y-2">
                <div className="flex justify-between text-blue-300">
                  <span>W₁ = F₁ × d₁</span>
                  <span>{w1.toFixed(1)} J</span>
                </div>
                <div className="flex justify-between text-green-300">
                  <span>W₂ = F₂ × d₂</span>
                  <span>{w2.toFixed(1)} J</span>
                </div>
                <div className="pt-2 border-t border-white/10 text-amber-300 italic">
                  W₁ ≈ W₂ (কাজ সংরক্ষিত)
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>

    </div>
  );
}
