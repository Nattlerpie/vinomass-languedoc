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
  
  // Calculate total installations based on region infrastructure
  const totalInstallations = currentData.id === 'languedoc' ? 73 : 
                           currentData.id === 'champagne' ? 10 : 
                           45; // default for other regions
  
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

      {/* Hero Section - Enhanced with Value Proposition */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('header.title', { region: currentData.displayName })}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto mb-6">
            {t('header.subtitle')}
          </p>
          
          {/* Value Proposition Banner */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-wine-burgundy/10 to-wine-gold/10 border border-wine-gold/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-wine-charcoal mb-3">
                À partir de {(currentData.annualPomace / 1000).toFixed(0)}k t de déchets viticoles, valoriser {(availableBiomass / 1000).toFixed(0)}k t → {realisticSafProduction.toFixed(1)}M L de SAF
              </h2>
              <p className="text-lg text-wine-charcoal/80">
                Une opportunité de €{realisticRevenue}M/an qui respecte les filières existantes tout en créant une nouvelle chaîne de valeur durable
              </p>
            </div>
          </div>
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
                {(currentData.vineyardSurface / 1000).toFixed(0)} k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('superficie.viticole')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('hectares')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('base.regionale')}</div>
            </div>
            
            {/* 2. Production annuelle de déchets vitivinicoles */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-gold/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-gold mb-3">
                {(currentData.annualPomace / 1000).toFixed(0)} k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('production.dechets.vitivinicoles')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('tonnes')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('matiere.premiere.totale')}</div>
            </div>
            
            {/* 3. Allocation Réaliste des Flux */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-green/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-green mb-3">
                {(availableBiomass / 1000).toFixed(0)} k
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
                Basé sur {(availableBiomass / 1000).toFixed(0)} kt disponibles
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

      {/* Market Validation Section - REPOSITIONED for better flow */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Validation du Marché International
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Les dernières données IATA confirment l'opportunité stratégique
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* IATA Report Highlight */}
            <div className="lg:col-span-2 bg-gradient-subtle rounded-xl p-6 border border-wine-green/10">
              <h3 className="text-xl font-bold text-wine-green mb-3">IATA Global Feedstock Assessment 2025</h3>
              <h4 className="text-lg font-semibold text-wine-charcoal mb-4">Validation of Agricultural Residues Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-wine-charcoal/70">
                <div>• <span className="font-medium">Déficit SAF:</span> 100 Mt manquantes d'ici 2050</div>
                <div>• <span className="font-medium">Résidus Agricoles:</span> 58% des matières premières prioritaires</div>
                <div>• <span className="font-medium">Europe:</span> Top 4 mondial pour développement</div>
                <div>• <span className="font-medium">Technologie EtJ:</span> Voie validée pour matières agricoles</div>
              </div>
              <div className="text-xs text-wine-charcoal/50 mt-3 italic">
                Source: IATA Global Feedstock Assessment for SAF Production Outlook to 2050 - Janvier 2025
              </div>
            </div>
            
            {/* Market Opportunity */}
            <div className="bg-gradient-subtle rounded-xl p-6 border border-wine-burgundy/10">
              <h3 className="text-xl font-bold text-wine-burgundy mb-3">Opportunité de Marché</h3>
              <div className="space-y-3 text-sm text-wine-charcoal/70">
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-wine-burgundy">500 Mt</div>
                  <div className="text-xs">Demande SAF 2050</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-wine-gold">400 Mt</div>
                  <div className="text-xs">Production prévue</div>
                </div>
                <div className="text-center p-3 bg-wine-green/10 rounded-lg">
                  <div className="text-2xl font-bold text-wine-green">100 Mt</div>
                  <div className="text-xs">DÉFICIT À COMBLER</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>
      
      {/* Regional Implementation Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Mise en Œuvre Régionale
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Infrastructure existante et stratégie biomasse respectueuse
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            {/* TopCommunes WITHOUT RegionalMap (departmental distribution removed) */}
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
          <div className="space-y-4">
            <ValoorizationChart />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Regional Context Section - Consolidated */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Avantages Compétitifs Régionaux
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Infrastructure mature et leadership viticole français
            </p>
          </div>
          
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
            
            {/* Infrastructure établie */}
            <div className="text-center p-8 bg-gradient-subtle rounded-xl border border-wine-burgundy/10 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-wine-burgundy mb-3">
                {totalInstallations}
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">{t('chaines.etablies')}</div>
              <div className="text-sm text-wine-charcoal/60">{t('infrastructure.mature')}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t('capacite.existante')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Industry Momentum Section - Streamlined */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Dynamique Industrielle
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Projets de référence et soutien réglementaire
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Key Industry Projects */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wine-charcoal mb-4">Projets de Référence</h3>
              
              <div className="bg-gradient-subtle rounded-lg p-4 border border-wine-burgundy/10">
                <h4 className="font-bold text-wine-burgundy mb-2">Haffner Energy - France</h4>
                <div className="text-sm text-wine-charcoal/70">
                  €180M • 50,000 t SAF/an dès 2025 • Biomasse-to-Liquide
                </div>
              </div>
              
              <div className="bg-gradient-subtle rounded-lg p-4 border border-wine-gold/10">
                <h4 className="font-bold text-wine-gold mb-2">LanzaJet - États-Unis</h4>
                <div className="text-sm text-wine-charcoal/70">
                  125,000 t SAF/an • Éthanol agricole • Certification ASTM D7566
                </div>
              </div>
            </div>
            
            {/* Regulatory Support */}
            <div>
              <h3 className="text-xl font-bold text-wine-charcoal mb-4">Soutien Réglementaire</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-wine-burgundy">2%</div>
                  <div className="text-xs">SAF minimum 2025 (EU)</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-wine-gold">€4B</div>
                  <div className="text-xs">France 2030</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-wine-green">€210B</div>
                  <div className="text-xs">EU REPowerEU</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-wine-charcoal">2050</div>
                  <div className="text-xs">Neutralité carbone</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-wine-burgundy to-wine-gold text-white rounded-2xl p-8 lg:p-12 shadow-elegant text-center">
          <h2 className="text-3xl font-bold mb-4">
            Une Opportunité Stratégique à Saisir
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Transformer le défi des déchets viticoles en avantage concurrentiel SAF
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">🎯 Timing Optimal</div>
              <div className="text-sm opacity-80">Réglementation favorable + demande croissante</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">⚡ First-Mover</div>
              <div className="text-sm opacity-80">Contrainte = déploiement, pas ressources</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">🤝 Gagnant-Gagnant</div>
              <div className="text-sm opacity-80">Respecte filières + crée valeur</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
