'use client';

import { usePhysics } from '@/lib/physics-context';
import { Calculator } from 'lucide-react';

export default function CalculationPanel() {
  const { f1, a1, a2, p, f2, f_load, f1_min, d1, d2, ma, liftStatus } = usePhysics();

  return (
    <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6">
      <h2 className="text-xl font-heading font-semibold text-blue-400 flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
        <Calculator className="w-5 h-5 text-blue-500" />
        হিসাব নিকাশ (Calculations)
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
          <h3 className="font-heading font-semibold text-blue-300">চাপ (Pressure)</h3>
          <div className="space-y-1 font-mono text-sm text-blue-200">
            <p>P = F₁ / A₁</p>
            <p>P = {f1.toFixed(1)} / {a1.toFixed(1)}</p>
            <p className="font-bold text-lg text-blue-400 mt-2">P = {p.toFixed(2)} N/cm²</p>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
          <h3 className="font-heading font-semibold text-green-300">ফলাফল (Results)</h3>
          <div className="space-y-1 font-mono text-sm text-green-200">
            <p>F₂ = P × A₂</p>
            <p className="font-bold text-base text-green-400">উৎপন্ন বল, F₂ = {f2.toFixed(1)} N</p>
            <p className="text-slate-300">লোডের ওজন = {f_load.toFixed(1)} N</p>
            <div className="pt-2 mt-2 border-t border-green-500/20">
              <p>যান্ত্রিক সুবিধা (MA) = <span className="font-bold">{ma.toFixed(1)}</span></p>
            </div>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
          <h3 className="font-heading font-semibold text-purple-300">সরণ (Displacement)</h3>
          <div className="space-y-1 font-mono text-sm text-purple-200">
            <p>d₁ = {d1.toFixed(2)} cm</p>
            <p>d₂ = {d2.toFixed(2)} cm</p>
            <div className="pt-2 mt-2 border-t border-purple-500/20">
              <p className="text-xs text-purple-300 font-sans">বড় বলের বিনিময়ে কম সরণ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className={`p-4 rounded-xl border ${liftStatus === 'balanced' ? 'bg-yellow-500/10 border-yellow-500/20' : liftStatus === 'lift' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
          <h3 className="font-heading font-semibold mb-2 flex items-center gap-2 text-lg">
            অবস্থা: 
            {liftStatus === 'balanced' ? (
              <span className="text-yellow-300">ভারসাম্য ⚖</span>
            ) : liftStatus === 'lift' ? (
              <span className="text-green-400">লোড উঠবে ✓</span>
            ) : (
              <span className="text-red-400">লোড উঠবে না ✕</span>
            )}
          </h3>
          <p className="text-sm text-slate-300">
            {liftStatus === 'balanced' 
              ? `উৎপন্ন বল (${f2.toFixed(1)} N) ≈ লোডের ওজন (${f_load.toFixed(1)} N)`
              : liftStatus === 'lift' 
                ? `উৎপন্ন বল (${f2.toFixed(1)} N) লোডের ওজন (${f_load.toFixed(1)} N) এর চেয়ে বেশি।`
                : `লোডের ওজন (${f_load.toFixed(1)} N) উৎপন্ন বল (${f2.toFixed(1)} N) এর চেয়ে বেশি।`}
          </p>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
          <h3 className="font-heading font-semibold text-slate-300 mb-2">লোড তুলতে প্রয়োজনীয় সর্বনিম্ন বল</h3>
          <div className="space-y-1 text-sm text-slate-400">
            <p className="font-mono">F₁,min = {f1_min.toFixed(1)} N</p>
            <p className="font-mono mt-1 text-slate-300">আপনার প্রয়োগকৃত বল: {f1.toFixed(1)} N</p>
            <div className="mt-2">
              {f1 >= f1_min + 0.1 ? (
                <span className="text-green-400 font-medium">আপনার প্রয়োগকৃত বল যথেষ্ট ✓</span>
              ) : Math.abs(f1 - f1_min) < 0.1 ? (
                <span className="text-yellow-400 font-medium">ন্যূনতম প্রয়োজনীয় বলের কাছাকাছি ⚖</span>
              ) : (
                <span className="text-red-400 font-medium">আরও বেশি বল প্রয়োজন ✕</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
