'use client';

import { useSimulationStore } from '@/lib/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

export function Graphs() {
  const showGraphs = useSimulationStore(state => state.showGraphs);
  const setVariable = useSimulationStore(state => state.setVariable);
  const graphData = useSimulationStore(state => state.graphData);
  
  const [activeTab, setActiveTab] = useState<'depth' | 'position' | 'forces'>('forces');
  
  if (!showGraphs) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/95 backdrop-blur-md p-4 rounded-xl border border-white/10 z-50 shadow-2xl font-body">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('forces')}
            className={`px-3 py-1.5 text-[12px] rounded transition-colors font-heading ${activeTab === 'forces' ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            সময় বনাম বল
          </button>
          <button 
            onClick={() => setActiveTab('position')}
            className={`px-3 py-1.5 text-[12px] rounded transition-colors font-heading ${activeTab === 'position' ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            সময় বনাম অবস্থান
          </button>
          <button 
            onClick={() => setActiveTab('depth')}
            className={`px-3 py-1.5 text-[12px] rounded transition-colors font-heading ${activeTab === 'depth' ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            নিমজ্জিত গভীরতা বনাম প্লবন বল
          </button>
        </div>
        <button 
          onClick={() => setVariable('showGraphs', false)}
          className="text-white/50 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="h-[200px] w-full text-[11px] font-sans">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey={activeTab === 'depth' ? 'submergedDepth' : 'time'} 
              stroke="#666" 
              tick={{ fill: '#888' }}
              type="number"
              domain={['dataMin', 'dataMax']}
            />
            <YAxis stroke="#666" tick={{ fill: '#888' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend wrapperStyle={{ fontFamily: 'var(--font-heading)' }} />
            
            {activeTab === 'forces' && (
              <>
                <Line type="monotone" dataKey="buoyantForce" stroke="#3b82f6" dot={false} strokeWidth={2} name="প্লবন বল (N)" isAnimationActive={false} />
                <Line type="monotone" dataKey="weight" stroke="#ef4444" dot={false} strokeWidth={2} name="ওজন (N)" isAnimationActive={false} />
                <Line type="monotone" dataKey="netForce" stroke="#10b981" dot={false} strokeWidth={2} name="লব্ধি বল (N)" isAnimationActive={false} />
              </>
            )}
            
            {activeTab === 'position' && (
              <Line type="monotone" dataKey="position" stroke="#f59e0b" dot={false} strokeWidth={2} name="অবস্থান (m)" isAnimationActive={false} />
            )}

            {activeTab === 'depth' && (
              <Line type="monotone" dataKey="buoyantForce" stroke="#3b82f6" dot={false} strokeWidth={2} name="প্লবন বল (N)" isAnimationActive={false} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
