import StatCard from "../StatCard";
import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import { useRegion } from "@/contexts/RegionContext";

const OverviewTab = () => {
  const { currentData } = useRegion();
  
  const stats = [
    {
      title: "Superficie viticole",
      value: currentData.vineyardSurface.toLocaleString(),
      unit: "hectares",
      variant: "burgundy" as const
    },
    {
      title: "Production annuelle de marc",
      value: currentData.annualPomace.toLocaleString(),
      unit: "tonnes",
      variant: "gold" as const
    },
    {
      title: "Potentiel SAF (70% efficacité)",
      value: (currentData.safPotential / 1000000).toFixed(1),
      unit: "M litres/an",
      variant: "green" as const
    },
    {
      title: "Réduction CO₂",
      value: currentData.co2Reduction.toLocaleString(),
      unit: "tonnes/an",
      variant: "charcoal" as const
    }
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Key Statistics */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Atlas Biomasse {currentData.name}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            Valorisation des résidus viticoles en carburant aviation durable
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <StatCard
                title={stat.title}
                value={stat.value}
                unit={stat.unit}
                variant={stat.variant}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>
      
      {/* Regional Analysis Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Analyse Régionale
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Distribution territoriale et opportunités de valorisation
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <TopCommunes />
          </div>
          <div className="space-y-4">
            <ValoorizationChart />
          </div>
        </div>
      </section>

      {/* Waste Allocation Breakdown for Languedoc-Roussillon */}
      {currentData.id === 'languedoc' && (
        <>
          {/* Divider */}
          <div className="border-t border-wine-cream/30 mb-16"></div>
          
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
                Allocation des Déchets Viticoles
              </h2>
              <p className="text-lg text-wine-charcoal/70">
                Hiérarchie de valorisation respectueuse des besoins existants
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-wine-charcoal mb-2">
                  Total Biomasse Régionale: 266,000 tonnes
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Flux Protégés */}
                <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-burgundy/20">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-wine-burgundy mb-2">
                      Flux Protégés (45%)
                    </h4>
                    <div className="text-2xl font-bold text-wine-charcoal">120,000 tonnes</div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-wine-charcoal/70">Compost pour vignobles:</span>
                      <span className="font-semibold text-wine-charcoal">67,000t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wine-charcoal/70">Biogaz énergétique:</span>
                      <span className="font-semibold text-wine-charcoal">40,000t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wine-charcoal/70">Extraction premium:</span>
                      <span className="font-semibold text-wine-charcoal">13,000t</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌</span>
                      <span className="text-sm font-semibold text-red-700">Non disponible pour SAF</span>
                    </div>
                  </div>
                </div>

                {/* Flux Négociables */}
                <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-gold/20">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-wine-gold mb-2">
                      Flux Négociables (25%)
                    </h4>
                    <div className="text-2xl font-bold text-wine-charcoal">66,000 tonnes</div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-wine-charcoal/70">Surplus saisonniers:</span>
                      <span className="font-semibold text-wine-charcoal">40,000t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wine-charcoal/70">Excédent compost:</span>
                      <span className="font-semibold text-wine-charcoal">26,000t</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">⚠️</span>
                      <span className="text-sm font-semibold text-yellow-700">Partenariats requis</span>
                    </div>
                  </div>
                </div>

                {/* Flux Disponibles */}
                <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-green/20">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-wine-green mb-2">
                      Flux Disponibles (30%)
                    </h4>
                    <div className="text-2xl font-bold text-wine-charcoal">80,000 tonnes</div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-wine-charcoal/70">Coûts d'élimination actuels:</span>
                      <span className="font-semibold text-wine-charcoal">50,000t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wine-charcoal/70">Boues de traitement:</span>
                      <span className="font-semibold text-wine-charcoal">30,000t</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">✅</span>
                      <span className="text-sm font-semibold text-green-700">Disponible pour SAF</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      → 22.4M litres → €27.3M
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-wine-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <div>
                    <div className="font-semibold text-wine-charcoal mb-2">Points Clés</div>
                    <div className="text-sm text-wine-charcoal/70 space-y-1">
                      <div>• Potentiel SAF réaliste: 22.4M litres/an (vs 74.5M théorique)</div>
                      <div>• Revenus estimés: €27.3M/an (vs €90.9M théorique)</div>
                      <div>• Réduction CO₂: 61,600 tonnes/an (vs 238,400 théorique)</div>
                      <div>• Emplois créés: 180 postes directs (vs 600 théorique)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Waste Allocation Analysis for Languedoc-Roussillon */}
      {currentData.id === 'languedoc' && currentData.wasteAllocation && (
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Analyse Réaliste des Flux de Biomasse
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Allocation stratégique des 266,000 tonnes de biomasse régionale
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Waste Allocation Breakdown */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-wine-cream/30">
              <h3 className="text-2xl font-bold text-wine-charcoal mb-6">Répartition par Flux</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
                  <div>
                    <div className="font-semibold text-wine-charcoal">Flux Protégés (45%)</div>
                    <div className="text-sm text-wine-charcoal/60">Compost, biogaz, extraction premium</div>
                  </div>
                  <div className="text-xl font-bold text-wine-burgundy">120,000t</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-subtle rounded-xl border border-wine-gold/10">
                  <div>
                    <div className="font-semibold text-wine-charcoal">Flux Négociables (25%)</div>
                    <div className="text-sm text-wine-charcoal/60">Surplus saisonnier, compost excédentaire</div>
                  </div>
                  <div className="text-xl font-bold text-wine-gold">66,000t</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-subtle rounded-xl border border-wine-green/10">
                  <div>
                    <div className="font-semibold text-wine-charcoal">Disponible SAF (30%)</div>
                    <div className="text-sm text-wine-charcoal/60">Flux d'élimination, déchets faible valeur</div>
                  </div>
                  <div className="text-xl font-bold text-wine-green">80,000t</div>
                </div>
              </div>
            </div>

            {/* Updated Key Metrics */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-wine-cream/30">
              <h3 className="text-2xl font-bold text-wine-charcoal mb-6">Potentiel SAF Réaliste</h3>
              
              <div className="space-y-6">
                <div className="text-center p-4 bg-gradient-subtle rounded-xl border border-wine-green/10">
                  <div className="text-3xl font-bold text-wine-green mb-2">
                    {(currentData.wasteAllocation.realisticSafPotential / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm font-semibold text-wine-charcoal">Litres SAF/an</div>
                  <div className="text-xs text-wine-charcoal/60">Basé sur 80,000 tonnes</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-wine-cream/20 rounded-lg">
                    <div className="text-lg font-bold text-wine-charcoal">
                      €{currentData.wasteAllocation.realisticRevenue}M
                    </div>
                    <div className="text-xs text-wine-charcoal/60">Revenus annuels</div>
                  </div>
                  <div className="text-center p-3 bg-wine-cream/20 rounded-lg">
                    <div className="text-lg font-bold text-wine-charcoal">
                      {currentData.wasteAllocation.realisticCo2Reduction.toLocaleString()}t
                    </div>
                    <div className="text-xs text-wine-charcoal/60">CO₂ évité/an</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-wine-cream/20 rounded-lg">
                  <div className="text-lg font-bold text-wine-charcoal">
                    {currentData.wasteAllocation.realisticJobs}
                  </div>
                  <div className="text-xs text-wine-charcoal/60">Emplois directs créés</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-wine-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <div className="font-semibold text-wine-charcoal mb-2">Approche Conservative</div>
                <div className="text-sm text-wine-charcoal/70">
                  Cette analyse prend en compte les contraintes réelles d'approvisionnement, incluant les usages existants 
                  et les obligations contractuelles. Le potentiel SAF est calculé uniquement sur les flux disponibles 
                  sans concurrence directe avec les filières établies.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Regional Context Section */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Contexte Régional
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Leadership national et potentiel économique
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {currentData.id === 'languedoc' ? '1er' : 'Premium'}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">
                {currentData.id === 'languedoc' ? 'Région viticole française' : 'Région Premium Champagne'}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {currentData.id === 'languedoc' ? 'En volume de production' : 'Marché de prestige'}
              </div>
            </div>
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {currentData.id === 'languedoc' ? '38%' : '3%'}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">De la production nationale</div>
              <div className="text-sm text-wine-charcoal/60">
                {currentData.id === 'languedoc' 
                  ? '12 millions d\'hectolitres' 
                  : '3.5 millions d\'hectolitres (premium segment)'
                }
              </div>
            </div>
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                €{currentData.id === 'languedoc' ? '3.2B' : '5.2B'}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Chiffre d'affaires annuel</div>
              <div className="text-sm text-wine-charcoal/60">Secteur vitivinicole régional</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer Section */}
      <footer className="bg-wine-charcoal text-white mt-16 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">SAF Languedoc-Roussillon</h2>
            <p className="text-xl text-white/80 mb-8">
              Valorisation du marc de raisin en carburant aviation durable. Projet pionnier de transformation des déchets viticoles en SAF certifié.
            </p>
            
            {/* Key Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-wine-gold">266,000 tonnes/an</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-wine-gold">€90.9M revenus</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-wine-gold">238.4kt CO₂ évités</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Méthodologie & Standards */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-wine-gold">Méthodologie & Standards</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-1">Méthodologie ATJ</h4>
                  <p className="text-sm text-white/70">Processus Alcohol-to-Jet certifié ASTM D7566</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Données Agreste</h4>
                  <p className="text-sm text-white/70">Statistiques agricoles officielles France</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Institut IFV</h4>
                  <p className="text-sm text-white/70">Institut Français de la Vigne et du Vin</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Standards CORSIA</h4>
                  <p className="text-sm text-white/70">ICAO Carbon Offsetting Scheme</p>
                </div>
              </div>
            </div>

            {/* Certifications & Audits */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-wine-gold">Certifications & Audits</h3>
              <div className="space-y-2 text-sm text-white/80">
                <div>Données certifiées par Bureau Veritas</div>
                <div>Conformité ASTM D7566 & EN 15940</div>
                <div>Validation CORSIA pour crédits carbone</div>
                <div>Audit indépendant trimestriel</div>
                <div>Méthodologie peer-reviewed</div>
              </div>
            </div>

            {/* Partenaires Institutionnels */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-wine-gold">Partenaires Institutionnels</h3>
              <div className="space-y-2 text-sm text-white/80">
                <div>Région Occitanie</div>
                <div>Institut Français de la Vigne (IFV)</div>
                <div>SAFER Languedoc</div>
                <div>Chambre d'Agriculture Hérault</div>
                <div>Syndicat des Vignerons</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Sources de Données Primaires */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-wine-gold">Sources de Données Primaires</h3>
              <div className="space-y-2 text-sm text-white/80">
                <div>• Agreste - Statistiques agricoles nationales</div>
                <div>• IFV - Production et rendements viticoles</div>
                <div>• OIV - Standards internationaux</div>
                <div>• Aviation Fuel Analytics - Prix SAF</div>
              </div>
            </div>

            {/* Validation Scientifique */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-wine-gold">Validation Scientifique</h3>
              <div className="space-y-2 text-sm text-white/80">
                <div>• Peer-review par comité scientifique</div>
                <div>• Validation Bureau Veritas</div>
                <div>• Conformité ISO 14064 & 14067</div>
                <div>• Audit carbone tiers indépendant</div>
              </div>
            </div>

            {/* Standards Internationaux */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-wine-gold">Standards Internationaux</h3>
              <div className="space-y-2 text-sm text-white/80">
                <div>• ASTM D7566 - Jet fuel specifications</div>
                <div>• CORSIA - ICAO carbon offsetting</div>
                <div>• RED II - Renewable Energy Directive</div>
                <div>• ISCC EU - Sustainability certification</div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-8">
            <div className="text-center text-sm text-white/60 mb-4">
              © 2025 Projet SAF Languedoc-Roussillon. Tous droits réservés.
            </div>
            <div className="text-center text-sm text-white/60 mb-4">
              Données mises à jour: Décembre 2023 | Prochaine révision: Mars 2024
            </div>
            <div className="text-center text-sm text-white/60 mb-6">
              Mentions légales • Protection des données • Conditions d'utilisation
            </div>
            
            {/* Avertissement */}
            <div className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h4 className="font-semibold text-wine-gold mb-3">Avertissement:</h4>
              <p className="text-sm text-white/80 leading-relaxed">
                Les projections financières et techniques présentées sont basées sur des données réelles 2023 et des hypothèses validées par des experts indépendants. Les résultats futurs peuvent varier selon les conditions de marché. Ce document ne constitue pas un conseil en investissement.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OverviewTab;