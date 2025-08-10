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
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: t("stats.vineyard.surface"),
      value: "220 000",
      unit: t("stats.hectares"),
      variant: "burgundy" as const
    },
    {
      title: t("stats.annual.marc"),
      value: "266 000",
      unit: t("stats.tonnes"),
      variant: "gold" as const
    },
    {
      title: t("stats.valorization.installations"),
      value: "73",
      unit: t("stats.units"),
      variant: "green" as const
    },
    {
      title: t("stats.liquid.byproducts"),
      value: "480 000",
      unit: t("stats.hectoliters"),
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
        
        {/* Regional Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <TopCommunes />
          </div>
          <div className="animate-fade-in">
            <ValoorizationChart />
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
        
        <div className="text-center space-y-6">
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-elegant">
            <div className="w-3 h-3 rounded-full bg-wine-burgundy" />
            <span className="text-sm font-medium text-wine-charcoal">
              {t("footer.data.updated")} Languedoc-Roussillon
            </span>
            <div className="w-3 h-3 rounded-full bg-wine-gold" />
          </div>
          
          {/* Data Sources */}
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-wine-charcoal/60 leading-relaxed px-4">
              {t("footer.data.sources")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;