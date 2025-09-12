import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp } from 'lucide-react';
import AdvancedROICalculator from "../AdvancedROICalculator";
import CostBenefitAnalysis from "../CostBenefitAnalysis";
import EconomicProjections from "../EconomicProjections";
import SensitivityAnalysis from "../SensitivityAnalysis";
import ScenarioComparison from "../ScenarioComparison";
import RiskAssessment from "../RiskAssessment";
import BreakevenAnalysis from "../BreakevenAnalysis";
import ExportCapabilities from "../ExportCapabilities";

const EconomyTab = () => {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      {/* Navigation Header */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Analyse Économique
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            Modélisation financière et analyse de rentabilité par région
          </p>
        </div>
      </section>

      {/* Waste Allocation Breakdown */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Allocation Réaliste des Flux - Languedoc-Roussillon
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Hiérarchisation respectueuse des besoins existants
          </p>
        </div>
        
        <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl text-wine-charcoal text-center">
              Total Biomasse Régionale: 266,000 tonnes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Flux Protégés */}
              <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-wine-charcoal">Flux Protégés</h3>
                  <span className="text-sm text-red-600 font-medium">❌ Non disponible</span>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">45%</div>
                <div className="text-xl font-semibold text-wine-charcoal mb-3">120,000 tonnes</div>
                <div className="space-y-2 text-sm text-wine-charcoal/70">
                  <div>• Compost pour vignobles: 67,000t</div>
                  <div>• Biogaz énergétique: 40,000t</div>
                  <div>• Extraction premium: 13,000t</div>
                </div>
              </div>

              {/* Flux Négociables */}
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-wine-charcoal">Flux Négociables</h3>
                  <span className="text-sm text-yellow-600 font-medium">⚠️ Partenariats requis</span>
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">25%</div>
                <div className="text-xl font-semibold text-wine-charcoal mb-3">66,000 tonnes</div>
                <div className="space-y-2 text-sm text-wine-charcoal/70">
                  <div>• Surplus saisonniers: 40,000t</div>
                  <div>• Excédent compost: 26,000t</div>
                </div>
              </div>

              {/* Flux Disponibles */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-wine-charcoal">Flux Disponibles</h3>
                  <span className="text-sm text-green-600 font-medium">✅ Disponible pour SAF</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                <div className="text-xl font-semibold text-wine-charcoal mb-3">80,000 tonnes</div>
                <div className="space-y-2 text-sm text-wine-charcoal/70">
                  <div>• Coûts d'élimination actuels: 50,000t</div>
                  <div>• Boues de traitement: 30,000t</div>
                </div>
                <div className="mt-4 p-3 bg-white/70 rounded-lg border border-green-300">
                  <div className="text-sm font-medium text-wine-charcoal">Potentiel SAF:</div>
                  <div className="text-lg font-bold text-green-600">22.4M litres → €27.3M</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Main Economic Analysis - Tabbed Interface */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Modules d'Analyse Économique
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Outils de modélisation financière et évaluation de rentabilité
          </p>
        </div>

        <Tabs defaultValue="roi" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow-elegant border border-wine-cream/30">
            <TabsTrigger 
              value="roi" 
              className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium"
            >
              ROI Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="cost-benefit" 
              className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium"
            >
              Cost-Benefit
            </TabsTrigger>
            <TabsTrigger 
              value="projections" 
              className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium"
            >
              Projections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roi" className="mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-wine-charcoal mb-4">
                Calculateur ROI
              </h3>
              <p className="text-lg text-wine-charcoal/70">
                Retour sur investissement basé sur 80,000 tonnes disponibles
              </p>
            </div>
            <AdvancedROICalculator />
          </TabsContent>

          <TabsContent value="cost-benefit" className="mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-wine-charcoal mb-4">
                Analyse Coûts-Bénéfices
              </h3>
              <p className="text-lg text-wine-charcoal/70">
                Évaluation détaillée des investissements et retours
              </p>
            </div>
            <CostBenefitAnalysis />
          </TabsContent>

          <TabsContent value="projections" className="mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-wine-charcoal mb-4">
                Projections Économiques
              </h3>
              <p className="text-lg text-wine-charcoal/70">
                Prévisions financières sur 5 ans
              </p>
            </div>
            <EconomicProjections />
          </TabsContent>
        </Tabs>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Advanced Modules - Collapsible */}
      <section className="mb-16">
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <div className="text-center mb-8">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="lg" className="group">
                <span className="text-lg font-semibold">Modules Avancés</span>
                {advancedOpen ? (
                  <ChevronUp className="ml-2 h-5 w-5 transition-transform" />
                ) : (
                  <ChevronDown className="ml-2 h-5 w-5 transition-transform" />
                )}
              </Button>
            </CollapsibleTrigger>
            <p className="text-wine-charcoal/70 mt-2">
              Analyses de sensibilité, scénarios et évaluation des risques
            </p>
          </div>

          <CollapsibleContent className="space-y-16">
            {/* Sensitivity & Risk Analysis */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <Card className="bg-white/95 border-wine-cream/30">
                <CardHeader>
                  <CardTitle className="text-wine-charcoal">Analyse de Sensibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <SensitivityAnalysis />
                </CardContent>
              </Card>
              <Card className="bg-white/95 border-wine-cream/30">
                <CardHeader>
                  <CardTitle className="text-wine-charcoal">Évaluation des Risques</CardTitle>
                </CardHeader>
                <CardContent>
                  <RiskAssessment />
                </CardContent>
              </Card>
            </div>

            {/* Scenario Comparison */}
            <div>
              <h3 className="text-2xl font-bold text-wine-charcoal mb-6 text-center">
                Comparaison de Scénarios
              </h3>
              <ScenarioComparison />
            </div>

            {/* Breakeven Analysis */}
            <div>
              <h3 className="text-2xl font-bold text-wine-charcoal mb-6 text-center">
                Analyse Point Mort
              </h3>
              <BreakevenAnalysis />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Export & Market Context */}
      <section className="mb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Export et Contexte Marché
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Rapports professionnels et données de marché SAF
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Export Tools */}
          <div>
            <ExportCapabilities 
              type="economy"
            />
          </div>

          {/* Market Context */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-wine-cream/30">
            <h3 className="text-2xl font-bold text-wine-charcoal mb-6 text-center">Contexte Marché SAF</h3>
            <div className="space-y-6">
              <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
                <div className="text-lg font-bold text-wine-charcoal mb-2">Mandat UE RefuelEU</div>
                <div className="text-wine-charcoal/70">2% SAF en 2025 → 70% en 2050</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-gold/10">
                <div className="text-lg font-bold text-wine-charcoal mb-2">Prix SAF vs Kérosène</div>
                <div className="text-wine-charcoal/70">€1.22/L vs €0.65/L (prime durable)</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-xl border border-wine-green/10">
                <div className="text-lg font-bold text-wine-charcoal mb-2">Demande EU 2030</div>
                <div className="text-wine-charcoal/70">8.5 millions tonnes SAF requis</div>
              </div>
            </div>
          </div>
        </div>

        {/* Financing Summary */}
        <div className="bg-wine-cream/10 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">Financement - Vue d'ensemble</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-burgundy/10">
              <div className="text-3xl font-bold text-wine-burgundy mb-3">€50M</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Fonds propres</div>
              <div className="text-sm text-wine-charcoal/60">30-40% total</div>
            </div>
            <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-gold/10">
              <div className="text-3xl font-bold text-wine-gold mb-3">€75M</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Dette bancaire</div>
              <div className="text-sm text-wine-charcoal/60">Taux 4-6%</div>
            </div>
            <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-green/10">
              <div className="text-3xl font-bold text-wine-green mb-3">€25M</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Subventions</div>
              <div className="text-sm text-wine-charcoal/60">EU + France 2030</div>
            </div>
            <div className="text-center p-6 bg-white/70 rounded-xl border border-wine-charcoal/10">
              <div className="text-3xl font-bold text-wine-charcoal mb-3">€150M</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-2">Total investissement</div>
              <div className="text-sm text-wine-charcoal/60">Capacité 100kt SAF/an</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EconomyTab;