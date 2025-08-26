import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Filter, Download, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const biomassData = [
  {
    type: 'Marc de raisin',
    tonnage: 266000,
    percentage: 65,
    season: 'Septembre-Novembre',
    valorization: 'Distillation, Compostage, Méthanisation',
    color: 'hsl(var(--wine-burgundy))',
    communes: ['Béziers', 'Narbonne', 'Montpellier', 'Carcassonne']
  },
  {
    type: 'Sous-produits liquides',
    tonnage: 48000,
    percentage: 12,
    season: 'Octobre-Mars',
    valorization: 'Distillation, Épandage',
    color: 'hsl(var(--wine-gold))',
    communes: ['Perpignan', 'Nîmes', 'Sète', 'Agde']
  },
  {
    type: 'Bois de taille',
    tonnage: 45000,
    percentage: 11,
    season: 'Toute année',
    valorization: 'Biomasse énergétique, Compostage',
    color: 'hsl(var(--wine-green))',
    communes: ['Béziers', 'Montpellier', 'Narbonne', 'Lunel']
  },
  {
    type: 'Sarments',
    tonnage: 32000,
    percentage: 8,
    season: 'Janvier-Mars',
    valorization: 'Biomasse énergétique, Paillage',
    color: 'hsl(var(--wine-charcoal))',
    communes: ['Carcassonne', 'Limoux', 'Frontignan', 'Pézenas']
  },
  {
    type: 'Rafles',
    tonnage: 16000,
    percentage: 4,
    season: 'Septembre-Octobre',
    valorization: 'Compostage, Extraction tanins',
    color: 'hsl(var(--wine-cream))',
    communes: ['Saint-Chinian', 'Faugères', 'Corbières', 'Minervois']
  }
];

const BiomassBreakdownChart = () => {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const filteredData = biomassData.filter(item => {
    if (selectedFilter !== 'all' && !item.type.toLowerCase().includes(selectedFilter.toLowerCase())) {
      return false;
    }
    if (selectedSeason !== 'all' && !item.season.toLowerCase().includes(selectedSeason.toLowerCase())) {
      return false;
    }
    return true;
  });

  const exportData = () => {
    const csvContent = [
      ['Type', 'Tonnage', 'Pourcentage', 'Saison', 'Valorisation', 'Communes principales'],
      ...filteredData.map(item => [
        item.type,
        item.tonnage.toString(),
        item.percentage.toString() + '%',
        item.season,
        item.valorization,
        item.communes.join('; ')
      ])
    ];
    
    const csvString = csvContent.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'biomasse_breakdown.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-elegant border border-wine-cream/30">
          <p className="font-semibold text-wine-charcoal mb-2">{label}</p>
          <p className="text-wine-burgundy">
            <span className="font-medium">Tonnage:</span> {payload[0].value.toLocaleString('fr-FR')} tonnes
          </p>
          <p className="text-wine-gold">
            <span className="font-medium">Pourcentage:</span> {data.percentage}%
          </p>
          <p className="text-wine-green">
            <span className="font-medium">Saison:</span> {data.season}
          </p>
          <p className="text-wine-charcoal text-sm mt-2">
            <span className="font-medium">Valorisation:</span> {data.valorization}
          </p>
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
            <BarChart3 className="text-wine-burgundy" size={24} />
            Répartition Détaillée de la Biomasse
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* Chart Type Toggle */}
            <div className="flex rounded-lg bg-wine-cream/20 p-1">
              <Button
                size="sm"
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                onClick={() => setChartType('bar')}
                className="h-8 px-3"
              >
                <BarChart3 size={16} />
              </Button>
              <Button
                size="sm"
                variant={chartType === 'pie' ? 'default' : 'ghost'}
                onClick={() => setChartType('pie')}
                className="h-8 px-3"
              >
                <PieChartIcon size={16} />
              </Button>
            </div>

            {/* Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter size={16} className="mr-2" />
                  Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedFilter('all')}>
                  Tous les types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('marc')}>
                  Marc de raisin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('liquides')}>
                  Sous-produits liquides
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('bois')}>
                  Bois de taille
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('sarments')}>
                  Sarments
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter size={16} className="mr-2" />
                  Saison
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedSeason('all')}>
                  Toutes saisons
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedSeason('septembre')}>
                  Septembre-Novembre
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedSeason('octobre')}>
                  Octobre-Mars
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedSeason('janvier')}>
                  Janvier-Mars
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedSeason('toute')}>
                  Toute année
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Export Button */}
            <Button variant="outline" size="sm" onClick={exportData} className="h-8">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-96 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--wine-cream))" />
                <XAxis 
                  dataKey="type" 
                  stroke="hsl(var(--wine-charcoal))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--wine-charcoal))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="tonnage" 
                  name="Tonnage (tonnes)"
                  radius={[4, 4, 0, 0]}
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={filteredData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="tonnage"
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-wine-cream/30">
          <div className="text-center p-4 bg-gradient-subtle rounded-lg">
            <div className="text-2xl font-bold text-wine-burgundy">
              {filteredData.reduce((acc, item) => acc + item.tonnage, 0).toLocaleString('fr-FR')}
            </div>
            <div className="text-sm text-wine-charcoal/70">Tonnage total</div>
          </div>
          <div className="text-center p-4 bg-gradient-subtle rounded-lg">
            <div className="text-2xl font-bold text-wine-gold">
              {filteredData.length}
            </div>
            <div className="text-sm text-wine-charcoal/70">Types de biomasse</div>
          </div>
          <div className="text-center p-4 bg-gradient-subtle rounded-lg">
            <div className="text-2xl font-bold text-wine-green">
              {Math.round(filteredData.reduce((acc, item) => acc + item.percentage, 0))}%
            </div>
            <div className="text-sm text-wine-charcoal/70">Part du total</div>
          </div>
          <div className="text-center p-4 bg-gradient-subtle rounded-lg">
            <div className="text-2xl font-bold text-wine-charcoal">
              {new Set(filteredData.flatMap(item => item.communes)).size}
            </div>
            <div className="text-sm text-wine-charcoal/70">Communes impliquées</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiomassBreakdownChart;