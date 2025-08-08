import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import SAFCalculator from "./SAFCalculator";
import ProjectTimeline from "./ProjectTimeline";
import StakeholderBenefits from "./StakeholderBenefits";
import ImplementationChallenges from "./ImplementationChallenges";
import ValoorizationChart from "./ValoorizationChart";
import TopCommunes from "./TopCommunes";
import InfrastructureOverview from "./InfrastructureOverview";
import SAFOpportunities from "./SAFOpportunities";
import PartnershipOpportunities from "./PartnershipOpportunities";

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
      
      <div className="container mx-auto px-8 py-16 space-y-12">
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
        
        {/* Business Planning Tools */}
        <div className="animate-fade-in">
          <SAFCalculator />
        </div>
        
        <div className="animate-fade-in">
          <ProjectTimeline />
        </div>
        
        <div className="animate-fade-in">
          <StakeholderBenefits />
        </div>
        
        <div className="animate-fade-in">
          <ImplementationChallenges />
        </div>
        
        {/* Regional Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <ValoorizationChart />
          </div>
          <div className="animate-fade-in">
            <TopCommunes />
          </div>
        </div>
        
        <div className="animate-fade-in">
          <InfrastructureOverview />
        </div>
        
        <div className="animate-fade-in">
          <SAFOpportunities />
        </div>
        
        <div className="animate-fade-in">
          <PartnershipOpportunities />
        </div>
        
        <div className="text-center">
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