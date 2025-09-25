import { useState } from "react";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Building, Coins, Download, Leaf } from "lucide-react";

interface ProjectionData {
  year: number;
  revenue: number;
  costs: number;
  profit: number;
  cumulativeProfit: number;
  employment: number;
  taxRevenue: number;
  carbonSavings: number;
  multiplierEffect: number;
}

const EconomicProjections = () => {
  const { currentData, regionId } = useRegion();
  const { t } = useLanguage();
  const [timeframe, setTimeframe] = useState<5 | 10>(5);

  // Region-specific economic data - CORRECTED to match project data
  const getRegionalBaseData = () => {
    if (regionId === 'champagne') {
      return {
        pomaceVolume: 33000, // tonnes (total pomace, 7,000 available)
        baseRevenue: 2.4, // M€ (corrected SAF revenue)
        baseCosts: 1.6, // M€ (operating costs)
        baseProfit: 0.8, // M€ (net profit)
        baseEmployment: 45, // jobs (corrected)
        investmentCost: 15, // M€ (corrected)
        co2Reduction: 5.5 // kt CO₂/year (corrected)
      };
    } else {
      return {
        pomaceVolume: 80000, // tonnes (available for SAF)
        baseRevenue: 27.3, // M€ (corrected SAF revenue)
        baseCosts: 11.0, // M€ (operating costs)
        baseProfit: 16.3, // M€ (net profit)
        baseEmployment: 180, // jobs (corrected)
        investmentCost: 120, // M€ (corrected)
        co2Reduction: 61.6 // kt CO₂/year (corrected)
      };
    }
  };

  const regionalData = getRegionalBaseData();
  
  // REALISTIC economic multipliers based on OECD Rural Development studies
  const economicMultipliers = [
    { sector: t('projections.agriculture'), direct: 1.0, indirect: 1.4, total: 2.4 },
    { sector: t('projections.industry'), direct: 1.0, indirect: 1.2, total: 2.2 },
    { sector: t('projections.services'), direct: 1.0, indirect: 0.8, total: 1.8 },
    { sector: t('projections.transport'), direct: 1.0, indirect: 0.9, total: 1.9 },
    { sector: t('projections.construction'), direct: 1.0, indirect: 1.1, total: 2.1 }
  ];

  // Generate realistic projection data
  const generateProjectionData = (): ProjectionData[] => {
    const data: ProjectionData[] = [];
    let cumulativeProfit = 0;

    for (let year = 2024; year <= 2033; year++) {
      let revenue, costs, profit, employment, carbonSavings;
      
      if (year === 2024) {
        // Investment year
        revenue = 0;
        costs = regionalData.investmentCost;
        profit = -regionalData.investmentCost;
        employment = Math.round(regionalData.baseEmployment * 0.3);
        carbonSavings = 0;
      } else if (year === 2025) {
        // Ramp-up year
        revenue = regionalData.baseRevenue * 0.4;
        costs = regionalData.baseCosts * 0.4;
        profit = revenue - costs;
        employment = Math.round(regionalData.baseEmployment * 0.7);
        carbonSavings = regionalData.co2Reduction * 0.4;
      } else {
        // Growth years
        const growthFactor = Math.pow(1.05, year - 2026); // 5% annual growth
        revenue = regionalData.baseRevenue * growthFactor;
        costs = regionalData.baseCosts * growthFactor;
        profit = revenue - costs;
        employment = Math.round(regionalData.baseEmployment * growthFactor);
        carbonSavings = regionalData.co2Reduction * growthFactor;
      }

      cumulativeProfit += profit;

      data.push({
        year,
        revenue: Number(revenue.toFixed(1)),
        costs: Number(costs.toFixed(1)),
        profit: Number(profit.toFixed(1)),
        cumulativeProfit: Number(cumulativeProfit.toFixed(1)),
        employment: employment,
        taxRevenue: Number((revenue * 0.07).toFixed(1)), // 7% tax rate
        carbonSavings: Number(carbonSavings.toFixed(1)),
        multiplierEffect: year <= 2024 ? 1.0 : Number((1.0 + (year - 2024) * 0.3).toFixed(1))
      });
    }

    return data;
  };

  const projectionData = generateProjectionData();
  const displayData = projectionData.slice(0, timeframe + 1);

  // Calculate regional impact with realistic multipliers
  const calculateRegionalImpact = () => {
    const directJobs = regionalData.baseEmployment;
    const indirectJobs = Math.round(directJobs * 1.8); // 1.8x multiplier (OECD standard)
    const averageSalary = regionId === 'champagne' ? 52000 : 45000; // Regional salary differences
    
    return {
      directJobs,
      indirectJobs,
      totalJobs: directJobs + indirectJobs,
      averageSalary,
      totalPayroll: (directJobs + indirectJobs) * averageSalary,
      localPurchases: regionalData.baseRevenue * 1000000 * 0.25, // 25% of revenue
      taxContribution: regionalData.baseRevenue * 1000000 * 0.12 // 12% total tax contribution
    };
  };

  const regionalImpact = calculateRegionalImpact();

  const exportProjections = () => {
    const exportData = {
      region: regionId,
      timeframe,
      projections: displayData,
      regionalImpact,
      economicMultipliers,
      summary: {
        totalRevenue: displayData.reduce((acc, d) => acc + d.revenue, 0),
        totalProfit: displayData.reduce((acc, d) => acc + d.profit, 0),
        peakEmployment: Math.max(...displayData.map(d => d.employment)),
        totalCarbonSavings: displayData.reduce((acc, d) => acc + d.carbonSavings, 0),
        totalTaxRevenue: displayData.reduce((acc, d) => acc + d.taxRevenue, 0),
        averageMultiplier: displayData.reduce((acc, d) => acc + d.multiplierEffect, 0) / displayData.length
      },
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projections-${regionId}-${timeframe}ans-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRegionDisplayName = () => {
    return regionId === 'champagne' ? 'Champagne' : 'Languedoc-Roussillon';
  };

  // Helper functions for consistent formatting
  const formatCurrency = (value: number, unit: string = '') => {
    return `${t('currency.euro')} ${value}${unit}`;
  };

  const formatUnit = (value: number, unit: string) => {
    return `${value} ${unit}`;
  };

  return (
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
              <Button onClick={exportProjections} variant="outline" size="sm" className="gap-2">
                <Download size={16} />
                {t('projections.export')}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Real Data Validation */}
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs text-blue-700">
              <div><strong>{t('projections.volume')}:</strong> {formatUnit(regionalData.pomaceVolume.toLocaleString(), t('units.tonnes'))} {t('projections.pomace')}</div>
              <div><strong>{t('projections.saf')}:</strong> {formatUnit(280, `${t('units.liters')}/${t('units.tonne')}`)}</div>
              <div><strong>{t('projections.price')}:</strong> {formatCurrency(1.50, `/${t('units.liter')}`)}</div>
              <div><strong>{t('projections.co2')}:</strong> {formatUnit(2.75, `${t('units.kilograms')}/${t('units.liter')}`)} {t('projections.avoided')}</div>
              <div><strong>{t('projections.efficiency')}:</strong> 70{t('units.percent')} ATJ</div>
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-xl border border-wine-burgundy/20">
              <Coins className="text-wine-burgundy mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-wine-burgundy mb-1">
                {formatCurrency(displayData[displayData.length - 1]?.cumulativeProfit || 0, ` ${t('units.million')}`)}
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
                {formatCurrency(displayData.reduce((acc, d) => acc + d.taxRevenue, 0).toFixed(1), ` ${t('units.million')}`)}
              </div>
              <div className="text-xs text-wine-charcoal/70">{t('projections.taxes.collected')}</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-wine-charcoal/10 to-wine-charcoal/5 rounded-xl border border-wine-charcoal/20">
              <Leaf className="text-wine-charcoal mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-wine-charcoal mb-1">
                {formatUnit(displayData.reduce((acc, d) => acc + d.carbonSavings, 0).toFixed(0), t('units.kilotonnes'))}
              </div>
              <div className="text-xs text-wine-charcoal/70">{t('projections.co2.avoided.cumulative')}</div>
            </div>
          </div>

          {/* Revenue and Profit Projections */}
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
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                        borderRadius: '8px'
                      }}
                      formatter={(value, name) => [`${t('currency.euro')} ${Number(value).toFixed(1)} ${t('units.million')}`, name]}
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
                      dataKey="costs" 
                      stroke="hsl(var(--wine-burgundy))" 
                      strokeWidth={2}
                      name={t('projections.costs')}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="hsl(var(--wine-gold))" 
                      strokeWidth={2}
                      name={t('projections.annual.profit')}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cumulativeProfit" 
                      stroke="hsl(var(--wine-charcoal))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name={t('projections.cumulative.profit')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Employment and Environmental Impact */}
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
                      <Tooltip 
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
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`${value} ${t('units.kilotonnes')}`, t('projections.co2.avoided')]}
                      />
                      <Bar dataKey="carbonSavings" fill="hsl(var(--wine-green))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Economic Multipliers */}
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
                        {formatCurrency((regionalImpact.totalPayroll / 1000000).toFixed(1), ` ${t('units.million')}/${t('common.year')}`)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-wine-charcoal">{t('projections.local.purchases')}:</span>
                      <span className="font-semibold text-wine-gold">
                        {formatCurrency((regionalImpact.localPurchases / 1000000).toFixed(1), ` ${t('units.million')}/${t('common.year')}`)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-wine-charcoal">{t('projections.tax.contribution')}:</span>
                      <span className="font-semibold text-wine-green">
                        {formatCurrency((regionalImpact.taxContribution / 1000000).toFixed(1), ` ${t('units.million')}/${t('common.year')}`)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-wine-charcoal">{t('projections.average.salary')}:</span>
                      <span className="font-semibold text-wine-charcoal">
                        {formatCurrency(regionalImpact.averageSalary.toLocaleString(), `/${t('common.year')}`)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default EconomicProjections;
