import AdvancedROICalculator from "../AdvancedROICalculator";
import CostBenefitAnalysis from "../CostBenefitAnalysis";
import SensitivityAnalysis from "../SensitivityAnalysis";
import EconomicProjections from "../EconomicProjections";

const EconomyTab = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Advanced ROI Calculator */}
      <div className="animate-fade-in">
        <AdvancedROICalculator />
      </div>
      
      {/* Cost-Benefit Analysis */}
      <div className="animate-fade-in">
        <CostBenefitAnalysis />
      </div>
      
      {/* Sensitivity Analysis */}
      <div className="animate-fade-in">
        <SensitivityAnalysis />
      </div>
      
      {/* Economic Projections */}
      <div className="animate-fade-in">
        <EconomicProjections />
      </div>

      {/* Economic Context */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 animate-fade-in">
        <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">
          Contexte Économique SAF
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Market Context */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-wine-burgundy">Contexte Marché</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="text-lg font-bold text-wine-charcoal mb-2">Mandat UE RefuelEU Aviation</div>
                <div className="text-sm text-wine-charcoal/70">2% SAF en 2025, 6% en 2030, 70% en 2050</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="text-lg font-bold text-wine-charcoal mb-2">Prix Kérosène vs SAF</div>
                <div className="text-sm text-wine-charcoal/70">€0.65/L vs €2.50-4.00/L (premium 3-5x)</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="text-lg font-bold text-wine-charcoal mb-2">Demande Européenne 2030</div>
                <div className="text-sm text-wine-charcoal/70">8.5 millions de tonnes SAF requis</div>
              </div>
            </div>
          </div>

          {/* Investment Returns */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-wine-gold">Retours Investissement</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="text-lg font-bold text-wine-charcoal mb-2">ROI Projet (3 ans)</div>
                <div className="text-sm text-wine-charcoal/70">12-18% selon capacité et partenariats</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="text-lg font-bold text-wine-charcoal mb-2">Break-even</div>
                <div className="text-sm text-wine-charcoal/70">24-30 mois post mise en service</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="text-lg font-bold text-wine-charcoal mb-2">Chiffre d'affaires An 5</div>
                <div className="text-sm text-wine-charcoal/70">€25-40M selon expansion régionale</div>
              </div>
            </div>
          </div>
        </div>

        {/* Financing Options */}
        <div className="bg-wine-cream/10 rounded-lg p-6">
          <h4 className="text-lg font-bold text-wine-charcoal mb-4">Options de Financement</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-wine-burgundy mb-1">€50M</div>
              <div className="text-sm text-wine-charcoal/70">Fonds propres requis</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">30-40% investissement total</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-wine-gold mb-1">€75M</div>
              <div className="text-sm text-wine-charcoal/70">Dette bancaire</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">Taux 4-6% selon garanties</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-wine-green mb-1">€25M</div>
              <div className="text-sm text-wine-charcoal/70">Subventions EU/État</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">Innovation Fund, France 2030</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-wine-charcoal mb-1">€150M</div>
              <div className="text-sm text-wine-charcoal/70">Investment total</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">Capacité 100kt SAF/an</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomyTab;