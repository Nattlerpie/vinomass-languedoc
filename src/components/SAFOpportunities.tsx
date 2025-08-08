import { ArrowRight, Plane, Leaf, Beaker, Zap, Fuel } from "lucide-react";

const SAFOpportunities = () => {
  const grapePomageTonnes = 266000;
  const totalSAFLiters = 66500000; // 66.5 million liters as specified
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
      title: "Fermentation alcoolique",
      description: "Production d'éthanol",
      icon: Beaker,
      color: "wine-gold"
    },
    {
      title: "Distillation éthanol",
      description: "Purification",
      icon: Zap,
      color: "wine-burgundy"
    },
    {
      title: "Alcohol-to-Jet (ATJ)",
      description: "Conversion catalytique",
      icon: Fuel,
      color: "wine-charcoal"
    },
    {
      title: "Carburant Aviation Durable",
      value: "66,5",
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
              <div className="text-center min-w-[120px]">
                <div className={`w-12 h-12 rounded-full bg-gradient-subtle border-2 border-${step.color}/20 flex items-center justify-center mx-auto mb-2`}>
                  <IconComponent size={20} className={`text-${step.color}`} />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-wine-charcoal text-center">
                    {step.title}
                  </div>
                  {step.value && (
                    <div className={`text-sm font-bold text-${step.color}`}>
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
                <ArrowRight size={16} className="text-wine-charcoal/50 mx-2 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-wine-cream/30">
        <div className="text-center p-4 bg-gradient-subtle rounded-lg">
          <div className="text-2xl font-bold text-wine-burgundy">
            66,5M
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