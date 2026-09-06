'use client';

import { usePhysics } from '@/lib/physics-context';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Play, Pause, RotateCcw } from 'lucide-react';

interface DataPoint {
  time: number;
  P1: number;
  P2: number;
  F1: number;
  F2: number;
}

export default function PhysicsGraphs() {
  const { p, f1, f2 } = usePhysics();
  const [data, setData] = useState<DataPoint[]>([]);
  const [isRecording, setIsRecording] = useState(true);
  const [timeCounter, setTimeCounter] = useState(0);

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setTimeCounter((prev) => {
        const newTime = prev + 0.5;
        setData((currentData) => {
          const newData = [...currentData, {
            time: newTime,
            P1: parseFloat(p.toFixed(2)),
            P2: parseFloat(p.toFixed(2)), // In ideal pascal's law, P1=P2
            F1: parseFloat(f1.toFixed(1)),
            F2: parseFloat(f2.toFixed(1)),
          }];
          // Keep last 30 seconds
          if (newData.length > 60) return newData.slice(newData.length - 60);
          return newData;
        });
        return newTime;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [p, f1, f2, isRecording]);

  const clearData = () => {
    setData([]);
    setTimeCounter(0);
  };

  return (
    <div className="bg-[#111114] rounded-2xl shadow-sm border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl font-heading font-semibold text-blue-400 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          রিয়েল-টাইম গ্রাফ
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${
              isRecording ? 'bg-amber-900/30 text-amber-300 border border-amber-500/30 hover:bg-amber-900/50' : 'bg-green-900/30 text-green-300 border border-green-500/30 hover:bg-green-900/50'
            }`}
          >
            {isRecording ? <><Pause className="w-4 h-4" /> পজ</> : <><Play className="w-4 h-4" /> শুরু</>}
          </button>
          <button
            onClick={clearData}
            className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-slate-300 text-xs uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            ক্লিয়ার
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Pressure Graph */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 text-center">চাপ বনাম সময় (P vs t)</h3>
          <div className="h-64 w-full bg-black/40 rounded-xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val}s`} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="P1" name="P₁ (ছোট)" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="P2" name="P₂ (বড়)" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-500 font-body italic">আদর্শ মডেলে P₁ এবং P₂ সর্বদা সমান</p>
        </div>

        {/* Force Graph */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 text-center">বল বনাম সময় (F vs t)</h3>
          <div className="h-64 w-full bg-black/40 rounded-xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val}s`} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="F1" name="F₁ (প্রয়োগকৃত)" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="F2" name="F₂ (উৎপন্ন)" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-500 font-body italic">ক্ষেত্রফলের পার্থক্যের কারণে বলের পরিমাণ ভিন্ন হয়</p>
        </div>
      </div>
    </div>
  );
}
