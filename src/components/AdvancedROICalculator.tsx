import { useState, useEffect } from "react";
import { Calculator, TrendingUp, Settings, Download, BarChart3, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScenarioData {
  name: string;
  biomassInput: number;
  processEfficiency: number;
  safPrice: number;
  operatingCosts: number;
  capitalInvestment: number;
}

interface RegionalScenarios {
  conservative: ScenarioData;
  realistic: ScenarioData;
  optimistic: ScenarioData;
}

const AdvancedROICalculator = () => {
  const { currentData, regionId } = useRegion();
  const { t } = useLanguage();
  const [activeScenario, setActiveScenario] = useState<string>("conservative");

  // Region-specific static scenarios - no manual adjustments to avoid calculation errors
  const getRegionalScenarios = (): RegionalScenarios => {
    if (regionId === 'champagne') {
      return {
        conservative: {
          name: t('roi.conservative'),
          biomassInput: 25000, // 75% of Champagne pomace capacity
          processEfficiency: 65,
          safPrice: 1.35,
          operatingCosts: 0.75,
          capitalInvestment: 30000000 // €30M for smaller scale
        },
        realistic: {
          name: t('roi.realistic'),
          biomassInput: 33000, // Full Champagne pomace capacity
          processEfficiency: 70,
          safPrice: 1.50,
          operatingCosts: 0.70,
          capitalInvestment: 40000000 // €40M
        },
        optimistic: {
          name: t('roi.optimistic'),
          biomassInput: 40000, // With partnerships (120% capacity)
          processEfficiency: 75,
          safPrice: 1.65,
          operatingCosts: 0.65,
          capitalInvestment: 50000000 // €50M
        }
      };
    } else {
      // Languedoc-Roussillon scenarios
      return {
        conservative: {
          name: t('roi.conservative'),
          biomassInput: 60000, // 75% of available waste allocation
          processEfficiency: 65,
          safPrice: 1.35,
          operatingCosts: 0.75,
          capitalInvestment: 75000000 // €75M
        },
        realistic: {
          name: t('roi.realistic'),
          biomassInput: 80000, // Full available waste allocation
          processEfficiency: 70,
          safPrice: 1.50,
          operatingCosts: 0.70,
          capitalInvestment: 95000000 // €95M
        },
        optimistic: {
          name: t('roi.optimistic'),
          biomassInput: 100000, // With expanded partnerships
          processEfficiency: 75,
          safPrice: 1.65,
          operatingCosts: 0.65,
          capitalInvestment: 120000000 // €120M
        }
      };
    }
  };

  const [scenarios, setScenarios] = useState<RegionalScenarios>(getRegionalScenarios());
  const [currentScenario, setCurrentScenario] = useState<ScenarioData>(scenarios.conservative);

  // Update scenarios when region changes
  useEffect(() => {
    const newScenarios = getRegionalScenarios();
    setScenarios(newScenarios);
    setCurrentScenario(newScenarios[activeScenario as keyof RegionalScenarios]);
  }, [regionId, activeScenario, t]);

  // Update current scenario when tab changes
  useEffect(() => {
    setCurrentScenario(scenarios[activeScenario as keyof RegionalScenarios]);
  }, [activeScenario, scenarios]);

  // Calculate financial metrics with current scenario
  const safProduction = (currentScenario.biomassInput * 280 * currentScenario.processEfficiency) / 100;
  const annualRevenue = safProduction * currentScenario.safPrice;
  const annualOperatingCosts = safProduction * currentScenario.operatingCosts;
  const grossProfit = annualRevenue - annualOperatingCosts;
  
  // Fixed financial calculations
  const roi = (grossProfit / currentScenario.capitalInvestment) * 100;
  const paybackPeriod = grossProfit > 0 ? currentScenario.capitalInvestment / grossProfit : 99;
  const npv = calculateNPV(grossProfit, currentScenario.capitalInvestment, 8, 10);
  const irr = calculateIRR(grossProfit, currentScenario.capitalInvestment, 10);

  function calculateNPV(annualCashFlow: number, initialInvestment: number, discountRate: number, years: number): number {
    if (annualCashFlow <= 0) return -initialInvestment;
    
    let npv = -initialInvestment;
    for (let year = 1; year <= years; year++) {
      npv += annualCashFlow / Math.pow(1 + discountRate / 100, year);
    }
    
    // Add terminal value (residual value of investment)
    // Assume 50% residual value of initial investment
    const terminalValue = initialInvestment * 0.5;
    npv += terminalValue / Math.pow(1 + discountRate / 100, years);
    
    return npv;
  }

  function calculateIRR(annualCashFlow: number, initialInvestment: number, years: number): number {
    if (annualCashFlow <= 0) return 0;
    
    // For a simple annuity (constant annual cash flow), IRR can be approximated
    // More accurate than the iterative method for this use case
    let rate = 0.1; // Starting guess
    let low = 0.001, high = 0.5; // Reasonable bounds for SAF projects
    let iterations = 0;
    const maxIterations = 50;
    const tolerance = 100; // €100 tolerance
    
    while (iterations < maxIterations) {
      let npv = -initialInvestment;
      for (let year = 1; year <= years; year++) {
        npv += annualCashFlow / Math.pow(1 + rate, year);
      }
      
      if (Math.abs(npv) < tolerance) break;
      
      if (npv > 0) {
        low = rate;
      } else {
        high = rate;
      }
      rate = (low + high) / 2;
      iterations++;
    }
    
    return rate * 100;
  }

  const exportResults = () => {
    const results = {
      region: regionId,
      scenario: currentScenario.name,
      inputs: currentScenario,
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
    a.download = `roi-analysis-${regionId}-${activeScenario}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRegionDisplayName = () => {
    return regionId === 'champagne' ? 'Champagne' : 'Languedoc-Roussillon';
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
              <Badge className="bg-blue-600 text-white">{getRegionDisplayName()}</Badge>
              <Badge className="bg-green-600 text-white">{t('roi.real.data')}</Badge>
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
              {/* Static Parameters Display */}
              <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
                <div className="flex items-center gap-2 mb-4">
                  <Tooltip>
                    <TooltipTrigger>
                      <Settings size={20} className="text-wine-charcoal cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Manual parameter changes coming soon</p>
                    </TooltipContent>
                  </Tooltip>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-burgundy/10">
                    <div className="text-2xl font-bold text-wine-burgundy mb-1">
                      {currentScenario.biomassInput.toLocaleString()}
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.biomass.input')}</div>
                    <div className="text-xs text-wine-charcoal/60">tonnes/an</div>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-burgundy/10">
                    <div className="text-2xl font-bold text-wine-burgundy mb-1">
                      {currentScenario.processEfficiency}%
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.process.efficiency')}</div>
                    <div className="text-xs text-wine-charcoal/60">ATJ Technology</div>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-burgundy/10">
                    <div className="text-2xl font-bold text-wine-burgundy mb-1">
                      €{currentScenario.safPrice.toFixed(2)}/L
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.saf.price')}</div>
                    <div className="text-xs text-wine-charcoal/60">IATA Projections</div>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-gold/10">
                    <div className="text-2xl font-bold text-wine-gold mb-1">
                      €{currentScenario.operatingCosts.toFixed(2)}/L
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.operating.costs')}</div>
                    <div className="text-xs text-wine-charcoal/60">IRENA Benchmarks</div>
                  </div>

                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-green/10">
                    <div className="text-2xl font-bold text-wine-green mb-1">
                      €{(currentScenario.capitalInvestment / 1000000).toFixed(0)}M
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.capital.investment')}</div>
                    <div className="text-xs text-wine-charcoal/60">Industry CAPEX</div>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-xl border border-wine-burgundy/20 flex flex-col justify-center min-h-[120px]">
                  <div className="text-2xl font-bold text-wine-burgundy mb-1">
                    {(safProduction / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.saf.production.annual')}</div>
                </div>

                <div className={`text-center p-4 bg-gradient-to-br rounded-xl border flex flex-col justify-center min-h-[120px] ${
                  roi > 15 ? 'from-wine-green/10 to-wine-green/5 border-wine-green/20' : 
                  roi > 8 ? 'from-wine-gold/10 to-wine-gold/5 border-wine-gold/20' :
                  'from-red-100 to-red-50 border-red-200'
                }`}>
                  <div className={`text-2xl font-bold mb-1 ${
                    roi > 15 ? 'text-wine-green' :
                    roi > 8 ? 'text-wine-gold' :
                    'text-red-600'
                  }`}>
                    {roi.toFixed(1)}%
                  </div>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.five.year')}</div>
                </div>

                <div className={`text-center p-4 bg-gradient-to-br rounded-xl border flex flex-col justify-center min-h-[120px] ${
                  paybackPeriod < 8 ? 'from-wine-green/10 to-wine-green/5 border-wine-green/20' :
                  paybackPeriod < 12 ? 'from-wine-gold/10 to-wine-gold/5 border-wine-gold/20' :
                  'from-red-100 to-red-50 border-red-200'
                }`}>
                  <div className={`text-2xl font-bold mb-1 ${
                    paybackPeriod < 8 ? 'text-wine-green' :
                    paybackPeriod < 12 ? 'text-wine-gold' :
                    'text-red-600'
                  }`}>
                    {paybackPeriod > 50 ? '50+' : paybackPeriod.toFixed(1)}
                  </div>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.payback.years')}</div>
                </div>

                <div className={`text-center p-4 bg-gradient-to-br rounded-xl border flex flex-col justify-center min-h-[120px] ${
                  irr > 12 ? 'from-wine-green/10 to-wine-green/5 border-wine-green/20' :
                  irr > 8 ? 'from-wine-gold/10 to-wine-gold/5 border-wine-gold/20' :
                  'from-red-100 to-red-50 border-red-200'
                }`}>
                  <div className={`text-2xl font-bold mb-1 ${
                    irr > 12 ? 'text-wine-green' :
                    irr > 8 ? 'text-wine-gold' :
                    'text-red-600'
                  }`}>
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
                      <span className={`font-semibold ${grossProfit > 0 ? 'text-wine-green' : 'text-red-600'}`}>
                        €{(grossProfit / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-wine-cream/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-wine-charcoal mb-3">{t('roi.financial.indicators')}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('roi.npv.ten.years')}:</span>
                      <span className={`font-semibold ${npv > 0 ? 'text-wine-green' : 'text-red-600'}`}>
                        €{(npv / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('roi.gross.margin')}:</span>
                      <span className="font-semibold">{((grossProfit / annualRevenue) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('roi.capital.required')}:</span>
                      <span className="font-semibold">€{(currentScenario.capitalInvestment / 1000000).toFixed(0)}M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Region-Specific Notes */}
              <div className="bg-wine-cream/10 p-4 rounded-lg border border-wine-burgundy/10">
                <p className="text-sm text-wine-charcoal/80">
                  <strong>{getRegionDisplayName()} Context:</strong> {
                    regionId === 'champagne' 
                      ? 'Parameters scaled for premium wine region with smaller biomass volumes but higher value products.'
                      : 'Parameters based on large-scale viticulture waste availability with established agricultural infrastructure.'
                  }
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default AdvancedROICalculator;
