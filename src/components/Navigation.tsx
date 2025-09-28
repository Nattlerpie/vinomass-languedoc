import { useState } from 'react';
import { BarChart3, MapPin, Euro, Handshake, Database, Home, FileText, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import ImplementationSupport from '@/components/tabs/ImplementationSupport';

// FIXED: Add 'implementation' to TabType
export type TabType = 'overview' | 'resources' | 'economy' | 'partnerships' | 'implementation' | 'contact' | 'methodology';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const { t } = useLanguage();
  
  const tabs = [
    {
      id: 'overview' as TabType,
      label: t('nav.vue.ensemble'),
      icon: Home,
      description: t('nav.overview.description')
    },
    {
      id: 'resources' as TabType,
      label: t('nav.ressources'),
      icon: MapPin,
      description: t('nav.resources.description')
    },
    {
      id: 'economy' as TabType,
      label: t('nav.economie'),
      icon: Euro,
      description: t('nav.economy.description')
    },
    {
      id: 'partnerships' as TabType,
      label: t('nav.partenaires'),
      icon: Handshake,
      description: t('nav.partnerships.description')
    },
    {
      id: 'implementation' as TabType, // FIXED: Added 'as TabType'
      label: t('nav.implementation'),
      icon: Lightbulb, // FIXED: Added icon
      description: t('nav.implementation.description')
      // REMOVED: component property (this should be handled in Dashboard.tsx)
    },
    {
      id: 'contact' as TabType,
      label: t('nav.contact'),
      icon: FileText,
      description: t('nav.contact.description')
    },
    {
      id: 'methodology' as TabType,
      label: t('nav.methodologie'),
      icon: Database,
      description: t('nav.methodology.description')
    }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-wine-cream/30 shadow-elegant sticky top-0 z-40">
      <div className="container mx-auto px-8">
        <nav className="flex items-center justify-center">
          <div className="flex items-center space-x-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-300 group",
                    "hover:bg-wine-burgundy/5 hover:text-wine-burgundy",
                    isActive 
                      ? "text-wine-burgundy border-b-2 border-wine-burgundy bg-wine-burgundy/5" 
                      : "text-wine-charcoal/70 border-b-2 border-transparent"
                  )}
                  title={tab.description}
                >
                  <IconComponent size={18} className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-wine-burgundy" : "text-wine-charcoal/50 group-hover:text-wine-burgundy"
                  )} />
                  <span className="font-semibold">{tab.label}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-gold animate-scale-in" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
