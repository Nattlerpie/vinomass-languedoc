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
              <h4 className="text-xl font-bold text-wine-charcoal mb-3">Flux Protégés</h4>
              <div className="text-sm text-wine-charcoal/60 mb-4">Non disponible</div>
              
              <div className="text-4xl font-bold text-red-600 mb-2">
                {currentData.wasteAllocation?.percentageProtected}%
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-4">
                {currentData.wasteAllocation?.protected?.toLocaleString()} {t('tonnes')}
              </div>
              
              <div className="text-left text-sm text-wine-charcoal/70 space-y-1">
                <div>• Compost pour vignobles: {Math.round(currentData.wasteAllocation?.protected * 0.56).toLocaleString()}t</div>
                <div>• Biogaz énergétique: {Math.round(currentData.wasteAllocation?.protected * 0.33).toLocaleString()}t</div>
                <div>• Extraction premium: {Math.round(currentData.wasteAllocation?.protected * 0.11).toLocaleString()}t</div>
              </div>
            </div>

            {/* Flux Négociables */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-yellow-200 hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">⚠️</div>
              <h4 className="text-xl font-bold text-wine-charcoal mb-3">Flux Négociables</h4>
              <div className="text-sm text-wine-charcoal/60 mb-4">{t('partenariat')}s requis</div>
              
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {currentData.wasteAllocation?.percentageNegotiable}%
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-4">
                {currentData.wasteAllocation?.negotiable?.toLocaleString()} {t('tonnes')}
              </div>
              
              <div className="text-left text-sm text-wine-charcoal/70 space-y-1">
                <div>• {t('surplus.excedents')}: {Math.round(currentData.wasteAllocation?.negotiable * 0.61).toLocaleString()}t</div>
                <div>• Excédent compost: {Math.round(currentData.wasteAllocation?.negotiable * 0.39).toLocaleString()}t</div>
              </div>
            </div>

            {/* Flux Disponibles */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-green-200 hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="text-xl font-bold text-wine-charcoal mb-3">Flux Disponibles</h4>
              <div className="text-sm text-wine-charcoal/60 mb-4">{t('disponible')} pour SAF</div>
              
              <div className="text-4xl font-bold text-green-600 mb-2">
                {currentData.wasteAllocation?.percentageAvailable}%
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-4">
                {currentData.wasteAllocation?.available?.toLocaleString()} {t('tonnes')}
              </div>
              
              <div className="text-left text-sm text-wine-charcoal/70 space-y-1">
                <div>• Coûts d'élimination actuels: {Math.round(currentData.wasteAllocation?.available * 0.625).toLocaleString()}t</div>
                <div>• Boues de traitement: {Math.round(currentData.wasteAllocation?.available * 0.375).toLocaleString()}t</div>
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

          {/* Communes Breakdown */}
          <div>
            <h3 className="text-2xl font-bold text-wine-charcoal mb-6 text-center">
              {t('communes.principales')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.topCommunes?.map((commune, index) => (
                <div
                  key={commune.name}
                  className="p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40 hover:border-wine-burgundy/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110 ${
                      index === 0 ? 'bg-wine-burgundy shadow-wine' : 
                      index === 1 ? 'bg-wine-gold shadow-elegant' : 
                      index === 2 ? 'bg-wine-green shadow-elegant' :
                      index === 3 ? 'bg-wine-charcoal shadow-elegant' :
                      index === 4 ? 'bg-wine-burgundy/70 shadow-elegant' :
                      'bg-wine-gold/70 shadow-elegant'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-wine-charcoal text-lg mb-2">
                    {commune.name}
                  </h4>
                  
                  <div className="text-right mb-3">
                    <span className="text-2xl font-bold text-wine-charcoal group-hover:text-wine-burgundy transition-colors duration-300">
                      {(commune.tonnage / 1000).toFixed(1)}k
                    </span>
                    <span className="text-sm text-wine-charcoal/70 ml-2">{t('tonnes')}</span>
                  </div>
                  
                  <div className="text-sm text-wine-charcoal/60">
                    {commune.percentage?.toFixed(0)}% {t('production.regionale.percent')}
                  </div>
                </div>
              ))}
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
