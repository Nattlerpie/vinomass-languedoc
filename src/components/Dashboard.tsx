import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import ResourcesTab from "./tabs/ResourcesTab";
import EconomyTab from "./tabs/EconomyTab";
import PartnershipsTab from "./tabs/PartnershipsTab";
import ImplementationSupport from "./tabs/ImplementationSupport";

import AppendixTab from "./tabs/AppendixTab";
import ContactIntegration from "./ContactIntegration";
import ProfessionalFooter from "./ProfessionalFooter";

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
        <TabsList className="grid w-full grid-cols-8 bg-white/90 backdrop-blur-sm border border-wine-cream/50 mx-8 mt-8 gap-1 p-1">
          <TabsTrigger value="executive" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white px-2 py-2 text-sm whitespace-nowrap">
            {t('nav.vue.ensemble')}
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white px-2 py-2 text-sm whitespace-nowrap">
            {t('nav.ressources')}
          </TabsTrigger>
          <TabsTrigger value="economy" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white px-2 py-2 text-sm whitespace-nowrap">
            {t('nav.economie')}
          </TabsTrigger>
          <TabsTrigger value="partnerships" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white px-2 py-2 text-sm whitespace-nowrap">
            {t('nav.partenaires')}
          </TabsTrigger>
          <TabsTrigger value="implementation" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white px-2 py-2 text-sm whitespace-nowrap">
            {t('nav.implementation')}
          
          </TabsTrigger>
          <TabsTrigger value="appendix" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white px-2 py-2 text-sm whitespace-nowrap">
            {t('nav.appendix')}
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-wine-burgundy data-[state=active]:text-white px-2 py-2 text-sm whitespace-nowrap">
            {t('nav.contact')}
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
          <TabsContent value="appendix">
            <AppendixTab />
          </TabsContent>
          <TabsContent value="contact">
            <ContactIntegration />
          </TabsContent>
        </div>
      </Tabs>
      
      <ProfessionalFooter />
      <ScrollToTop />
    </div>
  );
};

export default Dashboard;
