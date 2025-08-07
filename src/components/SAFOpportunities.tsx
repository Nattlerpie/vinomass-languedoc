import { ArrowRight, Plane, Leaf, Fuel } from "lucide-react";

const SAFOpportunities = () => {
  // Realistic conversion: ~1 tonne of biomass produces ~200-300L of SAF
  const grapePomageTonnes = 266000;
  const safLitersPerTonne = 250; // Conservative estimate
  const totalSAFLiters = grapePomageTonnes * safLitersPerTonne;
  const co2ReductionPerLiter = 2.5; // kg CO2 reduction per liter vs conventional jet fuel
  const totalCO2Reduction = (totalSAFLiters * co2ReductionPerLiter) / 1000; // in tonnes

  const conversionSteps = [
    {
      title: "Marc de raisin",
      value: "266 000",
      unit: "tonnes",
      icon: Leaf,
      color: "wine-green"
    },
    {
      title: "Conversion biomasse",
      description: "Pyrolyse + raffinage",
      icon: Fuel,
      color: "wine-gold"
    },
    {
      title: "Carburant aviation durable",
      value: (totalSAFLiters / 1000000).toFixed(1),
      unit: "millions de litres",
      icon: Plane,
      color: "wine-burgundy"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-wine-charcoal mb-2">
          Opportunités SAF (Sustainable Aviation Fuel)
        </h3>
        <p className="text-sm text-wine-charcoal/70">
          Valorisation du marc de raisin en carburant aviation durable
        </p>
      </div>

      {/* Conversion Flow */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto">
        {conversionSteps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="flex items-center">
              <div className="text-center min-w-[140px]">
                <div className={`w-16 h-16 rounded-full bg-gradient-subtle border-2 border-${step.color}/20 flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent size={28} className={`text-${step.color}`} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-wine-charcoal">
                    {step.title}
                  </div>
                  {step.value && (
                    <div className={`text-lg font-bold text-${step.color}`}>
                      {step.value}
                    </div>
                  )}
                  {step.unit && (
                    <div className="text-xs text-wine-charcoal/70">
                      {step.unit}
                    </div>
                  )}
                  {step.description && (
                    <div className="text-xs text-wine-charcoal/70">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              {index < conversionSteps.length - 1 && (
                <ArrowRight size={24} className="text-wine-charcoal/50 mx-4 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-wine-cream/30">
        <div className="text-center p-4 bg-gradient-subtle rounded-lg">
          <div className="text-2xl font-bold text-wine-burgundy">
            {(totalSAFLiters / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-wine-charcoal/70">
            Litres SAF potentiels
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-subtle rounded-lg">
          <div className="text-2xl font-bold text-wine-green">
            {totalCO2Reduction.toLocaleString('fr-FR')}
          </div>
          <div className="text-sm text-wine-charcoal/70">
            Tonnes CO₂ évitées/an
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-subtle rounded-lg">
          <div className="text-2xl font-bold text-wine-gold">
            ~25%
          </div>
          <div className="text-sm text-wine-charcoal/70">
            Taux de conversion
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-wine-charcoal/60">
          * Estimations basées sur les technologies actuelles de conversion biomasse-to-liquids
        </p>
      </div>
    </div>
  );
};

export default SAFOpportunities;