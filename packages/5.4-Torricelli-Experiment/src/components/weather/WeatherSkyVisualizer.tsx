'use client';

import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Wind } from 'lucide-react';

interface WeatherSkyVisualizerProps {
  weatherType: 'clear' | 'stable' | 'rain' | 'storm';
  pressureHPa: number;
}

export const WeatherSkyVisualizer: React.FC<WeatherSkyVisualizerProps> = ({
  weatherType,
  pressureHPa,
}) => {
  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-inner border border-slate-700/60 select-none">
      {/* Dynamic Background Sky */}
      {weatherType === 'clear' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-600 to-indigo-800 flex items-center justify-between p-6">
          <div className="relative">
            <Sun className="w-16 h-16 text-yellow-300 animate-spin-slow filter drop-shadow-lg" />
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-yellow-300/30 animate-ping" />
          </div>
          <div className="text-right text-white drop-shadow">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-90 block">আবহাওয়ার রূপ</span>
            <span className="text-xl font-bold font-heading">পরিষ্কার ও শুষ্ক রোদ</span>
            <span className="text-xs block text-sky-200 mt-0.5">উচ্চচাপীয় বাতাস মেঘ দূরীভূত করেছে</span>
          </div>
        </div>
      )}

      {weatherType === 'stable' && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-slate-600 to-slate-800 flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <Sun className="w-12 h-12 text-amber-300/90" />
            <Cloud className="w-16 h-16 text-white/80 filter drop-shadow" />
          </div>
          <div className="text-right text-white drop-shadow">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-90 block">আবহাওয়ার রূপ</span>
            <span className="text-xl font-bold font-heading">স্বাভাবিক ও শান্ত আবহাওয়া</span>
            <span className="text-xs block text-slate-300 mt-0.5">বায়ুচাপ ও পারদের উচ্চতা স্থির</span>
          </div>
        </div>
      )}

      {weatherType === 'rain' && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-800 to-blue-950 flex items-center justify-between p-6 overflow-hidden">
          <div className="relative flex items-center">
            <CloudRain className="w-16 h-16 text-blue-300 filter drop-shadow animate-bounce" />
            {/* Animated raindrops */}
            <div className="absolute top-12 left-4 flex gap-1">
              <span className="w-0.5 h-4 bg-cyan-300 animate-pulse" />
              <span className="w-0.5 h-6 bg-cyan-200 animate-pulse delay-75" />
              <span className="w-0.5 h-3 bg-cyan-400 animate-pulse delay-150" />
            </div>
          </div>
          <div className="text-right text-white drop-shadow">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-90 block">আবহাওয়ার রূপ</span>
            <span className="text-xl font-bold font-heading text-cyan-200">মেঘলা ও বৃষ্টির সম্ভাবনা</span>
            <span className="text-xs block text-slate-300 mt-0.5">চাপ ধীরে ধীরে হ্রাস পাচ্ছে</span>
          </div>
        </div>
      )}

      {weatherType === 'storm' && (
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-slate-900 to-purple-950 flex items-center justify-between p-6 overflow-hidden">
          <div className="relative flex items-center gap-1">
            <CloudLightning className="w-16 h-16 text-amber-400 filter drop-shadow animate-pulse" />
            <Wind className="w-10 h-10 text-cyan-300 animate-spin" />
            <div className="absolute -inset-4 bg-amber-400/10 rounded-full blur-xl animate-ping" />
          </div>
          <div className="text-right text-white drop-shadow">
            <span className="text-xs uppercase tracking-wider font-semibold text-rose-400 block animate-pulse">⚠️ সতর্কবার্তা</span>
            <span className="text-xl font-bold font-heading text-rose-300">ঝড় ও কালবৈশাখীর আশঙ্কা!</span>
            <span className="text-xs block text-slate-300 mt-0.5">তীব্র ও দ্রুত চাপ পতন (গভীর নিম্নচাপ)</span>
          </div>
        </div>
      )}
    </div>
  );
};
