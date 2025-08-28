import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, ArrowRight, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const TechnicalMethodology = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const processSteps = [
    {
      id: 1,
      title: "Collecte et Préparation",
      description: "Récolte et préparation initiale des marcs de raisin",
      details: [
        "Collecte des marcs frais post-vendange (septembre-novembre)",
        "Tri et élimination des impuretés (bois, métal, plastique)",
        "Séchage partiel pour optimiser le taux d'humidité (50-60%)",
        "Stockage temporaire en conditions contrôlées"
      ],
      parameters: {
        "Rendement de collecte": "80% du gisement théorique",
        "Taux d'humidité optimal": "50-60%",
        "Durée de stockage max": "15 jours",
        "Température stockage": "10-15°C"
      },
      color: "wine-burgundy"
    },
    {
      id: 2,
      title: "Fermentation Alcoolique",
      description: "Conversion des sucres résiduels en éthanol",
      details: [
        "Addition de levures sélectionnées (Saccharomyces cerevisiae)",
        "Contrôle de température (28-32°C) et pH (4.0-4.5)",
        "Durée de fermentation: 5-8 jours",
        "Monitoring continu des taux de sucre et d'alcool"
      ],
      parameters: {
        "Température fermentation": "28-32°C",
        "pH optimal": "4.0-4.5",
        "Durée": "5-8 jours",
        "Rendement alcoolique": "12-15% vol."
      },
      color: "wine-gold"
    },
    {
      id: 3,
      title: "Distillation",
      description: "Extraction et purification de l'éthanol",
      details: [
        "Distillation fractionnée en colonnes (2 passages minimum)",
        "Récupération des vapeurs d'alcool à 95-96% vol.",
        "Séparation des congénères et impuretés",
        "Recyclage des vinasses et résidus solides"
      ],
      parameters: {
        "Degré alcoolique final": "95-96% vol.",
        "Rendement extraction": "250L éthanol/tonne marc",
        "Consommation énergétique": "2.1 MWh/m³ éthanol",
        "Pureté éthanol": ">99.5%"
      },
      color: "wine-green"
    },
    {
      id: 4,
      title: "Conversion ATJ",
      description: "Transformation éthanol vers kérosène biosourcé",
      details: [
        "Déshydratation catalytique de l'éthanol en éthylène",
        "Oligomérisation pour formation d'hydrocarbures C8-C16",
        "Hydrogénation et hydrocraquage sélectif",
        "Fractionnement et purification finale"
      ],
      parameters: {
        "Efficacité conversion": "70% éthanol→SAF",
        "Température réaction": "300-400°C",
        "Pression": "20-30 bar",
        "Catalyseur": "HZSM-5 modifié"
      },
      color: "wine-charcoal"
    }
  ];

  const exportMethodology = () => {
    const methodologyData = {
      title: "Méthodologie Technique SAF - Languedoc-Roussillon",
      version: "v2.1",
      date: new Date().toISOString(),
      processSteps,
      keyMetrics: {
        overallYield: "280 L SAF / tonne marc (base humide)",
        energyBalance: "Positif (+15% autonomie énergétique)",
        co2Reduction: "85% vs kérosène fossile",
        processingTime: "15-20 jours (collecte → SAF)",
        qualityStandard: "ASTM D7566 Annex A5 (ATJ-SPK)"
      },
      regulatoryCompliance: {
        EU_RED_II: "Conforme directive énergies renouvelables",
        CORSIA_ICAO: "Éligible mécanisme CORSIA",
        REACH: "Substances enregistrées"
      }
    };

    const blob = new Blob([JSON.stringify(methodologyData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `methodologie-technique-saf-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-wine-burgundy" size={28} />
            <span className="text-2xl text-wine-charcoal">Méthodologie Technique</span>
          </div>
          <Button onClick={exportMethodology} variant="outline" size="sm" className="gap-2">
            <Download size={16} />
            Exporter
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="flowchart" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flowchart">Diagramme de flux</TabsTrigger>
            <TabsTrigger value="parameters">Paramètres clés</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
          </TabsList>

          <TabsContent value="flowchart" className="space-y-4">
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <Collapsible
                  key={step.id}
                  open={expandedStep === index}
                  onOpenChange={() => setExpandedStep(expandedStep === index ? null : index)}
                >
                  <CollapsibleTrigger asChild>
                    <div className={`p-4 rounded-lg border-2 border-${step.color}/20 bg-gradient-to-r from-${step.color}/5 to-${step.color}/10 cursor-pointer hover:shadow-md transition-all duration-200`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full bg-${step.color} text-white flex items-center justify-center font-bold text-sm`}>
                            {step.id}
                          </div>
                          <div>
                            <h4 className="font-semibold text-wine-charcoal">{step.title}</h4>
                            <p className="text-sm text-wine-charcoal/70">{step.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {index < processSteps.length - 1 && (
                            <ArrowRight className="text-wine-charcoal/40" size={20} />
                          )}
                          {expandedStep === index ? (
                            <ChevronDown className="text-wine-charcoal/60" size={20} />
                          ) : (
                            <ChevronRight className="text-wine-charcoal/60" size={20} />
                          )}
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-3 mt-2">
                    <div className="ml-12 p-4 bg-wine-cream/10 rounded-lg">
                      <h5 className="font-medium text-wine-charcoal mb-3">Étapes détaillées:</h5>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="text-sm text-wine-charcoal/80 flex items-start gap-2">
                            <span className="text-wine-burgundy">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="ml-12 p-4 bg-gradient-subtle rounded-lg">
                      <h5 className="font-medium text-wine-charcoal mb-3">Paramètres opérationnels:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(step.parameters).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-sm">
                            <span className="text-wine-charcoal/70">{key}:</span>
                            <Badge variant="outline" className="text-wine-charcoal">
                              {value}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="parameters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-wine-burgundy">Paramètres de Performance</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Rendement global</span>
                      <Badge className="bg-wine-burgundy text-white">280 L SAF/tonne</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      Base: marc humide (55% MS), efficacité ATJ 70%
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Bilan énergétique</span>
                      <Badge className="bg-wine-green text-white">+15% autonome</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      Valorisation énergétique des résidus de distillation
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Qualité SAF</span>
                      <Badge className="bg-wine-gold text-white">ASTM D7566-A5</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      Conforme spécifications Alcohol-to-Jet
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-wine-charcoal">Contraintes Opérationnelles</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Saisonnalité</span>
                      <Badge variant="outline">Sept-Nov</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      Collecte concentrée sur 3 mois, stockage nécessaire
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Logistique</span>
                      <Badge variant="outline">Rayon 50km</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      Optimisation transport vs coûts de collecte
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Variabilité</span>
                      <Badge variant="outline">±15% annual</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      Dépendance aux conditions climatiques
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="validation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-wine-burgundy">Validation Expérimentale</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-green">
                    <div className="font-medium text-wine-charcoal mb-1">Pilote IFV Pech Rouge</div>
                    <div className="text-sm text-wine-charcoal/70 mb-2">Validation à échelle 100L/h</div>
                    <div className="text-xs text-wine-charcoal/60">
                      Rendement confirmé: 275±15 L/tonne
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-gold">
                    <div className="font-medium text-wine-charcoal mb-1">Tests qualité Safran</div>
                    <div className="text-sm text-wine-charcoal/70 mb-2">Certification carburant aviation</div>
                    <div className="text-xs text-wine-charcoal/60">
                      100% compatibilité ASTM D7566
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-burgundy">
                    <div className="font-medium text-wine-charcoal mb-1">Partenariat INRAE</div>
                    <div className="text-sm text-wine-charcoal/70 mb-2">Optimisation catalyseurs ATJ</div>
                    <div className="text-xs text-wine-charcoal/60">
                      Amélioration efficacité de +5%
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-wine-charcoal">Conformité Réglementaire</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">RED II (UE)</span>
                      <Badge className="bg-green-600 text-white">Conforme</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      GES savings: 86% vs kérosène fossile
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">CORSIA ICAO</span>
                      <Badge className="bg-blue-600 text-white">Éligible</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      Carburant sustainable liste positive
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">ReFuelEU Aviation</span>
                      <Badge className="bg-purple-600 text-white">Anticipé</Badge>
                    </div>
                    <div className="text-xs text-wine-charcoal/60">
                      Mandats SAF 2025-2050 couverts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TechnicalMethodology;