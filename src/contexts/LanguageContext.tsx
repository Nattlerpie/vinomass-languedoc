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
    // Navigation & Header
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorisation du marc de raisin en carburant aviation durable',
    'nav.vue.ensemble': 'Vue d\'ensemble',
    'nav.economie': 'Économie',
    'nav.ressources': 'Ressources',
    'nav.partenaires': 'Partenaires',
    
    // Points Clés (Vue d'ensemble)
    'points.cles': 'Points Clés',
    'points.cles.subtitle': 'Indicateurs économiques et techniques essentiels',
    'superficie.viticole': 'Superficie viticole',
    'production.marc': 'Production annuelle de marc',
    'allocation.flux': 'Allocation Réaliste des Flux',
    'potentiel.saf': 'Potentiel SAF (70% efficacité)',
    'revenue.potential': 'Revenue Potential',
    'reduction.co2': 'Réduction CO₂',
    'hectares': 'hectares',
    'tonnes': 'tonnes',
    'litres.an': 'litres/an',
    'tonnes.an': 'tonnes/an',
    'base.regionale': 'Base régionale',
    'matiere.premiere': 'Matière première totale',
    'disponible.saf': 'disponible pour SAF',
    'vs.fossile': 'vs carburant fossile',
    'prix.marche': 'Prix marché ATJ',
    
    // Regional Analysis
    'analyse.regionale': 'Analyse Régionale',
    'analyse.regionale.subtitle': 'Distribution territoriale et opportunités de valorisation',
    'communes.productrices': 'Communes les Plus Productrices',
    'valorisation.methodes': 'Méthodes de Valorisation Actuelles',
    'strategie.biomasse': 'Stratégie d\'Approvisionnement Biomasse',
    'base.conservative': 'Base conservative',
    'potentiel.negociable': 'Potentiel négociable',
    'total.accessible': 'Total accessible',
    'flux.elimination': 'Flux d\'élimination',
    'surplus.excedents': 'Surplus & excédents',
    'avec.partenariats': 'avec partenariats',
    'respecte.filieres': 'Cette approche respecte les filières établies tout en démontrant un potentiel d\'expansion pour répondre à la demande croissante SAF.',
    
    // Regional Context
    'contexte.regional': 'Contexte Régional',
    'contexte.regional.subtitle': 'Leadership national et potentiel économique',
    'region.viticole.francaise': 'Région viticole française',
    'region.premium.champagne': 'Région Premium Champagne',
    'volume.production': 'En volume de production',
    'marche.prestige': 'Marché de prestige',
    'production.nationale': 'De la production nationale',
    'millions.hectolitres': 'millions d\'hectolitres',
    'segment.premium': 'premium segment',
    'ca.annuel': 'Chiffre d\'affaires annuel',
    'secteur.vitivinicole': 'Secteur vitivinicole régional',
    
    // Industry News
    'actualites.saf': 'Actualités Secteur SAF',
    'actualites.subtitle': 'Projets en développement dans la filière française',
    'investissement': 'Investissement',
    'capacite': 'Capacité',
    'technologie': 'Technologie',
    'partenariat': 'Partenariat',
    'objectif': 'Objectif',
    'budget.rd': 'Budget R&D',
    'contexte.reglementaire': 'Contexte Réglementaire',
    'projet.inscrit': 'Notre projet s\'inscrit dans cette dynamique nationale → Voir onglet Économie',
    
    // Units and Common Terms
    'millions': 'millions',
    'milliards': 'milliards',
    'tonnes.saf.an': 'tonnes SAF/an',
    'sur.ans': 'sur {years} ans',
    'des.2025': 'dès 2025',
    'minimum.2030': 'minimum d\'ici 2030',
    'mobilises': 'mobilisés',
    'modernises': 'modernisés',
    'fournisseurs.biomasse': 'fournisseurs biomasse',
    'fonds.verts': 'fonds verts',
    'energies.renouvelables': 'énergies renouvelables',
    'neutralite.carbone': 'neutralité carbone'
    'resources.title': 'Ressources Biomasse',
    'resources.subtitle': 'Cartographie et analyse des ressources régionales disponibles',
    'resources.allocationTitle': 'Allocation Réaliste des Flux',
    'resources.allocationSubtitle': 'Disponibilité effective pour la production de SAF',
    'resources.totalProduction': 'Production totale théorique',
    'resources.totalPercentage': '100% des ressources biomasse',
    'resources.availableForSAF': 'Disponible pour SAF',
    'resources.realisticAllocation': 'allocation réaliste',
    'resources.otherValorisations': 'Autres valorisations',
    'resources.otherValorisationsDesc': 'Distillation, compostage, méthanisation',
    'resources.whyThirtyPercent.title': 'Pourquoi seulement 30% ?',
    'resources.whyThirtyPercent.description': 'Les distilleries existantes, contraintes logistiques, saisonnalité et besoins locaux limitent la disponibilité réelle pour de nouveaux projets SAF.',
    'resources.analysisTitle': 'Analyse des Ressources',
    'resources.analysisSubtitle': 'Répartition et saisonnalité des biomasses disponibles',
    'resources.infrastructureTitle': 'Infrastructure Existante',
    'resources.infrastructureSubtitle': 'Capacités de transformation et valorisation',
    'resources.safPotentialTitle': 'Potentiel de Production SAF',
    'resources.safPotentialSubtitle': 'Capacité réaliste basée sur {tonnage} tonnes disponibles',
    'resources.annualSafProduction': 'Production SAF annuelle',
    'resources.yieldRate': 'À 280L/tonne de rendement',
    'resources.potentialRevenue': 'Chiffre d\'affaires potentiel',
    'resources.pricePerLiter': 'À €1.22/L prix de vente',
    'resources.annualCo2Avoided': 'CO₂ évité annuel',
    'resources.vsFossilFuel': 'vs carburant fossile',
    'resources.disclaimer': '* Estimations basées sur les technologies ATJ (Alcohol-to-Jet) et les conditions de marché actuelles'
  },
  
  en: {
    // Navigation & Header
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorization of grape pomace into sustainable aviation fuel',
    'nav.vue.ensemble': 'Overview',
    'nav.economie': 'Economics',
    'nav.ressources': 'Resources',
    'nav.partenaires': 'Partners',
    
    // Points Clés (Vue d'ensemble)
    'points.cles': 'Key Points',
    'points.cles.subtitle': 'Essential economic and technical indicators',
    'superficie.viticole': 'Vineyard surface',
    'production.marc': 'Annual pomace production',
    'allocation.flux': 'Realistic Flow Allocation',
    'potentiel.saf': 'SAF Potential (70% efficiency)',
    'revenue.potential': 'Revenue Potential',
    'reduction.co2': 'CO₂ Reduction',
    'hectares': 'hectares',
    'tonnes': 'tonnes',
    'litres.an': 'liters/year',
    'tonnes.an': 'tonnes/year',
    'base.regionale': 'Regional base',
    'matiere.premiere': 'Total raw material',
    'disponible.saf': 'available for SAF',
    'vs.fossile': 'vs fossil fuel',
    'prix.marche': 'ATJ market price',
    
    // Regional Analysis
    'analyse.regionale': 'Regional Analysis',
    'analyse.regionale.subtitle': 'Territorial distribution and valorization opportunities',
    'communes.productrices': 'Top Producing Communes',
    'valorisation.methodes': 'Current Valorization Methods',
    'strategie.biomasse': 'Biomass Supply Strategy',
    'base.conservative': 'Conservative base',
    'potentiel.negociable': 'Negotiable potential',
    'total.accessible': 'Total accessible',
    'flux.elimination': 'Disposal streams',
    'surplus.excedents': 'Surplus & excess',
    'avec.partenariats': 'with partnerships',
    'respecte.filieres': 'This approach respects established supply chains while demonstrating expansion potential to meet growing SAF demand.',
    
    // Regional Context
    'contexte.regional': 'Regional Context',
    'contexte.regional.subtitle': 'National leadership and economic potential',
    'region.viticole.francaise': 'French wine region',
    'region.premium.champagne': 'Premium Champagne Region',
    'volume.production': 'By production volume',
    'marche.prestige': 'Prestige market',
    'production.nationale': 'Of national production',
    'millions.hectolitres': 'million hectoliters',
    'segment.premium': 'premium segment',
    'ca.annuel': 'Annual revenue',
    'secteur.vitivinicole': 'Regional wine industry',
    
    // Industry News
    'actualites.saf': 'SAF Industry News',
    'actualites.subtitle': 'Projects in development in the French supply chain',
    'investissement': 'Investment',
    'capacite': 'Capacity',
    'technologie': 'Technology',
    'partenariat': 'Partnership',
    'objectif': 'Objective',
    'budget.rd': 'R&D Budget',
    'contexte.reglementaire': 'Regulatory Context',
    'projet.inscrit': 'Our project fits into this national dynamic → See Economics tab',
    
    // Units and Common Terms
    'millions': 'million',
    'milliards': 'billion',
    'tonnes.saf.an': 'tonnes SAF/year',
    'sur.ans': 'over {years} years',
    'des.2025': 'from 2025',
    'minimum.2030': 'minimum by 2030',
    'mobilises': 'mobilized',
    'modernises': 'modernized',
    'fournisseurs.biomasse': 'biomass suppliers',
    'fonds.verts': 'green funds',
    'energies.renouvelables': 'renewable energy',
    'neutralite.carbone': 'carbon neutrality'
    'resources.title': 'Biomass Resources',
    'resources.subtitle': 'Mapping and analysis of available regional resources',
    'resources.allocationTitle': 'Realistic Flow Allocation',
    'resources.allocationSubtitle': 'Effective availability for SAF production',
    'resources.totalProduction': 'Total theoretical production',
    'resources.totalPercentage': '100% of biomass resources',
    'resources.availableForSAF': 'Available for SAF',
    'resources.realisticAllocation': 'realistic allocation',
    'resources.otherValorisations': 'Other valorizations',
    'resources.otherValorisationsDesc': 'Distillation, composting, methanization',
    'resources.whyThirtyPercent.title': 'Why only 30%?',
    'resources.whyThirtyPercent.description': 'Existing distilleries, logistical constraints, seasonality and local needs limit real availability for new SAF projects.',
    'resources.analysisTitle': 'Resource Analysis',
    'resources.analysisSubtitle': 'Distribution and seasonality of available biomass',
    'resources.infrastructureTitle': 'Existing Infrastructure',
    'resources.infrastructureSubtitle': 'Processing and valorization capacities',
    'resources.safPotentialTitle': 'SAF Production Potential',
    'resources.safPotentialSubtitle': 'Realistic capacity based on {tonnage} available tonnes',
    'resources.annualSafProduction': 'Annual SAF production',
    'resources.yieldRate': 'At 280L/tonne yield rate',
    'resources.potentialRevenue': 'Potential revenue',
    'resources.pricePerLiter': 'At €1.22/L selling price',
    'resources.annualCo2Avoided': 'Annual CO₂ avoided',
    'resources.vsFossilFuel': 'vs fossil fuel',
    'resources.disclaimer': '* Estimates based on ATJ (Alcohol-to-Jet) technologies and current market conditions'
  },
  
  es: {
    // Navigation & Header
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorización del orujo de uva en combustible sostenible de aviación',
    'nav.vue.ensemble': 'Resumen',
    'nav.economie': 'Economía',
    'nav.ressources': 'Recursos',
    'nav.partenaires': 'Socios',
    
    // Points Clés (Vue d'ensemble)
    'points.cles': 'Puntos Clave',
    'points.cles.subtitle': 'Indicadores económicos y técnicos esenciales',
    'superficie.viticole': 'Superficie vitícola',
    'production.marc': 'Producción anual de orujo',
    'allocation.flux': 'Asignación Realista de Flujos',
    'potentiel.saf': 'Potencial SAF (70% eficiencia)',
    'revenue.potential': 'Potencial de Ingresos',
    'reduction.co2': 'Reducción CO₂',
    'hectares': 'hectáreas',
    'tonnes': 'toneladas',
    'litres.an': 'litros/año',
    'tonnes.an': 'toneladas/año',
    'base.regionale': 'Base regional',
    'matiere.premiere': 'Materia prima total',
    'disponible.saf': 'disponible para SAF',
    'vs.fossile': 'vs combustible fósil',
    'prix.marche': 'Precio de mercado ATJ',
    
    // Add more Spanish translations...
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key] || key;
    
    // Handle parameter replacement like {region}, {years}, etc.
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
