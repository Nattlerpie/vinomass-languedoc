import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import ValoorizationChart from "./ValoorizationChart";
import TopCommunes from "./TopCommunes";
import InfrastructureOverview from "./InfrastructureOverview";
import SAFOpportunities from "./SAFOpportunities";

const Dashboard = () => {
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
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ValoorizationChart />
          <TopCommunes />
        </div>
        
        <div className="mt-8">
          <InfrastructureOverview />
        </div>
        
        <div className="mt-8">
          <SAFOpportunities />
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-elegant">
            <div className="w-3 h-3 rounded-full bg-wine-burgundy" />
            <span className="text-sm font-medium text-wine-charcoal">
              Données actualisées - Région Languedoc-Roussillon
            </span>
            <div className="w-3 h-3 rounded-full bg-wine-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;