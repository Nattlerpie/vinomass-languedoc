import { Grape, Plane, Building, Users, Euro, TrendingDown, Award, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const StakeholderBenefits = () => {
  const { t } = useLanguage();
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant hover:shadow-wine transition-all duration-500">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl text-wine-charcoal">
          <Users className="text-wine-burgundy" size={28} />
          {t("stakeholders.title")}
        </CardTitle>
        <p className="text-wine-charcoal/70">
          {t("stakeholders.subtitle")}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: t("stakeholders.wine.producers"),
              icon: Grape,
              color: "wine-burgundy",
              primaryBenefit: t("stakeholders.new.revenue")
            },
            {
              title: t("stakeholders.saf.producers"),
              icon: Plane,
              color: "wine-gold",
              primaryBenefit: t("stakeholders.reliable.feedstock")
            },
            {
              title: t("stakeholders.airlines"),
              icon: Building,
              color: "wine-green",
              primaryBenefit: t("stakeholders.carbon.compliance")
            },
            {
              title: t("stakeholders.tourism"),
              icon: Users,
              color: "wine-charcoal",
              primaryBenefit: t("stakeholders.sustainability.marketing")
            }
          ].map((stakeholder, index) => {
            const IconComponent = stakeholder.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 border-${stakeholder.color}/20 bg-gradient-to-br from-${stakeholder.color}/5 to-${stakeholder.color}/10 hover:scale-[1.02] transition-all duration-300 group`}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-full bg-${stakeholder.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={28} className={`text-${stakeholder.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-wine-charcoal mb-2">
                      {stakeholder.title}
                    </h3>
                    <div className={`text-base font-semibold text-${stakeholder.color}`}>
                      {stakeholder.primaryBenefit}
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Euro size={16} className={`text-${stakeholder.color} mt-1 flex-shrink-0`} />
                    <div className="flex-1">
                      <div className="font-medium text-wine-charcoal text-sm mb-1">
                        {t("stakeholders.additional.revenue")}
                      </div>
                      <div className="text-sm text-wine-charcoal/70 mb-1">
                        €50-80 par tonne de marc valorisé
                      </div>
                      <div className={`text-xs font-medium text-${stakeholder.color}`}>
                        → Nouveau flux de revenus
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment & ROI */}
                <div className="pt-4 border-t border-wine-cream/40 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-wine-charcoal/70">{t("stakeholders.investment")}</span>
                    <span className="font-medium text-wine-charcoal">
                      Minimal - adaptation collecte
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-wine-charcoal/70">{t("stakeholders.roi")}</span>
                    <span className={`font-medium text-${stakeholder.color}`}>
                      Immédiat dès signature contrat
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 bg-gradient-wine rounded-xl text-center">
          <h4 className="text-xl font-bold text-wine-cream mb-3">
            {t("stakeholders.create.ecosystem")}
          </h4>
          <p className="text-wine-cream/80 text-base">
            {t("stakeholders.leadership.opportunity")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StakeholderBenefits;