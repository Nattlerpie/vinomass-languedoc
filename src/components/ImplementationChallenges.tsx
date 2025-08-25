import { AlertTriangle, Calendar, Truck, CheckCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ImplementationChallenges = () => {
  const { t } = useLanguage();
  const challenges = [
    {
      title: t("challenges.seasonal.availability"),
      icon: Calendar,
      level: t("challenges.high")
    },
    {
      title: t("challenges.collection.logistics"),
      icon: Truck,
      level: t("challenges.medium")
    },
    {
      title: t("challenges.quality.standards"),
      icon: CheckCircle,
      level: t("challenges.medium")
    },
    {
      title: t("challenges.regulatory.compliance"),
      icon: FileText,
      level: t("challenges.high")
    }
  ];

  const getLevelColor = (level: string) => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel === t("challenges.high").toLowerCase()) {
      return 'text-red-600 bg-red-50 border-red-200';
    } else if (normalizedLevel === t("challenges.medium").toLowerCase()) {
      return 'text-wine-gold bg-wine-gold/10 border-wine-gold/30';
    } else if (normalizedLevel === t("challenges.low").toLowerCase()) {
      return 'text-wine-green bg-wine-green/10 border-wine-green/30';
    } else {
      return 'text-wine-charcoal bg-wine-charcoal/10 border-wine-charcoal/30';
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant hover:shadow-wine transition-all duration-500">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl text-wine-charcoal">
          <AlertTriangle className="text-wine-burgundy" size={28} />
          {t("challenges.title")}
        </CardTitle>
        <p className="text-wine-charcoal/70">
          {t("challenges.subtitle")}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {challenges.map((challenge, index) => {
            const IconComponent = challenge.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border-2 border-wine-cream/40 bg-gradient-subtle hover:border-wine-burgundy/30 transition-all duration-300 hover:scale-[1.01] group"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-wine-burgundy/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={24} className="text-wine-burgundy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-wine-charcoal">
                        {challenge.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(challenge.level)}`}>
                        {challenge.level}
                      </span>
                    </div>
                    <p className="text-wine-charcoal/70 text-sm">
                      Production de marc concentrée sur 2-3 mois
                    </p>
                  </div>
                </div>

                {/* Solutions */}
                <div className="mb-4">
                  <h4 className="font-semibold text-wine-charcoal mb-3 text-sm">{t("challenges.proposed.solutions")}</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-wine-green mt-2 flex-shrink-0" />
                      <span className="text-wine-charcoal/80">Stockage silo de 6 mois minimum</span>
                    </li>
                  </ul>
                </div>

                {/* Mitigation Strategy */}
                <div className="p-4 bg-wine-green/5 rounded-lg border border-wine-green/20">
                  <h4 className="font-semibold text-wine-green mb-2 text-sm">{t("challenges.mitigation.strategy")}</h4>
                  <p className="text-wine-charcoal/80 text-sm">Infrastructure de stockage adaptée</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Assessment Summary */}
        <div className="mt-8 p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40">
          <h4 className="font-bold text-wine-charcoal mb-4 text-lg">{t("challenges.risk.assessment")}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-wine-cream/30">
              <div className="text-xl font-bold text-wine-green mb-2">85%</div>
              <div className="text-sm text-wine-charcoal/70">{t("challenges.identified.risks")}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-wine-cream/30">
              <div className="text-xl font-bold text-wine-burgundy mb-2">72%</div>
              <div className="text-sm text-wine-charcoal/70">{t("challenges.validated.solutions")}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-wine-cream/30">
              <div className="text-xl font-bold text-wine-gold mb-2">{t("challenges.medium")}</div>
              <div className="text-sm text-wine-charcoal/70">{t("challenges.global.risk.level")}</div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-6 p-4 bg-wine-burgundy/5 rounded-lg border border-wine-burgundy/20">
          <h4 className="font-semibold text-wine-burgundy mb-3 text-base">{t("challenges.priority.actions")}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-wine-burgundy rounded-full" />
              <span className="text-wine-charcoal/80">Étude détaillée stockage (Q1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-wine-burgundy rounded-full" />
              <span className="text-wine-charcoal/80">Accompagnement réglementaire (Q1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-wine-burgundy rounded-full" />
              <span className="text-wine-charcoal/80">Cartographie logistique (Q2)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-wine-burgundy rounded-full" />
              <span className="text-wine-charcoal/80">Standards qualité (Q2)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImplementationChallenges;