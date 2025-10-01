import React from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { useLanguage } from '@/contexts/LanguageContext';

const SeasonalTimeline = () => {
  const { currentData, debugMode } = useRegion();
  const { t, language, debugMode: langDebugMode } = useLanguage(); // ← Added language here

  const seasonalData = [
    { 
      month: 'janvier', 
      activities: [
        { name: 'sarments', intensity: 80, type: 'biomass' },
        { name: 'maintenance', intensity: 60, type: 'operation' }
      ]
    },
    { 
      month: 'fevrier', 
      activities: [
        { name: 'sarments', intensity: 90, type: 'biomass' },
        { name: 'planning', intensity: 40, type: 'operation' }
      ]
    },
    { 
      month: 'mars', 
      activities: [
        { name: 'sarments', intensity: 70, type: 'biomass' },
        { name: 'lies', intensity: 50, type: 'biomass' }
      ]
    },
    { 
      month: 'avril', 
      activities: [
        { name: 'maintenance', intensity: 80, type: 'operation' },
        { name: 'formation', intensity: 30, type: 'operation' }
      ]
    },
    { 
      month: 'mai', 
      activities: [
        { name: 'preparation', intensity: 60, type: 'operation' },
        { name: 'contrats', intensity: 40, type: 'operation' }
      ]
    },
    { 
      month: 'juin', 
      activities: [
        { name: 'veille', intensity: 20, type: 'operation' },
        { name: 'optimisation', intensity: 30, type: 'operation' }
      ]
    },
    { 
      month: 'juillet', 
      activities: [
        { name: 'preparation', intensity: 40, type: 'operation' },
        { name: 'tests', intensity: 50, type: 'operation' }
      ]
    },
    { 
      month: 'aout', 
      activities: [
        { name: 'mobilisation', intensity: 70, type: 'operation' },
        { name: 'coordination', intensity: 60, type: 'operation' }
      ]
    },
    { 
      month: 'septembre', 
      activities: [
        { name: 'marc.raisin', intensity: 100, type: 'biomass' },
        { name: 'rafles', intensity: 80, type: 'biomass' },
        { name: 'lies', intensity: 40, type: 'biomass' }
      ]
    },
    { 
      month: 'octobre', 
      activities: [
        { name: 'marc.raisin', intensity: 90, type: 'biomass' },
        { name: 'lies', intensity: 70, type: 'biomass' },
        { name: 'stockage', intensity: 80, type: 'operation' }
      ]
    },
    { 
      month: 'novembre', 
      activities: [
        { name: 'marc.raisin', intensity: 60, type: 'biomass' },
        { name: 'lies', intensity: 80, type: 'biomass' },
        { name: 'bilan', intensity: 50, type: 'operation' }
      ]
    },
    { 
      month: 'decembre', 
      activities: [
        { name: 'lies', intensity: 60, type: 'biomass' },
        { name: 'maintenance', intensity: 70, type: 'operation' },
        { name: 'planification', intensity: 40, type: 'operation' }
      ]
    }
  ];

  const monthNames = {
    'janvier': 'Janvier',
    'fevrier': 'Février', 
    'mars': 'Mars',
    'avril': 'Avril',
    'mai': 'Mai',
    'juin': 'Juin',
    'juillet': 'Juillet',
    'aout': 'Août',
    'septembre': 'Septembre',
    'octobre': 'Octobre',
    'novembre': 'Novembre',
    'decembre': 'Décembre'
  };

  const monthNamesEn = {
    'janvier': 'January',
    'fevrier': 'February', 
    'mars': 'March',
    'avril': 'April',
    'mai': 'May',
    'juin': 'June',
    'juillet': 'July',
    'aout': 'August',
    'septembre': 'September',
    'octobre': 'October',
    'novembre': 'November',
    'decembre': 'December'
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-wine-burgundy';
    if (intensity >= 60) return 'bg-wine-gold';
    if (intensity >= 40) return 'bg-wine-green';
    return 'bg-wine-charcoal/30';
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity >= 80) return t('peak');
    if (intensity >= 60) return t('eleve');
    if (intensity >= 40) return t('moyen');
    return t('faible');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
      {(debugMode || langDebugMode) && (
        <div className="bg-purple-100 border border-purple-400 text-purple-700 px-3 py-2 rounded mb-4">
          <strong className="font-bold">🗓️ SeasonalTimeline Debug</strong>
          <div className="text-sm mt-1">
            <div>Region: {currentData.displayName}</div>
            <div>Data Points: {seasonalData.length} months</div>
            <div>Peak Season: Septembre-Octobre (Marc production)</div>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
          {t('disponibilite.saisonniere')}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {seasonalData.map((month) => (
            <div
              key={month.month}
              className="p-6 bg-gradient-subtle rounded-xl border border-wine-cream/30 hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-wine-charcoal mb-4 text-center">
                {language === 'fr' ? monthNames[month.month] : monthNamesEn[month.month]}
              </h3>
              
              <div className="space-y-3">
                {month.activities.map((activity, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-wine-charcoal">
                        {t(activity.name)}
                      </span>
                      <span className="text-sm font-bold text-wine-charcoal">
                        {activity.intensity}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-wine-cream/30 rounded-full h-2">
                      <div 
                        className={`${getIntensityColor(activity.intensity)} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${activity.intensity}%` }}
                      />
                    </div>
                    
                    <div className="text-xs text-wine-charcoal/60">
                      {getIntensityLabel(activity.intensity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-wine-cream/30">
        <h4 className="text-lg font-bold text-wine-charcoal mb-4 text-center">
          {t('legende.intensite')}
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-wine-burgundy"></div>
            <span className="text-sm text-wine-charcoal">{t('peak')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-wine-gold"></div>
            <span className="text-sm text-wine-charcoal">{t('eleve')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-wine-green"></div>
            <span className="text-sm text-wine-charcoal">{t('moyen')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-wine-charcoal/30"></div>
            <span className="text-sm text-wine-charcoal">{t('faible')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalTimeline;
