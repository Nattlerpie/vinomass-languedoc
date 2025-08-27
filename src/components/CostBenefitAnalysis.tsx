import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Recycle, Coins } from "lucide-react";

interface CostBenefitData {
  category: string;
  traditional: number;
  saf: number;
  difference: number;
  percentage: number;
}

const CostBenefitAnalysis = () => {
  const [viewType, setViewType] = useState<'comparison' | 'timeline' | 'breakdown'>('comparison');

  const comparisonData: CostBenefitData[] = [
    {
      category: "Revenus",
      traditional: 15.2,
      saf: 68.5,
      difference: 53.3,
      percentage: 350
    },
    {
      category: "Coûts opérationnels",
      traditional: 8.5,
      saf: 42.1,
      difference: -33.6,
      percentage: -395
    },
    {
      category: "Profit net",
      traditional: 6.7,
      saf: 26.4,
      difference: 19.7,
      percentage: 294
    },
    {
      category: "Emplois créés",
      traditional: 12,
      saf: 85,
      difference: 73,
      percentage: 608
    },
    {
      category: "CO₂ évité (kt)",
      traditional: 0,
      saf: 234,
      difference: 234,
      percentage: 100
    }
  ];

  const timelineData = [
    { year: 2024, traditional: 6.7, saf: -15.2, safCumulative: -15.2 },
    { year: 2025, traditional: 6.7, saf: 8.3, safCumulative: -6.9 },
    { year: 2026, traditional: 6.7, saf: 22.1, safCumulative: 15.2 },
    { year: 2027, traditional: 6.7, saf: 26.4, safCumulative: 41.6 },
    { year: 2028, traditional: 6.7, saf: 28.7, safCumulative: 70.3 },
    { year: 2029, traditional: 6.7, saf: 31.2, safCumulative: 101.5 }
  ];

  const valueChainData = [
    { name: "Collecte biomasse", value: 12.5, color: "#8B2635" },
    { name: "Prétraitement", value: 18.3, color: "#D4AC0D" },
    { name: "Transformation ATJ", value: 45.2, color: "#28B463" },
    { name: "Raffinage", value: 15.4, color: "#5D6D7E" },
    { name: "Distribution", value: 8.6, color: "#E74C3C" }
  ];

  const COLORS = ['hsl(var(--wine-burgundy))', 'hsl(var(--wine-gold))', 'hsl(var(--wine-green))', 'hsl(var(--wine-charcoal))', 'hsl(var(--wine-gold-light))'];

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart className="text-wine-burgundy w-7 h-7" />
              <span className="text-2xl text-wine-charcoal">Analyse Coût-Bénéfice</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewType === 'comparison' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('comparison')}
              >
                Comparaison
              </Button>
              <Button
                variant={viewType === 'timeline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('timeline')}
              >
                Timeline
              </Button>
              <Button
                variant={viewType === 'breakdown' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('breakdown')}
              >
                Répartition
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {viewType === 'comparison' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-wine-green/10 to-wine-green/5 rounded-xl border border-wine-green/20">
                  <TrendingUp className="text-wine-green mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-wine-green mb-1">+294%</div>
                  <div className="text-xs text-wine-charcoal/70">Amélioration profit</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-xl border border-wine-burgundy/20">
                  <Coins className="text-wine-burgundy mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-wine-burgundy mb-1">€19.7M</div>
                  <div className="text-xs text-wine-charcoal/70">Bénéfice additionnel</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-wine-gold/10 to-wine-gold/5 rounded-xl border border-wine-gold/20">
                  <TrendingUp className="text-wine-gold mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-wine-gold mb-1">+73</div>
                  <div className="text-xs text-wine-charcoal/70">Emplois créés</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-wine-green/10 to-wine-green/5 rounded-xl border border-wine-green/20">
                  <Recycle className="text-wine-green mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-wine-green mb-1">234kt</div>
                  <div className="text-xs text-wine-charcoal/70">CO₂ évité/an</div>
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                    <XAxis dataKey="category" stroke="hsl(var(--wine-charcoal))" />
                    <YAxis stroke="hsl(var(--wine-charcoal))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="traditional" fill="hsl(var(--wine-charcoal))" name="Valorisation traditionnelle (M€)" />
                    <Bar dataKey="saf" fill="hsl(var(--wine-burgundy))" name="Valorisation SAF (M€)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Table */}
              <div className="bg-gradient-subtle p-4 rounded-xl">
                <h4 className="font-semibold text-wine-charcoal mb-4">Comparaison Détaillée</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-wine-cream">
                        <th className="text-left py-2 text-wine-charcoal">Catégorie</th>
                        <th className="text-right py-2 text-wine-charcoal">Traditionnel</th>
                        <th className="text-right py-2 text-wine-charcoal">SAF</th>
                        <th className="text-right py-2 text-wine-charcoal">Différence</th>
                        <th className="text-right py-2 text-wine-charcoal">Amélioration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((item, index) => (
                        <tr key={index} className="border-b border-wine-cream/50">
                          <td className="py-2 font-medium text-wine-charcoal">{item.category}</td>
                          <td className="text-right py-2 text-wine-charcoal">
                            {item.category.includes('Emplois') || item.category.includes('CO₂') 
                              ? item.traditional 
                              : `€${item.traditional}M`}
                          </td>
                          <td className="text-right py-2 text-wine-charcoal">
                            {item.category.includes('Emplois') || item.category.includes('CO₂') 
                              ? item.saf 
                              : `€${item.saf}M`}
                          </td>
                          <td className="text-right py-2">
                            <span className={item.difference > 0 ? 'text-wine-green' : 'text-red-500'}>
                              {item.difference > 0 ? '+' : ''}{item.difference}
                              {item.category.includes('Emplois') ? '' : 
                               item.category.includes('CO₂') ? 'kt' : 'M€'}
                            </span>
                          </td>
                          <td className="text-right py-2">
                            <Badge variant={item.percentage > 0 ? 'default' : 'destructive'}>
                              {item.percentage > 0 ? '+' : ''}{item.percentage}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {viewType === 'timeline' && (
            <div className="space-y-6">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                    <XAxis dataKey="year" stroke="hsl(var(--wine-charcoal))" />
                    <YAxis stroke="hsl(var(--wine-charcoal))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="traditional" 
                      stroke="hsl(var(--wine-charcoal))" 
                      strokeWidth={2}
                      name="Traditionnel (M€/an)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="saf" 
                      stroke="hsl(var(--wine-burgundy))" 
                      strokeWidth={2}
                      name="SAF (M€/an)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="safCumulative" 
                      stroke="hsl(var(--wine-green))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="SAF Cumulé (M€)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-wine-cream/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-wine-charcoal mb-2">Point d'équilibre</h5>
                  <div className="text-2xl font-bold text-wine-green">2026</div>
                  <div className="text-sm text-wine-charcoal/70">Retour sur investissement</div>
                </div>
                
                <div className="bg-wine-cream/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-wine-charcoal mb-2">Profit cumulé (2029)</h5>
                  <div className="text-2xl font-bold text-wine-burgundy">€101.5M</div>
                  <div className="text-sm text-wine-charcoal/70">Sur 6 ans</div>
                </div>
                
                <div className="bg-wine-cream/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-wine-charcoal mb-2">Croissance annuelle</h5>
                  <div className="text-2xl font-bold text-wine-gold">+15%</div>
                  <div className="text-sm text-wine-charcoal/70">Moyenne 2025-2029</div>
                </div>
              </div>
            </div>
          )}

          {viewType === 'breakdown' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <h4 className="font-semibold text-wine-charcoal mb-4">Répartition des Coûts SAF</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={valueChainData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {valueChainData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-wine-charcoal">Impact Économique Régional</h4>
                
                {[
                  { label: "Emplois directs", value: "85 postes", impact: "Production et maintenance" },
                  { label: "Emplois indirects", value: "150 postes", impact: "Services et fournisseurs" },
                  { label: "Taxes locales", value: "€3.2M/an", impact: "Revenus communes" },
                  { label: "Achats locaux", value: "€12M/an", impact: "Économie circulaire" }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-subtle p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-wine-charcoal">{item.label}</span>
                      <span className="font-bold text-wine-burgundy">{item.value}</span>
                    </div>
                    <div className="text-sm text-wine-charcoal/70">{item.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CostBenefitAnalysis;