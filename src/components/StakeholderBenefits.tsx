import { Grape, Plane, Building, Users, Euro, TrendingDown, Award, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stakeholders = [
  {
    title: "Producteurs Viticoles",
    icon: Grape,
    color: "wine-burgundy",
    primaryBenefit: "Nouveaux revenus + économies",
    benefits: [
      {
        icon: Euro,
        title: "Revenus additionnels",
        description: "€50-80 par tonne de marc valorisé",
        impact: "Nouveau flux de revenus"
      },
      {
        icon: TrendingDown,
        title: "Économies traitement",
        description: "€30-50/t économisés en frais d'élimination",
        impact: "Réduction coûts directs"
      },
      {
        icon: Award,
        title: "Image durable",
        description: "Certification économie circulaire",
        impact: "Différenciation marché"
      }
    ],
    investmentRequired: "Minimal - adaptation collecte",
    roi: "Immédiat dès signature contrat"
  },
  {
    title: "Producteurs SAF",
    icon: Plane,
    color: "wine-gold",
    primaryBenefit: "Feedstock fiable & local",
    benefits: [
      {
        icon: Award,
        title: "Approvisionnement sécurisé",
        description: "Contrats long-terme 5-10 ans",
        impact: "Stabilité opérationnelle"
      },
      {
        icon: TrendingDown,
        title: "Coûts compétitifs",
        description: "€200-300/t vs €400-500/t imports",
        impact: "Marge améliorée"
      },
      {
        icon: Award,
        title: "Compliance EU",
        description: "Respect mandats SAF européens",
        impact: "Accès marché garanti"
      }
    ],
    investmentRequired: "Infrastructure conversion",
    roi: "18-24 mois"
  },
  {
    title: "Compagnies Aériennes",
    icon: Building,
    color: "wine-green",
    primaryBenefit: "Objectifs carbone + compliance",
    benefits: [
      {
        icon: TrendingDown,
        title: "Réduction CO₂",
        description: "-80% émissions vs kérosène fossile",
        impact: "Conformité objectifs 2030"
      },
      {
        icon: Euro,
        title: "Prix prévisible",
        description: "Contrats long-terme vs volatilité",
        impact: "Planification budgétaire"
      },
      {
        icon: Megaphone,
        title: "Communication",
        description: "Histoire locale & authentique",
        impact: "Différenciation client"
      }
    ],
    investmentRequired: "Primes SAF temporaires",
    roi: "Conformité réglementaire"
  },
  {
    title: "Secteur Touristique",
    icon: Users,
    color: "wine-charcoal",
    primaryBenefit: "Marketing durabilité authentique",
    benefits: [
      {
        icon: Megaphone,
        title: "Storytelling unique",
        description: "Du vin au carburant aviation",
        impact: "Différenciation forte"
      },
      {
        icon: Award,
        title: "Certifications vertes",
        description: "Labels durabilité renforcés",
        impact: "Attractivité clientèle"
      },
      {
        icon: Building,
        title: "Écosystème régional",
        description: "Innovation visible pour visiteurs",
        impact: "Nouvelle attraction"
      }
    ],
    investmentRequired: "Marketing & communication",
    roi: "Attraction nouvelle clientèle"
  }
];

const StakeholderBenefits = () => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant hover:shadow-wine transition-all duration-500">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl text-wine-charcoal">
          <Users className="text-wine-burgundy" size={28} />
          Bénéfices par Partie Prenante
        </CardTitle>
        <p className="text-wine-charcoal/70">
          Arguments de valeur personnalisés pour chaque acteur de l'écosystème
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stakeholders.map((stakeholder, index) => {
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
                  {stakeholder.benefits.map((benefit, idx) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <BenefitIcon size={16} className={`text-${stakeholder.color} mt-1 flex-shrink-0`} />
                        <div className="flex-1">
                          <div className="font-medium text-wine-charcoal text-sm mb-1">
                            {benefit.title}
                          </div>
                          <div className="text-sm text-wine-charcoal/70 mb-1">
                            {benefit.description}
                          </div>
                          <div className={`text-xs font-medium text-${stakeholder.color}`}>
                            → {benefit.impact}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Investment & ROI */}
                <div className="pt-4 border-t border-wine-cream/40 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-wine-charcoal/70">Investissement:</span>
                    <span className="font-medium text-wine-charcoal">
                      {stakeholder.investmentRequired}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-wine-charcoal/70">ROI:</span>
                    <span className={`font-medium text-${stakeholder.color}`}>
                      {stakeholder.roi}
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
            Créons ensemble l'écosystème SAF régional
          </h4>
          <p className="text-wine-cream/80 text-base">
            Une opportunité de leadership dans la transition énergétique du transport aérien
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StakeholderBenefits;