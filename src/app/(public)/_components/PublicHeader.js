"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/i18n/LanguageContext';

export function PublicHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: '/catalog', label: t('header.directory') },
    { href: '/pricing', label: t('header.access_passes') },
    { href: '/about', label: t('header.manifesto') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="px-8 md:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-xl font-bold uppercase tracking-tighter flex items-center gap-3 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 text-slate-900 dark:text-white">
            <Logo />
            {t('header.title')}
          </Link>
          
          <nav className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500 ${isActive ? 'text-slate-900 dark:text-white' : ''}`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-rose-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500">
              {t('header.sign_in')}
            </Link>
            <Link href="/register" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
              <Button variant="primary" size="sm" className="uppercase text-[10px] tracking-widest">
                {t('header.enroll_now')}
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-900 dark:text-white active:scale-[0.95] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-black/5 dark:border-white/10 bg-white dark:bg-black absolute top-20 left-0 w-full flex flex-col p-8 gap-6 z-40 shadow-2xl">
          <nav className="flex flex-col gap-6 text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500 ${isActive ? 'text-slate-900 dark:text-white' : ''}`}
                >
                  {isActive && <span className="w-2 h-2 bg-rose-500 rounded-full inline-block" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="h-[1px] bg-black/5 dark:bg-white/10 w-full my-2" />
          
          <div className="flex flex-col gap-4">
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
              <Button variant="outline" className="w-full justify-center uppercase text-[10px] tracking-widest border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white">
                {t('header.sign_in')}
              </Button>
            </Link>
            <Link href="/register" onClick={() => setIsMenuOpen(false)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
              <Button variant="primary" className="w-full justify-center uppercase text-[10px] tracking-widest">
                {t('header.enroll_now')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
