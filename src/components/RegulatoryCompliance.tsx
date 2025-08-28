import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertTriangle, Info, ExternalLink, Download, Calendar } from 'lucide-react';

const RegulatoryCompliance = () => {
  const [selectedRegion, setSelectedRegion] = useState('eu');

  const regulations = {
    eu: [
      {
        name: "RED II (Directive UE 2018/2001)",
        status: "conforme",
        deadline: "2030-12-31",
        requirements: [
          "Réduction GES minimum 65% vs fossile",
          "Critères durabilité biomasse",
          "Traçabilité chaîne d'approvisionnement",
          "Audit certification tiers"
        ],
        compliance: {
          current: "86% réduction GES",
          certification: "ISCC EU certifié",
          audits: "Bureau Veritas validé"
        },
        description: "Directive énergies renouvelables encadrant les biocarburants durables"
      },
      {
        name: "ReFuelEU Aviation",
        status: "anticipé",
        deadline: "2025-01-01",
        requirements: [
          "2% SAF minimum 2025",
          "6% SAF minimum 2030", 
          "70% SAF minimum 2050",
          "Pénalités non-conformité"
        ],
        compliance: {
          current: "Production 52M L/an",
          coverage: "Couvre mandats 2025-2035",
          penalties: "Évitement €45M/an"
        },
        description: "Réglementation mandats SAF aviation civile européenne"
      },
      {
        name: "Taxonomie Verte UE",
        status: "conforme",
        deadline: "2025-01-01",
        requirements: [
          "Contribution objective environnemental",
          "Pas de préjudice significatif",
          "Garanties sociales minimum",
          "Critères techniques screening"
        ],
        compliance: {
          current: "Activité éligible 4.13",
          environmental: "6 objectifs respectés",
          social: "Due diligence validée"
        },
        description: "Classification investissements durables Union Européenne"
      }
    ],
    france: [
      {
        name: "Code de l'Environnement",
        status: "conforme",
        deadline: "permanent",
        requirements: [
          "Étude impact environnemental",
          "Autorisation ICPE rubrique 2250",
          "Arrêté préfectoral exploitation",
          "Monitoring émissions atmosphériques"
        ],
        compliance: {
          current: "Dossier ICPE déposé",
          impact: "Étude validée DREAL",
          monitoring: "Système continu installé"
        },
        description: "Réglementation française installations classées"
      },
      {
        name: "Fiscalité TGAP",
        status: "avantagé",
        deadline: "2024-12-31",
        requirements: [
          "Exonération TGAP biocarburants",
          "Déclaration trimestrielle",
          "Justificatifs durabilité",
          "Contrôles douanes périodiques"
        ],
        compliance: {
          current: "Exonération accordée",
          savings: "€12M/an économisés",
          controls: "100% conformité"
        },
        description: "Taxe générale sur activités polluantes - exonérations SAF"
      }
    ],
    international: [
      {
        name: "CORSIA ICAO",
        status: "éligible",
        deadline: "2027-01-01",
        requirements: [
          "Inscription liste carburants durables",
          "Méthodologie calcul émissions",
          "Système monitoring vérifiable",
          "Rapport annuel ICAO"
        ],
        compliance: {
          current: "Pré-qualification obtenue",
          methodology: "ADF validée",
          monitoring: "Système déployé"
        },
        description: "Mécanisme compensation émissions aviation internationale"
      },
      {
        name: "ASTM D7566",
        status: "conforme",
        deadline: "permanent",
        requirements: [
          "Spécifications techniques Annex A5",
          "Tests qualité carburant",
          "Certification moteur",
          "Traçabilité production"
        ],
        compliance: {
          current: "100% spécifications",
          testing: "Lab accrédité Safran",
          certification: "Moteur LEAP validé"
        },
        description: "Standard international qualité carburants aviation durables"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conforme': return 'bg-green-600 text-white';
      case 'anticipé': return 'bg-blue-600 text-white';
      case 'éligible': return 'bg-purple-600 text-white';
      case 'avantagé': return 'bg-wine-gold text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'conforme': return <CheckCircle size={16} />;
      case 'anticipé': return <Calendar size={16} />;
      case 'éligible': return <Info size={16} />;
      case 'avantagé': return <CheckCircle size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  const exportCompliance = () => {
    const complianceData = {
      title: "Rapport Conformité Réglementaire SAF",
      generated: new Date().toISOString(),
      summary: {
        totalRegulations: Object.values(regulations).flat().length,
        compliantCount: Object.values(regulations).flat().filter(r => r.status === 'conforme').length,
        upcomingDeadlines: Object.values(regulations).flat().filter(r => 
          new Date(r.deadline) > new Date() && new Date(r.deadline) < new Date(Date.now() + 365*24*60*60*1000)
        ).length
      },
      regions: regulations
    };

    const blob = new Blob([JSON.stringify(complianceData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
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
            <CheckCircle className="text-wine-burgundy" size={28} />
            <span className="text-2xl text-wine-charcoal">Conformité Réglementaire</span>
          </div>
          <Button onClick={exportCompliance} variant="outline" size="sm" className="gap-2">
            <Download size={16} />
            Rapport
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={selectedRegion} onValueChange={setSelectedRegion}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="eu">Union Européenne</TabsTrigger>
            <TabsTrigger value="france">France</TabsTrigger>
            <TabsTrigger value="international">International</TabsTrigger>
          </TabsList>

          {Object.entries(regulations).map(([region, regs]) => (
            <TabsContent key={region} value={region} className="space-y-4">
              <div className="grid gap-4">
                {regs.map((regulation, index) => (
                  <div key={index} className="p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-wine-charcoal">
                            {regulation.name}
                          </h4>
                          <Badge className={getStatusColor(regulation.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(regulation.status)}
                              {regulation.status}
                            </div>
                          </Badge>
                        </div>
                        <p className="text-sm text-wine-charcoal/70 mb-3">
                          {regulation.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-wine-charcoal/60">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            Échéance: {regulation.deadline === 'permanent' ? 'Permanent' : new Date(regulation.deadline).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-wine-burgundy">
                        <ExternalLink size={16} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-wine-burgundy mb-3">Exigences</h5>
                        <ul className="space-y-2">
                          {regulation.requirements.map((req, i) => (
                            <li key={i} className="text-sm text-wine-charcoal/80 flex items-start gap-2">
                              <span className="text-wine-burgundy mt-1">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-wine-green mb-3">Statut Conformité</h5>
                        <div className="space-y-2">
                          {Object.entries(regulation.compliance).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between text-sm">
                              <span className="text-wine-charcoal/70 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                              </span>
                              <Badge variant="outline" className="text-wine-charcoal">
                                {String(value)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Compliance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-wine-cream/30">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700 mb-1">
              {Object.values(regulations).flat().filter(r => r.status === 'conforme').length}
            </div>
            <div className="text-sm text-green-600">Conformité acquise</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700 mb-1">
              {Object.values(regulations).flat().filter(r => r.status === 'anticipé').length}
            </div>
            <div className="text-sm text-blue-600">Préparation active</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-700 mb-1">
              {Object.values(regulations).flat().filter(r => r.status === 'éligible').length}
            </div>
            <div className="text-sm text-purple-600">Éligibilité validée</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-wine-gold/20 to-wine-gold/10 rounded-lg border border-wine-gold/30">
            <div className="text-2xl font-bold text-wine-gold mb-1">
              100%
            </div>
            <div className="text-sm text-wine-charcoal/70">Taux conformité</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulatoryCompliance;