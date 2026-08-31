"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { useFadeIn } from '@/lib/animations';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

export default function LearningLayout({ children }) {
  const sidebarRef = useRef(null);
  useFadeIn(sidebarRef, { x: -20, y: 0, duration: 0.5 });

  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-black text-white selection:bg-[#FF3366] selection:text-black">
      
      {/* Brutalist Sidebar */}
      <aside 
        ref={sidebarRef}
        className="w-72 bg-black border-r border-[#1A1A1A] flex flex-col z-20 shrink-0"
      >
        <div className="h-20 border-b border-[#1A1A1A] flex items-center px-8">
          <Link href="/" className="font-bold text-xl uppercase tracking-tighter flex items-center gap-3">
            <Logo />
            NFS Academy
          </Link>
        </div>
        
        <div className="p-8 border-b border-[#1A1A1A]">
          <div className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.2em] mb-4">Active Context</div>
          <Link href="/workspace/physics-ch3" className="block p-4 border border-[#333333] hover:border-white transition-colors group">
            <div className="text-[10px] font-mono text-[#FF3366] uppercase tracking-widest mb-2 flex justify-between">
              Physics Module 
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <div className="text-sm font-medium tracking-tight">Newton's Laws</div>
          </Link>
        </div>

        <nav className="flex-1 p-8 space-y-2 overflow-y-auto hide-scrollbar">
          <div className="text-[10px] font-mono text-[#888888] uppercase tracking-[0.2em] mb-4">Directory</div>
          <NavItem href="/dashboard" label="Dashboard" active={pathname === '/dashboard'} />
          <NavItem href="/catalog" label="Curriculum" active={pathname === '/catalog'} />
          <NavItem href="/history" label="Activity Log" active={pathname === '/history'} />
        </nav>
        
        <div className="p-8 border-t border-[#1A1A1A] space-y-2">
          <NavItem href="/settings" label="Settings" active={pathname === '/settings'} />
          <Link href="/" className="flex items-center px-4 py-3 text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#FF3366] transition-colors">
            Terminate Session
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Stark Header */}
        <header className="h-20 bg-black border-b border-[#1A1A1A] flex items-center justify-between px-10 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#888888]">
            <span>System</span>
            <span className="text-[#333333]">/</span>
            <span className="text-white">{pathname.split('/').pop() || 'Dashboard'}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex border border-[#333333]">
              <button className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest bg-white text-black">EN</button>
              <button className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-[#888888] hover:text-white transition-colors">BN</button>
            </div>
            <div className="w-10 h-10 bg-[#1A1A1A] border border-[#333333] flex items-center justify-center text-xs font-mono">
              NM
            </div>
          </div>
        </header>
        
        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-10 lg:p-16 relative z-0 bg-[#050505]">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, label, active }) {
  if (active) {
    return (
      <Link href={href} className="flex items-center px-4 py-3 text-xs font-mono uppercase tracking-widest bg-white text-black border border-white group transition-colors">
        {label}
      </Link>
    );
  }
  return (
    <Link href={href} className="flex items-center px-4 py-3 text-xs font-mono uppercase tracking-widest text-[#888888] border border-transparent hover:border-[#333333] hover:text-white transition-colors">
      {label}
    </Link>
  );
}
