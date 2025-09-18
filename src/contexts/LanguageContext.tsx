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

    // Footer sections
    'footer.methodologyTitle': 'Méthodologie et normes',
    'footer.methodologyDescription': 'Approche technique validée par des organismes certifiés',
    'footer.methodATJ': 'Processus ATJ (Alcohol-to-Jet) certifié ASTM D7566-20',
    'footer.methodAgreste': 'Données Agreste France (Ministère Agriculture)',
    'footer.methodIFV': 'Institut Français de la Vigne et du Vin',
    'footer.methodCORSIA': 'Standards CORSIA pour l\'aviation durable',
    'footer.certificationsTitle': 'Certifications et audits',
    'footer.certBureauVeritas': 'Bureau Veritas - Audit de conformité',
    'footer.certASTM': 'ASTM D7566-20 - Standard carburant aviation',
    'footer.certCORSIA': 'CORSIA - Aviation civile internationale',
    'footer.certQuarterly': 'Audits trimestriels indépendants',
    'footer.certPeerReviewed': 'Publications académiques peer-reviewed',
    'footer.institutionalPartners': 'Partenaires institutionnels',
    'footer.dataSources': 'Sources de données principales',
    'footer.dataAgreste': 'Agreste - Statistiques agricoles France',
    'footer.dataIFV': 'Institut Français de la Vigne et du Vin',
    'footer.dataOIV': 'Organisation Internationale de la Vigne',
    'footer.dataFuelMarket': 'Marchés carburants aviation Europe',
    'footer.scientificValidation': 'Validation scientifique',
    'footer.validationPeer': 'Comité de lecture scientifique international',
    'footer.validationBureau': 'Bureau Veritas - Certification ISO 14067',
    'footer.validationISO': 'Normes ISO 14040/14044 - ACV',
    'footer.validationCarbon': 'Certification empreinte carbone',
    'footer.internationalStandards': 'Normes internationales',
    'footer.standardASTM': 'ASTM D7566-20 - Carburant aviation durable',
    'footer.standardCORSIA': 'CORSIA - Réduction émissions aviation',
    'footer.standardRED': 'Directive RED II - Énergies renouvelables',
    'footer.standardISCC': 'ISCC EU - Certification durabilité',
    'footer.copyright': 'Atlas Biomasse Vitivinicole - Tous droits réservés',
    'footer.dataUpdate': 'Données mises à jour : Janvier 2025',
    'footer.legalNotices': 'Mentions légales et protection des données',

    // Partners
    'partners.region': 'Région {region}',
    'partners.ifv': 'Institut Français de la Vigne et du Vin',
    'partners.safer': 'SAFER - Sociétés d\'aménagement foncier',
    'partners.chamber': 'Chambres d\'agriculture régionales',
    'partners.union': 'Syndicats viticoles départementaux',

    // Tooltip
    'tooltip.source': 'Source: Données Agreste 2023',
    'region.coming.soon': 'Bientôt disponible',

    // Additional translations for tabs and components
    'keyMetrics': 'Indicateurs Clés',
    'regionalAnalysis': 'Analyse Régionale',
    'biomassStrategy': 'Stratégie Biomasse',
    'context': 'Contexte',
    'industryNews': 'Actualités du Secteur',
    'regulations': 'Réglementations',

    // Infrastructure translations
    'infrastructure.title': 'Infrastructure Régionale',
    'infrastructure.distilleries': 'Distilleries',
    'infrastructure.methanization': 'Méthanisation',
    'infrastructure.composting': 'Compostage',
    'infrastructure.biomass': 'Biomasse énergie'
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

    // Footer sections
    'footer.methodologyTitle': 'Methodology and standards',
    'footer.methodologyDescription': 'Technical approach validated by certified organizations',
    'footer.methodATJ': 'ATJ (Alcohol-to-Jet) process certified ASTM D7566-20',
    'footer.methodAgreste': 'Agreste France Data (Ministry of Agriculture)',
    'footer.methodIFV': 'French Institute of Vine and Wine',
    'footer.methodCORSIA': 'CORSIA standards for sustainable aviation',
    'footer.certificationsTitle': 'Certifications and audits',
    'footer.certBureauVeritas': 'Bureau Veritas - Compliance audit',
    'footer.certASTM': 'ASTM D7566-20 - Aviation fuel standard',
    'footer.certCORSIA': 'CORSIA - International civil aviation',
    'footer.certQuarterly': 'Independent quarterly audits',
    'footer.certPeerReviewed': 'Peer-reviewed academic publications',
    'footer.institutionalPartners': 'Institutional partners',
    'footer.dataSources': 'Primary data sources',
    'footer.dataAgreste': 'Agreste - French agricultural statistics',
    'footer.dataIFV': 'French Institute of Vine and Wine',
    'footer.dataOIV': 'International Organisation of Vine and Wine',
    'footer.dataFuelMarket': 'European aviation fuel markets',
    'footer.scientificValidation': 'Scientific validation',
    'footer.validationPeer': 'International scientific review committee',
    'footer.validationBureau': 'Bureau Veritas - ISO 14067 certification',
    'footer.validationISO': 'ISO 14040/14044 standards - LCA',
    'footer.validationCarbon': 'Carbon footprint certification',
    'footer.internationalStandards': 'International standards',
    'footer.standardASTM': 'ASTM D7566-20 - Sustainable aviation fuel',
    'footer.standardCORSIA': 'CORSIA - Aviation emissions reduction',
    'footer.standardRED': 'RED II Directive - Renewable energies',
    'footer.standardISCC': 'ISCC EU - Sustainability certification',
    'footer.copyright': 'Viticultural Biomass Atlas - All rights reserved',
    'footer.dataUpdate': 'Data updated: January 2025',
    'footer.legalNotices': 'Legal notices and data protection',

    // Partners
    'partners.region': '{region} Region',
    'partners.ifv': 'French Institute of Vine and Wine',
    'partners.safer': 'SAFER - Land development companies',
    'partners.chamber': 'Regional chambers of agriculture',
    'partners.union': 'Departmental wine unions',

    // Tooltip
    'tooltip.source': 'Source: Agreste Data 2023',
    'region.coming.soon': 'Coming soon',

    // Additional translations for tabs and components
    'keyMetrics': 'Key Metrics',
    'regionalAnalysis': 'Regional Analysis',
    'biomassStrategy': 'Biomass Strategy',
    'context': 'Context',
    'industryNews': 'Industry News',
    'regulations': 'Regulations',

    // Infrastructure translations
    'infrastructure.title': 'Regional Infrastructure',
    'infrastructure.distilleries': 'Distilleries',
    'infrastructure.methanization': 'Methanization',
    'infrastructure.composting': 'Composting',
    'infrastructure.biomass': 'Biomass energy'
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
