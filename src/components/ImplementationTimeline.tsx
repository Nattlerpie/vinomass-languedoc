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
  const phases: TimelinePhase[] = [{
    id: '1',
    title: 'Étude de Faisabilité',
    description: 'Analyse technique et économique complète du projet',
    duration: '3 mois',
    status: 'completed',
    progress: 100,
    milestones: [{
      name: 'Étude de marché',
      completed: true,
      date: '2024-01-15'
    }, {
      name: 'Analyse technique',
      completed: true,
      date: '2024-02-10'
    }, {
      name: 'Modèle économique',
      completed: true,
      date: '2024-02-28'
    }, {
      name: 'Rapport final',
      completed: true,
      date: '2024-03-15'
    }],
    stakeholders: ['Équipe projet', 'Consultants externes', 'Investisseurs'],
    dependencies: [],
    risks: ['Délais consultants', 'Évolution réglementaire']
  }, {
    id: '2',
    title: 'Développement Partenariats',
    description: 'Signature des accords avec vignerons et transformateurs',
    duration: '6 mois',
    status: 'in-progress',
    progress: 65,
    milestones: [{
      name: 'Identification partenaires',
      completed: true,
      date: '2024-04-01'
    }, {
      name: 'Négociations préliminaires',
      completed: true,
      date: '2024-05-15'
    }, {
      name: 'Accords de principe',
      completed: false
    }, {
      name: 'Contrats finalisés',
      completed: false
    }],
    stakeholders: ['Vignerons', 'Coopératives', 'Équipe commerciale'],
    dependencies: ['Étude de faisabilité'],
    risks: ['Résistance vignerons', 'Conditions tarifaires']
  }, {
    id: '3',
    title: 'Financement et Autorisations',
    description: 'Levée de fonds et obtention des permis administratifs',
    duration: '8 mois',
    status: 'in-progress',
    progress: 30,
    milestones: [{
      name: 'Dossier de financement',
      completed: true,
      date: '2024-06-01'
    }, {
      name: 'Négociations investisseurs',
      completed: false
    }, {
      name: 'Permis de construire',
      completed: false
    }, {
      name: 'Autorisations environnementales',
      completed: false
    }],
    stakeholders: ['Investisseurs', 'Administration', 'Banques'],
    dependencies: ['Partenariats développés'],
    risks: ['Refus autorisations', 'Conditions de financement']
  }, {
    id: '4',
    title: 'Construction Infrastructure',
    description: 'Construction de l\'unité de transformation ATJ',
    duration: '18 mois',
    status: 'pending',
    progress: 0,
    milestones: [{
      name: 'Appel d\'offres construction',
      completed: false
    }, {
      name: 'Début travaux',
      completed: false
    }, {
      name: 'Installation équipements',
      completed: false
    }, {
      name: 'Tests et commissioning',
      completed: false
    }],
    stakeholders: ['Constructeurs', 'Fournisseurs équipements', 'Équipe technique'],
    dependencies: ['Financement', 'Autorisations'],
    risks: ['Retards construction', 'Dépassement budget', 'Qualité équipements']
  }, {
    id: '5',
    title: 'Démarrage Production',
    description: 'Mise en service et montée en cadence',
    duration: '12 mois',
    status: 'pending',
    progress: 0,
    milestones: [{
      name: 'Formation équipes',
      completed: false
    }, {
      name: 'Tests de production',
      completed: false
    }, {
      name: 'Certification SAF',
      completed: false
    }, {
      name: 'Production commerciale',
      completed: false
    }],
    stakeholders: ['Équipe opérationnelle', 'Organismes certification', 'Clients'],
    dependencies: ['Infrastructure terminée'],
    risks: ['Problèmes techniques', 'Délais certification', 'Qualité produit']
  }, {
    id: '6',
    title: 'Expansion Régionale',
    description: 'Extension à d\'autres régions viticoles',
    duration: '24 mois',
    status: 'pending',
    progress: 0,
    milestones: [{
      name: 'Analyse nouveaux marchés',
      completed: false
    }, {
      name: 'Partenariats régionaux',
      completed: false
    }, {
      name: 'Unités secondaires',
      completed: false
    }, {
      name: 'Réseau national',
      completed: false
    }],
    stakeholders: ['Nouveaux partenaires', 'Équipe expansion'],
    dependencies: ['Production opérationnelle'],
    risks: ['Concurrence', 'Saturation marché', 'Ressources limitées']
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-wine-green bg-wine-green/10 border-wine-green/20';
      case 'in-progress':
        return 'text-wine-gold bg-wine-gold/10 border-wine-gold/20';
      case 'pending':
        return 'text-wine-charcoal bg-wine-charcoal/10 border-wine-charcoal/20';
      case 'blocked':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-wine-green" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-wine-gold" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-wine-charcoal" />;
      case 'blocked':
        return <Circle className="w-5 h-5 text-red-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-600" />;
    }
  };
  const selectedPhaseData = phases.find(p => p.id === selectedPhase)!;
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
          Timeline d'Implémentation
        </h2>
        <p className="text-lg text-wine-charcoal/70">
          Phases de développement du projet SAF régional
        </p>
      </div>

      {/* Timeline Overview */}
      <div className="grid gap-4">
        {phases.map((phase) => (
          <Card 
            key={phase.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPhase === phase.id ? 'ring-2 ring-wine-burgundy/50' : ''
            }`}
            onClick={() => setSelectedPhase(phase.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(phase.status)}
                  <div>
                    <h3 className="font-semibold text-wine-charcoal">{phase.title}</h3>
                    <p className="text-sm text-wine-charcoal/70">{phase.duration}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(phase.status)}>
                  {phase.status === 'completed' && 'Terminé'}
                  {phase.status === 'in-progress' && 'En cours'}
                  {phase.status === 'pending' && 'À venir'}
                  {phase.status === 'blocked' && 'Bloqué'}
                </Badge>
              </div>
              
              <p className="text-wine-charcoal/70 mb-4">{phase.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span>{phase.progress}%</span>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Phase View */}
      {selectedPhaseData && (
        <Card className="bg-white/95">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              {getStatusIcon(selectedPhaseData.status)}
              <span>{selectedPhaseData.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Milestones */}
            <div>
              <h4 className="font-semibold text-wine-charcoal mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Jalons
              </h4>
              <div className="space-y-2">
                {selectedPhaseData.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg bg-wine-cream/30">
                    {milestone.completed ? (
                      <CheckCircle className="w-4 h-4 text-wine-green" />
                    ) : (
                      <Circle className="w-4 h-4 text-wine-charcoal/50" />
                    )}
                    <span className={milestone.completed ? 'text-wine-charcoal' : 'text-wine-charcoal/70'}>
                      {milestone.name}
                    </span>
                    {milestone.date && (
                      <span className="text-sm text-wine-charcoal/50 ml-auto">
                        {milestone.date}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stakeholders */}
            <div>
              <h4 className="font-semibold text-wine-charcoal mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Parties Prenantes
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPhaseData.stakeholders.map((stakeholder, idx) => (
                  <Badge key={idx} variant="outline" className="border-wine-burgundy/30">
                    {stakeholder}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            {selectedPhaseData.dependencies.length > 0 && (
              <div>
                <h4 className="font-semibold text-wine-charcoal mb-3 flex items-center">
                  <Wrench className="w-4 h-4 mr-2" />
                  Dépendances
                </h4>
                <div className="space-y-1">
                  {selectedPhaseData.dependencies.map((dep, idx) => (
                    <div key={idx} className="text-wine-charcoal/70 text-sm">
                      • {dep}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risks */}
            <div>
              <h4 className="font-semibold text-wine-charcoal mb-3">
                Risques Identifiés
              </h4>
              <div className="space-y-1">
                {selectedPhaseData.risks.map((risk, idx) => (
                  <div key={idx} className="text-orange-700 text-sm bg-orange-50 p-2 rounded">
                    ⚠️ {risk}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default ImplementationTimeline;