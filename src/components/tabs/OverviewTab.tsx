import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRegion } from '../contexts/RegionContext';

export const OverviewTab: React.FC = () => {
  const { t, language } = useLanguage();
  const { currentData, activeRegion } = useRegion();

  return (
    <div className="overview-tab">
      {/* Debug banner */}
      <div className="debug-banner">
        Debug: OverviewTab mounted. Region = {activeRegion}, Language = {language}
      </div>

      {/* Header */}
      <h1>{t('overview.title', { region: currentData.name })}</h1>
      <h2>{t('overview.subtitle')}</h2>

      {/* Key Points */}
      <section>
        <h3>{t('overview.keyPoints')}</h3>
        <p>{t('overview.keyPointsSubtitle')}</p>
      </section>

      {/* Core Metrics */}
      <section className="metrics">
        <div>
          <strong>{currentData.vineyardSurface.toLocaleString()}</strong> {t('overview.vineyardSurface')}
        </div>
        <div>
          <strong>{currentData.annualPomace.toLocaleString()}</strong> {t('overview.totalPomace')}
        </div>
        <div>
          <strong>{currentData.wasteAllocation?.available.toLocaleString()}</strong> {t('overview.availableBiomass')}
        </div>
        <div>
          <strong>{(currentData.safPotential / 1_000_000).toFixed(1)}M</strong> {t('overview.safPotential')}
        </div>
        <div>
          <strong>€{currentData.revenue.toFixed(1)}M</strong> {t('overview.revenue')}
        </div>
        <div>
          <strong>{currentData.co2Reduction.toLocaleString()} kt</strong> {t('overview.co2Reduction')}
        </div>
      </section>

      {/* Biomass Supply Strategy */}
      <section>
        <h3>{t('overview.biomassStrategy')}</h3>
        <ul>
          <li>{t('overview.biomassStrategyBase', { available: currentData.wasteAllocation?.available })}</li>
          <li>{t('overview.biomassStrategyNegotiable', { negotiable: currentData.wasteAllocation?.negotiable })}</li>
          <li>{t('overview.biomassStrategyTotal', { total: currentData.wasteAllocation?.total })}</li>
        </ul>
        <p>{t('overview.biomassStrategyNote')}</p>
      </section>

      {/* Regional Context */}
      <section>
        <h3>{t('overview.regionalContext')}</h3>
        <div>
          <strong>{currentData.ranking}</strong> {t('overview.marketPosition')}
        </div>
        <div>
          {t('overview.nationalProductionShare', { share: currentData.nationalProductionShare })}
        </div>
        <div>
          {t('overview.wineIndustryRevenue', { revenue: currentData.wineIndustryRevenue })}
        </div>
      </section>

      {/* Departmental Breakdown */}
      <section>
        <h3>{t('overview.departmentBreakdown')}</h3>
        <ul>
          {currentData.departments?.map((dept) => (
            <li key={dept.name}>
              {dept.name}: {dept.percentage}% ({t('overview.ofRegionalProduction')})
            </li>
          ))}
        </ul>
      </section>

      {/* Top Communes */}
      <section>
        <h3>{t('overview.topCommunes')}</h3>
        <ul>
          {currentData.topCommunes?.map((commune) => (
            <li key={commune.name}>
              {commune.name}: {commune.tonnage.toLocaleString()} t
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
