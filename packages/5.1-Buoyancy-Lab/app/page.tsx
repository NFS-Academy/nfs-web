import BuoyancyScene from '@/components/simulation/BuoyancyScene';
import BuoyancyDataPanel from '@/components/ui/BuoyancyDataPanel';
import { SimulationControls } from '@/components/ui/SimulationControls';
import VariableControls from '@/components/ui/VariableControls';
import { Graphs } from '@/components/ui/Graphs';
import { DensityComparison } from '@/components/educational/DensityComparison';
import { ExperimentMode } from '@/components/educational/ExperimentMode';
import { Presets } from '@/components/educational/Presets';
import { DynamicExplanation } from '@/components/educational/DynamicExplanation';
import { PhysicsReference } from '@/components/educational/PhysicsReference';
import { ContextualHints } from '@/components/educational/ContextualHints';
import { PredictionActivity } from '@/components/educational/PredictionActivity';

export default function Home() {
  return (
    <main className="min-h-[100dvh] md:h-[100dvh] w-full bg-[#050505] text-[#e5e7eb] flex flex-col md:flex-row font-sans md:overflow-hidden">
      
      {/* 3D LABORATORY AREA (Left: ~70-75%) */}
      <div className="w-full md:flex-1 h-[50vh] min-h-[400px] md:min-h-0 md:h-full shrink-0 relative bg-[#0a0a0a] overflow-hidden flex flex-col border-b md:border-b-0 md:border-r border-white/10">
        
        {/* Top Left Title Overlay */}
        <div className="absolute top-4 left-4 md:left-6 z-10 pointer-events-none flex flex-col gap-1">
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white inline drop-shadow-md font-heading">
              বাস্তব জীবনে প্লবতা
            </h1>
          </div>
          <p className="text-[10px] md:text-xs text-gray-300 uppercase tracking-widest font-semibold drop-shadow-md font-heading">
            ৯ম–১০ম শ্রেণির পদার্থবিজ্ঞান | আর্কিমিডিসের নীতি
          </p>
        </div>

        {/* Hints Overlay */}
        <ContextualHints />

        {/* 3D Canvas */}
        <div className="flex-1 w-full h-full relative">
          <BuoyancyScene />
        </div>

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[95%] max-w-lg">
          <SimulationControls />
        </div>
      </div>

      {/* EDUCATIONAL SIDEBAR (Right: ~25-30%, fixed width on desktop) */}
      <div className="w-full md:w-[320px] lg:w-[380px] xl:w-[420px] h-auto md:h-full flex flex-col bg-[#050505] shrink-0">
         <div className="flex-1 md:overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
            <BuoyancyDataPanel />
            <VariableControls />
            <DensityComparison />
            <Presets />
            <PhysicsReference />
            <PredictionActivity />
            <ExperimentMode />
            <Graphs />
            <DynamicExplanation />
         </div>
      </div>
    </main>
  );
}
