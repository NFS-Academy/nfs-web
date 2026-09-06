"use client";

import { useExperimentStore } from "@/store/experimentStore";
import { SingleCrownUI } from "./SingleCrownUI";
import { MultiCrownUI } from "./MultiCrownUI";
import React from "react";

export function ExperimentUI({ children }: { children: React.ReactNode }) {
  const store = useExperimentStore();

  return (
    <div className="flex flex-col h-full bg-transparent p-4 font-sans text-slate-200">
      {/* Top Navigation for switching modes */}
      <div className="flex gap-4 mb-4 justify-center">
        <button
          onClick={() => { store.resetExperiment(); store.setExperimentMode('SINGLE'); }}
          className={`px-8 py-3 rounded-full text-sm tracking-wide font-medium transition-all duration-500 ${store.experimentMode === 'SINGLE' ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-black/20 dark:bg-white/5 text-slate-300 hover:bg-white/10 ring-1 ring-white/10 backdrop-blur-md'}`}
        >
          মূল পরীক্ষা
        </button>
        <button
          onClick={() => { store.resetExperiment(); store.setExperimentMode('MULTI'); store.setAppState('MULTI_INTRO'); }}
          className={`px-8 py-3 rounded-full text-sm tracking-wide font-medium transition-all duration-500 ${store.experimentMode === 'MULTI' ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-black/20 dark:bg-white/5 text-slate-300 hover:bg-white/10 ring-1 ring-white/10 backdrop-blur-md'}`}
        >
          ৩টি মুকুট শনাক্তকরণ ল্যাব
        </button>
      </div>

      {store.experimentMode === 'SINGLE' ? (
        <SingleCrownUI>{children}</SingleCrownUI>
      ) : (
        <MultiCrownUI>{children}</MultiCrownUI>
      )}
    </div>
  );
}
