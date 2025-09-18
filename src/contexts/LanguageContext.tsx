import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
    'nav.partenaires': 'Partenariats',
    'nav.donnees': 'Données',
    'nav.contact': 'Contact',

    // Overview Section
    'points.cles': 'Points clés',
    'points.cles.subtitle': 'Indicateurs économiques et techniques essentiels',
    'superficie.viticole': 'Superficie viticole',
    'hectares': 'hectares',
    'base.regionale': 'Base régionale',
    'production.marc': 'Production de marc',
    'tonnes': 'tonnes',
    'matiere.premiere': 'Matière première',
    'allocation.flux': 'Allocation des flux',
    'disponible.saf': 'Disponible pour SAF',
    'potentiel.saf': 'Potentiel SAF',
    'litres.an': 'litres/an',
    'resources.safPotentialSubtitle': 'Potentiel annuel basé sur biomasse disponible',
    'revenue.potential': 'Potentiel de revenu',
    'prix.marche': 'Prix de marché',
    'reduction.co2': 'Réduction de CO₂',
    'tonnes.an': 'tonnes/an',
    'vs.fossile': 'vs carburant fossile',

    // Regional Analysis
    'analyse.regionale': 'Analyse Régionale',
    'analyse.regionale.subtitle': 'Répartition Départementale de la Production',

    // Valorization
    'valorization.title': 'Valorisation actuelle des coproduits',
    'valorization.distillation': 'Distillation',
    'valorization.composting': 'Compostage',
    'valorization.methanization': 'Méthanisation',
    'valorization.direct.spreading': 'Épandage direct',

    // Biomass Strategy
    'strategie.biomasse': 'Stratégie de mobilisation de la biomasse',
    'base.conservative': 'Base conservatrice',
    'flux.elimination': 'Flux d\'élimination',
    'potentiel.negociable': 'Potentiel négociable',
    'surplus.excedents': 'Surplus / excédents',
    'total.accessible': 'Total accessible',
    'avec.partenariats': 'avec partenariats',
    'respecte.filieres': 'Respect des filières existantes',

    // Economic Analysis / ROI
    'economics.title': 'Analyse Économique',
    'economics.subtitle': 'Modélisation financière et analyse de rentabilité par région',
    'allocation.realiste': 'Allocation Réaliste des Flux',
    'allocation.realiste.subtitle': 'Hiérarchisation respectueuse des besoins existants',
    'modules.economiques': 'Modules d\'Analyse Économique',
    'roi.calculator': 'Calculateur ROI',
    'roi.calculator.subtitle': 'Retour sur investissement basé sur la biomasse disponible',
    'roi.advanced': 'Calculateur ROI Avancé',
    'roi.real.data': 'Données Réelles',
    'exporter': 'Exporter',
    'scenario.conservative': 'Conservateur',
    'scenario.realistic': 'Réaliste',
    'scenario.optimistic': 'Optimiste',
    'scenario.parameters': 'Paramètres du Scénario',
    'biomass.input': 'Biomasse d\'entrée (tonnes/an)',
    'processing.efficiency': 'Efficacité de traitement (%)',
    'saf.price': 'Prix SAF (€/L)',
    'operating.costs': 'Coûts opérationnels (€/L)',
    'capital.investment': 'Investissement capital (M€)',
    'annual.saf': 'Litres SAF/an',
    'roi.5y': 'ROI (5 ans)',
    'years.to.return': 'Années de retour',
    'irr': 'TRI',
    'annual.revenue': 'Revenus bruts',
    'annual.costs': 'Coûts opérationnels',
    'gross.profit': 'Profit brut',
    'financial.indicators': 'Indicateurs Financiers',
    'npv.10y': 'VAN (10 ans, 8%)',
    'gross.margin': 'Marge brute',
    'capital.required': 'Capital requis',
    'cost.benefit.analysis': 'Analyse Coût-Bénéfice',
    'comparison': 'Comparaison',
    'timeline': 'Timeline',
    'breakdown': 'Répartition',
    'profit.improvement': 'Amélioration profit',
    'additional.benefit': 'Bénéfice additionnel',
    'jobs.created': 'Emplois créés',
    'co2.avoided': 'CO₂ évité/an',
    'actual.data': 'Données réelles',
    'economic.projections': 'Projections Économiques',
    '5y.projections': '5 ans',
    '10y.projections': '10 ans',
    'certified.data': 'Données Certifiées',

    // Partnerships
    'partnerships.title': 'Partenariats Stratégiques',
    'partnerships.subtitle': '{count} partenaires confirmés pour {volume} tonnes de marc collecté',
    'partners.total': 'Total confirmés',
    'partners.communes': 'Communes',
    'partners.local.authorities': 'Collectivités locales',
    'partners.industry': 'Industriels',
    'partners.wineries': 'Caves et négoces',
    'coverage': 'Couverture',
    'region.covered': 'Région couverte',
    'partners.main': 'Partenaires Principaux',
    'partners.optimized': 'Volume et distance de collecte optimisés',
    'partners.type': 'Type',
    'partners.volume': 'Volume (t/an)',
    'partners.distance': 'Distance (km)',
    'partners.saf': 'SAF (ML)',

    // Implementation / Timeline
    'implementation.title': 'Planification Mise en Œuvre',
    'timeline.title': 'Timeline d\'Implémentation',
    'feasibility.study': 'Étude de Faisabilité',
    'partnerships.development': 'Développement Partenariats',
    'financing.permissions': 'Financement et Autorisations',
    'infrastructure.construction': 'Construction Infrastructure',
    'production.start': 'Démarrage Production',
    'regional.expansion': 'Expansion Régionale',
    'progress.completed': 'Terminé',
    'progress.percent': 'Progression',
    'milestones': 'Jalons',
    'stakeholders': 'Parties Prenantes',
    'dependencies': 'Dépendances',
    'risks': 'Risques Identifiés',
    'project.summary': 'Résumé Global du Projet',
    'phases.completed': 'Phases terminées',
    'phases.ongoing': 'Phases en cours',
    'progress.total': 'Progression totale',
    'months.estimated': 'Mois estimés',

    // Data & Methodology
    'data.title': 'Données et Méthodologie',
    'data.subtitle': 'Sources certifiées et validation scientifique des calculs',
    'data.validated': 'Données Clés Validées',
    'methodology.title': 'Méthodologie et Conformité',
    'methodology.subtitle': 'Approche technique et cadre réglementaire',
    'methodology.export': 'Exporter',
    'methodology.flowchart': 'Diagramme de flux',
    'methodology.parameters': 'Paramètres clés',
    'methodology.validation': 'Validation',
    'data.collection': 'Collecte et Préparation',
    'steps.detailed': 'Étapes détaillées',
    'step.fermentation': 'Fermentation Alcoolique',
    'step.distillation': 'Distillation',
    'step.atj.conversion': 'Conversion ATJ',
    'regulatory.compliance': 'Conformité Réglementaire',
    'regulatory.report': 'Rapport',
    'regulatory.eu': 'Union Européenne',
    'regulatory.france': 'France',
    'regulatory.international': 'International',

    // Compliance Mandates
    'red2.directive': 'Directive RED II',
    'refueleu.aviation': 'ReFuelEU Aviation',
    'taxonomy.ue': 'Taxonomie Verte UE',

    // References & Publications
    'references.title': 'Références et Méthodologie',
    'references.academic': 'Références Académiques',
    'search.placeholder': 'Rechercher par titre, auteur ou mot-clé...',
    'search.all': 'Toutes',
    'search.results': 'Recherche',

    // Footer
    'footer.project.description': 'Projet SAF {region}',
    'footer.revenues': 'Revenus estimés',
    'footer.co2.avoided': 'CO₂ évité',
    'footer.methodology.standards': 'Méthodologie et normes',
    'footer.certifications.audits': 'Certifications et audits',
    'footer.institutional.partners': 'Partenaires institutionnels',
    'footer.primary.data.sources': 'Sources de données principales',
    'footer.scientific.validation': 'Validation scientifique',
    'footer.international.standards': 'Normes internationales',
    'footer.copyright': '© 2025',
    'footer.data.updated': 'Mise à jour des données',
    'footer.next.revision': 'Prochaine révision',
    'footer.legal.notices': 'Mentions légales',
    'footer.data.protection': 'Protection des données',
    'footer.terms.of.use': 'Conditions d\'utilisation',
    'footer.disclaimer.title': 'Clause de non-responsabilité',
    'footer.disclaimer.text': 'Les données sont fournies à titre indicatif et peuvent évoluer.'
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
    'header.subtitle': 'Valorization of vineyard biomass into feedstock',
    'nav.vue.ensemble': 'Overview',
    'nav.economie': 'Economics',
    'nav.ressources': 'Resources',
    'nav.partenaires': 'Partnerships',
    'nav.donnees': 'Data',
    'nav.contact': 'Contact',

    // Overview Section
    'points.cles': 'Key Points',
    'points.cles.subtitle': 'Key economic and technical indicators',
    'superficie.viticole': 'Vineyard Area',
    'hectares': 'hectares',
    'base.regionale': 'Regional Base',
    'production.marc': 'Pomace Production',
    'tonnes': 'tonnes',
    'matiere.premiere': 'Feedstock',
    'allocation.flux': 'Flow Allocation',
    'disponible.saf': 'Available for SAF',
    'potentiel.saf': 'SAF Potential',
    'litres.an': 'litres/year',
    'resources.safPotentialSubtitle': 'Annual potential based on available biomass',
    'revenue.potential': 'Revenue Potential',
    'prix.marche': 'Market Price',
    'reduction.co2': 'CO₂ Reduction',
    'tonnes.an': 'tonnes/year',
    'vs.fossile': 'vs fossil fuel',

    // Regional Analysis
    'analyse.regionale': 'Regional Analysis',
    'analyse.regionale.subtitle': 'Departmental Distribution of Production',

    // Valorization
    'valorization.title': 'Current Coproduct Valorization',
    'valorization.distillation': 'Distillation',
    'valorization.composting': 'Composting',
    'valorization.methanization': 'Methanization',
    'valorization.direct.spreading': 'Direct Spreading',

    // Biomass Strategy
    'strategie.biomasse': 'Biomass Mobilization Strategy',
    'base.conservative': 'Conservative Base',
    'flux.elimination': 'Elimination Flows',
    'potentiel.negociable': 'Negotiable Potential',
    'surplus.excedents': 'Surplus / Excess',
    'total.accessible': 'Total Accessible',
    'avec.partenariats': 'With Partnerships',
    'respecte.filieres': 'Respects Existing Value Chains',

    // Economic Analysis / ROI
    'economics.title': 'Economic Analysis',
    'economics.subtitle': 'Financial modeling and regional profitability analysis',
    'allocation.realiste': 'Realistic Flow Allocation',
    'allocation.realiste.subtitle': 'Prioritization respecting existing needs',
    'modules.economiques': 'Economic Analysis Modules',
    'roi.calculator': 'ROI Calculator',
    'roi.calculator.subtitle': 'Return on investment based on available biomass',
    'roi.advanced': 'Advanced ROI Calculator',
    'roi.real.data': 'Real Data',
    'exporter': 'Export',
    'scenario.conservative': 'Conservative',
    'scenario.realistic': 'Realistic',
    'scenario.optimistic': 'Optimistic',
    'scenario.parameters': 'Scenario Parameters',
    'biomass.input': 'Input Biomass (t/year)',
    'processing.efficiency': 'Processing Efficiency (%)',
    'saf.price': 'SAF Price (€/L)',
    'operating.costs': 'Operating Costs (€/L)',
    'capital.investment': 'Capital Investment (M€)',
    'annual.saf': 'SAF Litres/year',
    'roi.5y': 'ROI (5 years)',
    'years.to.return': 'Years to Return',
    'irr': 'IRR',
    'annual.revenue': 'Annual Revenue',
    'annual.costs': 'Annual Operating Costs',
    'gross.profit': 'Gross Profit',
    'financial.indicators': 'Financial Indicators',
    'npv.10y': 'NPV (10 years, 8%)',
    'gross.margin': 'Gross Margin',
    'capital.required': 'Capital Required',
    'cost.benefit.analysis': 'Cost-Benefit Analysis',
    'comparison': 'Comparison',
    'timeline': 'Timeline',
    'breakdown': 'Breakdown',
    'profit.improvement': 'Profit Improvement',
    'additional.benefit': 'Additional Benefit',
    'jobs.created': 'Jobs Created',
    'co2.avoided': 'CO₂ Avoided/year',
    'actual.data': 'Real Data',
    'economic.projections': 'Economic Projections',
    '5y.projections': '5 Years',
    '10y.projections': '10 Years',
    'certified.data': 'Certified Data',

    // Partnerships
    'partnerships.title': 'Strategic Partnerships',
    'partnerships.subtitle': '{count} confirmed partners for {volume} tonnes of pomace collected',
    'partners.total': 'Total Confirmed',
    'partners.communes': 'Municipalities',
    'partners.local.authorities': 'Local Authorities',
    'partners.industry': 'Industrials',
    'partners.wineries': 'Wineries & Traders',
    'coverage': 'Coverage',
    'region.covered': 'Region Covered',
    'partners.main': 'Main Partners',
    'partners.optimized': 'Volume and collection distance optimized',
    'partners.type': 'Type',
    'partners.volume': 'Volume (t/year)',
    'partners.distance': 'Distance (km)',
    'partners.saf': 'SAF (ML)',

    // Implementation / Timeline
    'implementation.title': 'Implementation Planning',
    'timeline.title': 'Implementation Timeline',
    'feasibility.study': 'Feasibility Study',
    'partnerships.development': 'Partnership Development',
    'financing.permissions': 'Financing & Permissions',
    'infrastructure.construction': 'Infrastructure Construction',
    'production.start': 'Production Start',
    'regional.expansion': 'Regional Expansion',
    'progress.completed': 'Completed',
    'progress.percent': 'Progress',
    'milestones': 'Milestones',
    'stakeholders': 'Stakeholders',
    'dependencies': 'Dependencies',
    'risks': 'Identified Risks',
    'project.summary': 'Project Overview',
    'phases.completed': 'Completed Phases',
    'phases.ongoing': 'Ongoing Phases',
    'progress.total': 'Total Progress',
    'months.estimated': 'Estimated Months',

    // Data & Methodology
    'data.title': 'Data & Methodology',
    'data.subtitle': 'Certified sources and scientific validation of calculations',
    'data.validated': 'Validated Key Data',
    'methodology.title': 'Methodology & Compliance',
    'methodology.subtitle': 'Technical approach and regulatory framework',
    'methodology.export': 'Export',
    'methodology.flowchart': 'Flowchart',
    'methodology.parameters': 'Key Parameters',
    'methodology.validation': 'Validation',
    'data.collection': 'Collection & Preparation',
    'steps.detailed': 'Detailed Steps',
    'step.fermentation': 'Alcoholic Fermentation',
    'step.distillation': 'Distillation',
    'step.atj.conversion': 'ATJ Conversion',
    'regulatory.compliance': 'Regulatory Compliance',
    'regulatory.report': 'Report',
    'regulatory.eu': 'European Union',
    'regulatory.france': 'France',
    'regulatory.international': 'International',

    // Compliance Mandates
    'red2.directive': 'RED II Directive',
    'refueleu.aviation': 'ReFuelEU Aviation',
    'taxonomy.ue': 'EU Green Taxonomy',

    // References & Publications
    'references.title': 'References & Methodology',
    'references.academic': 'Academic References',
    'search.placeholder': 'Search by title, author or keyword...',
    'search.all': 'All',
    'search.results': 'Search Results',

    // Footer
    'footer.project.description': 'SAF Project {region}',
    'footer.revenues': 'Estimated Revenues',
    'footer.co2.avoided': 'CO₂ Avoided',
    'footer.methodology.standards': 'Methodology & Standards',
    'footer.certifications.audits': 'Certifications & Audits',
    'footer.institutional.partners': 'Institutional Partners',
    'footer.primary.data.sources': 'Primary Data Sources',
    'footer.scientific.validation': 'Scientific Validation',
    'footer.international.standards': 'International Standards',
    'footer.copyright': '© 2025',
    'footer.data.updated': 'Data Updated',
    'footer.next.revision': 'Next Revision',
    'footer.legal.notices': 'Legal Notices',
    'footer.data.protection': 'Data Protection',
    'footer.terms.of.use': 'Terms of Use',
    'footer.disclaimer.title': 'Disclaimer',
    'footer.disclaimer.text': 'Data is indicative and may evolve over time.'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string, params?: Record<string, string | number>) => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    if (params) {
      return Object.keys(params).reduce(
        (str, param) => str.replace(`{${param}}`, String(params[param])),
        translation
      );
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
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
