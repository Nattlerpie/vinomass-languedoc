import TechnicalMethodology from "../TechnicalMethodology";
import RegulatoryCompliance from "../RegulatoryCompliance";
import { useRegion } from "@/contexts/RegionContext";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppendixTab = () => {
  const { currentData } = useRegion();

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Appendix Focus */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Annexe Technique
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            Documentation complète, validation scientifique et cadre réglementaire
          </p>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* I. Technical Documentation */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              I. Documentation Technique
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Processus technologique et évaluation TRL
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <TechnicalMethodology />
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-burgundy">
                <h4 className="text-xl font-bold text-wine-charcoal mb-4">Évaluation TRL (Technology Readiness Level)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="font-semibold text-wine-charcoal">Distillation SAF:</span>
                    <span className="text-wine-burgundy font-bold">TRL 7-8</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="font-semibold text-wine-charcoal">Conversion ATJ:</span>
                    <span className="text-wine-burgundy font-bold">TRL 6-7</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                    <span className="font-semibold text-wine-charcoal">Collecte Optimisée:</span>
                    <span className="text-wine-burgundy font-bold">TRL 8-9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II. Economic Modeling */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              II. Modélisation Économique
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Hypothèses, analyse de sensibilité et benchmarking concurrentiel
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-8">
            {/* Economic Assumptions */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-wine-gold mb-6">Hypothèses Économiques</h4>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-wine-charcoal">Prix SAF (€/L):</span>
                    <span className="text-wine-gold font-bold">€1.45</span>
                  </div>
                  <div className="text-sm text-wine-charcoal/60 mt-1">Marché européen 2024-2025 (conservative)</div>
                </div>
                <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-wine-charcoal">Coût collecte (€/tonne):</span>
                    <span className="text-wine-gold font-bold">€30-50</span>
                  </div>
                  <div className="text-sm text-wine-charcoal/60 mt-1">Transport et manutention</div>
                </div>
                <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-wine-charcoal">Rendement SAF:</span>
                    <span className="text-wine-gold font-bold">280L/tonne</span>
                  </div>
                  <div className="text-sm text-wine-charcoal/60 mt-1">Marc de raisin frais (IFV 2020)</div>
                </div>
                <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-wine-charcoal">Sélectivité ATJ:</span>
                    <span className="text-wine-gold font-bold">60-70%</span>
                  </div>
                  <div className="text-sm text-wine-charcoal/60 mt-1">Alcohol-to-jet conversion (ANF 2023)</div>
                </div>
              </div>
            </div>

            {/* Sensitivity Analysis */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-wine-burgundy mb-6">Analyse de Sensibilité</h4>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-burgundy/20">
                  <div className="text-lg font-bold text-wine-charcoal mb-2">Prix SAF ±20%</div>
                  <div className="text-wine-charcoal/70">Impact ROI: +/-35%</div>
                </div>
                <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-burgundy/20">
                  <div className="text-lg font-bold text-wine-charcoal mb-2">Coût collecte ±€10</div>
                  <div className="text-wine-charcoal/70">Impact ROI: +/-15%</div>
                </div>
                <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-burgundy/20">
                  <div className="text-lg font-bold text-wine-charcoal mb-2">Rendement ±10%</div>
                  <div className="text-wine-charcoal/70">Impact ROI: +/-12%</div>
                </div>
                <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-burgundy/20">
                  <div className="text-lg font-bold text-wine-charcoal mb-2">Taux collecte ±10%</div>
                  <div className="text-wine-charcoal/70">Impact volume: +/-10%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Competitive Benchmarking */}
          <div className="bg-wine-cream/10 rounded-xl p-6">
            <h4 className="text-xl font-bold text-wine-charcoal mb-4">Benchmarking Concurrentiel</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/70 rounded-lg text-center">
                <div className="text-lg font-bold text-wine-burgundy">Biocarburants 1G</div>
                <div className="text-wine-charcoal/70">€0.85-1.20/L</div>
                <div className="text-sm text-wine-charcoal/50">Concurrence directe</div>
              </div>
              <div className="p-4 bg-white/70 rounded-lg text-center">
                <div className="text-lg font-bold text-wine-gold">SAF Synthétique</div>
                <div className="text-wine-charcoal/70">€2.50-4.00/L</div>
                <div className="text-sm text-wine-charcoal/50">Technologie émergente</div>
              </div>
              <div className="p-4 bg-white/70 rounded-lg text-center">
                <div className="text-lg font-bold text-wine-green">Kérosène Fossile</div>
                <div className="text-wine-charcoal/70">€0.73/L</div>
                <div className="text-sm text-wine-charcoal/50">Référence marché 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* III. Regulatory Compliance */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              III. Conformité Réglementaire
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Cadre législatif et normes applicables
            </p>
          </div>
          <RegulatoryCompliance />
        </div>
      </section>

      {/* IV. Risk Assessment & Mitigation */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              IV. Évaluation et Mitigation des Risques
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Identification des risques et stratégies d'atténuation
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            {/* Risk Categories */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-wine-burgundy mb-6">Catégories de Risques</h4>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-red-500">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Risques Techniques</div>
                  <ul className="text-wine-charcoal/70 space-y-1">
                    <li>• Variabilité qualité matière première</li>
                    <li>• Défaillances équipements de distillation</li>
                    <li>• Rendements inférieurs aux prévisions</li>
                  </ul>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-orange-500">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Risques Économiques</div>
                  <ul className="text-wine-charcoal/70 space-y-1">
                    <li>• Volatilité prix SAF</li>
                    <li>• Augmentation coûts énergétiques</li>
                    <li>• Concurrence accrue biocarburants</li>
                  </ul>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-yellow-500">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Risques Réglementaires</div>
                  <ul className="text-wine-charcoal/70 space-y-1">
                    <li>• Évolution mandats SAF</li>
                    <li>• Nouvelles normes environnementales</li>
                    <li>• Changements fiscaux sectoriels</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mitigation Strategies */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-wine-green mb-6">Stratégies d'Atténuation</h4>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-green/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Diversification Sources</div>
                  <div className="text-wine-charcoal/70">Contrats multiples vignerons, zones géographiques diverses</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-green/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Contrats Long Terme</div>
                  <div className="text-wine-charcoal/70">Accords pluriannuels compagnies aériennes, prix garantis</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-green/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Veille Réglementaire</div>
                  <div className="text-wine-charcoal/70">Monitoring continu évolutions législatives européennes</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-green/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Assurance Qualité</div>
                  <div className="text-wine-charcoal/70">Protocoles stricts, certifications ISO, audits réguliers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Matrix */}
          <div className="mt-8 bg-wine-cream/10 rounded-xl p-6">
            <h4 className="text-xl font-bold text-wine-charcoal mb-4 text-center">Matrice de Risques</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-red-100 rounded-lg text-center">
                <div className="font-bold text-red-700">Critique</div>
                <div className="text-sm text-red-600">Volatilité prix SAF</div>
              </div>
              <div className="p-4 bg-orange-100 rounded-lg text-center">
                <div className="font-bold text-orange-700">Élevé</div>
                <div className="text-sm text-orange-600">Qualité matière première</div>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg text-center">
                <div className="font-bold text-yellow-700">Modéré</div>
                <div className="text-sm text-yellow-600">Évolution réglementaire</div>
              </div>
              <div className="p-4 bg-green-100 rounded-lg text-center">
                <div className="font-bold text-green-700">Faible</div>
                <div className="text-sm text-green-600">Disponibilité matière</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* V. Key References */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              V. Références Clés
            </h2>
            <p className="text-lg text-wine-charcoal/70 mb-6">
              Publications scientifiques et sources principales utilisées
            </p>
            <Button 
              className="bg-wine-burgundy hover:bg-wine-burgundy/90 text-white"
              onClick={() => window.open('/bibliography-complete.pdf', '_blank')}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger Bibliographie Complète (35 sources)
            </Button>
          </div>

          <div className="space-y-6">
            {/* Reference 1 - IFV ATLAS */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-burgundy">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-wine-charcoal mb-2">
                    ATLAS Biomasse vitivinicole Bassin Languedoc-Roussillon
                  </h4>
                  <p className="text-wine-charcoal/70 mb-2">
                    Institut Français de la Vigne et du Vin (IFV), 2020
                  </p>
                  <p className="text-sm text-wine-charcoal/60 italic">
                    Source primaire: Rendement 280L SAF/tonne, données régionales sur les déchets viticoles
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-wine-burgundy flex-shrink-0 ml-4" />
              </div>
            </div>

            {/* Reference 2 - ANF SAF Report */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-gold">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-wine-charcoal mb-2">
                    Decarbonisation of the aviation sector through the production of sustainable fuels
                  </h4>
                  <p className="text-wine-charcoal/70 mb-2">
                    National Academy of Technologies of France, February 2023
                  </p>
                  <p className="text-sm text-wine-charcoal/60 italic">
                    Validation: Sélectivité ATJ 60-70%, niveaux TRL, efficacité de conversion biomasse-SAF
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-wine-gold flex-shrink-0 ml-4" />
              </div>
            </div>

            {/* Reference 3 - EASA Pricing */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-green">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-wine-charcoal mb-2">
                    2024 Aviation Fuels Reference Prices for ReFuelEU Aviation
                  </h4>
                  <p className="text-wine-charcoal/70 mb-2">
                    European Union Aviation Safety Agency (EASA), 2024
                  </p>
                  <p className="text-sm text-wine-charcoal/60 italic">
                    Validation marché: Prix moyen biocarburants aviation €1.67/L (€2,085/tonne)
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-wine-green flex-shrink-0 ml-4" />
              </div>
            </div>

            {/* Reference 4 - RMI WTP Study */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-charcoal">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-wine-charcoal mb-2">
                    Unraveling Willingness to Pay for Sustainable Aviation Fuel
                  </h4>
                  <p className="text-wine-charcoal/70 mb-2">
                    Azarova, V., Singh, H., & Shams, A., RMI, September 2024
                  </p>
                  <p className="text-sm text-wine-charcoal/60 italic">
                    Validation demande: Compagnies aériennes prêtes à payer $6/gallon (~€1.47/L), préférence déchets
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-wine-charcoal flex-shrink-0 ml-4" />
              </div>
            </div>

            {/* Reference 5 - IATA Market Report */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-wine-charcoal mb-2">
                    IATA chief hits out at "profiteering" fuel suppliers as SAF production expected to double in 2025
                  </h4>
                  <p className="text-wine-charcoal/70 mb-2">
                    Surgenor, C., Green Air News, June 2025
                  </p>
                  <p className="text-sm text-wine-charcoal/60 italic">
                    Dynamique marché: Production 2M tonnes 2025, prix moyen €1.37/L (hors frais conformité UE)
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-blue-500 flex-shrink-0 ml-4" />
              </div>
            </div>

            {/* Reference 6 - RED II Directive */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-wine-charcoal mb-2">
                    Renewable Energy Directive (RED II) 2018/2001
                  </h4>
                  <p className="text-wine-charcoal/70 mb-2">
                    European Commission, 2018
                  </p>
                  <p className="text-sm text-wine-charcoal/60 italic">
                    Cadre réglementaire: Réduction GES minimum 65% vs fossile, critères durabilité biomasse
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-purple-500 flex-shrink-0 ml-4" />
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note méthodologique:</strong> Ces 6 références constituent les sources primaires pour les calculs et projections présentés. 
              La bibliographie complète inclut 35 sources supplémentaires couvrant aspects techniques, réglementaires et économiques.
            </p>
          </div>
        </div>
      </section>

      {/* VI. Data Sources & Validation */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              VI. Sources de Données et Validation
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Fiabilité et traçabilité des informations
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Data Collection */}
            <div className="space-y-8">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-wine-burgundy mb-6">Collecte des Données</h4>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-burgundy">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Agreste - Ministère Agriculture</div>
                  <div className="text-wine-charcoal/70 mb-2">Statistiques officielles viticulture française</div>
                  <div className="text-sm text-wine-charcoal/50">Surfaces, productions, rendements 2023</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-gold">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">OIV - Organisation Internationale</div>
                  <div className="text-wine-charcoal/70 mb-2">Données mondiales vigne et vin</div>
                  <div className="text-sm text-wine-charcoal/50">Benchmark international, tendances marché</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-green">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">IFV - Institut Français</div>
                  <div className="text-wine-charcoal/70 mb-2">Recherche et développement vitivinicole</div>
                  <div className="text-sm text-wine-charcoal/50">Innovation, durabilité, valorisation</div>
                </div>
              </div>
            </div>

            {/* Analysis Methods */}
            <div className="space-y-8">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-wine-gold mb-6">Méthodes d'Analyse</h4>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Analyse Géospatiale</div>
                  <div className="text-wine-charcoal/70">Cartographie parcellaire, optimisation logistique</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Modélisation Économique</div>
                  <div className="text-wine-charcoal/70">ROI, sensibilité, scénarios de marché</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Analyse de Cycle de Vie</div>
                  <div className="text-wine-charcoal/70">Impact environnemental, bilan carbone</div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Quality & Validation */}
          <div className="bg-wine-cream/10 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">Qualité et Validation des Données</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h5 className="text-xl font-semibold text-wine-burgundy mb-4">Fiabilité des Sources</h5>
                <div className="space-y-3">
                  <div className="p-4 bg-white/70 rounded-lg">
                    <span className="font-bold text-wine-charcoal">Agreste:</span>
                    <span className="text-wine-charcoal/70 ml-2">Données officielles, recensement exhaustif</span>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg">
                    <span className="font-bold text-wine-charcoal">OIV:</span>
                    <span className="text-wine-charcoal/70 ml-2">Standards internationaux, validation croisée</span>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg">
                    <span className="font-bold text-wine-charcoal">IFV:</span>
                    <span className="text-wine-charcoal/70 ml-2">Expertise technique, données expérimentales</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="text-xl font-semibold text-wine-gold mb-4">Hypothèses Clés Validées</h5>
                <div className="space-y-3">
                  <div className="p-4 bg-white/70 rounded-lg">
                    <span className="font-bold text-wine-charcoal">Rendement SAF:</span>
                    <span className="text-wine-charcoal/70 ml-2">280L/tonne marc (IFV ATLAS 2020)</span>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg">
                    <span className="font-bold text-wine-charcoal">Sélectivité ATJ:</span>
                    <span className="text-wine-charcoal/70 ml-2">60-70% (ANF 2023, plage validée)</span>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg">
                    <span className="font-bold text-wine-charcoal">Prix SAF:</span>
                    <span className="text-wine-charcoal/70 ml-2">€1.45/L baseline (EASA 2024, RMI 2024)</span>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg">
                    <span className="font-bold text-wine-charcoal">Collecte:</span>
                    <span className="text-wine-charcoal/70 ml-2">80% du gisement (€30-50/tonne)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VII. Implementation Protocols */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              VII. Protocoles de Mise en Œuvre
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Détails opérationnels et procédures d'implémentation
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            {/* Phase Planning */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-wine-burgundy mb-6">Planification par Phases</h4>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-green-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-wine-charcoal">Phase 1: Pilote</span>
                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">6 mois</span>
                  </div>
                  <ul className="text-wine-charcoal/70 space-y-1">
                    <li>• Validation technique 1 région test</li>
                    <li>• Partenariats initiaux vignerons</li>
                    <li>• Certification process SAF</li>
                  </ul>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-wine-charcoal">Phase 2: Déploiement</span>
                    <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">18 mois</span>
                  </div>
                  <ul className="text-wine-charcoal/70 space-y-1">
                    <li>• Extension 3-5 régions clés</li>
                    <li>• Infrastructure logistique</li>
                    <li>• Contrats commerciaux</li>
                  </ul>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-blue-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-wine-charcoal">Phase 3: Optimisation</span>
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">12 mois</span>
                  </div>
                  <ul className="text-wine-charcoal/70 space-y-1">
                    <li>• Couverture nationale</li>
                    <li>• Optimisation rendements</li>
                    <li>• Expansion produits dérivés</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Operational Procedures */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-wine-gold mb-6">Procédures Opérationnelles</h4>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Collecte Marc</div>
                  <div className="text-wine-charcoal/70">
                    Protocole standardisé: collecte 24-48h post-pressurage, 
                    contenants certifiés, traçabilité GPS
                  </div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Contrôle Qualité</div>
                  <div className="text-wine-charcoal/70">
                    Tests systématiques: humidité, sucres résiduels, 
                    contaminants, potentiel alcoolique
                  </div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Production SAF</div>
                  <div className="text-wine-charcoal/70">
                    Distillation continue, monitoring temps réel, 
                    certification lot par lot, stockage sécurisé
                  </div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                  <div className="text-xl font-bold text-wine-charcoal mb-2">Livraison Client</div>
                  <div className="text-wine-charcoal/70">
                    Transport ADR, documentation complète, 
                    tests conformité, traçabilité end-to-end
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Dashboard */}
          <div className="mt-8 bg-wine-cream/10 rounded-xl p-6">
            <h4 className="text-xl font-bold text-wine-charcoal mb-4 text-center">Indicateurs Clés de Performance</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white/70 rounded-lg text-center">
                <div className="text-2xl font-bold text-wine-burgundy">95%</div>
                <div className="text-sm text-wine-charcoal/70">Taux collecte</div>
              </div>
              <div className="p-4 bg-white/70 rounded-lg text-center">
                <div className="text-2xl font-bold text-wine-gold">280L</div>
                <div className="text-sm text-wine-charcoal/70">Rendement SAF/t</div>
              </div>
              <div className="p-4 bg-white/70 rounded-lg text-center">
                <div className="text-2xl font-bold text-wine-green">24h</div>
                <div className="text-sm text-wine-charcoal/70">Délai collecte</div>
              </div>
              <div className="p-4 bg-white/70 rounded-lg text-center">
                <div className="text-2xl font-bold text-wine-charcoal">99.5%</div>
                <div className="text-sm text-wine-charcoal/70">Conformité qualité</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-16">
        <div className="bg-wine-burgundy/5 border border-wine-burgundy/20 rounded-xl p-8">
          <h4 className="text-2xl font-bold text-wine-burgundy mb-6 text-center">Avertissement et Limites</h4>
          <div className="space-y-4 text-wine-charcoal/70">
            <div className="p-4 bg-white/50 rounded-lg">
              <strong className="text-wine-charcoal">Nature prospective:</strong> Les projections économiques sont basées sur les conditions 
              de marché 2024-2025 et peuvent évoluer significativement. Prix SAF baseline €1.45/L avec sensibilité ±20%.
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <strong className="text-wine-charcoal">Validation requise:</strong> Toute décision d'investissement doit faire l'objet 
              d'études de faisabilité détaillées et actualisées spécifiques au contexte local.
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <strong className="text-wine-charcoal">Réglementations:</strong> L'évolution du cadre réglementaire SAF (mandats UE, 
              certifications, prix carbone) peut impacter significativement les hypothèses de rentabilité présentées.
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <strong className="text-wine-charcoal">Mise à jour:</strong> Données actualisées au 31 décembre 2024, révision 
              annuelle recommandée pour refléter évolutions marché et réglementaires.
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Footer */}
      <section className="mb-8">
        <div className="text-center space-y-6">
          <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl px-8 lg:px-12 py-8 shadow-elegant border border-wine-cream/30">
            <h3 className="text-xl font-bold text-wine-charcoal mb-4">
              Sources des Données
            </h3>
            <p className="text-wine-charcoal/70 leading-relaxed">
              Ministère de l'Agriculture français (Agreste), Organisation Internationale de la Vigne et du Vin (OIV), 
              Institut Français de la Vigne et du Vin (IFV), FranceAgriMer, Interprofessions viticoles régionales, 
              European Union Aviation Safety Agency (EASA), International Air Transport Association (IATA)
            </p>
          </div>
          
          <div className="inline-flex items-center space-x-6 bg-wine-cream/20 backdrop-blur-sm rounded-full px-8 py-4 border border-wine-cream/30">
            <div className="w-4 h-4 rounded-full bg-wine-burgundy"></div>
            <span className="text-lg font-semibold text-wine-charcoal">
              Données actualisées - Région {currentData.name} 2024
            </span>
            <div className="w-4 h-4 rounded-full bg-wine-gold"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppendixTab;
