import { useState } from 'react';
import { BarChart3, MapPin, Euro, Handshake, Database, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabType = 'overview' | 'resources' | 'economy' | 'partnerships' | 'data';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  {
    id: 'overview' as TabType,
    label: 'Vue d\'ensemble',
    icon: Home,
    description: 'Statistiques régionales et métriques clés'
  },
  {
    id: 'resources' as TabType,
    label: 'Ressources',
    icon: MapPin,
    description: 'Analyse des ressources disponibles'
  },
  {
    id: 'economy' as TabType,
    label: 'Économie',
    icon: Euro,
    description: 'Outils économiques et calculateurs'
  },
  {
    id: 'partnerships' as TabType,
    label: 'Partenariats',
    icon: Handshake,
    description: 'Opportunités collaboratives'
  },
  {
    id: 'data' as TabType,
    label: 'Données',
    icon: Database,
    description: 'Méthodologie et sources'
  }
];

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
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