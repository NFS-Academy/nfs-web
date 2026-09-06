'use client';

import React from 'react';
import { useSimulation } from '@/hooks/useSimulation';
import { ExperimentScene } from '@/components/ExperimentScene';
import { MolecularView } from '@/components/MolecularView';
import { Controls } from '@/components/Controls';
import { DataPanel } from '@/components/DataPanel';
import { LearningPanel } from '@/components/LearningPanel';
import { ModeSelector } from '@/components/ModeSelector';
import { PresetsBar } from '@/components/PresetsBar';
import { HistoryPanel } from '@/components/HistoryPanel';
import { PhaseChangeGraph } from '@/components/PhaseChangeGraph';

export default function App() {
  const sim = useSimulation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight font-heading">
            তাপের আদান-প্রদান নীতি <span className="text-slate-400 font-light ml-2 text-lg hidden sm:inline-block">উচ্চ তাপমাত্রার বস্তু থেকে নিম্ন তাপমাত্রার বস্তুর দিকে তাপ স্থানান্তরিত হয়।</span>
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            নবম-দশম শ্রেণি পদার্থবিজ্ঞান • এনসিটিবি শিক্ষাক্রম
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        <ModeSelector mode={sim.mode} setMode={sim.setMode} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative flex flex-col overflow-hidden">
              <ExperimentScene
                phase={sim.phase}
                currentA={sim.currentA}
                currentB={sim.currentB}
                view={sim.view}
              />

              <div className="bg-slate-50 p-6 border-t border-slate-100">
                <Controls
                  mode={sim.mode}
                  massA={sim.massA} setMassA={sim.setMassA}
                  tempA={sim.tempA} setTempA={sim.setTempA}
                  matA={sim.matA} setMatA={sim.setMatA}
                  massB={sim.massB} setMassB={sim.setMassB}
                  tempB={sim.tempB} setTempB={sim.setTempB}
                  matB={sim.matB} setMatB={sim.setMatB}
                  envLoss={sim.envLoss} setEnvLoss={sim.setEnvLoss}
                  phase={sim.phase}
                  startSimulation={sim.startSimulation}
                  resetSimulation={sim.resetSimulation}
                  isPaused={sim.isPaused} setIsPaused={sim.setIsPaused}
                  speed={sim.speed} setSpeed={sim.setSpeed}
                />
                
                <PresetsBar 
                  mode={sim.mode}
                  setMassA={sim.setMassA} setTempA={sim.setTempA} setMatA={sim.setMatA}
                  setMassB={sim.setMassB} setTempB={sim.setTempB} setMatB={sim.setMatB}
                  setEnvLoss={sim.setEnvLoss}
                  isDisabled={sim.phase !== 'SETUP'}
                />
              </div>
            </div>

            {sim.view === 'MICRO' && (
              <div className="bg-slate-900 rounded-2xl p-6 overflow-hidden">
                 <h2 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-4 font-heading">আণবিক দৃশ্য (ধারণাগত)</h2>
                 <MolecularView 
                   phase={sim.phase}
                   currentA={sim.currentA}
                   currentB={sim.currentB}
                 />
              </div>
            )}
            
            {sim.mode === 'EXPERIMENT' && <HistoryPanel history={sim.resultsHistory} />}
            
            {sim.mode === 'PHASE_CHANGE' && (
              <PhaseChangeGraph 
                history={sim.history} 
                currentA={sim.currentA} 
                currentB={sim.currentB} 
                phase={sim.phase} 
                time={sim.time} 
              />
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <DataPanel 
              history={sim.history}
              currentA={sim.currentA}
              currentB={sim.currentB}
              phase={sim.phase}
              qLostEnv={sim.qLostEnv}
            />

            <LearningPanel mode={sim.mode} />
          </div>
        </div>

      </main>
    </div>
  );
}
