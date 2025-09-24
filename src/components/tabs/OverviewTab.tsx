import React from "react";
import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, Factory, Shield, TrendingUp, Plane, FileText, Zap, CheckCircle } from 'lucide-react';

const OverviewTab = () => {
  const { currentData, debugMode, validateData } = useRegion();
  const { t, debugMode: langDebugMode } = useLanguage();
  
  // Debug validation
  const debugErrors = debugMode || langDebugMode ? validateData() : [];
  
  // Use data directly from the consolidated RegionContext (with proper SI formatting)
  const availableBiomass = currentData.wasteAllocation.available;
  const negotiableBiomass = currentData.wasteAllocation.negotiable;  
  const protectedBiomass = currentData.wasteAllocation.protected;
  const totalBiomass = currentData.annualPomace;
  
  // Use pre-calculated values from RegionContext for consistency
  const realisticSafProduction = currentData.wasteAllocation.realisticSafPotential / 1000000; // convert to millions
  const realisticRevenue = currentData.wasteAllocation.realisticRevenue;
  const realisticCO2Reduction = currentData.wasteAllocation.realisticCo2Reduction;

  return (
    <div className="min-h-screen w-full">
      {/* Debug Banner */}
      {(debugMode || langDebugMode) && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">🔍 OverviewTab Debug</strong>
          <div className="text-sm mt-2">
            <div>Total Biomass: {totalBiomass?.toLocaleString()} t</div>
            <div>Available: {availableBiomass?.toLocaleString()} t, Negotiable: {negotiableBiomass?.toLocaleString()} t</div>
            <div>SAF Potential: {realisticSafProduction?.toFixed(1)}M L, Revenue: €{realisticRevenue?.toLocaleString()}M</div>
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
            {t('overview.title')}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-4xl mx-auto">
            {t('overview.subtitle')}
          </p>
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-wine-charcoal mb-3">
              {(totalBiomass / 1000).toLocaleString()} kt
            </div>
            <div className="text-lg font-semibold text-wine-charcoal mb-2">
              {t('production.viticulture.waste')}
            </div>
            <div className="text-sm text-wine-charcoal/60">
              {t('production.total.biomass')}
            </div>
          </div>
          
          <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-wine-charcoal mb-3">
              {realisticSafProduction.toFixed(1)}M
            </div>
            <div className="text-lg font-semibold text-wine-charcoal mb-2">
              {t('economy.saf.potential')}
            </div>
            <div className="text-sm text-wine-charcoal/60">
              {t('potentiel.saf')}
            </div>
          </div>
          
          <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold text-wine-charcoal mb-3">
              €{realisticRevenue.toLocaleString()}M
            </div>
            <div className="text-lg font-semibold text-wine-charcoal mb-2">
              {t('economy.annual.revenue')}
            </div>
            <div className="text-sm text-wine-charcoal/60">
              {t('economy.market.price')}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* NEW: Biomass Strategy Section (REPLACES Departmental Distribution & Regional Context) */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('strategy.biomass.title')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Approche stratégique de valorisation optimisée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Conservative Base - 30% Available */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-green-800">{t('strategy.conservative.base')}</h3>
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-green-800 mb-2">
                30% {t('disponible')} ({(availableBiomass / 1000).toFixed(0)} kt)
              </div>
              <p className="text-sm text-green-700">
                {t('strategy.disposal.flows')}
              </p>
            </div>

            {/* Negotiable Potential - +25% */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-amber-800">{t('strategy.negotiable.potential')}</h3>
                <TrendingUp className="text-amber-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-amber-800 mb-2">
                +25% ({(negotiableBiomass / 1000).toFixed(0)} kt)
              </div>
              <p className="text-sm text-amber-700">
                {t('strategy.surplus.excess')}
              </p>
            </div>

            {/* Total Accessible - Up to 55% */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-blue-800">{t('strategy.total.accessible')}</h3>
                <Factory className="text-blue-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-blue-800 mb-2">
                {t('jusqua')} 55% ({((availableBiomass + negotiableBiomass) / 1000).toFixed(0)} kt)
              </div>
              <p className="text-sm text-blue-700">
                {t('strategy.with.partnerships')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Context - 4 Buttons (ADD 4th button: Established Chains) */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Existing 3 buttons... */}
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
              <Leaf className="w-12 h-12 text-wine-burgundy mx-auto mb-4" />
              <div className="text-2xl font-bold text-wine-charcoal mb-2">SAF</div>
              <div className="text-sm text-wine-charcoal/60">Carburant aviation durable</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
              <Shield className="w-12 h-12 text-wine-burgundy mx-auto mb-4" />
              <div className="text-2xl font-bold text-wine-charcoal mb-2">Conformité</div>
              <div className="text-sm text-wine-charcoal/60">Réglementation européenne</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-12 h-12 text-wine-burgundy mx-auto mb-4" />
              <div className="text-2xl font-bold text-wine-charcoal mb-2">Impact</div>
              <div className="text-sm text-wine-charcoal/60">Économique régional</div>
            </div>

            {/* NEW: 4th Regional Context Button */}
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300">
              <Zap className="w-12 h-12 text-wine-burgundy mx-auto mb-4" />
              <div className="text-2xl font-bold text-wine-charcoal mb-2">73</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-1">
                {t('regional.context.established')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {t('regional.context.mature.infra')}
              </div>
              <div className="text-xs text-wine-charcoal/50 mt-2">
                {t('regional.context.facilities')} • {t('regional.context.existing.capacity')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPDATED: SAF News Section with IATA Content */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('saf.news.title')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('saf.news.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IATA Report Highlights */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <Plane className="text-blue-600 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-blue-800 mb-2">
                    {t('saf.news.iata.headline')}
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    {t('saf.news.iata.summary')}
                  </p>
                  <div className="space-y-2 text-xs text-blue-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      <span>Écart de 100 Mt entre demande (500 Mt) et production prévue (400 Mt)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      <span>Déploiement technologique principal défi, pas la disponibilité</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agricultural Residues Opportunity */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-start gap-4">
                <Leaf className="text-green-600 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-green-800 mb-2">
                    {t('saf.news.agricultural.residues')}
                  </h3>
                  <p className="text-sm text-green-700 mb-3">
                    Les déchets vitivinicoles français s'inscrivent dans cette priorité IATA
                  </p>
                  <div className="space-y-2 text-xs text-green-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      <span>{t('saf.news.europe.key')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      <span>Voie Alcool-vers-Jet (EtJ) technologie clé pour résidus agricoles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVISED: Enhanced Regulatory Context Section */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('regulatory.context.title')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('regulatory.context.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ReFuelEU Aviation */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-purple-600" size={24} />
                <h3 className="font-bold text-purple-800">{t('regulatory.refueleu')}</h3>
              </div>
              <div className="text-2xl font-bold text-purple-800 mb-2">2030</div>
              <p className="text-sm text-purple-700 mb-3">
                {t('regulatory.mandate.2030')}
              </p>
              <div className="text-xs text-purple-600">
                Opportunité de marché garanti pour valorisation déchets vitivinicoles
              </div>
            </div>

            {/* CORSIA */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <Plane className="text-teal-600" size={24} />
                <h3 className="font-bold text-teal-800">{t('regulatory.corsia')}</h3>
              </div>
              <div className="text-2xl font-bold text-teal-800 mb-2">2027</div>
              <p className="text-sm text-teal-700 mb-3">
                {t('regulatory.carbon.neutral')}
              </p>
              <div className="text-xs text-teal-600">
                Demande mondiale croissante pour SAF issus de biomasse durable
              </div>
            </div>

            {/* French Strategy */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <Factory className="text-red-600" size={24} />
                <h3 className="font-bold text-red-800">{t('regulatory.french.strategy')}</h3>
              </div>
              <div className="text-2xl font-bold text-red-800 mb-2">€500M</div>
              <p className="text-sm text-red-700 mb-3">
                {t('regulatory.support.production')}
              </p>
              <div className="text-xs text-red-600">
                Financement public disponible pour projets de valorisation biomasse
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Components */}
      <TopCommunes />
      <ValoorizationChart />
    </div>
  );
};

export default OverviewTab;
