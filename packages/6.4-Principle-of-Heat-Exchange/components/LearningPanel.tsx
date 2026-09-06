import React from 'react';
import { SimMode } from '@/hooks/useSimulation';
import { SPECIFIC_HEAT } from '@/lib/physics';
import { toBanglaNumber } from '@/lib/i18n';

export function LearningPanel({ mode }: { mode: SimMode }) {
  if (mode === 'LEARN') {
    return (
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm flex-1 flex flex-col gap-4 font-heading">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold font-serif italic">i</div>
          <div>
            <h2 className="font-bold text-blue-900">ক্যালরিমিতির মূলনীতি</h2>
            <p className="text-xs text-blue-700 mt-1">শক্তির সংরক্ষণশীলতা</p>
          </div>
        </div>
        
        <div className="text-sm text-blue-800 space-y-4 flex-1">
          <p>ভিন্ন তাপমাত্রার দুটি বস্তুকে তাপীয় সংস্পর্শে আনলে উষ্ণতর বস্তু তাপ বর্জন করে এবং শীতলতর বস্তু তাপ গ্রহণ করে। এ আদান-প্রদান ততক্ষণ চলতে থাকে যতক্ষণ না উভয়ের তাপমাত্রা সমান হয়।</p>
          <div className="bg-white/60 p-4 rounded-xl text-center font-mono font-bold border border-blue-200 text-base">
            <span className="text-red-600">বর্জিত তাপ</span> = <span className="text-blue-600">গৃহীত তাপ</span>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>তাপীয় সাম্যাবস্থা:</strong> তাপমাত্রার সমতা না আসা পর্যন্ত তাপের আদান-প্রদান চলতে থাকে।</li>
            <li><strong>তাপের স্থানান্তর:</strong> উচ্চ তাপমাত্রার বস্তু থেকে নিম্ন তাপমাত্রার বস্তুর দিকে তাপ স্থানান্তরিত হয়।</li>
          </ul>
        </div>
        
        <div className="bg-white/80 p-3 rounded-xl border border-blue-200 mt-4">
          <div className="font-bold text-[10px] text-blue-800 uppercase mb-2">আপনি কী শিখলেন?</div>
          <ul className="text-[11px] text-blue-700 space-y-2">
            <li><span className="font-bold">তাপের স্থানান্তর:</span> উচ্চ তাপমাত্রার বস্তু থেকে নিম্ন তাপমাত্রার বস্তুর দিকে তাপ স্থানান্তরিত হয়।</li>
            <li><span className="font-bold">তাপীয় সাম্যাবস্থা:</span> তাপমাত্রার সমতা না আসা পর্যন্ত তাপের আদান-প্রদান চলতে থাকে।</li>
            <li><span className="font-bold">শক্তির সংরক্ষণশীলতা:</span> বর্জিত তাপ = গৃহীত তাপ</li>
          </ul>
        </div>
      </div>
    );
  }

  if (mode === 'EXPERIMENT') {
    const getMaterialName = (en: string) => {
      const map: Record<string, string> = {
        'Water': 'পানি',
        'Iron': 'লোহা',
        'Copper': 'তামা',
        'Aluminum': 'অ্যালুমিনিয়াম'
      };
      return map[en] || en;
    };

    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 shadow-sm flex-1 flex flex-col gap-4 font-heading">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold font-serif italic">i</div>
          <div>
            <h2 className="font-bold text-emerald-900">আপেক্ষিক তাপ</h2>
            <p className="text-xs text-emerald-700 mt-1">পদার্থের বৈশিষ্ট্য</p>
          </div>
        </div>
        
        <div className="text-sm text-emerald-800 space-y-4 flex-1">
          <p>একই পরিমাণ তাপমাত্রা বৃদ্ধির জন্য বিভিন্ন পদার্থের ভিন্ন ভিন্ন পরিমাণ তাপের প্রয়োজন হয়।</p>
          
          <div className="bg-white/60 p-3 rounded-xl border border-emerald-200 text-xs">
            <div className="font-bold mb-2 border-b border-emerald-200 pb-1">আপেক্ষিক তাপ (kJ/kg·°C)</div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(SPECIFIC_HEAT).filter(([k]) => ['Water', 'Aluminum', 'Iron', 'Copper'].includes(k)).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span>{getMaterialName(k)}:</span>
                  <span className="font-bold">{toBanglaNumber(v.toFixed(3))}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/60 p-4 rounded-xl text-center font-mono font-bold border border-emerald-200 text-sm">
            Q = m <span className="text-emerald-600">s</span> ΔT
          </div>
        </div>

        <div className="bg-white/80 p-3 rounded-xl border border-emerald-200 mt-4">
          <div className="font-bold text-[10px] text-emerald-800 uppercase mb-2">আপনি কী শিখলেন?</div>
          <ul className="text-[11px] text-emerald-700 space-y-2">
            <li><span className="font-bold">আপেক্ষিক তাপ:</span> একই পরিমাণ তাপমাত্রা পরিবর্তনের জন্য বিভিন্ন পদার্থের ভিন্ন ভিন্ন পরিমাণ তাপের প্রয়োজন।</li>
            <li><span className="font-bold">ভরের প্রভাব:</span> ভর পদার্থের মোট তাপ ধারণ ক্ষমতাকে প্রভাবিত করে এবং চূড়ান্ত তাপমাত্রায় প্রভাব ফেলে।</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 shadow-sm flex-1 flex flex-col gap-4 font-heading">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold font-serif italic">i</div>
        <div>
          <h2 className="font-bold text-purple-900">অবস্থার পরিবর্তন</h2>
          <p className="text-xs text-purple-700 mt-1">সুপ্ত ও বোধগম্য তাপ</p>
        </div>
      </div>
      
      <div className="text-sm text-purple-800 space-y-4 flex-1">
        <div className="bg-white/60 p-3 rounded-xl border border-purple-200 text-xs space-y-2">
          <div>
            <span className="font-bold text-slate-700">বোধগম্য তাপ: </span>
            অবস্থার পরিবর্তন না ঘটিয়ে তাপমাত্রার পরিবর্তন ঘটায়। (Q = msΔT)
          </div>
          <div>
            <span className="font-bold text-purple-700">সুপ্ত তাপ: </span>
            তাপমাত্রার পরিবর্তন না ঘটিয়ে অবস্থার পরিবর্তন ঘটায়। (Q = mL)
          </div>
        </div>
        
        <div className="bg-white/60 p-3 rounded-xl border border-purple-200">
           <div className="text-[10px] font-bold text-center mb-1 text-slate-500">চাপ: ১ অ্যাটমোসফিয়ার</div>
           <div className="flex text-[9px] font-bold text-center border border-purple-200 divide-x divide-purple-200 mt-2">
             <div className="flex-1 py-1 bg-slate-100">বরফ (&lt;০°C)</div>
             <div className="flex-1 py-1 bg-blue-100">পানি (০-১০০°C)</div>
             <div className="flex-1 py-1 bg-slate-100">বাষ্প (&gt;১০০°C)</div>
           </div>
        </div>
      </div>

      <div className="bg-white/80 p-3 rounded-xl border border-purple-200 mt-4">
        <div className="font-bold text-[10px] text-purple-800 uppercase mb-2">আপনি কী শিখলেন?</div>
        <ul className="text-[11px] text-purple-700 space-y-2">
          <li><span className="font-bold">সুপ্ত তাপ:</span> অবস্থার পরিবর্তনের সময়, তাপ শক্তি তাপমাত্রার পরিবর্তন না ঘটিয়ে অবস্থার পরিবর্তন করে।</li>
          <li><span className="font-bold">ধাপ ভিত্তিক পদার্থবিজ্ঞান:</span> একটি পদার্থের তাপমাত্রা পুনরায় পরিবর্তিত হওয়ার আগে তার অবস্থার পরিবর্তন সম্পূর্ণভাবে শেষ হতে হবে।</li>
        </ul>
      </div>
    </div>
  );
}
