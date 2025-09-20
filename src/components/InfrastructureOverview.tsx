import { Factory, Zap, Recycle, Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const InfrastructureOverview = () => {
  const { t, debugMode: langDebugMode } = useLanguage();
  const { currentData, debugMode } = useRegion();
  
  // Use infrastructure data from RegionContext instead of hardcoded values
  const facilities = [
    { 
      name: t('infrastructure.distilleries'), 
      count: currentData.infrastructure?.distilleries || 0, 
      icon: Factory, 
      color: 'text-wine-burgundy' 
    },
    { 
      name: t('infrastructure.methanization'), 
      count: currentData.infrastructure?.methanization || 0, 
      icon: Zap, 
      color: 'text-wine-gold' 
    },
    { 
      name: t('infrastructure.composting'), 
      count: currentData.infrastructure?.composting || 0, 
      icon: Recycle, 
      color: 'text-wine-green' 
    },
    { 
      name: t('infrastructure.biomass'), 
      count: currentData.infrastructure?.biomass || 0, 
      icon: Flame, 
      color: 'text-wine-charcoal' 
    }
  ];

  // Calculate total CO2 avoided (rough estimate based on infrastructure capacity)
  const totalCO2Avoided = Math.round(
    (currentData.infrastructure?.methanization || 0) * 2100 + 
    (currentData.infrastructure?.composting || 0) * 800 +
    (currentData.infrastructure?.biomass || 0) * 5000
  );

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
      {/* DEBUG BANNER */}
      {(debugMode || langDebugMode) && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded mb-4">
          <strong className="font-bold">🏭 Infrastructure Debug</strong>
          <div className="text-sm mt-1">
            <div>Region: {currentData.displayName}</div>
            <div>Infrastructure: {JSON.stringify(currentData.infrastructure)}</div>
            <div>Total Facilities: {facilities.reduce((sum, f) => sum + f.count, 0)}</div>
            <div>CO₂ Avoided: {totalCO2Avoided.toLocaleString()}t/year</div>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
          {t('infrastructure.title')}
        </h2>
        <p className="text-lg text-wine-charcoal/70">
          {t('infrastructure.subtitle')}
        </p>
      </div>

      {/* Infrastructure Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {facilities.map((facility) => {
          const IconComponent = facility.icon;
          return (
            <div 
              key={facility.name} 
              className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-cream/30 hover:scale-105 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white/70 border-2 border-wine-cream/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={32} className={facility.color} />
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${facility.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {facility.count}
                </div>
                <div className="text-sm text-wine-charcoal font-medium">
                  {facility.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="text-center p-6 bg-wine-cream/10 border border-wine-gold/20 rounded-xl group relative">
          <div className="text-2xl font-bold text-wine-gold mb-2">
            {totalCO2Avoided.toLocaleString()}t
          </div>
          <div className="text-sm text-wine-charcoal/70">
            {t('co2.evite.annuel')}
          </div>
          <div className="text-xs text-wine-charcoal/50 mt-1">
            {t('vs.fossile')}
          </div>
          
          {/* Hover tooltip explaining CO2 calculation */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs z-10 max-w-xs">
            {t('infrastructure.co2.calculation.tooltip', {
              methanization: currentData.infrastructure?.methanization || 0,
              composting: currentData.infrastructure?.composting || 0,
              biomass: currentData.infrastructure?.biomass || 0
            })}
          </div>
        </div>
        
        <div className="text-center p-6 bg-wine-cream/10 border border-wine-green/20 rounded-xl">
          <div className="text-2xl font-bold text-wine-green mb-2">
            {facilities.reduce((sum, f) => sum + f.count, 0)}
          </div>
          <div className="text-sm text-wine-charcoal/70">
            {t('infrastructure.total.facilities')}
          </div>
          <div className="text-xs text-wine-charcoal/50 mt-1">
            {t('infrastructure.existing.capacity')}
          </div>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-8 text-center p-4 bg-wine-charcoal/5 rounded-lg">
        <p className="text-xs text-wine-charcoal/60 italic">
          * {t('infrastructure.disclaimer')}
        </p>
      </div>
    </div>
  );
};

export default InfrastructureOverview;
