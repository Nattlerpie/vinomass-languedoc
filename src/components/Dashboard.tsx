import { useState } from 'react';
import DashboardHeader from "./DashboardHeader";
import Navigation, { TabType } from "./Navigation";
import Breadcrumbs from "./Breadcrumbs";
import OverviewTab from "./tabs/OverviewTab";
import ResourcesTab from "./tabs/ResourcesTab";
import EconomyTab from "./tabs/EconomyTab";
import PartnershipsTab from "./tabs/PartnershipsTab";
import DataTab from "./tabs/DataTab";
import GuidedTour from "./GuidedTour";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showTour, setShowTour] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'resources':
        return <ResourcesTab />;
      case 'economy':
        return <EconomyTab />;
      case 'partnerships':
        return <PartnershipsTab />;
      case 'data':
        return <DataTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Breadcrumbs activeTab={activeTab} />
      
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
      
      <div className="container mx-auto px-8 py-12">
        <div className="transition-all duration-500 ease-in-out">
          {renderTabContent()}
        </div>
      </div>

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