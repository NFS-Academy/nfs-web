'use client';

import { PhysicsProvider } from '@/lib/physics-context';
import Simulation from '@/components/Simulation';
import ControlPanel from '@/components/ControlPanel';
import CalculationPanel from '@/components/CalculationPanel';
import PressureGauge from '@/components/PressureGauge';
import PhysicsGraphs from '@/components/PhysicsGraphs';
import ExplanationTab from '@/components/ExplanationTab';
import ChallengeTab from '@/components/ChallengeTab';
import ApplicationsTab from '@/components/ApplicationsTab';
import LearnTab from '@/components/LearnTab';
import { Beaker } from 'lucide-react';
import { useState } from 'react';

function AppContent() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-2xl mb-2">
            <Beaker className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-100 tracking-tight">
            প্যাসকেলের সূত্র ও হাইড্রোলিক প্রেস
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-body">
            কীভাবে একটি ছোট বল ব্যবহার করে একটি বড় ওজন তোলা সম্ভব?
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto pb-2 border-b border-white/10 gap-2 hide-scrollbar">
          {[
            { id: 1, label: 'মূল পরীক্ষা' },
            { id: 2, label: 'কেন এমন হয়?' },
            { id: 3, label: 'চ্যালেঞ্জ' },
            { id: 4, label: 'বাস্তব প্রয়োগ' },
            { id: 5, label: 'শিখে নাও' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-t-xl font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[#111114] text-blue-400 border-x border-t border-white/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid xl:grid-cols-12 gap-8 flex-col-reverse xl:flex-row">
          {/* Left Column: 3D Simulation (Visible for Tabs 1, 2, 3) */}
          <div className={`${activeTab >= 4 ? 'xl:col-span-12' : 'xl:col-span-7'} space-y-6`}>
            {activeTab <= 3 && (
              <section className="bg-[#111114] p-1 rounded-[2rem] shadow-sm border border-white/10 animate-in fade-in duration-500">
                <Simulation />
              </section>
            )}
            {activeTab === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <PressureGauge />
              </div>
            )}
            
            {activeTab === 4 && <ApplicationsTab />}
            {activeTab === 5 && <LearnTab />}
          </div>

          {/* Right Column: Controls, Explanations, Graphs */}
          <div className="xl:col-span-5 space-y-6">
            {activeTab === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ControlPanel />
                <CalculationPanel />
                <PhysicsGraphs />
              </div>
            )}

            {activeTab === 2 && <ExplanationTab />}
            {activeTab === 3 && (
              <>
                <ChallengeTab />
                <ControlPanel />
              </>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default function Home() {
  return (
    <PhysicsProvider>
      <AppContent />
    </PhysicsProvider>
  );
}
