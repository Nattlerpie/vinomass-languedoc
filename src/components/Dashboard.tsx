import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import ResourcesTab from "./tabs/ResourcesTab";
import EconomyTab from "./tabs/EconomyTab";
import PartnershipsTab from "./tabs/PartnershipsTab";
import ImplementationSupport from "@/components/tabs/ImplementationSupport";
import DataTab from "./tabs/DataTab";
import ExecutiveDashboard from "./ExecutiveDashboard";
import ContactIntegration from "./ContactIntegration";
import ProfessionalFooter from "./ProfessionalFooter";
import ErrorHandling from "./ErrorHandling";
import DashboardHeader from "./DashboardHeader";
import GuidedTour from "./GuidedTour";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext"; // ONLY ADD THIS

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("executive");
  const [showTour, setShowTour] = useState(false);
  const { t } = useLanguage(); // ONLY ADD THIS

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-white/90 backdrop-blur-sm border border-wine-cream/50 mx-8 mt-8"> {/* ONLY CHANGE: 6 to 7 */}
          <TabsTrigger value="executive" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">{t('nav.vue.ensemble')}</TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">{t('nav.ressources')}</TabsTrigger>
          <TabsTrigger value="economy" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">{t('nav.economie')}</TabsTrigger>
          <TabsTrigger value="partnerships" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">{t('nav.partenaires')}</TabsTrigger>
          <TabsTrigger value="implementation" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">{t('nav.implementation')}</TabsTrigger> {/* ONLY ADD THIS LINE */}
          <TabsTrigger value="data" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">{t('nav.methodologie')}</TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">{t('nav.contact')}</TabsTrigger>
        </TabsList>
        
        <div className="container mx-auto px-8 py-4">
          <TabsContent value="executive">
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
          <TabsContent value="implementation"> {/* ONLY ADD THIS BLOCK */}
            <ImplementationSupport />
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
      <GuidedTour isOpen={showTour} onClose={() => setShowTour(false)} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Dashboard;
