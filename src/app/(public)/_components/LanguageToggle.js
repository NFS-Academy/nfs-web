"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/10 dark:border-white/10 relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
      <button
        onClick={() => setLocale('en')}
        className={`relative z-10 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
          locale === 'en' 
            ? 'text-slate-900 dark:text-white shadow-sm bg-white dark:bg-[#222] border border-black/5 dark:border-white/10' 
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLocale('bn')}
        className={`relative z-10 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
          locale === 'bn' 
            ? 'text-slate-900 dark:text-white shadow-sm bg-white dark:bg-[#222] border border-black/5 dark:border-white/10' 
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent'
        }`}
        aria-label="Switch to Bengali"
      >
        BN
      </button>
    </div>
  );
}
