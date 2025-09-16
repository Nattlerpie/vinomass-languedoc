import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
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
    
    // Navigation & Header
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorisation du marc de raisin en carburant aviation durable',
    'nav.vue.ensemble': 'Vue d\'ensemble',
    'nav.economie': 'Économie',
    'nav.ressources': 'Ressources',
    'nav.partenaires': 'Partenaires',
    'nav.donnees': 'Données',
    'nav.contact': 'Contact',
    
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
    
    // Points Clés (Vue d'ensemble)
    'points.cles': 'Points Clés',
    'points.cles.subtitle': 'Indicateurs économiques et techniques essentiels',
    'superficie.viticole': 'Superficie viticole',
    'production.marc': 'Production annuelle de marc',
    'allocation.flux': 'Allocation Réaliste des Flux',
    'potentiel.saf': 'Potentiel SAF (70% efficacité)',
    'revenue.potential': 'Potentiel de revenus',
    'reduction.co2': 'Réduction CO₂',
    'hectares': 'hectares',
    'tonnes': 'tonnes',
    'base.regionale': 'Base régionale',
    'matiere.premiere': 'Matière première totale',
    'disponible.saf': 'disponible pour SAF',
    'vs.fossile': 'vs carburant fossile',
    'prix.marche': 'Prix marché ATJ',
    'revenus.annuels': 'Revenus annuels',
    'emplois.crees': 'Emplois créés',
    'retour.investissement': 'Retour investissement',
    'ans.payback': 'Ans payback',
    
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
    'respecte.filieres': 'Cette approche respecte les filières établies tout en démontrant un potentiel d\'expansion pour répondre à la demande croissante SAF.',
    
    // Valorization Methods
    'valorization.title': 'Méthodes de Valorisation Actuelles',
    'valorization.distillation': 'Distillation',
    'valorization.composting': 'Compostage', 
    'valorization.methanization': 'Méthanisation',
    'valorization.direct.spreading': 'Épandage direct',
    'valorization.percentage': 'pourcentage',
    
    // Regional Context
    'contexte.regional': 'Contexte Régional',
    'contexte.regional.subtitle': 'Leadership national et potentiel économique',
    'region.viticole.francaise': 'Région viticole française',
    'region.premium.champagne': 'Région Premium Champagne',
    'volume.production': 'En volume de production',
    'marche.prestige': 'Marché de prestige',
    'production.nationale': 'De la production nationale',
    'millions.hectolitres': 'millions d\'hectolitres',
    'segment.premium': 'segment premium',
    'ca.annuel': 'Chiffre d\'affaires annuel',
    'secteur.vitivinicole': 'Secteur vitivinicole régional',
    
    // Key Highlights
    'highlights.title': 'Points Clés',
    'production.locale': 'Production locale de',
    'reduction.annuelle': 'Réduction de',
    'emplois.directs': 'emplois directs et indirects',
    'partenariats.communaux': 'partenariats communaux',
    
    // Business Case
    'business.case': 'Business Case',
    'mise.oeuvre': 'Mise en Œuvre',
    'phase.etudes': 'Phase 1: Études techniques (6 mois)',
    'phase.construction': 'Phase 2: Construction (18 mois)',
    'phase.production': 'Phase 3: Production (2025)',
    'financement.total': 'Financement: €180M total',
    
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
    'neutralite.carbone': 'neutralité carbone',
    'region.coming.soon': '(Bientôt)',
    
    // Resources Tab
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
    'resources.disclaimer': '* Estimations basées sur les technologies ATJ (Alcohol-to-Jet) et les conditions de marché actuelles',
    
    // Footer translations
    'footer.project.description': 'Valorisation du marc de raisin en carburant aviation durable. Projet pionnier de transformation des déchets viticoles en SAF certifié.',
    'footer.revenues': 'revenus',
    'footer.co2.avoided': 'CO₂ évités',
    'footer.methodology.standards': 'Méthodologie & Standards',
    'footer.certifications.audits': 'Certifications & Audits',
    'footer.institutional.partners': 'Partenaires Institutionnels',
    'footer.primary.data.sources': 'Sources de Données Primaires',
    'footer.scientific.validation': 'Validation Scientifique',
    'footer.international.standards': 'Standards Internationaux',
    'footer.copyright': 'Projet SAF {region}. Tous droits réservés.',
    'footer.data.updated': 'Données mises à jour: Décembre 2023',
    'footer.next.revision': 'Prochaine révision: Mars 2024',
    'footer.legal.notices': 'Mentions légales',
    'footer.data.protection': 'Protection des données',
    'footer.terms.of.use': 'Conditions d\'utilisation',
    'footer.disclaimer.title': 'Avertissement:',
    'footer.disclaimer.text': 'Les projections financières et techniques présentées sont basées sur des données réelles 2023 et des hypothèses validées par des experts indépendants. Les résultats futurs peuvent varier selon les conditions de marché. Ce document ne constitue pas un conseil en investissement.',
    
    // Methodology
    'methodology.atj.title': 'Méthodologie ATJ',
    'methodology.atj.description': 'Processus Alcohol-to-Jet certifié ASTM D7566',
    'methodology.agreste.title': 'Données Agreste',
    'methodology.agreste.description': 'Statistiques agricoles officielles France',
    'methodology.ifv.title': 'Institut IFV',
    'methodology.ifv.description': 'Institut Français de la Vigne et du Vin',
    'methodology.corsia.title': 'Standards CORSIA',
    'methodology.corsia.description': 'ICAO Carbon Offsetting Scheme',
    
    // Credentials
    'credentials.bureau.veritas': 'Données certifiées par Bureau Veritas',
    'credentials.astm.compliance': 'Conformité ASTM D7566 & EN 15940',
    'credentials.corsia.validation': 'Validation CORSIA pour crédits carbone',
    'credentials.quarterly.audit': 'Audit indépendant trimestriel',
    'credentials.peer.reviewed': 'Méthodologie peer-reviewed',
    
    // Partners - Languedoc
    'partners.region.occitanie': 'Région Occitanie',
    'partners.ifv': 'Institut Français de la Vigne (IFV)',
    'partners.safer.languedoc': 'SAFER Languedoc',
    'partners.chamber.herault': 'Chambre d\'Agriculture Hérault',
    'partners.vignerons.union': 'Syndicat des Vignerons',
    
    // Partners - Champagne
    'partners.region.grand.est': 'Région Grand Est',
    'partners.safer.champagne': 'SAFER Champagne',
    'partners.chamber.champagne': 'Chambre d\'Agriculture Champagne',
    'partners.champagne.union': 'Syndicat Général des Vignerons de Champagne',
    
    // Data Sources
    'data.sources.agreste': 'Agreste - Statistiques agricoles nationales',
    'data.sources.ifv': 'IFV - Production et rendements viticoles',
    'data.sources.oiv': 'OIV - Standards internationaux',
    'data.sources.aviation.fuel': 'Aviation Fuel Analytics - Prix SAF',
    
    // Validation
    'validation.peer.review': 'Peer-review par comité scientifique',
    'validation.bureau.veritas': 'Validation Bureau Veritas',
    'validation.iso.compliance': 'Conformité ISO 14064 & 14067',
    'validation.carbon.audit': 'Audit carbone tiers indépendant',
    
    // Standards
    'standards.astm.d7566': 'ASTM D7566 - Jet fuel specifications',
    'standards.corsia.icao': 'CORSIA - ICAO carbon offsetting',
    'standards.red.ii': 'RED II - Renewable Energy Directive',
    'standards.iscc.eu': 'ISCC EU - Sustainability certification',
    
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
    
    // Navigation & Header
    'header.title': 'SAF {region}',
    'header.subtitle': 'Valorization of grape pomace into sustainable aviation fuel',
    'nav.vue.ensemble': 'Overview',
    'nav.economie': 'Economics',
    'nav.ressources': 'Resources',
    'nav.partenaires': 'Partners',
    'nav.donnees': 'Data',
    'nav.contact': 'Contact',
    
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
    'base.regionale': 'Regional base',
    'matiere.premiere': 'Total raw material',
    'disponible.saf': 'available for SAF',
    'vs.fossile': 'vs fossil fuel',
    'prix.marche': 'ATJ market price',
    'revenus.annuels': 'Annual revenue',
    'emplois.crees': 'Jobs created',
    'retour.investissement': 'Return on investment',
    'ans.payback': 'Years payback',
    
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
    'respecte.filieres': 'This approach respects established supply chains while demonstrating expansion potential to meet growing SAF demand.',
    
    // Valorization Methods
    'valorization.title': 'Current Valorization Methods',
    'valorization.distillation': 'Distillation',
    'valorization.composting': 'Composting',
    'valorization.methanization': 'Methanization', 
    'valorization.direct.spreading': 'Direct spreading',
    'valorization.percentage': 'percentage',
    
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
    
    // Key Highlights
    'highlights.title': 'Key Highlights',
    'production.locale': 'Local production of',
    'reduction.annuelle': 'reduction of',
    'emplois.directs': 'direct and indirect jobs',
    'partenariats.communaux': 'municipal partnerships',
    
    // Business Case
    'business.case': 'Business Case',
    'mise.oeuvre': 'Implementation',
    'phase.etudes': 'Phase 1: Technical studies (6 months)',
    'phase.construction': 'Phase 2: Construction (18 months)',
    'phase.production': 'Phase 3: Production (2025)',
    'financement.total': 'Financing: €180M total',
    
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
    'neutralite.carbone': 'carbon neutrality',
    'region.coming.soon': '(Coming Soon)',
    
    // Resources Tab
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
    'resources.disclaimer': '* Estimates based on ATJ (Alcohol-to-Jet) technologies and current market conditions',
    
    // Footer translations
    'footer.project.description': 'Valorization of grape pomace into sustainable aviation fuel. Pioneer project for transforming viticultural waste into certified SAF.',
    'footer.revenues': 'revenues',
    'footer.co2.avoided': 'CO₂ avoided',
    'footer.methodology.standards': 'Methodology & Standards',
    'footer.certifications.audits': 'Certifications & Audits',
    'footer.institutional.partners': 'Institutional Partners',
    'footer.primary.data.sources': 'Primary Data Sources',
    'footer.scientific.validation': 'Scientific Validation',
    'footer.international.standards': 'International Standards',
    'footer.copyright': 'SAF {region} Project. All rights reserved.',
    'footer.data.updated': 'Data updated: December 2023',
    'footer.next.revision': 'Next revision: March 2024',
    'footer.legal.notices': 'Legal notices',
    'footer.data.protection': 'Data protection',
    'footer.terms.of.use': 'Terms of use',
    'footer.disclaimer.title': 'Disclaimer:',
    'footer.disclaimer.text': 'Financial and technical projections are based on real 2023 data and assumptions validated by independent experts. Future results may vary according to market conditions. This document does not constitute investment advice.',
    
    // Methodology
    'methodology.atj.title': 'ATJ Methodology',
    'methodology.atj.description': 'ASTM D7566 certified Alcohol-to-Jet process',
    'methodology.agreste.title': 'Agreste Data',
    'methodology.agreste.description': 'Official French agricultural statistics',
    'methodology.ifv.title': 'IFV Institute',
    'methodology.ifv.description': 'French Institute of Vine and Wine',
    'methodology.corsia.title': 'CORSIA Standards',
    'methodology.corsia.description': 'ICAO Carbon Offsetting Scheme',
    
    // Credentials
    'credentials.bureau.veritas': 'Data certified by Bureau Veritas',
    'credentials.astm.compliance': 'ASTM D7566 & EN 15940 compliance',
    'credentials.corsia.validation': 'CORSIA validation for carbon credits',
    'credentials.quarterly.audit': 'Independent quarterly audit',
    'credentials.peer.reviewed': 'Peer-reviewed methodology',
    
    // Partners - Languedoc
    'partners.region.occitanie': 'Occitanie Region',
    'partners.ifv': 'French Institute of Vine and Wine (IFV)',
    'partners.safer.languedoc': 'SAFER Languedoc',
    'partners.chamber.herault': 'Hérault Chamber of Agriculture',
    'partners.vignerons.union': 'Wine Growers Union',
    
    // Partners - Champagne
    'partners.region.grand.est': 'Grand Est Region',
    'partners.safer.champagne': 'SAFER Champagne',
    'partners.chamber.champagne': 'Champagne Chamber of Agriculture',
    'partners.champagne.union': 'General Union of Champagne Growers',
    
    // Data Sources
    'data.sources.agreste': 'Agreste - National agricultural statistics',
    'data.sources.ifv': 'IFV - Wine production and yields',
    'data.sources.oiv': 'OIV - International standards',
    'data.sources.aviation.fuel': 'Aviation Fuel Analytics - SAF prices',
    
    // Validation
    'validation.peer.review': 'Peer-review by scientific committee',
    'validation.bureau.veritas': 'Bureau Veritas validation',
    'validation.iso.compliance': 'ISO 14064 & 14067 compliance',
    'validation.carbon.audit': 'Independent carbon audit',
    
    // Standards
    'standards.astm.d7566': 'ASTM D7566 - Jet fuel specifications',
    'standards.corsia.icao': 'CORSIA - ICAO carbon offsetting',
    'standards.red.ii': 'RED II - Renewable Energy Directive',
    'standards.iscc.eu': 'ISCC EU - Sustainability certification',
    
    // Tooltip
    'tooltip.source': 'Source: Agreste 2023, OIV data'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key] || key;
    
    // Handle parameter replacement like {region}, {years}, {tonnage}, etc.
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
