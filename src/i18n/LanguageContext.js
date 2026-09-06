"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import en from './dictionaries/en.json';
import bn from './dictionaries/bn.json';

const dictionaries = { en, bn };

const LanguageContext = createContext({
  locale: 'en',
  setLocale: () => null,
  t: (key) => key,
});

export function LanguageProvider({ children, defaultLocale = 'en' }) {
  const [locale, setLocaleState] = useState(defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved && ['en', 'bn'].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale) => {
    localStorage.setItem('locale', newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setLocaleState(newLocale);
  };

  const t = (path) => {
    const keys = path.split('.');
    let result = dictionaries[locale];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path; // Fallback to path string if not found
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
