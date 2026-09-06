'use client';

import { useState } from 'react';
import { Lightbulb, AlertTriangle, CheckCircle2, XCircle, Trophy } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    q: "আবদ্ধ তরলের কোনো অংশে চাপ প্রয়োগ করলে কী ঘটে?",
    options: [
      "চাপ ধীরে ধীরে কমে যায়",
      "চাপ তরলের সর্বত্র সমানভাবে সঞ্চারিত হয়",
      "চাপ শুধুমাত্র নিচের দিকে কাজ করে",
      "চাপ তরলের আয়তন কমিয়ে দেয়"
    ],
    answer: 1,
    explanation: "প্যাসকেলের সূত্র অনুযায়ী, আবদ্ধ তরলে প্রয়োগ করা চাপ কোনোদিকে না কমে তরলের সর্বত্র সমানভাবে সঞ্চারিত হয়।"
  },
  {
    id: 2,
    q: "A₁ = 10 cm², A₂ = 100 cm² এবং F₁ = 20 N হলে, F₂ এর মান কত?",
    options: ["20 N", "100 N", "200 N", "2000 N"],
    answer: 2,
    explanation: "P = F₁/A₁ = 20/10 = 2 N/cm²। অতএব, F₂ = P × A₂ = 2 × 100 = 200 N।"
  },
  {
    id: 3,
    q: "বড় পিস্টনে ছোট পিস্টনের চেয়ে বেশি বল পাওয়া যায়। এর মানে কি হাইড্রোলিক মেশিন শক্তি (Energy) তৈরি করে?",
    options: [
      "হ্যাঁ, এটি নিজে থেকে শক্তি তৈরি করে",
      "না, কারণ বড় বলের বিনিময়ে সরণ (Displacement) কমে যায়",
      "হ্যাঁ, তরল অতিরিক্ত শক্তি প্রদান করে",
      "না, কারণ বড় পিস্টনটি কখনো উঠানো যায় না"
    ],
    answer: 1,
    explanation: "আদর্শ হাইড্রোলিক সিস্টেমে কাজ (Work) সংরক্ষিত থাকে। বল বাড়লেও, বড় পিস্টনের সরণ অনেক কমে যায় (W = F×d)।"
  },
  {
    id: 4,
    q: "ছোট পিস্টনের বল (F₁) অপরিবর্তিত রেখে যদি বড় পিস্টনের ক্ষেত্রফল (A₂) আরও বাড়ানো হয়, তাহলে কী হবে?",
    options: [
      "উৎপন্ন বল (F₂) কমে যাবে",
      "উৎপন্ন বল (F₂) একই থাকবে",
      "উৎপন্ন বল (F₂) বেড়ে যাবে",
      "তরলের চাপ বেড়ে যাবে"
    ],
    answer: 2,
    explanation: "চাপ (P) ধ্রুবক থাকে। যেহেতু F₂ = P × A₂, তাই A₂ বাড়ালে F₂ আনুপাতিক হারে বৃদ্ধি পাবে।"
  }
];

export default function LearnTab() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelected(index);
    setShowExplanation(true);
    if (index === QUIZ_QUESTIONS[currentQ].answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowExplanation(false);
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Misconceptions */}
      <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6">
        <h2 className="text-xl font-heading font-semibold text-amber-400 flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <AlertTriangle className="w-5 h-5" />
          প্রচলিত ভুল ধারণা
        </h2>
        
        <div className="space-y-4">
          <div className="bg-red-900/10 p-4 rounded-xl border border-red-500/20">
            <h3 className="font-semibold text-red-400 flex items-center gap-2 mb-2 text-sm">
              <XCircle className="w-4 h-4" />
              ভুল: তরল অতিরিক্ত বল তৈরি করে।
            </h3>
            <div className="pl-6 border-l-2 border-green-500/30">
              <p className="text-sm text-green-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                সঠিক: তরল অতিরিক্ত বল তৈরি করে না। একই চাপ বড় ক্ষেত্রফলের উপর কাজ করার কারণে বড় বল পাওয়া যায়।
              </p>
            </div>
          </div>

          <div className="bg-red-900/10 p-4 rounded-xl border border-red-500/20">
            <h3 className="font-semibold text-red-400 flex items-center gap-2 mb-2 text-sm">
              <XCircle className="w-4 h-4" />
              ভুল: বড় পিস্টনও একই দূরত্বে চলে।
            </h3>
            <div className="pl-6 border-l-2 border-green-500/30">
              <p className="text-sm text-green-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                সঠিক: বড় পিস্টনের ক্ষেত্রফল বেশি হলে তার সরণ (উপরে ওঠার দূরত্ব) অনেক কম হয়।
              </p>
            </div>
          </div>

          <div className="bg-red-900/10 p-4 rounded-xl border border-red-500/20">
            <h3 className="font-semibold text-red-400 flex items-center gap-2 mb-2 text-sm">
              <XCircle className="w-4 h-4" />
              ভুল: হাইড্রোলিক মেশিন শক্তি (Energy) তৈরি করে।
            </h3>
            <div className="pl-6 border-l-2 border-green-500/30">
              <p className="text-sm text-green-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                সঠিক: আদর্শ ক্ষেত্রে কাজ সংরক্ষিত থাকে। বল বহুগুণ বাড়লেও সরণ কমে যাওয়ায় মোট কাজ (F×d) সমান থাকে।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-900/10 rounded-2xl shadow-sm border border-blue-500/20 p-6">
        <h2 className="text-xl font-heading font-semibold text-blue-400 flex items-center gap-2 mb-6 border-b border-blue-500/20 pb-4">
          <Lightbulb className="w-5 h-5" />
          আজ কী শিখলে?
        </h2>
        <ul className="space-y-3 text-sm text-slate-300 font-body">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> আবদ্ধ তরলে প্রয়োগ করা চাপ তরলের সর্বত্র সঞ্চারিত হয়।</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> চাপ নির্ণয়ের সূত্র: <span className="font-mono text-blue-300 bg-black/40 px-2 py-0.5 rounded">P = F/A</span></li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> প্যাসকেলের গাণিতিক রূপ: <span className="font-mono text-blue-300 bg-black/40 px-2 py-0.5 rounded">F₁/A₁ = F₂/A₂</span></li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> বড় ক্ষেত্রফল মানেই বড় বল।</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> বড় বলের বিনিময়ে কম সরণ হয়, তাই Hydraulic system শক্তি সৃষ্টি করে না।</li>
        </ul>
      </div>

      {/* Quiz */}
      <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6">
        <h2 className="text-xl font-heading font-semibold text-purple-400 flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          মিনি কুইজ (Mini Quiz)
        </h2>

        {!isFinished ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>প্রশ্ন {currentQ + 1} / {QUIZ_QUESTIONS.length}</span>
              <span>স্কোর: {score}</span>
            </div>
            
            <h3 className="text-lg font-heading text-slate-200">
              {QUIZ_QUESTIONS[currentQ].q}
            </h3>

            <div className="space-y-2">
              {QUIZ_QUESTIONS[currentQ].options.map((opt, idx) => {
                const isCorrect = idx === QUIZ_QUESTIONS[currentQ].answer;
                const isSelected = selected === idx;
                
                let btnClass = "w-full text-left px-4 py-3 rounded-xl border text-sm font-body transition-colors ";
                if (!showExplanation) {
                  btnClass += "bg-black/40 border-white/10 text-slate-300 hover:bg-white/10";
                } else {
                  if (isCorrect) {
                    btnClass += "bg-green-500/20 border-green-500/50 text-green-300";
                  } else if (isSelected) {
                    btnClass += "bg-red-500/20 border-red-500/50 text-red-300";
                  } else {
                    btnClass += "bg-black/40 border-white/5 text-slate-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleAnswer(idx)}
                    className={btnClass}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mt-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                <p className="text-sm text-blue-200 font-body">
                  <strong className="text-blue-400">ব্যাখ্যা:</strong> {QUIZ_QUESTIONS[currentQ].explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors font-medium w-full sm:w-auto"
                >
                  পরবর্তী প্রশ্ন
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4 py-8">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
            <h3 className="text-2xl font-heading font-bold text-slate-100">কুইজ সমাপ্ত!</h3>
            <p className="text-slate-400 font-body">তোমার স্কোর: <strong className="text-white">{score} / {QUIZ_QUESTIONS.length}</strong></p>
            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
            >
              আবার শুরু করো
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
