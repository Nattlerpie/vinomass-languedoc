import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import RegionalMap from "../RegionalMap";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Droplets, 
  MapPin, 
  TrendingUp, 
  Factory,
  Plane,
  TreePine,
  Recycle,
  Building
} from 'lucide-react';

const OverviewTab = () => {
  const { currentData, activeRegion } = useRegion();
  const { t } = useLanguage();

  // Calculate biomass strategy values with proper SI formatting
  const totalBiomass = currentData.annualPomace || 266000; // tonnes
  const conservativeBase = Math.round(totalBiomass * 0.30); // 30%
  const negotiablePotential = Math.round(totalBiomass * 0.25); // 25%
  const totalAccessible = Math.round(totalBiomass * 0.55); // 55%

  // Convert tonnes to kt with proper spacing
  const formatToKt = (tonnes: number) => `${Math.round(tonnes / 1000)} kt`;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-wine-burgundy via-wine-burgundy/95 to-wine-charcoal">
        <div className="absolute inset-0 bg-wine-texture opacity-10"></div>
        <div className="container mx-auto px-8 py-16 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6 text-shadow-lg">
              {t('header.title')}
            </h1>
            <p className="text-xl text-wine-cream/90 mb-8 max-w-3xl mx-auto">
              {t('header.subtitle')}
            </p>
            <div className="text-lg text-wine-cream/80 font-medium">
              {currentData.displayName} • {formatToKt(totalBiomass)} {t('matiere.premiere.totale')}
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-wine-burgundy/10 rounded-full mb-6 mx-auto">
                <Droplets className="w-8 h-8 text-wine-burgundy" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-wine-charcoal mb-2">
                  {formatToKt(totalBiomass)}
                </div>
                <div className="text-lg font-semibold text-wine-charcoal/80 mb-1">
                  {t('production.dechets.vitivinicoles')}
                </div>
                <div className="text-sm text-wine-charcoal/60">
                  {t('matiere.premiere.totale')}
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-wine-burgundy/10 rounded-full mb-6 mx-auto">
                <Plane className="w-8 h-8 text-wine-burgundy" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-wine-charcoal mb-2">
                  {Math.round((currentData.wasteAllocation?.realisticSafPotential || 0) / 1000000).toLocaleString()} L
                </div>
                <div className="text-lg font-semibold text-wine-charcoal/80 mb-1">
                  {t('saf.production.potential')}
                </div>
                <div className="text-sm text-wine-charcoal/60">
                  {t('annual.production.capacity')}
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-wine-burgundy/10 rounded-full mb-6 mx-auto">
                <TrendingUp className="w-8 h-8 text-wine-burgundy" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-wine-charcoal mb-2">
                  €{Math.round((currentData.wasteAllocation?.realisticRevenue || 0) / 1000000)}M
                </div>
                <div className="text-lg font-semibold text-wine-charcoal/80 mb-1">
                  {t('economic.potential')}
                </div>
                <div className="text-sm text-wine-charcoal/60">
                  {t('annual.revenue.potential')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-16">
        {/* Regional Context Buttons - Updated with 4th button */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('contexte.regional')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('leadership.national.potentiel')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* First 3 buttons with existing data */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-wine-burgundy/10 rounded-full mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-wine-burgundy" />
                </div>
                <div className="text-2xl font-bold text-wine-charcoal mb-2">
                  {currentData.marketShare}%
                </div>
                <div className="text-sm font-semibold text-wine-charcoal/80 mb-1">
                  {t('production.nationale')}
                </div>
                <div className="text-xs text-wine-charcoal/60">
                  {currentData.annualVolume} {t('production.volume')}
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-wine-burgundy/10 rounded-full mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-wine-burgundy" />
                </div>
                <div className="text-2xl font-bold text-wine-charcoal mb-2">
                  €{currentData.annualRevenue}
                </div>
                <div className="text-sm font-semibold text-wine-charcoal/80 mb-1">
                  {t('chiffre.affaires.annuel')}
                </div>
                <div className="text-xs text-wine-charcoal/60">
                  {t('secteur.vitivinicole.regional')}
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-wine-burgundy/10 rounded-full mb-4 mx-auto">
                  <Factory className="w-6 h-6 text-wine-burgundy" />
                </div>
                <div className="text-2xl font-bold text-wine-charcoal mb-2">
                  {currentData.wasteAllocation?.realisticJobs || 0}
                </div>
                <div className="text-sm font-semibold text-wine-charcoal/80 mb-1">
                  {t('jobs.created')}
                </div>
                <div className="text-xs text-wine-charcoal/60">
                  {t('direct.employment')}
                </div>
              </div>
            </div>

            {/* NEW 4th button - Established chains */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-wine-burgundy/10 rounded-full mb-4 mx-auto">
                  <Building className="w-6 h-6 text-wine-burgundy" />
                </div>
                <div className="text-2xl font-bold text-wine-charcoal mb-2">
                  73
                </div>
                <div className="text-sm font-semibold text-wine-charcoal/80 mb-1">
                  {t('established.chains')}
                </div>
                <div className="text-xs text-wine-charcoal/60">
                  {t('mature.infrastructure')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW Biomass Strategy Section - Replacing Regional Context details */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('biomass.supply.strategy')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('strategic.allocation.framework')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-elegant border border-green-200/50 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6 mx-auto">
                  <Recycle className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-700 mb-2">
                  30% {t('disponible')}
                </div>
                <div className="text-xl font-semibold text-green-600 mb-3">
                  {formatToKt(conservativeBase)}
                </div>
                <div className="text-sm font-medium text-green-800 mb-2">
                  {t('conservative.base')}
                </div>
                <div className="text-xs text-green-600/80">
                  {t('disposal.flows')}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 shadow-elegant border border-orange-200/50 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-6 mx-auto">
                  <TreePine className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  +25%
                </div>
                <div className="text-xl font-semibold text-orange-600 mb-3">
                  {formatToKt(negotiablePotential)}
                </div>
                <div className="text-sm font-medium text-orange-800 mb-2">
                  {t('negotiable.potential')}
                </div>
                <div className="text-xs text-orange-600/80">
                  {t('surplus.excess')}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/20 rounded-xl p-8 shadow-elegant border border-wine-burgundy/30 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-wine-burgundy/10 rounded-full mb-6 mx-auto">
                  <Factory className="w-8 h-8 text-wine-burgundy" />
                </div>
                <div className="text-3xl font-bold text-wine-burgundy mb-2">
                  {t('jusqua')} 55%
                </div>
                <div className="text-xl font-semibold text-wine-burgundy mb-3">
                  {formatToKt(totalAccessible)}
                </div>
                <div className="text-sm font-medium text-wine-charcoal mb-2">
                  {t('total.accessible')}
                </div>
                <div className="text-xs text-wine-charcoal/70">
                  {t('with.partnerships')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Producing Communes - KEPT as requested */}
        <section className="mb-16">
          <TopCommunes />
        </section>

        {/* Valorization Chart */}
        <section className="mb-16">
          <ValoorizationChart />
        </section>

        {/* UPDATED SAF News Section with IATA highlights */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('actualites.secteur.saf')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('projets.developpement.filiere')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* IATA Global Outlook */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-wine-charcoal mb-2">
                    {t('iata.global.feedstock')}
                  </h3>
                  <div className="text-sm text-blue-600 font-semibold mb-3">
                    {t('iata.report.2025')}
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-wine-charcoal/80">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span><strong>500 Mt</strong> {t('iata.saf.needed.2050')} • <strong>400 Mt</strong> {t('iata.forecast.achievable')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span><strong>70%</strong> {t('iata.agricultural.residues.europe')} • {t('iata.wine.waste.category')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-wine-burgundy rounded-full flex-shrink-0"></div>
                  <span><strong>{t('iata.etj.pathway')}</strong> • TRL 7-8 • {t('iata.wine.to.ethanol')}</span>
                </div>
              </div>
            </div>

            {/* French SAF Industry */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Factory className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-wine-charcoal mb-2">
                    {t('total.energies')}
                  </h3>
                  <div className="text-sm text-green-600 font-semibold mb-3">
                    {t('strategie.saf.france.2030')}
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-wine-charcoal/80">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span>{t('investissement')}: <strong>€500M</strong> {t('sur.5.ans')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span>{t('objectif')}: <strong>1.5M t</strong> {t('saf.capacite.annuelle')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-wine-burgundy rounded-full flex-shrink-0"></div>
                  <span>{t('partenariats')}: <strong>25</strong> {t('fournisseurs.biomasse')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVISED Regulatory Context Section - Enhanced emphasis */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-wine-burgundy/5 to-wine-charcoal/5 rounded-xl p-8 shadow-elegant border border-wine-cream/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
                {t('contexte.reglementaire')}
              </h2>
              <p className="text-lg text-wine-charcoal/70">
                {t('regulatory.framework.advantage')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/90 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-wine-burgundy mb-2">2%</div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">ReFuelEU Aviation</div>
                  <div className="text-xs text-wine-charcoal/70">SAF minimum 2025</div>
                </div>
              </div>
              
              <div className="bg-white/90 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-wine-burgundy mb-2">€4B</div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">France 2030</div>
                  <div className="text-xs text-wine-charcoal/70">Fonds verts</div>
                </div>
              </div>
              
              <div className="bg-white/90 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-wine-burgundy mb-2">€210B</div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">EU REPowerEU</div>
                  <div className="text-xs text-wine-charcoal/70">Énergies renouvelables</div>
                </div>
              </div>
              
              <div className="bg-white/90 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-wine-burgundy mb-2">2050</div>
                  <div className="text-sm font-semibold text-wine-charcoal mb-1">CORSIA ICAO</div>
                  <div className="text-xs text-wine-charcoal/70">Neutralité carbone</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="bg-wine-burgundy/10 rounded-lg p-4 inline-block">
                <p className="text-wine-charcoal font-medium">
                  {t('notre.projet.dynamique')} → {t('voir.onglet.economie')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OverviewTab;
