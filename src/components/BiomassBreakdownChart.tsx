import React from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { useLanguage } from '@/contexts/LanguageContext';

const BiomassBreakdownChart = () => {
  const { currentData, debugMode } = useRegion();
  const { t, debugMode: langDebugMode } = useLanguage();

  // Regional biomass breakdown data
  const getBiomassBreakdown = () => {
    if (currentData.id === 'languedoc') {
      return [
        { name: t('marc.raisin'), value: 173000, color: 'wine-burgundy', percentage: 65 },
        { name: t('sous.produits.liquides'), value: 45000, color: 'wine-gold', percentage: 17 },
        { name: t('bois.taille'), value: 28000, color: 'wine-green', percentage: 11 },
        { name: t('sarments'), value: 15000, color: 'wine-charcoal', percentage: 6 },
        { name: t('rafles'), value: 5000, color: 'wine-burgundy/70', percentage: 2 }
      ];
    } else {
      // Champagne proportional breakdown
      return [
        { name: t('marc.raisin'), value: 15600, color: 'wine-burgundy', percentage: 65 },
        { name: t('sous.produits.liquides'), value: 4080, color: 'wine-gold', percentage: 17 },
        { name: t('bois.taille'), value: 2640, color: 'wine-green', percentage: 11 },
        { name: t('sarments'), value: 1440, color: 'wine-charcoal', percentage: 6 },
        { name: t('rafles'), value: 240, color: 'wine-burgundy/70', percentage: 1 }
      ];
    }
  };

  const biomassData = getBiomassBreakdown();
  const totalBiomass = currentData.annualPomace;
  const communesCount = currentData.topCommunes?.length || 6;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
      {/* DEBUG BANNER */}
      {(debugMode || langDebugMode) && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded mb-4">
          <strong className="font-bold">📊 BiomassBreakdown Debug</strong>
          <div className="text-sm mt-1">
            <div>Region: {currentData.displayName} ({currentData.id})</div>
            <div>Total Biomass: {totalBiomass?.toLocaleString()}t</div>
            <div>Breakdown: {biomassData.map(b => `${b.name} ${b.value.toLocaleString()}t`).join(', ')}</div>
            <div>Sum Check: {biomassData.reduce((sum, b) => sum + b.value, 0).toLocaleString()}t</div>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
          {t('repartition.detaillee.biomasse')}
        </h2>
        <p className="text-lg text-wine-charcoal/70">
          {t('analyse.regionale.subtitle')}
        </p>
      </div>

      {/* Interactive Chart Area */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* Bar Chart Visualization */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-wine-charcoal mb-6 text-center">
            Types de Biomasse - Comparaison Visuelle
          </h3>
          
          {/* Horizontal Bar Chart */}
          <div className="space-y-4">
            {biomassData.map((item, index) => (
              <div
                key={item.name}
                className="group hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full bg-${item.color}`} />
                    <span className="font-medium text-wine-charcoal">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-wine-charcoal">
                      {(item.value / 1000).toFixed(1)}k {t('tonnes')}
                    </span>
                    <span className="text-sm text-wine-charcoal/60 ml-2">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
                
                {/* Bar */}
                <div className="w-full bg-wine-cream/30 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className={`bg-${item.color} h-8 rounded-full transition-all duration-1000 ease-out group-hover:bg-${item.color}/80 relative`}
                    style={{ 
                      width: `${Math.max(item.percentage, 3)}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Value Label inside bar */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-wine-burgundy mb-2">
              {(totalBiomass / 1000).toFixed(0)}k
            </div>
            <div className="text-sm text-wine-charcoal/70">{t('tonnage.total')}</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-wine-gold mb-2">
              {biomassData.length}
            </div>
            <div className="text-sm text-wine-charcoal/70">{t('types.biomasse')}</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-wine-green mb-2">
              100%
            </div>
            <div className="text-sm text-wine-charcoal/70">{t('part.total')}</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-wine-charcoal mb-2">
              {communesCount}
            </div>
            <div className="text-sm text-wine-charcoal/70">{t('communes.impliquees')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiomassBreakdownChart;
