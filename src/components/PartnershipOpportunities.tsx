import { Grape, Plane, Users, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnershipOpportunities = () => {
  const { t } = useLanguage();
  
  const partnerships = [
    {
      title: t("partnerships.wine.producers"),
      description: t("partnerships.waste.available"),
      detail: "Partenariat avec les producteurs viticoles pour sécuriser l'approvisionnement en marc de raisin",
      icon: Grape,
      color: "wine-burgundy"
    },
    {
      title: t("partnerships.saf.companies"),
      description: t("partnerships.growing.demand"),
      detail: "Collaboration avec les producteurs de carburant aviation durable pour répondre à la demande croissante",
      icon: Plane,
      color: "wine-gold"
    },
    {
      title: t("partnerships.tourism.operators"),
      description: t("partnerships.sustainability.storytelling"),
      detail: "Valorisation de l'image durable auprès des opérateurs touristiques et compagnies aériennes",
      icon: Users,
      color: "wine-green"
    },
    {
      title: t("partnerships.regional.government"),
      description: t("partnerships.circular.economy"),
      detail: "Accompagnement public pour développer l'économie circulaire et les filières durables",
      icon: Building,
      color: "wine-charcoal"
    }
  ];
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-wine-charcoal mb-2">
          {t("partnerships.title")}
        </h3>
        <p className="text-sm text-wine-charcoal/70">
          {t("partnerships.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partnerships.map((partnership, index) => {
          const IconComponent = partnership.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-lg border-2 border-${partnership.color}/20 bg-gradient-to-br from-${partnership.color}/5 to-${partnership.color}/10 hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full bg-${partnership.color}/20 flex items-center justify-center flex-shrink-0`}>
                  <IconComponent size={24} className={`text-${partnership.color}`} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-wine-charcoal">
                    {partnership.title}
                  </h4>
                  <div className={`text-sm font-medium text-${partnership.color}`}>
                    {partnership.description}
                  </div>
                  <p className="text-sm text-wine-charcoal/70 leading-relaxed">
                    {partnership.detail}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-subtle rounded-full px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-wine-burgundy" />
          <span className="text-sm font-medium text-wine-charcoal">
            {t("partnerships.strategic.note")}
          </span>
          <div className="w-2 h-2 rounded-full bg-wine-gold" />
        </div>
      </div>
    </div>
  );
};

export default PartnershipOpportunities;