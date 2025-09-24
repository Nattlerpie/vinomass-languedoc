import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  debugMode: boolean;
  toggleDebug: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.vue.ensemble': 'Vue d\'ensemble',
    'nav.ressources': 'Ressources',
    'nav.economie': 'Économie',
    'nav.partenaires': 'Partenariats',
    'nav.methodologie': 'Méthodologie',
    'nav.contact': 'Contact',
    'nav.overview.description': 'Statistiques régionales et métriques clés',
    'nav.resources.description': 'Analyse des ressources disponibles',
    'nav.economy.description': 'Outils économiques et calculateurs',
    'nav.partnerships.description': 'Opportunités collaboratives',
    'nav.methodology.description': 'Méthodologie et sources',
    'nav.contact.description': 'Informations de contact',

    // Overview Tab
    'overview.title': 'Valorisation des déchets vitivinicoles',
    'overview.subtitle': 'Transformer les déchets vitivinicoles en carburant aviation durable',
    'production.viticulture.waste': 'Production annuelle de déchets vitivinicoles',
    'production.total.biomass': 'Production totale de biomasse',
    'repartition.departementale': 'Répartition Départementale de la Production',
    'production.regionale': 'de la production régionale',

    // Biomass Strategy Section (replacing Regional Context)
    'strategy.biomass.title': 'Stratégie d\'Approvisionnement Biomasse',
    'strategy.conservative.base': 'Base conservatrice',
    'strategy.negotiable.potential': 'Potentiel négociable',
    'strategy.total.accessible': 'Total accessible',
    'strategy.disposal.flows': 'Flux d\'élimination',
    'strategy.surplus.excess': 'Surplus excédents',
    'strategy.with.partnerships': 'Avec partenariats',
    'disponible': 'disponible',
    'jusqua': 'Jusqu\'à',

    // Regional Context (4th button)
    'regional.context.established': 'Chaînes établies',
    'regional.context.mature.infra': 'Infrastructure mature',
    'regional.context.facilities': 'installations totales',
    'regional.context.existing.capacity': 'Capacité existante',

    // SAF News Section
    'saf.news.title': 'Actualités SAF',
    'saf.news.subtitle': 'Dernières informations sur le carburant aviation durable',
    'saf.news.iata.headline': 'IATA: 500 Mt de SAF nécessaires d\'ici 2050',
    'saf.news.iata.summary': 'Nouvel rapport sur l\'évaluation mondiale des matières premières pour la production de SAF',
    'saf.news.europe.key': 'Europe région clé avec les États-Unis, le Brésil et l\'Inde',
    'saf.news.agricultural.residues': '58% des matières premières proviendront de résidus agricoles',
    'saf.news.technology.barrier': 'Déploiement technologique principal obstacle, pas la disponibilité',

    // Regulatory Context
    'regulatory.context.title': 'Contexte Réglementaire',
    'regulatory.context.subtitle': 'Cadre législatif et opportunités',
    'regulatory.refueleu': 'ReFuelEU Aviation',
    'regulatory.mandate.2030': 'Mandat 2% SAF d\'ici 2030',
    'regulatory.corsia': 'CORSIA',
    'regulatory.carbon.neutral': 'Croissance neutre en carbone',
    'regulatory.french.strategy': 'Stratégie française SAF',
    'regulatory.support.production': 'Soutien à la production nationale',

    // Resources Tab
    'resources.title': 'Ressources Biomasse',
    'resources.subtitle': 'Cartographie et analyse des ressources régionales disponibles',
    'resources.viticulture.waste': 'Déchets vitivinicoles',
    'resources.annual.production': 'Production annuelle totale',
    'resources.allocation.title': 'Allocation Réaliste des Flux',
    'resources.allocation.subtitle': 'Répartition optimisée des ressources disponibles',
    
    // Flow Allocation
    'flux.proteges': 'Flux Protégés',
    'flux.negociables': 'Flux Négociables', 
    'flux.disponibles': 'Flux Disponibles',
    'non.disponible': 'Non disponible',
    'partenariats.requis': 'Partenariats requis',
    'compost.vignobles': 'Compost vignobles',
    'biogaz.energetique': 'Biogaz énergétique',
    'extraction.premium': 'Extraction premium',
    'excedent.compost': 'Excédent compost',
    'couts.elimination': 'Coûts élimination actuels',
    'boues.traitement': 'Boues de traitement',

    // Infrastructure
    'infrastructure.title': 'Infrastructure Existante',
    'infrastructure.distilleries': 'Distilleries',
    'infrastructure.methanization': 'Méthanisation',
    'infrastructure.composting': 'Compostage',
    'infrastructure.biomass': 'Biomasse',

    // Economy Tab
    'economy.title': 'Analyse Économique',
    'economy.subtitle': 'Évaluation financière et retour sur investissement',
    'economy.saf.potential': 'Potentiel SAF',
    'economy.annual.revenue': 'Revenus annuels',
    'economy.jobs.created': 'Emplois créés',
    'economy.market.price': '€476/t prix marché',
    'economy.direct.employment': 'Emploi direct',
    'economy.analysis.modules': 'Modules d\'Analyse Économique',
    'economy.financial.modeling': 'Outils de modélisation financière et d\'évaluation des investissements',
    'economy.roi.calculator': 'Calculateur ROI',
    'economy.cost.benefit': 'Coût-Bénéfice',
    'economy.projections': 'Projections',

    // ROI & Financial Terms
    'roi.title': 'Retour sur Investissement',
    'irr.full': 'Taux de Rentabilité Interne',
    'irr.acronym': 'TRI',
    'roi.acronym': 'RSI',
    'npv.full': 'Valeur Actualisée Nette',
    'npv.acronym': 'VAN',

    // Job Types
    'jobs.direct': 'directs',
    'jobs.indirect': 'indirects',
    'jobs.production': 'Production',
    'jobs.logistics': 'Logistique',
    'jobs.maintenance': 'Maintenance',
    'jobs.administration': 'Administration',

    // Partnerships Tab
    'partnerships.title': 'Partenariats Stratégiques',
    'partnerships.subtitle': 'Opportunités collaboratives et chaîne de valeur',
    'partnerships.value.proposition': 'Proposition de Valeur',
    'partnerships.waste.disposal': 'Options sociétés de traitement des déchets',
    'partnerships.communal.sites': 'Sites de collecte communaux',
    'partnerships.case.studies': 'Études de cas de la recherche',
    'partnerships.sustainable.farms': 'Exemples de vignobles/fermes auto-durables',

    // Units (SI Standard)
    'tonnes': 't',
    'kilotonnes': 'kt',
    'litres': 'L',
    'hectares': 'ha',
    'potentiel.saf': 'millions de litres SAF',
    'millions.euros': 'M€',
    'emplois': 'emplois',
    
    // Common Terms
    'total': 'Total',
    'disponible': 'disponible',
    'partenariat': 'partenariat',
    'surplus.excedents': 'surplus excédents'
  },
  en: {
    // Navigation  
    'nav.vue.ensemble': 'Overview',
    'nav.ressources': 'Resources', 
    'nav.economie': 'Economics',
    'nav.partenaires': 'Partners',
    'nav.methodologie': 'Methodology',
    'nav.contact': 'Contact',
    'nav.overview.description': 'Regional statistics and key metrics',
    'nav.resources.description': 'Analysis of available resources',
    'nav.economy.description': 'Economic tools and calculators',
    'nav.partnerships.description': 'Collaborative opportunities',
    'nav.methodology.description': 'Methodology and sources',
    'nav.contact.description': 'Contact information',

    // Overview Tab
    'overview.title': 'Viticulture Waste Valorization',
    'overview.subtitle': 'Transforming viticulture waste into sustainable aviation fuel',
    'production.viticulture.waste': 'Annual viticulture waste production',
    'production.total.biomass': 'Total biomass production',
    'repartition.departementale': 'Departmental Production Distribution',
    'production.regionale': 'of regional production',

    // Biomass Strategy Section
    'strategy.biomass.title': 'Biomass Supply Strategy',
    'strategy.conservative.base': 'Conservative base',
    'strategy.negotiable.potential': 'Negotiable potential',
    'strategy.total.accessible': 'Total accessible',
    'strategy.disposal.flows': 'Disposal flows',
    'strategy.surplus.excess': 'Surplus excess',
    'strategy.with.partnerships': 'With partnerships',
    'disponible': 'available',
    'jusqua': 'Up to',

    // Regional Context (4th button)
    'regional.context.established': 'Established chains',
    'regional.context.mature.infra': 'Mature infrastructure',
    'regional.context.facilities': 'total facilities',
    'regional.context.existing.capacity': 'Existing capacity',

    // SAF News Section
    'saf.news.title': 'SAF News',
    'saf.news.subtitle': 'Latest sustainable aviation fuel information',
    'saf.news.iata.headline': 'IATA: 500 Mt SAF needed by 2050',
    'saf.news.iata.summary': 'New report on global feedstock assessment for SAF production',
    'saf.news.europe.key': 'Europe key region with US, Brazil and India',
    'saf.news.agricultural.residues': '58% of feedstocks will come from agricultural residues',
    'saf.news.technology.barrier': 'Technology deployment main barrier, not availability',

    // Regulatory Context
    'regulatory.context.title': 'Regulatory Context',
    'regulatory.context.subtitle': 'Legislative framework and opportunities',
    'regulatory.refueleu': 'ReFuelEU Aviation',
    'regulatory.mandate.2030': '2% SAF mandate by 2030',
    'regulatory.corsia': 'CORSIA',
    'regulatory.carbon.neutral': 'Carbon neutral growth',
    'regulatory.french.strategy': 'French SAF strategy',
    'regulatory.support.production': 'Support for domestic production',

    // Resources Tab
    'resources.title': 'Biomass Resources',
    'resources.subtitle': 'Mapping and analysis of available regional resources',
    'resources.viticulture.waste': 'Viticulture waste',
    'resources.annual.production': 'Total annual production',
    'resources.allocation.title': 'Realistic Flow Allocation',
    'resources.allocation.subtitle': 'Optimized distribution of available resources',
    
    // Flow Allocation  
    'flux.proteges': 'Protected Flows',
    'flux.negociables': 'Negotiable Flows',
    'flux.disponibles': 'Available Flows', 
    'non.disponible': 'Not available',
    'partenariats.requis': 'Partnerships required',
    'compost.vignobles': 'Vineyard compost',
    'biogaz.energetique': 'Energy biogas',
    'extraction.premium': 'Premium extraction',
    'excedent.compost': 'Excess compost',
    'couts.elimination': 'Current disposal costs',
    'boues.traitement': 'Treatment sludge',

    // Infrastructure
    'infrastructure.title': 'Existing Infrastructure',
    'infrastructure.distilleries': 'Distilleries',
    'infrastructure.methanization': 'Methanization',
    'infrastructure.composting': 'Composting',
    'infrastructure.biomass': 'Biomass',

    // Economy Tab
    'economy.title': 'Economic Analysis',
    'economy.subtitle': 'Financial assessment and return on investment',
    'economy.saf.potential': 'SAF potential',
    'economy.annual.revenue': 'Annual revenue',
    'economy.jobs.created': 'Jobs created',
    'economy.market.price': '€476/t market price',
    'economy.direct.employment': 'Direct employment',
    'economy.analysis.modules': 'Economic Analysis Modules',
    'economy.financial.modeling': 'Financial modeling and investment evaluation tools',
    'economy.roi.calculator': 'ROI Calculator',
    'economy.cost.benefit': 'Cost-Benefit',
    'economy.projections': 'Projections',

    // ROI & Financial Terms
    'roi.title': 'Return on Investment',
    'irr.full': 'Internal Rate of Return',
    'irr.acronym': 'IRR',
    'roi.acronym': 'ROI',
    'npv.full': 'Net Present Value',
    'npv.acronym': 'NPV',

    // Job Types
    'jobs.direct': 'direct',
    'jobs.indirect': 'indirect',
    'jobs.production': 'Production',
    'jobs.logistics': 'Logistics',
    'jobs.maintenance': 'Maintenance',
    'jobs.administration': 'Administration',

    // Partnerships Tab
    'partnerships.title': 'Strategic Partnerships',
    'partnerships.subtitle': 'Collaborative opportunities and value chain',
    'partnerships.value.proposition': 'Value Proposition',
    'partnerships.waste.disposal': 'Waste disposal company options',
    'partnerships.communal.sites': 'Communal disposal sites',
    'partnerships.case.studies': 'Research article case studies',
    'partnerships.sustainable.farms': 'Self-sustainable wineries/farms examples',

    // Units (SI Standard)
    'tonnes': 't',
    'kilotonnes': 'kt', 
    'litres': 'L',
    'hectares': 'ha',
    'potentiel.saf': 'million liters SAF',
    'millions.euros': 'M€',
    'emplois': 'jobs',
    
    // Common Terms
    'total': 'Total',
    'disponible': 'available',
    'partenariat': 'partnership',
    'surplus.excedents': 'surplus excess'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [debugMode, setDebugMode] = useState(false);

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      if (debugMode) {
        console.warn(`Missing translation for key: ${key} in language: ${language}`);
      }
      return key; // Return the key itself if translation is missing
    }
    return translation;
  };

  const toggleDebug = () => {
    setDebugMode(!debugMode);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      debugMode,
      toggleDebug 
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
