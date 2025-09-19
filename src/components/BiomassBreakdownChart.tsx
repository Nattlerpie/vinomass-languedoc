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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Biomass Types List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-wine-charcoal mb-6">
            Types et Volumes
          </h3>
          
          {biomassData.map((item, index) => (
            <div
              key={item.name}
              className={`p-6 rounded-xl border-2 border-${item.color}/20 bg-gradient-to-r from-${item.color}/5 to-${item.color}/10 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-${item.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`} />
                  <div>
                    <h4 className="font-bold text-wine-charcoal text-lg">
                      {item.name}
                    </h4>
                    <div className="text-sm text-wine-charcoal/60">
                      {item.percentage}% du total
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-wine-charcoal group-hover:text-wine-burgundy transition-colors duration-300">
                    {(item.value / 1000).toFixed(0)}k
                  </div>
                  <div className="text-sm text-wine-charcoal/70">
                    {t('tonnes')}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 w-full bg-wine-cream/30 rounded-full h-2">
                <div 
                  className={`bg-${item.color} h-2 rounded-full transition-all duration-500 group-hover:bg-${item.color}/80`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary Statistics */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-wine-charcoal mb-6">
            Vue d'ensemble
          </h3>
          
          {/* Total Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
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

          {/* Regional Context */}
          <div className="p-6 bg-wine-cream/10 border border-wine-gold/20 rounded-xl">
            <h4 className="font-bold text-wine-charcoal mb-3">
              Contexte Régional
            </h4>
            <div className="text-sm text-wine-charcoal/70 space-y-2">
              <div>• <span className="font-medium">Région:</span> {currentData.displayName}</div>
              <div>• <span className="font-medium">Surface viticole:</span> {(currentData.vineyardSurface / 1000).toFixed(0)}k {t('hectares')}</div>
              <div>• <span className="font-medium">Production:</span> {currentData.nationalProductionShare}% nationale</div>
              <div>• <span className="font-medium">Disponible SAF:</span> {(currentData.wasteAllocation.available / 1000).toFixed(0)}kt (30%)</div>
            </div>
          </div>

          {/* Export/Methodology Note */}
          <div className="text-center p-4 bg-wine-charcoal/5 rounded-lg">
            <p className="text-xs text-wine-charcoal/60 italic">
              * {t('resources.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiomassBreakdownChart;
