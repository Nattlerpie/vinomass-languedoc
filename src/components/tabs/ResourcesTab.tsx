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

      {/* Regional Map */}
      <section className="mb-16">
        <StaticRegionalMap region={activeRegion} language={language} />
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
