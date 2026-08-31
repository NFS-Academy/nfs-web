"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PricingPage() {
  return (
    <div className="flex-1 py-32 px-8 md:px-16 flex flex-col items-center">
      <div className="text-center max-w-3xl mb-24 space-y-4">
        <div className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.2em]">System Access</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none">Access Passes</h1>
        <p className="text-[#888888] max-w-xl mx-auto pt-4">Unlock the computational power of interactive science learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1A1A1A] border border-[#1A1A1A] max-w-6xl w-full">
        {/* Basic Plan */}
        <Card className="border-none p-12 flex flex-col bg-black hover:bg-[#050505] transition-colors">
          <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">Basic</h3>
          <p className="text-[#888888] text-xs font-mono uppercase tracking-widest mb-12 border-b border-[#1A1A1A] pb-6">Trial Tier</p>
          
          <div className="text-5xl font-bold text-white mb-12 tracking-tighter">Free</div>
          
          <ul className="space-y-6 mb-12 flex-1 text-sm font-mono text-[#888888]">
            <li className="flex items-start gap-4">
              <span className="text-white">■</span> Sample Simulations
            </li>
            <li className="flex items-start gap-4">
              <span className="text-white">■</span> Basic Progress Tracking
            </li>
            <li className="flex items-start gap-4">
              <span className="text-white">■</span> Limited Practice Questions
            </li>
          </ul>
          <Button variant="secondary" className="w-full uppercase text-xs tracking-widest">
            Current Tier
          </Button>
        </Card>

        {/* Pro Plan */}
        <Card className="border-none p-12 flex flex-col bg-black hover:bg-[#050505] transition-colors relative">
          <div className="absolute top-0 right-0 bg-[#FF3366] text-black text-[10px] font-bold px-4 py-2 uppercase tracking-widest">
            Recommended
          </div>
          <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">Student Pro</h3>
          <p className="text-[#FF3366] text-xs font-mono uppercase tracking-widest mb-12 border-b border-[#1A1A1A] pb-6">Full Access</p>
          
          <div className="text-5xl font-bold text-white mb-12 tracking-tighter">৳500<span className="text-sm font-mono text-[#888888] uppercase tracking-widest ml-2">/mo</span></div>
          
          <ul className="space-y-6 mb-12 flex-1 text-sm font-mono text-[#888888]">
            <li className="flex items-start gap-4">
              <span className="text-[#FF3366]">■</span> All Simulations Unlocked
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#FF3366]">■</span> Full Step-by-Step Formula Mode
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#FF3366]">■</span> Unlimited Exam Practice
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#FF3366]">■</span> Saved Experiments
            </li>
          </ul>
          <Button variant="primary" className="w-full uppercase text-xs tracking-widest">
            Upgrade Tier
          </Button>
        </Card>

        {/* Institution Plan */}
        <Card className="border-none p-12 flex flex-col bg-black hover:bg-[#050505] transition-colors">
          <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">Institution</h3>
          <p className="text-[#888888] text-xs font-mono uppercase tracking-widest mb-12 border-b border-[#1A1A1A] pb-6">B2B Tier</p>
          
          <div className="text-5xl font-bold text-white mb-12 tracking-tighter">Custom</div>
          
          <ul className="space-y-6 mb-12 flex-1 text-sm font-mono text-[#888888]">
            <li className="flex items-start gap-4">
              <span className="text-white">■</span> Seat-based Access
            </li>
            <li className="flex items-start gap-4">
              <span className="text-white">■</span> Teacher & Group Features
            </li>
            <li className="flex items-start gap-4">
              <span className="text-white">■</span> Usage & Completion Reports
            </li>
            <li className="flex items-start gap-4">
              <span className="text-white">■</span> Dedicated Support
            </li>
          </ul>
          <Button variant="secondary" className="w-full uppercase text-xs tracking-widest">
            Contact Sales
          </Button>
        </Card>
      </div>
    </div>
  );
}
