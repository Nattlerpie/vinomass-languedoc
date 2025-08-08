import { CheckCircle, Clock, Target, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const timelinePhases = [
  {
    year: "Année 1",
    title: "Partenariat & Pilote",
    status: "planning",
    description: "Établissement des partenariats et test de faisabilité",
    milestones: [
      "Signature accords avec domaines partenaires",
      "Étude de faisabilité technique détaillée",
      "Pilote de collecte et conversion (100t)",
      "Validation qualité SAF produit",
      "Obtention autorisations préliminaires"
    ],
    keyDecisions: [
      "Choix des domaines partenaires stratégiques",
      "Sélection technologie de conversion",
      "Validation modèle économique"
    ]
  },
  {
    year: "Année 2", 
    title: "Infrastructure",
    status: "future",
    description: "Construction des installations et mise en place de la chaîne logistique",
    milestones: [
      "Construction unité de conversion (10,000t/an)",
      "Mise en place réseau de collecte",
      "Formation équipes opérationnelles",
      "Certification ISCC-EU pour SAF",
      "Tests de montée en charge"
    ],
    keyDecisions: [
      "Localisation optimale des installations",
      "Capacité de production initiale",
      "Partenariats logistiques"
    ]
  },
  {
    year: "Année 3",
    title: "Production Complète", 
    status: "future",
    description: "Déploiement commercial et optimisation opérationnelle",
    milestones: [
      "Production commerciale 50,000t marc/an",
      "Contrats long-terme avec compagnies aériennes",
      "Expansion réseau domaines partenaires",
      "Optimisation rendements de conversion",
      "ROI positif atteint"
    ],
    keyDecisions: [
      "Stratégie d'expansion géographique", 
      "Diversification produits (biocarburants)",
      "Partenariats internationaux"
    ]
  }
];

const ProjectTimeline = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return <Clock className="text-wine-gold" size={24} />;
      case 'in-progress':
        return <Target className="text-wine-burgundy" size={24} />;
      case 'completed':
        return <CheckCircle className="text-wine-green" size={24} />;
      default:
        return <AlertCircle className="text-wine-charcoal" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'border-wine-gold/30 bg-wine-gold/5';
      case 'in-progress':
        return 'border-wine-burgundy/30 bg-wine-burgundy/5';
      case 'completed':
        return 'border-wine-green/30 bg-wine-green/5';
      default:
        return 'border-wine-charcoal/30 bg-wine-charcoal/5';
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant hover:shadow-wine transition-all duration-500">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl text-wine-charcoal">
          <Target className="text-wine-burgundy" size={28} />
          Roadmap Projet SAF
        </CardTitle>
        <p className="text-wine-charcoal/70">
          Planning stratégique sur 3 ans avec jalons clés et points de décision
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-8">
          {timelinePhases.map((phase, index) => (
            <div 
              key={index}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${getStatusColor(phase.status)}`}
            >
              {/* Phase Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(phase.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-wine-charcoal">{phase.year}</h3>
                    <span className="text-lg font-semibold text-wine-burgundy">{phase.title}</span>
                  </div>
                  <p className="text-wine-charcoal/70 text-base">{phase.description}</p>
                </div>
              </div>

              {/* Two-column layout for milestones and decisions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Milestones */}
                <div>
                  <h4 className="font-semibold text-wine-charcoal mb-3 text-base">Jalons clés</h4>
                  <ul className="space-y-2">
                    {phase.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-wine-burgundy mt-2 flex-shrink-0" />
                        <span className="text-wine-charcoal/80">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Decisions */}
                <div>
                  <h4 className="font-semibold text-wine-charcoal mb-3 text-base">Points de décision</h4>
                  <ul className="space-y-2">
                    {phase.keyDecisions.map((decision, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-wine-gold mt-2 flex-shrink-0" />
                        <span className="text-wine-charcoal/80">{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connector line (except for last item) */}
              {index < timelinePhases.length - 1 && (
                <div className="absolute left-1/2 -bottom-4 w-0.5 h-8 bg-wine-burgundy/30 transform -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="mt-8 p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40">
          <h4 className="font-bold text-wine-charcoal mb-4 text-lg">Indicateurs de succès</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-burgundy mb-1">15M€</div>
              <div className="text-wine-charcoal/70">Chiffre d'affaires An 3</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-green mb-1">50+</div>
              <div className="text-wine-charcoal/70">Domaines partenaires</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-gold mb-1">12%</div>
              <div className="text-wine-charcoal/70">ROI projet</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTimeline;