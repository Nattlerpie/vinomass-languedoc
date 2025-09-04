import InfrastructureOverview from "../InfrastructureOverview";
import SAFOpportunities from "../SAFOpportunities";
import BiomassBreakdownChart from "../BiomassBreakdownChart";
import StaticRegionalMap from "../StaticRegionalMap";
import SeasonalTimeline from "../SeasonalTimeline";
import EnhancedValoorizationMethods from "../EnhancedValoorizationMethods";
import { useRegion } from "@/contexts/RegionContext";

const ResourcesTab = () => {
  const { currentData } = useRegion();
  
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Interactive Map */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Ressources Biomasse
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            Cartographie et analyse des ressources régionales disponibles
          </p>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-elegant border border-wine-cream/30">
          <StaticRegionalMap />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Resource Analysis Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Analyse des Ressources
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Répartition et saisonnalité des biomasses disponibles
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="space-y-6">
            <BiomassBreakdownChart />
          </div>
          <div className="space-y-6">
            <SeasonalTimeline />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Valorization & Infrastructure Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Valorisation et Infrastructure
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Technologies et opportunités de transformation
          </p>
        </div>
        
        <div className="space-y-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <EnhancedValoorizationMethods />
            </div>
            <div className="space-y-6">
              <SAFOpportunities />
            </div>
          </div>
          
          <div className="w-full">
            <InfrastructureOverview />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Resource Summary Section */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Synthèse des Ressources Biomasse
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Volumes disponibles et potentiel de valorisation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 lg:p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-wine-burgundy mb-3">{currentData.annualPomace.toLocaleString()}t</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Marc de raisin annuel</div>
              <div className="text-sm text-wine-charcoal/60">Saison septembre-novembre</div>
            </div>
            <div className="text-center p-6 lg:p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-wine-gold mb-3">{Math.round(currentData.annualPomace * 0.18).toLocaleString()}t</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Sous-produits liquides</div>
              <div className="text-sm text-wine-charcoal/60">Lies, bourbes, eaux de process</div>
            </div>
            <div className="text-center p-6 lg:p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-wine-green mb-3">{Math.round(currentData.annualPomace * 0.17).toLocaleString()}t</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Bois de taille</div>
              <div className="text-sm text-wine-charcoal/60">Disponible toute l'année</div>
            </div>
            <div className="text-center p-6 lg:p-8 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-wine-charcoal mb-3">{Math.round(currentData.annualPomace * 0.18).toLocaleString()}t</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Autres résidus</div>
              <div className="text-sm text-wine-charcoal/60">Sarments, rafles, etc.</div>
            </div>
          </div>

          {/* Regional Positioning */}
          <div className="bg-wine-cream/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">Positionnement Régional</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white/70 rounded-xl border border-wine-burgundy/10">
                <div className="text-xl font-bold text-wine-burgundy mb-3">
                  {currentData.id === 'languedoc' ? 'Leadership National' : 'Excellence Premium'}
                </div>
                <div className="text-wine-charcoal/70 mb-2">
                  {currentData.id === 'languedoc' ? '38% de la production viticole française' : 'Marché champagne de prestige'}
                </div>
                <div className="text-sm text-wine-charcoal/50">
                  {Math.round(currentData.annualPomace * 1.53).toLocaleString()} tonnes biomasse totale
                </div>
              </div>
              <div className="p-6 bg-white/70 rounded-xl border border-wine-gold/10">
                <div className="text-xl font-bold text-wine-gold mb-3">Potentiel SAF</div>
                <div className="text-wine-charcoal/70 mb-2">{(currentData.safPotential / 1000000).toFixed(1)}M litres SAF potentiels</div>
                <div className="text-sm text-wine-charcoal/50">€{currentData.revenue}M de valeur ajoutée</div>
              </div>
              <div className="p-6 bg-white/70 rounded-xl border border-wine-green/10">
                <div className="text-xl font-bold text-wine-green mb-3">Impact Environnemental</div>
                <div className="text-wine-charcoal/70 mb-2">{currentData.co2Reduction.toLocaleString()} tonnes CO₂ évitées</div>
                <div className="text-sm text-wine-charcoal/50">vs carburant conventionnel</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesTab;