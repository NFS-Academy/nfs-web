import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { DataPoint, SimulationPhase } from '@/hooks/useSimulation';
import { PhysicsBody } from '@/lib/physics';
import { toBanglaNumber } from '@/lib/i18n';
import { Thermometer, Droplets, Wind, Snowflake, ArrowRightLeft } from 'lucide-react';

interface PhaseChangeGraphProps {
  history: DataPoint[];
  currentA: PhysicsBody;
  currentB: PhysicsBody;
  phase: SimulationPhase;
  time: number;
}

export function PhaseChangeGraph({ history, currentA, currentB, phase, time }: PhaseChangeGraphProps) {
  // Helper to determine state and process
  const getPhaseState = (body: PhysicsBody) => {
    if (body.material !== 'পানি') {
      return { state: 'Solid', icon: <Thermometer className="w-4 h-4" />, process: 'বোধগম্য তাপ', label: 'উত্তপ্ত/শীতলীকরণ' };
    }
    
    if (body.temp < 0) return { state: 'বরফ', icon: <Snowflake className="w-4 h-4 text-cyan-500" />, process: 'বোধগম্য তাপ', label: 'বরফ উত্তপ্তকরণ' };
    if (body.temp === 0) {
      if (body.massIce > 0 && body.massLiquid > 0) return { state: 'বরফ/পানি', icon: <ArrowRightLeft className="w-4 h-4 text-cyan-400" />, process: 'সুপ্ত তাপ', label: 'গলন / কঠিনীভবন' };
      if (body.massIce > 0) return { state: 'বরফ', icon: <Snowflake className="w-4 h-4 text-cyan-500" />, process: 'বোধগম্য তাপ', label: 'হিমাঙ্কে' };
      return { state: 'পানি', icon: <Droplets className="w-4 h-4 text-blue-500" />, process: 'বোধগম্য তাপ', label: 'হিমাঙ্কে' };
    }
    if (body.temp > 0 && body.temp < 100) return { state: 'পানি', icon: <Droplets className="w-4 h-4 text-blue-500" />, process: 'বোধগম্য তাপ', label: 'উত্তপ্ত/শীতলীকরণ পানি' };
    if (body.temp === 100) {
      if (body.massLiquid > 0 && body.massSteam > 0) return { state: 'পানি/বাষ্প', icon: <ArrowRightLeft className="w-4 h-4 text-slate-400" />, process: 'সুপ্ত তাপ', label: 'স্ফুটন / ঘনীভবন' };
      if (body.massSteam > 0) return { state: 'বাষ্প', icon: <Wind className="w-4 h-4 text-slate-400" />, process: 'বোধগম্য তাপ', label: 'স্ফুটনাঙ্কে' };
      return { state: 'পানি', icon: <Droplets className="w-4 h-4 text-blue-500" />, process: 'বোধগম্য তাপ', label: 'স্ফুটনাঙ্কে' };
    }
    return { state: 'বাষ্প', icon: <Wind className="w-4 h-4 text-slate-400" />, process: 'বোধগম্য তাপ', label: 'উত্তপ্ত/শীতলীকরণ বাষ্প' };
  };

  const stateA = getPhaseState(currentA);
  const stateB = getPhaseState(currentB);

  // Compute domains based on history to ensure graph scales appropriately
  const maxTemp = useMemo(() => {
    if (history.length === 0) return Math.max(currentA.temp, currentB.temp, 110);
    const m = Math.max(...history.map(d => Math.max(d.tempA, d.tempB)));
    return m > 100 ? m + 10 : 110;
  }, [history, currentA, currentB]);

  const minTemp = useMemo(() => {
    if (history.length === 0) return Math.min(currentA.temp, currentB.temp, -10);
    const m = Math.min(...history.map(d => Math.min(d.tempA, d.tempB)));
    return m < 0 ? m - 10 : -10;
  }, [history, currentA, currentB]);

  const maxTime = useMemo(() => {
    if (history.length === 0) return 10;
    const m = Math.max(...history.map(d => d.time));
    return m < 10 ? 10 : m;
  }, [history]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-6 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">লাইভ দশা পরিবর্তন লেখচিত্র</h2>
          <p className="text-sm text-slate-500">তাপমাত্রা বনাম সময় visualization of latent and sensible heat.</p>
        </div>
        {phase === 'EQUILIBRIUM' && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 mt-4 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            তাপীয় সাম্যাবস্থা @ {toBanglaNumber(currentA.temp.toFixed(1))}°C
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">গরম বস্তু: {stateA.label}</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {stateA.icon}
              <span className="font-semibold text-slate-700">{stateA.state}</span>
            </div>
            <div className="text-xl font-mono font-bold text-red-500">{toBanglaNumber(currentA.temp.toFixed(1))}°C</div>
          </div>
          <div className="mt-2 text-xs flex justify-between items-center text-slate-500">
            <span>প্রক্রিয়া: </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${stateA.process === 'সুপ্ত তাপ' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
              {stateA.process}
            </span>
          </div>
          {stateA.process === 'সুপ্ত তাপ' && (
            <div className="mt-2 text-xs text-purple-700 bg-purple-50 rounded px-2 py-1">
              <div className="font-mono font-bold mb-1">{currentA.temp === 0 ? 'Q = mLf' : 'Q = mLv'}</div>
              <div className="text-[10px]">অবস্থা পরিবর্তনের সময় তাপমাত্রা প্রায় স্থির থাকে।</div>
            </div>
          )}
          {stateA.process === 'বোধগম্য তাপ' && phase === 'EXCHANGE' && (
            <div className="mt-2 text-xs text-blue-700 bg-blue-50 rounded px-2 py-1">
              <div className="font-mono font-bold mb-1">Q = m c ΔT</div>
              <div className="text-[10px]">অবস্থা অপরিবর্তিত থাকলে তাপমাত্রা পরিবর্তিত হয়।</div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ঠান্ডা বস্তু: {stateB.label}</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {stateB.icon}
              <span className="font-semibold text-slate-700">{stateB.state}</span>
            </div>
            <div className="text-xl font-mono font-bold text-blue-500">{toBanglaNumber(currentB.temp.toFixed(1))}°C</div>
          </div>
          <div className="mt-2 text-xs flex justify-between items-center text-slate-500">
            <span>প্রক্রিয়া: </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${stateB.process === 'সুপ্ত তাপ' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
              {stateB.process}
            </span>
          </div>
          {stateB.process === 'সুপ্ত তাপ' && (
            <div className="mt-2 text-xs text-purple-700 bg-purple-50 rounded px-2 py-1">
              <div className="font-mono font-bold mb-1">{currentB.temp === 0 ? 'Q = mLf' : 'Q = mLv'}</div>
              <div className="text-[10px]">অবস্থা পরিবর্তনের সময় তাপমাত্রা প্রায় স্থির থাকে।</div>
            </div>
          )}
          {stateB.process === 'বোধগম্য তাপ' && phase === 'EXCHANGE' && (
            <div className="mt-2 text-xs text-blue-700 bg-blue-50 rounded px-2 py-1">
              <div className="font-mono font-bold mb-1">Q = m c ΔT</div>
              <div className="text-[10px]">অবস্থা অপরিবর্তিত থাকলে তাপমাত্রা পরিবর্তিত হয়।</div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[400px] w-full relative select-none">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <ReferenceArea y1={100} y2={maxTemp} fill="#f8fafc" fillOpacity={0.5} />
            <ReferenceArea y1={0} y2={100} fill="#f0f9ff" fillOpacity={0.3} />
            <ReferenceArea y1={minTemp} y2={0} fill="#ecfeff" fillOpacity={0.3} />

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis 
              dataKey="time" 
              type="number" 
              domain={[0, maxTime]} 
              tickFormatter={(v) => toBanglaNumber(v.toFixed(0)) + 's'} 
              stroke="#94a3b8" 
              fontSize={12} 
              label={{ value: 'সময় (s)', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              domain={[minTemp, maxTemp]} 
              stroke="#94a3b8" 
              fontSize={12} 
              tickFormatter={(v) => toBanglaNumber(v.toFixed(0)) + '°C'}
              label={{ value: 'তাপমাত্রা (°C)', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const tA = payload.find(p => p.dataKey === 'tempA')?.value as number;
                  const tB = payload.find(p => p.dataKey === 'tempB')?.value as number;
                  
                  const getHistoryState = (t: number) => {
                    if (t < 0) return { state: 'বরফ', process: 'বোধগম্য তাপ' };
                    if (t === 0) return { state: 'বরফ/পানি', process: 'সুপ্ত তাপ' };
                    if (t > 0 && t < 100) return { state: 'পানি', process: 'বোধগম্য তাপ' };
                    if (t === 100) return { state: 'পানি/বাষ্প', process: 'সুপ্ত তাপ' };
                    return { state: 'বাষ্প', process: 'বোধগম্য তাপ' };
                  };

                  return (
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-3 rounded-lg shadow-lg">
                      <div className="text-xs font-bold text-slate-500 mb-2">সময়: {Number(label).toFixed(1)}s</div>
                      {tA !== undefined && (
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-sm font-medium text-slate-700">গরম বস্তু:</span>
                            <span className="text-sm font-mono font-bold text-red-600">{toBanglaNumber(tA.toFixed(1))}°C</span>
                          </div>
                          <div className="text-xs text-slate-500 ml-4">অবস্থা: {getHistoryState(tA).state}</div>
                          <div className="text-xs text-slate-500 ml-4">প্রক্রিয়া: {getHistoryState(tA).process}</div>
                        </div>
                      )}
                      {tB !== undefined && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-sm font-medium text-slate-700">ঠান্ডা বস্তু:</span>
                            <span className="text-sm font-mono font-bold text-blue-600">{toBanglaNumber(tB.toFixed(1))}°C</span>
                          </div>
                          <div className="text-xs text-slate-500 ml-4">অবস্থা: {getHistoryState(tB).state}</div>
                          <div className="text-xs text-slate-500 ml-4">প্রক্রিয়া: {getHistoryState(tB).process}</div>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <ReferenceLine y={100} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '১০০°C - স্ফুটন/ঘনীভবন', fill: '#64748b', fontSize: 11 }} />
            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '০°C - গলন/কঠিনীভবন', fill: '#64748b', fontSize: 11 }} />
            
            {history.length > 0 && phase === 'EXCHANGE' && (
              <ReferenceLine x={time} stroke="#cbd5e1" strokeDasharray="3 3" />
            )}

            <Line 
              type="monotone" 
              dataKey="tempA" 
              name="গরম বস্তু" 
              stroke="#ef4444" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#ef4444' }}
              isAnimationActive={false} 
            />
            <Line 
              type="monotone" 
              dataKey="tempB" 
              name="ঠান্ডা বস্তু" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
              isAnimationActive={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-6 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-red-500 rounded-full" />
          <span className="text-sm text-slate-600 font-medium">গরম বস্তু</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500 rounded-full" />
          <span className="text-sm text-slate-600 font-medium">ঠান্ডা বস্তু</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#f0f9ff] border border-[#e0f2fe] rounded" />
          <span className="text-sm text-slate-500">তরল অবস্থা</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#ecfeff] border border-[#cffafe] rounded" />
          <span className="text-sm text-slate-500">কঠিন অবস্থা</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#f8fafc] border border-[#f1f5f9] rounded" />
          <span className="text-sm text-slate-500">গ্যাসীয় অবস্থা</span>
        </div>
      </div>
    </div>
  );
}
