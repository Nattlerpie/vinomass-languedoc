import BiomassBreakdownChart from "../BiomassBreakdownChart";
import StaticRegionalMap from "../StaticRegionalMap";
import SeasonalTimeline from "../SeasonalTimeline";
import InfrastructureOverview from "../InfrastructureOverview";
import { useRegion } from "@/contexts/RegionContext";

const ResourcesTab = () => {
  const { currentData } = useRegion();
  
  // Realistic availability calculation: 30% of total for SAF production
  const safAvailableTonnage = 80000; // Realistic allocation for SAF
  const totalTheoreticalTonnage = 266000; // Total biomass including all types
  
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

      {/* Realistic Allocation Section */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Allocation Réaliste des Flux - Languedoc-Roussillon
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Disponibilité effective pour la production de SAF
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-charcoal/10">
              <div className="text-3xl font-bold text-wine-charcoal mb-3">{totalTheoreticalTonnage.toLocaleString()}t</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Production totale théorique</div>
              <div className="text-sm text-wine-charcoal/60">100% des ressources biomasse</div>
            </div>
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
              <div className="text-3xl font-bold text-wine-burgundy mb-3">{safAvailableTonnage.toLocaleString()}t</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Disponible pour SAF</div>
              <div className="text-sm text-wine-charcoal/60">30% allocation réaliste</div>
            </div>
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
              <div className="text-3xl font-bold text-wine-gold mb-3">{Math.round((totalTheoreticalTonnage - safAvailableTonnage)/1000)}kt</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Autres valorisations</div>
              <div className="text-sm text-wine-charcoal/60">Distillation, compostage, méthanisation</div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-wine-cream/10 rounded-xl">
            <p className="text-wine-charcoal/80 text-center">
              <strong>Pourquoi seulement 30% ?</strong> Les distilleries existantes, contraintes logistiques, 
              saisonnalité et besoins locaux limitent la disponibilité réelle pour de nouveaux projets SAF.
            </p>
          </div>
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
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
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

      {/* Infrastructure Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Infrastructure Existante
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Capacités de transformation et valorisation
          </p>
        </div>
        
        <InfrastructureOverview />
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* SAF Production Potential */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Potentiel de Production SAF
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Capacité réaliste basée sur 80,000 tonnes disponibles
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 text-center">
              <div className="text-4xl font-bold text-wine-burgundy mb-4">
                {Math.round(safAvailableTonnage * 280 / 1000000 * 1000) / 1000}M L
              </div>
              <div className="text-xl font-semibold text-wine-charcoal mb-3">Production SAF annuelle</div>
              <div className="text-sm text-wine-charcoal/60">À 280L/tonne de rendement</div>
            </div>
            
            <div className="p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 text-center">
              <div className="text-4xl font-bold text-wine-gold mb-4">
                €{Math.round(safAvailableTonnage * 280 * 1.22 / 1000000)}M
              </div>
              <div className="text-xl font-semibold text-wine-charcoal mb-3">Chiffre d'affaires potentiel</div>
              <div className="text-sm text-wine-charcoal/60">À €1.22/L prix de vente</div>
            </div>
            
            <div className="p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 text-center">
              <div className="text-4xl font-bold text-wine-green mb-4">
                {Math.round(safAvailableTonnage * 280 * 2.5 / 1000).toLocaleString()}t
              </div>
              <div className="text-xl font-semibold text-wine-charcoal mb-3">CO₂ évité annuel</div>
              <div className="text-sm text-wine-charcoal/60">vs carburant fossile</div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-wine-cream/10 rounded-xl">
            <p className="text-wine-charcoal/80 text-center text-sm">
              * Estimations basées sur les technologies ATJ (Alcohol-to-Jet) et les conditions de marché actuelles
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesTab;