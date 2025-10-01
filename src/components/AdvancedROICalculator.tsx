import { useState, useEffect } from "react";
import { Calculator, TrendingUp, Settings, Download, BarChart3, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * AdvancedROICalculator Component
 * 
 * UPDATED SAF PRICING (effective 2025):
 * - Conservative: €1.45/L (base market price)
 * - Realistic: €1.60/L (with premium market positioning)
 * - Optimistic: €1.75/L (with carbon credits & mandates)
 * 
 * All scenarios are region-specific (Champagne vs Languedoc-Roussillon)
 * Units follow SI standards with proper spacing (e.g., "25 kt" not "25kt")
 */

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

  // ========================================
  // REGIONAL SCENARIO DEFINITIONS
  // Updated with new SAF pricing structure
  // ========================================
  const getRegionalScenarios = (): RegionalScenarios => {
    if (regionId === 'champagne') {
      return {
        conservative: {
          name: t('roi.conservative'),
          biomassInput: 25000,
          processEfficiency: 68,
          safPrice: 1.45, // UPDATED from 1.35
          operatingCosts: 0.65,
          capitalInvestment: 28000000
        },
        realistic: {
          name: t('roi.realistic'),
          biomassInput: 33000,
          processEfficiency: 72,
          safPrice: 1.60, // UPDATED from 1.50
          operatingCosts: 0.60,
          capitalInvestment: 38000000
        },
        optimistic: {
          name: t('roi.optimistic'),
          biomassInput: 40000,
          processEfficiency: 76,
          safPrice: 1.75, // UPDATED from 1.65
          operatingCosts: 0.55,
          capitalInvestment: 45000000
        }
      };
    } else {
      // Languedoc-Roussillon scenarios
      return {
        conservative: {
          name: t('roi.conservative'),
          biomassInput: 60000,
          processEfficiency: 68,
          safPrice: 1.45, // UPDATED from 1.35
          operatingCosts: 0.65,
          capitalInvestment: 65000000
        },
        realistic: {
          name: t('roi.realistic'),
          biomassInput: 80000,
          processEfficiency: 72,
          safPrice: 1.60, // UPDATED from 1.50
          operatingCosts: 0.60,
          capitalInvestment: 85000000
        },
        optimistic: {
          name: t('roi.optimistic'),
          biomassInput: 100000,
          processEfficiency: 76,
          safPrice: 1.75, // UPDATED from 1.65
          operatingCosts: 0.55,
          capitalInvestment: 105000000
        }
      };
    }
  };

  const [scenarios, setScenarios] = useState<RegionalScenarios>(getRegionalScenarios());
  const [currentScenario, setCurrentScenario] = useState<ScenarioData>(scenarios.conservative);

  useEffect(() => {
    const newScenarios = getRegionalScenarios();
    setScenarios(newScenarios);
    setCurrentScenario(newScenarios[activeScenario as keyof RegionalScenarios]);
  }, [regionId, activeScenario, t]);

  useEffect(() => {
    setCurrentScenario(scenarios[activeScenario as keyof RegionalScenarios]);
  }, [activeScenario, scenarios]);

  // ========================================
  // FINANCIAL CALCULATIONS
  // ========================================
  const safProduction = (currentScenario.biomassInput * 280 * currentScenario.processEfficiency) / 100;
  const annualRevenue = safProduction * currentScenario.safPrice;
  const annualOperatingCosts = safProduction * currentScenario.operatingCosts;
  const grossProfit = annualRevenue - annualOperatingCosts;
  
  const roi = (grossProfit / currentScenario.capitalInvestment) * 100;
  const paybackPeriod = grossProfit > 0 ? currentScenario.capitalInvestment / grossProfit : 99;
  const npv = calculateNPV(grossProfit, currentScenario.capitalInvestment, 6, 15);
  const irr = calculateIRR(grossProfit, currentScenario.capitalInvestment, 15);

  // ========================================
  // NPV CALCULATION
  // Uses 6% discount rate (appropriate for green infrastructure projects)
  // ========================================
  function calculateNPV(annualCashFlow: number, initialInvestment: number, discountRate: number, years: number): number {
    if (annualCashFlow <= 0) return -initialInvestment;
    
    const analysisYears = 15;
    let npv = -initialInvestment;
    
    // Present value of annual cash flows
    for (let year = 1; year <= analysisYears; year++) {
      npv += annualCashFlow / Math.pow(1 + discountRate / 100, year);
    }
    
    // Terminal value (60% of initial investment)
    const terminalValue = initialInvestment * 0.6;
    npv += terminalValue / Math.pow(1 + discountRate / 100, analysisYears);
    
    return npv;
  }

  // ========================================
  // IRR CALCULATION
  // Newton-Raphson method with improved convergence
  // ========================================
  function calculateIRR(annualCashFlow: number, initialInvestment: number, years: number): number {
    if (annualCashFlow <= 0) return 0;
    
    const simplePayback = initialInvestment / annualCashFlow;
    if (simplePayback > years) return 0;
    
    let rate = Math.max(0.01, (annualCashFlow / initialInvestment) * 0.8);
    let tolerance = 0.0001;
    let maxIterations = 100;
    
    for (let i = 0; i < maxIterations; i++) {
      let npv = -initialInvestment;
      let derivative = 0;
      
      for (let year = 1; year <= years; year++) {
        const discountFactor = Math.pow(1 + rate, year);
        npv += annualCashFlow / discountFactor;
        derivative -= (year * annualCashFlow) / (discountFactor * (1 + rate));
      }
      
      const terminalValue = initialInvestment * 0.4;
      const terminalDiscountFactor = Math.pow(1 + rate, years);
      npv += terminalValue / terminalDiscountFactor;
      derivative -= (years * terminalValue) / (terminalDiscountFactor * (1 + rate));
      
      if (Math.abs(npv) < tolerance) {
        return Math.min(rate * 100, 50);
      }
      
      if (Math.abs(derivative) > tolerance) {
        rate = rate - npv / derivative;
      } else {
        break;
      }
      
      rate = Math.max(0.001, Math.min(rate, 0.5));
    }
    
    return Math.min(rate * 100, 50);
  }

  // ========================================
  // EXPORT RESULTS FUNCTION
  // ========================================
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
              {/* ========================================
                  SCENARIO PARAMETERS DISPLAY
                  ======================================== */}
              <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
                <div className="flex items-center gap-2 mb-4">
                  <Settings size={20} className="text-wine-charcoal" />
                  <h4 className="text-lg font-semibold text-wine-charcoal">{t('roi.scenario.parameters')}</h4>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-wine-burgundy cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <div className="space-y-2 text-sm">
                        <p><strong>{t('roi.parameter.sources')}</strong></p>
                        <p><strong>{t('roi.biomass')}:</strong> {t('roi.biomass.source')}</p>
                        <p><strong>{t('roi.efficiency')}:</strong> {t('roi.efficiency.source')}</p>
                        <p><strong>{t('roi.saf.price')}:</strong> {t('roi.price.source')}</p>
                        <p><strong>{t('roi.costs')}:</strong> {t('roi.costs.source')}</p>
                        <p><strong>{t('roi.capex')}:</strong> {t('roi.capex.source')}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Biomass Input */}
                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-burgundy/10">
                    <div className="text-2xl font-bold text-wine-burgundy mb-1">
                      {currentScenario.biomassInput.toLocaleString()}
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.biomass.input')}</div>
                    <div className="text-xs text-wine-charcoal/60">{t('roi.tonnes.per.year')}</div>
                  </div>

                  {/* Process Efficiency */}
                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-burgundy/10">
                    <div className="text-2xl font-bold text-wine-burgundy mb-1">
                      {currentScenario.processEfficiency} %
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.process.efficiency')}</div>
                    <div className="text-xs text-wine-charcoal/60">{t('roi.atj.technology')}</div>
                  </div>

                  {/* SAF Price - UPDATED */}
                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-burgundy/10">
                    <div className="text-2xl font-bold text-wine-burgundy mb-1">
                      €{currentScenario.safPrice.toFixed(2)}/L
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.saf.price')}</div>
                    <div className="text-xs text-wine-charcoal/60">{t('roi.iata.projections')}</div>
                  </div>

                  {/* Operating Costs */}
                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-gold/10">
                    <div className="text-2xl font-bold text-wine-gold mb-1">
                      €{currentScenario.operatingCosts.toFixed(2)}/L
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.operating.costs')}</div>
                    <div className="text-xs text-wine-charcoal/60">{t('roi.irena.benchmarks')}</div>
                  </div>

                  {/* Capital Investment */}
                  <div className="text-center p-4 bg-white/70 rounded-xl border border-wine-green/10">
                    <div className="text-2xl font-bold text-wine-green mb-1">
                      €{(currentScenario.capitalInvestment / 1000000).toFixed(0)} M
                    </div>
                    <div className="text-sm font-medium text-wine-charcoal mb-2">{t('roi.capital.investment')}</div>
                    <div className="text-xs text-wine-charcoal/60">{t('roi.industry.capex')}</div>
                  </div>
                </div>
              </div>

              {/* ========================================
                  KEY RESULTS GRID
                  ======================================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* SAF Production */}
                <div className="text-center p-4 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-xl border border-wine-burgundy/20 flex flex-col justify-center min-h-[120px]">
                  <div className="text-2xl font-bold text-wine-burgundy mb-1">
                    {(safProduction / 1000000).toFixed(1)} M L
                  </div>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.saf.production.annual')}</div>
                </div>

                {/* ROI */}
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
                    {roi.toFixed(1)} %
                  </div>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.five.year')}</div>
                </div>

                {/* Payback Period */}
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

                {/* IRR */}
                <div className={`text-center p-4 bg-gradient-to-br rounded-xl border flex flex-col justify-center min-h-[120px] ${
                  irr > 12 ? 'from-wine-green/10 to-wine-green/5 border-wine-green/20' :
                  irr > 8 ? 'from-wine-gold/10 to-wine-gold/5 border-wine-gold/20' :
                  'from-red-100 to-red-50 border-red-200'
                }`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className={`text-2xl font-bold mb-1 cursor-help ${
                        irr > 12 ? 'text-wine-green' :
                        irr > 8 ? 'text-wine-gold' :
                        'text-red-600'
                      }`}>
                        {irr.toFixed(1)} %
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <div className="space-y-1 text-sm">
                        <p><strong>{t('roi.irr.definition')}</strong></p>
                        <p>{t('roi.irr.explanation')}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  <div className="text-xs text-wine-charcoal/70">{t('roi.irr')}</div>
                </div>
              </div>

              {/* ========================================
                  FINANCIAL DETAILS
                  ======================================== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-wine-cream/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-wine-charcoal mb-3">{t('roi.revenue.costs.annual')}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('roi.gross.revenue')}:</span>
                      <span className="font-semibold">€{(annualRevenue / 1000000).toFixed(1)} M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('roi.operating.costs')}:</span>
                      <span className="font-semibold">€{(annualOperatingCosts / 1000000).toFixed(1)} M</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">{t('roi.gross.profit')}:</span>
                      <span className={`font-semibold ${grossProfit > 0 ? 'text-wine-green' : 'text-red-600'}`}>
                        €{(grossProfit / 1000000).toFixed(1)} M
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-wine-cream/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-wine-charcoal mb-3">{t('roi.financial.indicators')}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="cursor-help border-b border-dotted">{t('roi.npv.fifteen.years')}</span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <div className="space-y-1 text-sm">
                            <p><strong>{t('roi.npv.definition')}</strong></p>
                            <p>{t('roi.npv.explanation')}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <span className={`font-semibold ${npv > 0 ? 'text-wine-green' : 'text-red-600'}`}>
                        €{(npv / 1000000).toFixed(1)} M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('roi.gross.margin')}:</span>
                      <span className="font-semibold">{((grossProfit / annualRevenue) * 100).toFixed(1)} %</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('roi.capital.required')}:</span>
                      <span className="font-semibold">€{(currentScenario.capitalInvestment / 1000000).toFixed(0)} M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================
                  REGION-SPECIFIC NOTES
                  ======================================== */}
              <div className="bg-wine-cream/10 p-4 rounded-lg border border-wine-burgundy/10">
                <p className="text-sm text-wine-charcoal/80">
                  <strong>{getRegionDisplayName()} {t('economy.regional.context')}:</strong> {
                    regionId === 'champagne' 
                      ? t('roi.champagne.context')
                      : t('roi.languedoc.context')
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
