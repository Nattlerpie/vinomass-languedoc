import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Factory,
  Building,
  Recycle,
  TreePine
} from 'lucide-react';

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
  
  // Calculate biomass strategy values with proper SI formatting
  const totalBiomass = currentData.annualPomace || 266000; // tonnes
  const conservativeBase = Math.round(totalBiomass * 0.30); // 30%
  const negotiablePotential = Math.round(totalBiomass * 0.25); // 25%
  const totalAccessible = Math.round(totalBiomass * 0.55); // 55%
  
  // Convert tonnes to kt with proper spacing
  const formatToKt = (tonnes) => `${Math.round(tonnes / 1000)} kt`;
  
  return (
    <div className="min-h-screen w-full">
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
          
          {/* 6-button grid layout (2 rows of 3) with proper SI formatting */}
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
            
            {/* 2. Production annuelle de déchets vitivinicoles */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {formatToKt(currentData.annualPomace)}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('production.dechets.vitivinicoles')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('matiere.premiere.totale')}</div>
            </div>
            
            {/* 3. Allocation Réaliste des Flux */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {formatToKt(availableBiomass)}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('allocation.flux')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">30% {t('disponible.saf')}</div>
            </div>
            
            {/* 4. Potentiel SAF (70% efficacité) */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {realisticSafProduction.toFixed(1)} M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('potentiel.saf')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('litres.an')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">
                Basé sur {formatToKt(availableBiomass)} disponibles
              </div>
            </div>
            
            {/* 5. Revenue Potential with Hover */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300 group relative">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                €{realisticRevenue.toFixed(1)} M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('revenue.potential')}</div>
              <div className="text-sm text-wine-charcoal/60">/an</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('prix.marche')}</div>
              
              {/* Hover tooltip showing pricing methodology */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                {realisticSafProduction.toFixed(1)} M L × €1.22/L (prix marché ATJ - source: Aviation Fuel Analytics)
              </div>
            </div>
            
            {/* 6. Réduction CO₂ with Tooltip */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300 group relative">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {(realisticCO2Reduction / 1000).toFixed(1)} k {t('tonnes')}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('reduction.co2.potential')}</div>
              <div className="text-sm text-wine-charcoal/60">/an</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('vs.fossile')}</div>
              
              {/* Hover tooltip showing CO2 calculation methodology */}
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
      <div className="border-t border-wine-cream/30 mb-16"></div>
      
      {/* Regional Analysis Section - MODIFIED: Replaced right side with Biomass Strategy */}
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
          {/* LEFT SIDE: Keep TopCommunes (Principales Communes Productrices) */}
          <div className="space-y-4">
            <TopCommunes />
          </div>
          
          {/* RIGHT SIDE: NEW Biomass Strategy Section - REPLACED the ValoorizationChart section */}
          <div className="space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-wine-charcoal mb-4">
                  {t('strategie.biomasse')}
                </h3>
                <p className="text-lg text-wine-charcoal/70">
                  {t('strategic.allocation.framework')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Conservative Base */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full">
                      <Recycle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-green-700">30% {t('disponible')}</span>
                        <span className="text-lg font-semibold text-green-600">({formatToKt(conservativeBase)})</span>
                      </div>
                      <div className="text-sm font-medium text-green-800">{t('base.conservative')}</div>
                      <div className="text-xs text-green-600/80">{t('flux.elimination')}</div>
                    </div>
                  </div>
                </div>

                {/* Negotiable Potential */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-500/10 rounded-full">
                      <TreePine className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-orange-700">+25%</span>
                        <span className="text-lg font-semibold text-orange-600">({formatToKt(negotiablePotential)})</span>
                      </div>
                      <div className="text-sm font-medium text-orange-800">{t('potentiel.negociable')}</div>
                      <div className="text-xs text-orange-600/80">{t('surplus.excedents')}</div>
                    </div>
                  </div>
                </div>

                {/* Total Accessible */}
                <div className="bg-gradient-to-r from-wine-burgundy/10 to-wine-burgundy/20 rounded-lg p-6 border border-wine-burgundy/30">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-wine-burgundy/10 rounded-full">
                      <Factory className="w-6 h-6 text-wine-burgundy" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-wine-burgundy">{t('jusqua')} 55%</span>
                        <span className="text-lg font-semibold text-wine-burgundy">({formatToKt(totalAccessible)})</span>
                      </div>
                      <div className="text-sm font-medium text-wine-charcoal">{t('total.accessible')}</div>
                      <div className="text-xs text-wine-charcoal/70">{t('avec.partenariats')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-wine-charcoal/60 mt-6 italic border-t border-wine-cream/30 pt-4 text-center">
                {t('respecte.filieres')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Regional Context Section - MODIFIED: Added 4th button */}
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
          
          {/* MODIFIED: Changed to 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

            {/* NEW 4th button: Established chains */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-wine-burgundy/10 rounded-full mb-4 mx-auto">
                <Building className="w-6 h-6 text-wine-burgundy" />
              </div>
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                73
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('established.chains')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('mature.infrastructure')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* REVISED Regulatory Context Section - Made more prominent */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-wine-burgundy/5 to-wine-charcoal/5 rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('contexte.reglementaire')}
            </h2>
            <p className="text-xl text-wine-charcoal/70 max-w-4xl mx-auto">
              Un cadre réglementaire favorable qui crée une demande structurelle pour le SAF et positionne notre projet au cœur de la transition énergétique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/90 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-wine-burgundy/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-wine-burgundy mb-3">2%</div>
                <div className="text-lg font-semibold text-wine-charcoal mb-2">ReFuelEU Aviation</div>
                <div className="text-sm text-wine-charcoal/70">SAF minimum 2025</div>
                <div className="text-xs text-wine-charcoal/60 mt-2">Escalade à 70% d'ici 2050</div>
              </div>
            </div>
            
            <div className="bg-white/90 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-wine-gold/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-wine-gold mb-3">€4B</div>
                <div className="text-lg font-semibold text-wine-charcoal mb-2">France 2030</div>
                <div className="text-sm text-wine-charcoal/70">Fonds verts dédiés</div>
                <div className="text-xs text-wine-charcoal/60 mt-2">Soutien biocarburants</div>
              </div>
            </div>
            
            <div className="bg-white/90 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-wine-green/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-wine-green mb-3">€210B</div>
                <div className="text-lg font-semibold text-wine-charcoal mb-2">EU REPowerEU</div>
                <div className="text-sm text-wine-charcoal/70">Énergies renouvelables</div>
                <div className="text-xs text-wine-charcoal/60 mt-2">Independence énergétique</div>
              </div>
            </div>
            
            <div className="bg-white/90 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-wine-burgundy/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-wine-burgundy mb-3">2050</div>
                <div className="text-lg font-semibold text-wine-charcoal mb-2">CORSIA ICAO</div>
                <div className="text-sm text-wine-charcoal/70">Neutralité carbone</div>
                <div className="text-xs text-wine-charcoal/60 mt-2">Aviation mondiale</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-wine-burgundy/10 rounded-xl p-6 inline-block">
              <p className="text-wine-charcoal font-semibold text-lg mb-2">
                Notre projet s'inscrit dans cette dynamique nationale
              </p>
              <p className="text-wine-charcoal/70">
                → Voir onglet Économie pour l'analyse financière détaillée
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Industry News Section - Kept as is */}
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
                <div>• <span className="font-medium">{t('investissement')}:</span> €180 M</div>
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
                <div>• <span className="font-medium">{t('investissement')}:</span> €500 M {t('sur.ans', { years: '5' })}</div>
                <div>• <span className="font-medium">{t('objectif')}:</span> 1.5 M {t('tonnes.saf.an')} {t('capacity')}</div>
                <div>• <span className="font-medium">{t('industry.total.biorefineries')}:</span> {t('industry.total.sites.modernized')}</div>
                <div>• <span className="font-medium">{t('industry.total.partnerships')}:</span> {t('industry.total.biomass.suppliers')}</div>
              </div>
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
