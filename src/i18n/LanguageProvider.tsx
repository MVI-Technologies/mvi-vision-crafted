import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'mvi_lang';
const SUPPORTED_LANGUAGES: Language[] = ['pt-BR', 'en'];

function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'pt-BR';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Check if browser language starts with 'en'
  if (browserLang?.startsWith('en')) {
    return 'en';
  }
  
  // Default to PT-BR for all other cases
  return 'pt-BR';
}

function getStoredLanguage(): Language | null {
  if (typeof localStorage === 'undefined') return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }
  return null;
}

function updateHtmlLang(lang: Language) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = getStoredLanguage();
    if (stored) return stored;
    return detectBrowserLanguage();
  });

  // Update HTML lang attribute on mount and language change
  useEffect(() => {
    updateHtmlLang(lang);
  }, [lang]);

  // Update document title and meta on language change
  useEffect(() => {
    const title = translations[lang]['meta.title'];
    const description = translations[lang]['meta.description'];
    
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
  }, [lang]);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    updateHtmlLang(newLang);
  }, []);

  // Memoized translation function
  const t = useCallback((key: TranslationKey): string => {
    const translation = translations[lang][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t,
  }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
}

export { type Language, type TranslationKey };
