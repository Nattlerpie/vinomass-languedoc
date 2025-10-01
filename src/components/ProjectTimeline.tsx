import { CheckCircle, Clock, Target, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * EconomicProjections Component (formerly ProjectTimeline)
 * 
 * CRITICAL FIX: Removed ALL hardcoded French text
 * All text now uses translation keys via t() function
 * 
 * Displays 5-year project timeline with:
 * - Phase milestones
 * - Investment requirements
 * - Key decision points
 * - Success metrics
 * 
 * Units follow SI standards with proper spacing
 */

const EconomicProjections = () => {
  const { t } = useLanguage();
  
  // ========================================
  // TIMELINE PHASES DATA
  // ========================================
  const timelinePhases = [
    {
      year: t('projections.year.one'),
      title: t('projections.phase.one.title'),
      investment: t('projections.phase.one.investment'),
      status: "planning",
      description: t('projections.phase.one.description'),
      milestones: [
        t('projections.phase.one.milestone.one'),
        t('projections.phase.one.milestone.two'),
        t('projections.phase.one.milestone.three'),
        t('projections.phase.one.milestone.four'),
        t('projections.phase.one.milestone.five')
      ],
      keyDecisions: [
        t('projections.phase.one.decision.one'),
        t('projections.phase.one.decision.two'),
        t('projections.phase.one.decision.three')
      ]
    },
    {
      year: t('projections.year.two'),
      title: t('projections.phase.two.title'),
      investment: t('projections.phase.two.investment'),
      status: "future",
      description: t('projections.phase.two.description'),
      milestones: [
        t('projections.phase.two.milestone.one'),
        t('projections.phase.two.milestone.two'),
        t('projections.phase.two.milestone.three'),
        t('projections.phase.two.milestone.four'),
        t('projections.phase.two.milestone.five')
      ],
      keyDecisions: [
        t('projections.phase.two.decision.one'),
        t('projections.phase.two.decision.two'),
        t('projections.phase.two.decision.three')
      ]
    },
    {
      year: t('projections.year.three'),
      title: t('projections.phase.three.title'),
      investment: t('projections.phase.three.investment'),
      status: "future",
      description: t('projections.phase.three.description'),
      milestones: [
        t('projections.phase.three.milestone.one'),
        t('projections.phase.three.milestone.two'),
        t('projections.phase.three.milestone.three'),
        t('projections.phase.three.milestone.four'),
        t('projections.phase.three.milestone.five')
      ],
      keyDecisions: [
        t('projections.phase.three.decision.one'),
        t('projections.phase.three.decision.two'),
        t('projections.phase.three.decision.three')
      ]
    },
    {
      year: t('projections.year.five'),
      title: t('projections.phase.five.title'),
      investment: t('projections.phase.five.investment'),
      status: "future",
      description: t('projections.phase.five.description'),
      milestones: [
        t('projections.phase.five.milestone.one'),
        t('projections.phase.five.milestone.two'),
        t('projections.phase.five.milestone.three'),
        t('projections.phase.five.milestone.four'),
        t('projections.phase.five.milestone.five')
      ],
      keyDecisions: [
        t('projections.phase.five.decision.one'),
        t('projections.phase.five.decision.two'),
        t('projections.phase.five.decision.three')
      ]
    }
  ];

  // ========================================
  // STATUS ICON HELPER
  // ========================================
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

  // ========================================
  // STATUS COLOR HELPER
  // ========================================
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
          {t('projections.title')}
        </CardTitle>
        <p className="text-wine-charcoal/70">
          {t('projections.subtitle')}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-8">
          {/* ========================================
              TIMELINE PHASES
              ======================================== */}
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
                  <div className="text-base font-medium text-wine-gold mb-2">{phase.investment}</div>
                  <p className="text-wine-charcoal/70 text-base">{phase.description}</p>
                </div>
              </div>

              {/* Two-column layout for milestones and decisions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Milestones */}
                <div>
                  <h4 className="font-semibold text-wine-charcoal mb-3 text-base">
                    {t('projections.key.milestones')}
                  </h4>
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
                  <h4 className="font-semibold text-wine-charcoal mb-3 text-base">
                    {t('projections.decision.points')}
                  </h4>
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

        {/* ========================================
            SUCCESS METRICS
            ======================================== */}
        <div className="mt-8 p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40">
          <h4 className="font-bold text-wine-charcoal mb-4 text-lg">
            {t('projections.success.metrics')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-burgundy mb-1">
                {t('projections.metric.revenue.value')}
              </div>
              <div className="text-wine-charcoal/70">
                {t('projections.metric.revenue.label')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-green mb-1">
                {t('projections.metric.partners.value')}
              </div>
              <div className="text-wine-charcoal/70">
                {t('projections.metric.partners.label')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-gold mb-1">
                {t('projections.metric.roi.value')}
              </div>
              <div className="text-wine-charcoal/70">
                {t('projections.metric.roi.label')}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicProjections;
