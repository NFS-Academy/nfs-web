'use client';

import { useSimulationStore } from '@/lib/store';
import { useMemo } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const CHALLENGES = [
  { id: 1, title: 'ইটটিকে পানিতে ভাসাও' },
  { id: 2, title: 'ইটটিকে সম্পূর্ণ পানির নিচে রেখে স্থির করো' },
  { id: 3, title: 'প্লবন বল ও ওজন সমান করো' },
];

export function ExperimentMode() {
  const activeChallenge = useSimulationStore(state => state.activeChallenge);
  const setActiveChallenge = useSimulationStore(state => state.setActiveChallenge);
  
  const brickMass = useSimulationStore(state => state.brickMass);
  const waterDensity = useSimulationStore(state => state.waterDensity);
  const brickHeight = useSimulationStore(state => state.brickHeight);
  const brickWidth = useSimulationStore(state => state.brickWidth);
  const brickDepth = useSimulationStore(state => state.brickDepth);
  const brickPosition = useSimulationStore(state => state.brickPosition);
  const brickVelocity = useSimulationStore(state => state.brickVelocity);
  const getCurrentWaterLevel = useSimulationStore(state => state.getCurrentWaterLevel);
  const gravity = useSimulationStore(state => state.gravity);

  const status = useMemo(() => {
    if (!activeChallenge) return false;
    
    const brickVolume = brickHeight * brickWidth * brickDepth;
    const brickDensity = brickMass / brickVolume;
    const waterLevel = getCurrentWaterLevel();
    const isStationary = Math.abs(brickVelocity.y) < 0.05;

    if (activeChallenge === 1) {
      // Float
      return isStationary && brickDensity < waterDensity && brickPosition.y > (waterLevel - brickHeight/2);
    }
    if (activeChallenge === 2) {
      // Neutral Buoyancy
      const atBottom = brickPosition.y - brickHeight/2 <= 0.1;
      const fullySubmerged = (brickPosition.y + brickHeight/2) < waterLevel;
      return isStationary && fullySubmerged && !atBottom && Math.abs(brickDensity - waterDensity) < 5;
    }
    if (activeChallenge === 3) {
      // Balance Forces (F_B == W) - Can be floating OR neutral
      const weight = brickMass * gravity;
      // Approximate submerged volume
      const bottom = brickPosition.y - brickHeight/2;
      const top = brickPosition.y + brickHeight/2;
      let subH = 0;
      if (bottom < waterLevel) {
        subH = top <= waterLevel ? brickHeight : waterLevel - bottom;
      }
      const subVol = subH * brickWidth * brickDepth;
      const fb = waterDensity * gravity * subVol;
      return isStationary && Math.abs(fb - weight) < 5 && subH > 0;
    }

    return false;
  }, [activeChallenge, brickMass, waterDensity, brickHeight, brickWidth, brickDepth, brickPosition.y, brickVelocity.y, getCurrentWaterLevel, gravity]);

  return (
    <div className="bg-[#111111] p-4 rounded-xl border border-white/10 flex flex-col gap-4 font-body">
      <div className="flex justify-between items-center">
        <h3 className="text-white/90 font-medium tracking-wide text-sm font-heading">পরীক্ষা</h3>
        {activeChallenge && (
          <button 
            onClick={() => setActiveChallenge(null)}
            className="text-[11px] text-white/50 hover:text-white font-heading"
          >
            বাতিল করো
          </button>
        )}
      </div>

      <div className="space-y-2">
        {CHALLENGES.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveChallenge(c.id)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${
              activeChallenge === c.id 
                ? (status ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-blue-500/10 border-blue-500/30')
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="mt-0.5">
              {activeChallenge === c.id && status ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Circle className={`w-4 h-4 ${activeChallenge === c.id ? 'text-blue-400' : 'text-white/30'}`} />
              )}
            </div>
            <div>
              <div className={`text-[12px] font-heading ${activeChallenge === c.id ? 'text-white' : 'text-white/70'}`}>
                {c.title}
              </div>
              {activeChallenge === c.id && (
                <div className={`text-[11px] mt-1 ${status ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {status ? 'লক্ষ্য অর্জিত হয়েছে!' : 'লক্ষ্য পূরণের জন্য চলকসমূহ পরিবর্তন করো...'}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
