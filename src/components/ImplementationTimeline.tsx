import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Users, FileText, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  progress: number;
  milestones: {
    name: string;
    completed: boolean;
    date?: string;
  }[];
  stakeholders: string[];
  dependencies: string[];
  risks: string[];
}

const ImplementationTimeline = () => {
  const { t } = useLanguage();
  const [selectedPhase, setSelectedPhase] = useState<string>('1');

  const phases: TimelinePhase[] = [
    {
      id: '1',
      title: t('timeline.phase1.title'),
      description: t('timeline.phase1.description'),
      duration: t('timeline.phase1.duration'),
      status: 'completed',
      progress: 100,
      milestones: [
        { name: t('timeline.phase1.milestone1'), completed: true, date: '2024-01-15' },
        { name: t('timeline.phase1.milestone2'), completed: true, date: '2024-02-10' },
        { name: t('timeline.phase1.milestone3'), completed: true, date: '2024-02-28' },
        { name: t('timeline.phase1.milestone4'), completed: true, date: '2024-03-15' }
      ],
      stakeholders: [
        t('timeline.stakeholders.project.team'),
        t('timeline.stakeholders.external.consultants'),
        t('timeline.stakeholders.investors')
      ],
      dependencies: [],
      risks: [
        t('timeline.risks.consultant.delays'),
        t('timeline.risks.regulatory.evolution')
      ]
    },
    {
      id: '2',
      title: t('timeline.phase2.title'),
      description: t('timeline.phase2.description'),
      duration: t('timeline.phase2.duration'),
      status: 'in-progress',
      progress: 65,
      milestones: [
        { name: t('timeline.phase2.milestone1'), completed: true, date: '2024-04-01' },
        { name: t('timeline.phase2.milestone2'), completed: true, date: '2024-05-15' },
        { name: t('timeline.phase2.milestone3'), completed: false },
        { name: t('timeline.phase2.milestone4'), completed: false }
      ],
      stakeholders: [
        t('timeline.stakeholders.winemakers'),
        t('timeline.stakeholders.cooperatives'),
        t('timeline.stakeholders.sales.team')
      ],
      dependencies: [t('timeline.dependencies.feasibility.study')],
      risks: [
        t('timeline.risks.winemaker.resistance'),
        t('timeline.risks.pricing.conditions')
      ]
    },
    {
      id: '3',
      title: t('timeline.phase3.title'),
      description: t('timeline.phase3.description'),
      duration: t('timeline.phase3.duration'),
      status: 'in-progress',
      progress: 30,
      milestones: [
        { name: t('timeline.phase3.milestone1'), completed: true, date: '2024-06-01' },
        { name: t('timeline.phase3.milestone2'), completed: false },
        { name: t('timeline.phase3.milestone3'), completed: false },
        { name: t('timeline.phase3.milestone4'), completed: false }
      ],
      stakeholders: [
        t('timeline.stakeholders.investors'),
        t('timeline.stakeholders.administration'),
        t('timeline.stakeholders.banks')
      ],
      dependencies: [t('timeline.dependencies.partnerships.developed')],
      risks: [
        t('timeline.risks.authorization.refusal'),
        t('timeline.risks.financing.conditions')
      ]
    },
    {
      id: '4',
      title: t('timeline.phase4.title'),
      description: t('timeline.phase4.description'),
      duration: t('timeline.phase4.duration'),
      status: 'pending',
      progress: 0,
      milestones: [
        { name: t('timeline.phase4.milestone1'), completed: false },
        { name: t('timeline.phase4.milestone2'), completed: false },
        { name: t('timeline.phase4.milestone3'), completed: false },
        { name: t('timeline.phase4.milestone4'), completed: false }
      ],
      stakeholders: [
        t('timeline.stakeholders.builders'),
        t('timeline.stakeholders.equipment.suppliers'),
        t('timeline.stakeholders.technical.team')
      ],
      dependencies: [
        t('timeline.dependencies.financing'),
        t('timeline.dependencies.authorizations')
      ],
      risks: [
        t('timeline.risks.construction.delays'),
        t('timeline.risks.budget.overrun'),
        t('timeline.risks.equipment.quality')
      ]
    },
    {
      id: '5',
      title: t('timeline.phase5.title'),
      description: t('timeline.phase5.description'),
      duration: t('timeline.phase5.duration'),
      status: 'pending',
      progress: 0,
      milestones: [
        { name: t('timeline.phase5.milestone1'), completed: false },
        { name: t('timeline.phase5.milestone2'), completed: false },
        { name: t('timeline.phase5.milestone3'), completed: false },
        { name: t('timeline.phase5.milestone4'), completed: false }
      ],
      stakeholders: [
        t('timeline.stakeholders.operations.team'),
        t('timeline.stakeholders.certification.bodies'),
        t('timeline.stakeholders.clients')
      ],
      dependencies: [t('timeline.dependencies.infrastructure.completed')],
      risks: [
        t('timeline.risks.technical.issues'),
        t('timeline.risks.certification.delays'),
        t('timeline.risks.product.quality')
      ]
    },
    {
      id: '6',
      title: t('timeline.phase6.title'),
      description: t('timeline.phase6.description'),
      duration: t('timeline.phase6.duration'),
      status: 'pending',
      progress: 0,
      milestones: [
        { name: t('timeline.phase6.milestone1'), completed: false },
        { name: t('timeline.phase6.milestone2'), completed: false },
        { name: t('timeline.phase6.milestone3'), completed: false },
        { name: t('timeline.phase6.milestone4'), completed: false }
      ],
      stakeholders: [
        t('timeline.stakeholders.new.partners'),
        t('timeline.stakeholders.expansion.team')
      ],
      dependencies: [t('timeline.dependencies.production.operational')],
      risks: [
        t('timeline.risks.competition'),
        t('timeline.risks.market.saturation'),
        t('timeline.risks.limited.resources')
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-wine-green bg-wine-green/10 border-wine-green/20';
      case 'in-progress': return 'text-wine-gold bg-wine-gold/10 border-wine-gold/20';
      case 'pending': return 'text-wine-charcoal bg-wine-charcoal/10 border-wine-charcoal/20';
      case 'blocked': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-wine-green" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-wine-gold" />;
      case 'pending': return <Circle className="w-5 h-5 text-wine-charcoal" />;
      case 'blocked': return <Circle className="w-5 h-5 text-red-600" />;
      default: return <Circle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return t('timeline.status.completed');
      case 'in-progress': return t('timeline.status.in.progress');
      case 'pending': return t('timeline.status.pending');
      case 'blocked': return t('timeline.status.blocked');
      default: return status;
    }
  };

  const selectedPhaseData = phases.find(p => p.id === selectedPhase)!;

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Wrench className="text-wine-burgundy w-7 h-7" />
          <span className="text-2xl text-wine-charcoal">{t('timeline.implementation.timeline')}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Timeline Overview */}
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className="relative flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedPhase(phase.id)}
              >
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-colors ${
                  selectedPhase === phase.id 
                    ? 'border-wine-burgundy bg-wine-burgundy text-white' 
                    : 'border-wine-cream bg-white text-wine-charcoal'
                }`}>
                  {getStatusIcon(phase.status)}
                </div>
                <div className="text-xs text-center max-w-20">
                  <div className="font-medium text-wine-charcoal">{phase.title}</div>
                  <div className="text-wine-charcoal/60">{phase.duration}</div>
                </div>
                
                {index < phases.length - 1 && (
                  <div className="absolute top-6 left-12 w-16 h-0.5 bg-wine-cream"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phase Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Phase Info */}
          <div className="space-y-6">
            <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
              <div className="flex items-center gap-3 mb-4">
                {getStatusIcon(selectedPhaseData.status)}
                <h3 className="text-xl font-semibold text-wine-charcoal">
                  {selectedPhaseData.title}
                </h3>
                <Badge className={getStatusColor(selectedPhaseData.status)}>
                  {getStatusText(selectedPhaseData.status)}
                </Badge>
              </div>
              
              <p className="text-wine-charcoal/80 mb-4">{selectedPhaseData.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-wine-charcoal">{t('timeline.progress')}</span>
                  <span className="text-sm text-wine-charcoal">{selectedPhaseData.progress}%</span>
                </div>
                <Progress value={selectedPhaseData.progress} className="h-2" />
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white/70 p-6 rounded-xl border border-wine-cream/40">
              <h4 className="text-lg font-semibold text-wine-charcoal mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {t('timeline.milestones')}
              </h4>
              
              <div className="space-y-3">
                {selectedPhaseData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {milestone.completed ? (
                      <CheckCircle className="w-4 h-4 text-wine-green" />
                    ) : (
                      <Circle className="w-4 h-4 text-wine-charcoal/40" />
                    )}
                    <span className={`flex-1 ${milestone.completed ? 'text-wine-charcoal' : 'text-wine-charcoal/60'}`}>
                      {milestone.name}
                    </span>
                    {milestone.date && (
                      <span className="text-xs text-wine-charcoal/60">{milestone.date}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stakeholders and Dependencies */}
          <div className="space-y-6">
            <div className="bg-white/70 p-6 rounded-xl border border-wine-cream/40">
              <h4 className="text-lg font-semibold text-wine-charcoal mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                {t('timeline.stakeholders')}
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {selectedPhaseData.stakeholders.map((stakeholder, index) => (
                  <Badge key={index} variant="secondary">
                    {stakeholder}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-white/70 p-6 rounded-xl border border-wine-cream/40">
              <h4 className="text-lg font-semibold text-wine-charcoal mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t('timeline.dependencies')}
              </h4>
              
              {selectedPhaseData.dependencies.length > 0 ? (
                <div className="space-y-2">
                  {selectedPhaseData.dependencies.map((dependency, index) => (
                    <div key={index} className="text-sm text-wine-charcoal/80">
                      • {dependency}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-wine-charcoal/60">{t('timeline.no.dependencies')}</div>
              )}
            </div>

            <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-red-700 mb-4">
                {t('timeline.identified.risks')}
              </h4>
              
              <div className="space-y-2">
                {selectedPhaseData.risks.map((risk, index) => (
                  <div key={index} className="text-sm text-red-600">
                    ⚠️ {risk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
          <h4 className="text-lg font-semibold text-wine-charcoal mb-4">{t('timeline.project.summary')}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-wine-green">
                {phases.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-wine-charcoal/70">{t('timeline.phases.completed')}</div>
            </div>
            
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-wine-gold">
                {phases.filter(p => p.status === 'in-progress').length}
              </div>
              <div className="text-sm text-wine-charcoal/70">{t('timeline.phases.in.progress')}</div>
            </div>
            
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-wine-charcoal">
                {Math.round(phases.reduce((acc, p) => acc + p.progress, 0) / phases.length)}%
              </div>
              <div className="text-sm text-wine-charcoal/70">{t('timeline.total.progress')}</div>
            </div>
            
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-wine-burgundy">47</div>
              <div className="text-sm text-wine-charcoal/70">{t('timeline.estimated.months')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImplementationTimeline;
