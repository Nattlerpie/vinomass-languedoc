import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
  // Debug helpers
  debugMode: boolean;
  setDebugMode: (enabled: boolean) => void;
  getMissingTranslations: () => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
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
    
    // Navigation & Header - EXPANDED
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorisation des déchets vitivinicoles en carburant aviation durable',
    'nav.vue.ensemble': 'Vue d\'ensemble',
    'nav.economie': 'Économie',
    'nav.ressources': 'Ressources',
    'nav.partenaires': 'Partenaires',
    'nav.donnees': 'Données',
    'nav.methodologie': 'Méthodologie',
    'nav.contact': 'Contact',
    'nav.overview.description': 'Statistiques régionales et métriques clés',
    'nav.resources.description': 'Analyse des ressources disponibles',
    'nav.economy.description': 'Outils économiques et calculateurs',
    'nav.partnerships.description': 'Opportunités collaboratives',
    'nav.methodology.description': 'Méthodologie et sources de données',
    'nav.contact.description': 'Contact et prochaines étapes',
    
    // Technical Specifications
    'volume': 'Volume',
    'conversion': 'Conversion',
    'efficacite': 'Efficacité',
    'prix': 'Prix',
    'tonnes.an': 'tonnes/an',
    'litres.an': 'litres/an',
    'saf.tonne': 'L SAF/tonne',
    'atj.efficiency': 'ATJ',
    'euro.per.liter': '€/L SAF',
    
    // Points Clés (Vue d'ensemble) - UPDATED TERMINOLOGY
    'points.cles': 'Points Clés',
    'points.cles.subtitle': 'Indicateurs économiques et techniques essentiels',
    'superficie.viticole': 'Superficie viticole',
    'production.dechets.vitivinicoles': 'Production annuelle de déchets vitivinicoles',
    'production.marc': 'Production annuelle de marc',
    'allocation.flux': 'Allocation Réaliste des Flux',
    'potentiel.saf': 'Potentiel SAF (70% efficacité)',
    'revenue.potential': 'Potentiel de revenus',
    'reduction.co2': 'Réduction CO₂',
    'reduction.co2.potential': 'Réduction CO₂ potentielle',
    'hectares': 'hectares',
    'tonnes': 'tonnes',
    'base.regionale': 'Base régionale',
    'matiere.premiere.totale': 'Matière première totale (tous déchets)',
    'matiere.premiere': 'Matière première totale',
    'disponible.saf': 'disponible pour SAF',
    'vs.fossile': 'vs carburant fossile',
    'prix.marche': 'Prix marché ATJ',
    'revenus.annuels': 'Revenus annuels',
    'emplois.crees': 'Emplois créés',
    'retour.investissement': 'Retour investissement',
    'ans.payback': 'Ans payback',
    
    // Calculation Tooltips - NEW
    'co2.calculation.tooltip': '{liters}M litres SAF × {factor}kg CO₂/litre évités vs carburant fossile',
    'economy.feedstock.tooltip': '{percentage}% de {total}k tonnes biomasse totale disponible pour SAF',
    'infrastructure.co2.calculation.tooltip': 'Estimation: {methanization} méthanisation (×2,1kt) + {composting} compostage (×0,8kt) + {biomass} biomasse (×5kt)',
    
    // Regional Analysis
    'analyse.regionale': 'Analyse Régionale',
    'analyse.regionale.subtitle': 'Distribution territoriale et opportunités de valorisation',
    'communes.productrices': 'Communes les Plus Productrices',
    'repartition.departementale': 'Répartition Départementale de la Production',
    'production.regionale': 'de la production régionale',
    'valorisation.methodes': 'Méthodes de Valorisation Actuelles',
    'strategie.biomasse': 'Stratégie d\'Approvisionnement Biomasse',
    'base.conservative': 'Base conservative',
    'potentiel.negociable': 'Potentiel négociable',
    'total.accessible': 'Total accessible',
    'flux.elimination': 'Flux d\'élimination',
    'surplus.excedents': 'Surplus & excédents',
    'avec.partenariats': 'avec partenariats',
    'disponible': 'disponible',
    'jusqua': 'Jusqu\'à',
    'respecte.filieres': 'Cette approche respecte les filières établies tout en démontrant un potentiel d\'expansion pour répondre à la demande croissante SAF.',
    
    // Economic Projections - NEW SECTION
    'projections.title': 'Projections Économiques',
    'projections.five.years': '5 ans',
    'projections.ten.years': '10 ans',
    'projections.export': 'Exporter',
    'projections.certified.data': 'Données Certifiées',
    'projections.official.sources': 'Sources Officielles',
    'projections.volume': 'Volume',
    'projections.pomace': 'marc',
    'projections.saf': 'SAF',
    'projections.price': 'Prix',
    'projections.co2': 'CO₂',
    'projections.avoided': 'évité',
    'projections.efficiency': 'Efficacité',
    'projections.cumulative.profit': 'Profit cumulé',
    'projections.total.jobs': 'Emplois totaux',
    'projections.taxes.collected': 'Taxes collectées',
    'projections.co2.avoided.cumulative': 'CO₂ évité cumulé',
    'projections.financial.evolution': 'Évolution Financière',
    'projections.years': 'ans',
    'projections.revenue': 'Revenus',
    'projections.costs': 'Coûts',
    'projections.annual.profit': 'Profit annuel',
    'projections.job.creation': 'Création d\'Emplois',
    'projections.jobs': 'emplois',
    'projections.annual.carbon.impact': 'Impact Carbone Annuel',
    'projections.co2.avoided': 'CO₂ évité',
    'projections.economic.multipliers': 'Multiplicateurs Économiques',
    'projections.oecd.source': 'Source: Études OCDE Développement Rural',
    'projections.agriculture': 'Agriculture',
    'projections.industry': 'Industrie',
    'projections.services': 'Services',
    'projections.transport': 'Transport',
    'projections.construction': 'Construction',
    'projections.direct': 'Direct',
    'projections.indirect': 'Indirect',
    'projections.total': 'Total',
    'projections.regional.economic.impact': 'Impact Économique Régional',
    'projections.direct.jobs': 'Emplois directs',
    'projections.indirect.jobs': 'Emplois indirects',
    'projections.total.payroll': 'Masse salariale totale',
    'projections.local.purchases': 'Achats locaux',
    'projections.tax.contribution': 'Contribution fiscale',
    'projections.average.salary': 'Salaire moyen',
    'projections.context': 'Contexte',
    'projections.champagne.context': 'Analyse adaptée à l\'échelle premium avec volumes plus faibles mais marges supérieures et impact économique concentré sur la qualité.',
    'projections.languedoc.context': 'Modélisation basée sur les volumes importants et l\'infrastructure établie, permettant des économies d\'échelle significatives.',
    
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
    'neutralite.carbone': 'neutralité carbone',
    'region.coming.soon': '(Bientôt)',
    
    // Units
    'units.tonne': 'tonne',
    'units.tonesYear': 'tonnes/an',
    'units.litersYear': 'litres/an',
    'units.hectares': 'hectares',
    'units.ofTotal': 'du total',
    'units.potential': 'potentiel',
    'units.estimated': 'estimation',
    
    // Tooltip
    'tooltip.source': 'Source: Agreste 2023, données OIV'
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
    
    // Navigation & Header - EXPANDED
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorization of viticulture waste into sustainable aviation fuel',
    'nav.vue.ensemble': 'Overview',
    'nav.economie': 'Economics',
    'nav.ressources': 'Resources',
    'nav.partenaires': 'Partners',
    'nav.donnees': 'Data',
    'nav.methodologie': 'Methodology',
    'nav.contact': 'Contact',
    'nav.overview.description': 'Regional statistics and key metrics',
    'nav.resources.description': 'Analysis of available resources',
    'nav.economy.description': 'Economic tools and calculators',
    'nav.partnerships.description': 'Collaborative opportunities',
    'nav.methodology.description': 'Methodology and data sources',
    'nav.contact.description': 'Contact and next steps',
    
    // Technical Specifications
    'volume': 'Volume',
    'conversion': 'Conversion',
    'efficacite': 'Efficiency',
    'prix': 'Price',
    'tonnes.an': 'tonnes/year',
    'litres.an': 'liters/year',
    'saf.tonne': 'L SAF/tonne',
    'atj.efficiency': 'ATJ',
    'euro.per.liter': '€/L SAF',
    
    // Points Clés (Vue d'ensemble) - UPDATED TERMINOLOGY
    'points.cles': 'Key Points',
    'points.cles.subtitle': 'Essential economic and technical indicators',
    'superficie.viticole': 'Vineyard surface',
    'production.dechets.vitivinicoles': 'Annual viticulture waste production',
    'production.marc': 'Annual pomace production',
    'allocation.flux': 'Realistic Flow Allocation',
    'potentiel.saf': 'SAF Potential (70% efficiency)',
    'revenue.potential': 'Revenue Potential',
    'reduction.co2': 'CO₂ Reduction',
    'reduction.co2.potential': 'Potential CO₂ Reduction',
    'hectares': 'hectares',
    'tonnes': 'tonnes',
    'base.regionale': 'Regional base',
    'matiere.premiere.totale': 'Total raw material (all waste)',
    'matiere.premiere': 'Total raw material',
    'disponible.saf': 'available for SAF',
    'vs.fossile': 'vs fossil fuel',
    'prix.marche': 'ATJ market price',
    'revenus.annuels': 'Annual revenue',
    'emplois.crees': 'Jobs created',
    'retour.investissement': 'Return on investment',
    'ans.payback': 'Years payback',
    
    // Calculation Tooltips - NEW
    'co2.calculation.tooltip': '{liters}M liters SAF × {factor}kg CO₂/liter avoided vs fossil fuel',
    'economy.feedstock.tooltip': '{percentage}% of {total}k tonnes total biomass available for SAF',
    'infrastructure.co2.calculation.tooltip': 'Estimate: {methanization} methanization (×2.1kt) + {composting} composting (×0.8kt) + {biomass} biomass (×5kt)',
    
    // Regional Analysis
    'analyse.regionale': 'Regional Analysis',
    'analyse.regionale.subtitle': 'Territorial distribution and valorization opportunities',
    'communes.productrices': 'Top Producing Communes',
    'repartition.departementale': 'Departmental Production Distribution',
    'production.regionale': 'of regional production',
    'valorisation.methodes': 'Current Valorization Methods',
    'strategie.biomasse': 'Biomass Supply Strategy',
    'base.conservative': 'Conservative base',
    'potentiel.negociable': 'Negotiable potential',
    'total.accessible': 'Total accessible',
    'flux.elimination': 'Disposal streams',
    'surplus.excedents': 'Surplus & excess',
    'avec.partenariats': 'with partnerships',
    'disponible': 'available',
    'jusqua': 'Up to',
    'respecte.filieres': 'This approach respects established supply chains while demonstrating expansion potential to meet growing SAF demand.',
    
    // Economic Projections - NEW SECTION
    'projections.title': 'Economic Projections',
    'projections.five.years': '5 years',
    'projections.ten.years': '10 years',
    'projections.export': 'Export',
    'projections.certified.data': 'Certified Data',
    'projections.official.sources': 'Official Sources',
    'projections.volume': 'Volume',
    'projections.pomace': 'pomace',
    'projections.saf': 'SAF',
    'projections.price': 'Price',
    'projections.co2': 'CO₂',
    'projections.avoided': 'avoided',
    'projections.efficiency': 'Efficiency',
    'projections.cumulative.profit': 'Cumulative profit',
    'projections.total.jobs': 'Total jobs',
    'projections.taxes.collected': 'Taxes collected',
    'projections.co2.avoided.cumulative': 'Cumulative CO₂ avoided',
    'projections.financial.evolution': 'Financial Evolution',
    'projections.years': 'years',
    'projections.revenue': 'Revenue',
    'projections.costs': 'Costs',
    'projections.annual.profit': 'Annual profit',
    'projections.job.creation': 'Job Creation',
    'projections.jobs': 'jobs',
    'projections.annual.carbon.impact': 'Annual Carbon Impact',
    'projections.co2.avoided': 'CO₂ avoided',
    'projections.economic.multipliers': 'Economic Multipliers',
    'projections.oecd.source': 'Source: OECD Rural Development Studies',
    'projections.agriculture': 'Agriculture',
    'projections.industry': 'Industry',
    'projections.services': 'Services',
    'projections.transport': 'Transport',
    'projections.construction': 'Construction',
    'projections.direct': 'Direct',
    'projections.indirect': 'Indirect',
    'projections.total': 'Total',
    'projections.regional.economic.impact': 'Regional Economic Impact',
    'projections.direct.jobs': 'Direct jobs',
    'projections.indirect.jobs': 'Indirect jobs',
    'projections.total.payroll': 'Total payroll',
    'projections.local.purchases': 'Local purchases',
    'projections.tax.contribution': 'Tax contribution',
    'projections.average.salary': 'Average salary',
    'projections.context': 'Context',
    'projections.champagne.context': 'Analysis adapted to premium scale with lower volumes but higher margins and concentrated economic impact on quality.',
    'projections.languedoc.context': 'Modeling based on large volumes and established infrastructure, enabling significant economies of scale.',
    
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
    'neutralite.carbone': 'carbon neutrality',
    'region.coming.soon': '(Coming Soon)',
    
    // Units
    'units.tonne': 'tonne',
    'units.tonesYear': 'tonnes/year',
    'units.litersYear': 'liters/year',
    'units.hectares': 'hectares',
    'units.ofTotal': 'of total',
    'units.potential': 'potential',
    'units.estimated': 'estimated',
    
    // Tooltip
    'tooltip.source': 'Source: Agreste 2023, OIV data'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [debugMode, setDebugMode] = useState<boolean>(false);
  const [missingTranslations, setMissingTranslations] = useState<string[]>([]);

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key];
    
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
