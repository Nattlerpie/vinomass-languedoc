import { useState } from "react";
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

  const projectionData: ProjectionData[] = [
    { year: 2024, revenue: 0, costs: 15.2, profit: -15.2, cumulativeProfit: -15.2, employment: 25, taxRevenue: 0.8, carbonSavings: 0, multiplierEffect: 1.2 },
    { year: 2025, revenue: 32.5, costs: 24.2, profit: 8.3, cumulativeProfit: -6.9, employment: 45, taxRevenue: 2.1, carbonSavings: 12.5, multiplierEffect: 1.8 },
    { year: 2026, revenue: 68.5, costs: 46.4, profit: 22.1, cumulativeProfit: 15.2, employment: 75, taxRevenue: 4.2, carbonSavings: 26.8, multiplierEffect: 2.9 },
    { year: 2027, revenue: 72.8, costs: 46.4, profit: 26.4, cumulativeProfit: 41.6, employment: 85, taxRevenue: 4.8, carbonSavings: 28.5, multiplierEffect: 3.4 },
    { year: 2028, revenue: 76.2, costs: 47.5, profit: 28.7, cumulativeProfit: 70.3, employment: 92, taxRevenue: 5.1, carbonSavings: 29.8, multiplierEffect: 3.8 },
    { year: 2029, revenue: 79.8, costs: 48.6, profit: 31.2, cumulativeProfit: 101.5, employment: 98, taxRevenue: 5.4, carbonSavings: 31.2, multiplierEffect: 4.2 },
    { year: 2030, revenue: 83.7, costs: 49.8, profit: 33.9, cumulativeProfit: 135.4, employment: 105, taxRevenue: 5.8, carbonSavings: 32.8, multiplierEffect: 4.6 },
    { year: 2031, revenue: 87.9, costs: 51.0, profit: 36.9, cumulativeProfit: 172.3, employment: 112, taxRevenue: 6.2, carbonSavings: 34.5, multiplierEffect: 5.1 },
    { year: 2032, revenue: 92.3, costs: 52.3, profit: 40.0, cumulativeProfit: 212.3, employment: 120, taxRevenue: 6.7, carbonSavings: 36.3, multiplierEffect: 5.6 },
    { year: 2033, revenue: 96.9, costs: 53.6, profit: 43.3, cumulativeProfit: 255.6, employment: 128, taxRevenue: 7.2, carbonSavings: 38.2, multiplierEffect: 6.2 }
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
    directJobs: 98,
    indirectJobs: 245,
    inducedJobs: 167,
    totalJobs: 510,
    averageSalary: 45000,
    totalPayroll: 22950000,
    localPurchases: 18500000,
    taxContribution: 5400000
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
                {(displayData.reduce((acc, d) => acc + d.carbonSavings, 0)).toFixed(0)}kt
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