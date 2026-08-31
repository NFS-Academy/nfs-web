import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function PracticePage({ params }) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <Link href={`/concept/${params?.conceptId || 'concept-id'}`} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Practice: Newton's Second Law</h1>
          <p className="text-gray-400 text-sm">Question 1 of 5</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Question Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg shrink-0">
          <div className="inline-block bg-purple-500/10 text-purple-400 text-xs font-bold px-2 py-1 rounded mb-4 uppercase tracking-wider">
            Board Question (Dhaka 2023)
          </div>
          <p className="text-lg text-white mb-6 leading-relaxed">
            A stationary car of mass 1200 kg is pushed with a constant force. It reaches a velocity of 15 m/s in 5 seconds. What is the force applied to the car?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-gray-950 border border-gray-700 hover:border-green-500 hover:bg-green-500/5 text-gray-200 text-left p-4 rounded-lg transition-colors flex items-center gap-3 group">
              <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-green-500 flex items-center justify-center text-xs">A</div>
              3600 N
            </button>
            <button className="bg-gray-950 border border-green-500 bg-green-500/10 text-white text-left p-4 rounded-lg transition-colors flex items-center gap-3">
              <CheckCircle2 size={24} className="text-green-500 shrink-0" />
              <span className="font-medium">3600 N</span>
            </button>
            <button className="bg-gray-950 border border-gray-700 hover:border-green-500 hover:bg-green-500/5 text-gray-200 text-left p-4 rounded-lg transition-colors flex items-center gap-3 group">
              <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-green-500 flex items-center justify-center text-xs">C</div>
              18000 N
            </button>
            <button className="bg-gray-950 border border-gray-700 hover:border-green-500 hover:bg-green-500/5 text-gray-200 text-left p-4 rounded-lg transition-colors flex items-center gap-3 group">
              <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-green-500 flex items-center justify-center text-xs">D</div>
              720 N
            </button>
          </div>
        </div>

        {/* Explanation Area (Appears after answering) */}
        <div className="bg-green-950/20 border border-green-500/30 rounded-xl p-6 flex-1 overflow-y-auto">
          <h3 className="text-green-400 font-bold mb-4">Correct! Here is the step-by-step logic:</h3>
          <div className="space-y-4 text-gray-300 font-mono text-sm">
            <div className="flex gap-4">
              <div className="w-8 shrink-0 text-gray-500">1.</div>
              <div>Identify given values: <br/>m = 1200 kg <br/>u = 0 m/s (stationary) <br/>v = 15 m/s <br/>t = 5 s</div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 shrink-0 text-gray-500">2.</div>
              <div>Formula for acceleration:<br/>a = (v - u) / t</div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 shrink-0 text-gray-500">3.</div>
              <div>Calculate a:<br/>a = (15 - 0) / 5 = 3 m/s²</div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 shrink-0 text-gray-500">4.</div>
              <div>Formula for force:<br/>F = ma</div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 shrink-0 text-green-500 font-bold">5.</div>
              <div className="text-green-400 font-bold">Calculate F:<br/>F = 1200 kg × 3 m/s² = 3600 N</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end shrink-0">
        <button className="bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-8 rounded-lg transition-colors">
          Next Question
        </button>
      </div>
    </div>
  );
}
