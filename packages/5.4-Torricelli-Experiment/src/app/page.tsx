'use client';

import React from 'react';
import { ExperimentProvider, useExperiment } from '../context/ExperimentContext';
import { Header } from '../components/Header';
import { TabNavigation } from '../components/TabNavigation';
import { TorricelliCanvas } from '../components/laboratory/TorricelliCanvas';
import { Tab1CoreExperiment } from '../components/tabs/Tab1CoreExperiment';
import { Tab2MeasurementTheory } from '../components/tabs/Tab2MeasurementTheory';
import { Tab3PressureVariation } from '../components/tabs/Tab3PressureVariation';
import { Tab4WeatherAndChallenge } from '../components/tabs/Tab4WeatherAndChallenge';

const SimulationMain: React.FC = () => {
  const { activeTab } = useExperiment();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Main Navigation Bar */}
      <Header />
      <TabNavigation />

      {/* Main Responsive Simulation Workspace: 70% Left Panel (3D Lab) & 30% Right Panel (Data/Controls) */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
          {/* Left Column (Desktop 70%) / Top Section (Mobile): 3D Laboratory Apparatus */}
          <div className="w-full lg:w-[70%] lg:sticky lg:top-24 space-y-3 flex-shrink-0">
            <div className="w-full h-[450px] sm:h-[540px] lg:h-[720px] xl:h-[800px] 2xl:h-[860px]">
              <TorricelliCanvas className="w-full h-full" />
            </div>

            {/* Quick Helper Subtext under 3D canvas */}
            <div className="hidden lg:flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-800">
              <span className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <span>🔬</span> ভার্চুয়াল ৩ডি পদার্থবিজ্ঞান ল্যাবরেটরি (প্রধান কর্মক্ষেত্র)
              </span>
              <span className="text-xs text-slate-400">স্ক্রোল করে জুম করুন এবং যন্ত্রপাতি ড্র্যাগ করে প্রস্তুত করুন</span>
            </div>
          </div>

          {/* Right Column (Desktop 30%) / Bottom Section (Mobile): Interactive Tab Data & Controls */}
          <div className="w-full lg:w-[30%] space-y-6 flex-1 min-w-0">
            {/* Active Tab Views (Rendered dynamically while maintaining 100% persistent state via context) */}
            <div className={activeTab === 'core' ? 'block' : 'hidden'}>
              <Tab1CoreExperiment />
            </div>

            <div className={activeTab === 'measurement' ? 'block' : 'hidden'}>
              <Tab2MeasurementTheory />
            </div>

            <div className={activeTab === 'variation' ? 'block' : 'hidden'}>
              <Tab3PressureVariation />
            </div>

            <div className={activeTab === 'weather' ? 'block' : 'hidden'}>
              <Tab4WeatherAndChallenge />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <p>
          বাংলাদেশ জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) • ৯ম-১০ম শ্রেণি পদার্থবিজ্ঞান • অধ্যায় ৫: “পদার্থের অবস্থা ও চাপ”
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          টরিসেলির পরীক্ষা ও আবহাওয়া পরিবর্তনের সম্পর্ক — সম্পূর্ণ রিয়েল-টাইম পদার্থবিজ্ঞান সমীকরণ (P = ρgh) দ্বারা চালিত ৩ডি সিমুলেশন।
        </p>
      </footer>
    </div>
  );
};

export default function Page() {
  return (
    <ExperimentProvider>
      <SimulationMain />
    </ExperimentProvider>
  );
}
