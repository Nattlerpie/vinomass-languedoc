import { useRegion } from "@/contexts/RegionContext";
import { Leaf, TrendingUp, DollarSign, AlertCircle, Globe } from "lucide-react";

const ValorizationLandscapeTab = () => {
  const { currentData } = useRegion();

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Paysage de Valorisation des Déchets Viticoles
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            État des lieux, potentiel inexploité et impératif stratégique
          </p>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* I. Complete Biomass Inventory */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="flex items-center gap-4 mb-8">
            <Leaf className="h-10 w-10 text-wine-green" />
            <h2 className="text-3xl font-bold text-wine-charcoal">
              I. Inventaire Complet de la Biomasse
            </h2>
          </div>

          <div className="space-y-8">
            {/* Visual Breakdown Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Marc de raisin */}
              <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-burgundy">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-wine-charcoal">Marc de Raisin (Pomace)</h3>
                  <span className="px-3 py-1 bg-wine-burgundy text-white text-sm font-bold rounded-full">
                    ACTUEL
                  </span>
                </div>
                <div className="space-y-2 text-wine-charcoal/70">
                  <p><strong>Volume annuel:</strong> [RECHERCHE NÉCESSAIRE] tonnes/an</p>
                  <p><strong>Valorisation actuelle:</strong> Distillation eau-de-vie, compostage</p>
                  <p><strong>Potentiel SAF:</strong> 280 L/tonne (IFV 2020)</p>
                  <p><strong>Taux d'utilisation:</strong> ~60% valorisé</p>
                </div>
              </div>

              {/* Lies de vin */}
              <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-gold">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-wine-charcoal">Lies de Vin (Lees)</h3>
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
                    PARTIEL
                  </span>
                </div>
                <div className="space-y-2 text-wine-charcoal/70">
                  <p><strong>Volume annuel:</strong> [RECHERCHE NÉCESSAIRE]</p>
                  <p><strong>Valorisation actuelle:</strong> Extraction tartrates, levures</p>
                  <p><strong>Potentiel inexploité:</strong> Production bioéthanol</p>
                  <p><strong>Taux d'utilisation:</strong> ~40% valorisé</p>
                </div>
              </div>

              {/* Rafles */}
              <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-green">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-wine-charcoal">Rafles (Stems/Stalks)</h3>
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    INEXPLOITÉ
                  </span>
                </div>
                <div className="space-y-2 text-wine-charcoal/70">
                  <p><strong>Volume annuel:</strong> [RECHERCHE NÉCESSAIRE]</p>
                  <p><strong>Valorisation actuelle:</strong> Compostage, épandage</p>
                  <p><strong>Potentiel:</strong> Cellulose → bioéthanol</p>
                  <p><strong>Taux d'utilisation:</strong> <20% valorisé</p>
                </div>
              </div>

              {/* Sarments */}
              <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-wine-charcoal">Sarments (Pruned Vine Wood)</h3>
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    INEXPLOITÉ
                  </span>
                </div>
                <div className="space-y-2 text-wine-charcoal/70">
                  <p><strong>Volume annuel:</strong> 2-4 tonnes/hectare</p>
                  <p><strong>Valorisation actuelle:</strong> Brûlage, compostage</p>
                  <p><strong>Potentiel:</strong> Bioéthanol lignocellulosique</p>
                  <p><strong>Taux d'utilisation:</strong> <10% valorisé</p>
                </div>
              </div>

              {/* Pépins */}
              <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-purple-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-wine-charcoal">Pépins (Grape Seeds)</h3>
                  <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-bold rounded-full">
                    NICHE
                  </span>
                </div>
                <div className="space-y-2 text-wine-charcoal/70">
                  <p><strong>Volume annuel:</strong> [RECHERCHE NÉCESSAIRE]</p>
                  <p><strong>Valorisation actuelle:</strong> Huile cosmétique, aliment</p>
                  <p><strong>Potentiel:</strong> Marché de niche (€500-1,200/t)</p>
                  <p><strong>Taux d'utilisation:</strong> ~30% valorisé (premium)</p>
                </div>
              </div>

              {/* Pelures */}
              <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-pink-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-wine-charcoal">Pelures (Grape Skins)</h3>
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
                    PARTIEL
                  </span>
                </div>
                <div className="space-y-2 text-wine-charcoal/70">
                  <p><strong>Volume annuel:</strong> Inclus dans marc</p>
                  <p><strong>Valorisation actuelle:</strong> Extraction polyphénols</p>
                  <p><strong>Potentiel:</strong> Colorants naturels, antioxydants</p>
                  <p><strong>Taux d'utilisation:</strong> ~50% valorisé</p>
                </div>
              </div>
            </div>

            {/* Gap Analysis Summary */}
            <div className="bg-wine-cream/20 rounded-xl p-6 border border-wine-gold/30">
              <h4 className="text-xl font-bold text-wine-charcoal mb-4">Analyse des Écarts</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/70 rounded-lg">
                  <div className="text-3xl font-bold text-wine-burgundy mb-2">[XX]%</div>
                  <div className="text-sm text-wine-charcoal/70">Biomasse actuellement valorisée</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">[XX]%</div>
                  <div className="text-sm text-wine-charcoal/70">Potentiel gaspillé annuellement</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-lg">
                  <div className="text-3xl font-bold text-wine-green mb-2">€[XX] M</div>
                  <div className="text-sm text-wine-charcoal/70">Valeur économique perdue/an</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II. Current Valorization Status */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="flex items-center gap-4 mb-8">
            <TrendingUp className="h-10 w-10 text-wine-gold" />
            <h2 className="text-3xl font-bold text-wine-charcoal">
              II. État Actuel de la Valorisation
            </h2>
          </div>

          <div className="space-y-6">
            {/* Current Practices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-subtle rounded-xl">
                <h3 className="text-xl font-bold text-wine-burgundy mb-4">Pratiques Actuelles</h3>
                <ul className="space-y-3 text-wine-charcoal/70">
                  <li className="flex items-start gap-2">
                    <span className="text-wine-green mt-1">✓</span>
                    <span><strong>Distillation:</strong> Eau-de-vie de marc (usage traditionnel)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wine-green mt-1">✓</span>
                    <span><strong>Compostage:</strong> Amendement organique pour vignobles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-wine-green mt-1">✓</span>
                    <span><strong>Extraction:</strong> Polyphénols, tartrates (applications niche)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">△</span>
                    <span><strong>Alimentation animale:</strong> Utilisation limitée (tanins problématiques)</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-subtle rounded-xl">
                <h3 className="text-xl font-bold text-wine-gold mb-4">Impacts Environnementaux Actuels</h3>
                <ul className="space-y-3 text-wine-charcoal/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Émissions méthane:</strong> Décomposition en décharge/compostage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Pollution sols:</strong> Épandage excessif non contrôlé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Coûts élimination:</strong> €[XX]-[XX]/tonne pour les vignerons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Opportunité manquée:</strong> Potentiel énergétique non exploité</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Economic Value Current Practices */}
            <div className="bg-wine-cream/10 rounded-xl p-6">
              <h4 className="text-xl font-bold text-wine-charcoal mb-4">Valeur Économique des Pratiques Actuelles</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white/70 rounded-lg text-center">
                  <div className="text-lg font-bold text-wine-charcoal">Compostage</div>
                  <div className="text-2xl font-bold text-wine-charcoal/70 my-2">€5-15</div>
                  <div className="text-sm text-wine-charcoal/50">par tonne</div>
                </div>
                <div className="p-4 bg-white/70 rounded-lg text-center">
                  <div className="text-lg font-bold text-wine-charcoal">Eau-de-vie</div>
                  <div className="text-2xl font-bold text-wine-charcoal/70 my-2">€[XX]</div>
                  <div className="text-sm text-wine-charcoal/50">par tonne marc</div>
                </div>
                <div className="p-4 bg-white/70 rounded-lg text-center">
                  <div className="text-lg font-bold text-wine-charcoal">Polyphénols</div>
                  <div className="text-2xl font-bold text-wine-charcoal/70 my-2">€[XX]</div>
                  <div className="text-sm text-wine-charcoal/50">marché niche</div>
                </div>
                <div className="p-4 bg-white/70 rounded-lg text-center">
                  <div className="text-lg font-bold text-wine-burgundy">SAF Potentiel</div>
                  <div className="text-2xl font-bold text-wine-burgundy my-2">€280-400</div>
                  <div className="text-sm text-wine-charcoal/50">par tonne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* III. Comparative Case Studies */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="flex items-center gap-4 mb-8">
            <Globe className="h-10 w-10 text-wine-green" />
            <h2 className="text-3xl font-bold text-wine-charcoal">
              III. Études de Cas Comparatives
            </h2>
          </div>

          <p className="text-lg text-wine-charcoal/70 mb-8">
            Projets internationaux de valorisation de déchets agricoles en biocarburants aviation
          </p>

          <div className="space-y-6">
            {/* Gevo - US Corn Ethanol-to-Jet */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-green-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-wine-charcoal mb-2">Gevo (États-Unis)</h3>
                  <p className="text-wine-charcoal/70">Maïs → Éthanol → SAF (ATJ)</p>
                </div>
                <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                  TRL 9
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Échelle</div>
                  <div className="font-bold text-wine-charcoal">Commercial</div>
                </div>
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Capacité</div>
                  <div className="font-bold text-wine-charcoal">[XX] M gal/an</div>
                </div>
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Statut</div>
                  <div className="font-bold text-wine-green">Opérationnel</div>
                </div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-sm text-wine-charcoal/70">
                  <strong>Leçons clés:</strong> Technologie ATJ validée ASTM D7566, réduction GES 70-80%, 
                  sélectivité 60-70%, blend ratio 50% max. [DÉTAILS SUPPLÉMENTAIRES À RECHERCHER]
                </p>
              </div>
            </div>

            {/* LanzaJet - Ethanol-to-Jet */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-blue-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-wine-charcoal mb-2">LanzaJet (États-Unis)</h3>
                  <p className="text-wine-charcoal/70">Éthanol déchets agricoles → SAF</p>
                </div>
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                  TRL 8-9
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Échelle</div>
                  <div className="font-bold text-wine-charcoal">Freedom Pines Fuels (GA)</div>
                </div>
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Capacité</div>
                  <div className="font-bold text-wine-charcoal">9 M gal SAF/an</div>
                </div>
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Statut</div>
                  <div className="font-bold text-wine-green">Inauguré 2024</div>
                </div>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-sm text-wine-charcoal/70">
                  <strong>Leçons clés:</strong> Première usine commerciale ethanol-to-jet, soutien DOE depuis 2016,
                  création 80 emplois, impact économique $70M annuel. [DÉTAILS TECHNIQUES À RECHERCHER]
                </p>
              </div>
            </div>

            {/* Fulcrum BioEnergy - Municipal Waste */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-red-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-wine-charcoal mb-2">Fulcrum BioEnergy (États-Unis)</h3>
                  <p className="text-wine-charcoal/70">Déchets municipaux → SAF (Gasification)</p>
                </div>
                <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                  ÉCHEC
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Investissement</div>
                  <div className="font-bold text-wine-charcoal">$1+ milliard</div>
                </div>
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Capacité prévue</div>
                  <div className="font-bold text-wine-charcoal">11 M gal/an</div>
                </div>
                <div>
                  <div className="text-sm text-wine-charcoal/60 mb-1">Statut</div>
                  <div className="font-bold text-red-600">Faillite 2024</div>
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-wine-charcoal">
                  <strong>Leçons critiques:</strong> Défis techniques majeurs (corrosion acide nitrique, 
                  problèmes gasification), coûts >$200M construction, production très limitée avant fermeture.
                  Importance validation technologique avant échelle commerciale.
                </p>
              </div>
            </div>

            {/* Spanish Olive/Agricultural Waste Projects */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-gold">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-wine-charcoal mb-2">Projets Méditerranéens (Espagne)</h3>
                  <p className="text-wine-charcoal/70">Déchets agricoles → Biocarburants</p>
                </div>
                <span className="px-3 py-1 bg-yellow-600 text-white text-sm font-bold rounded-full">
                  EN COURS
                </span>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-sm text-wine-charcoal/70">
                  <strong>Cepsa, Repsol:</strong> Développement SAF à partir d'huile de cuisson usagée et 
                  déchets agricoles (olive pomace). IAG: achat >28,000 tonnes SAF (plus grand contrat espagnol).
                  [DÉTAILS PROJETS OLIVE POMACE À RECHERCHER]
                </p>
              </div>
            </div>

            {/* Brazil Sugarcane Ethanol */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-green-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-wine-charcoal mb-2">Brésil - Canne à Sucre</h3>
                  <p className="text-wine-charcoal/70">Éthanol sucre/bagasse → SAF</p>
                </div>
                <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                  MATURE
                </span>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-sm text-wine-charcoal/70">
                  <strong>Leçons:</strong> Infrastructure éthanol établie, coûts compétitifs ($0.35-0.39/kg éthanol),
                  SAF biojet ~$1.86/kg (31% moins cher que USA). Avantage: chaîne d'approvisionnement mature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IV. The Cost-Benefit Reality */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="flex items-center gap-4 mb-8">
            <DollarSign className="h-10 w-10 text-wine-burgundy" />
            <h2 className="text-3xl font-bold text-wine-charcoal">
              IV. La Réalité Coûts-Bénéfices
            </h2>
          </div>

          <div className="space-y-8">
            {/* The Gap */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-300">
              <h3 className="text-2xl font-bold text-red-700 mb-6">L'Écart de Prix: €0.72/L</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/80 rounded-lg border border-red-200">
                  <div className="text-sm text-wine-charcoal/60 mb-2">Kérosène Fossile</div>
                  <div className="text-4xl font-bold text-wine-charcoal mb-2">€0.73</div>
                  <div className="text-sm text-wine-charcoal/70">par litre (2024)</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-5xl font-bold text-red-600">→</div>
                </div>
                <div className="text-center p-6 bg-white/80 rounded-lg border border-wine-burgundy">
                  <div className="text-sm text-wine-charcoal/60 mb-2">SAF Marc-Raisin</div>
                  <div className="text-4xl font-bold text-wine-burgundy mb-2">€1.45</div>
                  <div className="text-sm text-wine-charcoal/70">par litre (baseline)</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl font-bold text-red-700">
                  ≈ 2x plus cher que le carburant fossile
                </p>
                <p className="text-lg text-wine-charcoal/70 mt-2">
                  La vérité brutale que nous ne pouvons plus ignorer
                </p>
              </div>
            </div>

            {/* Why "Too Expensive" Isn't Good Enough */}
            <div className="bg-gradient-subtle rounded-xl p-8 border-2 border-wine-gold">
              <h3 className="text-2xl font-bold text-wine-gold mb-6">
                Pourquoi "Trop Cher" N'Est Plus Une Excuse
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-wine-burgundy flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-wine-charcoal mb-1">Mandats UE Non-Négociables</h4>
                      <p className="text-wine-charcoal/70 text-sm">
                        ReFuelEU Aviation: 2% SAF 2025, 6% 2030, 70% 2050. Pénalités non-conformité: 
                        €45M/an potentiel pour notre région.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-wine-burgundy flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-wine-charcoal mb-1">Ajustements Carbone Frontaliers</h4>
                      <p className="text-wine-charcoal/70 text-sm">
                        Prix carbone UE augmente. Fossile deviendra progressivement plus cher, 
                        réduisant l'écart de prix SAF.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-wine-burgundy flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-wine-charcoal mb-1">Risque Actifs Échoués</h4>
                      <p className="text-wine-charcoal/70 text-sm">
                        Infrastructure fossile aviation = obsolescence programmée. 
                        Investissements aujourd'hui dans fossile = pertes demain.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-wine-burgundy flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-wine-charcoal mb-1">Licence Sociale</h4>
                      <p className="text-wine-charcoal/70 text-sm">
                        Consommateurs, investisseurs exigent action climat. Inaction = perte 
                        compétitivité, réputation, accès financement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Making Economics Work */}
            <div className="bg-wine-cream/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-wine-green mb-6">
                Comment Rendre l'Économie Viable
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-white/70 rounded-lg border border-wine-green/30">
                  <h4 className="font-bold text-wine-charcoal mb-3">1. Leviers Politiques</h4>
                  <p className="text-wine-charcoal/70">
                    Prix carbone, incitations fiscales, mandats comblent l'écart. Exemple: 
                    Crédit LCFS Californie + RIN D3 EPA peuvent réduire coût effectif de $1-2/gal.
                  </p>
                </div>
                <div className="p-6 bg-white/70 rounded-lg border border-wine-green/30">
                  <h4 className="font-bold text-wine-charcoal mb-3">2. Économies d'Échelle</h4>
                  <p className="text-wine-charcoal/70">
                    Projections IFV: €1.45/L → €1.10/L à 10x échelle actuelle. 
                    Investissement infrastructure = réduction coûts long terme.
                  </p>
                </div>
                <div className="p-6 bg-white/70 rounded-lg border border-wine-green/30">
                  <h4 className="font-bold text-wine-charcoal mb-3">3. Revenus Co-Produits</h4>
                  <p className="text-wine-charcoal/70">
                    Biochar (€50-100/t), extraits polyphénols (€[XX]/t), levures compensent 
                    coûts production SAF. Approche bioraffinerie intégrée.
                  </p>
                </div>
                <div className="p-6 bg-white/70 rounded-lg border border-wine-green/30">
                  <h4 className="font-bold text-wine-charcoal mb-3">4. Coûts Évités</h4>
                  <p className="text-wine-charcoal/70">
                    Frais élimination déchets (€30-40K/an par vigneron), infrastructure compostage, 
                    amendes environnementales évitées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* V. Alternative Valorization Pathways Comparison */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-8">
            V. Comparaison des Voies de Valorisation
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-wine-burgundy text-white">
                  <th className="p-4 text-left">Voie de Valorisation</th>
                  <th className="p-4 text-center">Revenu/tonne</th>
                  <th className="p-4 text-center">Réduction GES</th>
                  <th className="p-4 text-center">Scalabilité</th>
                  <th className="p-4 text-center">Valeur Stratégique</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Compostage</td>
                  <td className="p-4 text-center">€5-15</td>
                  <td className="p-4 text-center">10%</td>
                  <td className="p-4 text-center">Élevée</td>
                  <td className="p-4 text-center">Faible</td>
                </tr>
                <tr className="border-b bg-wine-cream/10">
                  <td className="p-4 font-semibold">Biochar</td>
                  <td className="p-4 text-center">€50-100</td>
                  <td className="p-4 text-center">35%</td>
                  <td className="p-4 text-center">Moyenne</td>
                  <td className="p-4 text-center">Moyenne</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Alimentation Animale</td>
                  <td className="p-4 text-center">€80-120</td>
                  <td className="p-4 text-center">20%</td>
                  <td className="p-4 text-center">Moyenne</td>
                  <td className="p-4 text-center">Faible</td>
                </tr>
                <tr className="border-b bg-wine-burgundy/10">
                  <td className="p-4 font-bold text-wine-burgundy">Production SAF</td>
                  <td className="p-4 text-center font-bold text-wine-burgundy">€280-400</td>
                  <td className="p-4 text-center font-bold text-wine-burgundy">86%</td>
                  <td className="p-4 text-center font-bold text-wine-burgundy">Élevée</td>
                  <td className="p-4 text-center font-bold text-wine-burgundy">Critique</td>
                </tr>
                <tr className="border-b bg-wine-cream/10">
                  <td className="p-4 font-semibold">Cosmétiques (pépins uniquement)</td>
                  <td className="p-4 text-center">€500-1,200</td>
                  <td className="p-4 text-center">15%</td>
                  <td className="p-4 text-center">Faible</td>
                  <td className="p-4 text-center">Niche</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-wine-burgundy/5 rounded-xl p-6 border-2 border-wine-burgundy/30">
            <h4 className="text-xl font-bold text-wine-burgundy mb-4">Pourquoi SAF est Supérieur</h4>
            <ul className="space-y-2 text-wine-charcoal/70">
              <li className="flex items-start gap-2">
                <span className="text-wine-green mt-1 font-bold">✓</span>
                <span><strong>Revenu maximum:</strong> 5-50x plus élevé que compostage/biochar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wine-green mt-1 font-bold">✓</span>
                <span><strong>Impact climat:</strong> 86% réduction GES vs fossile (RED II validé)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wine-green mt-1 font-bold">✓</span>
                <span><strong>Scalabilité:</strong> Potentiel 52M L/an Languedoc seul</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wine-green mt-1 font-bold">✓</span>
                <span><strong>Impératif stratégique:</strong> Répond mandats UE, indépendance énergétique</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wine-green mt-1 font-bold">✓</span>
                <span><strong>Développement rural:</strong> Création emplois qualifiés, diversification revenus agricoles</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* VI. The Circular Economy Imperative */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-8">
            VI. L'Impératif de l'Économie Circulaire
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Opportunity Cost */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-burgundy">
              <h3 className="text-xl font-bold text-wine-charcoal mb-4">Coût d'Opportunité</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-sm text-wine-charcoal/60">Production Annuelle</div>
                  <div className="text-2xl font-bold text-wine-burgundy">266,000 tonnes</div>
                  <div className="text-sm text-wine-charcoal/70">Déchets viticoles France</div>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-sm text-wine-charcoal/60">Revenu Perdu Annuel</div>
                  <div className="text-2xl font-bold text-wine-burgundy">€75 M</div>
                  <div className="text-sm text-wine-charcoal/70">Potentiel SAF non exploité</div>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-sm text-wine-charcoal/60">Méthane Évitable</div>
                  <div className="text-2xl font-bold text-wine-burgundy">[XX] kt CO₂e</div>
                  <div className="text-sm text-wine-charcoal/70">Décomposition compostage/décharge</div>
                </div>
              </div>
            </div>

            {/* Strategic Cost */}
            <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-gold">
              <h3 className="text-xl font-bold text-wine-charcoal mb-4">Coût Stratégique</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-wine-charcoal/70">
                    <strong>Leadership perdu:</strong> France peut devenir leader SAF méditerranéen, 
                    ou importer technologie étrangère
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-wine-charcoal/70">
                    <strong>Dépendance énergétique:</strong> Continuer importations fossiles vs 
                    production locale renouvelable
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-wine-charcoal/70">
                    <strong>Emplois ruraux:</strong> Opportunité développement économique régions 
                    viticoles vs déclin démographique
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-wine-charcoal/70">
                    <strong>Innovation:</strong> Positionnement R&D bioraffinerie ou rattrapage 
                    technologique coûteux
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VII. Our Duty to Make This Work */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-wine-burgundy/10 via-wine-gold/10 to-wine-green/10 rounded-2xl p-8 lg:p-12 shadow-elegant border-2 border-wine-burgundy/30">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-6 text-center">
            VII. Notre Devoir de Faire Fonctionner Cette Solution
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Climate Commitments */}
            <div className="bg-white/80 rounded-xl p-6">
              <h3 className="text-xl font-bold text-wine-burgundy mb-4">
                Les Engagements Climatiques Ne Sont Pas Optionnels
              </h3>
              <p className="text-wine-charcoal/70 mb-4">
                Accord de Paris, Green Deal européen, loi climat française: obligations juridiques 
                contraignantes. L'aviation représente 2% émissions mondiales CO₂, 12% émissions transport. 
                Sans SAF, objectif net-zéro 2050 impossible.
              </p>
              <div className="bg-wine-cream/30 rounded-lg p-4">
                <p className="text-wine-charcoal font-semibold">
                  "Nous ne pouvons pas prétendre prendre le climat au sérieux tout en ignorant 
                  les solutions existantes simplement parce qu'elles coûtent plus cher aujourd'hui."
                </p>
              </div>
            </div>

            {/* Agricultural Participation */}
            <div className="bg-white/80 rounded-xl p-6">
              <h3 className="text-xl font-bold text-wine-gold mb-4">
                Le Secteur Agricole Doit Participer à la Décarbonation
              </h3>
              <p className="text-wine-charcoal/70">
                Agriculture = 19% émissions GES France. Viticulteurs partie prenante solution, 
                pas seulement problème. Valorisation déchets viticoles en SAF = contribution directe, 
                mesurable à objectifs climat nationaux + source revenus complémentaire.
              </p>
            </div>

            {/* Regional Development */}
            <div className="bg-white/80 rounded-xl p-6">
              <h3 className="text-xl font-bold text-wine-green mb-4">
                Opportunités Développement Régional
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-wine-cream/30 rounded-lg">
                  <div className="text-3xl font-bold text-wine-green mb-2">[XXX]</div>
                  <div className="text-sm text-wine-charcoal/70">Emplois directs potentiels</div>
                </div>
                <div className="text-center p-4 bg-wine-cream/30 rounded-lg">
                  <div className="text-3xl font-bold text-wine-green mb-2">€[XX] M</div>
                  <div className="text-sm text-wine-charcoal/70">Revenus annuels vignerons</div>
                </div>
                <div className="text-center p-4 bg-wine-cream/30 rounded-lg">
                  <div className="text-3xl font-bold text-wine-green mb-2">[XX]%</div>
                  <div className="text-sm text-wine-charcoal/70">Indépendance énergétique</div>
                </div>
              </div>
              <p className="text-wine-charcoal/70">
                Transformation déchet → ressource stratégique = revitalisation économique régions 
                rurales, diversification revenus, création emplois qualifiés non-délocalisables.
              </p>
            </div>

            {/* Competitive Advantage */}
            <div className="bg-white/80 rounded-xl p-6">
              <h3 className="text-xl font-bold text-wine-burgundy mb-4">
                Avantage Compétitif: La France Peut Mener
              </h3>
              <p className="text-wine-charcoal/70">
                France = 2ème producteur vin mondial, infrastructure viticole mature, expertise 
                fermentation/distillation centenaire. Leadership SAF déchets viticoles = 
                positionnement international, exportation technologie, influence réglementaire UE.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-wine-burgundy text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Le Vrai Coût du Statu Quo
              </h3>
              <p className="text-lg mb-6">
                Ne rien faire = accepter dépendance fossiles, manquer objectifs climat, perdre 
                opportunités économiques, céder leadership innovation. Coût inaction > coût action.
              </p>
              <div className="text-3xl font-bold">
                Il n'y a pas d'alternative à réussir.
              </div>
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
              IFV (Institut Français de la Vigne et du Vin), Académie Nationale des Technologies 
              de France (ANF), U.S. Department of Energy BETO, études techno-économiques publiées 
              (Springer, ScienceDirect, MDPI), rapports industriels Gevo/LanzaJet/Fulcrum
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

export default ValorizationLandscapeTab;
