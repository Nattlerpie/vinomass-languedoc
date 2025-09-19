import React from "react";
import BiomassBreakdownChart from "../BiomassBreakdownChart";
import StaticRegionalMap from "../StaticRegionalMap";
import SeasonalTimeline from "../SeasonalTimeline";
import InfrastructureOverview from "../InfrastructureOverview";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResourcesTab() {
  const { activeRegion, currentData, debugMode, validateData } = useRegion();
  const { language, t, debugMode: langDebugMode } = useLanguage();
  
  // Debug validation
  const debugErrors = debugMode || langDebugMode ? validateData() : [];
  
  console.log("ResourcesTab rendering with:", activeRegion, currentData);

  return (
    <div className="min-h-screen w-full">
      {/* Debug Banner */}
      {(debugMode || langDebugMode) && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">🔍 ResourcesTab Debug</strong>
          <div className="text-sm mt-2">
            <div>Region: {activeRegion || "undefined"}, Language: {language || "undefined"}</div>
            <div>Available Biomass: {currentData?.wasteAllocation?.available?.toLocaleString()}t</div>
            <div>Total Biomass: {currentData?.annualPomace?.toLocaleString()}t</div>
            <div>Infrastructure: {Object.keys(currentData?.infrastructure || {}).length} types</div>
            {debugErrors.length > 0 && (
              <div className="mt-2">
                <strong>Data Issues:</strong>
                <ul className="list-disc pl-5">
                  {debugErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('resources.title')}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </div>
      </section>

      {/* NEW: Allocation Réaliste des Flux Section (moved from Economy) */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('resources.allocationTitle')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('resources.allocationSubtitle')}
            </p>
          </div>

          {/* Total Biomass Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-wine-charcoal mb-2">
              {t('resources.total.biomass.regional')}: {currentData.annualPomace?.toLocaleString()} {t('tonnes')}
            </h3>
          </div>

          {/* Three Column Flow Allocation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Flux Protégés */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-red-200 hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">❌</div>
              <h4 className="text-xl font-bold text-wine-charcoal mb-3">{t('flux.proteges')}</h4>
              <div className="text-sm text-wine-charcoal/60 mb-4">{t('non.disponible')}</div>
              
              <div className="text-4xl font-bold text-red-600 mb-2">
                {currentData.wasteAllocation?.percentageProtected}%
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-4">
                {currentData.wasteAllocation?.protected?.toLocaleString()} {t('tonnes')}
              </div>
              
              <div className="text-left text-sm text-wine-charcoal/70 space-y-1">
                <div>• {t('compost.vignobles')}: {Math.round(currentData.wasteAllocation?.protected * 0.56).toLocaleString()}t</div>
                <div>• {t('biogaz.energetique')}: {Math.round(currentData.wasteAllocation?.protected * 0.33).toLocaleString()}t</div>
                <div>• {t('extraction.premium')}: {Math.round(currentData.wasteAllocation?.protected * 0.11).toLocaleString()}t</div>
              </div>
            </div>

            {/* Flux Négociables */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-yellow-200 hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">⚠️</div>
              <h4 className="text-xl font-bold text-wine-charcoal mb-3">{t('flux.negociables')}</h4>
              <div className="text-sm text-wine-charcoal/60 mb-4">{t('partenariats.requis')}</div>
              
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {currentData.wasteAllocation?.percentageNegotiable}%
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-4">
                {currentData.wasteAllocation?.negotiable?.toLocaleString()} {t('tonnes')}
              </div>
              
              <div className="text-left text-sm text-wine-charcoal/70 space-y-1">
                <div>• {t('surplus.excedents')}: {Math.round(currentData.wasteAllocation?.negotiable * 0.61).toLocaleString()}t</div>
                <div>• {t('excedent.compost')}: {Math.round(currentData.wasteAllocation?.negotiable * 0.39).toLocaleString()}t</div>
              </div>
            </div>

            {/* Flux Disponibles */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-green-200 hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="text-xl font-bold text-wine-charcoal mb-3">{t('flux.disponibles')}</h4>
              <div className="text-sm text-wine-charcoal/60 mb-4">{t('disponible')} pour SAF</div>
              
              <div className="text-4xl font-bold text-green-600 mb-2">
                {currentData.wasteAllocation?.percentageAvailable}%
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-4">
                {currentData.wasteAllocation?.available?.toLocaleString()} {t('tonnes')}
              </div>
              
              <div className="text-left text-sm text-wine-charcoal/70 space-y-1">
                <div>• {t('couts.elimination')}: {Math.round(currentData.wasteAllocation?.available * 0.625).toLocaleString()}t</div>
                <div>• {t('boues.traitement')}: {Math.round(currentData.wasteAllocation?.available * 0.375).toLocaleString()}t</div>
              </div>
            </div>
          </div>

          {/* SAF Potential Summary */}
          <div className="mt-8 text-center p-6 bg-wine-cream/10 border border-wine-gold/20 rounded-xl">
            <h4 className="text-lg font-bold text-wine-charcoal mb-2">
              {t('potentiel.saf')}:
            </h4>
            <div className="text-2xl font-bold text-wine-burgundy">
              {(currentData.wasteAllocation?.realisticSafPotential / 1000000).toFixed(1)}M {t('litres')} → €{currentData.wasteAllocation?.realisticRevenue}M
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Regional Map Section - WITH COMMUNES BREAKDOWN */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('repartition.production.commune')} - {currentData.displayName}
            </h2>
            <p className="text-lg text-wine-charcoal/70 mb-8">
              {currentData.annualPomace?.toLocaleString()} {t('tonnes')} - {t('production.dechets.vitivinicoles')}
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="mb-8 p-8 bg-wine-cream/10 border border-wine-gold/20 rounded-xl text-center">
            <div className="text-wine-charcoal/50 mb-4">
              📍 {t('repartition.production.commune')}
            </div>
            <p className="text-sm text-wine-charcoal/60 italic">
              {/* TODO: Static regional map will be added here when ready */}
              Carte régionale interactive à venir - Regional interactive map coming soon
            </p>
          </div>

          {/* Communes Chart */}
          <div>
            <h3 className="text-2xl font-bold text-wine-charcoal mb-6 text-center">
              {t('communes.principales')} - Comparaison Visuelle
            </h3>
            
            {/* Horizontal Bar Chart for Communes */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {currentData.topCommunes?.map((commune, index) => (
                <div
                  key={commune.name}
                  className="group hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-wine-burgundy' : 
                        index === 1 ? 'bg-wine-gold' : 
                        index === 2 ? 'bg-wine-green' :
                        index === 3 ? 'bg-wine-charcoal' :
                        index === 4 ? 'bg-wine-burgundy/70' :
                        'bg-wine-gold/70'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-wine-charcoal text-lg">
                        {commune.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-wine-charcoal text-lg">
                        {(commune.tonnage / 1000).toFixed(1)}k {t('tonnes')}
                      </span>
                      <span className="text-sm text-wine-charcoal/60 ml-2">
                        ({commune.percentage?.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                  
                  {/* Bar */}
                  <div className="w-full bg-wine-cream/30 rounded-full h-6 relative overflow-hidden">
                    <div 
                      className={`h-6 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80 ${
                        index === 0 ? 'bg-wine-burgundy' : 
                        index === 1 ? 'bg-wine-gold' : 
                        index === 2 ? 'bg-wine-green' :
                        index === 3 ? 'bg-wine-charcoal' :
                        index === 4 ? 'bg-wine-burgundy/70' :
                        'bg-wine-gold/70'
                      }`}
                      style={{ 
                        width: `${Math.max((commune.percentage || 0), 2)}%`,
                        animationDelay: `${index * 150}ms`
                      }}
                    >
                      {/* Percentage inside bar */}
                      {(commune.percentage || 0) > 3 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {commune.percentage?.toFixed(0)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary */}
            <div className="mt-6 text-center text-sm text-wine-charcoal/60">
              Total: {currentData.topCommunes?.reduce((sum, c) => sum + (c.percentage || 0), 0).toFixed(0)}% {t('production.regionale.percent')} 
              | {currentData.topCommunes?.length} {t('communes.principales').toLowerCase()}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Biomass Breakdown */}
      <section className="mb-16">
        <BiomassBreakdownChart />
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Infrastructure Overview */}
      <section className="mb-16">
        <InfrastructureOverview />
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Seasonal Timeline */}
      <section className="mb-8">
        <SeasonalTimeline defaultView="circular" />
      </section>
    </div>
  );
}
