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

    // Strategy
    'strategie.biomasse': 'Stratégie de mobilisation de la biomasse',
    'base.conservative': 'Base conservatrice',
    'flux.elimination': 'Flux d\'élimination',
    'potentiel.negociable': 'Potentiel négociable',
    'surplus.excedents': 'Surplus / excédents',
    'total.accessible': 'Total accessible',
    'avec.partenariats': 'avec partenariats',
    'respecte.filieres': 'Respect des filières existantes',

    // Context
    'contexte.regional': 'Contexte Régional',
    'contexte.regional.subtitle': 'Indicateurs vitivinicoles',
    'region.viticole.francaise': '1ère région viticole française',
    'volume.production': 'Volume de production',
    'production.nationale': 'Production nationale',
    'ca.annuel': 'CA annuel du secteur vitivinicole',

    // Actualités
    'actualites.saf': 'Actualités SAF',
    'actualites.subtitle': 'Projets industriels et réglementations récentes',

    // Footer
    'footer.project.description': 'Projet SAF {region}',
    'footer.revenues': 'Revenus estimés',
    'footer.co2.avoided': 'CO₂ évité',
    'footer.methodology.standards': 'Méthodologie et normes',
    'methodology.atj.title': 'Procédé ATJ',
    'methodology.atj.description': 'Alcohol-to-Jet (ATJ) validé par ASTM',
    'methodology.agreste.title': 'Agreste',
    'methodology.agreste.description': 'Base de données agricoles nationale',
    'methodology.ifv.title': 'IFV',
    'methodology.ifv.description': 'Institut Français de la Vigne et du Vin',
    'methodology.corsia.title': 'CORSIA',
    'methodology.corsia.description': 'Normes internationales de durabilité',

    'footer.certifications.audits': 'Certifications et audits',
    'credentials.bureau.veritas': 'Audit Bureau Veritas',
    'credentials.astm.compliance': 'Conformité ASTM D7566',
    'credentials.corsia.validation': 'Validation CORSIA',
    'credentials.quarterly.audit': 'Audit trimestriel',
    'credentials.peer.reviewed': 'Évalué par des pairs',

    'footer.institutional.partners': 'Partenaires institutionnels',
    'partners.region.occitanie': 'Région Occitanie',
    'partners.ifv': 'Institut Français de la Vigne et du Vin',
    'partners.safer.languedoc': 'SAFER Languedoc',
    'partners.chamber.herault': 'Chambre d\'agriculture de l\'Hérault',
    'partners.vignerons.union': 'Union des Vignerons',

    'footer.primary.data.sources': 'Sources de données principales',
    'data.sources.agreste': 'Agreste',
    'data.sources.ifv': 'IFV',
    'data.sources.oiv': 'OIV',
    'data.sources.aviation.fuel': 'Marché carburant aviation',

    'footer.scientific.validation': 'Validation scientifique',
    'validation.peer.review': 'Revue par les pairs',
    'validation.bureau.veritas': 'Audit Bureau Veritas',
    'validation.iso.compliance': 'Conformité ISO',
    'validation.carbon.audit': 'Audit carbone',

    'footer.international.standards': 'Normes internationales',
    'standards.astm.d7566': 'ASTM D7566',
    'standards.corsia.icao': 'CORSIA ICAO',
    'standards.red.ii': 'Directive RED II',
    'standards.iscc.eu': 'ISCC EU',

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
    'header.subtitle': 'Valorization of viticulture biomass into SAF feedstock',
    'nav.vue.ensemble': 'Overview',
    'nav.economie': 'Economics',
    'nav.ressources': 'Resources',
    'nav.partenaires': 'Partnerships',
    'nav.donnees': 'Data',
    'nav.contact': 'Contact',

    // Overview Section
    'points.cles': 'Key Points',
    'points.cles.subtitle': 'Essential economic and technical indicators',
    'superficie.viticole': 'Vineyard area',
    'hectares': 'hectares',
    'base.regionale': 'Regional base',
    'production.marc': 'Grape marc production',
    'tonnes': 'tons',
    'matiere.premiere': 'Raw material',
    'allocation.flux': 'Flow allocation',
    'disponible.saf': 'Available for SAF',
    'potentiel.saf': 'SAF potential',
    'litres.an': 'liters/year',
    'resources.safPotentialSubtitle': 'Annual potential from available biomass',
    'revenue.potential': 'Revenue potential',
    'prix.marche': 'Market price',
    'reduction.co2': 'CO₂ reduction',
    'tonnes.an': 'tons/year',
    'vs.fossile': 'vs fossil fuel',

    // Regional Analysis
    'analyse.regionale': 'Regional Analysis',
    'analyse.regionale.subtitle': 'Departmental breakdown of production',

    // Valorization
    'valorization.title': 'Current valorization of co-products',
    'valorization.distillation': 'Distillation',
    'valorization.composting': 'Composting',
    'valorization.methanization': 'Methanization',
    'valorization.direct.spreading': 'Direct spreading',

    // Strategy
    'strategie.biomasse': 'Biomass mobilization strategy',
    'base.conservative': 'Conservative base',
    'flux.elimination': 'Elimination flows',
    'potentiel.negociable': 'Negotiable potential',
    'surplus.excedents': 'Surplus/excess',
    'total.accessible': 'Total accessible',
    'avec.partenariats': 'with partnerships',
    'respecte.filieres': 'Respects existing sectors',

    // Context
    'contexte.regional': 'Regional Context',
    'contexte.regional.subtitle': 'Viticultural indicators',
    'region.viticole.francaise': 'Top French wine region',
    'volume.production': 'Production volume',
    'production.nationale': 'National production',
    'ca.annuel': 'Annual revenue of wine sector',

    // Actualités
    'actualites.saf': 'SAF News',
    'actualites.subtitle': 'Recent industrial projects & regulations',

    // Footer
    'footer.project.description': 'SAF {region} project',
    'footer.revenues': 'Estimated revenues',
    'footer.co2.avoided': 'CO₂ avoided',
    'footer.methodology.standards': 'Methodology and standards',
    'methodology.atj.title': 'ATJ process',
    'methodology.atj.description': 'Alcohol-to-Jet (ATJ) validated by ASTM',
    'methodology.agreste.title': 'Agreste',
    'methodology.agreste.description': 'National agricultural database',
    'methodology.ifv.title': 'IFV',
    'methodology.ifv.description': 'French Institute of Vine and Wine',
    'methodology.corsia.title': 'CORSIA',
    'methodology.corsia.description': 'International sustainability standards',

    'footer.certifications.audits': 'Certifications and audits',
    'credentials.bureau.veritas': 'Bureau Veritas audit',
    'credentials.astm.compliance': 'ASTM D7566 compliance',
    'credentials.corsia.validation': 'CORSIA validation',
    'credentials.quarterly.audit': 'Quarterly audit',
    'credentials.peer.reviewed': 'Peer reviewed',

    'footer.institutional.partners': 'Institutional partners',
    'partners.region.occitanie': 'Occitanie Region',
    'partners.ifv': 'French Vine and Wine Institute',
    'partners.safer.languedoc': 'SAFER Languedoc',
    'partners.chamber.herault': 'Hérault Chamber of Agriculture',
    'partners.vignerons.union': 'Winegrowers Union',

    'footer.primary.data.sources': 'Primary data sources',
    'data.sources.agreste': 'Agreste',
    'data.sources.ifv': 'IFV',
    'data.sources.oiv': 'OIV',
    'data.sources.aviation.fuel': 'Aviation fuel market',

    'footer.scientific.validation': 'Scientific validation',
    'validation.peer.review': 'Peer review',
    'validation.bureau.veritas': 'Bureau Veritas audit',
    'validation.iso.compliance': 'ISO compliance',
    'validation.carbon.audit': 'Carbon audit',

    'footer.international.standards': 'International standards',
    'standards.astm.d7566': 'ASTM D7566',
    'standards.corsia.icao': 'CORSIA ICAO',
    'standards.red.ii': 'RED II directive',
    'standards.iscc.eu': 'ISCC EU',

    'footer.copyright': '© 2025',
    'footer.data.updated': 'Data updated',
    'footer.next.revision': 'Next revision',
    'footer.legal.notices': 'Legal notices',
    'footer.data.protection': 'Data protection',
    'footer.terms.of.use': 'Terms of use',
    'footer.disclaimer.title': 'Disclaimer',
    'footer.disclaimer.text': 'Data provided is indicative and subject to change.'
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
