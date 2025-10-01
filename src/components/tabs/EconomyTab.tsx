import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdvancedROICalculator from "../AdvancedROICalculator";
import CostBenefitAnalysis from "../CostBenefitAnalysis";
import EconomicProjections from "../EconomicProjections";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * EconomyTab Component - Restructured as Investment Narrative
 * 
 * Flow: Conclusion → Strategic Context → Evidence → Details
 * Lead with "This works" rather than "Here are numbers"
 */

const EconomyTab = () => {
  const { currentData, debugMode, validateData } = useRegion();
  const { t, debugMode: langDebugMode } = useLanguage();
  
  const debugErrors = debugMode || langDebugMode ? validateData() : [];
  
  // CALCULATIONS
  const availableBiomass = currentData.wasteAllocation?.available || 80000;
  const scaledInvestment = Math.round((availableBiomass / 80000) * 150);
  const scaledEquity = Math.round(scaledInvestment * 0.35);
  const scaledDebt = Math.round(scaledInvestment * 0.5);
  const scaledSubsidies = Math.round(scaledInvestment * 0.15);
  
  const directJobs = currentData.wasteAllocation?.realisticJobs || 180;
  const indirectJobs = Math.round(directJobs * 1.8);
  const inducedJobs = Math.round(directJobs * 2.3);
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
            <div>SAF Production: {(currentData.wasteAllocation?.realisticSafPotential / 1000000).toFixed(1)}M L/year</div>
            <div className="mt-2 font-semibold">
              Effective SAF Price: €{(currentData.wasteAllocation?.realisticRevenue / (currentData.wasteAllocation?.realisticSafPotential / 1000000)).toFixed(2)}/L
            </div>
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

      {/* HERO WITH INVESTMENT THESIS */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-6">
            {t('economy.title', { region: currentData.displayName })}
          </h1>
          
          {/* VALUE PROPOSITION BANNER - Lead with Conclusion */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-gradient-to-r from-wine-green/10 to-wine-burgundy/10 border border-wine-green/30 rounded-xl p-8">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-wine-charcoal mb-4">
                  {t('economy.value.prop.title') || 'Projet Économiquement Viable et Stratégiquement Positionné'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-3xl font-bold text-wine-green">€{currentData.wasteAllocation?.realisticRevenue}M</div>
                    <div className="text-sm text-wine-charcoal/70">{t('economy.annual.profit') || 'Profit annuel'}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-wine-burgundy">12-15%</div>
                    <div className="text-sm text-wine-charcoal/70">{t('economy.irr.range') || 'TRI estimé'}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-wine-gold">{totalJobs}</div>
                    <div className="text-sm text-wine-charcoal/70">{t('economy.regional.jobs') || 'Emplois régionaux'}</div>
                  </div>
                </div>
                <div className="text-base text-wine-charcoal/80">
                  {t('economy.value.prop.subtitle') || 'Infrastructure existante • Soutien réglementaire • Feedstock sécurisé'}
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-wine-charcoal/70 max-w-3xl mx-auto">
            {t('economy.subtitle')}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 1. STRATEGIC CONTEXT FIRST - Why This Opportunity Exists */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('economy.strategic.context.title') || 'Pourquoi Cette Opportunité Existe Maintenant'}
            </h2>
            <p className="text-lg text-wine-charcoal/70 mb-6">
              {t('economy.strategic.context.subtitle') || 'Trois avantages compétitifs convergents créent une fenêtre d\'investissement unique'}
            </p>
          </div>
          
          {/* Triple Advantage Banner */}
          <div className="bg-gradient-to-r from-wine-burgundy/5 to-wine-gold/5 border border-wine-burgundy/20 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-wine-charcoal text-center mb-4">
              {t('economy.triple.advantage') || 'Triple Avantage Compétitif'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="text-xl font-bold text-wine-green mb-2">
                  {t('economy.advantage.feedstock') || 'Feedstock Local à Coût Négatif'}
                </div>
                <div className="text-sm text-wine-charcoal/70">
                  {t('economy.advantage.feedstock.detail') || 'Les producteurs paient pour éliminer ces déchets'}
                </div>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="text-xl font-bold text-wine-burgundy mb-2">
                  {t('economy.advantage.mandates') || 'Mandats CAD UE Croissants'}
                </div>
                <div className="text-sm text-wine-charcoal/70">
                  {t('economy.advantage.mandates.detail') || '2% en 2025 → 6% en 2030 → 70% en 2050'}
                </div>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="text-xl font-bold text-wine-gold mb-2">
                  {t('economy.advantage.position') || 'Position Géographique Optimale'}
                </div>
                <div className="text-sm text-wine-charcoal/70">
                  {t('economy.advantage.position.detail') || 'Proximité aéroports et réseau distribution'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Competitive Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
              <h4 className="text-lg font-bold text-wine-charcoal mb-3">
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
              <h4 className="text-lg font-bold text-wine-charcoal mb-3">
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
              <h4 className="text-lg font-bold text-wine-charcoal mb-3">
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

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 2. REGIONAL IMPACT - 918 Jobs PROMINENTLY FEATURED */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('economy.regional.impact.title') || 'Impact Économique Régional'}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('economy.regional.impact.subtitle') || 'Au-delà du profit: création d\'emplois et développement territorial'}
            </p>
          </div>

          {/* 918 JOBS - HERO TREATMENT */}
          <div className="bg-gradient-to-r from-wine-charcoal/5 to-wine-burgundy/5 border border-wine-charcoal/20 rounded-xl p-8 mb-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-wine-charcoal mb-4">{totalJobs}</div>
              <h3 className="text-2xl font-bold text-wine-charcoal mb-4">
                {t('economy.total.employment.impact') || 'Emplois Créés au Total'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-6">
                <div className="p-4 bg-white/70 rounded-lg">
                  <div className="text-3xl font-bold text-wine-burgundy mb-2">{directJobs}</div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">{t('economy.direct.jobs')}</div>
                  <div className="text-xs text-wine-charcoal/60">{t('economy.direct.jobs.detail') || 'Production, maintenance, gestion'}</div>
                </div>
                <div className="p-4 bg-white/70 rounded-lg">
                  <div className="text-3xl font-bold text-wine-gold mb-2">{indirectJobs}</div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">{t('economy.indirect.jobs')}</div>
                  <div className="text-xs text-wine-charcoal/60">{t('economy.indirect.jobs.detail') || 'Fournisseurs, transport, services'}</div>
                </div>
                <div className="p-4 bg-white/70 rounded-lg">
                  <div className="text-3xl font-bold text-wine-green mb-2">{inducedJobs}</div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">{t('economy.induced.jobs')}</div>
                  <div className="text-xs text-wine-charcoal/60">{t('economy.induced.jobs.detail') || 'Commerce local, consommation'}</div>
                </div>
              </div>
              <div className="text-sm text-wine-charcoal/60 italic">
                {t('economy.ademe.research') || 'Source: Multiplicateurs ADEME pour projets bioéconomie'}
              </div>
            </div>
          </div>

          {/* Why Jobs Matter Strategically */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
              <h4 className="text-lg font-bold text-wine-charcoal mb-3">
                {t('economy.jobs.political.value') || 'Valeur Politique et Sociale'}
              </h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• {t('economy.jobs.political.1') || 'Facilite soutien politique régional et national'}</div>
                <div>• {t('economy.jobs.political.2') || 'Diversifie l\'économie rurale au-delà du vin'}</div>
                <div>• {t('economy.jobs.political.3') || 'Éligibilité aux fonds de développement rural UE'}</div>
                <div>• {t('economy.jobs.political.4') || 'Crée des emplois techniques qualifiés'}</div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
              <h4 className="text-lg font-bold text-wine-charcoal mb-3">
                {t('economy.regional.metrics') || 'Métriques Économiques Régionales'}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-wine-charcoal/70">{t('economy.feedstock.secured') || 'Feedstock disponible'}</span>
                  <span className="font-bold text-wine-charcoal">{(availableBiomass / 1000).toFixed(0)}k t</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-wine-charcoal/70">{t('economy.saf.production')}</span>
                  <span className="font-bold text-wine-charcoal">{(currentData.wasteAllocation?.realisticSafPotential / 1000000).toFixed(1)}M L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-wine-charcoal/70">{t('economy.annual.revenue')}</span>
                  <span className="font-bold text-wine-green">€{currentData.wasteAllocation?.realisticRevenue}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-wine-charcoal/70">{t('economy.total.investment')}</span>
                  <span className="font-bold text-wine-burgundy">€{scaledInvestment}M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 3. COMPARATIVE CONTEXT - "Compared to What?" */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('economy.benchmark.title') || 'Performance en Contexte Comparatif'}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('economy.benchmark.subtitle') || 'Ce projet se compare favorablement aux alternatives'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-green/10">
              <h4 className="text-lg font-bold text-wine-green mb-3">
                {t('economy.vs.biorefinery') || 'vs. Autres Bioraffineries'}
              </h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>✓ {t('economy.vs.biorefinery.1') || 'ROI positif dès années 8-11 (vs. 15-20 ans typique)'}</div>
                <div>✓ {t('economy.vs.biorefinery.2') || 'Feedstock à coût négatif (vs. achat matières premières)'}</div>
                <div>✓ {t('economy.vs.biorefinery.3') || 'Infrastructure collecte existante (vs. création)'}</div>
              </div>
            </div>

            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
              <h4 className="text-lg font-bold text-wine-burgundy mb-3">
                {t('economy.vs.waste') || 'vs. Gestion Déchets Traditionnelle'}
              </h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>✓ {t('economy.vs.waste.1') || 'Génère revenus (vs. coût pur)'}</div>
                <div>✓ {t('economy.vs.waste.2') || 'Crée emplois qualifiés (vs. aucun)'}</div>
                <div>✓ {t('economy.vs.waste.3') || 'Valorisation premium (vs. élimination)'}</div>
              </div>
            </div>

            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
              <h4 className="text-lg font-bold text-wine-gold mb-3">
                {t('economy.vs.fossil') || 'vs. CAD Fossile'}
              </h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>✓ {t('economy.vs.fossil.1') || 'Créations emplois locaux (vs. importation)'}</div>
                <div>✓ {t('economy.vs.fossil.2') || 'Éligible crédits carbone et subventions'}</div>
                <div>✓ {t('economy.vs.fossil.3') || 'Sécurise approvisionnement national'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 4. FINANCIAL ANALYSIS MODULES */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('economy.analysis.modules')}
          </h2>
        </div>

        <Tabs defaultValue="roi" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow-elegant border border-wine-cream/30">
            <TabsTrigger value="roi" className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all">
              {t('economy.roi.calculator')}
            </TabsTrigger>
            <TabsTrigger value="cost-benefit" className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all">
              {t('economy.cost.benefit')}
            </TabsTrigger>
            <TabsTrigger value="projections" className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all">
              {t('economy.projections')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roi" className="mt-8">
            <AdvancedROICalculator />
          </TabsContent>

          <TabsContent value="cost-benefit" className="mt-8">
            <CostBenefitAnalysis />
          </TabsContent>

          <TabsContent value="projections" className="mt-8">
            <EconomicProjections />
            
            {/* Financing Structure */}
            <div className="mt-16 bg-wine-cream/10 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">
                {t('economy.financing.overview')} - {currentData.displayName}
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-burgundy/10 hover:shadow-lg transition-shadow group relative">
                  <div className="text-3xl font-bold text-wine-burgundy mb-3">€{scaledEquity}M</div>
                  <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.equity.funding')}</div>
                  <div className="text-sm text-wine-charcoal/60">{t('economy.equity.percentage')}</div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                    {t('economy.equity.tooltip') || `35% × €${scaledInvestment}M investissement total`}
                  </div>
                </div>
                
                <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-gold/10 hover:shadow-lg transition-shadow group relative">
                  <div className="text-3xl font-bold text-wine-gold mb-3">€{scaledDebt}M</div>
                  <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.bank.debt')}</div>
                  <div className="text-sm text-wine-charcoal/60">{t('economy.interest.rate')}</div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                    {t('economy.debt.tooltip') || `50% × €${scaledInvestment}M investissement total (4.5% taux)`}
                  </div>
                </div>
                
                <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-green/10 hover:shadow-lg transition-shadow group relative">
                  <div className="text-3xl font-bold text-wine-green mb-3">€{scaledSubsidies}M</div>
                  <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.subsidies')}</div>
                  <div className="text-sm text-wine-charcoal/60">{t('economy.eu.france.funding')}</div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                    {t('economy.subsidies.tooltip') || `15% × €${scaledInvestment}M (France 2030 + UE RePowerEU)`}
                  </div>
                </div>
                
                <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-charcoal/10 hover:shadow-lg transition-shadow group relative">
                  <div className="text-3xl font-bold text-wine-charcoal mb-3">€{scaledInvestment}M</div>
                  <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('economy.total.investment')}</div>
                  <div className="text-sm text-wine-charcoal/60">{t('economy.capacity.description', { capacity: (availableBiomass / 1000).toFixed(0) })}</div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                    {t('economy.investment.tooltip') || `Échelle: (${(availableBiomass / 1000).toFixed(0)}kt ÷ 80kt) × €150M base`}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center p-4 bg-wine-charcoal/5 rounded-lg">
                <p className="text-sm text-wine-charcoal/70 italic">
                  {t('economy.scaling.note', { region: currentData.displayName, capacity: (availableBiomass / 1000).toFixed(0) })}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 5. OPERATIONAL REALITY CHECK */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('economy.operational.reality.title') || 'Réalité Opérationnelle: Personnel Qualifié Requis'}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('economy.operational.reality.subtitle') || 'Ce projet n\'est pas que capital-intensif, il est aussi connaissance-intensive'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
              <h4 className="text-xl font-bold text-wine-charcoal mb-4">
                {t('economy.operational.requirements') || 'Besoins en Compétences'}
              </h4>
              <div className="space-y-3 text-sm text-wine-charcoal/70">
                <div>• {t('economy.operational.compliance') || 'Gestion conformité réglementaire complexe'}</div>
                <div>• {t('economy.operational.data') || 'Suivi et analyse données continues'}</div>
                <div>• {t('economy.operational.coordination') || 'Coordination avec centaines de vignerons'}</div>
                <div>• {t('economy.operational.documentation') || 'Documentation traçabilité et certification'}</div>
                <div>• {t('economy.operational.quality') || 'Contrôle qualité biomasse entrante'}</div>
              </div>
            </div>

            <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
              <h4 className="text-xl font-bold text-wine-charcoal mb-4">
                {t('economy.operational.solution') || 'Solution: Équipe Dédiée'}
              </h4>
              <div className="space-y-3 text-sm text-wine-charcoal/70">
                <div>✓ {t('economy.operational.team.1') || 'Experts réglementaires CAD/biocarburants'}</div>
                <div>✓ {t('economy.operational.team.2') || 'Gestionnaires relation producteurs viticoles'}</div>
                <div>✓ {t('economy.operational.team.3') || 'Analystes données et logistique'}</div>
                <div>✓ {t('economy.operational.team.4') || 'Spécialistes certification et traçabilité'}</div>
                <div className="pt-3 border-t border-wine-charcoal/10">
                  <span className="font-semibold text-wine-charcoal">{t('economy.operational.link') || 'Voir l\'onglet Mise en Œuvre pour détails →'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* 6. INVESTMENT CONCLUSION BANNER */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-wine-burgundy to-wine-gold text-white rounded-2xl p-8 lg:p-12 shadow-elegant">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t('economy.conclusion.title') || 'Un Investissement Solide et Stratégique'}
            </h2>
            <div className="max-w-4xl mx-auto mb-6">
              <p className="text-xl mb-4 opacity-90">
                {t('economy.conclusion.thesis') || 'Ce projet est financièrement viable car il combine:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold mb-2">💰 {t('economy.conclusion.economics') || 'Économie Favorable'}</div>
                  <div className="text-sm opacity-90">
                    {t('economy.conclusion.economics.detail') || 'Feedstock à coût négatif, mandats croissants, ROI positif 8-11 ans'}
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold mb-2">🏗️ {t('economy.conclusion.infrastructure') || 'Infrastructure Existante'}</div>
                  <div className="text-sm opacity-90">
                    {t('economy.conclusion.infrastructure.detail') || 'Réduction risques et délais, capacité collecte déployée'}
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-bold mb-2">👥 {t('economy.conclusion.impact') || 'Impact Territorial'}</div>
                  <div className="text-sm opacity-90">
                    {t('economy.conclusion.impact.detail') || `${totalJobs} emplois créent soutien politique et social`}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold mb-2">
                {t('economy.conclusion.next.steps') || 'Prochaines Étapes'}
              </p>
              <p className="text-sm opacity-80">
                {t('economy.conclusion.next.detail') || 'Voir l\'onglet Partenariats pour opportunités de collaboration et l\'onglet Mise en Œuvre pour plan d\'action détaillé'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EconomyTab;
