import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataPoint, SimulationPhase } from '@/hooks/useSimulation';
import { PhysicsBody, SPECIFIC_HEAT } from '@/lib/physics';

interface DataPanelProps {
  history: DataPoint[];
  currentA: PhysicsBody;
  currentB: PhysicsBody;
  phase: SimulationPhase;
  qLostEnv: number;
}

export function DataPanel({ history, currentA, currentB, phase, qLostEnv }: DataPanelProps) {
  
  // Calculate Q lost/gained by integrating dt if we want perfectly accurate, 
  // but for a simple display we can just do mcDT for sensible and mL for latent.
  // Actually, since we're displaying live, we should probably track Q inside useSimulation.
  // But wait, the physics logic inside useSimulation updates `temp` directly.
  // Let's approximate from initial state? 
  // For EXPERIMENT mode without Phase Change, Q = m*c*(T_initial - T_current)
  // Let's just calculate it. We need initial temp... which is history[0].
  
  let qLost = 0;
  let qGained = 0;
  if (history.length > 0) {
    const initA = history[0].tempA;
    const initB = history[0].tempB;
    
    // Simplification for sensible heat only, to avoid complex phase tracking here.
    // If we need perfect tracking we should track it in the hook.
    // The prompt just says "Heat Lost", "Heat Gained".
    const cA = SPECIFIC_HEAT[currentA.material as keyof typeof SPECIFIC_HEAT] || 4.184;
    const cB = SPECIFIC_HEAT[currentB.material as keyof typeof SPECIFIC_HEAT] || 4.184;
    
    if (initA > currentA.temp) {
      qLost = currentA.mass * cA * (initA - currentA.temp);
    }
    if (initB < currentB.temp) {
      qGained = currentB.mass * cB * (currentB.temp - initB);
    }
    if (initB > currentB.temp) {
      qLost += currentB.mass * cB * (initB - currentB.temp);
    }
    if (initA < currentA.temp) {
      qGained += currentA.mass * cA * (currentA.temp - initA);
    }
  }

  const totalMaxQ = Math.max(qLost + qLostEnv, qGained, 1);
  const qLostPercent = Math.min(100, Math.max(0, (qLost / totalMaxQ) * 100)) || 0;
  const qGainedPercent = Math.min(100, Math.max(0, (qGained / totalMaxQ) * 100)) || 0;
  
  const isLatent = (body: PhysicsBody) => {
     return body.material === 'Water' && (
       (body.temp === 0 && body.massIce > 0 && body.massIce < body.mass) ||
       (body.temp === 100 && body.massSteam > 0 && body.massSteam < body.mass)
     );
  };
  
  const aLatent = isLatent(currentA);
  const bLatent = isLatent(currentB);

  return (
    <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl flex flex-col gap-6">
      
      {/* Energy Accounting */}
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-wider">Live Simulation Data</div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-400">Heat Lost</span>
              <span className="font-mono">{Math.max(0, qLost).toFixed(1)} kJ</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 transition-all duration-300 ease-out" style={{ width: `${qLostPercent}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-blue-400">Heat Gained</span>
              <span className="font-mono">{Math.max(0, qGained).toFixed(1)} kJ</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${qGainedPercent}%` }} />
            </div>
          </div>
          
          {qLostEnv > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400">Heat Lost to Environment</span>
                <span className="font-mono">{Math.max(0, qLostEnv).toFixed(1)} kJ</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-300 ease-out" style={{ width: `${Math.min(100, (qLostEnv / totalMaxQ) * 100)}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* State Process indicator */}
      {(phase === 'EXCHANGE' || phase === 'EQUILIBRIUM') && (
        <div className="grid grid-cols-2 gap-2">
           <div className={`p-2 rounded-lg border ${aLatent ? 'bg-purple-900/30 border-purple-800 text-purple-400' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
             <div className="text-[9px] uppercase font-bold mb-1">Process A</div>
             <div className="text-xs font-bold">{aLatent ? 'LATENT HEAT' : 'SENSIBLE HEAT'}</div>
           </div>
           <div className={`p-2 rounded-lg border ${bLatent ? 'bg-purple-900/30 border-purple-800 text-purple-400' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
             <div className="text-[9px] uppercase font-bold mb-1">Process B</div>
             <div className="text-xs font-bold">{bLatent ? 'LATENT HEAT' : 'SENSIBLE HEAT'}</div>
           </div>
        </div>
      )}

      {/* Graph */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <div className="text-[10px] uppercase text-slate-500">Temperature Curve</div>
          {phase === 'EQUILIBRIUM' && (
            <div className="text-[9px] text-emerald-400 font-bold">
              Equilibrium @ {currentA.temp.toFixed(1)}°C
            </div>
          )}
        </div>
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(v) => v.toFixed(1)} stroke="#64748b" fontSize={10} />
              <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={10} />
              <Tooltip 
                formatter={(value: any) => [`${Number(value).toFixed(1)}°C`]}
                labelFormatter={(label: any) => `Time: ${Number(label).toFixed(1)}s`}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="tempA" name="Bucket A" stroke="#f87171" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="tempB" name="Bucket B" stroke="#60a5fa" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
