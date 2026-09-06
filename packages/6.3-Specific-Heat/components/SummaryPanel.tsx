import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, Car, Sun, ChefHat, X } from 'lucide-react';

interface SummaryPanelProps {
  predicted: string | null;
  onClose: () => void;
  waterTemp: number;
  ironTemp: number;
  copperTemp: number;
  heatAdded: number;
  mode: 'sameHeat' | 'sameTemp';
  waterHeat: number;
  ironHeat: number;
  copperHeat: number;
}

export function SummaryPanel({ predicted, onClose, waterTemp, ironTemp, copperTemp, heatAdded, mode, waterHeat, ironHeat, copperHeat }: SummaryPanelProps) {
  const [activeExample, setActiveExample] = useState<number | null>(null);
  
  const examples = [
    {
      id: 1,
      icon: <ChefHat className="w-5 h-5" />,
      question: "রান্নার পাত্র ধাতু দিয়ে তৈরি হয় কেন?",
      answer: "কারণ তামা এবং লোহার মতো ধাতুগুলোর আপেক্ষিক তাপ কম, তাই এগুলো খুব দ্রুত গরম হয়।",
      color: "bg-[#fef3c7] text-[#92400e]"
    },
    {
      id: 2,
      icon: <Car className="w-5 h-5" />,
      question: "গাড়ির রেডিয়েটরে পানি ব্যবহার করা হয় কেন?",
      answer: "কারণ পানির আপেক্ষিক তাপ বেশি, এটি তাপমাত্রা বৃদ্ধির আগেই প্রচুর পরিমাণ তাপ শোষণ করতে পারে, যা এটিকে একটি দুর্দান্ত কুল্যান্ট করে তোলে।",
      color: "bg-[#dbeafe] text-[#1d4ed8]"
    },
    {
      id: 3,
      icon: <Sun className="w-5 h-5" />,
      question: "উপকূলীয় এলাকায় তাপমাত্রার পরিবর্তন কম হয় কেন?",
      answer: "কারণ সমুদ্রের পানির আপেক্ষিক তাপ বেশি, এটি দিনের বেলা তাপ শোষণ করে এবং রাতে ধীরে ধীরে তা ছেড়ে দেয়।",
      color: "bg-[#e5e7eb] text-[#374151]"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#fdfdfb]/90 backdrop-blur-md flex flex-col items-center px-4">
      <div className="flex-grow min-h-[2rem]"></div>
      <div className="max-w-4xl w-full bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-[#d1d1c4] text-center shrink-0 my-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#8a8a70] hover:bg-[#f5f5f0] hover:text-[#3a3a30] rounded-full transition-colors" aria-label="Close summary">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-heading font-bold text-[#5a5a40] mb-2">পরীক্ষা সম্পন্ন</h2>
        
        {predicted && (
          <div className="mt-6 text-left border border-[#d1d1c4] rounded-2xl p-6 bg-[#fdfdfb]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-[#8a8a70] font-bold text-xs uppercase tracking-widest block mb-1 font-heading">আপনার অনুমান</span>
                <div className="flex items-center gap-2 font-bold text-xl text-[#3a3a30] capitalize font-heading">
                  {predicted === (mode === 'sameHeat' ? 'copper' : 'water') ? <CheckCircle2 className="text-emerald-600" /> : <XCircle className="text-red-500" />}
                  {predicted === 'water' ? 'পানি' : predicted === 'iron' ? 'লোহা' : 'তামা'}
                </div>
              </div>
              <div>
                <span className="text-[#8a8a70] font-bold text-xs uppercase tracking-widest block mb-1 font-heading">সঠিক উত্তর</span>
                <div className="flex items-center gap-2 font-bold text-xl text-emerald-600 capitalize font-heading">
                  <CheckCircle2 />
                  {mode === 'sameHeat' ? 'তামা' : 'পানি'}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#e1e1d8]">
              <span className="text-[#8a8a70] font-bold text-xs uppercase tracking-widest block mb-2 font-heading">ব্যাখ্যা</span>
              <p className="text-[#5a5a40] font-body">
                {mode === 'sameHeat' 
                  ? "তামার আপেক্ষিক তাপ সবচেয়ে কম, তাই একই পরিমাণ তাপ প্রয়োগ করলে এর তাপমাত্রা সবচেয়ে বেশি বৃদ্ধি পায়।"
                  : "পানির আপেক্ষিক তাপ সবচেয়ে বেশি, তাই একই তাপমাত্রায় পৌঁছাতে এর সবচেয়ে বেশি তাপ শক্তির প্রয়োজন হয়।"}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {mode === 'sameHeat' ? (
            <>
              <div className="bg-[#fef3c7] p-5 rounded-2xl">
                 <div className="font-bold font-heading text-[#92400e] text-lg">১. তামা (সবচেয়ে দ্রুত)</div>
                 <div className="text-sm mt-2 opacity-80 font-body">সর্বনিম্ন আপেক্ষিক তাপ। সর্বোচ্চ তাপমাত্রা বৃদ্ধি।</div>
              </div>
              <div className="bg-[#e5e7eb] p-5 rounded-2xl">
                 <div className="font-bold font-heading text-[#374151] text-lg">২. লোহা (মাঝারি)</div>
                 <div className="text-sm mt-2 opacity-80 font-body">মাঝারি আপেক্ষিক তাপ। মাঝারি তাপমাত্রা বৃদ্ধি।</div>
              </div>
              <div className="bg-[#dbeafe] p-5 rounded-2xl">
                 <div className="font-bold font-heading text-[#1d4ed8] text-lg">৩. পানি (সবচেয়ে ধীর)</div>
                 <div className="text-sm mt-2 opacity-80 font-body">সর্বোচ্চ আপেক্ষিক তাপ। সর্বনিম্ন তাপমাত্রা বৃদ্ধি।</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#dbeafe] p-5 rounded-2xl">
                 <div className="font-bold font-heading text-[#1d4ed8] text-lg">১. পানি (সবচেয়ে বেশি তাপ)</div>
                 <div className="text-sm mt-2 opacity-80 font-body">সর্বোচ্চ আপেক্ষিক তাপ। সবচেয়ে বেশি তাপ শক্তি শোষণ করে।</div>
              </div>
              <div className="bg-[#e5e7eb] p-5 rounded-2xl">
                 <div className="font-bold font-heading text-[#374151] text-lg">২. লোহা (মাঝারি তাপ)</div>
                 <div className="text-sm mt-2 opacity-80 font-body">মাঝারি আপেক্ষিক তাপ। মাঝারি পরিমাণ তাপ প্রয়োজন।</div>
              </div>
              <div className="bg-[#fef3c7] p-5 rounded-2xl">
                 <div className="font-bold font-heading text-[#92400e] text-lg">৩. তামা (সবচেয়ে কম তাপ)</div>
                 <div className="text-sm mt-2 opacity-80 font-body">সর্বনিম্ন আপেক্ষিক তাপ। দ্রুত লক্ষ্য তাপমাত্রায় পৌঁছায়।</div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-lg font-medium text-[#3a3a30] font-body">
          {mode === 'sameHeat' ? (
            <>
              সমান পরিমাণ তাপ প্রয়োগ করলে বিভিন্ন পদার্থের তাপমাত্রা <strong className="text-[#92400e]">সমান পরিমাণে বৃদ্ধি পায় না</strong>। এর কারণ হলো তাদের <strong>আপেক্ষিক তাপ ভিন্ন</strong>।
            </>
          ) : (
            <>
              বিভিন্ন পদার্থকে একই তাপমাত্রায় পৌঁছাতে <strong className="text-[#1d4ed8]">ভিন্ন ভিন্ন পরিমাণ তাপ শক্তির প্রয়োজন হয়</strong>।
              <br />যাদের আপেক্ষিক তাপ বেশি, তাপমাত্রা বৃদ্ধির আগে তারা বেশি তাপ শোষণ করে।
            </>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-heading">
          {mode === 'sameHeat' ? (
             <>
               <div className="bg-[#f5f5f0] px-4 py-2 rounded-lg border border-[#e1e1d8]">
                 <span className="text-[#8a8a70] uppercase font-bold text-[10px] block">সরবরাহকৃত তাপ</span>
                 <span className="font-mono text-[#5a5a40] font-bold text-lg">{heatAdded.toFixed(0)} J</span>
               </div>
               <div className="bg-[#fef3c7] px-4 py-2 rounded-lg border border-[#b45309]/20">
                 <span className="text-[#92400e] uppercase font-bold text-[10px] block">সর্বোচ্চ তাপমাত্রা</span>
                 <span className="font-mono text-[#92400e] font-bold text-lg">{copperTemp.toFixed(1)}°C</span>
               </div>
               <div className="bg-[#dbeafe] px-4 py-2 rounded-lg border border-[#3b82f6]/20">
                 <span className="text-[#1d4ed8] uppercase font-bold text-[10px] block">সর্বনিম্ন তাপমাত্রা</span>
                 <span className="font-mono text-[#1d4ed8] font-bold text-lg">{waterTemp.toFixed(1)}°C</span>
               </div>
             </>
          ) : (
             <>
               <div className="bg-[#f5f5f0] px-4 py-2 rounded-lg border border-[#e1e1d8]">
                 <span className="text-[#8a8a70] uppercase font-bold text-[10px] block">লক্ষ্য তাপমাত্রা</span>
                 <span className="font-mono text-[#5a5a40] font-bold text-lg">{waterTemp.toFixed(1)} °C</span>
               </div>
               <div className="bg-[#dbeafe] px-4 py-2 rounded-lg border border-[#3b82f6]/20">
                 <span className="text-[#1d4ed8] uppercase font-bold text-[10px] block">সবচেয়ে বেশি তাপ (পানি)</span>
                 <span className="font-mono text-[#1d4ed8] font-bold text-lg">{waterHeat.toFixed(0)} J</span>
               </div>
               <div className="bg-[#fef3c7] px-4 py-2 rounded-lg border border-[#b45309]/20">
                 <span className="text-[#92400e] uppercase font-bold text-[10px] block">সবচেয়ে কম তাপ (তামা)</span>
                 <span className="font-mono text-[#92400e] font-bold text-lg">{copperHeat.toFixed(0)} J</span>
               </div>
             </>
          )}
        </div>
        
        <div className="mt-8 border-t border-[#e1e1d8] pt-8 text-left">
          <h3 className="text-[10px] font-bold text-[#8a8a70] uppercase tracking-widest mb-4 font-heading">বাস্তব জীবনের প্রয়োগ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examples.map(ex => (
              <button 
                key={ex.id}
                onClick={() => setActiveExample(activeExample === ex.id ? null : ex.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                  activeExample === ex.id 
                    ? `border-transparent ${ex.color} shadow-sm` 
                    : 'border-[#e1e1d8] bg-[#fdfdfb] hover:border-[#d1d1c4]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${activeExample === ex.id ? 'bg-white/50' : 'bg-gray-100 text-gray-500'}`}>
                    {ex.icon}
                  </div>
                  <div>
                    <div className={`font-bold text-sm font-heading ${activeExample === ex.id ? '' : 'text-[#3a3a30]'}`}>{ex.question}</div>
                    <div className={`mt-2 text-sm leading-relaxed transition-all duration-300 overflow-hidden font-body ${
                      activeExample === ex.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {ex.answer}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={onClose} className="mt-10 px-8 py-4 bg-[#5a5a40] text-white rounded-2xl font-bold hover:opacity-90 active:scale-95 shadow-md transition-transform font-heading">
          অন্বেষণ চালিয়ে যান
        </button>
      </div>
      <div className="flex-grow min-h-[2rem]"></div>
    </div>
  );
}
