import BiomassBreakdownChart from "../BiomassBreakdownChart";
import StaticRegionalMap from "../StaticRegionalMap";
import SeasonalTimeline from "../SeasonalTimeline";
import InfrastructureOverview from "../InfrastructureOverview";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const ResourcesTab = () => {
  const { currentData } = useRegion();
  const { t } = useLanguage();
  
  // ✅ FIX: Use dynamic data from RegionContext instead of hardcoded values
  const safAvailableTonnage = currentData.availableBiomass; // Dynamic: 80k for Languedoc, 11.1k for Champagne
  const totalTheoreticalTonnage = currentData.totalBiomass; // Dynamic: 266k for Languedoc, 37k for Champagne
  const otherValorisations = totalTheoreticalTonnage - safAvailableTonnage;
  
  // ✅ FIX: Calculate percentages dynamically
  const safPercentage = Math.round((safAvailableTonnage / totalTheoreticalTonnage) * 100);
  
  // ✅ FIX: SAF production calculations using currentData
  const safProductionLiters = currentData.safProduction / 1000000; // Convert to millions
  const safRevenue = currentData.revenue; // Use revenue from RegionContext
  const co2Reduction = currentData.co2Reduction / 1000; // Convert to thousands for display
  
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Interactive Map */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('resources.title')} {/* "Ressources Biomasse" / "Biomass Resources" */}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            {t('resources.subtitle')} {/* "Cartographie et analyse des ressources régionales disponibles" */}
          </p>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-elegant border border-wine-cream/30">
          {/* ✅ FIX: Pass region data to map component */}
          <StaticRegionalMap 
            region={currentData.id}
            communes={currentData.topCommunes}
          />
        </div>
      </section>

      {/* Realistic Allocation Section */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('resources.allocationTitle')} - {currentData.name}
              {/* "Allocation Réaliste des Flux" / "Realistic Flow Allocation" */}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('resources.allocationSubtitle')}
              {/* "Disponibilité effective pour la production de SAF" */}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-charcoal/10">
              {/* ✅ FIX: Dynamic total biomass */}
              <div className="text-3xl font-bold text-wine-charcoal mb-3">
                {totalTheoreticalTonnage.toLocaleString()}t
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">
                {t('resources.totalProduction')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {t('resources.totalPercentage')} {/* "100% des ressources biomasse" */}
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
              {/* ✅ FIX: Dynamic SAF available tonnage */}
              <div className="text-3xl font-bold text-wine-burgundy mb-3">
                {safAvailableTonnage.toLocaleString()}t
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">
                {t('resources.availableForSAF')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {safPercentage}% {t('resources.realisticAllocation')}
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
              {/* ✅ FIX: Dynamic other valorizations calculation */}
              <div className="text-3xl font-bold text-wine-gold mb-3">
                {Math.round(otherValorisations/1000)}kt
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">
                {t('resources.otherValorisations')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {t('resources.otherValorisationsDesc')}
                {/* "Distillation, compostage, méthanisation" */}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-wine-cream/10 rounded-xl">
            <p className="text-wine-charcoal/80 text-center">
              <strong>{t('resources.whyThirtyPercent.title')}</strong> {t('resources.whyThirtyPercent.description')}
              {/* "Pourquoi seulement 30% ? Les distilleries existantes..." */}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Resource Analysis Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('resources.analysisTitle')} {/* "Analyse des Ressources" */}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('resources.analysisSubtitle')}
            {/* "Répartition et saisonnalité des biomasses disponibles" */}
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            {/* ✅ FIX: Pass waste allocation data to chart */}
            <BiomassBreakdownChart 
              wasteAllocation={currentData.wasteAllocation}
              totalBiomass={totalTheoreticalTonnage}
              region={currentData.name}
            />
          </div>
          <div className="space-y-6">
            {/* ✅ FIX: Pass seasonal data to timeline */}
            <SeasonalTimeline 
              region={currentData.id}
              totalProduction={totalTheoreticalTonnage}
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Infrastructure Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('resources.infrastructureTitle')} {/* "Infrastructure Existante" */}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('resources.infrastructureSubtitle')}
            {/* "Capacités de transformation et valorisation" */}
          </p>
        </div>
        
        {/* ✅ FIX: Pass infrastructure data from RegionContext */}
        <InfrastructureOverview 
          infrastructure={currentData.infrastructure}
          region={currentData.name}
        />
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* SAF Production Potential */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('resources.safPotentialTitle')} {/* "Potentiel de Production SAF" */}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('resources.safPotentialSubtitle', { tonnage: safAvailableTonnage.toLocaleString() })}
              {/* "Capacité réaliste basée sur {tonnage} tonnes disponibles" */}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 text-center">
              {/* ✅ FIX: Use dynamic SAF production from RegionContext */}
              <div className="text-4xl font-bold text-wine-burgundy mb-4">
                {safProductionLiters.toFixed(1)}M L
              </div>
              <div className="text-xl font-semibold text-wine-charcoal mb-3">
                {t('resources.annualSafProduction')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {t('resources.yieldRate')} {/* "À 280L/tonne de rendement" */}
              </div>
            </div>
            
            <div className="p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 text-center">
              {/* ✅ FIX: Use dynamic revenue from RegionContext */}
              <div className="text-4xl font-bold text-wine-gold mb-4">
                €{safRevenue.toFixed(1)}M
              </div>
              <div className="text-xl font-semibold text-wine-charcoal mb-3">
                {t('resources.potentialRevenue')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {t('resources.pricePerLiter')} {/* "À €1.22/L prix de vente" */}
              </div>
            </div>
            
            <div className="p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 text-center">
              {/* ✅ FIX: Use dynamic CO2 reduction from RegionContext */}
              <div className="text-4xl font-bold text-wine-green mb-4">
                {co2Reduction.toLocaleString()}kt
              </div>
              <div className="text-xl font-semibold text-wine-charcoal mb-3">
                {t('resources.annualCo2Avoided')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {t('resources.vsFossilFuel')} {/* "vs carburant fossile" */}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-wine-cream/10 rounded-xl">
            <p className="text-wine-charcoal/80 text-center text-sm">
              {t('resources.disclaimer')}
              {/* "* Estimations basées sur les technologies ATJ (Alcohol-to-Jet) et les conditions de marché actuelles" */}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesTab;
