import { AlertTriangle, Calendar, Truck, CheckCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const challenges = [
  {
    title: "Disponibilité Saisonnière",
    icon: Calendar,
    level: "Élevé",
    description: "Production de marc concentrée sur 2-3 mois (septembre-novembre)",
    solutions: [
      "Stockage silo de 6 mois minimum",
      "Diversification feedstock (lies, pépins)",
      "Partenariat multi-régions (hémisphères)"
    ],
    mitigation: "Infrastructure de stockage adaptée + diversification sources"
  },
  {
    title: "Logistique de Collecte",
    icon: Truck,
    level: "Moyen",
    description: "Collecte efficace chez 50+ domaines dispersés géographiquement",
    solutions: [
      "Points de collecte mutualisés",
      "Optimisation tournées (IA/ML)",
      "Partenariat transporteurs locaux"
    ],
    mitigation: "Réseau de hubs de collecte + digitalisation circuits"
  },
  {
    title: "Standards Qualité",
    icon: CheckCircle,
    level: "Moyen", 
    description: "Homogénéité qualité marc selon pratiques viticoles variables",
    solutions: [
      "Cahier des charges strict",
      "Contrôles qualité systématiques",
      "Formation producteurs partenaires"
    ],
    mitigation: "Processus qualité standardisé + traçabilité complète"
  },
  {
    title: "Conformité Réglementaire",
    icon: FileText,
    level: "Élevé",
    description: "Certification ISCC-EU, RED II, standards aviation (ASTM D7566)",
    solutions: [
      "Accompagnement experts réglementaires",
      "Certification progressive par étapes",
      "Veille réglementaire continue"
    ],
    mitigation: "Expertise réglementaire intégrée dès conception projet"
  }
];

const ImplementationChallenges = () => {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'élevé':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'moyen':
        return 'text-wine-gold bg-wine-gold/10 border-wine-gold/30';
      case 'faible':
        return 'text-wine-green bg-wine-green/10 border-wine-green/30';
      default:
        return 'text-wine-charcoal bg-wine-charcoal/10 border-wine-charcoal/30';
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant hover:shadow-wine transition-all duration-500">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl text-wine-charcoal">
          <AlertTriangle className="text-wine-burgundy" size={28} />
          Défis d'Implémentation
        </CardTitle>
        <p className="text-wine-charcoal/70">
          Identification proactive des risques et stratégies de mitigation
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
                      {challenge.description}
                    </p>
                  </div>
                </div>

                {/* Solutions */}
                <div className="mb-4">
                  <h4 className="font-semibold text-wine-charcoal mb-3 text-sm">Solutions proposées</h4>
                  <ul className="space-y-2">
                    {challenge.solutions.map((solution, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-wine-green mt-2 flex-shrink-0" />
                        <span className="text-wine-charcoal/80">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mitigation Strategy */}
                <div className="p-4 bg-wine-green/5 rounded-lg border border-wine-green/20">
                  <h4 className="font-semibold text-wine-green mb-2 text-sm">Stratégie de mitigation</h4>
                  <p className="text-wine-charcoal/80 text-sm">{challenge.mitigation}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Assessment Summary */}
        <div className="mt-8 p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40">
          <h4 className="font-bold text-wine-charcoal mb-4 text-lg">Évaluation des Risques</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-wine-cream/30">
              <div className="text-xl font-bold text-wine-green mb-2">85%</div>
              <div className="text-sm text-wine-charcoal/70">Risques identifiés</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-wine-cream/30">
              <div className="text-xl font-bold text-wine-burgundy mb-2">72%</div>
              <div className="text-sm text-wine-charcoal/70">Solutions validées</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-wine-cream/30">
              <div className="text-xl font-bold text-wine-gold mb-2">Moyen</div>
              <div className="text-sm text-wine-charcoal/70">Niveau de risque global</div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-6 p-4 bg-wine-burgundy/5 rounded-lg border border-wine-burgundy/20">
          <h4 className="font-semibold text-wine-burgundy mb-3 text-base">Actions prioritaires</h4>
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