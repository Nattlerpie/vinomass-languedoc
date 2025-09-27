import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import ResourcesTab from "./tabs/ResourcesTab";
import EconomyTab from "./tabs/EconomyTab";
import PartnershipsTab from "./tabs/PartnershipsTab";
import DataTab from "./tabs/DataTab";
import ImplementationSupportTab from "./tabs/ImplementationSupportTab";
import ExecutiveDashboard from "./ExecutiveDashboard";
import ContactIntegration from "./ContactIntegration";
import ProfessionalFooter from "./ProfessionalFooter";
import ErrorHandling from "./ErrorHandling";
import DashboardHeader from "./DashboardHeader";
import GuidedTour from "./GuidedTour";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showTour, setShowTour] = useState(false);
  return <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
    
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-white/90 backdrop-blur-sm border border-wine-cream/50 mx-8 mt-8">
          <TabsTrigger value="overview" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Ressources</TabsTrigger>
          <TabsTrigger value="economy" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Économie</TabsTrigger>
          <TabsTrigger value="partnerships" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Partenariats</TabsTrigger>
          <TabsTrigger value="implementation" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Support à l'Implémentation</TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Contact</TabsTrigger>
          <TabsTrigger value="methodology" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Appendix</TabsTrigger>
        </TabsList>

        <div className="container mx-auto px-8 py-4">
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="resources">
            <ResourcesTab />
          </TabsContent>

          <TabsContent value="economy">
            <EconomyTab />
          </TabsContent>

          <TabsContent value="partnerships">
            <PartnershipsTab />
          </TabsContent>

          <TabsContent value="implementation">
            <ImplementationSupportTab />
          </TabsContent>

          <TabsContent value="contact">
            <div className="space-y-8">
              <ContactIntegration />
              <ErrorHandling />
            </div>
          </TabsContent>

          <TabsContent value="methodology">
            <DataTab />
          </TabsContent>
        </div>
      </Tabs>

      <ProfessionalFooter />

      {/* Guided Tour */}
      <GuidedTour isOpen={showTour} onClose={() => setShowTour(false)} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>;
};
export default Dashboard;