import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, TrendingUp, AlertTriangle } from "lucide-react";

interface Variable {
  name: string;
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  impact: number;
}

interface SensitivityData {
  variable: string;
  impact: number;
  color: string;
}

const SensitivityAnalysis = () => {
  const [variables, setVariables] = useState<Variable[]>([
    { name: 'safPrice', label: 'Prix SAF', value: 2800, min: 2000, max: 4000, unit: '€/m³', impact: 0 },
    { name: 'biomassInput', label: 'Biomasse disponible', value: 250000, min: 150000, max: 400000, unit: 'tonnes', impact: 0 },
    { name: 'efficiency', label: 'Efficacité de conversion', value: 70, min: 55, max: 80, unit: '%', impact: 0 },
    { name: 'operatingCosts', label: 'Coûts opérationnels', value: 1700, min: 1200, max: 2500, unit: '€/m³', impact: 0 },
    { name: 'capitalInvestment', label: 'Investissement capital', value: 135, min: 100, max: 200, unit: 'M€', impact: 0 },
    { name: 'carbonCredit', label: 'Crédit carbone', value: 85, min: 50, max: 150, unit: '€/t CO₂', impact: 0 }
  ]);

  const [baselineROI, setBaselineROI] = useState<number>(0);
  const [scenarioData, setScenarioData] = useState<any[]>([]);

  // Calculate baseline ROI
  useEffect(() => {
    const baseline = calculateROI(variables);
    setBaselineROI(baseline);
    
    // Calculate impact for each variable
    const updatedVariables = variables.map(variable => {
      const increased = variables.map(v => 
        v.name === variable.name 
          ? { ...v, value: v.value * 1.1 } // 10% increase
          : v
      );
      const newROI = calculateROI(increased);
      return {
        ...variable,
        impact: ((newROI - baseline) / baseline) * 100
      };
    });
    
    setVariables(updatedVariables);
    
    // Generate scenario data
    generateScenarioData(baseline);
  }, []);

  const calculateROI = (vars: Variable[]): number => {
    const safPriceVar = vars.find(v => v.name === 'safPrice')!;
    const biomassVar = vars.find(v => v.name === 'biomassInput')!;
    const efficiencyVar = vars.find(v => v.name === 'efficiency')!;
    const costsVar = vars.find(v => v.name === 'operatingCosts')!;
    const capitalVar = vars.find(v => v.name === 'capitalInvestment')!;
    const carbonVar = vars.find(v => v.name === 'carbonCredit')!;

    const safProduction = (biomassVar.value * 280 * efficiencyVar.value) / 100;
    const annualRevenue = safProduction * safPriceVar.value;
    const carbonRevenue = (safProduction * 0.0032) * carbonVar.value * 1000; // CO2 savings revenue
    const totalRevenue = annualRevenue + carbonRevenue;
    const operatingCosts = safProduction * costsVar.value;
    const grossProfit = totalRevenue - operatingCosts;
    const capitalInvestment = capitalVar.value * 1000000;
    
    return ((grossProfit * 5 - capitalInvestment) / capitalInvestment) * 100;
  };

  const generateScenarioData = (baseline: number) => {
    const scenarios = [
      { name: 'Pessimiste', safPrice: 2200, efficiency: 60, biomass: 180000, costs: 2200, roi: 0 },
      { name: 'Conservateur', safPrice: 2500, efficiency: 65, biomass: 220000, costs: 1900, roi: 0 },
      { name: 'Réaliste', safPrice: 2800, efficiency: 70, biomass: 250000, costs: 1700, roi: baseline },
      { name: 'Optimiste', safPrice: 3200, efficiency: 75, biomass: 300000, costs: 1500, roi: 0 },
      { name: 'Très optimiste', safPrice: 3600, efficiency: 78, biomass: 350000, costs: 1300, roi: 0 }
    ];

    const updatedScenarios = scenarios.map(scenario => {
      if (scenario.name === 'Réaliste') return scenario;
      
      const scenarioVars = variables.map(v => {
        switch (v.name) {
          case 'safPrice': return { ...v, value: scenario.safPrice };
          case 'efficiency': return { ...v, value: scenario.efficiency };
          case 'biomassInput': return { ...v, value: scenario.biomass };
          case 'operatingCosts': return { ...v, value: scenario.costs };
          default: return v;
        }
      });
      
      return {
        ...scenario,
        roi: calculateROI(scenarioVars)
      };
    });

    setScenarioData(updatedScenarios);
  };

  const updateVariable = (name: string, value: number) => {
    const updatedVariables = variables.map(v =>
      v.name === name ? { ...v, value } : v
    );
    setVariables(updatedVariables);
    
    const newROI = calculateROI(updatedVariables);
    setBaselineROI(newROI);
  };

  const sensitivityData: SensitivityData[] = variables
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .map((variable, index) => ({
      variable: variable.label,
      impact: Math.abs(variable.impact),
      color: variable.impact > 0 ? 'hsl(var(--wine-green))' : 'hsl(var(--wine-burgundy))'
    }));

  return (
    <div className="space-y-6">
      <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Settings className="text-wine-burgundy" size={28} />
            <span className="text-2xl text-wine-charcoal">Analyse de Sensibilité</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Current ROI Display */}
          <div className="text-center p-6 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-xl border border-wine-burgundy/20">
            <TrendingUp className="text-wine-burgundy mx-auto mb-3" size={32} />
            <div className="text-4xl font-bold text-wine-burgundy mb-2">
              {baselineROI.toFixed(1)}%
            </div>
            <div className="text-lg text-wine-charcoal/70">ROI Actuel (5 ans)</div>
            <Badge variant={baselineROI > 15 ? 'default' : baselineROI > 8 ? 'secondary' : 'destructive'} className="mt-2">
              {baselineROI > 15 ? 'Excellent' : baselineROI > 8 ? 'Bon' : 'Risqué'}
            </Badge>
          </div>

          {/* Variable Controls */}
          <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
            <h4 className="text-lg font-semibold text-wine-charcoal mb-6">Variables Clés</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {variables.map((variable) => (
                <div key={variable.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium text-wine-charcoal">
                      {variable.label}
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-wine-charcoal">
                        {variable.value.toLocaleString()} {variable.unit}
                      </span>
                      <Badge 
                        variant={Math.abs(variable.impact) > 5 ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {variable.impact > 0 ? '+' : ''}{variable.impact.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Slider
                    value={[variable.value]}
                    onValueChange={([value]) => updateVariable(variable.name, value)}
                    min={variable.min}
                    max={variable.max}
                    step={variable.name === 'efficiency' ? 1 : variable.max > 1000 ? 1000 : 10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-wine-charcoal/60">
                    <span>{variable.min} {variable.unit}</span>
                    <span>{variable.max} {variable.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sensitivity Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Impact des Variables (ROI)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sensitivityData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                      <XAxis type="number" stroke="hsl(var(--wine-charcoal))" />
                      <YAxis type="category" dataKey="variable" stroke="hsl(var(--wine-charcoal))" width={120} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Impact ROI']}
                      />
                      <Bar dataKey="impact" fill="hsl(var(--wine-burgundy))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scénarios de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scenarioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                      <XAxis dataKey="name" stroke="hsl(var(--wine-charcoal))" />
                      <YAxis stroke="hsl(var(--wine-charcoal))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--wine-burgundy) / 0.2)',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`${Number(value).toFixed(1)}%`, 'ROI']}
                      />
                      <Bar dataKey="roi" fill="hsl(var(--wine-green))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment */}
          <div className="bg-wine-cream/20 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-wine-charcoal mb-4 flex items-center gap-2">
              <AlertTriangle className="text-wine-gold" size={20} />
              Évaluation des Risques
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/70 p-4 rounded-lg">
                <h5 className="font-semibold text-wine-charcoal mb-2">Risques Élevés</h5>
                <ul className="text-sm text-wine-charcoal/80 space-y-1">
                  <li>• Volatilité prix SAF (+/-25%)</li>
                  <li>• Disponibilité biomasse</li>
                  <li>• Réglementation EU</li>
                </ul>
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg">
                <h5 className="font-semibold text-wine-charcoal mb-2">Risques Modérés</h5>
                <ul className="text-sm text-wine-charcoal/80 space-y-1">
                  <li>• Efficacité technologique</li>
                  <li>• Coûts opérationnels</li>
                  <li>• Concurrence</li>
                </ul>
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg">
                <h5 className="font-semibold text-wine-charcoal mb-2">Opportunités</h5>
                <ul className="text-sm text-wine-charcoal/80 space-y-1">
                  <li>• Crédit carbone</li>
                  <li>• Subventions UE</li>
                  <li>• Partenariats aviation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensitivityAnalysis;