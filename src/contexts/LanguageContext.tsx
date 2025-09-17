import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Main Atlas Headers
    'atlas.title': 'Atlas Biomasse Vitivinicole',
    'region.subtitle': 'Potentiel de valorisation en carburant aviation durable',
    
    // Navigation & Interface
    'visite.guidee': 'Visite Guidée',
    'donnees.certifiees': 'Données Certifiées 2023',
    'mode.presentation': 'Mode Présentation',
    'partager': 'Partager',
    'imprimer': 'Imprimer',
    
    // Navigation & Header
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorisation du biomasse vitivinicole en feedstock',
    'nav.vue.ensemble': 'Vue d\'ensemble',
    'nav.economie': 'Économie',
    'nav.ressources': 'Ressources',
    'nav.partenaires': 'Partenaires',
    'nav.donnees': 'Données',
    'nav.contact': 'Contact',

    // Example Subtitle / Dynamic Parameter
    'points.cles.subtitle': 'Indicateurs économiques et techniques essentiels',
    
    // Add the rest of your translations here ...
  },
  en: {
    // Main Atlas Headers  
    'atlas.title': 'Viticultural Biomass Atlas',
    'region.subtitle': 'Sustainable aviation fuel valorization potential',
    
    // Navigation & Interface
    'visite.guidee': 'Guided Tour',
    'donnees.certifiees': 'Certified Data 2023',
    'mode.presentation': 'Presentation Mode',
    'partager': 'Share',
    'imprimer': 'Print',
    
    // Navigation & Header
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorization of viticulture waste into Sustainable Aviation Fuel feedstock',
    'nav.vue.ensemble': 'Overview',
    'nav.economie': 'Economics',
    'nav.ressources': 'Resources',
    'nav.partenaires': 'Partners',
    'nav.donnees': 'Data',
    'nav.contact': 'Contact',

    // Example Subtitle / Dynamic Parameter
    'points.cles.subtitle': 'Essential economic and technical indicators',
    
    // Add the rest of your translations here ...
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key] || key;

    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`{${param}}`, 'g'), String(params[param]));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
