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

const ImplementationSupport = () => {
  const { currentData, regionId } = useRegion();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("barriers");

  const getRegionDisplayName = () => {
    return regionId === 'champagne' ? 'Champagne' : 'Languedoc-Roussillon';
  };

  // Barrier Analysis based on real EU/French requirements
  const barriers = [
    {
      category: t('implementation.regulatory.barriers'),
      icon: <FileText className="text-red-600" size={20} />,
      severity: "high",
      items: [
        {
          title: t('implementation.iscc.certification'),
          description: t('implementation.iscc.description'),
          impact: t('implementation.impact.high'),
          timeframe: t('implementation.timeframe.6-12'),
          cost: "€25,000-50,000"
        },
        {
          title: t('implementation.red.ii.compliance'),
          description: t('implementation.red.ii.description'),
          impact: t('implementation.impact.high'),
          timeframe: t('implementation.timeframe.12-18'),
          cost: "€15,000-30,000"
        },
        {
          title: t('implementation.astm.qualification'),
          description: t('implementation.astm.description'),
          impact: t('implementation.impact.critical'),
          timeframe: t('implementation.timeframe.24-36'),
          cost: "€500,000-2M"
        }
      ]
    },
    {
      category: t('implementation.technical.barriers'),
      icon: <Building className="text-orange-600" size={20} />,
      severity: "medium",
      items: [
        {
          title: t('implementation.quality.control'),
          description: t('implementation.quality.description'),
          impact: t('implementation.impact.medium'),
          timeframe: t('implementation.timeframe.3-6'),
          cost: "€10,000-25,000"
        },
        {
          title: t('implementation.storage.logistics'),
          description: t('implementation.storage.description'),
          impact: t('implementation.impact.medium'),
          timeframe: t('implementation.timeframe.6-12'),
          cost: "€50,000-150,000"
        }
      ]
    },
    {
      category: t('implementation.knowledge.barriers'),
      icon: <Book className="text-yellow-600" size={20} />,
      severity: "medium",
      items: [
        {
          title: t('implementation.carbon.expertise'),
          description: t('implementation.carbon.description'),
          impact: t('implementation.impact.medium'),
          timeframe: t('implementation.timeframe.2-4'),
          cost: "€5,000-15,000"
        },
        {
          title: t('implementation.market.access'),
          description: t('implementation.market.description'),
          impact: t('implementation.impact.high'),
          timeframe: t('implementation.timeframe.6-18'),
          cost: "€20,000-75,000"
        }
      ]
    }
  ];

  // Enablement Services based on real French/EU programs
  const enablementServices = [
    {
      category: t('implementation.financial.support'),
      icon: <Euro className="text-green-600" size={20} />,
      programs: [
        {
          name: "France 2030 - Produits Biosourcés",
          amount: "€420M total (€50,000-2M par projet)",
          description: t('implementation.france2030.description'),
          eligibility: t('implementation.france2030.eligibility'),
          deadline: "Applications en continu",
          authority: "ADEME"
        },
        {
          name: "Crédit d'Impôt Industries Vertes",
          amount: "€2.9M budget total (20-40% des coûts)",
          description: t('implementation.tax.credit.description'),
          eligibility: t('implementation.tax.credit.eligibility'),
          deadline: "2024-2030",
          authority: "Direction Générale des Finances Publiques"
        },
        {
          name: "EU SAF Clearing House Support",
          amount: "Services techniques gratuits",
          description: t('implementation.clearing.house.description'),
          eligibility: t('implementation.clearing.house.eligibility'),
          deadline: "Services permanents",
          authority: "EASA"
        }
      ]
    },
    {
      category: t('implementation.certification.support'),
      icon: <CheckCircle className="text-blue-600" size={20} />,
      programs: [
        {
          name: "Certification Groupée Agriculteurs",
          amount: "Réduction 60-80% des coûts",
          description: t('implementation.group.cert.description'),
          eligibility: t('implementation.group.cert.eligibility'),
          deadline: "Programme permanent UE",
          authority: "Organismes de certification agréés"
        },
        {
          name: "ISCC/RSB Guidance Programs",
          amount: "Support technique inclus",
          description: t('implementation.guidance.description'),
          eligibility: t('implementation.guidance.eligibility'),
          deadline: "Services continus",
          authority: "ISCC/RSB"
        }
      ]
    }
  ];

  // Risk Mitigation based on real regulatory framework
  const riskMitigation = [
    {
      category: t('implementation.regulatory.risks'),
      icon: <Shield className="text-purple-600" size={20} />,
      risks: [
        {
          risk: t('implementation.policy.changes'),
          probability: "Medium",
          impact: "High",
          mitigation: t('implementation.policy.mitigation'),
          evidence: "ReFuelEU Aviation mandate jusqu'en 2050"
        },
        {
          risk: t('implementation.certification.delays'),
          probability: "Medium",
          impact: "Medium",
          mitigation: t('implementation.certification.mitigation'),
          evidence: "EU SAF Clearing House support disponible"
        }
      ]
    },
    {
      category: t('implementation.market.risks'),
      icon: <TrendingUp className="text-indigo-600" size={20} />,
      risks: [
        {
          risk: t('implementation.price.volatility'),
          probability: "High",
          impact: "Medium",
          mitigation: t('implementation.price.mitigation'),
          evidence: "Mandats UE créent demande garantie"
        },
        {
          risk: t('implementation.competition.feedstock'),
          probability: "Medium",
          impact: "Medium", 
          mitigation: t('implementation.competition.mitigation'),
          evidence: "Accords long-terme avec producteurs"
        }
      ]
    },
    {
      category: t('implementation.operational.risks'),
      icon: <AlertTriangle className="text-red-600" size={20} />,
      risks: [
        {
          risk: t('implementation.supply.chain'),
          probability: "Low",
          impact: "High",
          mitigation: t('implementation.supply.mitigation'),
          evidence: "Réseau diversifié 500+ producteurs"
        },
        {
          risk: t('implementation.technical.failures'),
          probability: "Low",
          impact: "Medium",
          mitigation: t('implementation.technical.mitigation'),
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
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const exportImplementationGuide = () => {
    const data = {
      region: regionId,
      barriers: barriers,
      enablementServices: enablementServices,
      riskMitigation: riskMitigation,
      generated: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `implementation-guide-${regionId}-${new Date().toISOString().split('T')[0]}.json`;
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
              <span className="text-2xl text-wine-charcoal">{t('implementation.title')}</span>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-600 text-white">{getRegionDisplayName()}</Badge>
              <Button onClick={exportImplementationGuide} variant="outline" size="sm" className="gap-2">
                <Download size={16} />
                {t('implementation.export')}
              </Button>
            </div>
          </CardTitle>
          <p className="text-wine-charcoal/70">{t('implementation.subtitle')}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Key Value Proposition */}
          <Alert className="border-wine-burgundy/30 bg-wine-cream/20">
            <Target className="h-4 w-4 text-wine-burgundy" />
            <AlertDescription className="text-wine-charcoal">
              <strong>{t('implementation.value.proposition')}:</strong> {t('implementation.value.description')}
            </AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="barriers">{t('implementation.barrier.analysis')}</TabsTrigger>
              <TabsTrigger value="enablement">{t('implementation.enablement.services')}</TabsTrigger>
              <TabsTrigger value="risks">{t('implementation.risk.mitigation')}</TabsTrigger>
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
                          {category.severity === "high" ? t('implementation.critical') : t('implementation.manageable')}
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
                                <span><strong>{t('implementation.delay')}:</strong> {item.timeframe}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Euro size={14} className="text-wine-gold" />
                                <span><strong>{t('implementation.cost')}:</strong> {item.cost}</span>
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
                  <h3 className="text-lg font-semibold text-wine-charcoal mb-4">{t('implementation.barrier.summary')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-600 mb-1">24-42</div>
                      <div className="text-red-700">{t('implementation.months.compliance')}</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600 mb-1">€600K-2.3M</div>
                      <div className="text-orange-700">{t('implementation.total.costs')}</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                      <div className="text-blue-700">{t('implementation.failure.rate')}</div>
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
                              <Badge className="bg-green-600 text-white">{t('implementation.available')}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-sm font-medium text-wine-charcoal mb-1">{t('implementation.funding.amount')}</p>
                                <p className="text-sm text-green-700 font-semibold">{program.amount}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-wine-charcoal mb-1">{t('implementation.deadline')}</p>
                                <p className="text-sm text-wine-charcoal/70">{program.deadline}</p>
                              </div>
                            </div>
                            <p className="text-sm text-wine-charcoal/70 mb-2">{program.description}</p>
                            <div className="text-xs text-wine-charcoal/60">
                              <strong>{t('implementation.eligibility')}:</strong> {program.eligibility}
                            </div>
                            <div className="text-xs text-wine-charcoal/60 mt-1">
                              <strong>{t('implementation.authority')}:</strong> {program.authority}
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
                  <CardTitle className="text-lg text-wine-charcoal">{t('implementation.our.services')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.regulatory')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.funding')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.certification')}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.market')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.technical')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.training')}</span>
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
                   category: t('implementation.technical.barriers'),
      icon: <Building className="text-orange-600" size={20} />,
      severity: "medium",
      items: [
        {
          title: t('implementation.quality.control'),
          description: t('implementation.quality.description'),
          impact: t('implementation.impact.medium'),
          timeframe: "3-6 mois",
          cost: "€10,000-25,000"
        },
        {
          title: t('implementation.storage.logistics'),
          description: t('implementation.storage.description'),
          impact: t('implementation.impact.medium'),
          timeframe: "6-12 mois",
          cost: "€50,000-150,000"
        }
      ]
    },
    {
      category: t('implementation.knowledge.barriers'),
      icon: <Book className="text-yellow-600" size={20} />,
      severity: "medium",
      items: [
        {
          title: t('implementation.carbon.expertise'),
          description: t('implementation.carbon.description'),
          impact: t('implementation.impact.medium'),
          timeframe: "2-4 mois",
          cost: "€5,000-15,000"
        },
        {
          title: t('implementation.market.access'),
          description: t('implementation.market.description'),
          impact: t('implementation.impact.high'),
          timeframe: "6-18 mois",
          cost: "€20,000-75,000"
        }
      ]
    }
  ];

  // Enablement Services based on real French/EU programs
  const enablementServices = [
    {
      category: t('implementation.financial.support'),
      icon: <Euro className="text-green-600" size={20} />,
      programs: [
        {
          name: "France 2030 - Produits Biosourcés",
          amount: "€420M total (€50,000-2M par projet)",
          description: t('implementation.france2030.description'),
          eligibility: t('implementation.france2030.eligibility'),
          deadline: "Applications en continu",
          authority: "ADEME"
        },
        {
          name: "Crédit d'Impôt Industries Vertes",
          amount: "€2.9M budget total (20-40% des coûts)",
          description: t('implementation.tax.credit.description'),
          eligibility: t('implementation.tax.credit.eligibility'),
          deadline: "2024-2030",
          authority: "Direction Générale des Finances Publiques"
        },
        {
          name: "EU SAF Clearing House Support",
          amount: "Services techniques gratuits",
          description: t('implementation.clearing.house.description'),
          eligibility: t('implementation.clearing.house.eligibility'),
          deadline: "Services permanents",
          authority: "EASA"
        }
      ]
    },
    {
      category: t('implementation.certification.support'),
      icon: <CheckCircle className="text-blue-600" size={20} />,
      programs: [
        {
          name: "Certification Groupée Agriculteurs",
          amount: "Réduction 60-80% des coûts",
          description: t('implementation.group.cert.description'),
          eligibility: t('implementation.group.cert.eligibility'),
          deadline: "Programme permanent UE",
          authority: "Organismes de certification agréés"
        },
        {
          name: "ISCC/RSB Guidance Programs",
          amount: "Support technique inclus",
          description: t('implementation.guidance.description'),
          eligibility: t('implementation.guidance.eligibility'),
          deadline: "Services continus",
          authority: "ISCC/RSB"
        }
      ]
    }
  ];

  // Risk Mitigation based on real regulatory framework
  const riskMitigation = [
    {
      category: t('implementation.regulatory.risks'),
      icon: <Shield className="text-purple-600" size={20} />,
      risks: [
        {
          risk: t('implementation.policy.changes'),
          probability: "Medium",
          impact: "High",
          mitigation: t('implementation.policy.mitigation'),
          evidence: "ReFuelEU Aviation mandate jusqu'en 2050"
        },
        {
          risk: t('implementation.certification.delays'),
          probability: "Medium",
          impact: "Medium",
          mitigation: t('implementation.certification.mitigation'),
          evidence: "EU SAF Clearing House support disponible"
        }
      ]
    },
    {
      category: t('implementation.market.risks'),
      icon: <TrendingUp className="text-indigo-600" size={20} />,
      risks: [
        {
          risk: t('implementation.price.volatility'),
          probability: "High",
          impact: "Medium",
          mitigation: t('implementation.price.mitigation'),
          evidence: "Mandats UE créent demande garantie"
        },
        {
          risk: t('implementation.competition.feedstock'),
          probability: "Medium",
          impact: "Medium", 
          mitigation: t('implementation.competition.mitigation'),
          evidence: "Accords long-terme avec producteurs"
        }
      ]
    },
    {
      category: t('implementation.operational.risks'),
      icon: <AlertTriangle className="text-red-600" size={20} />,
      risks: [
        {
          risk: t('implementation.supply.chain'),
          probability: "Low",
          impact: "High",
          mitigation: t('implementation.supply.mitigation'),
          evidence: "Réseau diversifié 500+ producteurs"
        },
        {
          risk: t('implementation.technical.failures'),
          probability: "Low",
          impact: "Medium",
          mitigation: t('implementation.technical.mitigation'),
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
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const exportImplementationGuide = () => {
    const data = {
      region: regionId,
      barriers: barriers,
      enablementServices: enablementServices,
      riskMitigation: riskMitigation,
      generated: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `implementation-guide-${regionId}-${new Date().toISOString().split('T')[0]}.json`;
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
              <span className="text-2xl text-wine-charcoal">{t('implementation.title')}</span>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-600 text-white">{getRegionDisplayName()}</Badge>
              <Button onClick={exportImplementationGuide} variant="outline" size="sm" className="gap-2">
                <Download size={16} />
                {t('implementation.export')}
              </Button>
            </div>
          </CardTitle>
          <p className="text-wine-charcoal/70">{t('implementation.subtitle')}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Key Value Proposition */}
          <Alert className="border-wine-burgundy/30 bg-wine-cream/20">
            <Target className="h-4 w-4 text-wine-burgundy" />
            <AlertDescription className="text-wine-charcoal">
              <strong>{t('implementation.value.proposition')}:</strong> {t('implementation.value.description')}
            </AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="barriers">{t('implementation.barrier.analysis')}</TabsTrigger>
              <TabsTrigger value="enablement">{t('implementation.enablement.services')}</TabsTrigger>
              <TabsTrigger value="risks">{t('implementation.risk.mitigation')}</TabsTrigger>
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
                          {category.severity === "high" ? t('implementation.critical') : t('implementation.manageable')}
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
                  <h3 className="text-lg font-semibold text-wine-charcoal mb-4">{t('implementation.barrier.summary')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-600 mb-1">24-42</div>
                      <div className="text-red-700">{t('implementation.months.compliance')}</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600 mb-1">€600K-2.3M</div>
                      <div className="text-orange-700">{t('implementation.total.costs')}</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                      <div className="text-blue-700">{t('implementation.failure.rate')}</div>
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
                              <Badge className="bg-green-600 text-white">{t('implementation.available')}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-sm font-medium text-wine-charcoal mb-1">{t('implementation.funding.amount')}</p>
                                <p className="text-sm text-green-700 font-semibold">{program.amount}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-wine-charcoal mb-1">{t('implementation.deadline')}</p>
                                <p className="text-sm text-wine-charcoal/70">{program.deadline}</p>
                              </div>
                            </div>
                            <p className="text-sm text-wine-charcoal/70 mb-2">{program.description}</p>
                            <div className="text-xs text-wine-charcoal/60">
                              <strong>{t('implementation.eligibility')}:</strong> {program.eligibility}
                            </div>
                            <div className="text-xs text-wine-charcoal/60 mt-1">
                              <strong>{t('implementation.authority')}:</strong> {program.authority}
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
                  <CardTitle className="text-lg text-wine-charcoal">{t('implementation.our.services')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.regulatory')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.funding')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.certification')}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.market')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.technical')}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1" />
                        <span className="text-sm text-wine-charcoal">{t('implementation.service.training')}</span>
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
                        {category.risks.map((riskItem, riskIndex) => (
                          <div key={riskIndex} className="bg-white p-4 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-wine-charcoal">{riskItem.risk}</h4>
                              <div className="flex gap-2">
                                <Badge className={getProbabilityColor(riskItem.probability)}>
                                  {riskItem.probability}
                                </Badge>
                                <Badge variant="outline">{riskItem.impact}</Badge>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-wine-charcoal">{t('implementation.mitigation.strategy')}</p>
                                <p className="text-sm text-wine-charcoal/70">{riskItem.mitigation}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-wine-charcoal">{t('implementation.supporting.evidence')}</p>
                                <p className="text-sm text-green-700">{riskItem.evidence}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Risk Summary Dashboard */}
              <Card className="bg-wine-cream/10 border border-wine-burgundy/20">
                <CardHeader>
                  <CardTitle className="text-lg text-wine-charcoal">{t('implementation.risk.summary')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xl font-bold text-green-600 mb-1">92%</div>
                      <div className="text-green-700">{t('implementation.regulatory.stability')}</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xl font-bold text-blue-600 mb-1">€2.9B</div>
                      <div className="text-blue-700">{t('implementation.available.funding')}</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xl font-bold text-purple-600 mb-1">2050</div>
                      <div className="text-purple-700">{t('implementation.mandate.horizon')}</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-xl font-bold text-orange-600 mb-1">6-18</div>
                      <div className="text-orange-700">{t('implementation.months.implementation')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Regional Context */}
          <div className="bg-wine-cream/10 p-4 rounded-lg border border-wine-burgundy/10">
            <p className="text-sm text-wine-charcoal/80">
              <strong>{getRegionDisplayName()} {t('implementation.context')}:</strong> {
                regionId === 'champagne' 
                  ? t('implementation.champagne.context')
                  : t('implementation.languedoc.context')
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImplementationSupport;
