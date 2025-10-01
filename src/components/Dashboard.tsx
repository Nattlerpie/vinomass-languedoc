import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import ResourcesTab from "./tabs/ResourcesTab";
import EconomyTab from "./tabs/EconomyTab";
import PartnershipsTab from "./tabs/PartnershipsTab";
import ImplementationSupport from "./tabs/ImplementationSupport";
import DataTab from "./tabs/DataTab";
import ContactIntegration from "./ContactIntegration";
import ProfessionalFooter from "./ProfessionalFooter";
import ErrorHandling from "./ErrorHandling";
import DashboardHeader from "./DashboardHeader";
import ScrollToTop from "./ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("executive");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-white/90 backdrop-blur-sm border border-wine-cream/50 mx-8 mt-8">
          <TabsTrigger value="executive" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">
            {t('nav.vue.ensemble')}
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">
            {t('nav.ressources')}
          </TabsTrigger>
          <TabsTrigger value="economy" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">
            {t('nav.economie')}
          </TabsTrigger>
          <TabsTrigger value="partnerships" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">
            {t('nav.partenaires')}
          </TabsTrigger>
          <TabsTrigger value="implementation" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">
            {t('nav.implementation')}
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">
            {t('nav.contact')}
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white">
            {t('nav.appendix')}
          </TabsTrigger>
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
          <TabsContent value="implementation">
            <ImplementationSupport />
          </TabsContent>
          <TabsContent value="contact">
            <div className="space-y-8">
              <ContactIntegration />
              <ErrorHandling />
            </div>
          </TabsContent>
          <TabsContent value="data">
            <DataTab />
          </TabsContent>
        </div>
      </Tabs>
      
      <ProfessionalFooter />
      <ScrollToTop />
    </div>
  );
};

export default Dashboard;
