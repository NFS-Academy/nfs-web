import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface DataPoint {
  heat: number;
  water: number;
  iron: number;
  copper: number;
}

interface LiveGraphProps {
  dataHistory: DataPoint[];
  mode?: 'sameHeat' | 'sameTemp';
  currentHeats?: { water: number, iron: number, copper: number };
}

export function LiveGraph({ dataHistory, mode = 'sameHeat', currentHeats }: LiveGraphProps) {
  if (mode === 'sameTemp' && currentHeats) {
    const barData = [
      { name: 'পানি', heat: currentHeats.water, fill: '#1d4ed8' },
      { name: 'লোহা', heat: currentHeats.iron, fill: '#374151' },
      { name: 'তামা', heat: currentHeats.copper, fill: '#92400e' }
    ];

    return (
      <div className="h-full w-full flex flex-col">
        <h3 className="text-lg font-heading font-bold text-[#5a5a40] mb-2">প্রয়োজনীয় তাপের তুলনা</h3>
        <div className="flex-1 w-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e1e1d8" vertical={false} />
              <XAxis dataKey="name" stroke="#8a8a70" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 3500]} stroke="#8a8a70" fontSize={10} tickFormatter={(val) => `${val}J`} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: '#fdfdfb', border: '1px solid #d1d1c4', borderRadius: '8px', fontSize: '12px', fontFamily: 'var(--font-noto-serif-bengali)' }}
                formatter={(value: any) => [`${Math.round(value)} J`, 'প্রয়োজনীয় তাপ']}
              />
              <Bar dataKey="heat" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-lg font-serif italic text-[#5a5a40] mb-2">Temperature vs. Heat Added</h3>
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataHistory} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>

            <CartesianGrid strokeDasharray="3 3" stroke="#e1e1d8" />
            <XAxis dataKey="heat" type="number" domain={[0, 'dataMax']} name="Heat Added (J)" tickFormatter={(val) => `${val}J`} stroke="#8a8a70" fontSize={10} />
            <YAxis domain={[25, 300]} tickFormatter={(val) => `${val}°`} stroke="#8a8a70" fontSize={10} />
            <Tooltip 
              formatter={(value: any) => [`${value.toFixed(1)} °C`, 'Temperature']}
              labelFormatter={(label: any) => `Heat: ${Math.round(label)} J`}
              contentStyle={{ backgroundColor: '#fdfdfb', border: '1px solid #d1d1c4', borderRadius: '8px', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line type="monotone" dataKey="water" name="Water" stroke="#1d4ed8" strokeWidth={3} dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="iron" name="Iron" stroke="#374151" strokeWidth={3} dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="copper" name="Copper" stroke="#92400e" strokeWidth={3} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
