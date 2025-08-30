"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type Language = 'en' | 'it';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Translations = {
  home: {
    en: 'Home',
    it: 'Home',
  },
  gallery: {
    en: 'Gallery',
    it: 'Galleria',
  },
  location: {
    en: 'Location',
    it: 'Posizione',
  },
  rsvp: {
    en: 'RSVP',
    it: 'Conferma',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Optional: Set language based on browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'it') {
        setLanguage('it');
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (language) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
