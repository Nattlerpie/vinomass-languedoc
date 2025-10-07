import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const OverviewTab = () => {
  const { currentData, debugMode, validateData } = useRegion();
  const { t, debugMode: langDebugMode } = useLanguage();
  
  const availableBiomass = currentData.wasteAllocation.available;
  const negotiableBiomass = currentData.wasteAllocation.negotiable;
  const protectedBiomass = currentData.wasteAllocation.protected;
  
  const realisticSafProduction = currentData.wasteAllocation.realisticSafPotential / 1000000;
  const realisticRevenue = currentData.wasteAllocation.realisticRevenue;
  const realisticCO2Reduction = currentData.wasteAllocation.realisticCo2Reduction;
  
  const totalInstallations = currentData.id === 'languedoc' ? 73 : 
                           currentData.id === 'champagne' ? 10 : 
                           45;
  
  const debugErrors = debugMode || langDebugMode ? validateData() : [];
  
  // UPDATE THIS DATE WHEN YOU MAKE CHANGES
  const lastUpdated = "07 Octobre 2025";
  
  return (
    <div className="min-h-screen w-full">
      {/* LAST UPDATED BANNER - Top of page */}
      <section className="mb-8">
        <div className="text-center">
          <div className="inline-flex items-center bg-wine-cream/30 backdrop-blur-sm rounded-full px-6 py-2 border border-wine-cream/50">
            <span className="text-sm font-medium text-wine-charcoal">
              {t('overview.last.updated')}: {lastUpdated}
            </span>
          </div>
        </div>
      </section>

      {/* DEBUG BANNER */}
      {(debugMode || langDebugMode) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">{t('debug.title')}</strong>
          <div className="text-sm mt-2">
            <div>Current Region: {currentData.displayName} ({currentData.id})</div>
            <div>Available Biomass: {availableBiomass.toLocaleString()} t</div>
            <div>SAF Production: {(realisticSafProduction * 1000000).toLocaleString()} L</div>
            <div>Revenue: €{realisticRevenue}M</div>
            <div>CO₂ Reduction: {realisticCO2Reduction.toLocaleString()} t</div>
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

      {/* Hero Section */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('header.title', { region: currentData.displayName })}
          </h1>
                   
          {/* Value Proposition Banner */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-wine-burgundy/10 to-wine-gold/10 border border-wine-gold/30 rounded-xl p-8">
              <div className="text-center mb-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-wine-charcoal mb-3">
                  {t('overview.hero.title')}
                </h2>
                <div className="text-xl text-wine-charcoal/80 space-y-2">
                  <div>
                    <span className="font-semibold">{(currentData.annualPomace / 1000).toFixed(0)}k t</span> {t('overview.hero.regional.waste')} → 
                    <span className="font-semibold text-wine-green ml-2">{(availableBiomass / 1000).toFixed(0)}k t</span> {t('overview.hero.available')} → 
                    <span className="font-semibold text-wine-burgundy ml-2">{realisticSafProduction.toFixed(1)}M L {t('overview.saf.acronym')}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center bg-white/50 rounded-full px-6 py-3">
                  <span className="text-2xl font-bold text-wine-gold mr-3">€{realisticRevenue}M/an</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points Clés Hero Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('points.cles')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('points.cles.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. Superficie viticole */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {(currentData.vineyardSurface / 1000).toFixed(0)} k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('superficie.viticole')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('hectares')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('base.regionale')}</div>
            </div>
            
            {/* 2. Production annuelle */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {(currentData.annualPomace / 1000).toFixed(0)} k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('production.dechets.vitivinicoles')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('matiere.premiere.totale')}</div>
            </div>
            
            {/* 3. Allocation Flux */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {(availableBiomass / 1000).toFixed(0)} k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('allocation.flux')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">30% {t('disponible.saf')}</div>
            </div>
            
            {/* 4. Potentiel SAF */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {realisticSafProduction.toFixed(1)} M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('potentiel.saf')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('litres.an')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">
                {t('overview.based.on')} {(availableBiomass / 1000).toFixed(0)} kt {t('overview.available')}
              </div>
            </div>
            
            {/* 5. Revenue Potential */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300 group relative">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                €{realisticRevenue.toFixed(1)}M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('revenue.potential')}</div>
              <div className="text-sm text-wine-charcoal/60">/an</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('prix.marche')}</div>
              
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                {realisticSafProduction.toFixed(1)} M L × €1.45/L ({t('overview.tooltip.conservative.price')})
              </div>
            </div>
            
            {/* 6. Réduction CO₂ */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300 group relative">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {(realisticCO2Reduction / 1000).toFixed(1)} k {t('tonnes')}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('reduction.co2.potential')}</div>
              <div className="text-sm text-wine-charcoal/60">/an</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('vs.fossile')}</div>
              
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                {t('co2.calculation.tooltip', { 
                  liters: realisticSafProduction.toFixed(1),
                  factor: '2.5'
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* Market Validation Section */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('overview.market.validation.title')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('overview.market.validation.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-subtle rounded-xl p-6 border border-wine-green/10">
              <h3 className="text-xl font-bold text-wine-green mb-3">{t('overview.iata.report.title')}</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-4">{t('overview.iata.report.subtitle')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">{t('overview.iata.deficit.label')}:</span> {t('overview.iata.deficit.value')}</div>
                <div>• <span className="font-medium">{t('overview.iata.agricultural.label')}:</span> {t('overview.iata.agricultural.value')}</div>
                <div>• <span className="font-medium">{t('overview.iata.europe.label')}:</span> {t('overview.iata.europe.value')}</div>
                <div>• <span className="font-medium">{t('overview.iata.etj.label')}:</span> {t('overview.iata.etj.value')}</div>
              </div>
              <div className="text-xs text-wine-charcoal/50 mt-3 italic">
                {t('overview.iata.source')}
              </div>
            </div>
            
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-burgundy/10">
              <h3 className="text-xl font-bold text-wine-burgundy mb-4 text-center">{t('overview.market.opportunity')}</h3>
              <div className="space-y-3 text-sm text-wine-charcoal/70">
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-wine-burgundy">500 Mt</div>
                  <div className="text-xs mt-1">{t('overview.market.demand.2050')}</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-wine-gold">400 Mt</div>
                  <div className="text-xs mt-1">{t('overview.market.forecast.production')}</div>
                </div>
                <div className="text-center p-3 bg-wine-green/10 rounded-lg">
                  <div className="text-2xl font-bold text-wine-green">100 Mt</div>
                  <div className="text-xs mt-1">{t('overview.market.deficit')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>
      
      {/* Regional Implementation Section */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('overview.regional.implementation')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('overview.regional.implementation.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Regional Context (Moved ABOVE communes) */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30">
              <h3 className="text-xl font-bold text-wine-charcoal mb-6 text-center">
                {t('overview.competitive.advantages')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-wine-burgundy mb-2">
                    {currentData.ranking}
                  </div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">
                    {t(currentData.id === 'languedoc' ? 'region.viticole.francaise' : 'region.premium.champagne')}
                  </div>
                  <div className="text-xs text-wine-charcoal/60">
                    {t(currentData.id === 'languedoc' ? 'volume.production' : 'marche.prestige')}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-wine-gold mb-2">
                    {currentData.nationalProductionShare}%
                  </div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">{t('production.nationale')}</div>
                  <div className="text-xs text-wine-charcoal/60">
                    {(currentData.hectolitres / 1000000).toFixed(1)}M {t('hectolitres')}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-wine-green mb-2">
                    €{currentData.wineIndustryRevenue}B
                  </div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">{t('ca.annuel')}</div>
                  <div className="text-xs text-wine-charcoal/60">{t('secteur.vitivinicole')}</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-bold text-wine-burgundy mb-2">
                    {totalInstallations}
                  </div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">{t('total.facilities')}</div>
                  <div className="text-xs text-wine-charcoal/60">{t('existing.capacity')}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30 hover:shadow-wine transition-all duration-500">
              <h3 className="text-xl font-bold text-wine-charcoal mb-6 text-center text-shadow">
                {t('communes.title')}
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Vieussan', tonnage: 14158 },
                  { name: 'Saint-Thibéry', tonnage: 8899 },
                  { name: 'Trausse', tonnage: 7984 }
                ].map((commune, index) => (
                  <div
                    key={commune.name}
                    className="flex items-center justify-between p-4 bg-gradient-subtle rounded-xl border border-wine-cream/40 hover:border-wine-burgundy/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110 ${
                        index === 0 ? 'bg-wine-burgundy shadow-wine' : 
                        index === 1 ? 'bg-wine-gold shadow-elegant' : 'bg-wine-green shadow-elegant'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-semibold text-wine-charcoal">
                        {commune.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-wine-charcoal group-hover:text-wine-burgundy transition-colors duration-300">
                        {(commune.tonnage / 1000).toFixed(1)} k
                      </span>
                      <span className="text-sm text-wine-charcoal/70 ml-2">{t('tonnes')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <ValoorizationChart />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* Industry Momentum Section */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('overview.industry.momentum')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('overview.industry.momentum.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wine-charcoal mb-4">{t('overview.reference.projects')}</h3>
              
              <div className="bg-gradient-subtle rounded-lg p-4 border border-wine-burgundy/10">
                <h4 className="font-bold text-wine-burgundy mb-2">Haffner Energy - France</h4>
                <div className="text-sm text-wine-charcoal/70">
                  {t('overview.haffner.details')}
                </div>
              </div>
              
              <div className="bg-gradient-subtle rounded-lg p-4 border border-wine-gold/10">
                <h4 className="font-bold text-wine-gold mb-2">LanzaJet - {t('overview.usa')}</h4>
                <div className="text-sm text-wine-charcoal/70">
                  {t('overview.lanzajet.details')}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wine-charcoal mb-4">{t('overview.major.industrials')}</h3>
              
              <div className="bg-gradient-subtle rounded-lg p-4 border border-wine-green/10">
                <h4 className="font-bold text-wine-green mb-2">Airbus - {t('overview.zeroe.program')}</h4>
                <div className="text-sm text-wine-charcoal/70">
                  {t('overview.airbus.details')}
                </div>
              </div>
              
              <div className="bg-gradient-subtle rounded-lg p-4 border border-wine-burgundy/10">
                <h4 className="font-bold text-wine-burgundy mb-2">Total Energies - {t('overview.saf.strategy')}</h4>
                <div className="text-sm text-wine-charcoal/70">
                  {t('overview.totalenergies.details')}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-wine-charcoal mb-4 text-center">{t('overview.regulatory.support')}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-wine-burgundy">2%</div>
                <div className="text-sm mt-1">{t('overview.saf.minimum.2025')}</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-wine-gold">€4B</div>
                <div className="text-sm mt-1">{t('overview.france.2030')}</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-wine-green">€210B</div>
                <div className="text-sm mt-1">{t('overview.eu.repowereu')}</div>
              </div>
              <div className="bg-white/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-wine-charcoal">2050</div>
                <div className="text-sm mt-1">{t('overview.carbon.neutrality')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-wine-burgundy to-wine-gold text-white rounded-2xl p-8 lg:p-12 shadow-elegant text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('overview.cta.title')}
          </h2>
          <p className="text-xl mb-6 opacity-90">
            {t('overview.cta.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">{t('overview.cta.timing.icon')} {t('overview.cta.timing.title')}</div>
              <div className="text-sm opacity-80">{t('overview.cta.timing.description')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">{t('overview.cta.firstmover.icon')} {t('overview.cta.firstmover.title')}</div>
              <div className="text-sm opacity-80">{t('overview.cta.firstmover.description')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">{t('overview.cta.winwin.icon')} {t('overview.cta.winwin.title')}</div>
              <div className="text-sm opacity-80">{t('overview.cta.winwin.description')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
