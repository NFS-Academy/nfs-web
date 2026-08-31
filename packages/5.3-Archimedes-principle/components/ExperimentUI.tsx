"use client";

import { useExperimentStore } from "@/store/experimentStore";
import { SingleCrownUI } from "./SingleCrownUI";
import { MultiCrownUI } from "./MultiCrownUI";
import React from "react";

export function ExperimentUI({ children }: { children: React.ReactNode }) {
  const store = useExperimentStore();

  return (
    <div className="flex flex-col h-full bg-slate-950 p-4 font-sans text-slate-200 selection:bg-amber-500/30">
      {/* Top Navigation for switching modes */}
      <div className="flex gap-4 mb-4 justify-center">
        <button
          onClick={() => { store.resetExperiment(); store.setExperimentMode('SINGLE'); }}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${store.experimentMode === 'SINGLE' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
        >
          মূল পরীক্ষা
        </button>
        <button
          onClick={() => { store.resetExperiment(); store.setExperimentMode('MULTI'); store.setAppState('MULTI_INTRO'); }}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${store.experimentMode === 'MULTI' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
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
