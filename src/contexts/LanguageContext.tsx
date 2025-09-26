import React, { createContext, useContext, useState, ReactNode } from 'react';
import frTranslations from '../locales/fr.json';
import enTranslations from '../locales/en.json';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
  debugMode: boolean;
  setDebugMode: (enabled: boolean) => void;
  getMissingTranslations: () => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: frTranslations,
  en: enTranslations
} as const;

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [debugMode, setDebugMode] = useState(false);
  const [missingTranslations, setMissingTranslations] = useState<string[]>([]);

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key as keyof typeof translations.fr];
    
    // Track missing translations in debug mode
    if (!translation && debugMode) {
      if (!missingTranslations.includes(key)) {
        setMissingTranslations(prev => [...prev, key]);
        console.warn(`Missing translation: ${key}`);
      }
      return `[MISSING: ${key}]`;
    }
    
    // Fallback to key if translation not found
    if (!translation) {
      translation = key;
    }
    
    // Handle parameter replacement like {region}, {years}, {tonnage}, etc.
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
      });
    }
    
    return translation;
  };

  const getMissingTranslations = (): string[] => {
    return [...missingTranslations];
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      debugMode, 
      setDebugMode,
      getMissingTranslations 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
