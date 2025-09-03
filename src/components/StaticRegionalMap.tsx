import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';

const StaticRegionalMap = () => {
  const { currentData } = useRegion();

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-wine-charcoal">
          <MapPin className="text-wine-burgundy" size={24} />
          Répartition de Production par Commune - {currentData.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Static Map Visualization */}
          <div className="lg:col-span-2">
            <div className="w-full h-96 rounded-lg border border-wine-cream/30 bg-gradient-to-br from-wine-cream/10 to-wine-gold/5 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 400 400" className="text-wine-burgundy">
                  <defs>
                    <pattern id="vineyard" patternUnits="userSpaceOnUse" width="40" height="40">
                      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#vineyard)" />
                </svg>
              </div>
              
              {/* Regional Outline */}
              <div className="relative z-10 text-center space-y-6">
                <div className="w-48 h-32 bg-wine-burgundy/20 rounded-3xl border-4 border-wine-burgundy/30 flex items-center justify-center relative animate-pulse">
                  <div className="text-wine-charcoal font-bold text-lg">
                    {currentData.name}
                  </div>
                  
                  {/* Commune Markers */}
                  {currentData.topCommunes?.slice(0, 3).map((commune, index) => (
                    <div
                      key={commune.name}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-125 cursor-pointer ${
                        index === 0 ? 'bg-wine-burgundy -top-2 left-1/3' :
                        index === 1 ? 'bg-wine-gold top-1/2 -right-2' :
                        'bg-wine-green -bottom-2 left-1/4'
                      }`}
                      title={`${commune.name}: ${commune.tonnage.toLocaleString()} tonnes`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-wine-charcoal">
                    {currentData.annualPomace.toLocaleString('fr-FR')} tonnes
                  </div>
                  <div className="text-wine-charcoal/70">Production annuelle de marc</div>
                </div>
              </div>
            </div>
          </div>

          {/* Commune List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-wine-charcoal mb-3">Communes Principales</h4>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {currentData.topCommunes?.map((commune, index) => (
                <div
                  key={commune.name}
                  className="p-3 rounded-lg border border-wine-cream/30 bg-white/50 hover:border-wine-burgundy/50 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-wine-burgundy shadow-wine' : 
                        index === 1 ? 'bg-wine-gold shadow-elegant' : 'bg-wine-green shadow-elegant'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-wine-charcoal">{commune.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-wine-charcoal">
                        {(commune.tonnage / 1000).toFixed(1)}k
                      </div>
                      <div className="text-xs text-wine-charcoal/60">tonnes</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-wine-charcoal/70">
                    {Math.round((commune.tonnage / currentData.annualPomace) * 100)}% de la production régionale
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Stats */}
        <div className="mt-6 p-4 bg-gradient-subtle rounded-lg border border-wine-burgundy/20">
          <h4 className="font-bold text-wine-burgundy mb-4">Statistiques Régionales</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-wine-charcoal">
                {currentData.vineyardSurface.toLocaleString('fr-FR')}
              </div>
              <div className="text-sm text-wine-charcoal/70">hectares de vignobles</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-wine-gold">
                {(currentData.safPotential / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-wine-charcoal/70">litres SAF potentiels</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-wine-green">
                €{currentData.revenue}M
              </div>
              <div className="text-sm text-wine-charcoal/70">revenus potentiels</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-wine-burgundy">
                {currentData.jobs}
              </div>
              <div className="text-sm text-wine-charcoal/70">emplois créés</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaticRegionalMap;