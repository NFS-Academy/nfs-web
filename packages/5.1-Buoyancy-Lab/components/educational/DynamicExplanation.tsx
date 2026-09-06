'use client';

import { useSimulationStore } from '@/lib/store';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function DynamicExplanation() {
  const [expanded, setExpanded] = useState(true);
  
  const brickMass = useSimulationStore(state => state.brickMass);
  const waterDensity = useSimulationStore(state => state.waterDensity);
  const brickHeight = useSimulationStore(state => state.brickHeight);
  const brickWidth = useSimulationStore(state => state.brickWidth);
  const brickDepth = useSimulationStore(state => state.brickDepth);
  const brickPosition = useSimulationStore(state => state.brickPosition);
  const getCurrentWaterLevel = useSimulationStore(state => state.getCurrentWaterLevel);

  const brickVolume = brickHeight * brickWidth * brickDepth;
  const brickDensity = brickMass / brickVolume;
  const waterLevel = getCurrentWaterLevel();

  // Determine State
  const atBottom = brickPosition.y - brickHeight/2 <= 0.1;
  const completelySubmerged = (brickPosition.y + brickHeight/2) < waterLevel;
  
  let stateKey = 'default';
  if (atBottom) {
    stateKey = 'sinking';
  } else if (completelySubmerged) {
    if (Math.abs(brickDensity - waterDensity) < 5) stateKey = 'neutral';
    else stateKey = 'moving';
  } else if (brickPosition.y - brickHeight/2 < waterLevel) {
    stateKey = 'floating';
  }

  return (
    <div className="bg-[#111111] rounded-xl border border-white/10 flex flex-col overflow-hidden font-body">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors font-heading"
      >
        <h3 className="text-white/90 font-medium tracking-wide text-sm">কেন এমন হচ্ছে?</h3>
        {expanded ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="w-4 h-4 text-white/50" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 text-[13px] text-white/70 space-y-3 leading-relaxed">
          {stateKey === 'floating' && (
            <p>
              <strong className="text-white font-heading text-[14px]">ভাসমান অবস্থা: </strong> 
              বস্তুটি ভাসছে কারণ এর উপর ক্রিয়াশীল প্লবন বল তার ওজনের সমান হয়েছে। বস্তুটির ঘনত্ব পানির ঘনত্বের চেয়ে কম, তাই এটি আংশিক নিমজ্জিত থেকেই প্রয়োজনীয় প্লবন বল তৈরি করতে পারে।
            </p>
          )}
          
          {stateKey === 'sinking' && (
            <p>
              <strong className="text-white font-heading text-[14px]">ডুবে যাওয়া: </strong> 
              বস্তুটির ওজন প্লবন বলের চেয়ে বেশি। বস্তুটি সম্পূর্ণ পানিতে তলিয়ে গেলেও এর প্লবন বল ওজনকে ছাড়িয়ে যেতে বা সমান হতে পারে না, তাই এটি নিচে পড়ে গেছে।
            </p>
          )}

          {stateKey === 'neutral' && (
            <p>
              <strong className="text-white font-heading text-[14px]">নিমজ্জিত অবস্থায় ভাসা: </strong> 
              বস্তুটির ঘনত্ব এবং পানির ঘনত্ব প্রায় সমান। ফলে বস্তুটি সম্পূর্ণ নিমজ্জিত অবস্থায় যে প্লবন বল লাভ করে তা ঠিক তার ওজনের সমান হয়।
            </p>
          )}

          {stateKey === 'moving' && (
            <p>
              <strong className="text-white font-heading text-[14px]">গতিশীল অবস্থা: </strong> 
              বস্তুটি পানিতে নিমজ্জিত হচ্ছে বা ভাসার চেষ্টা করছে। প্লবন বল এবং ওজনের পার্থক্যের কারণে একটি লব্ধি বল কাজ করছে।
            </p>
          )}

          {stateKey === 'default' && (
            <p>বস্তুটিকে পানিতে ফেলে দেখো কী ঘটে!</p>
          )}

          <div className="pt-3 mt-3 border-t border-white/10 text-[12px] text-white/60">
            <strong className="text-white font-heading text-[13px]">চাপের প্রভাব: </strong> 
            পানির গভীরতা বাড়ার সঙ্গে সঙ্গে চাপ বৃদ্ধি পায় (P = ρgh)। তাই বস্তুর নিচের অংশে উপরের অংশের তুলনায় বেশি চাপ কাজ করে। এই চাপের পার্থক্যই বস্তুকে ওপরের দিকে ঠেলে দেয়, যাকে প্লবন বল বলে।
          </div>
        </div>
      )}
    </div>
  );
}
