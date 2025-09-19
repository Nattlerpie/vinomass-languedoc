import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const OverviewTab = () => {
  const { currentData, debugMode, validateData } = useRegion();
  const { t, debugMode: langDebugMode } = useLanguage();
  
  // Use data directly from the consolidated RegionContext (no more fallbacks needed)
  const availableBiomass = currentData.wasteAllocation.available;
  const negotiableBiomass = currentData.wasteAllocation.negotiable;
  const protectedBiomass = currentData.wasteAllocation.protected;
  
  // Use pre-calculated values from RegionContext for consistency
  const realisticSafProduction = currentData.wasteAllocation.realisticSafPotential / 1000000; // convert to millions
  const realisticRevenue = currentData.wasteAllocation.realisticRevenue;
  const realisticCO2Reduction = currentData.wasteAllocation.realisticCo2Reduction;
  
  // Debug validation
  const debugErrors = debugMode || langDebugMode ? validateData() : [];
  
  return (
    <div className="min-h-screen w-full">
      {/* DEBUG BANNER */}
      {(debugMode || langDebugMode) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">{t('debug.title')}</strong>
          <div className="text-sm mt-2">
            <div>Current Region: {currentData.displayName} ({currentData.id})</div>
            <div>Available Biomass: {availableBiomass.toLocaleString()}t</div>
            <div>SAF Production: {(realisticSafProduction * 1000000).toLocaleString()}L</div>
            <div>Revenue: €{realisticRevenue}M</div>
            <div>CO₂ Reduction: {realisticCO2Reduction.toLocaleString()}t</div>
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

      {/* Hero Section - Header Only */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('header.title', { region: currentData.displayName })}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            {t('header.subtitle')}
          </p>
        </div>

        {/* Points Clés Hero Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('points.cles')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('points.cles.subtitle')}
            </p>
          </div>
          
          {/* 6-button grid layout (2 rows of 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. Superficie viticole */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {(currentData.vineyardSurface / 1000).toFixed(0)}k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('superficie.viticole')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('hectares')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('base.regionale')}</div>
            </div>
            
            {/* 2. Production annuelle de déchets vitivinicoles */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {(currentData.annualPomace / 1000).toFixed(0)}k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('production.dechets.vitivinicoles')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('matiere.premiere.totale')}</div>
            </div>
            
            {/* 3. Allocation Réaliste des Flux */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {(availableBiomass / 1000).toFixed(0)}k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('allocation.flux')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">30% {t('disponible.saf')}</div>
            </div>
            
            {/* 4. Potentiel SAF (70% efficacité) */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {realisticSafProduction.toFixed(1)}M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('potentiel.saf')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('litres.an')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">
                Basé sur {(availableBiomass / 1000).toFixed(0)}kt disponibles
              </div>
            </div>
            
            {/* 5. Revenue Potential with Hover */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300 group relative">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                €{realisticRevenue.toFixed(1)}M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('revenue.potential')}</div>
              <div className="text-sm text-wine-charcoal/60">/an</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('prix.marche')}</div>
              
              {/* Hover tooltip showing pricing methodology */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                {realisticSafProduction.toFixed(1)}M L × €1.22/L (prix marché ATJ - source: Aviation Fuel Analytics)
              </div>
            </div>
            
            {/* 6. Réduction CO₂ */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {(realisticCO2Reduction / 1000).toFixed(1)}kt
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('reduction.co2')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes.an')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('vs.fossile')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>
      
      {/* Regional Analysis Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('analyse.regionale')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('analyse.regionale.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <TopCommunes />
          </div>
          <div className="space-y-4">
            <ValoorizationChart />
            
            {/* Biomass Strategy Context */}
            <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-6 mt-6">
              <h4 className="text-lg font-bold text-wine-charcoal mb-4">{t('strategie.biomasse')}</h4>
              <div className="space-y-3 text-sm text-wine-charcoal/70">
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-wine-charcoal">• {t('base.conservative')}:</span>
                  <span>30% {t('disponible')} ({(availableBiomass / 1000).toFixed(0)}kt) - {t('flux.elimination')}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-wine-charcoal">• {t('potentiel.negociable')}:</span>
                  <span>+25% ({(negotiableBiomass / 1000).toFixed(0)}kt) - {t('surplus.excedents')}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-wine-charcoal">• {t('total.accessible')}:</span>
                  <span>{t('jusqua')} 55% ({((availableBiomass + negotiableBiomass) / 1000).toFixed(0)}kt) {t('avec.partenariats')}</span>
                </div>
              </div>
              <p className="text-sm text-wine-charcoal/60 mt-4 italic border-t border-wine-gold/20 pt-3">
                {t('respecte.filieres')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Regional Context Section */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('contexte.regional')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('contexte.regional.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {currentData.ranking}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">
                {t(currentData.id === 'languedoc' ? 'region.viticole.francaise' : 'region.premium.champagne')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {t(currentData.id === 'languedoc' ? 'volume.production' : 'marche.prestige')}
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {currentData.nationalProductionShare}%
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('production.nationale')}</div>
              <div className="text-sm text-wine-charcoal/60">
                {currentData.hectolitres} {t('millions')} {t('hectolitres')}
                {currentData.id === 'champagne' && ` (${t('segment.premium')})`}
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                €{currentData.wineIndustryRevenue}B
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('ca.annuel')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('secteur.vitivinicole')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Industry News Section */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('actualites.saf')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('actualites.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Haffner Energy */}
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-burgundy/10">
              <h3 className="text-xl font-bold text-wine-burgundy mb-3">{t('industry.haffner.title')}</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-3">{t('industry.haffner.subtitle')}</h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">{t('investissement')}:</span> €180M</div>
                <div>• <span className="font-medium">{t('capacite')}:</span> 50,000 {t('tonnes.saf.an')} {t('des.2025')}</div>
                <div>• <span className="font-medium">{t('technologie')}:</span> {t('biomass.to.liquids')}</div>
                <div>• <span className="font-medium">{t('partenariat')}:</span> Région Île-de-France</div>
              </div>
            </div>

            {/* LANZAJET */}
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-gold/10">
              <h3 className="text-xl font-bold text-wine-gold mb-3">{t('industry.lanzajet.title')}</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-3">{t('industry.lanzajet.subtitle')}</h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">{t('industry.lanzajet.first.commercial')}</span></div>
                <div>• <span className="font-medium">{t('capacite')}:</span> 125,000 {t('tonnes.saf.an')}</div>
                <div>• <span className="font-medium">{t('feedstock')}:</span> {t('waste.agricultural.ethanol')}</div>
                <div>• <span className="font-medium">{t('certification')}:</span> ASTM D7566 {t('approved')}</div>
              </div>
            </div>

            {/* Airbus */}
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-green/10">
              <h3 className="text-xl font-bold text-wine-green mb-3">{t('industry.airbus.title')}</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-3">{t('industry.airbus.subtitle')}</h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">{t('objectif')}:</span> {t('industry.airbus.hydrogen.objective')}</div>
                <div>• <span className="font-medium">{t('industry.airbus.saf.transition')}:</span> 10% {t('minimum.2030')}</div>
                <div>• <span className="font-medium">{t('industry.airbus.partnerships')}:</span> {t('industry.airbus.airports')}</div>
                <div>• <span className="font-medium">{t('budget.rd')}:</span> €15 {t('milliards')} {t('mobilises')}</div>
              </div>
            </div>

            {/* Total Energies */}
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-burgundy/10">
              <h3 className="text-xl font-bold text-wine-burgundy mb-3">{t('industry.total.title')}</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-3">{t('industry.total.subtitle')}</h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">{t('investissement')}:</span> €500M {t('sur.ans', { years: '5' })}</div>
                <div>• <span className="font-medium">{t('objectif')}:</span> 1.5M {t('tonnes.saf.an')} {t('capacity')}</div>
                <div>• <span className="font-medium">{t('industry.total.biorefineries')}:</span> {t('industry.total.sites.modernized')}</div>
                <div>• <span className="font-medium">{t('industry.total.partnerships')}:</span> {t('industry.total.biomass.suppliers')}</div>
              </div>
            </div>
          </div>

          {/* Regulatory Context */}
          <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-wine-charcoal mb-4">{t('contexte.reglementaire')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-wine-charcoal/70">
              <div>• <span className="font-medium">ReFuelEU Aviation:</span> 2% SAF minimum 2025</div>
              <div>• <span className="font-medium">France 2030:</span> €4 {t('milliards')} {t('fonds.verts')}</div>
              <div>• <span className="font-medium">EU REPowerEU:</span> €210 {t('milliards')} {t('energies.renouvelables')}</div>
              <div>• <span className="font-medium">CORSIA ICAO:</span> {t('objectif')} {t('neutralite.carbone')} 2050</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-wine-charcoal/60 italic">
              {t('projet.inscrit')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
