import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  MapPin, 
  Building, 
  TrendingUp, 
  Handshake, 
  Target, 
  ArrowRight, 
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Shield,
  Award,
  Zap,
  Factory,
  Plane
} from 'lucide-react';
import ImplementationTimeline from "../ImplementationTimeline";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnershipsTab = () => {
  const { currentData } = useRegion();
  const { t, language } = useLanguage();
  const [debugMode] = useState(false);

  // Debug info
  const debugInfo = {
    region: currentData.name,
    language: language,
    dataLoaded: !!currentData,
    componentsRendered: 10
  };

  // Regional partnership framework data with dynamic calculations
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

  // Industry examples with real data - using translation keys
  const industryExamples = [
    {
      model: t('partnerships.neste.model'),
      description: t('partnerships.neste.desc'),
      partners: "200+",
      feedstock: t('partnerships.feedstock.food.waste'),
      capacity: "1.5M " + t('partnerships.tonnes.year')
    },
    {
      model: t('partnerships.bp.model'), 
      description: t('partnerships.bp.desc'),
      partners: "50+",
      feedstock: t('partnerships.feedstock.agricultural.residues'),
      capacity: "800K " + t('partnerships.tonnes.year')
    },
    {
      model: t('partnerships.total.model'),
      description: t('partnerships.total.desc'),
      partners: "25",
      feedstock: t('partnerships.feedstock.mixed.biomass'),
      capacity: "500K " + t('partnerships.tonnes.year')
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
        t('partnerships.benefits.existing.infrastructure'),
        t('partnerships.benefits.optimized.logistics'), 
        t('partnerships.benefits.technical.expertise'),
        t('partnerships.benefits.economies.scale')
      ],
      color: "wine-gold"
    },
    {
      title: t('partnerships.institutional.title'),
      description: t('partnerships.institutional.desc'),
      icon: TrendingUp,
      benefits: [
        t('partnerships.benefits.regulatory.support'),
        t('partnerships.benefits.financement.public'),
        t('partnerships.benefits.validation.scientifique'),
        t('partnerships.benefits.reseau.institutionnel')
      ],
      color: "wine-charcoal"
    }
  ];

  // Key strategic players in the ecosystem
  const keyPlayers = [
    {
      category: t('partnerships.players.aerospace'),
      icon: Plane,
      organizations: [
        "Aerospace Valley (Toulouse)",
        "Airbus",
        "Safran",
        "Dassault Aviation"
      ],
      color: "wine-burgundy"
    },
    {
      category: t('partnerships.players.energy'),
      icon: Factory,
      organizations: [
        "TotalEnergies",
        "Haffner Energy",
        "Elyse Energy",
        "Engie",
        "EDF",
        "Verso Energy"
      ],
      color: "wine-gold"
    },
    {
      category: t('partnerships.players.aviation'),
      icon: Building,
      organizations: [
        "Air France-KLM",
        t('partnerships.players.french.airports'),
        t('partnerships.players.airlines')
      ],
      color: "wine-green"
    },
    {
      category: t('partnerships.players.research'),
      icon: Award,
      organizations: [
        "Académie des Technologies",
        "Institut Français de la Vigne et du Vin",
        "Vignerons Indépendants de France",
        "Vinseo"
      ],
      color: "wine-charcoal"
    },
    {
      category: t('partnerships.players.public'),
      icon: Shield,
      organizations: [
        "ADEME",
        "Ad'Occ",
        t('partnerships.players.regions')
      ],
      color: "wine-burgundy"
    }
  ];

  // Implementation phases with dynamic volumes based on region
  const implementationPhases = [
    {
      phase: t('partnerships.phase.pilot'),
      description: t('partnerships.phase.pilot.desc'),
      duration: "6-12 " + t('timeline.months'),
      partners: "5-10",
      volume: currentData.id === 'languedoc' ? "15-25 kt" : "3-5 kt"
    },
    {
      phase: t('partnerships.phase.scale'),
      description: t('partnerships.phase.scale.desc'),
      duration: "12-24 " + t('timeline.months'),
      partners: "15-25",
      volume: currentData.id === 'languedoc' ? "50-80 kt" : "10-15 kt"
    },
    {
      phase: t('partnerships.phase.mature'),
      description: t('partnerships.phase.mature.desc'),
      duration: "24+ " + t('timeline.months'),
      partners: frameworkMetrics.targetPartners,
      volume: currentData.id === 'languedoc' ? "80-120 kt" : "15-24 kt"
    }
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Debug Banner */}
      {debugMode && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-8">
          <div className="font-bold">DEBUG - Partnerships Tab</div>
          <div className="text-sm">
            Region: {debugInfo.region} | Language: {debugInfo.language} | 
            Data Loaded: {debugInfo.dataLoaded ? 'Yes' : 'No'} | 
            Components: {debugInfo.componentsRendered}
          </div>
        </div>
      )}

      {/* Opening Banner - Connection from Economy Tab */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-wine-burgundy/10 via-wine-gold/10 to-wine-green/10 rounded-2xl p-8 border border-wine-cream/30 shadow-elegant">
          <div className="flex items-start gap-4 mb-6">
            <Lightbulb className="w-8 h-8 text-wine-gold mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-wine-charcoal mb-3">
                {t('partnerships.opening.title')}
              </h2>
              <p className="text-lg text-wine-charcoal/80 mb-4">
                {t('partnerships.opening.subtitle')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/60 rounded-lg p-4 border border-wine-burgundy/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-wine-burgundy" />
                    <span className="font-semibold text-wine-charcoal">{t('partnerships.opening.economics')}</span>
                  </div>
                  <p className="text-sm text-wine-charcoal/70">{t('partnerships.opening.economics.desc')}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-4 border border-wine-gold/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-wine-gold" />
                    <span className="font-semibold text-wine-charcoal">{t('partnerships.opening.infrastructure')}</span>
                  </div>
                  <p className="text-sm text-wine-charcoal/70">{t('partnerships.opening.infrastructure.desc')}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-4 border border-wine-green/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-wine-green" />
                    <span className="font-semibold text-wine-charcoal">{t('partnerships.opening.impact')}</span>
                  </div>
                  <p className="text-sm text-wine-charcoal/70">{t('partnerships.opening.impact.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.title')}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-4xl mx-auto mb-6">
            {t('partnerships.subtitle')} {currentData.name}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-sm text-blue-800">
              <strong>{t('partnerships.note.title')}:</strong> {t('partnerships.framework.note')}
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
              <div className="text-sm text-wine-charcoal/70">{t('partnerships.main.types')}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-gold/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-gold">
                <Target className="w-5 h-5 mr-2" />
                {t('partnerships.target.partners')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">{frameworkMetrics.targetPartners}</div>
              <div className="text-sm text-wine-charcoal/70">{t('partnerships.network.objective')}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-green/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-green">
                <TrendingUp className="w-5 h-5 mr-2" />
                {t('partnerships.cost.reduction')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">{frameworkMetrics.wasteReduction}%</div>
              <div className="text-sm text-wine-charcoal/70">{t('partnerships.waste.treatment')}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-charcoal/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-charcoal">
                <ArrowRight className="w-5 h-5 mr-2" />
                {t('partnerships.new.revenues')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">€{frameworkMetrics.revenueOpportunity}M</div>
              <div className="text-sm text-wine-charcoal/70">{t('partnerships.annual.potential')}</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Strategic Context: Why Partnerships Matter */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.strategic.context')}
          </h2>
          <p className="text-lg text-wine-charcoal/70 max-w-3xl mx-auto">
            {t('partnerships.why.matters')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Challenge Card */}
          <Card className="bg-white/95 border-wine-burgundy/20">
            <CardHeader>
              <CardTitle className="flex items-center text-wine-burgundy">
                <AlertTriangle className="w-6 h-6 mr-3" />
                {t('partnerships.challenge.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-wine-charcoal/70 mb-4">{t('partnerships.challenge.desc')}</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-wine-charcoal">
                  <span className="text-wine-burgundy font-bold mt-1">•</span>
                  <span>{t('partnerships.challenge.cost')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-wine-charcoal">
                  <span className="text-wine-burgundy font-bold mt-1">•</span>
                  <span>{t('partnerships.challenge.scale')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-wine-charcoal">
                  <span className="text-wine-burgundy font-bold mt-1">•</span>
                  <span>{t('partnerships.challenge.timeline')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Opportunity Card */}
          <Card className="bg-white/95 border-wine-green/20">
            <CardHeader>
              <CardTitle className="flex items-center text-wine-green">
                <Zap className="w-6 h-6 mr-3" />
                {t('partnerships.opportunity.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-wine-charcoal/70 mb-4">{t('partnerships.opportunity.desc')}</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-wine-charcoal">
                  <CheckCircle className="w-4 h-4 text-wine-green mt-1 flex-shrink-0" />
                  <span>{t('partnerships.opportunity.wine.industry')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-wine-charcoal">
                  <CheckCircle className="w-4 h-4 text-wine-green mt-1 flex-shrink-0" />
                  <span>{t('partnerships.opportunity.aviation.sector')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-wine-charcoal">
                  <CheckCircle className="w-4 h-4 text-wine-green mt-1 flex-shrink-0" />
                  <span>{t('partnerships.opportunity.french.leadership')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Key Strategic Players */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.key.players')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('partnerships.ecosystem.leaders')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyPlayers.map((player, index) => {
            const IconComponent = player.icon;
            return (
              <Card key={index} className={`bg-white/95 border-${player.color}/20 hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <CardTitle className={`flex items-center text-${player.color}`}>
                    <IconComponent className="w-5 h-5 mr-2" />
                    {player.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {player.organizations.map((org, i) => (
                      <li key={i} className="text-sm text-wine-charcoal/70 flex items-start gap-2">
                        <span className={`text-${player.color} mt-1`}>•</span>
                        <span>{org}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 bg-wine-cream/20 rounded-lg p-6 border border-wine-charcoal/10">
          <p className="text-sm text-wine-charcoal/80 text-center">
            <strong>{t('partnerships.players.note')}:</strong> {t('partnerships.players.commitment')}
          </p>
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
                        <CheckCircle className="w-4 h-4 mr-2 text-wine-green flex-shrink-0" />
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
                  <th className="text-left p-4 font-semibold text-wine-charcoal">{t('partnerships.table.model')}</th>
                  <th className="text-left p-4 font-semibold text-wine-charcoal">{t('partnerships.table.description')}</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">{t('partnerships.table.partners')}</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">{t('partnerships.table.feedstock')}</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">{t('partnerships.table.capacity')}</th>
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
            {t('partnerships.progressive.approach')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {implementationPhases.map((phase, index) => (
            <Card key={index} className="bg-white/95 border-wine-cream/30 relative">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-wine-burgundy">{phase.phase}</CardTitle>
                  <div className="bg-wine-burgundy text-white text-sm px-3 py-1 rounded-full">
                    {t('partnerships.phase')} {index + 1}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-wine-charcoal/70 mb-4">{phase.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-wine-charcoal/60">{t('partnerships.duration')}:</span>
                    <span className="font-semibold text-wine-charcoal">{phase.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-wine-charcoal/60">{t('partnerships.partners')}:</span>
                    <span className="font-semibold text-wine-charcoal">{phase.partners}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-wine-charcoal/60">{t('partnerships.target.volume')}:</span>
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
            {t('partnerships.transform.costs.to.revenue')}
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
              <h3 className="text-xl font-bold text-wine-green">{t('partnerships.new.revenues')}</h3>
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
              <div className="text-wine-charcoal/70">{t('partnerships.net.benefit')} {t('partnerships.per.tonne')}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Implementation Timeline */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            {t('partnerships.implementation.planning')}
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            {t('partnerships.roadmap.key.steps')}
          </p>
        </div>
        <ImplementationTimeline />
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Closing Banner - Next Steps */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-wine-green/10 via-wine-gold/10 to-wine-burgundy/10 rounded-2xl p-8 border border-wine-cream/30 shadow-elegant">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-wine-charcoal mb-3">
              {t('partnerships.closing.title')}
            </h2>
            <p className="text-lg text-wine-charcoal/70 max-w-3xl mx-auto">
              {t('partnerships.closing.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-white/80 border-wine-green/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-wine-green">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  {t('partnerships.next.implementation')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-wine-charcoal/70 mb-3">
                  {t('partnerships.next.implementation.desc')}
                </p>
                <ul className="space-y-2 text-sm text-wine-charcoal">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-wine-green" />
                    {t('partnerships.next.step1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-wine-green" />
                    {t('partnerships.next.step2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-wine-green" />
                    {t('partnerships.next.step3')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-wine-gold/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-wine-gold">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  {t('partnerships.next.valorization')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-wine-charcoal/70 mb-3">
                  {t('partnerships.next.valorization.desc')}
                </p>
                <ul className="space-y-2 text-sm text-wine-charcoal">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-wine-gold" />
                    {t('partnerships.next.framework')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-wine-gold" />
                    {t('partnerships.next.pathways')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-wine-gold" />
                    {t('partnerships.next.protection')}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-wine-cream/10 p-6 rounded-lg border border-wine-burgundy/10 mb-16">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-wine-burgundy mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-wine-charcoal/80">
              <strong>{t('partnerships.methodology.title')}:</strong> {t('partnerships.framework.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipsTab;
