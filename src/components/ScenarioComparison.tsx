import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, BarChart3, Calculator, Target } from 'lucide-react';
import { useRegion } from "@/contexts/RegionContext";

interface Scenario {
  id: string;
  name: string;
  description: string;
  biomassInput: number; // tonnes
  processEfficiency: number; // %
  safPrice: number; // €/L
  operatingCosts: number; // €M/year
  capitalInvestment: number; // €M
  color: string;
}

const ScenarioComparison = () => {
  const { currentData } = useRegion();
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(['conservative', 'realistic']);
  const [comparisonType, setComparisonType] = useState<'revenue' | 'roi' | 'payback'>('revenue');

  const predefinedScenarios: Scenario[] = [
    {
      id: 'conservative',
      name: 'Conservateur',
      description: 'Hypothèses prudentes avec données validées',
      biomassInput: Math.round(currentData.annualPomace * 0.75), // 75% du potentiel
      processEfficiency: 65,
      safPrice: 1.10,
      operatingCosts: currentData.id === 'champagne' ? 8 : 45,
      capitalInvestment: currentData.id === 'champagne' ? 25 : 150,
      color: '#8B2635'
    },
    {
      id: 'realistic',
      name: 'Réaliste',
      description: 'Scénario basé sur les données réelles actuelles',
      biomassInput: currentData.annualPomace, // Données réelles
      processEfficiency: 70,
      safPrice: 1.22,
      operatingCosts: currentData.id === 'champagne' ? 7 : 42,
      capitalInvestment: currentData.id === 'champagne' ? 25 : 150,
      color: '#D4AF37'
    },
    {
      id: 'optimistic',
      name: 'Optimiste',
      description: 'Potentiel maximal avec optimisations',
      biomassInput: Math.round(currentData.annualPomace * 1.25), // Expansion possible
      processEfficiency: 75,
      safPrice: 1.35,
      operatingCosts: currentData.id === 'champagne' ? 6 : 38,
      capitalInvestment: currentData.id === 'champagne' ? 25 : 150,
      color: '#228B22'
    }
  ];

  const calculateMetrics = (scenario: Scenario) => {
    const safProduction = (scenario.biomassInput * 280) / 1000; // ML/year
    const annualRevenue = safProduction * scenario.safPrice; // €M/year
    const grossProfit = annualRevenue - scenario.operatingCosts;
    const roi = (grossProfit / scenario.capitalInvestment) * 100;
    const paybackPeriod = scenario.capitalInvestment / grossProfit;
    const npv = grossProfit * 8 - scenario.capitalInvestment; // Simplified 8-year NPV

    return {
      scenario: scenario.name,
      safProduction: Math.round(safProduction * 10) / 10,
      annualRevenue: Math.round(annualRevenue * 10) / 10,
      grossProfit: Math.round(grossProfit * 10) / 10,
      roi: Math.round(roi * 10) / 10,
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      npv: Math.round(npv * 10) / 10,
      color: scenario.color
    };
  };

  const comparisonData = predefinedScenarios
    .filter(scenario => selectedScenarios.includes(scenario.id))
    .map(calculateMetrics);

  const getChartData = () => {
    switch (comparisonType) {
      case 'revenue':
        return comparisonData.map(d => ({
          scenario: d.scenario,
          value: d.annualRevenue,
          label: 'Revenus (€M/an)',
          color: d.color
        }));
      case 'roi':
        return comparisonData.map(d => ({
          scenario: d.scenario,
          value: d.roi,
          label: 'ROI (%)',
          color: d.color
        }));
      case 'payback':
        return comparisonData.map(d => ({
          scenario: d.scenario,
          value: d.paybackPeriod,
          label: 'Retour investissement (années)',
          color: d.color
        }));
      default:
        return [];
    }
  };

  const timelineData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const data: any = { year };
    
    comparisonData.forEach(scenario => {
      const initialInvestment = scenario.scenario === 'Réaliste' ? 150 : 150;
      const cumulativeProfit = scenario.grossProfit * year - initialInvestment;
      data[scenario.scenario] = Math.round(cumulativeProfit * 10) / 10;
    });
    
    return data;
  });

  const toggleScenario = (scenarioId: string) => {
    setSelectedScenarios(prev => {
      if (prev.includes(scenarioId)) {
        return prev.filter(id => id !== scenarioId);
      } else {
        return [...prev, scenarioId];
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Scenario Selection */}
      <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-wine-burgundy/10 rounded-lg text-wine-burgundy">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-wine-charcoal">Comparaison de Scénarios</h3>
                <Badge variant="secondary" className="bg-wine-gold/10 text-wine-gold border-wine-gold/20">
                  Données Réelles: {currentData.annualPomace.toLocaleString()}t → {(currentData.safPotential / 1000000).toFixed(1)}ML SAF → €{currentData.revenue}M
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {predefinedScenarios.map(scenario => (
              <div
                key={scenario.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedScenarios.includes(scenario.id)
                    ? 'border-wine-burgundy bg-wine-burgundy/5'
                    : 'border-wine-cream/50 bg-white/50 hover:border-wine-burgundy/30'
                }`}
                onClick={() => toggleScenario(scenario.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-wine-charcoal">{scenario.name}</h4>
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: scenario.color }}
                  />
                </div>
                <p className="text-sm text-wine-charcoal/70 mb-3">{scenario.description}</p>
                <div className="text-xs text-wine-charcoal/60 space-y-1">
                  <div>Biomasse: {(scenario.biomassInput / 1000).toFixed(0)}kt</div>
                  <div>Efficacité: {scenario.processEfficiency}%</div>
                  <div>Prix SAF: €{scenario.safPrice}/L</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-wine-charcoal">Type de comparaison:</label>
            <Select value={comparisonType} onValueChange={(value) => setComparisonType(value as 'revenue' | 'roi' | 'payback')}>
              <SelectTrigger className="w-48 border-wine-cream/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenus Annuels</SelectItem>
                <SelectItem value="roi">Retour sur Investissement</SelectItem>
                <SelectItem value="payback">Période de Retour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Chart */}
      <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
        <CardContent className="p-6">
          <h4 className="text-lg font-bold text-wine-charcoal mb-6">Comparaison des Métriques</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="scenario" 
                  stroke="#444"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#444"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#8B2635"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Projection */}
      <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
        <CardContent className="p-6">
          <h4 className="text-lg font-bold text-wine-charcoal mb-6">Évolution sur 10 ans</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="year" 
                  stroke="#444"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#444"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                {comparisonData.map(scenario => (
                  <Line
                    key={scenario.scenario}
                    type="monotone"
                    dataKey={scenario.scenario}
                    stroke={scenario.color}
                    strokeWidth={3}
                    dot={{ fill: scenario.color, strokeWidth: 2, r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Table */}
      <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
        <CardContent className="p-6">
          <h4 className="text-lg font-bold text-wine-charcoal mb-6">Résumé Comparatif</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-wine-cream/50">
                  <th className="text-left py-3 text-wine-charcoal font-semibold">Scénario</th>
                  <th className="text-right py-3 text-wine-charcoal font-semibold">SAF (ML/an)</th>
                  <th className="text-right py-3 text-wine-charcoal font-semibold">Revenus (€M/an)</th>
                  <th className="text-right py-3 text-wine-charcoal font-semibold">ROI (%)</th>
                  <th className="text-right py-3 text-wine-charcoal font-semibold">Retour (années)</th>
                  <th className="text-right py-3 text-wine-charcoal font-semibold">VAN (€M)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map(data => (
                  <tr key={data.scenario} className="border-b border-wine-cream/30">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: data.color }}
                        />
                        {data.scenario}
                      </div>
                    </td>
                    <td className="text-right py-3 text-wine-charcoal">{data.safProduction}</td>
                    <td className="text-right py-3 text-wine-charcoal">€{data.annualRevenue}M</td>
                    <td className="text-right py-3 text-wine-charcoal">{data.roi}%</td>
                    <td className="text-right py-3 text-wine-charcoal">{data.paybackPeriod}</td>
                    <td className="text-right py-3 text-wine-charcoal">€{data.npv}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioComparison;