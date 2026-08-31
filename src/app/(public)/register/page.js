"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-black">
      <div className="w-full max-w-md bg-black border border-[#1A1A1A] p-12">
        <div className="text-center mb-12">
          <div className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.2em] mb-4">New Profile Creation</div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter text-white">Initialize Account</h1>
        </div>
        
        <form className="space-y-8" action="/dashboard">
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888888]">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-[#050505] border border-[#1A1A1A] px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FF3366] transition-colors rounded-none"
              placeholder="JANE DOE"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888888]">User Identifier (Email)</label>
            <input 
              type="email" 
              className="w-full bg-[#050505] border border-[#1A1A1A] px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FF3366] transition-colors rounded-none"
              placeholder="JANE@EXAMPLE.COM"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888888]">Security Key (Password)</label>
            <input 
              type="password" 
              className="w-full bg-[#050505] border border-[#1A1A1A] px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FF3366] transition-colors rounded-none"
              placeholder="••••••••"
            />
          </div>
          
          <Button type="submit" variant="primary" className="w-full uppercase text-xs tracking-widest h-12">
            Create Profile
          </Button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-[#1A1A1A] text-center text-[10px] font-mono uppercase tracking-widest text-[#888888]">
          Existing Profile? <Link href="/login" className="text-white hover:text-[#FF3366] transition-colors ml-2">Authenticate</Link>
        </div>
      </div>
    </div>
  );
}
