import { ChevronRight, Home } from 'lucide-react';
import { TabType } from './Navigation';

interface BreadcrumbsProps {
  activeTab: TabType;
}

const tabLabels: Record<TabType, string> = {
  overview: 'Vue d\'ensemble',
  resources: 'Ressources',
  economy: 'Économie', 
  partnerships: 'Partenariats',
  implementation: 'Support à l\'Implémentation',
  contact: 'Contact',
  methodology: 'Appendix'
};

const Breadcrumbs = ({ activeTab }: BreadcrumbsProps) => {
  return (
    <div className="bg-wine-cream/10 backdrop-blur-sm border-b border-wine-cream/20">
      <div className="container mx-auto px-8 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <Home size={14} className="text-wine-charcoal/60" />
          <span className="text-wine-charcoal/60">Atlas Biomasse Vitivinicole</span>
          <ChevronRight size={14} className="text-wine-charcoal/40" />
          <span className="text-wine-burgundy font-medium">{tabLabels[activeTab]}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;