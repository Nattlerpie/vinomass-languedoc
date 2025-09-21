import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Building, TrendingUp, Lightbulb, Target, ArrowRight } from 'lucide-react';
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnershipsTab = () => {
  const { currentData } = useRegion();
  const { t } = useLanguage();

  // Strategic framework data based on industry best practices
  const partnershipTypes = [
    {
      icon: MapPin,
      title: t('partnerships.collectivites.title'),
      description: t('partnerships.collectivites.desc'),
      color: 'wine-burgundy',
      benefits: [
        t('partnerships.benefits.waste.reduction'),
        t('partnerships.benefits.local.revenue'),
        t('partnerships.benefits.job.creation'),
        t('partnerships.benefits.carbon.goals')
      ]
    },
    {
      icon: Users,
      title: t('partnerships.producers.title'),
      description: t('partnerships.producers.desc'),
      color: 'wine-green',
      benefits: [
        t('partnerships.benefits.waste.valorization'),
        t('partnerships.benefits.additional.income'),
        t('partnerships.benefits.sustainability'),
        t('partnerships.benefits.cost.reduction')
      ]
    },
    {
      icon: Building,
      title: t('partnerships.industrial.title'),
      description: t('partnerships.industrial.desc'),
      color: 'wine-gold',
      benefits: [
        t('partnerships.logistics.optimization'),
        t('partnerships.feedstock.security'),
        'Infrastructure synergies',
        'Scale economies'
      ]
    },
    {
      icon: TrendingUp,
      title: t('partnerships.institutional.title'),
      description: t('partnerships.institutional.desc'),
      color: 'wine-charcoal',
      benefits: [
        t('partnerships.regulatory.compliance'),
        'Funding support',
        'Policy alignment',
        'Market development'
      ]
    }
  ];

  // Industry examples based on real SAF projects
  const industryExamples = [
    {
      title: t('partnerships.neste.model'),
      description: t('partnerships.neste.desc'),
      region: 'Finland',
      scale: '200+ suppliers',
      feedstock: 'Food waste'
    },
    {
      title: t('partnerships.bp.model'),
      description: t('partnerships.bp.desc'),
      region: 'USA',
      scale: 'Vertical integration',
      feedstock: 'Agricultural waste'
    },
    {
      title: t('partnerships.total.model'),
      description: t('partnerships.total.desc'),
      region: 'France',
      scale: '25 suppliers',
      feedstock: 'Mixed biomass'
    }
  ];

  // Implementation phases
  const implementationPhases = [
    {
      phase: t('partnerships.phase.pilot'),
      description: t('partnerships.phase.pilot.desc'),
      timeline: '6-12 months',
      partners: '5-10',
      volume: currentData.id === 'languedoc' ? '15-25kt' : '3-5kt'
    },
    {
      phase: t('partnerships.phase.scale'),
      description: t('partnerships.phase.scale.desc'),
      timeline: '12-24 months',
      partners: '15-30',
      volume: currentData.id === 'languedoc' ? '40-60kt' : '8-12kt'
    },
    {
      phase: t('partnerships.phase.mature'),
      description: t('partnerships.phase.mature.desc'),
      timeline: '24+ months',
      partners: '30-50',
      volume: currentData.id === 'languedoc' ? '80kt+' : '15kt+'
    }
  ];

  // Value proposition calculations
  const valueProposition = {
    currentCosts: currentData.id === 'languedoc' ? 45 : 8, // €/tonne disposal
    transportSavings: currentData.id === 'languedoc' ? 12 : 6, // €/tonne
    safRevenue: 280 * 1.22, // L/tonne * €/L
    carbonCredits: 280 * 2.75 * 0.08, // L/tonne * kg CO2/L * €/kg
  };

  const netBenefit = valueProposition.safRevenue + valueProposition.carbonCredits - valueProposition.currentCosts - valueProposition.transportSavings;

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.title')}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-4xl mx-auto mb-6">
            {t('partnerships.subtitle')}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="text-blue-600" size={20} />
              <span className="text-sm font-medium text-blue-800">
                {t('partnerships.framework.note')}
              </span>
            </div>
          </div>
        </div>
      </section>

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
              <Card key={index} className="bg-white/95 border-wine-cream/30 hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className={`flex items-center text-${type.color}`}>
                    <IconComponent className="w-6 h-6 mr-3" />
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wine-charcoal/70 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-wine-charcoal">
                        <ArrowRight className="w-4 h-4 mr-2 text-wine-green" />
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

      {/* Value Proposition */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.value.proposition')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Transformation économique: coûts → revenus
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-wine-cream/30">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="text-2xl font-bold text-red-600 mb-2">
                -€{valueProposition.currentCosts}
              </div>
              <div className="text-sm text-red-700">{t('partnerships.current.costs')}</div>
              <div className="text-xs text-red-600">{t('partnerships.waste.disposal')}</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                -€{valueProposition.transportSavings}
              </div>
              <div className="text-sm text-orange-700">{t('partnerships.transport.costs')}</div>
              <div className="text-xs text-orange-600">Optimization</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-2">
                +€{Math.round(valueProposition.safRevenue)}
              </div>
              <div className="text-sm text-green-700">{t('partnerships.saf.revenue')}</div>
              <div className="text-xs text-green-600">280L/tonne</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                +€{Math.round(valueProposition.carbonCredits)}
              </div>
              <div className="text-sm text-blue-700">{t('partnerships.carbon.credits')}</div>
              <div className="text-xs text-blue-600">2.75kg CO₂/L</div>
            </div>

            <div className="text-center p-4 bg-wine-burgundy/10 rounded-xl border border-wine-burgundy/30">
              <div className="text-3xl font-bold text-wine-burgundy mb-2">
                +€{Math.round(netBenefit)}
              </div>
              <div className="text-sm text-wine-burgundy font-semibold">{t('partnerships.net.benefit')}</div>
              <div className="text-xs text-wine-charcoal/70">per tonne</div>
            </div>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industryExamples.map((example, index) => (
            <Card key={index} className="bg-white/95 border-wine-cream/30">
              <CardHeader>
                <CardTitle className="text-wine-burgundy">{example.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-wine-charcoal/70 mb-4">{example.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-wine-charcoal/70">Region:</span>
                    <span className="font-medium">{example.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wine-charcoal/70">Scale:</span>
                    <span className="font-medium">{example.scale}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wine-charcoal/70">Feedstock:</span>
                    <span className="font-medium">{example.feedstock}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
            Progressive scaling based on biorefinery capacity
          </p>
        </div>

        <div className="space-y-6">
          {implementationPhases.map((phase, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-wine-cream/30">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-bold text-wine-burgundy mb-2">{phase.phase}</h3>
                  <p className="text-sm text-wine-charcoal/70">{phase.description}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wine-charcoal mb-1">{phase.timeline}</div>
                  <div className="text-sm text-wine-charcoal/70">Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wine-gold mb-1">{phase.partners}</div>
                  <div className="text-sm text-wine-charcoal/70">Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wine-green mb-1">{phase.volume}</div>
                  <div className="text-sm text-wine-charcoal/70">Target Volume</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Framework Disclaimer */}
      <div className="bg-wine-cream/10 p-6 rounded-lg border border-wine-burgundy/10 text-center">
        <p className="text-sm text-wine-charcoal/80">
          <strong>Méthodologie:</strong> {t('partnerships.framework.disclaimer')}
        </p>
      </div>
    </div>
  );
};

export default PartnershipsTab;
