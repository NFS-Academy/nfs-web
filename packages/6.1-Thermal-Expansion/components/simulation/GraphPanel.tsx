'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface GraphPanelProps {
  data: { temp: number; expansion: number }[];
  materialColor: string;
}

export function GraphPanel({ data, materialColor }: GraphPanelProps) {
  return (
    <div className="w-full h-full bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col">
      <h2 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2 italic">তাপমাত্রা–প্রসারণ গ্রাফ</h2>
      <div className="flex-1 w-full relative min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="temp" 
              stroke="#888" 
              fontSize={10} 
              tickFormatter={(v) => `${Math.round(v)}°`} 
            />
            <YAxis 
              stroke="#888" 
              fontSize={10} 
              tickFormatter={(v) => v.toFixed(1)} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(10,10,12,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              labelFormatter={(v) => `${Number(v).toFixed(1)} °C`}
              formatter={(value: any) => [`${Number(value).toFixed(3)} mm`, 'প্রসারণ (ΔL)']}
            />
            <Line 
              type="monotone" 
              dataKey="expansion" 
              stroke={materialColor} 
              strokeWidth={2} 
              dot={false}
              isAnimationActive={false} // Disable Recharts animation so it streams smoothly
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
