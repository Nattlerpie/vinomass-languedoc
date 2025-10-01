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
  
  const debugErrors = debugMode || langDebugMode ? validateData() : [];
  const totalInstallations = currentData.id === 'languedoc' ? 73 : currentData.id === 'champagne' ? 10 : 45;
  
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

      {/* Hero Section with Value Proposition */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-6">
            {t('resources.title')}
          </h1>
          
          {/* Value Proposition Banner */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-gradient-to-r from-wine-green/10 to-wine-burgundy/10 border border-wine-green/30 rounded-xl p-8">
              <div className="text-center mb-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-wine-charcoal mb-3">
                  {t('resources.value.prop.title') || 'Chaîne d\'Approvisionnement Locale Sécurisée'}
                </h2>
                <div className="text-xl text-wine-charcoal/80 space-y-2">
                  <div>
                    <span className="font-semibold">{(currentData.vineyardSurface / 1000).toFixed(0)}k ha</span> {t('superficie.viticole')} → 
                    <span className="font-semibold text-wine-gold ml-2">{(currentData.annualPomace / 1000).toFixed(0)}k t</span> {t('biomasse')} → 
                    <span className="font-semibold text-wine-green ml-2">{(currentData.wasteAllocation.available / 1000).toFixed(0)}k t</span> {t('disponible.saf')}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center bg-white/50 rounded-full px-6 py-3">
                  <span className="text-lg font-semibold text-wine-charcoal">
                    {t('resources.value.prop.tagline') || 'Approvisionnement fiable, évolutif et respectueux des filières existantes'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-wine-charcoal/70 max-w-3xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </div>
      </section>

      {/* 1. Regional Scale & Distribution */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('resources.scale.title') || 'Échelle Régionale et Abondance'}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('resources.scale.subtitle') || 'Une production viticole concentrée garantit la viabilité logistique'}
            </p>
          </div>

          {/* Total Production Overview */}
          <div className="text-center mb-8 p-6 bg-wine-cream/10 border border-wine-gold/20 rounded-xl">
            <div className="text-4xl font-bold text-wine-burgundy mb-2">
              {currentData.annualPomace?.toLocaleString()} {t('tonnes')}
            </div>
            <div className="text-lg text-wine-charcoal/70">
              {t('production.dechets.vitivinicoles')} - {currentData.displayName}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mb-8 p-8 bg-wine-cream/10 border border-wine-gold/20 rounded-xl text-center">
            <div className="text-wine-charcoal/50 mb-4">
              📍 {t('repartition.production.commune')}
            </div>
            <p className="text-sm text-wine-charcoal/60 italic">
              Carte régionale interactive à venir - Regional interactive map coming soon
            </p>
          </div>

          {/* Top Communes - Horizontal Bars */}
          <div>
            <h3 className="text-2xl font-bold text-wine-charcoal mb-6 text-center">
              {t('communes.principales')} - {t('resources.concentration') || 'Concentration de la Production'}
            </h3>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              {currentData.topCommunes?.map((commune, index) => (
                <div key={commune.name} className="group hover:scale-[1.01] transition-all duration-300">
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
            
            <div className="mt-6 text-center text-sm text-wine-charcoal/60">
              {t('resources.scale.insight') || `Les ${currentData.topCommunes?.length} principales communes représentent ${currentData.topCommunes?.reduce((sum, c) => sum + (c.percentage || 0), 0).toFixed(0)}% de la production régionale`}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 2. Smart Allocation Strategy */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('resources.allocation.strategy.title') || 'Allocation Intelligente et Respectueuse'}
            </h2>
            <p className="text-lg text-wine-charcoal/70 mb-4">
              {t('resources.allocation.strategy.subtitle') || 'Un système à trois niveaux qui préserve les valorisations existantes'}
            </p>
            <div className="inline-block bg-wine-green/10 border border-wine-green/30 rounded-lg px-6 py-3">
              <p className="text-base font-semibold text-wine-charcoal">
                {t('resources.allocation.key.message') || `Allocation conservative de 30% disponible garantit aucune perturbation tout en libérant une opportunité de ${(currentData.wasteAllocation.realisticSafPotential / 1000000).toFixed(1)}M L SAF et €${currentData.wasteAllocation.realisticRevenue}M`}
              </p>
            </div>
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
              <div className="text-sm text-wine-charcoal/60 mb-4">{t('disponible')} {t('overview.saf.acronym')}</div>
              
              <div className="text-4xl font-bold text-green-600 mb-2">
                {currentData.wasteAllocation?.percentageAvailable}%
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-4">
                {currentData.wasteAllocation?.available?.toLocaleString()} {t('tonnes')}
              </div>
              
              <div className="text-left text-sm text-wine-charcoal/70 space-y-1">
                <div>• {t('couts.elimination')}: {Math.round(currentData.wasteAllocation?.available * 0.625).toLocaleString()}t ({t('resources.incurs.costs') || 'génère des coûts'})</div>
                <div>• {t('boues.traitement')}: {Math.round(currentData.wasteAllocation?.available * 0.375).toLocaleString()}t ({t('resources.incurs.costs') || 'génère des coûts'})</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 3. Infrastructure Capability */}
      <section className="mb-8">
        <InfrastructureOverview />
        
        {/* Summary callout below infrastructure */}
        <div className="text-center mt-6">
          <div className="inline-block bg-wine-burgundy/10 border border-wine-burgundy/30 rounded-lg px-6 py-3">
            <p className="text-xl font-bold text-wine-burgundy">
              {totalInstallations} {t('total.facilities')} | {t('resources.infrastructure.mature') || 'Infrastructure mature'}
            </p>
            <p className="text-sm text-wine-charcoal/70 mt-2">
              {t('resources.infrastructure.ready.subtitle') || 'Capacités de collecte et traitement déjà déployées réduisent les risques du projet'}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 4. Biomass Composition */}
      <section className="mb-8">
        <BiomassBreakdownChart />
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 5. Seasonality & Year-Round Operation */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('resources.seasonality.title') || 'Exploitation Toute l\'Année Possible'}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('resources.seasonality.subtitle') || 'Gestion des pics saisonniers pour une production continue'}
          </p>
        </div>
        <SeasonalTimeline defaultView="circular" />
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 6. Summary & Transition to Economy */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-wine-burgundy to-wine-gold text-white rounded-2xl p-8 lg:p-12 shadow-elegant">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('resources.summary.title') || 'Approvisionnement Sécurisé, Évolutif et Respectueux'}
            </h2>
            <p className="text-xl mb-6 opacity-90 max-w-3xl mx-auto">
              {t('resources.summary.text') || `${(currentData.wasteAllocation.available / 1000).toFixed(0)}k tonnes de biomasse disponible sans perturber les valorisations existantes, collectée via ${totalInstallations} installations établies, permettant une production ${(currentData.wasteAllocation.realisticSafPotential / 1000000).toFixed(1)}M litres de ${t('overview.saf.acronym')}.`}
            </p>
            <div className="bg-white/10 rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold">
                {t('resources.summary.transition') || 'Cet approvisionnement sécurisé permet une analyse économique détaillée →'}
              </p>
              <p className="text-sm opacity-80 mt-2">
                {t('resources.summary.next') || 'Voir l\'onglet Analyse Économique pour les projections financières'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
