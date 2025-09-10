import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Users, FileText, Wrench } from "lucide-react";

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
  const [selectedPhase, setSelectedPhase] = useState<string>('1');

  const phases: TimelinePhase[] = [
    {
      id: '1',
      title: 'Étude de Faisabilité',
      description: 'Analyse technique et économique complète du projet',
      duration: '3 mois',
      status: 'completed',
      progress: 100,
      milestones: [
        { name: 'Étude de marché', completed: true, date: '2024-01-15' },
        { name: 'Analyse technique', completed: true, date: '2024-02-10' },
        { name: 'Modèle économique', completed: true, date: '2024-02-28' },
        { name: 'Rapport final', completed: true, date: '2024-03-15' }
      ],
      stakeholders: ['Équipe projet', 'Consultants externes', 'Investisseurs'],
      dependencies: [],
      risks: ['Délais consultants', 'Évolution réglementaire']
    },
    {
      id: '2',
      title: 'Développement Partenariats',
      description: 'Signature des accords avec vignerons et transformateurs',
      duration: '6 mois',
      status: 'in-progress',
      progress: 65,
      milestones: [
        { name: 'Identification partenaires', completed: true, date: '2024-04-01' },
        { name: 'Négociations préliminaires', completed: true, date: '2024-05-15' },
        { name: 'Accords de principe', completed: false },
        { name: 'Contrats finalisés', completed: false }
      ],
      stakeholders: ['Vignerons', 'Coopératives', 'Équipe commerciale'],
      dependencies: ['Étude de faisabilité'],
      risks: ['Résistance vignerons', 'Conditions tarifaires']
    },
    {
      id: '3',
      title: 'Financement et Autorisations',
      description: 'Levée de fonds et obtention des permis administratifs',
      duration: '8 mois',
      status: 'in-progress',
      progress: 30,
      milestones: [
        { name: 'Dossier de financement', completed: true, date: '2024-06-01' },
        { name: 'Négociations investisseurs', completed: false },
        { name: 'Permis de construire', completed: false },
        { name: 'Autorisations environnementales', completed: false }
      ],
      stakeholders: ['Investisseurs', 'Administration', 'Banques'],
      dependencies: ['Partenariats développés'],
      risks: ['Refus autorisations', 'Conditions de financement']
    },
    {
      id: '4',
      title: 'Construction Infrastructure',
      description: 'Construction de l\'unité de transformation ATJ',
      duration: '18 mois',
      status: 'pending',
      progress: 0,
      milestones: [
        { name: 'Appel d\'offres construction', completed: false },
        { name: 'Début travaux', completed: false },
        { name: 'Installation équipements', completed: false },
        { name: 'Tests et commissioning', completed: false }
      ],
      stakeholders: ['Constructeurs', 'Fournisseurs équipements', 'Équipe technique'],
      dependencies: ['Financement', 'Autorisations'],
      risks: ['Retards construction', 'Dépassement budget', 'Qualité équipements']
    },
    {
      id: '5',
      title: 'Démarrage Production',
      description: 'Mise en service et montée en cadence',
      duration: '12 mois',
      status: 'pending',
      progress: 0,
      milestones: [
        { name: 'Formation équipes', completed: false },
        { name: 'Tests de production', completed: false },
        { name: 'Certification SAF', completed: false },
        { name: 'Production commerciale', completed: false }
      ],
      stakeholders: ['Équipe opérationnelle', 'Organismes certification', 'Clients'],
      dependencies: ['Infrastructure terminée'],
      risks: ['Problèmes techniques', 'Délais certification', 'Qualité produit']
    },
    {
      id: '6',
      title: 'Expansion Régionale',
      description: 'Extension à d\'autres régions viticoles',
      duration: '24 mois',
      status: 'pending',
      progress: 0,
      milestones: [
        { name: 'Analyse nouveaux marchés', completed: false },
        { name: 'Partenariats régionaux', completed: false },
        { name: 'Unités secondaires', completed: false },
        { name: 'Réseau national', completed: false }
      ],
      stakeholders: ['Nouveaux partenaires', 'Équipe expansion'],
      dependencies: ['Production opérationnelle'],
      risks: ['Concurrence', 'Saturation marché', 'Ressources limitées']
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

  const selectedPhaseData = phases.find(p => p.id === selectedPhase)!;

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Wrench className="text-wine-burgundy w-7 h-7" />
          <span className="text-2xl text-wine-charcoal">Timeline d'Implémentation</span>
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
                  {selectedPhaseData.status === 'completed' ? 'Terminé' :
                   selectedPhaseData.status === 'in-progress' ? 'En cours' :
                   selectedPhaseData.status === 'pending' ? 'À venir' :
                   'Bloqué'}
                </Badge>
              </div>
              
              <p className="text-wine-charcoal/80 mb-4">{selectedPhaseData.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-wine-charcoal">Progression</span>
                  <span className="text-sm text-wine-charcoal">{selectedPhaseData.progress}%</span>
                </div>
                <Progress value={selectedPhaseData.progress} className="h-2" />
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white/70 p-6 rounded-xl border border-wine-cream/40">
              <h4 className="text-lg font-semibold text-wine-charcoal mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Jalons
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
                Parties Prenantes
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
                Dépendances
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
                <div className="text-sm text-wine-charcoal/60">Aucune dépendance</div>
              )}
            </div>

            <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-red-700 mb-4">
                Risques Identifiés
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
          <h4 className="text-lg font-semibold text-wine-charcoal mb-4">Résumé Global du Projet</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-wine-green">
                {phases.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-wine-charcoal/70">Phases terminées</div>
            </div>
            
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-wine-gold">
                {phases.filter(p => p.status === 'in-progress').length}
              </div>
              <div className="text-sm text-wine-charcoal/70">Phases en cours</div>
            </div>
            
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-wine-charcoal">
                {Math.round(phases.reduce((acc, p) => acc + p.progress, 0) / phases.length)}%
              </div>
              <div className="text-sm text-wine-charcoal/70">Progression totale</div>
            </div>
            
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-wine-burgundy">47</div>
              <div className="text-sm text-wine-charcoal/70">Mois estimés</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImplementationTimeline;