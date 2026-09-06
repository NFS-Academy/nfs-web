'use client';

import { useSimulationStore } from '@/lib/store';
import { useMemo, useEffect, useState } from 'react';
import { Info } from 'lucide-react';

export function ContextualHints() {
  const isPlaying = useSimulationStore(state => state.isPlaying);
  const brickMass = useSimulationStore(state => state.brickMass);
  const waterDensity = useSimulationStore(state => state.waterDensity);
  const brickHeight = useSimulationStore(state => state.brickHeight);
  const brickWidth = useSimulationStore(state => state.brickWidth);
  const brickDepth = useSimulationStore(state => state.brickDepth);
  const brickPosition = useSimulationStore(state => state.brickPosition);
  const getCurrentWaterLevel = useSimulationStore(state => state.getCurrentWaterLevel);

  const hint = useMemo(() => {
    if (!isPlaying) return null;

    const waterLevel = getCurrentWaterLevel();
    const top = brickPosition.y + brickHeight / 2;
    const bottom = brickPosition.y - brickHeight / 2;
    const brickVolume = brickHeight * brickWidth * brickDepth;
    const brickDensity = brickMass / brickVolume;
    
    if (bottom < waterLevel && top > waterLevel) {
      return "বস্তু যত বেশি পানিতে নিমজ্জিত হয়, স্থানচ্যুত পানির আয়তন তত বাড়ে।";
    } else if (bottom < waterLevel && top <= waterLevel && Math.abs(brickDensity - waterDensity) < 5) {
      return "নিমজ্জিত অবস্থায় বস্তুটি যেখানে রাখা হয় সেখানেই স্থির থাকে।";
    } else if (bottom < waterLevel && Math.abs(brickDensity - waterDensity) > 5) {
      return "পানির গভীরতা বাড়ার সাথে সাথে তরলের চাপ বৃদ্ধি পায়।";
    }

    return null;
  }, [isPlaying, brickPosition.y, brickHeight, brickWidth, brickDepth, brickMass, waterDensity, getCurrentWaterLevel]);

  if (!hint) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-900/40 border border-blue-500/50 backdrop-blur text-blue-200 px-4 py-2 rounded-full text-[12px] font-heading flex items-center gap-2 shadow-lg z-10 transition-all duration-300 pointer-events-none">
      <Info className="w-4 h-4" />
      <span>{hint}</span>
    </div>
  );
}
