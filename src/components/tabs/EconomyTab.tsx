import AdvancedROICalculator from "../AdvancedROICalculator";
import CostBenefitAnalysis from "../CostBenefitAnalysis";
import SensitivityAnalysis from "../SensitivityAnalysis";
import EconomicProjections from "../EconomicProjections";

const EconomyTab = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - ROI Calculator */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Analyse Économique
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            Modélisation financière et projections de rentabilité
          </p>
        </div>
        
        <div className="mb-8">
          <AdvancedROICalculator />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Analysis Tools Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Outils d'Analyse
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Analyses coûts-bénéfices et sensibilité aux paramètres
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="space-y-6">
            <CostBenefitAnalysis />
          </div>
          <div className="space-y-6">
            <SensitivityAnalysis />
          </div>
        </div>
        
        <div className="w-full">
          <EconomicProjections />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Market Context Section */}
      <section className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
              Contexte Économique SAF
            </h2>
            <p className="text-lg text-wine-charcoal/70">
              Marché européen et opportunités d'investissement
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Market Context */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-wine-burgundy mb-6">Contexte Marché</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
                  <div className="text-xl font-bold text-wine-charcoal mb-3">Mandat UE RefuelEU Aviation</div>
                  <div className="text-wine-charcoal/70">2% SAF en 2025, 6% en 2030, 70% en 2050</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
                  <div className="text-xl font-bold text-wine-charcoal mb-3">Prix Kérosène vs SAF</div>
                  <div className="text-wine-charcoal/70">€0.65/L vs €1.22/L (données actuelles)</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
                  <div className="text-xl font-bold text-wine-charcoal mb-3">Demande Européenne 2030</div>
                  <div className="text-wine-charcoal/70">8.5 millions de tonnes SAF requis</div>
                </div>
              </div>
            </div>

            {/* Investment Returns */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-wine-gold mb-6">Retours Investissement</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
                  <div className="text-xl font-bold text-wine-charcoal mb-3">Chiffre d'affaires annuel</div>
                  <div className="text-wine-charcoal/70">€90.9M (266 000t × 280L × €1.22)</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
                  <div className="text-xl font-bold text-wine-charcoal mb-3">Break-even</div>
                  <div className="text-wine-charcoal/70">24-30 mois post mise en service</div>
                </div>
                <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
                  <div className="text-xl font-bold text-wine-charcoal mb-3">Coûts de collecte</div>
                  <div className="text-wine-charcoal/70">€30-50/tonne selon distance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Financing Options */}
          <div className="bg-wine-cream/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">Options de Financement</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-burgundy/10">
                <div className="text-3xl font-bold text-wine-burgundy mb-3">€50M</div>
                <div className="text-lg font-semibold text-wine-charcoal mb-2">Fonds propres requis</div>
                <div className="text-sm text-wine-charcoal/60">30-40% investissement total</div>
              </div>
              <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-gold/10">
                <div className="text-3xl font-bold text-wine-gold mb-3">€75M</div>
                <div className="text-lg font-semibold text-wine-charcoal mb-2">Dette bancaire</div>
                <div className="text-sm text-wine-charcoal/60">Taux 4-6% selon garanties</div>
              </div>
              <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-green/10">
                <div className="text-3xl font-bold text-wine-green mb-3">€25M</div>
                <div className="text-lg font-semibold text-wine-charcoal mb-2">Subventions EU/État</div>
                <div className="text-sm text-wine-charcoal/60">Innovation Fund, France 2030</div>
              </div>
              <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-charcoal/10">
                <div className="text-3xl font-bold text-wine-charcoal mb-3">€150M</div>
                <div className="text-lg font-semibold text-wine-charcoal mb-2">Investment total</div>
                <div className="text-sm text-wine-charcoal/60">Capacité 100kt SAF/an</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EconomyTab;