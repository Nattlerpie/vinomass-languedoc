import { useState } from 'react';
import { Calendar, Leaf, Droplets, TreePine, Grape } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const seasonalData = [
  {
    month: 'Janvier',
    activities: [
      { type: 'Sarments', icon: TreePine, intensity: 80, color: 'wine-charcoal', description: 'Taille hivernale, récupération sarments' },
      { type: 'Maintenance', icon: Calendar, intensity: 60, color: 'wine-green', description: 'Maintenance équipements valorisation' }
    ]
  },
  {
    month: 'Février',
    activities: [
      { type: 'Sarments', icon: TreePine, intensity: 90, color: 'wine-charcoal', description: 'Pic de taille, collecte maximale' },
      { type: 'Planning', icon: Calendar, intensity: 40, color: 'wine-green', description: 'Préparation campagne suivante' }
    ]
  },
  {
    month: 'Mars',
    activities: [
      { type: 'Sarments', icon: TreePine, intensity: 70, color: 'wine-charcoal', description: 'Fin de taille, dernières collectes' },
      { type: 'Lies', icon: Droplets, intensity: 50, color: 'wine-gold', description: 'Traitement lies de vinification' }
    ]
  },
  {
    month: 'Avril',
    activities: [
      { type: 'Maintenance', icon: Calendar, intensity: 80, color: 'wine-green', description: 'Révision installations avant campagne' },
      { type: 'Formation', icon: Calendar, intensity: 30, color: 'wine-burgundy', description: 'Formation équipes saisonnières' }
    ]
  },
  {
    month: 'Mai',
    activities: [
      { type: 'Préparation', icon: Calendar, intensity: 60, color: 'wine-green', description: 'Préparation logistique vendanges' },
      { type: 'Contrats', icon: Calendar, intensity: 40, color: 'wine-burgundy', description: 'Négociation contrats collecte' }
    ]
  },
  {
    month: 'Juin',
    activities: [
      { type: 'Veille', icon: Calendar, intensity: 20, color: 'wine-green', description: 'Surveillance état vignoble' },
      { type: 'Optimisation', icon: Calendar, intensity: 30, color: 'wine-burgundy', description: 'Optimisation circuits collecte' }
    ]
  },
  {
    month: 'Juillet',
    activities: [
      { type: 'Préparation', icon: Calendar, intensity: 40, color: 'wine-green', description: 'Finalisation organisation vendanges' },
      { type: 'Tests', icon: Calendar, intensity: 50, color: 'wine-burgundy', description: 'Tests équipements de transformation' }
    ]
  },
  {
    month: 'Août',
    activities: [
      { type: 'Mobilisation', icon: Calendar, intensity: 70, color: 'wine-green', description: 'Mobilisation équipes et matériel' },
      { type: 'Coordination', icon: Calendar, intensity: 60, color: 'wine-burgundy', description: 'Coordination avec domaines partenaires' }
    ]
  },
  {
    month: 'Septembre',
    activities: [
      { type: 'Marc', icon: Grape, intensity: 100, color: 'wine-burgundy', description: 'PEAK: Collecte marc de raisin (85%)' },
      { type: 'Rafles', icon: Leaf, intensity: 80, color: 'wine-charcoal', description: 'Collecte rafles de vendange' },
      { type: 'Lies', icon: Droplets, intensity: 40, color: 'wine-gold', description: 'Premières lies de fermentation' }
    ]
  },
  {
    month: 'Octobre',
    activities: [
      { type: 'Marc', icon: Grape, intensity: 90, color: 'wine-burgundy', description: 'Fin collecte marc, traitement intensif' },
      { type: 'Lies', icon: Droplets, intensity: 70, color: 'wine-gold', description: 'Traitement lies fermentation' },
      { type: 'Stockage', icon: Calendar, intensity: 80, color: 'wine-green', description: 'Stockage biomasse transformée' }
    ]
  },
  {
    month: 'Novembre',
    activities: [
      { type: 'Marc', icon: Grape, intensity: 60, color: 'wine-burgundy', description: 'Derniers traitements marc tardif' },
      { type: 'Lies', icon: Droplets, intensity: 80, color: 'wine-gold', description: 'Peak traitement sous-produits liquides' },
      { type: 'Bilan', icon: Calendar, intensity: 50, color: 'wine-green', description: 'Bilan campagne, optimisations' }
    ]
  },
  {
    month: 'Décembre',
    activities: [
      { type: 'Lies', icon: Droplets, intensity: 60, color: 'wine-gold', description: 'Fin traitement lies vinification' },
      { type: 'Maintenance', icon: Calendar, intensity: 70, color: 'wine-green', description: 'Maintenance préventive hivernale' },
      { type: 'Planification', icon: Calendar, intensity: 40, color: 'wine-burgundy', description: 'Planification année suivante' }
    ]
  }
];

const SeasonalTimeline = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'linear' | 'circular'>('linear');

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-wine-burgundy';
    if (intensity >= 60) return 'bg-wine-gold';
    if (intensity >= 40) return 'bg-wine-green';
    return 'bg-wine-charcoal/50';
  };

  const getSeasonColor = (month: string) => {
    const springMonths = ['Mars', 'Avril', 'Mai'];
    const summerMonths = ['Juin', 'Juillet', 'Août'];
    const autumnMonths = ['Septembre', 'Octobre', 'Novembre'];
    const winterMonths = ['Décembre', 'Janvier', 'Février'];

    if (springMonths.includes(month)) return 'border-wine-green/30 bg-wine-green/5';
    if (summerMonths.includes(month)) return 'border-wine-gold/30 bg-wine-gold/5';
    if (autumnMonths.includes(month)) return 'border-wine-burgundy/30 bg-wine-burgundy/5';
    return 'border-wine-charcoal/30 bg-wine-charcoal/5';
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl text-wine-charcoal">
            <Calendar className="text-wine-burgundy" size={24} />
            Disponibilité Saisonnière des Ressources
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === 'linear' ? 'default' : 'outline'}
              onClick={() => setViewMode('linear')}
            >
              Vue Linéaire
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'circular' ? 'default' : 'outline'}
              onClick={() => setViewMode('circular')}
            >
              Vue Circulaire
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {viewMode === 'linear' ? (
          <div className="space-y-4">
            {seasonalData.map((monthData, index) => (
              <div
                key={monthData.month}
                className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${getSeasonColor(monthData.month)} ${
                  selectedMonth === monthData.month ? 'ring-2 ring-wine-burgundy/50' : ''
                }`}
                onClick={() => setSelectedMonth(selectedMonth === monthData.month ? null : monthData.month)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-wine-charcoal">{monthData.month}</h3>
                  <div className="flex items-center gap-2">
                    {monthData.activities.map((activity, actIndex) => {
                      const IconComponent = activity.icon;
                      return (
                        <div
                          key={actIndex}
                          className={`p-2 rounded-full ${getIntensityColor(activity.intensity)} transition-all duration-300 hover:scale-110`}
                          title={activity.description}
                        >
                          <IconComponent size={16} className="text-white" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Intensity Bars */}
                <div className="space-y-2">
                  {monthData.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center gap-3">
                      <div className="w-20 text-sm font-medium text-wine-charcoal">
                        {activity.type}
                      </div>
                      <div className="flex-1 bg-wine-cream/30 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${getIntensityColor(activity.intensity)} transition-all duration-500 ease-out rounded-full`}
                          style={{ width: `${activity.intensity}%` }}
                        />
                      </div>
                      <div className="text-xs text-wine-charcoal/70 w-8">
                        {activity.intensity}%
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Expanded Details */}
                {selectedMonth === monthData.month && (
                  <div className="mt-4 pt-4 border-t border-wine-cream/40 animate-fade-in">
                    <h4 className="font-semibold text-wine-burgundy mb-2">Activités détaillées :</h4>
                    <div className="space-y-2">
                      {monthData.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="p-3 bg-white/50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <activity.icon size={16} className={`text-${activity.color} mt-0.5`} />
                            <div>
                              <div className="font-medium text-wine-charcoal">{activity.type}</div>
                              <div className="text-sm text-wine-charcoal/70">{activity.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <div className="relative w-80 h-80">
              {seasonalData.map((monthData, index) => {
                const angle = (index * 30) - 90; // 30 degrees per month, start at top
                const radius = 120;
                const x = Math.cos(angle * Math.PI / 180) * radius;
                const y = Math.sin(angle * Math.PI / 180) * radius;
                
                return (
                  <div
                    key={monthData.month}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `50%`,
                      top: `50%`,
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                    onClick={() => setSelectedMonth(selectedMonth === monthData.month ? null : monthData.month)}
                  >
                    <div className={`p-3 rounded-lg ${getSeasonColor(monthData.month)} border-2 transition-all duration-300 hover:scale-110 ${
                      selectedMonth === monthData.month ? 'ring-2 ring-wine-burgundy/50 scale-110' : ''
                    }`}>
                      <div className="text-xs font-bold text-wine-charcoal text-center mb-1">
                        {monthData.month}
                      </div>
                      <div className="flex gap-1">
                        {monthData.activities.map((activity, actIndex) => {
                          const IconComponent = activity.icon;
                          return (
                            <div
                              key={actIndex}
                              className={`p-1 rounded ${getIntensityColor(activity.intensity)}`}
                              title={activity.description}
                            >
                              <IconComponent size={8} className="text-white" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Center Legend */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-elegant border border-wine-cream/30">
                <div className="text-center">
                  <div className="text-sm font-bold text-wine-charcoal mb-2">Cycle Annuel</div>
                  <div className="text-xs text-wine-charcoal/70">Biomasse Viticole</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Legend */}
        <div className="mt-6 p-4 bg-wine-cream/10 rounded-lg">
          <h4 className="font-semibold text-wine-charcoal mb-3">Légende intensité :</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-wine-burgundy rounded"></div>
              <span className="text-wine-charcoal/70">Peak (80-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-wine-gold rounded"></div>
              <span className="text-wine-charcoal/70">Élevé (60-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-wine-green rounded"></div>
              <span className="text-wine-charcoal/70">Moyen (40-60%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-wine-charcoal/50 rounded"></div>
              <span className="text-wine-charcoal/70">Faible (0-40%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonalTimeline;