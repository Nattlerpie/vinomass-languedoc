import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, Zap, Droplets, Leaf, Recycle, Info, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const valorisationMethods = [
  {
    method: 'Distillation',
    percentage: 45,
    tonnage: 119700,
    revenue: '€8.2M',
    co2Impact: -2400,
    installations: 23,
    efficiency: 92,
    icon: Droplets,
    color: 'hsl(var(--wine-burgundy))',
    description: 'Production d\'alcool et distillats à partir du marc',
    advantages: ['Revenus élevés', 'Technologie mature', 'Produits à forte valeur'],
    challenges: ['Coûts énergétiques', 'Réglementation stricte', 'Saisonnalité'],
    evolution: [
      { year: 2019, value: 42 },
      { year: 2020, value: 44 },
      { year: 2021, value: 43 },
      { year: 2022, value: 46 },
      { year: 2023, value: 45 }
    ]
  },
  {
    method: 'Compostage',
    percentage: 25,
    tonnage: 66500,
    revenue: '€1.8M',
    co2Impact: -890,
    installations: 31,
    efficiency: 78,
    icon: Leaf,
    color: 'hsl(var(--wine-gold))',
    description: 'Transformation en amendement organique de qualité',
    advantages: ['Économie circulaire', 'Demande locale forte', 'Process simple'],
    challenges: ['Marges faibles', 'Gestion odeurs', 'Délais maturation'],
    evolution: [
      { year: 2019, value: 22 },
      { year: 2020, value: 24 },
      { year: 2021, value: 26 },
      { year: 2022, value: 25 },
      { year: 2023, value: 25 }
    ]
  },
  {
    method: 'Méthanisation',
    percentage: 20,
    tonnage: 53200,
    revenue: '€4.1M',
    co2Impact: -1680,
    installations: 12,
    efficiency: 85,
    icon: Zap,
    color: 'hsl(var(--wine-green))',
    description: 'Production de biogaz et digestat fertilisant',
    advantages: ['Énergie renouvelable', 'Subventions attractives', 'Double valorisation'],
    challenges: ['Investissement lourd', 'Maintenance complexe', 'Régulation gaz'],
    evolution: [
      { year: 2019, value: 15 },
      { year: 2020, value: 17 },
      { year: 2021, value: 19 },
      { year: 2022, value: 20 },
      { year: 2023, value: 20 }
    ]
  },
  {
    method: 'Épandage direct',
    percentage: 10,
    tonnage: 26600,
    revenue: '€0.3M',
    co2Impact: -120,
    installations: 7,
    efficiency: 45,
    icon: Recycle,
    color: 'hsl(var(--wine-charcoal))',
    description: 'Utilisation directe comme amendement des sols',
    advantages: ['Coût minimal', 'Simplicité', 'Proximité'],
    challenges: ['Valeur ajoutée faible', 'Contraintes réglementaires', 'Logistique'],
    evolution: [
      { year: 2019, value: 21 },
      { year: 2020, value: 15 },
      { year: 2021, value: 12 },
      { year: 2022, value: 11 },
      { year: 2023, value: 10 }
    ]
  }
];

const EnhancedValoorizationMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<typeof valorisationMethods[0] | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'comparison'>('overview');

  const exportData = () => {
    const csvContent = [
      ['Méthode', 'Pourcentage', 'Tonnage', 'Revenus', 'Impact CO2', 'Installations', 'Efficacité'],
      ...valorisationMethods.map(method => [
        method.method,
        method.percentage.toString() + '%',
        method.tonnage.toString(),
        method.revenue,
        method.co2Impact.toString(),
        method.installations.toString(),
        method.efficiency.toString() + '%'
      ])
    ];
    
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'methodes_valorisation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-elegant border border-wine-cream/30">
          <p className="font-semibold text-wine-charcoal mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              <span className="font-medium">{entry.dataKey}:</span> {entry.value}
              {entry.dataKey === 'percentage' && '%'}
              {entry.dataKey === 'tonnage' && ' tonnes'}
              {entry.dataKey === 'efficiency' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl text-wine-charcoal">
            <TrendingUp className="text-wine-burgundy" size={24} />
            Méthodes de Valorisation Détaillées
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-wine-cream/20 p-1">
              <Button
                size="sm"
                variant={viewMode === 'overview' ? 'default' : 'ghost'}
                onClick={() => setViewMode('overview')}
                className="h-8 px-3"
              >
                Vue d'ensemble
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'trends' ? 'default' : 'ghost'}
                onClick={() => setViewMode('trends')}
                className="h-8 px-3"
              >
                Évolution
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'comparison' ? 'default' : 'ghost'}
                onClick={() => setViewMode('comparison')}
                className="h-8 px-3"
              >
                Comparaison
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={exportData} className="h-8">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {viewMode === 'overview' && (
          <div className="space-y-6">
            {/* Method Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {valorisationMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={method.method}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                      selectedMethod?.method === method.method
                        ? 'border-wine-burgundy bg-wine-burgundy/5'
                        : 'border-wine-cream/30 bg-white/50 hover:border-wine-burgundy/50'
                    }`}
                    onClick={() => setSelectedMethod(selectedMethod?.method === method.method ? null : method)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: method.color + '20' }}>
                        <IconComponent size={20} style={{ color: method.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-wine-charcoal">{method.method}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {method.percentage}% du total
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-wine-charcoal/70">Tonnage:</span>
                        <span className="font-medium text-wine-charcoal">
                          {(method.tonnage / 1000).toFixed(0)}k t
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-wine-charcoal/70">Revenus:</span>
                        <span className="font-medium text-wine-gold">{method.revenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-wine-charcoal/70">Efficacité:</span>
                        <span className="font-medium text-wine-green">{method.efficiency}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed View */}
            {selectedMethod && (
              <div className="p-6 bg-gradient-subtle rounded-lg border border-wine-burgundy/20 animate-fade-in">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: selectedMethod.color + '20' }}>
                    <selectedMethod.icon size={24} style={{ color: selectedMethod.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-wine-charcoal mb-2">{selectedMethod.method}</h3>
                    <p className="text-wine-charcoal/70 mb-4">{selectedMethod.description}</p>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className="p-2 rounded-full bg-wine-cream/20 cursor-help">
                        <Info size={16} className="text-wine-charcoal/60" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Cliquez pour masquer les détails</p>
                    </TooltipContent>
                  </UITooltip>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Stats */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-wine-burgundy">Statistiques Clés</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Volume traité:</span>
                        <span className="font-medium">{selectedMethod.tonnage.toLocaleString('fr-FR')} t/an</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Chiffre d'affaires:</span>
                        <span className="font-medium text-wine-gold">{selectedMethod.revenue}/an</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Impact CO₂:</span>
                        <span className="font-medium text-wine-green">{selectedMethod.co2Impact} t/an</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Installations:</span>
                        <span className="font-medium">{selectedMethod.installations} unités</span>
                      </div>
                    </div>
                  </div>

                  {/* Advantages */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-wine-green">Avantages</h4>
                    <ul className="space-y-2">
                      {selectedMethod.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-wine-green mt-2 flex-shrink-0" />
                          <span className="text-sm text-wine-charcoal/80">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-wine-charcoal">Défis</h4>
                    <ul className="space-y-2">
                      {selectedMethod.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-wine-charcoal mt-2 flex-shrink-0" />
                          <span className="text-sm text-wine-charcoal/80">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {viewMode === 'trends' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-wine-charcoal">Évolution 2019-2023</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                  <XAxis dataKey="year" stroke="hsl(var(--wine-charcoal))" />
                  <YAxis stroke="hsl(var(--wine-charcoal))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {valorisationMethods.map((method) => (
                    <Line
                      key={method.method}
                      type="monotone"
                      dataKey="value"
                      data={method.evolution}
                      stroke={method.color}
                      strokeWidth={3}
                      name={method.method}
                      dot={{ fill: method.color, strokeWidth: 2, r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {viewMode === 'comparison' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-wine-charcoal">Analyse Comparative</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Efficiency vs Revenue */}
              <div className="h-64">
                <h4 className="font-semibold text-wine-burgundy mb-3">Efficacité vs Revenus</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={valorisationMethods} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                    <XAxis dataKey="method" stroke="hsl(var(--wine-charcoal))" fontSize={12} />
                    <YAxis stroke="hsl(var(--wine-charcoal))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="efficiency" name="Efficacité (%)" radius={[4, 4, 0, 0]}>
                      {valorisationMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Environmental Impact */}
              <div className="h-64">
                <h4 className="font-semibold text-wine-green mb-3">Impact Environnemental (CO₂)</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={valorisationMethods} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                    <XAxis dataKey="method" stroke="hsl(var(--wine-charcoal))" fontSize={12} />
                    <YAxis stroke="hsl(var(--wine-charcoal))" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="co2Impact" name="Réduction CO₂ (t/an)" radius={[4, 4, 0, 0]}>
                      {valorisationMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Performance Summary */}
        <div className="mt-6 p-4 bg-wine-cream/10 rounded-lg">
          <h4 className="font-semibold text-wine-charcoal mb-3">Synthèse Performance Globale</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-burgundy">
                {valorisationMethods.reduce((acc, method) => acc + method.tonnage, 0).toLocaleString('fr-FR')}
              </div>
              <div className="text-sm text-wine-charcoal/70">Tonnes valorisées/an</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-gold">€14.4M</div>
              <div className="text-sm text-wine-charcoal/70">Chiffre d'affaires total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-green">
                {Math.abs(valorisationMethods.reduce((acc, method) => acc + method.co2Impact, 0)).toLocaleString('fr-FR')}
              </div>
              <div className="text-sm text-wine-charcoal/70">Tonnes CO₂ évitées/an</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wine-charcoal">
                {valorisationMethods.reduce((acc, method) => acc + method.installations, 0)}
              </div>
              <div className="text-sm text-wine-charcoal/70">Installations actives</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedValoorizationMethods;