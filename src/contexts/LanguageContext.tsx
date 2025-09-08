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
    'valorization.distillation': 'Distillation',
    'valorization.composting': 'Compostage',
    'valorization.methanization': 'Méthanisation',
    'valorization.direct.spreading': 'Épandage direct',
    'valorization.percentage': 'Pourcentage',
    
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
    'saf.current.demand': 'de la demande actuelle',
    'saf.announced.capacity': 'capacité annoncée 2030',
    'saf.kerosene': 'Kérosène',
    
    // Project Timeline
    'timeline.title': 'Chronologie du Projet',
    'timeline.year1': 'Partenariat & Pilote',
    'timeline.year2': 'Développement Infrastructure',
    'timeline.year3': 'Production Complète',
    'timeline.year5': 'Expansion d\'Échelle',
    'timeline.investment': 'investissement',
    'timeline.revenue.potential': 'potentiel de revenus annuels',
    
    // Infrastructure
    'infrastructure.title': 'Infrastructure de Valorisation',
    'infrastructure.distilleries': 'Distilleries',
    'infrastructure.methanization': 'Unités de méthanisation',
    'infrastructure.composting': 'Plateformes de compostage',
    'infrastructure.biomass': 'Chaudières biomasse',
    
    // SAF Opportunities
    'saf.opportunities.title': 'Opportunités SAF (Sustainable Aviation Fuel)',
    'saf.opportunities.subtitle': 'Valorisation du marc de raisin en carburant aviation durable',
    'saf.grape.marc': 'Marc de raisin',
    'saf.alcoholic.fermentation': 'Fermentation alcoolique',
    'saf.ethanol.production': 'Production d\'éthanol',
    'saf.ethanol.distillation': 'Distillation éthanol',
    'saf.purification': 'Purification',
    'saf.alcohol.to.jet': 'Alcohol-to-Jet (ATJ)',
    'saf.catalytic.conversion': 'Conversion catalytique',
    'saf.sustainable.aviation.fuel': 'Carburant Aviation Durable',
    'saf.millions.liters': 'millions de litres',
    'saf.potential.liters': 'Litres SAF potentiels',
    'saf.co2.avoided': 'Tonnes CO₂ évitées/an',
    'saf.conversion.rate': 'Taux de conversion',
    'saf.estimates.note': '* Estimations basées sur les technologies actuelles de conversion biomasse-to-liquids',
    
    // Stakeholder Benefits
    'stakeholders.title': 'Bénéfices par Partie Prenante',
    'stakeholders.subtitle': 'Arguments de valeur personnalisés pour chaque acteur de l\'écosystème',
    'stakeholders.wine.producers': 'Producteurs Viticoles',
    'stakeholders.saf.producers': 'Producteurs SAF',
    'stakeholders.airlines': 'Compagnies Aériennes',
    'stakeholders.tourism': 'Secteur Touristique',
    'stakeholders.new.revenue': 'Nouveaux revenus + économies',
    'stakeholders.reliable.feedstock': 'Feedstock fiable & local',
    'stakeholders.carbon.compliance': 'Objectifs carbone + compliance',
    'stakeholders.sustainability.marketing': 'Marketing durabilité authentique',
    'stakeholders.additional.revenue': 'Revenus additionnels',
    'stakeholders.treatment.savings': 'Économies traitement',
    'stakeholders.sustainable.image': 'Image durable',
    'stakeholders.secured.supply': 'Approvisionnement sécurisé',
    'stakeholders.competitive.costs': 'Coûts compétitifs',
    'stakeholders.eu.compliance': 'Compliance EU',
    'stakeholders.co2.reduction': 'Réduction CO₂',
    'stakeholders.predictable.pricing': 'Prix prévisible',
    'stakeholders.communication': 'Communication',
    'stakeholders.unique.storytelling': 'Storytelling unique',
    'stakeholders.green.certifications': 'Certifications vertes',
    'stakeholders.regional.ecosystem': 'Écosystème régional',
    'stakeholders.investment': 'Investissement:',
    'stakeholders.roi': 'ROI:',
    'stakeholders.create.ecosystem': 'Créons ensemble l\'écosystème SAF régional',
    'stakeholders.leadership.opportunity': 'Une opportunité de leadership dans la transition énergétique du transport aérien',

    // Implementation Challenges
    'challenges.title': 'Défis d\'Implémentation',
    'challenges.subtitle': 'Identification proactive des risques et stratégies de mitigation',
    'challenges.seasonal.availability': 'Disponibilité Saisonnière',
    'challenges.collection.logistics': 'Logistique de Collecte',
    'challenges.quality.standards': 'Standards Qualité',
    'challenges.regulatory.compliance': 'Conformité Réglementaire',
    'challenges.high': 'Élevé',
    'challenges.medium': 'Moyen',
    'challenges.low': 'Faible',
    'challenges.proposed.solutions': 'Solutions proposées',
    'challenges.mitigation.strategy': 'Stratégie de mitigation',
    'challenges.risk.assessment': 'Évaluation des Risques',
    'challenges.identified.risks': 'Risques identifiés',
    'challenges.validated.solutions': 'Solutions validées',
    'challenges.global.risk.level': 'Niveau de risque global',
    'challenges.priority.actions': 'Actions prioritaires',

    // Partnership Opportunities
    'partnerships.title': 'Opportunités de Partenariats',
    'partnerships.subtitle': 'Écosystème collaboratif pour le développement du SAF',
    'partnerships.wine.producers': 'Producteurs de Vin',
    'partnerships.saf.companies': 'Entreprises SAF',
    'partnerships.tourism.operators': 'Opérateurs Touristiques',
    'partnerships.regional.government': 'Gouvernement Régional',
    'partnerships.waste.available': '266 000t de déchets disponibles',
    'partnerships.growing.demand': 'Demande croissante de matière première',
    'partnerships.sustainability.storytelling': 'Récit de durabilité',
    'partnerships.circular.economy': 'Soutien à l\'économie circulaire',
    'partnerships.strategic.note': 'Partenariats stratégiques pour une filière SAF régionale',

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
    'valorization.distillation': 'Distillation',
    'valorization.composting': 'Composting',
    'valorization.methanization': 'Methanization',
    'valorization.direct.spreading': 'Direct spreading',
    'valorization.percentage': 'Percentage',
    
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
    'saf.current.demand': 'of current demand',
    'saf.announced.capacity': 'announced capacity 2030',
    'saf.kerosene': 'Kerosene',
    
    // Project Timeline
    'timeline.title': 'Project Timeline',
    'timeline.year1': 'Partnership & Pilot',
    'timeline.year2': 'Infrastructure Development',
    'timeline.year3': 'Full Production',
    'timeline.year5': 'Scale Expansion',
    'timeline.investment': 'investment',
    'timeline.revenue.potential': 'annual revenue potential',
    
    // Infrastructure
    'infrastructure.title': 'Valorization Infrastructure',
    'infrastructure.distilleries': 'Distilleries',
    'infrastructure.methanization': 'Methanization units',
    'infrastructure.composting': 'Composting platforms',
    'infrastructure.biomass': 'Biomass boilers',
    
    // SAF Opportunities
    'saf.opportunities.title': 'SAF Opportunities (Sustainable Aviation Fuel)',
    'saf.opportunities.subtitle': 'Valorization of grape pomace into sustainable aviation fuel',
    'saf.grape.marc': 'Grape pomace',
    'saf.alcoholic.fermentation': 'Alcoholic fermentation',
    'saf.ethanol.production': 'Ethanol production',
    'saf.ethanol.distillation': 'Ethanol distillation',
    'saf.purification': 'Purification',
    'saf.alcohol.to.jet': 'Alcohol-to-Jet (ATJ)',
    'saf.catalytic.conversion': 'Catalytic conversion',
    'saf.sustainable.aviation.fuel': 'Sustainable Aviation Fuel',
    'saf.millions.liters': 'million liters',
    'saf.potential.liters': 'Potential SAF liters',
    'saf.co2.avoided': 'CO₂ tonnes avoided/year',
    'saf.conversion.rate': 'Conversion rate',
    'saf.estimates.note': '* Estimates based on current biomass-to-liquids conversion technologies',
    
    // Stakeholder Benefits
    'stakeholders.title': 'Stakeholder Benefits',
    'stakeholders.subtitle': 'Personalized value propositions for each ecosystem actor',
    'stakeholders.wine.producers': 'Wine Producers',
    'stakeholders.saf.producers': 'SAF Producers',
    'stakeholders.airlines': 'Airlines',
    'stakeholders.tourism': 'Tourism Sector',
    'stakeholders.new.revenue': 'New revenue + savings',
    'stakeholders.reliable.feedstock': 'Reliable & local feedstock',
    'stakeholders.carbon.compliance': 'Carbon targets + compliance',
    'stakeholders.sustainability.marketing': 'Authentic sustainability marketing',
    'stakeholders.additional.revenue': 'Additional revenue',
    'stakeholders.treatment.savings': 'Treatment savings',
    'stakeholders.sustainable.image': 'Sustainable image',
    'stakeholders.secured.supply': 'Secured supply',
    'stakeholders.competitive.costs': 'Competitive costs',
    'stakeholders.eu.compliance': 'EU compliance',
    'stakeholders.co2.reduction': 'CO₂ reduction',
    'stakeholders.predictable.pricing': 'Predictable pricing',
    'stakeholders.communication': 'Communication',
    'stakeholders.unique.storytelling': 'Unique storytelling',
    'stakeholders.green.certifications': 'Green certifications',
    'stakeholders.regional.ecosystem': 'Regional ecosystem',
    'stakeholders.investment': 'Investment:',
    'stakeholders.roi': 'ROI:',
    'stakeholders.create.ecosystem': 'Let\'s create the regional SAF ecosystem together',
    'stakeholders.leadership.opportunity': 'A leadership opportunity in the energy transition of air transport',

    // Implementation Challenges
    'challenges.title': 'Implementation Challenges',
    'challenges.subtitle': 'Proactive risk identification and mitigation strategies',
    'challenges.seasonal.availability': 'Seasonal Availability',
    'challenges.collection.logistics': 'Collection Logistics',
    'challenges.quality.standards': 'Quality Standards',
    'challenges.regulatory.compliance': 'Regulatory Compliance',
    'challenges.high': 'High',
    'challenges.medium': 'Medium',
    'challenges.low': 'Low',
    'challenges.proposed.solutions': 'Proposed solutions',
    'challenges.mitigation.strategy': 'Mitigation strategy',
    'challenges.risk.assessment': 'Risk Assessment',
    'challenges.identified.risks': 'Identified risks',
    'challenges.validated.solutions': 'Validated solutions',
    'challenges.global.risk.level': 'Global risk level',
    'challenges.priority.actions': 'Priority actions',

    // Partnership Opportunities
    'partnerships.title': 'Partnership Opportunities',
    'partnerships.subtitle': 'Collaborative ecosystem for SAF development',
    'partnerships.wine.producers': 'Wine Producers',
    'partnerships.saf.companies': 'SAF Companies',
    'partnerships.tourism.operators': 'Tourism Operators',
    'partnerships.regional.government': 'Regional Government',
    'partnerships.waste.available': '{annualPomace}t waste available',
    'partnerships.growing.demand': 'Growing demand for feedstock',
    'partnerships.sustainability.storytelling': 'Sustainability storytelling',
    'partnerships.circular.economy': 'Circular economy support',
    'partnerships.strategic.note': 'Strategic partnerships for a regional SAF supply chain',

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
    'valorization.distillation': 'Destilación',
    'valorization.composting': 'Compostaje',
    'valorization.methanization': 'Metanización',
    'valorization.direct.spreading': 'Esparcido directo',
    'valorization.percentage': 'Porcentaje',
    
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
    'saf.current.demand': 'de la demanda actual',
    'saf.announced.capacity': 'capacidad anunciada 2030',
    'saf.kerosene': 'Queroseno',
    
    // Project Timeline
    'timeline.title': 'Cronología del Proyecto',
    'timeline.year1': 'Alianza y Piloto',
    'timeline.year2': 'Desarrollo Infraestructura',
    'timeline.year3': 'Producción Completa',
    'timeline.year5': 'Expansión a Escala',
    'timeline.investment': 'inversión',
    'timeline.revenue.potential': 'potencial de ingresos anuales',
    
    // Infrastructure
    'infrastructure.title': 'Infraestructura de Valorización',
    'infrastructure.distilleries': 'Destilerías',
    'infrastructure.methanization': 'Unidades de metanización',
    'infrastructure.composting': 'Plataformas de compostaje',
    'infrastructure.biomass': 'Calderas de biomasa',
    
    // SAF Opportunities
    'saf.opportunities.title': 'Oportunidades SAF (Combustible Sostenible de Aviación)',
    'saf.opportunities.subtitle': 'Valorización del orujo de uva en combustible sostenible de aviación',
    'saf.grape.marc': 'Orujo de uva',
    'saf.alcoholic.fermentation': 'Fermentación alcohólica',
    'saf.ethanol.production': 'Producción de etanol',
    'saf.ethanol.distillation': 'Destilación de etanol',
    'saf.purification': 'Purificación',
    'saf.alcohol.to.jet': 'Alcohol-to-Jet (ATJ)',
    'saf.catalytic.conversion': 'Conversión catalítica',
    'saf.sustainable.aviation.fuel': 'Combustible Sostenible de Aviación',
    'saf.millions.liters': 'millones de litros',
    'saf.potential.liters': 'Litros SAF potenciales',
    'saf.co2.avoided': 'Toneladas CO₂ evitadas/año',
    'saf.conversion.rate': 'Tasa de conversión',
    'saf.estimates.note': '* Estimaciones basadas en tecnologías actuales de conversión biomasa-a-líquidos',
    
    // Stakeholder Benefits
    'stakeholders.title': 'Beneficios por Parte Interesada',
    'stakeholders.subtitle': 'Propuestas de valor personalizadas para cada actor del ecosistema',
    'stakeholders.wine.producers': 'Productores de Vino',
    'stakeholders.saf.producers': 'Productores SAF',
    'stakeholders.airlines': 'Aerolíneas',
    'stakeholders.tourism': 'Sector Turístico',
    'stakeholders.new.revenue': 'Nuevos ingresos + ahorros',
    'stakeholders.reliable.feedstock': 'Materia prima confiable y local',
    'stakeholders.carbon.compliance': 'Objetivos de carbono + cumplimiento',
    'stakeholders.sustainability.marketing': 'Marketing de sostenibilidad auténtico',
    'stakeholders.additional.revenue': 'Ingresos adicionales',
    'stakeholders.treatment.savings': 'Ahorros de tratamiento',
    'stakeholders.sustainable.image': 'Imagen sostenible',
    'stakeholders.secured.supply': 'Suministro asegurado',
    'stakeholders.competitive.costs': 'Costos competitivos',
    'stakeholders.eu.compliance': 'Cumplimiento UE',
    'stakeholders.co2.reduction': 'Reducción CO₂',
    'stakeholders.predictable.pricing': 'Precios predecibles',
    'stakeholders.communication': 'Comunicación',
    'stakeholders.unique.storytelling': 'Narrativa única',
    'stakeholders.green.certifications': 'Certificaciones verdes',
    'stakeholders.regional.ecosystem': 'Ecosistema regional',
    'stakeholders.investment': 'Inversión:',
    'stakeholders.roi': 'ROI:',
    'stakeholders.create.ecosystem': 'Creemos juntos el ecosistema SAF regional',
    'stakeholders.leadership.opportunity': 'Una oportunidad de liderazgo en la transición energética del transporte aéreo',

    // Implementation Challenges
    'challenges.title': 'Desafíos de Implementación',
    'challenges.subtitle': 'Identificación proactiva de riesgos y estrategias de mitigación',
    'challenges.seasonal.availability': 'Disponibilidad Estacional',
    'challenges.collection.logistics': 'Logística de Recolección',
    'challenges.quality.standards': 'Estándares de Calidad',
    'challenges.regulatory.compliance': 'Cumplimiento Regulatorio',
    'challenges.high': 'Alto',
    'challenges.medium': 'Medio',
    'challenges.low': 'Bajo',
    'challenges.proposed.solutions': 'Soluciones propuestas',
    'challenges.mitigation.strategy': 'Estrategia de mitigación',
    'challenges.risk.assessment': 'Evaluación de Riesgos',
    'challenges.identified.risks': 'Riesgos identificados',
    'challenges.validated.solutions': 'Soluciones validadas',
    'challenges.global.risk.level': 'Nivel de riesgo global',
    'challenges.priority.actions': 'Acciones prioritarias',

    // Partnership Opportunities
    'partnerships.title': 'Oportunidades de Asociación',
    'partnerships.subtitle': 'Ecosistema colaborativo para el desarrollo SAF',
    'partnerships.wine.producers': 'Productores de Vino',
    'partnerships.saf.companies': 'Empresas SAF',
    'partnerships.tourism.operators': 'Operadores Turísticos',
    'partnerships.regional.government': 'Gobierno Regional',
    'partnerships.waste.available': '{annualPomace}t de residuos disponibles',
    'partnerships.growing.demand': 'Demanda creciente de materia prima',
    'partnerships.sustainability.storytelling': 'Narrativa de sostenibilidad',
    'partnerships.circular.economy': 'Apoyo a la economía circular',
    'partnerships.strategic.note': 'Asociaciones estratégicas para una cadena de suministro SAF regional',

    // Footer
    'footer.data.updated': 'Datos actualizados - Región',
    'footer.data.sources': 'Fuentes de datos: Ministerio de Agricultura francés (Agreste), Organización Internacional de la Viña y el Vino (OIV), Instituto Francés de la Viña y el Vin (IFV)',
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