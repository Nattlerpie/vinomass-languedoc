import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import ResourcesTab from "./tabs/ResourcesTab";
import EconomyTab from "./tabs/EconomyTab";
import PartnershipsTab from "./tabs/PartnershipsTab";
import DataTab from "./tabs/DataTab";
import ExecutiveDashboard from "./ExecutiveDashboard";
import ContactIntegration from "./ContactIntegration";
import ProfessionalFooter from "./ProfessionalFooter";
import ErrorHandling from "./ErrorHandling";
import DashboardHeader from "./DashboardHeader";
import GuidedTour from "./GuidedTour";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("executive");
  const [showTour, setShowTour] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      {/* Tour Button */}
      <div className="fixed top-24 right-6 z-40">
        <Button
          onClick={() => setShowTour(true)}
          className="bg-wine-burgundy hover:bg-wine-burgundy/90 text-white shadow-elegant"
          size="sm"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Visite Guidée
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-white/90 backdrop-blur-sm border border-wine-cream/50 mx-8 mt-8">
          <TabsTrigger value="executive" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Ressources</TabsTrigger>
          <TabsTrigger value="economy" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Économie</TabsTrigger>
          <TabsTrigger value="partnerships" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Partenariats</TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Données</TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">Contact</TabsTrigger>
        </TabsList>

        <div className="container mx-auto px-8 py-4">
          <TabsContent value="executive">
            <ExecutiveDashboard />
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

          <TabsContent value="data">
            <DataTab />
          </TabsContent>

          <TabsContent value="contact">
            <div className="space-y-8">
              <ContactIntegration />
              <ErrorHandling />
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <ProfessionalFooter />

      {/* Guided Tour */}
      <GuidedTour 
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Dashboard;