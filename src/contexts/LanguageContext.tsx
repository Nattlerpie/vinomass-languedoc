import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Header
    'atlas.title': 'Atlas Biomasse Vitivinicole',
    'region.subtitle': 'Tableau de bord des ressources biomasse du secteur vitivinicole',
    'language.french': 'Français',
    'language.english': 'English',
    'language.spanish': 'Español',
    'region.coming.soon': '(Bientôt)',
    
    // Stats
    'stats.vineyard.surface': 'Superficie viticole',
    'stats.annual.marc': 'Production annuelle de marc',
    'stats.valorization.installations': 'Installations de valorisation',
    'stats.liquid.byproducts': 'Sous-produits liquides',
    'stats.hectares': 'hectares',
    'stats.tonnes': 'tonnes',
    'stats.units': 'unités',
    'stats.hectoliters': 'hectolitres',
    
    // Top Communes
    'communes.title': 'Communes les Plus Productrices',
    'communes.tonnes': 'tonnes',
    
    // Valorization Chart
    'valorization.title': 'Méthodes de Valorisation Actuelles',
    
    // SAF Calculator
    'saf.title': 'Calculateur ROI - Partenariat SAF',
    'saf.description': 'Calculez le potentiel de retour sur investissement pour la production de carburant aviation durable',
    'saf.grape.pomace': 'Marc de raisin annuel (tonnes)',
    'saf.collection.cost': 'Coût de collecte par tonne (€)',
    'saf.processing.efficiency': 'Efficacité du traitement (%)',
    'saf.production': 'Production SAF (litres/an)',
    'saf.revenue': 'Revenus potentiels (€/an)',
    'saf.co2.reduction': 'Réduction CO2 (tonnes/an)',
    'saf.collection.costs': 'Coûts de collecte (€/an)',
    'saf.eu.mandate': 'Mandat UE SAF',
    'saf.current.supply': 'Offre SAF actuelle',
    'saf.atj.market': 'Part de marché ATJ',
    'saf.price.premium': 'Prime prix SAF',
    'saf.note': 'Calculs basés sur les données du marché européen SAF 2024',
    
    // Project Timeline
    'timeline.title': 'Chronologie du Projet',
    'timeline.year1': 'Partenariat & Pilote',
    'timeline.year2': 'Développement Infrastructure',
    'timeline.year3': 'Production Complète',
    'timeline.year5': 'Expansion d\'Échelle',
    'timeline.investment': 'investissement',
    'timeline.revenue.potential': 'potentiel de revenus annuels',
    
    // Footer
    'footer.data.updated': 'Données actualisées - Région',
    'footer.data.sources': 'Sources des données: Ministère de l\'Agriculture français (Agreste), Organisation Internationale de la Vigne et du Vin (OIV), Institut Français de la Vigne et du Vin (IFV)',
    'tooltip.source': 'Source: Agreste 2023, données OIV'
  },
  en: {
    // Header
    'atlas.title': 'Viticultural Biomass Atlas',
    'region.subtitle': 'Dashboard of biomass resources in the viticultural sector',
    'language.french': 'Français',
    'language.english': 'English',
    'language.spanish': 'Español',
    'region.coming.soon': '(Coming Soon)',
    
    // Stats
    'stats.vineyard.surface': 'Vineyard surface',
    'stats.annual.marc': 'Annual pomace production',
    'stats.valorization.installations': 'Valorization installations',
    'stats.liquid.byproducts': 'Liquid by-products',
    'stats.hectares': 'hectares',
    'stats.tonnes': 'tonnes',
    'stats.units': 'units',
    'stats.hectoliters': 'hectoliters',
    
    // Top Communes
    'communes.title': 'Top Producing Communes',
    'communes.tonnes': 'tonnes',
    
    // Valorization Chart
    'valorization.title': 'Current Valorization Methods',
    
    // SAF Calculator
    'saf.title': 'ROI Calculator - SAF Partnership',
    'saf.description': 'Calculate the return on investment potential for sustainable aviation fuel production',
    'saf.grape.pomace': 'Annual grape pomace (tonnes)',
    'saf.collection.cost': 'Collection cost per tonne (€)',
    'saf.processing.efficiency': 'Processing efficiency (%)',
    'saf.production': 'SAF production (liters/year)',
    'saf.revenue': 'Potential revenue (€/year)',
    'saf.co2.reduction': 'CO2 reduction (tonnes/year)',
    'saf.collection.costs': 'Collection costs (€/year)',
    'saf.eu.mandate': 'EU SAF Mandate',
    'saf.current.supply': 'Current SAF Supply',
    'saf.atj.market': 'ATJ Market Share',
    'saf.price.premium': 'SAF Price Premium',
    'saf.note': 'Calculations based on European SAF market data 2024',
    
    // Project Timeline
    'timeline.title': 'Project Timeline',
    'timeline.year1': 'Partnership & Pilot',
    'timeline.year2': 'Infrastructure Development',
    'timeline.year3': 'Full Production',
    'timeline.year5': 'Scale Expansion',
    'timeline.investment': 'investment',
    'timeline.revenue.potential': 'annual revenue potential',
    
    // Footer
    'footer.data.updated': 'Updated data - Region',
    'footer.data.sources': 'Data Sources: French Ministry of Agriculture (Agreste), International Organisation of Vine and Wine (OIV), French Institute of Vine and Wine (IFV)',
    'tooltip.source': 'Source: Agreste 2023, OIV data'
  },
  es: {
    // Header
    'atlas.title': 'Atlas de Biomasa Vitivinícola',
    'region.subtitle': 'Panel de recursos de biomasa del sector vitivinícola',
    'language.french': 'Français',
    'language.english': 'English',
    'language.spanish': 'Español',
    'region.coming.soon': '(Próximamente)',
    
    // Stats
    'stats.vineyard.surface': 'Superficie vitícola',
    'stats.annual.marc': 'Producción anual de orujo',
    'stats.valorization.installations': 'Instalaciones de valorización',
    'stats.liquid.byproducts': 'Subproductos líquidos',
    'stats.hectares': 'hectáreas',
    'stats.tonnes': 'toneladas',
    'stats.units': 'unidades',
    'stats.hectoliters': 'hectolitros',
    
    // Top Communes
    'communes.title': 'Comunas Más Productivas',
    'communes.tonnes': 'toneladas',
    
    // Valorization Chart
    'valorization.title': 'Métodos de Valorización Actuales',
    
    // SAF Calculator
    'saf.title': 'Calculadora ROI - Alianza SAF',
    'saf.description': 'Calcule el potencial de retorno de inversión para la producción de combustible sostenible de aviación',
    'saf.grape.pomace': 'Orujo de uva anual (toneladas)',
    'saf.collection.cost': 'Costo de recolección por tonelada (€)',
    'saf.processing.efficiency': 'Eficiencia de procesamiento (%)',
    'saf.production': 'Producción SAF (litros/año)',
    'saf.revenue': 'Ingresos potenciales (€/año)',
    'saf.co2.reduction': 'Reducción CO2 (toneladas/año)',
    'saf.collection.costs': 'Costos de recolección (€/año)',
    'saf.eu.mandate': 'Mandato UE SAF',
    'saf.current.supply': 'Suministro SAF actual',
    'saf.atj.market': 'Cuota mercado ATJ',
    'saf.price.premium': 'Prima precio SAF',
    'saf.note': 'Cálculos basados en datos del mercado europeo SAF 2024',
    
    // Project Timeline
    'timeline.title': 'Cronología del Proyecto',
    'timeline.year1': 'Alianza y Piloto',
    'timeline.year2': 'Desarrollo Infraestructura',
    'timeline.year3': 'Producción Completa',
    'timeline.year5': 'Expansión a Escala',
    'timeline.investment': 'inversión',
    'timeline.revenue.potential': 'potencial de ingresos anuales',
    
    // Footer
    'footer.data.updated': 'Datos actualizados - Región',
    'footer.data.sources': 'Fuentes de datos: Ministerio de Agricultura francés (Agreste), Organización Internacional de la Viña y el Vino (OIV), Instituto Francés de la Viña y el Vino (IFV)',
    'tooltip.source': 'Fuente: Agreste 2023, datos OIV'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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