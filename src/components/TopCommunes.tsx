import RegionalMap from './RegionalMap';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const TopCommunes = () => {
  const { t, debugMode: langDebugMode } = useLanguage();
  const { currentData, debugMode } = useRegion();
  
  const communes = currentData.topCommunes || [];
  const totalProduction = communes.reduce((sum, commune) => sum + commune.tonnage, 0);

  return (
    <div className="space-y-8">
      {/* DEBUG BANNER */}
      {(debugMode || langDebugMode) && (
        <div className="bg-indigo-100 border border-indigo-400 text-indigo-700 px-3 py-2 rounded mb-4">
          <strong className="font-bold">🏘️ TopCommunes Debug</strong>
          <div className="text-sm mt-1">
            <div>Region: {currentData.displayName}</div>
            <div>Communes Count: {communes.length}</div>
            <div>Total Production: {totalProduction.toLocaleString()}t</div>
            <div>Top Commune: {communes[0]?.name} ({communes[0]?.tonnage.toLocaleString()}t)</div>
          </div>
        </div>
      )}

      {/* Top Producing Communes */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30 hover:shadow-wine transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-wine-charcoal text-shadow">
            {t('communes.principales')}
          </h3>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle size={18} className="text-wine-charcoal/50 hover:text-wine-charcoal transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{t('communes.tooltip')}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-4">
          {communes.map((commune, index) => (
            <div
              key={commune.name}
              className="flex items-center justify-between p-4 bg-gradient-subtle rounded-xl border border-wine-cream/40 hover:border-wine-burgundy/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110 ${
                  index === 0 ? 'bg-wine-burgundy shadow-wine' : 
                  index === 1 ? 'bg-wine-gold shadow-elegant' : 
                  index === 2 ? 'bg-wine-green shadow-elegant' :
                  index === 3 ? 'bg-wine-charcoal shadow-elegant' :
                  index === 4 ? 'bg-wine-burgundy/70 shadow-elegant' :
                  'bg-wine-gold/70 shadow-elegant'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <span className="font-semibold text-wine-charcoal">
                    {commune.name}
                  </span>
                  <div className="text-xs text-wine-charcoal/60">
                    {commune.percentage?.toFixed(1)}% {t('production.regionale.percent')}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-xl font-bold text-wine-charcoal group-hover:text-wine-burgundy transition-colors duration-300">
                  {(commune.tonnage / 1000).toFixed(1)}k
                </span>
                <span className="text-sm text-wine-charcoal/70 ml-2">{t('tonnes')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 pt-4 border-t border-wine-cream/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-wine-cream/10 rounded-lg">
              <div className="text-lg font-bold text-wine-charcoal">
                {communes.length}
              </div>
              <div className="text-sm text-wine-charcoal/70">
                {t('communes.tracked')}
              </div>
            </div>
            
            <div className="text-center p-4 bg-wine-cream/10 rounded-lg">
              <div className="text-lg font-bold text-wine-charcoal">
                {(totalProduction / 1000).toFixed(1)}k{t('tonnes')}
              </div>
              <div className="text-sm text-wine-charcoal/70">
                {t('communes.total.production')}
              </div>
            </div>
            
            <div className="text-center p-4 bg-wine-cream/10 rounded-lg">
              <div className="text-lg font-bold text-wine-charcoal">
                {communes.reduce((sum, c) => sum + (c.percentage || 0), 0).toFixed(1)}%
              </div>
              <div className="text-sm text-wine-charcoal/70">
                {t('communes.coverage')}
              </div>
            </div>
          </div>
        </div>

        {/* Regional Context Note */}
        <div className="mt-4 p-4 bg-wine-charcoal/5 rounded-lg">
          <p className="text-xs text-wine-charcoal/60 italic text-center">
            {t('communes.methodology.note', { 
              region: currentData.displayName,
              total: (currentData.annualPomace / 1000).toFixed(0)
            })}
          </p>
        </div>
      </div>
      
      {/* Regional Map */}
      <RegionalMap />
    </div>
  );
};

export default TopCommunes;
