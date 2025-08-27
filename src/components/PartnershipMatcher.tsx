import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Building, TrendingUp, Star, Filter } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  type: 'winery' | 'cooperative' | 'processor' | 'airline' | 'investor';
  location: {
    city: string;
    region: string;
    coordinates: [number, number];
  };
  capacity: {
    volume: number; // tonnes/year or investment M€
    unit: string;
  };
  requirements: string[];
  strengths: string[];
  matchScore: number;
  compatibility: {
    geographic: number;
    technical: number;
    commercial: number;
    strategic: number;
  };
  status: 'available' | 'interested' | 'negotiating' | 'contracted';
  contact: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
}

const PartnershipMatcher = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [minCapacity, setMinCapacity] = useState('');
  const [partnerType, setPartnerType] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [partners, setPartners] = useState<Partner[]>([]);

  const allPartners: Partner[] = [
    {
      id: '1',
      name: 'Château Margaux Coopérative',
      type: 'cooperative',
      location: {
        city: 'Margaux',
        region: 'Gironde',
        coordinates: [44.8, -0.6]
      },
      capacity: { volume: 15000, unit: 'tonnes/an' },
      requirements: ['Collecte organisée', 'Prix stable', 'Contrat 5 ans'],
      strengths: ['Volume important', 'Qualité biomasse', 'Logistique existante'],
      matchScore: 95,
      compatibility: { geographic: 98, technical: 92, commercial: 95, strategic: 95 },
      status: 'interested',
      contact: {
        name: 'Marie Dubois',
        role: 'Directrice Générale',
        phone: '+33 5 56 88 12 34',
        email: 'marie.dubois@margaux-coop.fr'
      }
    },
    {
      id: '2',
      name: 'Vignobles Lafite Collective',
      type: 'winery',
      location: {
        city: 'Pauillac',
        region: 'Médoc',
        coordinates: [45.2, -0.7]
      },
      capacity: { volume: 8500, unit: 'tonnes/an' },
      requirements: ['Valorisation premium', 'Traçabilité', 'Impact environnemental'],
      strengths: ['Prestige marque', 'Innovation', 'Engagement durable'],
      matchScore: 88,
      compatibility: { geographic: 95, technical: 85, commercial: 88, strategic: 92 },
      status: 'available',
      contact: {
        name: 'Jean-Pierre Martin',
        role: 'Responsable Développement Durable',
        phone: '+33 5 56 73 45 67',
        email: 'jp.martin@lafite.fr'
      }
    },
    {
      id: '3',
      name: 'Total Energies Renewables',
      type: 'processor',
      location: {
        city: 'Toulouse',
        region: 'Haute-Garonne',
        coordinates: [43.6, 1.4]
      },
      capacity: { volume: 100, unit: 'M€ investissement' },
      requirements: ['Volume garanti 50kt/an', 'Technologie ATJ', 'Certification ISCC'],
      strengths: ['Expertise raffinage', 'Réseau distribution', 'Capacité financière'],
      matchScore: 92,
      compatibility: { geographic: 85, technical: 98, commercial: 92, strategic: 95 },
      status: 'negotiating',
      contact: {
        name: 'Sophie Laurent',
        role: 'Directrice Nouvelles Énergies',
        phone: '+33 5 61 23 45 67',
        email: 'sophie.laurent@totalenergies.com'
      }
    },
    {
      id: '4',
      name: 'Air France-KLM',
      type: 'airline',
      location: {
        city: 'Roissy',
        region: 'Île-de-France',
        coordinates: [49.0, 2.5]
      },
      capacity: { volume: 50000, unit: 'tonnes SAF/an' },
      requirements: ['Contrat long terme', 'Prix compétitif', 'Volumes croissants'],
      strengths: ['Gros volumes', 'Engagement RSE', 'Réseau international'],
      matchScore: 85,
      compatibility: { geographic: 75, technical: 90, commercial: 88, strategic: 92 },
      status: 'interested',
      contact: {
        name: 'Antoine Rousseau',
        role: 'Responsable Carburants Durables',
        phone: '+33 1 41 56 78 90',
        email: 'antoine.rousseau@airfranceklm.com'
      }
    },
    {
      id: '5',
      name: 'BPI France Green Tech',
      type: 'investor',
      location: {
        city: 'Paris',
        region: 'Île-de-France',
        coordinates: [48.9, 2.3]
      },
      capacity: { volume: 75, unit: 'M€ investissement' },
      requirements: ['ROI 12%+', 'Impact mesurable', 'Gouvernance solide'],
      strengths: ['Expertise sectorielle', 'Réseau partenaires', 'Accompagnement'],
      matchScore: 78,
      compatibility: { geographic: 70, technical: 80, commercial: 85, strategic: 78 },
      status: 'available',
      contact: {
        name: 'Élise Moreau',
        role: 'Directrice Investissements',
        phone: '+33 1 42 47 85 63',
        email: 'elise.moreau@bpifrance.fr'
      }
    },
    {
      id: '6',
      name: 'Caves de Landiras',
      type: 'cooperative',
      location: {
        city: 'Landiras',
        region: 'Gironde',
        coordinates: [44.5, -0.5]
      },
      capacity: { volume: 12000, unit: 'tonnes/an' },
      requirements: ['Collecte proximité', 'Prix attractif', 'Simplicité'],
      strengths: ['Proximité géographique', 'Flexibilité', 'Coûts réduits'],
      matchScore: 82,
      compatibility: { geographic: 95, technical: 75, commercial: 80, strategic: 78 },
      status: 'available',
      contact: {
        name: 'Michel Blanchard',
        role: 'Président',
        phone: '+33 5 56 62 34 56',
        email: 'michel.blanchard@caves-landiras.fr'
      }
    }
  ];

  useEffect(() => {
    filterAndSortPartners();
  }, [searchLocation, minCapacity, partnerType, sortBy]);

  const filterAndSortPartners = () => {
    let filtered = allPartners.filter(partner => {
      const locationMatch = !searchLocation || 
        partner.location.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
        partner.location.region.toLowerCase().includes(searchLocation.toLowerCase());
      
      const capacityMatch = !minCapacity || partner.capacity.volume >= parseInt(minCapacity);
      
      const typeMatch = partnerType === 'all' || partner.type === partnerType;
      
      return locationMatch && capacityMatch && typeMatch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score': return b.matchScore - a.matchScore;
        case 'capacity': return b.capacity.volume - a.capacity.volume;
        case 'distance': 
          // Simplified distance calculation from Bordeaux [44.8, -0.6]
          const distanceA = Math.abs(a.location.coordinates[0] - 44.8) + Math.abs(a.location.coordinates[1] + 0.6);
          const distanceB = Math.abs(b.location.coordinates[0] - 44.8) + Math.abs(b.location.coordinates[1] + 0.6);
          return distanceA - distanceB;
        default: return 0;
      }
    });

    setPartners(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-wine-green bg-wine-green/10 border-wine-green/20';
      case 'interested': return 'text-wine-gold bg-wine-gold/10 border-wine-gold/20';
      case 'negotiating': return 'text-wine-burgundy bg-wine-burgundy/10 border-wine-burgundy/20';
      case 'contracted': return 'text-wine-charcoal bg-wine-charcoal/10 border-wine-charcoal/20';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'winery': return '🍇';
      case 'cooperative': return '🏭';
      case 'processor': return '⚗️';
      case 'airline': return '✈️';
      case 'investor': return '💰';
      default: return '🏢';
    }
  };

  const calculateDistance = (coordinates: [number, number]) => {
    // Simplified distance from Bordeaux
    const distance = Math.sqrt(
      Math.pow(coordinates[0] - 44.8, 2) + Math.pow(coordinates[1] + 0.6, 2)
    ) * 111; // Convert to approximate km
    return Math.round(distance);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Search className="text-wine-burgundy w-7 h-7" />
          <span className="text-2xl text-wine-charcoal">Algorithme de Matching Partenaires</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Search Filters */}
        <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-wine-burgundy" />
            <h4 className="text-lg font-semibold text-wine-charcoal">Critères de Recherche</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-wine-charcoal">
                Localisation
              </Label>
              <Input
                id="location"
                placeholder="Ville ou région..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="capacity" className="text-sm font-medium text-wine-charcoal">
                Capacité minimale
              </Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Volume/investissement"
                value={minCapacity}
                onChange={(e) => setMinCapacity(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-wine-charcoal">
                Type de partenaire
              </Label>
              <Select value={partnerType} onValueChange={setPartnerType}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="winery">Vignobles</SelectItem>
                  <SelectItem value="cooperative">Coopératives</SelectItem>
                  <SelectItem value="processor">Transformateurs</SelectItem>
                  <SelectItem value="airline">Compagnies aériennes</SelectItem>
                  <SelectItem value="investor">Investisseurs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-wine-charcoal">
                Trier par
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Score de compatibilité</SelectItem>
                  <SelectItem value="capacity">Capacité</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-wine-burgundy/5 rounded-lg">
            <div className="text-xl font-bold text-wine-burgundy">{partners.length}</div>
            <div className="text-sm text-wine-charcoal/70">Partenaires trouvés</div>
          </div>
          
          <div className="text-center p-3 bg-wine-green/5 rounded-lg">
            <div className="text-xl font-bold text-wine-green">
              {partners.filter(p => p.matchScore >= 85).length}
            </div>
            <div className="text-sm text-wine-charcoal/70">Compatibilité élevée</div>
          </div>
          
          <div className="text-center p-3 bg-wine-gold/5 rounded-lg">
            <div className="text-xl font-bold text-wine-gold">
              {Math.round(partners.reduce((acc, p) => acc + p.matchScore, 0) / partners.length) || 0}
            </div>
            <div className="text-sm text-wine-charcoal/70">Score moyen</div>
          </div>
          
          <div className="text-center p-3 bg-wine-charcoal/5 rounded-lg">
            <div className="text-xl font-bold text-wine-charcoal">
              {partners.filter(p => p.status === 'available' || p.status === 'interested').length}
            </div>
            <div className="text-sm text-wine-charcoal/70">Disponibles</div>
          </div>
        </div>

        {/* Partner Results */}
        <div className="space-y-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40 hover:border-wine-burgundy/30 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Partner Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getTypeIcon(partner.type)}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-wine-charcoal">{partner.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-wine-charcoal/70">
                        <MapPin className="w-4 h-4" />
                        {partner.location.city}, {partner.location.region}
                        <span className="ml-2">({calculateDistance(partner.location.coordinates)}km)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-wine-charcoal mb-2">Capacité</h4>
                      <div className="text-lg font-bold text-wine-burgundy">
                        {partner.capacity.volume.toLocaleString()} {partner.capacity.unit}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-wine-charcoal mb-2">Statut</h4>
                      <Badge className={getStatusColor(partner.status)}>
                        {partner.status === 'available' ? 'Disponible' :
                         partner.status === 'interested' ? 'Intéressé' :
                         partner.status === 'negotiating' ? 'En négociation' :
                         'Sous contrat'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-wine-charcoal mb-2">Exigences</h4>
                      <ul className="text-sm text-wine-charcoal/70 space-y-1">
                        {partner.requirements.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-wine-charcoal mb-2">Points forts</h4>
                      <ul className="text-sm text-wine-charcoal/70 space-y-1">
                        {partner.strengths.map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Compatibility & Contact */}
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/70 rounded-lg">
                    <div className="text-3xl font-bold text-wine-green mb-2">
                      {partner.matchScore}
                    </div>
                    <div className="text-sm text-wine-charcoal/70 mb-3">Score de compatibilité</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span>Géographique:</span>
                        <span className="font-semibold">{partner.compatibility.geographic}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technique:</span>
                        <span className="font-semibold">{partner.compatibility.technical}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Commercial:</span>
                        <span className="font-semibold">{partner.compatibility.commercial}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stratégique:</span>
                        <span className="font-semibold">{partner.compatibility.strategic}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/70 rounded-lg">
                    <h4 className="font-medium text-wine-charcoal mb-2">Contact</h4>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">{partner.contact.name}</div>
                      <div className="text-wine-charcoal/70">{partner.contact.role}</div>
                      <div className="text-wine-charcoal/70">{partner.contact.phone}</div>
                      <div className="text-wine-charcoal/70">{partner.contact.email}</div>
                    </div>
                    
                    <Button size="sm" className="w-full mt-3 gap-2">
                      <Building className="w-4 h-4" />
                      Initier contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {partners.length === 0 && (
          <div className="text-center py-12 text-wine-charcoal/60">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <div className="text-lg font-medium mb-2">Aucun partenaire trouvé</div>
            <div className="text-sm">Essayez d'ajuster vos critères de recherche</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartnershipMatcher;