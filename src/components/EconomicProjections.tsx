import { useState } from "react";
import { useRegion } from "@/contexts/RegionContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Building, Coins, Download } from "lucide-react";

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
  const [timeframe, setTimeframe] = useState<5 | 10>(5);
  const [scenario, setScenario] = useState<'conservative' | 'realistic' | 'optimistic'>('realistic');

  const { currentData } = useRegion();
  // REAL DATA BASE: Dynamic based on region
  const REAL_BASE_REVENUE = currentData.revenue; // Revenue from region data
  const REAL_CO2_SAVINGS = currentData.co2Reduction; // CO2 savings from region data

  // Scale base costs and employment by region
  const baseCosts = currentData.id === 'champagne' ? 1.4 : 18.5; // Investment costs scaled
  const baseEmployment = Math.round(currentData.jobs * 0.35); // Initial employment during setup
  const fullEmployment = currentData.jobs; // Full employment when operational
  
  const projectionData: ProjectionData[] = [
    { year: 2024, revenue: 0, costs: baseCosts, profit: -baseCosts, cumulativeProfit: -baseCosts, employment: baseEmployment, taxRevenue: baseCosts * 0.065, carbonSavings: 0, multiplierEffect: 1.4 },
    { year: 2025, revenue: REAL_BASE_REVENUE * 0.6, costs: REAL_BASE_REVENUE * 0.41, profit: REAL_BASE_REVENUE * 0.19, cumulativeProfit: -baseCosts + (REAL_BASE_REVENUE * 0.19), employment: Math.round(fullEmployment * 0.7), taxRevenue: REAL_BASE_REVENUE * 0.044, carbonSavings: REAL_CO2_SAVINGS * 0.6, multiplierEffect: 2.1 },
    { year: 2026, revenue: REAL_BASE_REVENUE, costs: REAL_BASE_REVENUE * 0.565, profit: REAL_BASE_REVENUE * 0.435, cumulativeProfit: -baseCosts + (REAL_BASE_REVENUE * 0.19) + (REAL_BASE_REVENUE * 0.435), employment: fullEmployment, taxRevenue: REAL_BASE_REVENUE * 0.071, carbonSavings: REAL_CO2_SAVINGS, multiplierEffect: 3.2 },
    { year: 2027, revenue: REAL_BASE_REVENUE * 1.05, costs: REAL_BASE_REVENUE * 0.58, profit: REAL_BASE_REVENUE * 0.47, cumulativeProfit: -baseCosts + (REAL_BASE_REVENUE * 0.19) + (REAL_BASE_REVENUE * 0.435) + (REAL_BASE_REVENUE * 0.47), employment: Math.round(fullEmployment * 1.05), taxRevenue: REAL_BASE_REVENUE * 0.075, carbonSavings: REAL_CO2_SAVINGS * 1.05, multiplierEffect: 3.6 },
    { year: 2028, revenue: REAL_BASE_REVENUE * 1.10, costs: REAL_BASE_REVENUE * 0.59, profit: REAL_BASE_REVENUE * 0.51, cumulativeProfit: -baseCosts + (REAL_BASE_REVENUE * 0.19) + (REAL_BASE_REVENUE * 0.435) + (REAL_BASE_REVENUE * 0.47) + (REAL_BASE_REVENUE * 0.51), employment: Math.round(fullEmployment * 1.1), taxRevenue: REAL_BASE_REVENUE * 0.079, carbonSavings: REAL_CO2_SAVINGS * 1.10, multiplierEffect: 4.0 },
    { year: 2029, revenue: REAL_BASE_REVENUE * 1.16, costs: REAL_BASE_REVENUE * 0.61, profit: REAL_BASE_REVENUE * 0.55, cumulativeProfit: -baseCosts + (REAL_BASE_REVENUE * 0.19) + (REAL_BASE_REVENUE * 0.435) + (REAL_BASE_REVENUE * 0.47) + (REAL_BASE_REVENUE * 0.51) + (REAL_BASE_REVENUE * 0.55), employment: Math.round(fullEmployment * 1.16), taxRevenue: REAL_BASE_REVENUE * 0.084, carbonSavings: REAL_CO2_SAVINGS * 1.16, multiplierEffect: 4.4 },
    { year: 2030, revenue: REAL_BASE_REVENUE * 1.22, costs: REAL_BASE_REVENUE * 0.624, profit: REAL_BASE_REVENUE * 0.596, cumulativeProfit: -baseCosts + (REAL_BASE_REVENUE * 0.19) + (REAL_BASE_REVENUE * 0.435) + (REAL_BASE_REVENUE * 0.47) + (REAL_BASE_REVENUE * 0.51) + (REAL_BASE_REVENUE * 0.55) + (REAL_BASE_REVENUE * 0.596), employment: Math.round(fullEmployment * 1.22), taxRevenue: REAL_BASE_REVENUE * 0.089, carbonSavings: REAL_CO2_SAVINGS * 1.22, multiplierEffect: 4.9 },
    { year: 2031, revenue: REAL_BASE_REVENUE * 1.28, costs: 40.5, profit: 40.6, cumulativeProfit: 196.9, employment: 128, taxRevenue: 6.5, carbonSavings: REAL_CO2_SAVINGS * 1.28, multiplierEffect: 5.3 },
    { year: 2032, revenue: REAL_BASE_REVENUE * 1.34, costs: 41.5, profit: 43.5, cumulativeProfit: 240.4, employment: 136, taxRevenue: 7.0, carbonSavings: REAL_CO2_SAVINGS * 1.34, multiplierEffect: 5.8 },
    { year: 2033, revenue: REAL_BASE_REVENUE * 1.41, costs: 42.6, profit: 46.8, cumulativeProfit: 287.2, employment: 144, taxRevenue: 7.5, carbonSavings: REAL_CO2_SAVINGS * 1.41, multiplierEffect: 6.4 }
  ];

  const displayData = projectionData.slice(0, timeframe + 1);

  const economicMultipliers = [
    { sector: "Agriculture", direct: 2.1, indirect: 3.8, total: 5.9 },
    { sector: "Industrie", direct: 1.8, indirect: 2.9, total: 4.7 },
    { sector: "Services", direct: 1.4, indirect: 2.2, total: 3.6 },
    { sector: "Transport", direct: 1.6, indirect: 2.5, total: 4.1 },
    { sector: "Construction", direct: 1.9, indirect: 3.1, total: 5.0 }
  ];

  const regionalImpact = {
    directJobs: 115, // Updated real projection
    indirectJobs: 287, // Higher multiplier effect
    inducedJobs: 198, // Service sector impact
    totalJobs: 600, // Total employment impact
    averageSalary: 48000, // Regional average + premium
    totalPayroll: 28800000, // €28.8M total payroll
    localPurchases: 22500000, // €22.5M local purchases  
    taxContribution: 6100000 // €6.1M tax contribution
  };

  const exportProjections = () => {
    const exportData = {
      scenario,
      timeframe,
      projections: displayData,
      regionalImpact,
      economicMultipliers,
      summary: {
        totalRevenue5Years: displayData.reduce((acc, d) => acc + d.revenue, 0),
        totalProfit5Years: displayData.reduce((acc, d) => acc + d.profit, 0),
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
    a.download = `projections-economiques-${scenario}-${timeframe}ans-${new Date().toISOString().split('T')[0]}.json`;
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
              <TrendingUp className="text-wine-burgundy" size={28} />
              <span className="text-2xl text-wine-charcoal">Projections Économiques</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={timeframe === 5 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(5)}
              >
                5 ans
              </Button>
              <Button
                variant={timeframe === 10 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(10)}
              >
                10 ans
              </Button>
              <Button onClick={exportProjections} variant="outline" size="sm" className="gap-2">
                <Download size={16} />
                Exporter
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Real Data Validation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600 text-white">Données Certifiées</Badge>
                <span className="text-sm font-medium text-blue-800">Languedoc-Roussillon - Sources officielles 2023</span>
              </div>
              <div className="text-xs text-blue-600">
                Agreste, IFV, OIV
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs text-blue-700">
              <div><strong>Volume:</strong> 266,000t marc</div>
              <div><strong>SAF:</strong> 280L/tonne</div>
              <div><strong>Prix:</strong> €1.22/L</div>
              <div><strong>CO₂:</strong> 2.75kg/L évité</div>
              <div><strong>Efficacité:</strong> 70% ATJ</div>
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-xl border border-wine-burgundy/20">
              <Coins className="text-wine-burgundy mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-wine-burgundy mb-1">
                €{(displayData[displayData.length - 1]?.cumulativeProfit || 0).toFixed(1)}M
              </div>
              <div className="text-xs text-wine-charcoal/70">Profit cumulé</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-wine-green/10 to-wine-green/5 rounded-xl border border-wine-green/20">
              <Users className="text-wine-green mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-wine-green mb-1">
                {regionalImpact.totalJobs}
              </div>
              <div className="text-xs text-wine-charcoal/70">Emplois totaux</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-wine-gold/10 to-wine-gold/5 rounded-xl border border-wine-gold/20">
              <Building className="text-wine-gold mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-wine-gold mb-1">
                €{(displayData.reduce((acc, d) => acc + d.taxRevenue, 0)).toFixed(1)}M
              </div>
              <div className="text-xs text-wine-charcoal/70">Taxes collectées</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-wine-charcoal/10 to-wine-charcoal/5 rounded-xl border border-wine-charcoal/20">
              <div className="text-2xl font-bold text-wine-charcoal mb-1">
                {(displayData.reduce((acc, d) => acc + d.carbonSavings, 0) / 1000).toFixed(0)}Mt
              </div>
              <div className="text-xs text-wine-charcoal/70">CO₂ évité cumulé</div>
            </div>
          </div>

          {/* Revenue and Profit Projections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Évolution Financière ({timeframe} ans)</CardTitle>
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
                      formatter={(value, name) => [`€${Number(value).toFixed(1)}M`, name]}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--wine-green))" 
                      strokeWidth={3}
                      name="Revenus"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="costs" 
                      stroke="hsl(var(--wine-burgundy))" 
                      strokeWidth={2}
                      name="Coûts"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="hsl(var(--wine-gold))" 
                      strokeWidth={2}
                      name="Profit annuel"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cumulativeProfit" 
                      stroke="hsl(var(--wine-charcoal))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Profit cumulé"
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
                <CardTitle className="text-lg">Création d'Emplois</CardTitle>
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
                        formatter={(value) => [value, 'Emplois']}
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
                <CardTitle className="text-lg">Impact Carbone Annuel</CardTitle>
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
                        formatter={(value) => [`${value}kt`, 'CO₂ évité']}
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
                <CardTitle className="text-lg">Multiplicateurs Économiques Régionaux</CardTitle>
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
                          <div className="font-semibold text-wine-burgundy">{sector.direct}</div>
                          <div className="text-wine-charcoal/70">Direct</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-wine-gold">{sector.indirect}</div>
                          <div className="text-wine-charcoal/70">Indirect</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-wine-green">{sector.total}</div>
                          <div className="text-wine-charcoal/70">Total</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Impact Économique Régional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-wine-cream/20 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-wine-burgundy mb-1">
                        {regionalImpact.directJobs}
                      </div>
                      <div className="text-sm text-wine-charcoal/70">Emplois directs</div>
                    </div>
                    <div className="bg-wine-cream/20 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-wine-gold mb-1">
                        {regionalImpact.indirectJobs}
                      </div>
                      <div className="text-sm text-wine-charcoal/70">Emplois indirects</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-wine-charcoal">Masse salariale totale:</span>
                      <span className="font-semibold text-wine-burgundy">
                        €{(regionalImpact.totalPayroll / 1000000).toFixed(1)}M/an
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-wine-charcoal">Achats locaux:</span>
                      <span className="font-semibold text-wine-gold">
                        €{(regionalImpact.localPurchases / 1000000).toFixed(1)}M/an
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-wine-charcoal">Contribution fiscale:</span>
                      <span className="font-semibold text-wine-green">
                        €{(regionalImpact.taxContribution / 1000000).toFixed(1)}M/an
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-wine-charcoal">Salaire moyen:</span>
                      <span className="font-semibold text-wine-charcoal">
                        €{regionalImpact.averageSalary.toLocaleString()}/an
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EconomicProjections;