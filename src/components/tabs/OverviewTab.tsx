import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const OverviewTab = () => {
  const { currentData } = useRegion();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Key Statistics */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('header.title').replace('{region}', currentData.name)}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            {t('header.subtitle')}
          </p>
        </div>

        {/* Points Clés Hero Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              {t('points.cles')}
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              {t('points.cles.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {currentData.vineyardSurface.toLocaleString()}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('superficie.viticole')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('hectares')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('base.regionale')}</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {currentData.annualPomace.toLocaleString()}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('production.marc')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('matiere.premiere')}</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {currentData.wasteAllocation?.available.toLocaleString() || '80,000'}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('allocation.flux')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">30% {t('disponible.saf')}</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {(currentData.safPotential / 1000000).toFixed(1)}M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('potentiel.saf')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('litres.an')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">
                Basé sur {currentData.wasteAllocation?.available.toLocaleString() || '80,000'}t disponibles
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300 group relative">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                €{currentData.revenue}M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('revenue.potential')}</div>
              <div className="text-sm text-wine-charcoal/60">/an</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('prix.marche')}</div>
              
              {/* Hover tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-3 rounded-lg shadow-lg text-xs whitespace-nowrap z-10">
                {(currentData.safPotential / 1000000).toFixed(1)}M L × €1.22/L (prix marché ATJ - source: Aviation Fuel Analytics)
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {currentData.co2Reduction.toLocaleString()}
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
            <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-4 mt-6">
              <h4 className="text-sm font-bold text-wine-charcoal mb-2">{t('strategie.biomasse')}</h4>
              <div className="text-xs text-wine-charcoal/70 space-y-1">
                <div>• <span className="font-medium">{t('base.conservative')}:</span> 30% disponible ({currentData.wasteAllocation?.available.toLocaleString() || '80,000'}t) - {t('flux.elimination')}</div>
                <div>• <span className="font-medium">{t('potentiel.negociable')}:</span> +25% ({currentData.wasteAllocation?.negotiable.toLocaleString() || '66,000'}t) - {t('surplus.excedents')}</div>
                <div>• <span className="font-medium">{t('total.accessible')}:</span> Jusqu'à 55% ({((currentData.wasteAllocation?.available || 80000) + (currentData.wasteAllocation?.negotiable || 66000)).toLocaleString()}t) {t('avec.partenariats')}</div>
              </div>
              <p className="text-xs text-wine-charcoal/60 mt-3 italic">
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
                {currentData.id === 'languedoc' ? '1er' : 'Premium'}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">
                {currentData.id === 'languedoc' ? t('region.viticole.francaise') : t('region.premium.champagne')}
              </div>
              <div className="text-sm text-wine-charcoal/60">
                {currentData.id === 'languedoc' ? t('volume.production') : t('marche.prestige')}
              </div>
            </div>
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {currentData.id === 'languedoc' ? '38%' : '3%'}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('production.nationale')}</div>
              <div className="text-sm text-wine-charcoal/60">
                {currentData.id === 'languedoc' 
                  ? `12 ${t('millions.hectolitres')}` 
                  : `3.5 ${t('millions.hectolitres')} (${t('segment.premium')})`
                }
              </div>
            </div>
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                €{currentData.id === 'languedoc' ? '3.2B' : '5.2B'}
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
              <h3 className="text-xl font-bold text-wine-burgundy mb-3">HAFFNER ENERGY</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-3">Bioraffinerie Marolles-en-Hurepoix (Essonne)</h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">{t('investissement')}:</span> €180M</div>
                <div>• <span className="font-medium">{t('capacite')}:</span> 50,000 {t('tonnes.saf.an')} {t('des.2025')}</div>
                <div>• <span className="font-medium">{t('technologie')}:</span> Biomasse-to-liquids (BTL)</div>
                <div>• <span className="font-medium">{t('partenariat')}:</span> Région Île-de-France</div>
              </div>
            </div>

            {/* LANZAJET */}
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-gold/10">
              <h3 className="text-xl font-bold text-wine-gold mb-3">LANZAJET</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-3">Freedom Pines Fuels - Partenariat Total Energies</h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">Premier site commercial ATJ en Europe</span></div>
                <div>• <span className="font-medium">{t('capacite')}:</span> 125,000 {t('tonnes.saf.an')}</div>
                <div>• <span className="font-medium">Feedstock:</span> Éthanol de déchets agricoles</div>
                <div>• <span className="font-medium">Certification:</span> ASTM D7566 approuvée</div>
              </div>
            </div>

            {/* Airbus */}
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-green/10">
              <h3 className="text-xl font-bold text-wine-green mb-3">AIRBUS</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-3">Programme ZEROe - Carburants Verts</h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">{t('objectif')}:</span> Avion hydrogène 2035</div>
                <div>• <span className="font-medium">SAF transition:</span> 10% {t('minimum.2030')}</div>
                <div>• <span className="font-medium">Partenariats:</span> 15 aéroports français équipés</div>
                <div>• <span className="font-medium">{t('budget.rd')}:</span> €15 {t('milliards')} {t('mobilises')}</div>
              </div>
            </div>

            {/* Total Energies */}
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-burgundy/10">
              <h3 className="text-xl font-bold text-wine-burgundy mb-3">TOTAL ENERGIES</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-3">Stratégie SAF France 2030</h4>
              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">{t('investissement')}:</span> €500M {t('sur.ans', { years: '5' })}</div>
                <div>• <span className="font-medium">{t('objectif')}:</span> 1.5M {t('tonnes.saf.an')} capacité</div>
                <div>• <span className="font-medium">Bioraffineries:</span> 6 sites {t('modernises')}</div>
                <div>• <span className="font-medium">Partenariats:</span> 25 {t('fournisseurs.biomasse')}</div>
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
