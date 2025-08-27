import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building, Leaf, Euro, TrendingUp, MapPin } from "lucide-react";

interface Benefit {
  category: string;
  description: string;
  value: string;
  timeline: string;
  priority: 'high' | 'medium' | 'low';
}

interface Stakeholder {
  id: string;
  name: string;
  type: 'winery' | 'cooperative' | 'government' | 'community' | 'investor' | 'airline';
  role: string;
  benefits: Benefit[];
  concerns: string[];
  engagement: 'active' | 'passive' | 'resistance';
}

const StakeholderBenefitsAnalysis = () => {
  const [selectedView, setSelectedView] = useState<'all' | string>('all');

  const stakeholders: Stakeholder[] = [
    {
      id: 'wineries',
      name: 'Vignerons et Châteaux',
      type: 'winery',
      role: 'Fournisseurs de biomasse',
      benefits: [
        {
          category: 'Économique',
          description: 'Revenus additionnels pour les co-produits',
          value: '€40-60/tonne',
          timeline: 'Immédiat',
          priority: 'high'
        },
        {
          category: 'Environnemental',
          description: 'Réduction des déchets viticoles',
          value: '100% valorisation',
          timeline: '1-2 ans',
          priority: 'high'
        },
        {
          category: 'Image',
          description: 'Positionnement développement durable',
          value: 'Différenciation marché',
          timeline: '6 mois',
          priority: 'medium'
        }
      ],
      concerns: [
        'Impact sur les volumes de production',
        'Logistique de collecte',
        'Conditions tarifaires'
      ],
      engagement: 'active'
    },
    {
      id: 'cooperatives',
      name: 'Coopératives Viticoles',
      type: 'cooperative',
      role: 'Agrégateurs et transformateurs',
      benefits: [
        {
          category: 'Économique',
          description: 'Nouvelle source de revenus',
          value: '€2-4M/an',
          timeline: '2-3 ans',
          priority: 'high'
        },
        {
          category: 'Emploi',
          description: 'Création d\'emplois techniques',
          value: '15-25 postes',
          timeline: '2-3 ans',
          priority: 'high'
        },
        {
          category: 'Innovation',
          description: 'Modernisation des activités',
          value: 'Diversification',
          timeline: '1-2 ans',
          priority: 'medium'
        }
      ],
      concerns: [
        'Investissements en équipements',
        'Formation du personnel',
        'Gestion des risques'
      ],
      engagement: 'active'
    },
    {
      id: 'government',
      name: 'Collectivités Territoriales',
      type: 'government',
      role: 'Facilitateurs et régulateurs',
      benefits: [
        {
          category: 'Fiscal',
          description: 'Recettes fiscales supplémentaires',
          value: '€3-5M/an',
          timeline: '3-4 ans',
          priority: 'high'
        },
        {
          category: 'Emploi',
          description: 'Dynamisation de l\'emploi local',
          value: '200+ emplois directs/indirects',
          timeline: '2-4 ans',
          priority: 'high'
        },
        {
          category: 'Environnemental',
          description: 'Objectifs décarbonation',
          value: 'Réduction 15% émissions',
          timeline: '5-10 ans',
          priority: 'medium'
        }
      ],
      concerns: [
        'Acceptabilité sociale',
        'Impact environnemental',
        'Retombées économiques locales'
      ],
      engagement: 'passive'
    },
    {
      id: 'community',
      name: 'Communautés Locales',
      type: 'community',
      role: 'Bénéficiaires indirects',
      benefits: [
        {
          category: 'Emploi',
          description: 'Opportunités d\'emploi local',
          value: '85 emplois directs',
          timeline: '2-3 ans',
          priority: 'high'
        },
        {
          category: 'Environnemental',
          description: 'Amélioration qualité de l\'air',
          value: 'Réduction pollution',
          timeline: '3-5 ans',
          priority: 'medium'
        },
        {
          category: 'Infrastructure',
          description: 'Amélioration des infrastructures',
          value: 'Routes, services',
          timeline: '2-4 ans',
          priority: 'low'
        }
      ],
      concerns: [
        'Nuisances potentielles',
        'Circulation routière',
        'Impact paysager'
      ],
      engagement: 'passive'
    },
    {
      id: 'investors',
      name: 'Investisseurs',
      type: 'investor',
      role: 'Apporteurs de capitaux',
      benefits: [
        {
          category: 'Financier',
          description: 'Retour sur investissement',
          value: 'ROI 12-18%',
          timeline: '3-5 ans',
          priority: 'high'
        },
        {
          category: 'ESG',
          description: 'Impact environnemental positif',
          value: 'Scoring ESG amélioré',
          timeline: '1-2 ans',
          priority: 'medium'
        },
        {
          category: 'Innovation',
          description: 'Exposition technologies vertes',
          value: 'Positionnement marché',
          timeline: '6 mois',
          priority: 'medium'
        }
      ],
      concerns: [
        'Risques technologiques',
        'Volatilité des prix SAF',
        'Réglementation évolutive'
      ],
      engagement: 'active'
    },
    {
      id: 'airlines',
      name: 'Compagnies Aériennes',
      type: 'airline',
      role: 'Clients finaux',
      benefits: [
        {
          category: 'Réglementaire',
          description: 'Conformité mandats UE',
          value: 'Éviter pénalités',
          timeline: '2025-2030',
          priority: 'high'
        },
        {
          category: 'Image',
          description: 'Engagement décarbonation',
          value: 'Différenciation concurrentielle',
          timeline: '1-2 ans',
          priority: 'high'
        },
        {
          category: 'Opérationnel',
          description: 'Sécurisation approvisionnement SAF',
          value: 'Contrats long terme',
          timeline: '2-3 ans',
          priority: 'medium'
        }
      ],
      concerns: [
        'Coût premium du SAF',
        'Disponibilité volumes',
        'Qualité et certification'
      ],
      engagement: 'active'
    }
  ];

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'active': return 'text-wine-green bg-wine-green/10 border-wine-green/20';
      case 'passive': return 'text-wine-gold bg-wine-gold/10 border-wine-gold/20';
      case 'resistance': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-wine-burgundy bg-wine-burgundy/10 border-wine-burgundy/20';
      case 'medium': return 'text-wine-gold bg-wine-gold/10 border-wine-gold/20';
      case 'low': return 'text-wine-charcoal bg-wine-charcoal/10 border-wine-charcoal/20';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStakeholderIcon = (type: string) => {
    switch (type) {
      case 'winery': return <Leaf className="w-5 h-5" />;
      case 'cooperative': return <Building className="w-5 h-5" />;
      case 'government': return <MapPin className="w-5 h-5" />;
      case 'community': return <Users className="w-5 h-5" />;
      case 'investor': return <Euro className="w-5 h-5" />;
      case 'airline': return <TrendingUp className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const filteredStakeholders = selectedView === 'all' 
    ? stakeholders 
    : stakeholders.filter(s => s.id === selectedView);

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Users className="text-wine-burgundy w-7 h-7" />
          <span className="text-2xl text-wine-charcoal">Analyse des Bénéfices par Partie Prenante</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <Tabs value={selectedView} onValueChange={setSelectedView}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">Vue globale</TabsTrigger>
            <TabsTrigger value="wineries">Vignerons</TabsTrigger>
            <TabsTrigger value="cooperatives">Coopératives</TabsTrigger>
            <TabsTrigger value="government">Collectivités</TabsTrigger>
            <TabsTrigger value="community">Communautés</TabsTrigger>
            <TabsTrigger value="investors">Investisseurs</TabsTrigger>
            <TabsTrigger value="airlines">Compagnies</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedView} className="space-y-6 mt-6">
            {selectedView === 'all' ? (
              // Overview Grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stakeholders.map((stakeholder) => (
                  <div
                    key={stakeholder.id}
                    className="p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40 hover:border-wine-burgundy/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedView(stakeholder.id)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-wine-burgundy/10 rounded-lg">
                        {getStakeholderIcon(stakeholder.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-wine-charcoal">{stakeholder.name}</h3>
                        <p className="text-sm text-wine-charcoal/70">{stakeholder.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-wine-charcoal">Engagement:</span>
                        <Badge className={getEngagementColor(stakeholder.engagement)}>
                          {stakeholder.engagement === 'active' ? 'Actif' :
                           stakeholder.engagement === 'passive' ? 'Passif' :
                           'Résistant'}
                        </Badge>
                      </div>

                      <div>
                        <span className="text-sm text-wine-charcoal mb-2 block">Bénéfices clés:</span>
                        <div className="space-y-1">
                          {stakeholder.benefits.slice(0, 2).map((benefit, index) => (
                            <div key={index} className="text-xs text-wine-charcoal/70">
                              • {benefit.description}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="w-full">
                        Voir détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Detailed View
              filteredStakeholders.map((stakeholder) => (
                <div key={stakeholder.id} className="space-y-6">
                  <div className="flex items-center gap-4 p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40">
                    <div className="p-3 bg-wine-burgundy/10 rounded-lg">
                      {getStakeholderIcon(stakeholder.type)}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-wine-charcoal">{stakeholder.name}</h2>
                      <p className="text-wine-charcoal/70">{stakeholder.role}</p>
                    </div>
                    <Badge className={getEngagementColor(stakeholder.engagement)}>
                      {stakeholder.engagement === 'active' ? 'Engagement Actif' :
                       stakeholder.engagement === 'passive' ? 'Engagement Passif' :
                       'Résistance'}
                    </Badge>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-wine-charcoal mb-4">Bénéfices Attendus</h3>
                      <div className="space-y-4">
                        {stakeholder.benefits.map((benefit, index) => (
                          <div key={index} className="p-4 bg-white/70 rounded-lg border border-wine-cream/40">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-wine-charcoal">{benefit.category}</h4>
                              <Badge className={getPriorityColor(benefit.priority)}>
                                {benefit.priority === 'high' ? 'Élevé' :
                                 benefit.priority === 'medium' ? 'Moyen' :
                                 'Faible'}
                              </Badge>
                            </div>
                            <p className="text-wine-charcoal/80 text-sm mb-2">{benefit.description}</p>
                            <div className="flex justify-between text-xs text-wine-charcoal/60">
                              <span><strong>Valeur:</strong> {benefit.value}</span>
                              <span><strong>Timeline:</strong> {benefit.timeline}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-wine-charcoal mb-4">Préoccupations</h3>
                      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
                        <div className="space-y-2">
                          {stakeholder.concerns.map((concern, index) => (
                            <div key={index} className="text-sm text-orange-700">
                              ⚠️ {concern}
                            </div>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-wine-charcoal mb-4">Plan d'Engagement</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-wine-green/5 rounded-lg border border-wine-green/20">
                          <div className="font-medium text-wine-green mb-1">Communication</div>
                          <div className="text-sm text-wine-charcoal/70">
                            Présentations, ateliers, documentation technique
                          </div>
                        </div>
                        <div className="p-3 bg-wine-gold/5 rounded-lg border border-wine-gold/20">
                          <div className="font-medium text-wine-gold mb-1">Négociation</div>
                          <div className="text-sm text-wine-charcoal/70">
                            Conditions contractuelles, garanties, calendrier
                          </div>
                        </div>
                        <div className="p-3 bg-wine-burgundy/5 rounded-lg border border-wine-burgundy/20">
                          <div className="font-medium text-wine-burgundy mb-1">Suivi</div>
                          <div className="text-sm text-wine-charcoal/70">
                            Comités de pilotage, reporting, ajustements
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Summary Stats */}
        {selectedView === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-wine-cream">
            <div className="text-center p-3 bg-wine-green/5 rounded-lg">
              <div className="text-xl font-bold text-wine-green">
                {stakeholders.filter(s => s.engagement === 'active').length}
              </div>
              <div className="text-sm text-wine-charcoal/70">Engagements actifs</div>
            </div>
            
            <div className="text-center p-3 bg-wine-burgundy/5 rounded-lg">
              <div className="text-xl font-bold text-wine-burgundy">
                {stakeholders.reduce((acc, s) => acc + s.benefits.filter(b => b.priority === 'high').length, 0)}
              </div>
              <div className="text-sm text-wine-charcoal/70">Bénéfices prioritaires</div>
            </div>
            
            <div className="text-center p-3 bg-wine-gold/5 rounded-lg">
              <div className="text-xl font-bold text-wine-gold">
                {stakeholders.reduce((acc, s) => acc + s.concerns.length, 0)}
              </div>
              <div className="text-sm text-wine-charcoal/70">Préoccupations identifiées</div>
            </div>
            
            <div className="text-center p-3 bg-wine-charcoal/5 rounded-lg">
              <div className="text-xl font-bold text-wine-charcoal">6</div>
              <div className="text-sm text-wine-charcoal/70">Types de parties prenantes</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StakeholderBenefitsAnalysis;