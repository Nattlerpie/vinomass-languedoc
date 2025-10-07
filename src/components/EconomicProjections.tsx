import { useState } from "react";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, Users, Building, Coins, Download, Leaf, ChevronDown, ChevronUp, FileText, Info } from "lucide-react";

/**
 * EconomicProjections Component - INVESTOR-GRADE WITH SCENARIOS
 * 
 * Three scenarios aligned with ROI Calculator:
 * - Conservative: €1.45/L, lower CAPEX, 7-8 year payback
 * - Realistic: €1.60/L, medium CAPEX, 5-6 year payback
 * - Optimistic: €1.75/L, higher CAPEX, 4-5 year payback
 * 
 * All units follow SI standards with proper spacing
 * Fully bilingual with translation keys
 */

interface ProjectionData {
  year: number;
  revenue: number;
  operatingCosts: number;
  depreciation: number;
  totalCosts: number;
  operatingProfit: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
  employment: number;
  taxRevenue: number;
  carbonSavings: number;
  multiplierEffect: number;
}

interface ScenarioData {
  name: string;
  safPrice: number;
  operatingCostPerLiter: number;
  capitalInvestment: number;
}

const EconomicProjections = () => {
  const { currentData, regionId } = useRegion();
  const { t } = useLanguage();
  const [timeframe, setTimeframe] = useState<5 | 10>(5);
  const [activeScenario, setActiveScenario] = useState<string>("realistic");
  const [showMethodology, setShowMethodology] = useState<boolean>(false);

  // Three scenarios for investor flexibility
  const getScenarios = () => {
    if (regionId === 'champagne') {
      return {
        conservative: {
          name: t('roi.conservative'),
          safPrice: 1.45,
          operatingCostPerLiter: 0.85,
          capitalInvestment: 28000000
        },
        realistic: {
          name: t('roi.realistic'),
          safPrice: 1.60,
          operatingCostPerLiter: 0.75,
          capitalInvestment: 38000000
        },
        optimistic: {
          name: t('roi.optimistic'),
          safPrice: 1.75,
          operatingCostPerLiter: 0.65,
          capitalInvestment: 45000000
        }
      };
    } else {
      return {
        conservative: {
          name: t('roi.conservative'),
          safPrice: 1.45,
          operatingCostPerLiter: 0.85,
          capitalInvestment: 65000000
        },
        realistic: {
          name: t('roi.realistic'),
          safPrice: 1.60,
          operatingCostPerLiter: 0.75,
          capitalInvestment: 95000000
        },
        optimistic: {
          name: t('roi.optimistic'),
          safPrice: 1.75,
          operatingCostPerLiter: 0.65,
          capitalInvestment: 115000000
        }
      };
    }
  };

  const scenarios = getScenarios();
  const currentScenario = scenarios[activeScenario as keyof typeof scenarios];

  // Base regional data from context
  const regionalData = {
    pomaceVolume: currentData.wasteAllocation.available,
    safYield: 280, // L/tonne (ATJ technology)
    baseEmployment: currentData.wasteAllocation.realisticJobs,
    depreciationPeriod: 15,
    co2ReductionFactor: 2.75 // kg CO₂/L avoided
  };
  
  // Calculate annual metrics based on selected scenario
  const annualSafProduction = regionalData.pomaceVolume * regionalData.safYield * 0.70; // 70% efficiency
  const annualRevenue = (annualSafProduction * currentScenario.safPrice) / 1000000; // M€
  const annualOperatingCosts = (annualSafProduction * currentScenario.operatingCostPerLiter) / 1000000; // M€
  const annualDepreciation = currentScenario.capitalInvestment / 1000000 / regionalData.depreciationPeriod; // M€
  const annualOperatingProfit = annualRevenue - annualOperatingCosts - annualDepreciation; // M€
  const annualNetCashFlow = annualOperatingProfit + annualDepreciation; // Add back depreciation
  const annualCO2Savings = (annualSafProduction * regionalData.co2ReductionFactor) / 1000000; // kt CO₂

  // Economic multipliers from OECD studies
  const economicMultipliers = [
    { sector: t('projections.agriculture'), direct: 1.0, indirect: 1.4, total: 2.4 },
    { sector: t('projections.industry'), direct: 1.0, indirect: 1.2, total: 2.2 },
    { sector: t('projections.services'), direct: 1.0, indirect: 0.8, total: 1.8 },
    { sector: t('projections.transport'), direct: 1.0, indirect: 0.9, total: 1.9 },
    { sector: t('projections.construction'), direct: 1.0, indirect: 1.1, total: 2.1 }
  ];

  const generateProjectionData = (): ProjectionData[] => {
    const data: ProjectionData[] = [];
    let cumulativeCashFlow = 0;

    for (let year = 2024; year <= 2033; year++) {
      let revenue, operatingCosts, employment, carbonSavings, netCashFlow;
      const depreciation = annualDepreciation;
      
      if (year === 2024) {
        // Construction year
        revenue = 0;
        operatingCosts = 0;
        employment = Math.round(regionalData.baseEmployment * 0.4);
        carbonSavings = 0;
        netCashFlow = -currentScenario.capitalInvestment / 1000000;
      } else if (year === 2025) {
        // Ramp-up year (60% capacity)
        const capacityFactor = 0.6;
        revenue = annualRevenue * capacityFactor;
        operatingCosts = annualOperatingCosts * capacityFactor;
        employment = Math.round(regionalData.baseEmployment * 0.8);
        carbonSavings = annualCO2Savings * capacityFactor;
        const operatingProfit = revenue - operatingCosts - depreciation;
        netCashFlow = operatingProfit + depreciation;
      } else {
        // Full operations with 3% annual growth
        const growthFactor = Math.pow(1.03, year - 2026);
        revenue = annualRevenue * growthFactor;
        operatingCosts = annualOperatingCosts * growthFactor;
        employment = Math.round(regionalData.baseEmployment * growthFactor);
        carbonSavings = annualCO2Savings * growthFactor;
        const operatingProfit = revenue - operatingCosts - depreciation;
        netCashFlow = operatingProfit + depreciation;
      }

      cumulativeCashFlow += netCashFlow;
      const totalCosts = operatingCosts + depreciation;
      const operatingProfit = revenue - totalCosts;

      data.push({
        year,
        revenue: Number(revenue.toFixed(1)),
        operatingCosts: Number(operatingCosts.toFixed(1)),
        depreciation: Number(depreciation.toFixed(1)),
        totalCosts: Number(totalCosts.toFixed(1)),
        operatingProfit: Number(operatingProfit.toFixed(1)),
        netCashFlow: Number(netCashFlow.toFixed(1)),
        cumulativeCashFlow: Number(cumulativeCashFlow.toFixed(1)),
        employment: employment,
        taxRevenue: Number((revenue * 0.08).toFixed(1)),
        carbonSavings: Number(carbonSavings.toFixed(2)),
        multiplierEffect: year <= 2024 ? 1.0 : Number((1.0 + (year - 2024) * 0.2).toFixed(1))
      });
    }

    return data;
  };

  const projectionData = generateProjectionData();
  const displayData = projectionData.slice(0, timeframe + 1);

  const calculateRegionalImpact = () => {
    const directJobs = regionalData.baseEmployment;
    const indirectJobs = Math.round(directJobs * 1.8);
    const averageSalary = regionId === 'champagne' ? 52000 : 45000;
    
    return {
      directJobs,
      indirectJobs,
      totalJobs: directJobs + indirectJobs,
      averageSalary,
      totalPayroll: (directJobs + indirectJobs) * averageSalary,
      localPurchases: annualRevenue * 1000000 * 0.30,
      taxContribution: annualRevenue * 1000000 * 0.12
    };
  };

  const regionalImpact = calculateRegionalImpact();

  const calculatePaybackPeriod = (data: ProjectionData[]): number => {
    for (let i = 1; i < data.length; i++) {
      if (data[i].cumulativeCashFlow > 0) {
        const prevCashFlow = data[i - 1].cumulativeCashFlow;
        const currCashFlow = data[i].cumulativeCashFlow;
        const yearFraction = -prevCashFlow / (currCashFlow - prevCashFlow);
        return (data[i - 1].year - 2024) + yearFraction;
      }
    }
    return timeframe + 1;
  };

  const exportProjections = () => {
    const exportData = {
      region: regionId,
      scenario: activeScenario,
      timeframe,
      projections: displayData,
      regionalImpact,
      economicMultipliers,
      summary: {
        totalRevenue: displayData.reduce((acc, d) => acc + d.revenue, 0),
        totalOperatingProfit: displayData.reduce((acc, d) => acc + d.operatingProfit, 0),
        finalCumulativeCashFlow: displayData[displayData.length - 1]?.cumulativeCashFlow || 0,
        peakEmployment: Math.max(...displayData.map(d => d.employment)),
        totalCarbonSavings: displayData.reduce((acc, d) => acc + d.carbonSavings, 0),
        totalTaxRevenue: displayData.reduce((acc, d) => acc + d.taxRevenue, 0),
        paybackPeriod: calculatePaybackPeriod(displayData)
      },
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projections-${regionId}-${activeScenario}-${timeframe}ans-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadMethodology = () => {
    const methodologyContent = `
ECONOMIC PROJECTIONS - TECHNICAL METHODOLOGY
Region: ${regionId === 'champagne' ? 'Champagne' : 'Languedoc-Roussillon'}
Scenario: ${currentScenario.name}
Generated: ${new Date().toISOString().split('T')[0]}

═══════════════════════════════════════════════════════════════════

1. SCENARIO PARAMETERS

SAF Market Price: €${currentScenario.safPrice.toFixed(2)}/L
Operating Cost: €${currentScenario.operatingCostPerLiter.toFixed(2)}/L
Capital Investment: €${(currentScenario.capitalInvestment / 1000000).toFixed(1)} M
Depreciation Period: ${regionalData.depreciationPeriod} years

Available Biomass: ${regionalData.pomaceVolume.toLocaleString()} t/year
SAF Conversion Rate: ${regionalData.safYield} L/t
Process Efficiency: 70%

═══════════════════════════════════════════════════════════════════

2. ANNUAL PRODUCTION CALCULATIONS

SAF Production:
= Biomass × Conversion Rate × Efficiency
= ${regionalData.pomaceVolume.toLocaleString()} t × ${regionalData.safYield} L/t × 70%
= ${(annualSafProduction / 1000000).toFixed(2)} M L/year

Annual Revenue:
= Production × Market Price
= ${(annualSafProduction / 1000000).toFixed(2)} M L × €${currentScenario.safPrice.toFixed(2)}/L
= €${annualRevenue.toFixed(1)} M

Operating Costs:
= Production × Unit Cost
= ${(annualSafProduction / 1000000).toFixed(2)} M L × €${currentScenario.operatingCostPerLiter.toFixed(2)}/L
= €${annualOperatingCosts.toFixed(1)} M

Depreciation:
= Investment ÷ Period
= €${(currentScenario.capitalInvestment / 1000000).toFixed(1)} M ÷ ${regionalData.depreciationPeriod} years
= €${annualDepreciation.toFixed(1)} M/year

Net Operating Profit:
= Revenue - Operating Costs - Depreciation
= €${annualRevenue.toFixed(1)} M - €${annualOperatingCosts.toFixed(1)} M - €${annualDepreciation.toFixed(1)} M
= €${annualOperatingProfit.toFixed(1)} M

Annual Cash Flow:
= Operating Profit + Depreciation (non-cash)
= €${annualOperatingProfit.toFixed(1)} M + €${annualDepreciation.toFixed(1)} M
= €${annualNetCashFlow.toFixed(1)} M

CO₂ Avoided:
= Production (L) × CO₂ Factor (kg/L) ÷ 1,000,000 (to kt)
= ${annualSafProduction.toLocaleString()} L × ${regionalData.co2ReductionFactor} kg/L ÷ 1,000,000
= ${annualCO2Savings.toFixed(2)} kt/year

═══════════════════════════════════════════════════════════════════

3. KEY PERFORMANCE INDICATORS

Payback Period: ${calculatePaybackPeriod(displayData).toFixed(1)} years
${timeframe}-Year Cumulative Profit: €${displayData[displayData.length - 1]?.cumulativeCashFlow.toFixed(1)} M
${timeframe}-Year Total CO₂ Avoided: ${displayData.reduce((acc, d) => acc + d.carbonSavings, 0).toFixed(1)} kt
Total Tax Revenue: €${displayData.reduce((acc, d) => acc + d.taxRevenue, 0).toFixed(1)} M

═══════════════════════════════════════════════════════════════════

4. SCENARIO COMPARISON

Conservative (€1.45/L): Baseline market pricing, slower payback
Realistic (€1.60/L): Market positioning with premiums, balanced risk
Optimistic (€1.75/L): Premium market + carbon credits, best case

All scenarios use identical production calculations, varying only
price assumptions and corresponding CAPEX optimization.

═══════════════════════════════════════════════════════════════════

5. DATA SOURCES

Regional Data: ADEME, Agreste, IFV, OIV (2023)
ATJ Technology: ASTM D7566 certification
SAF Pricing: IATA market projections 2025-2030
Operating Costs: IRENA biofuel cost analysis 2024
Employment Multipliers: OECD Rural Development studies

═══════════════════════════════════════════════════════════════════
`;

    const blob = new Blob([methodologyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projections-methodology-${regionId}-${activeScenario}-${new Date().toISOString().split('T')[0]}.txt`;
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
      <div className="space-y-6">
        <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-wine-burgundy" size={28} />
                <span className="text-2xl text-wine-charcoal">{t('projections.title')}</span>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-blue-600 text-white">{getRegionDisplayName()}</Badge>
                <Button
                  variant={timeframe === 5 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeframe(5)}
                >
                  {t('projections.five.years')}
                </Button>
                <Button
                  variant={timeframe === 10 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeframe(10)}
                >
                  {t('projections.ten.years')}
                </Button>
                <Button onClick={downloadMethodology} variant="outline" size="sm" className="gap-2">
                  <FileText size={16} />
                  {t('roi.methodology')}
                </Button>
                <Button onClick={exportProjections} variant="outline" size="sm" className="gap-2">
                  <Download size={16} />
                  {t('projections.export')}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Scenario Selection Tabs */}
            <Tabs value={activeScenario} onValueChange={setActiveScenario}>
              <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow-elegant border border-wine-cream/30">
                <TabsTrigger 
                  value="conservative" 
                  className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all"
                >
                  {t('roi.conservative')}
                </TabsTrigger>
                <TabsTrigger 
                  value="realistic" 
                  className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all"
                >
                  {t('roi.realistic')}
                </TabsTrigger>
                <TabsTrigger 
                  value="optimistic" 
                  className="text-wine-charcoal data-[state=active]:bg-wine-burgundy data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all"
                >
                  {t('roi.optimistic')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeScenario} className="space-y-6 mt-6">
                {/* Data Validation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600 text-white">{t('projections.certified.data')}</Badge>
                      <span className="text-sm font-medium text-blue-800">
                        {getRegionDisplayName()} - {t('projections.official.sources')} 2023
                      </span>
                    </div>
                    <div className="text-xs text-blue-600">
                      Agreste, IFV, OIV
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs text-blue-700">
                    <div><strong>{t('projections.volume')}:</strong> {regionalData.pomaceVolume.toLocaleString()} {t('units.tonnes')} {t('projections.pomace')}</div>
                    <div><strong>{t('projections.saf')}:</strong> {regionalData.safYield} {t('units.liters')}/{t('units.tonne')}</div>
                    <div><strong>{t('projections.price')}:</strong> €{currentScenario.safPrice.toFixed(2)}/{t('units.liter')}</div>
                    <div><strong>{t('projections.co2')}:</strong> {regionalData.co2ReductionFactor} {t('units.kilograms')}/{t('units.liter')} {t('projections.avoided')}</div>
                    <div><strong>{t('projections.efficiency')}:</strong> 70 {t('units.percent')} ATJ</div>
                    <div><strong>CAPEX:</strong> €{(currentScenario.capitalInvestment / 1000000).toFixed(0)} M</div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-xl border border-wine-burgundy/20">
                    <Coins className="text-wine-burgundy mx-auto mb-2" size={24} />
                    <div className={`text-2xl font-bold mb-1 ${
                      (displayData[displayData.length - 1]?.cumulativeCashFlow || 0) > 0 ? 'text-wine-burgundy' : 'text-red-600'
                    }`}>
                      €{displayData[displayData.length - 1]?.cumulativeCashFlow || 0} M
                    </div>
                    <div className="text-xs text-wine-charcoal/70">{t('projections.cumulative.profit')}</div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-wine-green/10 to-wine-green/5 rounded-xl border border-wine-green/20">
                    <Users className="text-wine-green mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-wine-green mb-1">
                      {regionalImpact.totalJobs}
                    </div>
                    <div className="text-xs text-wine-charcoal/70">{t('projections.total.jobs')}</div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-wine-gold/10 to-wine-gold/5 rounded-xl border border-wine-gold/20">
                    <Building className="text-wine-gold mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-wine-gold mb-1">
                      €{displayData.reduce((acc, d) => acc + d.taxRevenue, 0).toFixed(1)} M
                    </div>
                    <div className="text-xs text-wine-charcoal/70">{t('projections.taxes.collected')}</div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-wine-charcoal/10 to-wine-charcoal/5 rounded-xl border border-wine-charcoal/20">
                    <Leaf className="text-wine-charcoal mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-wine-charcoal mb-1">
                      {displayData.reduce((acc, d) => acc + d.carbonSavings, 0).toFixed(1)} kt
                    </div>
                    <div className="text-xs text-wine-charcoal/70">{t('projections.co2.avoided.cumulative')}</div>
                  </div>
                </div>

                {/* Financial Evolution Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('projections.financial.evolution')} ({timeframe} {t('projections.years')})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={displayData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                          <XAxis dataKey="year" stroke="hsl(var(--wine-charcoal))" />
                          <YAxis stroke="hsl(var(--wine-charcoal))" />
                          <RechartsTooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                              borderRadius: '8px'
                            }}
                            formatter={(value, name) => [`€${Number(value).toFixed(1)} M`, name]}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="hsl(var(--wine-green))" 
                            strokeWidth={3}
                            name={t('projections.revenue')}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="operatingCosts" 
                            stroke="hsl(var(--wine-burgundy))" 
                            strokeWidth={2}
                            name={t('projections.operating.costs')}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="operatingProfit" 
                            stroke="hsl(var(--wine-gold))" 
                            strokeWidth={2}
                            name={t('projections.operating.profit')}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="cumulativeCashFlow" 
                            stroke="hsl(var(--wine-charcoal))" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name={t('projections.cumulative.cash.flow')}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Employment and Carbon Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('projections.job.creation')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={displayData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                            <XAxis dataKey="year" stroke="hsl(var(--wine-charcoal))" />
                            <YAxis stroke="hsl(var(--wine-charcoal))" />
                            <RechartsTooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                                borderRadius: '8px'
                              }}
                              formatter={(value) => [value, t('projections.jobs')]}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="employment" 
                              stroke="hsl(var(--wine-green))" 
                              fill="hsl(var(--wine-green) / 0.3)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('projections.annual.carbon.impact')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={displayData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                            <XAxis dataKey="year" stroke="hsl(var(--wine-charcoal))" />
                            <YAxis stroke="hsl(var(--wine-charcoal))" />
                            <RechartsTooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                                borderRadius: '8px'
                              }}
                              formatter={(value) => [`${Number(value).toFixed(2)} kt`, t('projections.co2.avoided')]}
                            />
                            <Bar dataKey="carbonSavings" fill="hsl(var(--wine-green))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Economic Multipliers & Regional Impact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('projections.economic.multipliers')}</CardTitle>
                      <p className="text-sm text-wine-charcoal/60">{t('projections.oecd.source')}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {economicMultipliers.map((sector, index) => (
                          <div key={index} className="bg-gradient-subtle p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-wine-charcoal">{sector.sector}</span>
                              <Badge variant="secondary">{sector.total.toFixed(1)}x</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-center">
                                <div className="font-semibold text-wine-burgundy">{sector.direct.toFixed(1)}</div>
                                <div className="text-wine-charcoal/70">{t('projections.direct')}</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-wine-gold">{sector.indirect.toFixed(1)}</div>
                                <div className="text-wine-charcoal/70">{t('projections.indirect')}</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-wine-green">{sector.total.toFixed(1)}</div>
                                <div className="text-wine-charcoal/70">{t('projections.total')}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('projections.regional.economic.impact')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-wine-cream/20 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-wine-burgundy mb-1">
                              {regionalImpact.directJobs}
                            </div>
                            <div className="text-sm text-wine-charcoal/70">{t('projections.direct.jobs')}</div>
                          </div>
                          <div className="bg-wine-cream/20 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-wine-gold mb-1">
                              {regionalImpact.indirectJobs}
                            </div>
                            <div className="text-sm text-wine-charcoal/70">{t('projections.indirect.jobs')}</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-wine-charcoal">{t('projections.total.payroll')}:</span>
                            <span className="font-semibold text-wine-burgundy">
                              €{(regionalImpact.totalPayroll / 1000000).toFixed(1)} M/{t('common.year')}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-wine-charcoal">{t('projections.local.purchases')}:</span>
                            <span className="font-semibold text-wine-gold">
                              €{(regionalImpact.localPurchases / 1000000).toFixed(1)} M/{t('common.year')}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-wine-charcoal">{t('projections.tax.contribution')}:</span>
                            <span className="font-semibold text-wine-green">
                              €{(regionalImpact.taxContribution / 1000000).toFixed(1)} M/{t('common.year')}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-wine-charcoal">{t('projections.average.salary')}:</span>
                            <span className="font-semibold text-wine-charcoal">
                              €{regionalImpact.averageSalary.toLocaleString()}/{t('common.year')}
                            </span>
                          </div>
                        </div>

                        <div className={`p-3 rounded-lg border ${
                          calculatePaybackPeriod(displayData) <= 6 
                            ? 'bg-wine-green/10 border-wine-green/20' 
                            : 'bg-wine-gold/10 border-wine-gold/20'
                        }`}>
                          <div className="text-center">
                            <div className={`text-lg font-bold mb-1 ${
                              calculatePaybackPeriod(displayData) <= 6 ? 'text-wine-green' : 'text-wine-gold'
                            }`}>
                              {calculatePaybackPeriod(displayData).toFixed(1)} {t('projections.years')}
                            </div>
                            <div className="text-sm text-wine-charcoal/70">{t('projections.payback.period')}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* METHODOLOGY PANEL */}
                <div className="border border-wine-burgundy/20 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowMethodology(!showMethodology)}
                    className="w-full flex items-center justify-between p-4 bg-wine-cream/10 hover:bg-wine-cream/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Info className="text-wine-burgundy" size={20} />
                      <span className="font-semibold text-wine-charcoal">{t('roi.methodology.title')}</span>
                    </div>
                    {showMethodology ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  {showMethodology && (
                    <div className="p-6 bg-white/50 space-y-6">
                      <div>
                        <h6 className="font-semibold text-wine-charcoal mb-3">{t('projections.methodology.calculations')}</h6>
                        <div className="space-y-3 text-sm bg-wine-charcoal/5 p-4 rounded-lg font-mono">
                          <div>
                            <div className="text-wine-burgundy font-semibold mb-1">{t('projections.methodology.saf')}:</div>
                            <div className="text-wine-charcoal/80">
                              {regionalData.pomaceVolume.toLocaleString()} t × 280 L/t × 70% = {(annualSafProduction / 1000000).toFixed(2)} M L
                            </div>
                          </div>
                          <div>
                            <div className="text-wine-burgundy font-semibold mb-1">{t('projections.methodology.revenue.calc')}:</div>
                            <div className="text-wine-charcoal/80">
                              {(annualSafProduction / 1000000).toFixed(2)} M L × €{currentScenario.safPrice.toFixed(2)}/L = €{annualRevenue.toFixed(1)} M
                            </div>
                          </div>
                          <div>
                            <div className="text-wine-burgundy font-semibold mb-1">{t('projections.methodology.co2.calc')} ({t('projections.methodology.fixed')}):</div>
                            <div className="text-wine-charcoal/80">
                              {annualSafProduction.toLocaleString()} L × 2.75 kg/L ÷ 1,000,000 = {annualCO2Savings.toFixed(2)} kt
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h6 className="font-semibold text-wine-charcoal mb-3">{t('roi.methodology.sources')}</h6>
                        <ul className="space-y-2 text-sm text-wine-charcoal/70">
                          <li>• {t('projections.methodology.source.ademe')}</li>
                          <li>• {t('projections.methodology.source.atj')}</li>
                          <li>• {t('projections.methodology.source.iata')}</li>
                          <li>• {t('projections.methodology.source.oecd')}</li>
                        </ul>
                      </div>

                      <div className="bg-wine-burgundy/5 p-4 rounded-lg border border-wine-burgundy/10">
                        <p className="text-xs text-wine-charcoal/70 italic">
                          {t('projections.methodology.note')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Regional Context */}
                <div className="bg-wine-cream/10 p-4 rounded-lg border border-wine-burgundy/10">
                  <p className="text-sm text-wine-charcoal/80">
                    <strong>{getRegionDisplayName()} {t('projections.context')}:</strong> {
                      regionId === 'champagne' 
                        ? t('projections.champagne.context')
                        : t('projections.languedoc.context')
                    }
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default EconomicProjections;
