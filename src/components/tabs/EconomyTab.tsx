import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  return <div className="min-h-screen w-full">
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
        
        {/* Quick Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-wine-cream/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4" onClick={() => document.getElementById('roi-section')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              <div className="text-left">
                <div className="font-semibold">ROI Calculator</div>
                <div className="text-sm text-wine-charcoal/70">Calculs de rentabilité</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4" onClick={() => document.getElementById('cost-benefit-section')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              <div className="text-left">
                <div className="font-semibold">Cost-Benefit</div>
                <div className="text-sm text-wine-charcoal/70">Analyse coûts-bénéfices</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4" onClick={() => document.getElementById('projections-section')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              <div className="text-left">
                <div className="font-semibold">Projections</div>
                <div className="text-sm text-wine-charcoal/70">Prévisions 5 ans</div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Module 1: ROI Calculator */}
      <section id="roi-section" className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Calculateur ROI
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Retour sur investissement et analyse de rentabilité
          </p>
        </div>
        <AdvancedROICalculator />
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Core Module 2: Cost-Benefit Analysis */}
      <section id="cost-benefit-section" className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Analyse Coûts-Bénéfices
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Évaluation détaillée des investissements et retours
          </p>
        </div>
        <CostBenefitAnalysis />
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Core Module 3: Economic Projections */}
      <section id="projections-section" className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Projections Économiques
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Prévisions financières sur 5 ans
          </p>
        </div>
        <EconomicProjections />
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Advanced Modules - Collapsible */}
      <section className="mb-16">
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          

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
            <ExportCapabilities type="economy" />
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
        
      </section>
    </div>;
};
export default EconomyTab;