import { useState, useEffect } from "react";
import { Calculator, TrendingUp, Settings, Download, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegion } from "@/contexts/RegionContext";

interface Scenario {
  name: string;
  biomassInput: number;
  processEfficiency: number;
  safPrice: number;
  operatingCosts: number;
  capitalInvestment: number;
}

const AdvancedROICalculator = () => {
  const { currentData } = useRegion();
  const [activeScenario, setActiveScenario] = useState<string>("conservative");
  
  // Dynamic scenarios based on realistic waste allocation (80,000 tonnes available)
  const [scenarios] = useState<Record<string, Scenario>>({
    conservative: {
      name: "Conservateur",
      biomassInput: currentData.id === 'champagne' ? Math.round(currentData.annualPomace * 0.75) : 60000,
      processEfficiency: 65,
      safPrice: 1220,
      operatingCosts: 800,
      capitalInvestment: currentData.id === 'champagne' ? 40000000 : 120000000
    },
    realistic: {
      name: "Réaliste",
      biomassInput: currentData.id === 'champagne' ? currentData.annualPomace : 80000,
      processEfficiency: 70,
      safPrice: 1220,
      operatingCosts: 850,
      capitalInvestment: currentData.id === 'champagne' ? 50000000 : 180000000
    },
    optimistic: {
      name: "Optimiste",
      biomassInput: currentData.id === 'champagne' ? Math.round(currentData.annualPomace * 1.1) : 88000,
      processEfficiency: 75,
      safPrice: 1500,
      operatingCosts: 750,
      capitalInvestment: currentData.id === 'champagne' ? 60000000 : 200000000
    }
  });

  const [customValues, setCustomValues] = useState<Scenario>(scenarios.conservative);

  useEffect(() => {
    setCustomValues(scenarios[activeScenario]);
  }, [activeScenario, scenarios]);

  // Advanced calculations
  const safProduction = (customValues.biomassInput * 280 * customValues.processEfficiency) / 100; // L/year
  const annualRevenue = safProduction * customValues.safPrice;
  const annualOperatingCosts = safProduction * customValues.operatingCosts;
  const grossProfit = annualRevenue - annualOperatingCosts;
  const roi = ((grossProfit * 5 - customValues.capitalInvestment) / customValues.capitalInvestment) * 100;
  const paybackPeriod = customValues.capitalInvestment / grossProfit;
  const npv = calculateNPV(grossProfit, customValues.capitalInvestment, 8, 10);
  const irr = calculateIRR(grossProfit, customValues.capitalInvestment, 10);

  function calculateNPV(annualCashFlow: number, initialInvestment: number, discountRate: number, years: number): number {
    let npv = -initialInvestment;
    for (let year = 1; year <= years; year++) {
      npv += annualCashFlow / Math.pow(1 + discountRate / 100, year);
    }
    return npv;
  }

  function calculateIRR(annualCashFlow: number, initialInvestment: number, years: number): number {
    // Simplified IRR calculation using binary search
    let rate = 0.1; // Starting guess
    let low = 0, high = 1;
    
    for (let i = 0; i < 100; i++) {
      let npv = -initialInvestment;
      for (let year = 1; year <= years; year++) {
        npv += annualCashFlow / Math.pow(1 + rate, year);
      }
      
      if (Math.abs(npv) < 1000) break;
      
      if (npv > 0) {
        low = rate;
        rate = (rate + high) / 2;
      } else {
        high = rate;
        rate = (low + rate) / 2;
      }
    }
    
    return rate * 100;
  }

  const exportResults = () => {
    const results = {
      scenario: scenarios[activeScenario].name,
      inputs: customValues,
      outputs: {
        safProduction: Math.round(safProduction),
        annualRevenue: Math.round(annualRevenue),
        grossProfit: Math.round(grossProfit),
        roi: Math.round(roi * 100) / 100,
        paybackPeriod: Math.round(paybackPeriod * 100) / 100,
        npv: Math.round(npv),
        irr: Math.round(irr * 100) / 100
      },
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roi-analysis-${activeScenario}-${new Date().toISOString().split('T')[0]}.json`;
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
            <Calculator className="text-wine-burgundy" size={28} />
            <span className="text-2xl text-wine-charcoal">Calculateur ROI Avancé</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600 text-white">Données Réelles</Badge>
            <Button onClick={exportResults} variant="outline" size="sm" className="gap-2">
              <Download size={16} />
              Exporter
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <Tabs value={activeScenario} onValueChange={setActiveScenario}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="conservative">Conservateur</TabsTrigger>
            <TabsTrigger value="realistic">Réaliste</TabsTrigger>
            <TabsTrigger value="optimistic">Optimiste</TabsTrigger>
          </TabsList>

          <TabsContent value={activeScenario} className="space-y-6 mt-6">
            {/* Input Controls */}
            <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
              <h4 className="text-lg font-semibold text-wine-charcoal mb-4 flex items-center gap-2">
                <Settings size={20} />
                Paramètres du Scénario
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-wine-charcoal">
                      Biomasse d'entrée (tonnes/an): {customValues.biomassInput.toLocaleString()}
                    </Label>
                    <Slider
                      value={[customValues.biomassInput]}
                      onValueChange={([value]) => setCustomValues(prev => ({ ...prev, biomassInput: value }))}
                      min={currentData.id === 'champagne' ? 10000 : 100000}
                      max={currentData.id === 'champagne' ? 50000 : 500000}
                      step={currentData.id === 'champagne' ? 1000 : 10000}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-wine-charcoal">
                      Efficacité de traitement (%): {customValues.processEfficiency}
                    </Label>
                    <Slider
                      value={[customValues.processEfficiency]}
                      onValueChange={([value]) => setCustomValues(prev => ({ ...prev, processEfficiency: value }))}
                      min={50}
                      max={85}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-wine-charcoal">
                      Prix SAF (€/m³): {customValues.safPrice.toLocaleString()}
                    </Label>
                    <Slider
                      value={[customValues.safPrice]}
                      onValueChange={([value]) => setCustomValues(prev => ({ ...prev, safPrice: value }))}
                      min={2000}
                      max={4000}
                      step={50}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-wine-charcoal">
                      Coûts opérationnels (€/m³): {customValues.operatingCosts.toLocaleString()}
                    </Label>
                    <Slider
                      value={[customValues.operatingCosts]}
                      onValueChange={([value]) => setCustomValues(prev => ({ ...prev, operatingCosts: value }))}
                      min={1200}
                      max={2500}
                      step={50}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-wine-charcoal">
                      Investissement capital (M€): {(customValues.capitalInvestment / 1000000).toFixed(1)}
                    </Label>
                    <Slider
                      value={[customValues.capitalInvestment]}
                      onValueChange={([value]) => setCustomValues(prev => ({ ...prev, capitalInvestment: value }))}
                      min={currentData.id === 'champagne' ? 20000000 : 80000000}
                      max={currentData.id === 'champagne' ? 80000000 : 300000000}
                      step={currentData.id === 'champagne' ? 2000000 : 5000000}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-xl border border-wine-burgundy/20">
                <TrendingUp className="text-wine-burgundy mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-wine-burgundy mb-1">
                  {(safProduction / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-wine-charcoal/70">Litres SAF/an</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-wine-gold/10 to-wine-gold/5 rounded-xl border border-wine-gold/20">
                <div className="text-2xl font-bold text-wine-gold mb-1">
                  {roi.toFixed(1)}%
                </div>
                <div className="text-xs text-wine-charcoal/70">ROI (5 ans)</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-wine-green/10 to-wine-green/5 rounded-xl border border-wine-green/20">
                <div className="text-2xl font-bold text-wine-green mb-1">
                  {paybackPeriod.toFixed(1)}
                </div>
                <div className="text-xs text-wine-charcoal/70">Années de retour</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-wine-charcoal/10 to-wine-charcoal/5 rounded-xl border border-wine-charcoal/20">
                <div className="text-2xl font-bold text-wine-charcoal mb-1">
                  {irr.toFixed(1)}%
                </div>
                <div className="text-xs text-wine-charcoal/70">TRI</div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-wine-cream/20 p-4 rounded-lg">
                <h5 className="font-semibold text-wine-charcoal mb-3">Revenus & Coûts Annuels</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Revenus bruts:</span>
                    <span className="font-semibold">€{(annualRevenue / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coûts opérationnels:</span>
                    <span className="font-semibold">€{(annualOperatingCosts / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Profit brut:</span>
                    <span className="font-semibold text-wine-green">€{(grossProfit / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              <div className="bg-wine-cream/20 p-4 rounded-lg">
                <h5 className="font-semibold text-wine-charcoal mb-3">Indicateurs Financiers</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>VAN (10 ans, 8%):</span>
                    <span className="font-semibold">€{(npv / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marge brute:</span>
                    <span className="font-semibold">{((grossProfit / annualRevenue) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capital requis:</span>
                    <span className="font-semibold">€{(customValues.capitalInvestment / 1000000).toFixed(0)}M</span>
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

export default AdvancedROICalculator;