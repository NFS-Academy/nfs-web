'use client';

import React, { useState } from 'react';
import { useExperiment } from '../../context/ExperimentContext';
import {
  toBanglaNumber,
  MIN_PRESSURE_HPA,
  MAX_PRESSURE_HPA,
  calculateHeightCmFromHPa,
} from '../../lib/physics';
import { PressureHeightChart } from '../graphs/PressureHeightChart';
import {
  Sliders,
  TrendingDown,
  TrendingUp,
  Minus,
  Play,
  PlusCircle,
  Trash2,
  HelpCircle,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const Tab3PressureVariation: React.FC = () => {
  const {
    pressureHPa,
    mercuryHeightCm,
    targetPressureHPa,
    setTargetPressureHPa,
    selectedPrediction,
    setSelectedPrediction,
    predictionResult,
    runPressureExperiment,
    observationRecords,
    addObservationRecord,
    clearObservationRecords,
    setActiveTab,
  } = useExperiment();

  const [customNoteInput, setCustomNoteInput] = useState<string>('');

  const pressurePresets = [
    { label: '৯৫০ hPa (তীব্র নিম্নচাপ)', value: 950 },
    { label: '৯৮০ hPa (নিম্নচাপ)', value: 980 },
    { label: '১০১৩.২৫ hPa (প্রমাণ চাপ)', value: 1013.25 },
    { label: '১০৩০ hPa (উচ্চচাপ)', value: 1030 },
    { label: '১০৫০ hPa (তীব্র উচ্চচাপ)', value: 1050 },
  ];

  const handleAddCustomRecord = () => {
    addObservationRecord(customNoteInput || undefined);
    setCustomNoteInput('');
  };

  return (
    <div className="space-y-6">
      {/* Overview & Live Readout Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/50 text-cyan-400 text-xs font-semibold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              প্রকৃত অনুসন্ধানমূলক পরীক্ষা
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-slate-100 font-heading leading-tight">
              বায়ুচাপ পরিবর্তনের সাথে পারদস্তম্ভের উচ্চতার সম্পর্ক
            </h2>
            <p className="text-[18px] font-normal text-slate-300 mt-2 leading-relaxed">
              বায়ুর চাপ পরিবর্তন করে পর্যবেক্ষণ করুন কিভাবে ৩ডি কাচনলের ভেতরের পারদের উচ্চতা h = P / (ρg) সূত্রানুযায়ী সরাসরি পরিবর্তিত হয়।
            </p>
          </div>
        </div>

        {/* Live Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">বর্তমান বায়ুচাপ</span>
            <span className="text-xl font-bold font-mono text-cyan-400">
              {toBanglaNumber(pressureHPa, 1)} <span className="text-xs text-slate-400">hPa</span>
            </span>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">পারদস্তম্ভের উচ্চতা</span>
            <span className="text-xl font-bold font-mono text-amber-400">
              {toBanglaNumber(mercuryHeightCm, 1)} <span className="text-xs text-slate-400">cm</span>
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">বায়ুমণ্ডলীয় অবস্থা</span>
            <span className="text-sm font-semibold text-emerald-300 block truncate">
              {pressureHPa < 990
                ? '⚠️ তীব্র নিম্নচাপীয় অবস্থা'
                : pressureHPa < 1008
                ? '🌧️ হালকা নিম্নচাপ'
                : pressureHPa <= 1018
                ? '☀️ স্বাভাবিক প্রমাণ অবস্থা'
                : '🌤️ উচ্চচাপ অঞ্চল'}
            </span>
          </div>
        </div>
      </div>

      {/* POE Activity: Predict -> Experiment -> Observe -> Explain */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-800/50 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-lg border border-cyan-500/30">
            POE লার্নিং চক্র (Predict → Experiment → Observe → Explain)
          </span>
          <span className="text-xs text-slate-400">ধাপ ১: চাপ নির্ধারণ ও অনুমান</span>
        </div>

        {/* 1. Pressure Controller Slider & Presets */}
        <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-sm">
            <label className="font-semibold text-slate-200">
              পরীক্ষার জন্য নতুন বায়ুচাপ নির্বাচন করুন:
            </label>
            <span className="font-mono text-cyan-400 font-bold text-base">
              {toBanglaNumber(targetPressureHPa, 1)} hPa
            </span>
          </div>

          <input
            type="range"
            min={MIN_PRESSURE_HPA}
            max={MAX_PRESSURE_HPA}
            step="1"
            value={targetPressureHPa}
            onChange={(e) => setTargetPressureHPa(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex flex-wrap gap-2 pt-2">
            {pressurePresets.map((p) => (
              <button
                key={p.value}
                onClick={() => setTargetPressureHPa(p.value)}
                className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                  Math.abs(targetPressureHPa - p.value) < 0.5
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Prediction Question */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            অনুমান করুন: চাপ {toBanglaNumber(pressureHPa, 1)} hPa থেকে {toBanglaNumber(targetPressureHPa, 1)} hPa করলে পারদের উচ্চতা কী হবে?
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedPrediction('decrease')}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border font-semibold text-sm transition-all ${
                selectedPrediction === 'decrease'
                  ? 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <TrendingDown className="w-5 h-5 text-rose-400 mb-1" />
              কমবে 📉
            </button>

            <button
              onClick={() => setSelectedPrediction('same')}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border font-semibold text-sm transition-all ${
                selectedPrediction === 'same'
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200 ring-2 ring-amber-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Minus className="w-5 h-5 text-amber-400 mb-1" />
              একই থাকবে ➖
            </button>

            <button
              onClick={() => setSelectedPrediction('increase')}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border font-semibold text-sm transition-all ${
                selectedPrediction === 'increase'
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-5 h-5 text-emerald-400 mb-1" />
              বাড়বে 📈
            </button>
          </div>
        </div>

        {/* 3. Run Experiment Button */}
        <div>
          <button
            onClick={runPressureExperiment}
            disabled={!selectedPrediction}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-base shadow-lg transition-all ${
              !selectedPrediction
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25 active:scale-98'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
            {!selectedPrediction ? 'প্রথমে আপনার অনুমান নির্বাচন করুন' : 'পরীক্ষা চালাও ও পর্যবেক্ষণ কর'}
          </button>
        </div>

        {/* 4. POE Result & Feedback */}
        {predictionResult && predictionResult.tested && (
          <div
            className={`p-4 rounded-xl border animate-fadeIn ${
              predictionResult.isCorrect
                ? 'bg-emerald-950/50 border-emerald-600/70 text-emerald-200'
                : 'bg-amber-950/50 border-amber-600/70 text-amber-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {predictionResult.isCorrect ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <div className="font-bold text-sm">
                  {predictionResult.isCorrect
                    ? '🎉 চমৎকার! আপনার অনুমানটি পদার্থবিজ্ঞানের নিয়মানুযায়ী একদম সঠিক!'
                    : '💡 পর্যবেক্ষণমূলক ব্যাখ্যা:'}
                </div>
                <p className="text-xs text-slate-200/90 mt-1 leading-relaxed">
                  {predictionResult.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Dynamic P vs h Graph */}
      <PressureHeightChart
        records={observationRecords}
        currentPressureHPa={pressureHPa}
        currentHeightCm={mercuryHeightCm}
      />

      {/* Persistent Observation Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              ধারাবাহিক পর্যবেক্ষণ ডাটা টেবিল
            </h3>
            <p className="text-xs text-slate-400">
              আপনার সংগৃহীত সকল পরীক্ষার উপাত্ত এখানে সংরক্ষিত থাকবে (ট্যাব পরিবর্তন করলেও মুছবে না)।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAddCustomRecord()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold rounded-xl transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              + বর্তমান ডাটা যুক্ত করুন
            </button>
            {observationRecords.length > 0 && (
              <button
                onClick={clearObservationRecords}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
                title="টেবিল পরিষ্কার করুন"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="py-2.5 px-3 font-semibold">পরীক্ষা নং</th>
                <th className="py-2.5 px-3 font-semibold">বায়ুমণ্ডলীয় চাপ (<strong>P</strong>)</th>
                <th className="py-2.5 px-3 font-semibold">পারদের উচ্চতা (<strong>h</strong>)</th>
                <th className="py-2.5 px-3 font-semibold">শিক্ষার্থীর পর্যবেক্ষণ ও মন্তব্য</th>
                <th className="py-2.5 px-3 font-semibold text-right">সময়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {observationRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
                    কোনো উপাত্ত এখনো যোগ করা হয়নি। নতুন পরীক্ষা চালান।
                  </td>
                </tr>
              ) : (
                observationRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">
                      #{toBanglaNumber(r.testNumber, 0)}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {toBanglaNumber(r.pressureHPa, 1)} hPa
                      <span className="text-[10px] text-slate-500 block">
                        ({toBanglaNumber(r.pressurePa, 0)} Pa)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                      {toBanglaNumber(r.heightCm, 1)} cm
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{r.notes}</td>
                    <td className="py-2.5 px-3 text-slate-500 text-right font-mono">
                      {r.timestamp}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Link to Tab 4 */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setActiveTab('weather')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition"
          >
            পরবর্তী: আবহাওয়া পূর্বাভাস ও চ্যালেঞ্জ মোডে যান
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
