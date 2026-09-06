'use client';

import React from 'react';
import { useExperiment } from '../context/ExperimentContext';
import { TabId } from '../lib/types';
import { Microscope, Ruler, Sliders, CloudSun } from 'lucide-react';

export const TabNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useExperiment();

  const tabs: Array<{ id: TabId; label: string; icon: React.ReactNode; badge?: string }> = [
    {
      id: 'core',
      label: '🔬 মূল পরীক্ষা',
      icon: <Microscope className="w-4 h-4" />,
    },
    {
      id: 'measurement',
      label: '📏 পরিমাপ ও ব্যাখ্যা',
      icon: <Ruler className="w-4 h-4" />,
    },
    {
      id: 'variation',
      label: '🧪 চাপ পরিবর্তনের পরীক্ষা',
      icon: <Sliders className="w-4 h-4" />,
    },
    {
      id: 'weather',
      label: '🌦️ আবহাওয়া পূর্বাভাস',
      icon: <CloudSun className="w-4 h-4" />,
      badge: 'চ্যালেঞ্জ সহ',
    },
  ];

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 px-4 py-2 sm:px-6">
      <div className="max-w-[1920px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/40'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80'
              }`}
            >
              <span>{t.label}</span>
              {t.badge && (
                <span className="text-[10px] bg-purple-500/40 border border-purple-400/40 text-purple-200 px-1.5 py-0.5 rounded-full font-normal hidden md:inline-block">
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
