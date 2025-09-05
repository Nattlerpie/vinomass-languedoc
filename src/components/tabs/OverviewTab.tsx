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
    </div>
  );
};

export default OverviewTab;