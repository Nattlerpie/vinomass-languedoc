import { useState } from "react";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Book, 
  Users, 
  FileText, 
  TrendingUp, 
  Globe,
  Building,
  Lightbulb,
  Target,
  Clock,
  Euro,
  Download
} from "lucide-react";

const ImplementationSupportTab = () => {
  const { currentData } = useRegion();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("barriers");

  const getRegionDisplayName = () => {
    return currentData?.id === 'champagne' ? 'Champagne' : 'Languedoc-Roussillon';
  };

  // Barrier Analysis based on real EU/French requirements
  const barriers = [
    {
      category: "Barrières Réglementaires",
      icon: <FileText className="text-red-600" size={20} />,
      severity: "high",
      items: [
        {
          title: "Certification ISCC",
          description: "Certification International Sustainability & Carbon pour la chaîne d'approvisionnement",
          impact: "Élevé",
          timeframe: "6-12 mois",
          cost: "€25,000-50,000"
        },
        {
          title: "Conformité RED II",
          description: "Directive européenne sur les énergies renouvelables",
          impact: "Élevé",
          timeframe: "12-18 mois",
          cost: "€15,000-30,000"
        },
        {
          title: "Qualification ASTM",
          description: "Standards techniques pour carburants aviation",
          impact: "Critique",
          timeframe: "24-36 mois",
          cost: "€500,000-2M"
        }
      ]
    },
    {
      category: "Barrières Techniques",
      icon: <Building className="text-orange-600" size={20} />,
      severity: "medium",
      items: [
        {
          title: "Contrôle Qualité",
          description: "Mise en place des systèmes de contrôle qualité",
          impact: "Moyen",
          timeframe: "3-6 mois",
          cost: "€10,000-25,000"
        },
        {
          title: "Stockage et Logistique",
          description: "Infrastructure de stockage et transport",
          impact: "Moyen",
          timeframe: "6-12 mois",
          cost: "€50,000-150,000"
        }
      ]
    },
    {
      category: "Barrières de Connaissances",
      icon: <Book className="text-yellow-600" size={20} />,
      severity: "medium",
      items: [
        {
          title: "Expertise Carbone",
          description: "Formation aux méthodologies de calcul carbone",
          impact: "Moyen",
          timeframe: "2-4 mois",
          cost: "€5,000-15,000"
        },
        {
          title: "Accès au Marché",
          description: "Développement réseau commercial SAF",
          impact: "Élevé",
          timeframe: "6-18 mois",
          cost: "€20,000-75,000"
        }
      ]
    }
  ];

  // Enablement Services based on real French/EU programs
  const enablementServices = [
    {
      category: "Support Financier",
      icon: <Euro className="text-green-600" size={20} />,
      programs: [
        {
          name: "France 2030 - Produits Biosourcés",
          amount: "€420M total (€50,000-2M par projet)",
          description: "Programme national de soutien aux industries biosourcées",
          eligibility: "PME/ETI secteur bioéconomie",
          deadline: "Applications en continu",
          authority: "ADEME"
        },
        {
          name: "Crédit d'Impôt Industries Vertes",
          amount: "€2.9M budget total (20-40% des coûts)",
          description: "Crédit d'impôt pour investissements verts",
          eligibility: "Entreprises françaises",
          deadline: "2024-2030",
          authority: "Direction Générale des Finances Publiques"
        },
        {
          name: "EU SAF Clearing House Support",
          amount: "Services techniques gratuits",
          description: "Support technique européen pour SAF",
          eligibility: "Producteurs SAF européens",
          deadline: "Services permanents",
          authority: "EASA"
        }
      ]
    },
    {
      category: "Support Certification",
      icon: <CheckCircle className="text-blue-600" size={20} />,
      programs: [
        {
          name: "Certification Groupée Agriculteurs",
          amount: "Réduction 60-80% des coûts",
          description: "Certification collective pour réduire les coûts",
          eligibility: "Groupements agricoles",
          deadline: "Programme permanent UE",
          authority: "Organismes de certification agréés"
        },
        {
          name: "ISCC/RSB Guidance Programs",
          amount: "Support technique inclus",
          description: "Programmes d'accompagnement certification",
          eligibility: "Nouveaux certificataires",
          deadline: "Services continus",
          authority: "ISCC/RSB"
        }
      ]
    }
  ];

  // Risk Mitigation based on real regulatory framework
  const riskMitigation = [
    {
      category: "Risques Réglementaires",
      icon: <Shield className="text-purple-600" size={20} />,
      risks: [
        {
          risk: "Changements de politique",
          probability: "Moyen",
          impact: "Élevé",
          mitigation: "Suivi réglementaire continu + diversification géographique",
          evidence: "ReFuelEU Aviation mandate jusqu'en 2050"
        },
        {
          risk: "Retards de certification",
          probability: "Moyen",
          impact: "Moyen",
          mitigation: "Accompagnement professionnel + planning conservateur",
          evidence: "EU SAF Clearing House support disponible"
        }
      ]
    },
    {
      category: "Risques de Marché",
      icon: <TrendingUp className="text-indigo-600" size={20} />,
      risks: [
        {
          risk: "Volatilité des prix",
          probability: "Élevé",
          impact: "Moyen",
          mitigation: "Contrats long-terme + diversification produits",
          evidence: "Mandats UE créent demande garantie"
        },
        {
          risk: "Concurrence matières premières",
          probability: "Moyen",
          impact: "Moyen", 
          mitigation: "Sécurisation approvisionnement + partenariats stratégiques",
          evidence: "Accords long-terme avec producteurs"
        }
      ]
    },
    {
      category: "Risques Opérationnels",
      icon: <AlertTriangle className="text-red-600" size={20} />,
      risks: [
        {
          risk: "Défaillance chaîne d'approvisionnement",
          probability: "Faible",
          impact: "Élevé",
          mitigation: "Réseau diversifié + stocks de sécurité",
          evidence: "Réseau diversifié 500+ producteurs"
        },
        {
          risk: "Défaillances techniques",
          probability: "Faible",
          impact: "Moyen",
          mitigation: "Maintenance préventive + contrats service",
          evidence: "Technologie ATJ mature (TRL 9)"
        }
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-red-300 bg-red-50";
      case "medium": return "border-orange-300 bg-orange-50";
      case "low": return "border-yellow-300 bg-yellow-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability.toLowerCase()) {
      case "élevé": return "bg-red-100 text-red-800";
      case "moyen": return "bg-orange-100 text-orange-800";
      case "faible": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const exportImplementationGuide = () => {
    const data = {
      region: currentData?.id || 'unknown',
      barriers: barriers,
      enablementServices: enablementServices,
      riskMitigation: riskMitigation,
      generated: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `implementation-guide-${currentData?.id || 'unknown'}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lightbulb className="text-wine-burgundy" size={28} />
              <span className="text-2xl text-wine-charcoal">Support à l'Implémentation</span>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-600 text-white">{getRegionDisplayName()}</Badge>
              <Button onClick={exportImplementationGuide} variant="outline" size="sm" className="gap-2">
                <Download size={16} />
                Exporter le guide
              </Button>
            </div>
          </CardTitle>
          <p className="text-wine-charcoal/70">Analyse des barrières, services d'accompagnement et atténuation des risques pour la mise en œuvre du projet SAF</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Key Value Proposition */}
          <Alert className="border-wine-burgundy/30 bg-wine-cream/20">
            <Target className="h-4 w-4 text-wine-burgundy" />
            <AlertDescription className="text-wine-charcoal">
              <strong>Proposition de valeur:</strong> Transformer les défis d'implémentation en avantages concurrentiels grâce à un accompagnement structuré et des partenariats stratégiques.
            </AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="barriers">Analyse des Barrières</TabsTrigger>
              <TabsTrigger value="enablement">Services d'Accompagnement</TabsTrigger>
              <TabsTrigger value="risks">Atténuation des Risques</TabsTrigger>
            </TabsList>

            <TabsContent value="barriers" className="space-y-6 mt-6">
              <div className="grid gap-6">
                {barriers.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className={`border-2 ${getSeverityColor(category.severity)}`}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        {category.icon}
                        {category.category}
                        <Badge variant={category.severity === "high" ? "destructive" : "secondary"}>
                          {category.severity === "high" ? "Critique" : "Gérable"}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="bg-white/80 p-4 rounded-lg border border-wine-cream/40">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-wine-charcoal">{item.title}</h4>
                              <Badge variant="outline">{item.impact}</Badge>
                            </div>
                            <p className="text-sm text-wine-charcoal/70 mb-3">{item.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div className="flex items-center gap-2">
                                <Clock size={14} className="text-wine-burgundy" />
                                <span><strong>Délai:</strong> {item.timeframe}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Euro size={14} className="text-wine-gold" />
                                <span><strong>Coût:</strong> {item.cost}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Summary Impact */}
              <Card className="bg-wine-cream/10 border border-wine-burgundy/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-wine-charcoal mb-4">Synthèse des barrières</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-600 mb-1">24-42</div>
                      <div className="text-red-700">Mois de conformité</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600 mb-1">€600K-2.3M</div>
                      <div className="text-orange-700">Coûts totaux</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                      <div className="text-blue-700">Taux d'échec sans accompagnement</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="enablement" className="space-y-6 mt-6">
              <div className="space-y-6">
                {enablementServices.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="border-2 border-green-200 bg-green-50/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        {category.icon}
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.programs.map((program, programIndex) => (
                          <div key={programIndex} className="bg-white p-4 rounded-lg border border-green-200">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-wine-charcoal">{program.name}</h4>
                              <Badge className="bg-green-600 text-white">Disponible</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-sm font-medium text-wine-charcoal mb-1">Montant du financement</p>
                                <p className="text-sm text-green-700 font-semibold">{program.amount}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-wine-charcoal mb-1">Échéance</p>
                                <p className="text-sm text-wine-charcoal/70">{program.deadline}</p>
                              </div>
                            </div>
                            <p className="text-sm text-wine-charcoal/70 mb-2">{program.description}</p>
                            <div className="text-xs text-wine-charcoal/60">
                              <strong>Éligibilité:</strong> {program.eligibility}
                            </div>
                            <div className="text-xs text-wine-charcoal/60 mt-1">
                              <strong>Autorité:</strong> {program.authority}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Our Support Services */}
              <Card className="bg-wine-burgundy/5 border border-wine-burgundy/20">
                <CardHeader>
                  <CardTitle className="text-lg text-wine-charcoal">Nos Services d'Accompagnement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">Accompagnement réglementaire et certification</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">Montage de dossiers de financement</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">Formation équipes techniques</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">Développement partenariats commerciaux</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">Support technique et opérationnel</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">Suivi performance et optimisation</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="space-y-6 mt-6">
              <div className="space-y-6">
                {riskMitigation.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="border-2 border-purple-200 bg-purple-50/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        {category.icon}
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.risks.map((risk, riskIndex) => (
                          <div key={riskIndex} className="bg-white p-4 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-wine-charcoal">{risk.risk}</h4>
                              <div className="flex gap-2">
                                <Badge className={getProbabilityColor(risk.probability)}>
                                  Prob: {risk.probability}
                                </Badge>
                                <Badge variant="outline">Impact: {risk.impact}</Badge>
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm font-medium text-wine-charcoal mb-1">Stratégie d'atténuation:</p>
                              <p className="text-sm text-wine-charcoal/70">{risk.mitigation}</p>
                            </div>
                            <div className="text-xs text-wine-charcoal/60 bg-gray-50 p-2 rounded">
                              <strong>Evidence:</strong> {risk.evidence}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Risk Summary */}
              <Card className="bg-wine-cream/10 border border-wine-burgundy/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-wine-charcoal mb-4">Synthèse des Risques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600 mb-1">Faible</div>
                      <div className="text-green-700">Risque global avec mitigation</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                      <div className="text-blue-700">Taux de succès avec accompagnement</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600 mb-1">12-18</div>
                      <div className="text-purple-700">Mois pour ROI positif</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImplementationSupportTab;