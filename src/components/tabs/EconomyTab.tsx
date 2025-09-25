import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdvancedROICalculator from "../AdvancedROICalculator";
import CostBenefitAnalysis from "../CostBenefitAnalysis";
import EconomicProjections from "../EconomicProjections";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const EconomyTab = () => {
  const { currentData, debugMode, validateData } = useRegion();
  const { t, debugMode: langDebugMode } = useLanguage();
  
  // Debug validation
  const debugErrors = debugMode || langDebugMode ? validateData() : [];
  
  // Calculate scaled investment based on regional capacity
  const availableBiomass = currentData.wasteAllocation?.available || 80000;
  const scaledInvestment = Math.round((availableBiomass / 80000) * 150); // €150M for 80kt capacity
  const scaledEquity = Math.round(scaledInvestment * 0.35); // 35% equity
  const scaledDebt = Math.round(scaledInvestment * 0.5); // 50% debt
  const scaledSubsidies = Math.round(scaledInvestment * 0.15); // 15% subsidies

  // Calculate employment figures based on ADEME research data
  const directJobs = currentData.wasteAllocation?.realisticJobs || 180;
  const indirectJobs = Math.round(directJobs * 1.8); // 1.8x multiplier
  const inducedJobs = Math.round(directJobs * 2.3); // 2.3x multiplier
  const totalJobs = directJobs + indirectJobs + inducedJobs;

  return (
    <div className="min-h-screen w-full">
      {/* DEBUG BANNER */}
      {(debugMode || langDebugMode) && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">💰 EconomyTab Debug</strong>
          <div className="text-sm mt-2">
            <div>Region: {currentData.displayName} ({currentData.id})</div>
            <div>Available Biomass: {availableBiomass.toLocaleString()} t</div>
            <div>Scaled Investment: €{scaledInvestment}M</div>
            <div>SAF Revenue: €{currentData.wasteAllocation?.realisticRevenue}M/year</div>
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

      {/* Navigation Header */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('economy.title', { region: currentData.displayName })}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            {t('economy.subtitle')}
          </p>
        </div>
      </section>

      {/* Regional Economic Context */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('economy.regional.context')} - {currentData.displayName}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('economy.investment.opportunity')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300 group relative">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {(availableBiomass / 1000).toFixed(0)} k {t('tonnes')}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.available.feedstock')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('economy.biomass.secured')}</div>
              
              {/* Hover tooltip explaining feedstock calculation */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                {t('economy.feedstock.tooltip', { 
                  total: (currentData.annualPomace / 1000).toFixed(0),
                  percentage: '30'
                })}
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {(currentData.wasteAllocation?.realisticSafPotential / 1000000).toFixed(1)} M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.saf.production')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('litres.an')}</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                €{currentData.wasteAllocation?.realisticRevenue}M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.annual.revenue')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('economy.market.price')}</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-charcoal/10 hover:scale-105 transition-all duration-300 group relative">
              <div className="text-4xl font-bold text-wine-charcoal mb-3">
                {totalJobs.toLocaleString()}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.jobs.created')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('economy.regional.impact')}</div>
              
              {/* Enhanced Employment Tooltip with Breakdown */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-4 rounded-lg shadow-lg text-xs z-10 whitespace-nowrap">
                <div className="font-bold mb-2">{t('economy.employment.breakdown')}</div>
                <div>• {t('economy.direct.jobs')}: {directJobs}</div>
                <div>• {t('economy.indirect.jobs')}: {indirectJobs}</div>
                <div>• {t('economy.induced.jobs')}: {inducedJobs}</div>
                <div className="border-t border-white/20 mt-2 pt-2">
                  <div className="font-bold">{t('economy.total.impact')}: {totalJobs.toLocaleString()} {t('jobs')}</div>
                </div>
                <div className="text-xs opacity-75 mt-1">{t('economy.ademe.research')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Main Economic Analysis - Tabbed Interface */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('economy.analysis.modules')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('economy.financial.modeling')}
          </p>
        </div>

        <Tabs defaultValue="roi" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow-elegant border border-wine-cream/30">
            <TabsTrigger 
              value="roi" 
              className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium"
            >
              {t('economy.roi.calculator')}
            </TabsTrigger>
            <TabsTrigger 
              value="cost-benefit" 
              className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium"
            >
              {t('economy.cost.benefit')}
            </TabsTrigger>
            <TabsTrigger 
              value="projections" 
              className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium"
            >
              {t('economy.projections')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roi" className="mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-wine-charcoal mb-4">
                {t('economy.roi.title')}
              </h3>
              <p className="text-lg text-wine-charcoal/70">
                {t('economy.roi.description', { tonnage: (availableBiomass / 1000).toFixed(0) })}
              </p>
            </div>
            <AdvancedROICalculator />
          </TabsContent>

          <TabsContent value="cost-benefit" className="mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-wine-charcoal mb-4">
                {t('economy.cost.benefit.title')}
              </h3>
              <p className="text-lg text-wine-charcoal/70">
                {t('economy.cost.benefit.description')}
              </p>
            </div>
            <CostBenefitAnalysis />
          </TabsContent>

          <TabsContent value="projections" className="mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-wine-charcoal mb-4">
                {t('economy.projections.title')}
              </h3>
              <p className="text-lg text-wine-charcoal/70">
                {t('economy.projections.description')}
              </p>
            </div>
            <EconomicProjections />
            
            {/* Dynamic Financing Overview */}
            <div className="mt-16 bg-wine-cream/10 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">
                {t('economy.financing.overview')} - {currentData.displayName}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-burgundy/10">
                  <div className="text-3xl font-bold text-wine-burgundy mb-3">€{scaledEquity} M</div>
                  <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.equity.funding')}</div>
                  <div className="text-sm text-wine-charcoal/60">{t('economy.equity.percentage')}</div>
                </div>
                <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-gold/10">
                  <div className="text-3xl font-bold text-wine-gold mb-3">€{scaledDebt} M</div>
                  <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.bank.debt')}</div>
                  <div className="text-sm text-wine-charcoal/60">{t('economy.interest.rate')}</div>
                </div>
                <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-green/10">
                  <div className="text-3xl font-bold text-wine-green mb-3">€{scaledSubsidies} M</div>
                  <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.subsidies')}</div>
                  <div className="text-sm text-wine-charcoal/60">{t('economy.eu.france.funding')}</div>
                </div>
                <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-charcoal/10">
                  <div className="text-3xl font-bold text-wine-charcoal mb-3">€{scaledInvestment} M</div>
                  <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.total.investment')}</div>
                  <div className="text-sm text-wine-charcoal/60">{t('economy.capacity.description', { capacity: (availableBiomass / 1000).toFixed(0) })}</div>
                </div>
              </div>
              
              {/* Investment Scaling Note */}
              <div className="mt-8 text-center p-4 bg-wine-charcoal/5 rounded-lg">
                <p className="text-sm text-wine-charcoal/70 italic">
                  {t('economy.scaling.note', { 
                    region: currentData.displayName,
                    capacity: (availableBiomass / 1000).toFixed(0)
                  })}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Market Context & Competitive Advantage */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('economy.market.advantage')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('economy.competitive.positioning')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
              <h4 className="text-xl font-bold text-wine-charcoal mb-4">
                {t('economy.feedstock.security')}
              </h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• {t('economy.local.supply.chain')}</div>
                <div>• {t('economy.waste.stream.cost')}</div>
                <div>• {t('economy.year.round.availability')}</div>
                <div>• {t('economy.established.logistics')}</div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
              <h4 className="text-xl font-bold text-wine-charcoal mb-4">
                {t('economy.regulatory.advantage')}
              </h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• {t('economy.eu.saf.mandates')}</div>
                <div>• {t('economy.carbon.credit.revenue')}</div>
                <div>• {t('economy.france.2030.support')}</div>
                <div>• {t('economy.waste.directive.compliance')}</div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-green/10">
              <h4 className="text-xl font-bold text-wine-charcoal mb-4">
                {t('economy.geographic.benefits')}
              </h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• {t('economy.proximity.airports')}</div>
                <div>• {t('economy.distribution.network')}</div>
                <div>• {t('economy.skilled.workforce')}</div>
                <div>• {t('economy.industrial.infrastructure')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EconomyTab;
