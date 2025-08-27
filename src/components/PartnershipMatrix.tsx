import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MapPin, Factory, Euro, TrendingUp, Zap } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  type: 'winery' | 'cooperative' | 'processor' | 'airline' | 'investor';
  location: string;
  distance: number; // km from main facility
  capacity: number; // tonnes biomass or investment M€
  pricing: number; // cost/benefit factor
  score: number; // calculated compatibility score
  commitment: 'high' | 'medium' | 'low';
  timeline: string;
}

const PartnershipMatrix = () => {
  const [distanceWeight, setDistanceWeight] = useState([30]);
  const [capacityWeight, setCapacityWeight] = useState([40]);
  const [pricingWeight, setPricingWeight] = useState([30]);
  const [selectedType, setSelectedType] = useState<string>('all');

  const partners: Partner[] = [
    {
      id: '1',
      name: 'Vignobles Bordeaux Sud',
      type: 'winery',
      location: 'Bordeaux',
      distance: 15,
      capacity: 8500,
      pricing: 85,
      score: 0,
      commitment: 'high',
      timeline: 'Q2 2024'
    },
    {
      id: '2',
      name: 'Coopérative Gironde',
      type: 'cooperative',
      location: 'Libourne',
      distance: 25,
      capacity: 15000,
      pricing: 75,
      score: 0,
      commitment: 'high',
      timeline: 'Q3 2024'
    },
    {
      id: '3',
      name: 'AirFrance-KLM',
      type: 'airline',
      location: 'Paris CDG',
      distance: 500,
      capacity: 50000,
      pricing: 95,
      score: 0,
      commitment: 'medium',
      timeline: 'Q1 2025'
    },
    {
      id: '4',
      name: 'Total Energies',
      type: 'processor',
      location: 'Toulouse',
      distance: 180,
      capacity: 100000,
      pricing: 88,
      score: 0,
      commitment: 'high',
      timeline: 'Q4 2024'
    },
    {
      id: '5',
      name: 'Green Capital Partners',
      type: 'investor',
      location: 'Lyon',
      distance: 280,
      capacity: 75,
      pricing: 92,
      score: 0,
      commitment: 'medium',
      timeline: 'Q2 2024'
    },
    {
      id: '6',
      name: 'Vignobles Languedoc',
      type: 'winery',
      location: 'Montpellier',
      distance: 320,
      capacity: 12000,
      pricing: 70,
      score: 0,
      commitment: 'low',
      timeline: 'Q1 2025'
    }
  ];

  // Calculate compatibility scores based on weights
  const calculateScore = (partner: Partner): number => {
    const distanceScore = Math.max(0, 100 - (partner.distance / 10)); // Closer = better
    const capacityScore = Math.min(100, (partner.capacity / 1000) * 2); // More capacity = better
    const pricingScore = partner.pricing; // Direct pricing score
    
    return (
      (distanceScore * distanceWeight[0] / 100) +
      (capacityScore * capacityWeight[0] / 100) +
      (pricingScore * pricingWeight[0] / 100)
    ) / 3;
  };

  const sortedPartners = partners
    .map(partner => ({ ...partner, score: calculateScore(partner) }))
    .filter(partner => selectedType === 'all' || partner.type === selectedType)
    .sort((a, b) => b.score - a.score);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'winery': return <Factory className="w-4 h-4" />;
      case 'cooperative': return <Factory className="w-4 h-4" />;
      case 'processor': return <Zap className="w-4 h-4" />;
      case 'airline': return <TrendingUp className="w-4 h-4" />;
      case 'investor': return <Euro className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'winery': return 'text-wine-burgundy bg-wine-burgundy/10 border-wine-burgundy/20';
      case 'cooperative': return 'text-wine-gold bg-wine-gold/10 border-wine-gold/20';
      case 'processor': return 'text-wine-green bg-wine-green/10 border-wine-green/20';
      case 'airline': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'investor': return 'text-wine-charcoal bg-wine-charcoal/10 border-wine-charcoal/20';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCommitmentVariant = (commitment: string) => {
    switch (commitment) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <MapPin className="text-wine-burgundy w-7 h-7" />
          <span className="text-2xl text-wine-charcoal">Matrice des Opportunités de Partenariat</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
          >
            Tous
          </Button>
          {['winery', 'cooperative', 'processor', 'airline', 'investor'].map(type => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type)}
              className="gap-2"
            >
              {getTypeIcon(type)}
              {type === 'winery' ? 'Vignobles' : 
               type === 'cooperative' ? 'Coopératives' :
               type === 'processor' ? 'Transformateurs' :
               type === 'airline' ? 'Compagnies' :
               'Investisseurs'}
            </Button>
          ))}
        </div>

        {/* Weight Controls */}
        <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
          <h4 className="text-lg font-semibold text-wine-charcoal mb-6">Critères de Sélection</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-wine-charcoal">
                Distance ({distanceWeight[0]}%)
              </Label>
              <Slider
                value={distanceWeight}
                onValueChange={setDistanceWeight}
                min={0}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-wine-charcoal/60">Proximité géographique</div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-wine-charcoal">
                Capacité ({capacityWeight[0]}%)
              </Label>
              <Slider
                value={capacityWeight}
                onValueChange={setCapacityWeight}
                min={0}
                max={60}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-wine-charcoal/60">Volume/Investissement</div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-wine-charcoal">
                Conditions ({pricingWeight[0]}%)
              </Label>
              <Slider
                value={pricingWeight}
                onValueChange={setPricingWeight}
                min={0}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-wine-charcoal/60">Attractivité financière</div>
            </div>
          </div>
        </div>

        {/* Partnership Matrix */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-wine-charcoal">
            Partenaires Classés par Compatibilité ({sortedPartners.length} résultats)
          </h4>
          
          <div className="grid gap-4">
            {sortedPartners.map((partner, index) => (
              <div
                key={partner.id}
                className="flex items-center justify-between p-4 bg-gradient-subtle rounded-lg border border-wine-cream/40 hover:border-wine-burgundy/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-wine-burgundy">
                    #{index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold text-wine-charcoal">{partner.name}</h5>
                      <div className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(partner.type)}`}>
                        {getTypeIcon(partner.type)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-wine-charcoal/70">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {partner.location} ({partner.distance}km)
                      </div>
                      <div>
                        {partner.type === 'investor' 
                          ? `€${partner.capacity}M investissement`
                          : `${partner.capacity.toLocaleString()} tonnes`
                        }
                      </div>
                      <div>Timeline: {partner.timeline}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-wine-green">
                      {partner.score.toFixed(0)}
                    </div>
                    <div className="text-xs text-wine-charcoal/60">Score</div>
                  </div>
                  
                  <Badge variant={getCommitmentVariant(partner.commitment)}>
                    {partner.commitment === 'high' ? 'Engagement fort' :
                     partner.commitment === 'medium' ? 'Engagement modéré' :
                     'À confirmer'}
                  </Badge>
                  
                  <Button size="sm" className="gap-2">
                    <MapPin className="w-4 h-4" />
                    Contacter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-wine-cream">
          <div className="text-center p-3 bg-wine-burgundy/5 rounded-lg">
            <div className="text-xl font-bold text-wine-burgundy">
              {sortedPartners.filter(p => p.score >= 80).length}
            </div>
            <div className="text-sm text-wine-charcoal/70">Partenaires prioritaires</div>
          </div>
          
          <div className="text-center p-3 bg-wine-gold/5 rounded-lg">
            <div className="text-xl font-bold text-wine-gold">
              {sortedPartners.filter(p => p.commitment === 'high').length}
            </div>
            <div className="text-sm text-wine-charcoal/70">Engagements forts</div>
          </div>
          
          <div className="text-center p-3 bg-wine-green/5 rounded-lg">
            <div className="text-xl font-bold text-wine-green">
              {Math.round(sortedPartners.reduce((acc, p) => acc + p.capacity, 0) / 1000)}k
            </div>
            <div className="text-sm text-wine-charcoal/70">Capacité totale (t)</div>
          </div>
          
          <div className="text-center p-3 bg-wine-charcoal/5 rounded-lg">
            <div className="text-xl font-bold text-wine-charcoal">
              {Math.round(sortedPartners.reduce((acc, p) => acc + p.distance, 0) / sortedPartners.length)}km
            </div>
            <div className="text-sm text-wine-charcoal/70">Distance moyenne</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnershipMatrix;