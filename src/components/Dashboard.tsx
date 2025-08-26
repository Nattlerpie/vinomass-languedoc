import { useState } from 'react';
import DashboardHeader from "./DashboardHeader";
import Navigation, { TabType } from "./Navigation";
import Breadcrumbs from "./Breadcrumbs";
import OverviewTab from "./tabs/OverviewTab";
import ResourcesTab from "./tabs/ResourcesTab";
import EconomyTab from "./tabs/EconomyTab";
import PartnershipsTab from "./tabs/PartnershipsTab";
import DataTab from "./tabs/DataTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

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
      
      <div className="container mx-auto px-8 py-12">
        <div className="transition-all duration-500 ease-in-out">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;