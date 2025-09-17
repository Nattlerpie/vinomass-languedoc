import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en';

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation & General
    'nav.overview': 'Aperçu',
    'nav.data': 'Données',
    'nav.economy': 'Économie',
    'nav.partnerships': 'Partenariats',
    'nav.resources': 'Ressources',
    'nav.contact': 'Contact',
    'general.loading': 'Chargement...',
    'general.error': 'Erreur',
    'footer.copyright': 'SAF - Tous droits réservés',
    
    // Overview Tab
    'overview.title': 'Aperçu du Projet',
    'overview.subtitle': 'Vue d\'ensemble des opportunités SAF régionales',
    'overview.keyPoints': 'Points Clés',
    'overview.keyPointsSubtitle': 'Indicateurs économiques et techniques essentiels',
    'overview.vineyardSurface': 'Superficie viticole',
    'overview.vineyardBase': 'Base régionale',
    'overview.annualPomace': 'Production annuelle de marc',
    'overview.totalRawMaterial': 'Matière première totale',
    'overview.realisticAllocation': 'Allocation Réaliste des Flux',
    'overview.availableForSAF': 'disponible pour SAF',
    'overview.safPotential': 'Potentiel SAF (70% efficacité)',
    'overview.basedOnAvailable': 'Basé sur disponible',
    'overview.revenuePotential': 'Revenue Potential',
    'overview.co2Reduction': 'Réduction CO₂',
    'overview.vsFossil': 'vs carburant fossile',
    'overview.regionalContext': 'Contexte Régional',
    'overview.leaderPosition': 'Position de leader national dans la production viticole',
    
    // Resources Tab - French
    'resources.title': 'Ressources Biomasse',
    'resources.subtitle': 'Cartographie et analyse des ressources régionales disponibles',
    'resources.biomassTotal': 'Biomasse Totale',
    'resources.availableForSAF': 'Disponible pour SAF',
    'resources.safProduction': 'Production SAF',
    'resources.revenuesPotential': 'Potentiel Revenus',
    'resources.allocationTitle': 'Allocation Réaliste des Flux',
    'resources.otherValorisations': 'Autres Valorisations',
    'resources.methodology': 'Méthodologie & Sources',
    'resources.wasteHierarchy': 'Hiérarchie des Déchets',
    'resources.scientificSources': 'Sources Scientifiques',
    'resources.importantNote': 'Note Importante',
    'resources.regionalMapping': 'Cartographie Régionale',
    'resources.topCommunes': 'Principales Communes Productrices',
    'resources.biomassBreakdown': 'Répartition de la Biomasse',
    'resources.seasonalTimeline': 'Calendrier Saisonnier',
    'resources.existingInfra': 'Infrastructure Existante',
    'resources.analyzedRegion': 'Région analysée',
    'resources.hectaresVineyards': 'hectares de vignes',
    'resources.mappedCommunes': 'communes cartographiées',
    'resources.dataUpdated': 'Données mises à jour selon les dernières statistiques Agreste et analyses IFV',
    'resources.lowValueWaste': 'Flux de déchets à faible valeur, actuellement coûteux à éliminer',
    'resources.existingUses': 'Compostage, méthanisation, utilisations premium existantes',
    'resources.allocation30Note': 'Cette allocation de 30% pour SAF est basée sur l\'analyse des flux de déchets à faible valeur actuellement coûteux à éliminer, garantissant une approche réaliste et respectueuse des usages existants.',
    
    // Contact Tab - French
    'contact.title': 'Contact & Prochaines Étapes',
    'contact.subtitle': 'Transformons ensemble les déchets viticoles en opportunité d\'avenir',
    'contact.businessOpportunities': 'Opportunités de Collaboration',
    'contact.strategicPartnership': 'Partenariat Stratégique',
    'contact.strategicDesc': 'Collaboration et accords commerciaux',
    'contact.investmentOpportunity': 'Opportunité d\'Investissement',
    'contact.investmentDesc': 'Participation financière au projet',
    'contact.technicalSupport': 'Support Technique',
    'contact.technicalDesc': 'Questions techniques et faisabilité',
    'contact.generalInfo': 'Information Générale',
    'contact.generalDesc': 'Demandes d\'information sur le projet',
    'contact.regionalPotential': 'Potentiel Régional',
    'contact.directContact': 'Contact Direct',
    'contact.directLine': 'Ligne directe',
    'contact.generalEmail': 'Email général',
    'contact.scheduleMeeting': 'Prendre RDV',
    'contact.contactForm': 'Formulaire de Contact',
    'contact.fullName': 'Nom complet',
    'contact.yourName': 'Votre nom',
    'contact.phone': 'Téléphone',
    'contact.company': 'Entreprise/Organisation',
    'contact.companyPlaceholder': 'Nom de votre entreprise',
    'contact.role': 'Fonction/Rôle',
    'contact.yourPosition': 'Votre fonction',
    'contact.preferredContact': 'Mode de contact préféré',
    'contact.telephone': 'Téléphone',
    'contact.meeting': 'Réunion',
    'contact.interests': 'Centres d\'intérêt (sélectionnez tous ceux qui s\'appliquent)',
    'contact.feasibilityStudy': 'Étude de faisabilité',
    'contact.projectTimeline': 'Timeline du projet',
    'contact.environmentalImpact': 'Impact environnemental',
    'contact.economicBenefits': 'Retombées économiques',
    'contact.detailedMessage': 'Message détaillé',
    'contact.messagePlaceholder': 'Décrivez vos besoins, questions ou propositions...',
    'contact.sendInquiry': 'Envoyer la Demande',
    'contact.afterInquiry': 'Après votre demande',
    'contact.guaranteedResponse': 'Réponse garantie',
    'contact.firstMeeting': 'Première réunion',
    'contact.detailedProposal': 'Proposition détaillée',
    'contact.thankYou': 'Merci pour votre demande!',
    'contact.thankYouMessage': 'Nous vous contacterons dans les 48 heures pour discuter des opportunités de collaboration.',
    'contact.newInquiry': 'Nouvelle demande',
    'contact.tonesYear': 'tonnes/an',
    'contact.potential': 'potentiel',
    'contact.estimated': 'estimation',
    
    // Common time units
    'time.week': 'semaine',
    'time.month': 'mois',
    'time.hours48': '48h',
    
    // Units
    'units.tonesYear': 'tonnes/an',
    'units.litersYear': 'litres/an',
    'units.hectares': 'hectares',
    'units.ofTotal': 'du total'
  },
  
  en: {
    // Navigation & General
    'nav.overview': 'Overview',
    'nav.data': 'Data',
    'nav.economy': 'Economy',
    'nav.partnerships': 'Partnerships',
    'nav.resources': 'Resources',
    'nav.contact': 'Contact',
    'general.loading': 'Loading...',
    'general.error': 'Error',
    'footer.copyright': 'SAF - All rights reserved',
    
    // Overview Tab
    'overview.title': 'Project Overview',
    'overview.subtitle': 'Regional SAF opportunities overview',
    'overview.keyPoints': 'Key Points',
    'overview.keyPointsSubtitle': 'Essential economic and technical indicators',
    'overview.vineyardSurface': 'Vineyard Surface',
    'overview.vineyardBase': 'Regional base',
    'overview.annualPomace': 'Annual pomace production',
    'overview.totalRawMaterial': 'Total raw material',
    'overview.realisticAllocation': 'Realistic Flow Allocation',
    'overview.availableForSAF': 'available for SAF',
    'overview.safPotential': 'SAF Potential (70% efficiency)',
    'overview.basedOnAvailable': 'Based on available',
    'overview.revenuePotential': 'Revenue Potential',
    'overview.co2Reduction': 'CO₂ Reduction',
    'overview.vsFossil': 'vs fossil fuel',
    'overview.regionalContext': 'Regional Context',
    'overview.leaderPosition': 'National leadership position in wine production',
    
    // Resources Tab - English
    'resources.title': 'Biomass Resources',
    'resources.subtitle': 'Mapping and analysis of available regional resources',
    'resources.biomassTotal': 'Total Biomass',
    'resources.availableForSAF': 'Available for SAF',
    'resources.safProduction': 'SAF Production',
    'resources.revenuesPotential': 'Revenue Potential',
    'resources.allocationTitle': 'Realistic Flow Allocation',
    'resources.otherValorisations': 'Other Valorizations',
    'resources.methodology': 'Methodology & Sources',
    'resources.wasteHierarchy': 'Waste Hierarchy',
    'resources.scientificSources': 'Scientific Sources',
    'resources.importantNote': 'Important Note',
    'resources.regionalMapping': 'Regional Mapping',
    'resources.topCommunes': 'Top Producing Communes',
    'resources.biomassBreakdown': 'Biomass Breakdown',
    'resources.seasonalTimeline': 'Seasonal Timeline',
    'resources.existingInfra': 'Existing Infrastructure',
    'resources.analyzedRegion': 'Analyzed region',
    'resources.hectaresVineyards': 'hectares of vineyards',
    'resources.mappedCommunes': 'mapped communes',
    'resources.dataUpdated': 'Data updated according to latest Agreste statistics and IFV analyses',
    'resources.lowValueWaste': 'Low-value waste streams, currently expensive to eliminate',
    'resources.existingUses': 'Composting, anaerobic digestion, existing premium uses',
    'resources.allocation30Note': 'This 30% allocation for SAF is based on analysis of low-value waste streams currently expensive to eliminate, ensuring a realistic approach respectful of existing uses.',
    
    // Contact Tab - English
    'contact.title': 'Contact & Next Steps',
    'contact.subtitle': 'Transform vineyard waste into future opportunities together',
    'contact.businessOpportunities': 'Business Opportunities',
    'contact.strategicPartnership': 'Strategic Partnership',
    'contact.strategicDesc': 'Business collaboration and commercial agreements',
    'contact.investmentOpportunity': 'Investment Opportunity',
    'contact.investmentDesc': 'Financial participation in the project',
    'contact.technicalSupport': 'Technical Support',
    'contact.technicalDesc': 'Technical questions and feasibility',
    'contact.generalInfo': 'General Information',
    'contact.generalDesc': 'Project information requests',
    'contact.regionalPotential': 'Regional Potential',
    'contact.directContact': 'Direct Contact',
    'contact.directLine': 'Direct line',
    'contact.generalEmail': 'General email',
    'contact.scheduleMeeting': 'Schedule Meeting',
    'contact.contactForm': 'Contact Form',
    'contact.fullName': 'Full name',
    'contact.yourName': 'Your name',
    'contact.phone': 'Phone',
    'contact.company': 'Company/Organization',
    'contact.companyPlaceholder': 'Your company name',
    'contact.role': 'Role/Position',
    'contact.yourPosition': 'Your position',
    'contact.preferredContact': 'Preferred contact method',
    'contact.telephone': 'Phone',
    'contact.meeting': 'Meeting',
    'contact.interests': 'Areas of interest (select all that apply)',
    'contact.feasibilityStudy': 'Feasibility study',
    'contact.projectTimeline': 'Project timeline',
    'contact.environmentalImpact': 'Environmental impact',
    'contact.economicBenefits': 'Economic benefits',
    'contact.detailedMessage': 'Detailed message',
    'contact.messagePlaceholder': 'Describe your needs, questions or proposals...',
    'contact.sendInquiry': 'Send Inquiry',
    'contact.afterInquiry': 'After your inquiry',
    'contact.guaranteedResponse': 'Guaranteed response',
    'contact.firstMeeting': 'First meeting',
    'contact.detailedProposal': 'Detailed proposal',
    'contact.thankYou': 'Thank you for your inquiry!',
    'contact.thankYouMessage': 'We will contact you within 48 hours to discuss collaboration opportunities.',
    'contact.newInquiry': 'New inquiry',
    'contact.tonesYear': 'tons/year',
    'contact.potential': 'potential',
    'contact.estimated': 'estimated',
    
    // Common time units
    'time.week': 'week',
    'time.month': 'month',
    'time.hours48': '48h',
    
    // Units
    'units.tonesYear': 'tons/year',
    'units.litersYear': 'liters/year',
    'units.hectares': 'hectares',
    'units.ofTotal': 'of total'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t
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