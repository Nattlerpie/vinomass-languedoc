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
    'nav.contact.description': 'Informations de contact et support',
    
    // Regional Data & Statistics
    'region.current': 'Région actuelle',
    'donnees.regionales': 'Données Régionales',
    'surface.viticole': 'Surface Viticole',
    'production.annuelle': 'Production Annuelle',
    'production.waste': 'Production annuelle de déchets vitivinicoles',
    'production.total.biomass': 'Production totale de biomasse',
    'production.marc': 'Production annuelle de marc',
    'production.regionale': 'Production Régionale',
    'repartition.departementale': 'Répartition Départementale',
    'repartition.production.commune': 'Répartition de la Production par Commune',
    'communes.principales': 'Principales Communes Productrices',
    'disponible': 'Disponible',
    'jusqua': 'Jusqu\'à',
    
    // Overview Tab Metrics
    'metriques.cles': 'Métriques Clés',
    'surface.viticole': 'Surface Viticole',
    'hectares': 'hectares',
    'tonnes.annee': 'tonnes/an',
    'producteurs': 'producteurs',
    'communes': 'communes',
    'communes.tracked': 'Communes suivies',
    'communes.total.production': 'Production totale communes',
    'communes.coverage': 'Couverture communes',
    'communes.methodology.note': 'Méthodologie basée sur les données départementales 2023',
    'industries.cles': 'Industries Clés',
    'cooperatives': 'Coopératives',
    'distilleries': 'Distilleries',
    'sites.methanisation': 'Sites de Méthanisation',
    'installations.compostage': 'Installations de Compostage',
    
    // Biomass Types & Resources
    'types.biomasse': 'Types de Biomasse',
    'marc.raisin': 'Marc de raisin',
    'sous.produits.liquides': 'Sous-produits liquides',
    'bois.taille': 'Bois de taille',
    'sarments': 'Sarments',
    'rafles': 'Rafles',
    'lies': 'Lies',
    'autre.biomasse': 'Autre biomasse',
    'ressources.disponibles': 'Ressources Disponibles',
    
    // Flow Allocation & Supply Strategy
    'strategie.approvisionnement': 'Stratégie d\'Approvisionnement',
    'flux.biomasse': 'Flux de Biomasse',
    'flux.proteges': 'Flux Protégés',
    'flux.negociables': 'Flux Négociables', 
    'flux.disponibles': 'Flux Disponibles',
    'allocation.conservative': 'Base Conservative',
    'potentiel.negociable': 'Potentiel Négociable',
    'disponibilite.immediate': 'Disponibilité Immédiate',
    
    // Infrastructure
    'infrastructure.title': 'Infrastructure Existante',
    'infrastructure.subtitle': 'Installations de valorisation en place',
    'infrastructure.distilleries': 'Distilleries',
    'infrastructure.methanisation': 'Sites de Méthanisation',
    'infrastructure.compostage': 'Installations de Compostage',
    'infrastructure.biomasse': 'Centrales Biomasse',
    'infrastructure.total': 'Total des installations',
    'infrastructure.co2.evite': 'CO₂ évité annuellement',
    'infrastructure.capacite': 'Capacité existante',
    
    // Seasonal & Timeline
    'disponibilite.saisonniere': 'Disponibilité Saisonnière',
    'calendrier.recolte': 'Calendrier de Récolte',
    'planning': 'Planning',
    'maintenance': 'Maintenance',
    'formation': 'Formation',
    'vendanges': 'Vendanges',
    'taille': 'Taille',
    'recolte': 'Récolte',
    'vue.lineaire': 'Vue Linéaire',
    'vue.circulaire': 'Vue Circulaire',
    'legende.intensite': 'Légende intensité',
    'intensite.peak': 'Peak',
    'intensite.eleve': 'Élevé',
    'intensite.moyen': 'Moyen',
    'intensite.faible': 'Faible',
    
    // Months
    'mois.janvier': 'Janvier',
    'mois.fevrier': 'Février',
    'mois.mars': 'Mars',
    'mois.avril': 'Avril',
    'mois.mai': 'Mai',
    'mois.juin': 'Juin',
    'mois.juillet': 'Juillet',
    'mois.aout': 'Août',
    'mois.septembre': 'Septembre',
    'mois.octobre': 'Octobre',
    'mois.novembre': 'Novembre',
    'mois.decembre': 'Décembre',
    
    // Valorization Methods
    'valorisation.title': 'Méthodes de Valorisation',
    'valorisation.distillation': 'Distillation',
    'valorisation.compostage': 'Compostage',
    'valorisation.methanisation': 'Méthanisation',
    'valorisation.epandage': 'Épandage',
    'valorisation.saf': 'Carburant Aviation Durable',
    'valorisation.distillation.desc': 'Transformation en alcool et spiritueux',
    'valorisation.compostage.desc': 'Production d\'amendements organiques',
    'valorisation.methanisation.desc': 'Production de biogaz et digestat',
    'valorisation.epandage.desc': 'Amendement direct des sols',
    'valorisation.saf.desc': 'Production de biocarburant aviation',
    'valorisation.chaines.etablies': 'Chaînes de valorisation établies',
    'valorisation.opportunite.saf': 'Opportunité SAF (30%)',
    'valorisation.conformite': 'Conformité directive déchets UE',
    'valorisation.impact.economique': 'Impact économique régional',
    'valorisation.emplois.crees': 'Emplois créés',
    'valorisation.contexte.regional': 'Contexte régional',
    'valorisation.methodologie': 'Méthodologie basée sur les données sectorielles 2023',
    
    // Industry News & Players
    'actualites.secteur': 'Actualités du Secteur',
    'acteurs.industriels': 'Acteurs Industriels',
    'entreprise.bioenergie': 'Bioénergie Avancée',
    'entreprise.bioenergie.desc': 'Production de biocarburants de 2ème génération à partir de déchets vitivinicoles',
    'entreprise.valorisation': 'Valorisation Verte',
    'entreprise.valorisation.desc': 'Spécialiste du traitement et de la valorisation des sous-produits agricoles',
    'entreprise.innovation': 'Innovation SAF',
    'entreprise.innovation.desc': 'Développement de technologies de conversion biomasse-carburant',
    'statut.certifie': 'Certifié',
    'statut.en.cours': 'En cours',
    'statut.planifie': 'Planifié',
    'feedstock': 'Matière première',
    'certification': 'Certification',
    'biomass.to.liquids': 'Biomasse vers liquides',
    'partenariat.recherche': 'Partenariat de recherche',
    'projet.demonstration': 'Projet de démonstration',
    'investissement.prevu': 'Investissement prévu',
    'emplois.potentiels': 'Emplois potentiels',
    'debut.production': 'Début de production',
    
    // Economic Terms
    'cout.tonne': 'Coût par tonne',
    'prix.marche': 'Prix du marché',
    'retour.investissement': 'Retour sur investissement',
    'benefice.annuel': 'Bénéfice annuel',
    'cout.transport': 'Coût transport',
    'cout.transformation': 'Coût transformation',
    'revenus.potentiels': 'Revenus potentiels',
    'marge.beneficiaire': 'Marge bénéficiaire',
    
    // Partnerships & Collaboration
    'opportunites.partenariat': 'Opportunités de Partenariat',
    'collaboration.recherche': 'Collaboration Recherche',
    'financement.disponible': 'Financement Disponible',
    'subventions.europeennes': 'Subventions Européennes',
    'aides.regionales': 'Aides Régionales',
    
    // Partnerships Tab - Detailed
    'partenariats.requis': 'Types de Partenariats Requis',
    'types.principaux': 'Types principaux',
    'partenaires.cibles': 'Partenaires Cibles',
    'objectif.reseau': 'Objectif réseau',
    'reduction.couts': 'Réduction Coûts',
    'traitement.dechets': 'Traitement déchets',
    'nouveaux.revenus': 'Nouveaux Revenus',
    'potentiel.annuel': 'Potentiel annuel',
    
    // Implementation Phases
    'phases.implementation': 'Phases de Mise en Œuvre',
    'approche.progressive': 'Approche progressive basée sur les meilleures pratiques sectorielles',
    'duree': 'Durée',
    'partenaires': 'Partenaires',
    'volume.cible': 'Volume cible',
    
    // Value Proposition
    'proposition.valeur': 'Proposition de Valeur',
    'transformation.couts': 'Transformation des coûts de déchets en flux de revenus',
    'benefice.net.tonne': 'Bénéfice net par tonne',
    
    // Implementation Planning
    'planification.oeuvre': 'Planification Mise en Œuvre',
    'roadmap.etapes': 'Roadmap et étapes clés du projet',
    'timeline.implementation': 'Timeline d\'Implémentation',
    
    // Project Phases
    'etude.faisabilite': 'Étude de Faisabilité',
    'developpement.partenariats': 'Développement Partenariats',
    'financement.autorisations': 'Financement et Autorisations',
    'construction.infrastructure': 'Construction Infrastructure',
    'demarrage.production': 'Démarrage Production',
    'expansion.regionale': 'Expansion Régionale',
    
    // Phase Status
    'termine': 'Terminé',
    'en.cours': 'En cours',
    'planifie': 'Planifié',
    'progression': 'Progression',
    'jalons': 'Jalons',
    
    // Phase Details
    'analyse.complete': 'Analyse technique et économique complète du projet',
    'etude.marche': 'Étude de marché',
    'analyse.technique': 'Analyse technique',
    'modele.economique': 'Modèle économique',
    'rapport.final': 'Rapport final',
    
    // Stakeholders
    'parties.prenantes': 'Parties Prenantes',
    'equipe.projet': 'Équipe projet',
    'consultants.externes': 'Consultants externes',
    'investisseurs': 'Investisseurs',
    'dependances': 'Dépendances',
    'aucune.dependance': 'Aucune dépendance',
    'risques.identifies': 'Risques Identifiés',
    'delais.consultants': 'Délais consultants',
    'evolution.reglementaire': 'Évolution réglementaire',
    
    // Project Summary
    'resume.global.projet': 'Résumé Global du Projet',
    'phases.terminees': 'Phases terminées',
    'phases.en.cours': 'Phases en cours',
    'progression.totale': 'Progression totale',
    'mois.estimes': 'Mois estimés',
    
    // Methodology & Data
    'methodologie.title': 'Méthodologie',
    'sources.donnees': 'Sources de Données',
    'collecte.donnees': 'Collecte de Données',
    'validation.donnees': 'Validation des Données',
    'mise.jour.donnees': 'Mise à jour des données',
    'references.scientifiques': 'Références Scientifiques',
    'hypotheses.calcul': 'Hypothèses de Calcul',
    'limites.etude': 'Limites de l\'Étude',
    
    // Contact & Support
    'contact.title': 'Contact',
    'support.technique': 'Support Technique',
    'informations.projet': 'Informations Projet',
    'demande.donnees': 'Demande de Données',
    'collaboration.industrie': 'Collaboration Industrie',
    
    // Debug & System
    'debug.mode': 'Mode Debug',
    'debug.donnees.region': 'Données région',
    'debug.traductions.manquantes': 'Traductions manquantes',
    'debug.validation.donnees': 'Validation des données',
    'erreur.chargement': 'Erreur de chargement',
    'donnees.non.disponibles': 'Données non disponibles',
    
    // Units & Measurements
    'unite.tonnes': 'tonnes',
    'unite.hectares': 'ha',
    'unite.pourcentage': '%',
    'unite.euros': '€',
    'unite.emplois': 'emplois',
    'unite.annee': '/an',
    'unite.kilogrammes': 'kg',
    'unite.litres': 'L',
    
    // Common Actions
    'voir.details': 'Voir détails',
    'telecharger': 'Télécharger',
    'exporter.donnees': 'Exporter données',
    'imprimer.rapport': 'Imprimer rapport',
    'partager.lien': 'Partager lien',
    'copier.lien': 'Copier lien',
    'fermer': 'Fermer',
    'ouvrir': 'Ouvrir',
    'suivant': 'Suivant',
    'precedent': 'Précédent',
    'retour': 'Retour',
    'accueil': 'Accueil'
  },
  en: {
    // Main Atlas Headers
    'atlas.title': 'Viticulture Biomass Atlas',
    'region.subtitle': 'Potential for sustainable aviation fuel valorization',
    
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
    'nav.resources.description': 'Available resource analysis',
    'nav.economy.description': 'Economic tools and calculators',
    'nav.partnerships.description': 'Collaborative opportunities',
    'nav.methodology.description': 'Methodology and data sources',
    'nav.contact.description': 'Contact information and support',
    
    // Regional Data & Statistics
    'region.current': 'Current Region',
    'donnees.regionales': 'Regional Data',
    'surface.viticole': 'Viticulture Surface',
    'production.annuelle': 'Annual Production',
    'production.waste': 'Annual viticulture waste production',
    'production.total.biomass': 'Total biomass production',
    'production.marc': 'Annual pomace production',
    'production.regionale': 'Regional Production',
    'repartition.departementale': 'Departmental Distribution',
    'repartition.production.commune': 'Production Distribution by Commune',
    'communes.principales': 'Main Producing Communes',
    'disponible': 'Available',
    'jusqua': 'Up to',
    
    // Overview Tab Metrics
    'metriques.cles': 'Key Metrics',
    'surface.viticole': 'Wine-growing Area',
    'hectares': 'hectares',
    'tonnes.annee': 'tonnes/year',
    'producteurs': 'producers',
    'communes': 'communes',
    'communes.tracked': 'Communes tracked',
    'communes.total.production': 'Total commune production',
    'communes.coverage': 'Commune coverage',
    'communes.methodology.note': 'Methodology based on 2023 departmental data',
    'industries.cles': 'Key Industries',
    'cooperatives': 'Cooperatives',
    'distilleries': 'Distilleries',
    'sites.methanisation': 'Methanization Sites',
    'installations.compostage': 'Composting Facilities',
    
    // Biomass Types & Resources
    'types.biomasse': 'Biomass Types',
    'marc.raisin': 'Grape pomace',
    'sous.produits.liquides': 'Liquid by-products',
    'bois.taille': 'Pruning wood',
    'sarments': 'Vine shoots',
    'rafles': 'Grape stems',
    'lies': 'Wine lees',
    'autre.biomasse': 'Other biomass',
    'ressources.disponibles': 'Available Resources',
    
    // Flow Allocation & Supply Strategy
    'strategie.approvisionnement': 'Supply Strategy',
    'flux.biomasse': 'Biomass Flow',
    'flux.proteges': 'Protected Flows',
    'flux.negociables': 'Negotiable Flows',
    'flux.disponibles': 'Available Flows',
    'allocation.conservative': 'Conservative Base',
    'potentiel.negociable': 'Negotiable Potential',
    'disponibilite.immediate': 'Immediate Availability',
    
    // Infrastructure
    'infrastructure.title': 'Existing Infrastructure',
    'infrastructure.subtitle': 'Valorization facilities in place',
    'infrastructure.distilleries': 'Distilleries',
    'infrastructure.methanisation': 'Methanization Sites',
    'infrastructure.compostage': 'Composting Facilities',
    'infrastructure.biomasse': 'Biomass Plants',
    'infrastructure.total': 'Total facilities',
    'infrastructure.co2.evite': 'Annual CO₂ avoided',
    'infrastructure.capacite': 'Existing capacity',
    
    // Seasonal & Timeline
    'disponibilite.saisonniere': 'Seasonal Availability',
    'calendrier.recolte': 'Harvest Calendar',
    'planning': 'Planning',
    'maintenance': 'Maintenance',
    'formation': 'Training',
    'vendanges': 'Harvest',
    'taille': 'Pruning',
    'recolte': 'Collection',
    'vue.lineaire': 'Linear View',
    'vue.circulaire': 'Circular View',
    'legende.intensite': 'Intensity Legend',
    'intensite.peak': 'Peak',
    'intensite.eleve': 'High',
    'intensite.moyen': 'Medium',
    'intensite.faible': 'Low',
    
    // Months
    'mois.janvier': 'January',
    'mois.fevrier': 'February',
    'mois.mars': 'March',
    'mois.avril': 'April',
    'mois.mai': 'May',
    'mois.juin': 'June',
    'mois.juillet': 'July',
    'mois.aout': 'August',
    'mois.septembre': 'September',
    'mois.octobre': 'October',
    'mois.novembre': 'November',
    'mois.decembre': 'December',
    
    // Valorization Methods
    'valorisation.title': 'Valorization Methods',
    'valorisation.distillation': 'Distillation',
    'valorisation.compostage': 'Composting',
    'valorisation.methanisation': 'Methanization',
    'valorisation.epandage': 'Spreading',
    'valorisation.saf': 'Sustainable Aviation Fuel',
    'valorisation.distillation.desc': 'Transformation into alcohol and spirits',
    'valorisation.compostage.desc': 'Production of organic amendments',
    'valorisation.methanisation.desc': 'Production of biogas and digestate',
    'valorisation.epandage.desc': 'Direct soil amendment',
    'valorisation.saf.desc': 'Aviation biofuel production',
    'valorisation.chaines.etablies': 'Established valorization chains',
    'valorisation.opportunite.saf': 'SAF opportunity (30%)',
    'valorisation.conformite': 'EU waste directive compliance',
    'valorisation.impact.economique': 'Regional economic impact',
    'valorisation.emplois.crees': 'Jobs created',
    'valorisation.contexte.regional': 'Regional context',
    'valorisation.methodologie': 'Methodology based on 2023 sectoral data',
    
    // Industry News & Players
    'actualites.secteur': 'Industry News',
    'acteurs.industriels': 'Industry Players',
    'entreprise.bioenergie': 'Advanced Bioenergy',
    'entreprise.bioenergie.desc': 'Production of 2nd generation biofuels from viticulture waste',
    'entreprise.valorisation': 'Green Valorization',
    'entreprise.valorisation.desc': 'Specialist in treatment and valorization of agricultural by-products',
    'entreprise.innovation': 'SAF Innovation',
    'entreprise.innovation.desc': 'Development of biomass-to-fuel conversion technologies',
    'statut.certifie': 'Certified',
    'statut.en.cours': 'In progress',
    'statut.planifie': 'Planned',
    'feedstock': 'Feedstock',
    'certification': 'Certification',
    'biomass.to.liquids': 'Biomass-to-liquids',
    'partenariat.recherche': 'Research partnership',
    'projet.demonstration': 'Demonstration project',
    'investissement.prevu': 'Planned investment',
    'emplois.potentiels': 'Potential jobs',
    'debut.production': 'Production start',
    
    // Economic Terms
    'cout.tonne': 'Cost per tonne',
    'prix.marche': 'Market price',
    'retour.investissement': 'Return on investment',
    'benefice.annuel': 'Annual profit',
    'cout.transport': 'Transport cost',
    'cout.transformation': 'Processing cost',
    'revenus.potentiels': 'Potential revenue',
    'marge.beneficiaire': 'Profit margin',
    
    // Partnerships & Collaboration
    'opportunites.partenariat': 'Partnership Opportunities',
    'collaboration.recherche': 'Research Collaboration',
    'financement.disponible': 'Available Funding',
    'subventions.europeennes': 'European Grants',
    'aides.regionales': 'Regional Aid',
    
    // Partnerships Tab - Detailed
    'partenariats.requis': 'Required Partnership Types',
    'types.principaux': 'Main types',
    'partenaires.cibles': 'Target Partners',
    'objectif.reseau': 'Network objective',
    'reduction.couts': 'Cost Reduction',
    'traitement.dechets': 'Waste treatment',
    'nouveaux.revenus': 'New Revenue',
    'potentiel.annuel': 'Annual potential',
    
    // Implementation Phases
    'phases.implementation': 'Implementation Phases',
    'approche.progressive': 'Progressive approach based on sector best practices',
    'duree': 'Duration',
    'partenaires': 'Partners',
    'volume.cible': 'Target volume',
    
    // Value Proposition
    'proposition.valeur': 'Value Proposition',
    'transformation.couts': 'Transforming waste costs into revenue streams',
    'benefice.net.tonne': 'Net benefit per tonne',
    
    // Implementation Planning
    'planification.oeuvre': 'Implementation Planning',
    'roadmap.etapes': 'Project roadmap and key stages',
    'timeline.implementation': 'Implementation Timeline',
    
    // Project Phases
    'etude.faisabilite': 'Feasibility Study',
    'developpement.partenariats': 'Partnership Development',
    'financement.autorisations': 'Financing and Permits',
    'construction.infrastructure': 'Infrastructure Construction',
    'demarrage.production': 'Production Startup',
    'expansion.regionale': 'Regional Expansion',
    
    // Phase Status
    'termine': 'Completed',
    'en.cours': 'In progress',
    'planifie': 'Planned',
    'progression': 'Progress',
    'jalons': 'Milestones',
    
    // Phase Details
    'analyse.complete': 'Complete technical and economic project analysis',
    'etude.marche': 'Market study',
    'analyse.technique': 'Technical analysis',
    'modele.economique': 'Economic model',
    'rapport.final': 'Final report',
    
    // Stakeholders
    'parties.prenantes': 'Stakeholders',
    'equipe.projet': 'Project team',
    'consultants.externes': 'External consultants',
    'investisseurs': 'Investors',
    'dependances': 'Dependencies',
    'aucune.dependance': 'No dependencies',
    'risques.identifies': 'Identified Risks',
    'delais.consultants': 'Consultant delays',
    'evolution.reglementaire': 'Regulatory evolution',
    
    // Project Summary
    'resume.global.projet': 'Global Project Summary',
    'phases.terminees': 'Completed phases',
    'phases.en.cours': 'Phases in progress',
    'progression.totale': 'Total progress',
    'mois.estimes': 'Estimated months',
    
    // Methodology & Data
    'methodologie.title': 'Methodology',
    'sources.donnees': 'Data Sources',
    'collecte.donnees': 'Data Collection',
    'validation.donnees': 'Data Validation',
    'mise.jour.donnees': 'Data updates',
    'references.scientifiques': 'Scientific References',
    'hypotheses.calcul': 'Calculation Assumptions',
    'limites.etude': 'Study Limitations',
    
    // Contact & Support
    'contact.title': 'Contact',
    'support.technique': 'Technical Support',
    'informations.projet': 'Project Information',
    'demande.donnees': 'Data Request',
    'collaboration.industrie': 'Industry Collaboration',
    
    // Debug & System
    'debug.mode': 'Debug Mode',
    'debug.donnees.region': 'Region data',
    'debug.traductions.manquantes': 'Missing translations',
    'debug.validation.donnees': 'Data validation',
    'erreur.chargement': 'Loading error',
    'donnees.non.disponibles': 'Data not available',
    
    // Units & Measurements
    'unite.tonnes': 'tonnes',
    'unite.hectares': 'ha',
    'unite.pourcentage': '%',
    'unite.euros': '€',
    'unite.emplois': 'jobs',
    'unite.annee': '/year',
    'unite.kilogrammes': 'kg',
    'unite.litres': 'L',
    
    // Common Actions
    'voir.details': 'View details',
    'telecharger': 'Download',
    'exporter.donnees': 'Export data',
    'imprimer.rapport': 'Print report',
    'partager.lien': 'Share link',
    'copier.lien': 'Copy link',
    'fermer': 'Close',
    'ouvrir': 'Open',
    'suivant': 'Next',
    'precedent': 'Previous',
    'retour': 'Back',
    'accueil': 'Home'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [debugMode, setDebugMode] = useState(false);
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
