import { useState, useEffect } from "react";
import { Calculator, TrendingUp, Settings, Download, BarChart3, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const [activeScenario, setActiveScenario] = useState<string>("conservative");
  
  // Research-backed scenarios with conservative/realistic/optimistic parameters
  const [scenarios] = useState<Record<string, Scenario>>({
    conservative: {
      name: t('roi.conservative'),
      biomassInput: currentData.id === 'champagne' ? Math.round(currentData.annualPomace * 0.75) : 60000,
      processEfficiency: 65, // Lower end of ATJ technology efficiency (IEA Bioenergy, 2021)
      safPrice: 1.10, // IATA conservative SAF price projections 2025
      operatingCosts: 0.95, // Industry standard including feedstock processing (IRENA, 2021)
      capitalInvestment: currentData.id === 'champagne' ? 40000000 : 85000000 // €1.4M per kt capacity (Neste, Shell benchmarks)
    },
    realistic: {
      name: t('roi.realistic'),
      biomassInput: currentData.id === 'champagne' ? currentData.annualPomace : 80000,
      processEfficiency: 70, // Current ATJ technology average (Honeywell UOP, BP)
      safPrice: 1.22, // IATA realistic SAF pricing 2025-2027
      operatingCosts: 0.85, // Optimized operations with economies of scale
      capitalInvestment: currentData.id === 'champagne' ? 50000000 : 120000000 // €1.5M per kt capacity
    },
    optimistic: {
      name: t('roi.optimistic'),
      biomassInput: currentData.id === 'champagne' ? Math.round(currentData.annualPomace * 1.1) : 100000,
      processEfficiency: 75, // Best-in-class ATJ efficiency (Total Energies, Eni targets)
      safPrice: 1.35, // Premium SAF pricing with carbon credits (CORSIA)
      operatingCosts: 0.75, // Advanced process optimization
      capitalInvestment: currentData.id === 'champagne' ? 60000000 : 150000000 // €1.5M per kt with scale advantages
    }
  });

  const [customValues, setCustomValues] = useState<Scenario>(scenarios.conservative);

  useEffect(() => {
    setCustomValues(scenarios[activeScenario]);
  }, [activeScenario, scenarios]);

  // Advanced calculations based on industry standards
  const safProduction = (customValues.biomassInput * 280 * customValues.processEfficiency) / 100; // L/year (280L/tonne ATJ yield)
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
    <TooltipProvider>
      <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="text-wine-burgundy" size={28} />
              <span className="text-2xl text-wine-charcoal">{t('roi.calculator.title')}</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-600 text-white">{t('roi.real.data')}</Badge>
              <Button onClick={exportResults} variant="outline" size="sm" className="gap-2">
                <Download size={16} />
                {t('roi.export')}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <Tabs value={activeScenario} onValueChange={setActiveScenario}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="conservative">{t('roi.conservative')}</TabsTrigger>
              <TabsTrigger value="realistic">{t('roi.realistic')}</TabsTrigger>
              <TabsTrigger value="optimistic">{t('roi.optimistic')}</TabsTrigger>
            </TabsList>

            <TabsContent value={activeScenario} className="space-y-6 mt-6">
              {/* Input Controls */}
              <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
                <div className="flex items-center gap-2 mb-4">
                  <Settings size={20} />
                  <h4 className="text-lg font-semibold text-wine-charcoal">{t('roi.scenario.parameters')}</h4>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-wine-burgundy cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <div className="space-y-2 text-sm">
                        <p><strong>{t('roi.parameters.sources')}</strong></p>
                        <p><strong>{t('roi.biomass.range')}:</strong> {t('roi.biomass.explanation')}</p>
                        <p><strong>{t('roi.efficiency.range')}:</strong> {t('roi.efficiency.explanation')}</p>
                        <p><strong>{t('roi.price.range')}:</strong> {t('roi.price.explanation')}</p>
                        <p><strong>{t('roi.costs.range')}:</strong> {t('roi.costs.explanation')}</p>
                        <p><strong>{t('roi.investment.range')}:</strong> {t('roi.investment.explanation')}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-wine-charcoal">
                        {t('roi.biomass.input')}: {customValues.biomassInput.toLocaleString()}
                      </Label>
                      <Slider
                        value={[customValues.biomassInput]}
                        onValueChange={([value]) => setCustomValues(prev => ({ ...prev, biomassInput: value }))}
                        min={currentData.id === 'champagne' ? 10000 : 40000}
                        max={currentData.id === 'champagne' ? 50000 : 120000}
                        step={currentData.id === 'champagne' ? 1000 : 5000}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-wine-charcoal">
                        {t('roi.process.efficiency')}: {customValues.processEfficiency}%
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
                        {t('roi.saf.price')}: €{customValues.safPrice.toFixed(2)}/L
                      </Label>
                      <Slider
                        value={[customValues.safPrice]}
                        onValueChange={([value]) => setCustomValues(prev => ({ ...prev, safPrice: value }))}
                        min={0.8}
                        max={2.0}
                        step={0.05}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-wine-charcoal">
                        {t('roi.operating.costs')}: €{customValues.operatingCosts.toFixed(2)}/L
                      </Label>
                      <Slider
                        value={[customValues.operatingCosts]}
                        onValueChange={([value]) => setCustomValues(prev => ({ ...prev, operatingCosts: value }))}
                        min={0.6}
                        max={1.2}
                        step={0.05}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-wine-charcoal">
                        {t('roi.capital.investment')}: €{(customValues.capitalInvestment / 1000000).toFixed(1)}M
                      </Label>
                      <Slider
                        value={[customValues.capitalInvestment]}
                        onValueChange={([value]) => setCustomValues(prev => ({ ...prev, capitalInvestment: value }))}
                        min={currentData.id === 'champagne' ? 20000000 : 70000000}
                        max={currentData.id === 'champagne' ? 80000000 : 200000000}
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
                  <div className="text-xs text-wine-charcoal/70">{t('roi.saf.production.annual')}</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-wine-gold/10 to-wine-gold/5 rounded-xl border border-wine-gold/20">
                  <div className="text-2xl font-bold text-wine-gold mb-1">
                    {roi.toFixed(1)}%
                  </div>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.five.year')}</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-wine-green/10 to-wine-green/5 rounded-xl border border-wine-green/20">
                  <div className="text-2xl font-bold text-wine-green mb-1">
                    {paybackPeriod.toFixed(1)}
                  </div>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.payback.years')}</div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-wine-charcoal/10 to-wine-charcoal/5 rounded-xl border border-wine-charcoal/20">
                  <div className="text-2xl font-bold text-wine-charcoal mb-1">
                    {irr.toFixed(1)}%
                  </div>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.irr')}</div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-wine-cream/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-wine-charcoal mb-3">{t('roi.revenue.costs.annual')}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('roi.gross.revenue')}:</span>
                      <span className="font-semibold">€{(annualRevenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('roi.operating.costs')}:</span>
                      <span className="font-semibold">€{(annualOperatingCosts / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">{t('roi.gross.profit')}:</span>
                      <span className="font-semibold text-wine-green">€{(grossProfit / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>

                <div className="bg-wine-cream/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-wine-charcoal mb-3">{t('roi.financial.indicators')}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('roi.npv.ten.years')}:</span>
                      <span className="font-semibold">€{(npv / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('roi.gross.margin')}:</span>
                      <span className="font-semibold">{((grossProfit / annualRevenue) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('roi.capital.required')}:</span>
                      <span className="font-semibold">€{(customValues.capitalInvestment / 1000000).toFixed(0)}M</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default AdvancedROICalculator;
