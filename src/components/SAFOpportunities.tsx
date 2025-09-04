import { ArrowRight, Plane, Leaf, Beaker, Zap, Fuel } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const SAFOpportunities = () => {
  const { t } = useLanguage();
  const { currentData } = useRegion();
  const grapePomageTonnes = currentData.annualPomace;
  const totalSAFLiters = currentData.safPotential;
  const co2ReductionPerLiter = 2.75; // kg CO2 reduction per liter vs conventional jet fuel (corrected)
  const totalCO2Reduction = currentData.co2Reduction;

  const conversionSteps = [
    {
      title: t("saf.grape.marc"),
      value: grapePomageTonnes.toLocaleString('fr-FR'),
      unit: t("stats.tonnes"),
      icon: Leaf,
      color: "wine-green"
    },
    {
      title: t("saf.alcoholic.fermentation"),
      description: t("saf.ethanol.production"),
      icon: Beaker,
      color: "wine-gold"
    },
    {
      title: t("saf.ethanol.distillation"),
      description: t("saf.purification"),
      icon: Zap,
      color: "wine-burgundy"
    },
    {
      title: t("saf.alcohol.to.jet"),
      description: t("saf.catalytic.conversion"),
      icon: Fuel,
      color: "wine-charcoal"
    },
    {
      title: t("saf.sustainable.aviation.fuel"),
      value: (totalSAFLiters / 1000000).toFixed(1),
      unit: t("saf.millions.liters"),
      icon: Plane,
      color: "wine-burgundy"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-wine-charcoal mb-2">
          {t("saf.opportunities.title")}
        </h3>
        <p className="text-sm text-wine-charcoal/70">
          {t("saf.opportunities.subtitle")}
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
            {(totalSAFLiters / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-wine-charcoal/70">
            {t("saf.potential.liters")}
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-subtle rounded-lg">
          <div className="text-2xl font-bold text-wine-green">
            {totalCO2Reduction.toLocaleString('fr-FR')}
          </div>
          <div className="text-sm text-wine-charcoal/70">
            {t("saf.co2.avoided")}
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-subtle rounded-lg">
          <div className="text-2xl font-bold text-wine-gold">
            ~25%
          </div>
          <div className="text-sm text-wine-charcoal/70">
            {t("saf.conversion.rate")}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-wine-charcoal/60">
          {t("saf.estimates.note")}
        </p>
      </div>
    </div>
  );
};

export default SAFOpportunities;