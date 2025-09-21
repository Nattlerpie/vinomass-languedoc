import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Building, TrendingUp, Handshake, Target, ArrowRight, CheckCircle } from 'lucide-react';
import ImplementationTimeline from "../ImplementationTimeline";
import ContactIntegration from "../ContactIntegration";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnershipsTab = () => {
  const { currentData } = useRegion();
  const { t } = useLanguage();

  // Regional partnership framework data
  const frameworkMetrics = currentData.id === 'languedoc' ? {
    targetPartners: "25-40",
    communes: "15-25",
    producers: "60-100",
    industrials: "5-8",
    wasteReduction: 85,
    revenueOpportunity: 2.8
  } : {
    targetPartners: "15-25", 
    communes: "8-15",
    producers: "30-50",
    industrials: "3-5",
    wasteReduction: 75,
    revenueOpportunity: 1.2
  };

  // Industry examples with real data
  const industryExamples = [
    {
      model: t('partnerships.neste.model'),
      description: t('partnerships.neste.desc'),
      partners: "200+",
      feedstock: "Food waste",
      capacity: "1.5M tonnes/year"
    },
    {
      model: t('partnerships.bp.model'), 
      description: t('partnerships.bp.desc'),
      partners: "50+",
      feedstock: "Agricultural residues",
      capacity: "800k tonnes/year"
    },
    {
      model: t('partnerships.total.model'),
      description: t('partnerships.total.desc'),
      partners: "25",
      feedstock: "Mixed biomass",
      capacity: "500k tonnes/year"
    }
  ];

  // Partnership types framework
  const partnershipTypes = [
    {
      title: t('partnerships.collectivites.title'),
      description: t('partnerships.collectivites.desc'),
      icon: MapPin,
      benefits: [
        t('partnerships.benefits.waste.reduction'),
        t('partnerships.benefits.local.revenue'),
        t('partnerships.benefits.job.creation'),
        t('partnerships.benefits.carbon.goals')
      ],
      color: "wine-burgundy"
    },
    {
      title: t('partnerships.producers.title'),
      description: t('partnerships.producers.desc'),
      icon: Users,
      benefits: [
        t('partnerships.benefits.waste.valorization'),
        t('partnerships.benefits.additional.income'),
        t('partnerships.benefits.sustainability'),
        t('partnerships.benefits.cost.reduction')
      ],
      color: "wine-green"
    },
    {
      title: t('partnerships.industrial.title'),
      description: t('partnerships.industrial.desc'),
      icon: Building,
      benefits: [
        "Infrastructure existante",
        "Logistique optimisée", 
        "Expertise technique",
        "Économies d'échelle"
      ],
      color: "wine-gold"
    },
    {
      title: t('partnerships.institutional.title'),
      description: t('partnerships.institutional.desc'),
      icon: TrendingUp,
      benefits: [
        "Support réglementaire",
        "Financement public",
        "Validation scientifique",
        "Réseau institutionnel"
      ],
      color: "wine-charcoal"
    }
  ];

  // Implementation phases
  const implementationPhases = [
    {
      phase: t('partnerships.phase.pilot'),
      description: t('partnerships.phase.pilot.desc'),
      duration: "6-12 mois",
      partners: "5-10",
      volume: currentData.id === 'languedoc' ? "15-25k tonnes" : "3-5k tonnes"
    },
    {
      phase: t('partnerships.phase.scale'),
      description: t('partnerships.phase.scale.desc'),
      duration: "12-24 mois",
      partners: "15-25",
      volume: currentData.id === 'languedoc' ? "50-80k tonnes" : "10-15k tonnes"
    },
    {
      phase: t('partnerships.phase.mature'),
      description: t('partnerships.phase.mature.desc'),
      duration: "24+ mois",
      partners: frameworkMetrics.targetPartners,
      volume: currentData.id === 'languedoc' ? "80-120k tonnes" : "15-24k tonnes"
    }
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.title')}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-4xl mx-auto mb-6">
            {t('partnerships.subtitle')}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> {t('partnerships.framework.note')}
            </p>
          </div>
        </div>

        {/* Framework Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/95 border-wine-burgundy/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-burgundy">
                <Handshake className="w-5 h-5 mr-2" />
                {t('partnerships.types.needed')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">4</div>
              <div className="text-sm text-wine-charcoal/70">Types principaux</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-gold/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-gold">
                <Target className="w-5 h-5 mr-2" />
                Partenaires Cibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">{frameworkMetrics.targetPartners}</div>
              <div className="text-sm text-wine-charcoal/70">Objectif réseau</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-green/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-green">
                <TrendingUp className="w-5 h-5 mr-2" />
                Réduction Coûts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">{frameworkMetrics.wasteReduction}%</div>
              <div className="text-sm text-wine-charcoal/70">Traitement déchets</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-charcoal/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-charcoal">
                <ArrowRight className="w-5 h-5 mr-2" />
                Nouveaux Revenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">€{frameworkMetrics.revenueOpportunity}M</div>
              <div className="text-sm text-wine-charcoal/70">Potentiel annuel</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Partnership Types Framework */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.types.needed')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('partnerships.waste.to.revenue')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnershipTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <Card key={index} className="bg-white/95 border-wine-cream/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className={`flex items-center text-${type.color}`}>
                    <IconComponent className="w-6 h-6 mr-3" />
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wine-charcoal/70 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm text-wine-charcoal">
                        <CheckCircle className="w-4 h-4 mr-2 text-wine-green" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Industry Examples */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.industry.examples')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('partnerships.examples.subtitle')}
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-wine-cream/30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-wine-cream/30">
                  <th className="text-left p-4 font-semibold text-wine-charcoal">Modèle</th>
                  <th className="text-left p-4 font-semibold text-wine-charcoal">Description</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">Partenaires</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">Matière Première</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">Capacité</th>
                </tr>
              </thead>
              <tbody>
                {industryExamples.map((example, index) => (
                  <tr key={index} className="border-b border-wine-cream/20 hover:bg-wine-cream/10 transition-colors">
                    <td className="p-4 font-medium text-wine-charcoal">{example.model}</td>
                    <td className="p-4 text-wine-charcoal/70">{example.description}</td>
                    <td className="p-4 text-right font-semibold text-wine-burgundy">{example.partners}</td>
                    <td className="p-4 text-right text-wine-charcoal/70">{example.feedstock}</td>
                    <td className="p-4 text-right font-semibold text-wine-green">{example.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Implementation Phases */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.implementation.phases')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Approche progressive basée sur les meilleures pratiques sectorielles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {implementationPhases.map((phase, index) => (
            <Card key={index} className="bg-white/95 border-wine-cream/30 relative">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-wine-burgundy">{phase.phase}</CardTitle>
                  <div className="bg-wine-burgundy text-white text-sm px-3 py-1 rounded-full">
                    Phase {index + 1}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-wine-charcoal/70 mb-4">{phase.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-wine-charcoal/60">Durée:</span>
                    <span className="font-semibold text-wine-charcoal">{phase.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-wine-charcoal/60">Partenaires:</span>
                    <span className="font-semibold text-wine-charcoal">{phase.partners}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-wine-charcoal/60">Volume cible:</span>
                    <span className="font-semibold text-wine-green">{phase.volume}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Value Proposition */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.value.proposition')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Transformation des coûts de déchets en flux de revenus
          </p>
        </div>

        <div className="bg-gradient-to-r from-wine-burgundy/5 via-white to-wine-green/5 rounded-2xl p-8 border border-wine-cream/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wine-burgundy">{t('partnerships.current.costs')}</h3>
              <div className="space-y-2">
                <div className="bg-wine-burgundy/10 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-wine-burgundy">€45-65/t</div>
                  <div className="text-sm text-wine-charcoal/70">{t('partnerships.waste.disposal')}</div>
                </div>
                <div className="bg-wine-burgundy/10 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-wine-burgundy">€15-25/t</div>
                  <div className="text-sm text-wine-charcoal/70">{t('partnerships.transport.costs')}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="w-12 h-12 text-wine-gold" />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wine-green">Nouveaux Revenus</h3>
              <div className="space-y-2">
                <div className="bg-wine-green/10 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-wine-green">€25-40/t</div>
                  <div className="text-sm text-wine-charcoal/70">{t('partnerships.saf.revenue')}</div>
                </div>
                <div className="bg-wine-green/10 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-wine-green">€10-15/t</div>
                  <div className="text-sm text-wine-charcoal/70">{t('partnerships.carbon.credits')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-wine-gold/10 p-6 rounded-xl border border-wine-gold/20">
              <div className="text-3xl font-bold text-wine-gold mb-2">
                +€20-40/t
              </div>
              <div className="text-wine-charcoal/70">{t('partnerships.net.benefit')} par tonne</div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Implementation Timeline */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Planification Mise en Œuvre
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Roadmap et étapes clés du projet
          </p>
        </div>
        <ImplementationTimeline />
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Disclaimer */}
      <div className="bg-wine-cream/10 p-6 rounded-lg border border-wine-burgundy/10 mb-16">
        <p className="text-sm text-wine-charcoal/80 text-center">
          <strong>Méthodologie:</strong> {t('partnerships.framework.disclaimer')}
        </p>
      </div>

      {/* Contact Section */}
      <ContactIntegration />
    </div>
  );
};

export default PartnershipsTab;
