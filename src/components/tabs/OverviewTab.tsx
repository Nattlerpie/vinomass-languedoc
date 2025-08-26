import StatCard from "../StatCard";
import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";

const OverviewTab = () => {
  const stats = [
    {
      title: "Superficie viticole",
      value: "220 000",
      unit: "hectares",
      variant: "burgundy" as const
    },
    {
      title: "Production annuelle de marc",
      value: "266 000",
      unit: "tonnes",
      variant: "gold" as const
    },
    {
      title: "Installations de valorisation",
      value: "73",
      unit: "unités",
      variant: "green" as const
    },
    {
      title: "Sous-produits liquides",
      value: "480 000",
      unit: "hectolitres",
      variant: "charcoal" as const
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
            variant={stat.variant}
          />
        ))}
      </div>
      
      {/* Regional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-fade-in">
          <TopCommunes />
        </div>
        <div className="animate-fade-in">
          <ValoorizationChart />
        </div>
      </div>

      {/* Regional Insights */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 animate-fade-in">
        <h3 className="text-2xl font-bold text-wine-charcoal mb-6 text-center">
          Contexte Régional Languedoc-Roussillon
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-subtle rounded-lg">
            <div className="text-3xl font-bold text-wine-burgundy mb-2">1er</div>
            <div className="text-sm text-wine-charcoal/70">Région viticole française</div>
            <div className="text-xs text-wine-charcoal/50 mt-1">En volume de production</div>
          </div>
          <div className="text-center p-6 bg-gradient-subtle rounded-lg">
            <div className="text-3xl font-bold text-wine-gold mb-2">38%</div>
            <div className="text-sm text-wine-charcoal/70">De la production nationale</div>
            <div className="text-xs text-wine-charcoal/50 mt-1">12 millions d'hectolitres</div>
          </div>
          <div className="text-center p-6 bg-gradient-subtle rounded-lg">
            <div className="text-3xl font-bold text-wine-green mb-2">€3.2B</div>
            <div className="text-sm text-wine-charcoal/70">Chiffre d'affaires annuel</div>
            <div className="text-xs text-wine-charcoal/50 mt-1">Secteur vitivinicole régional</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;