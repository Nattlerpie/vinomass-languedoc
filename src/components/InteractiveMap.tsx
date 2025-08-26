import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Eye, EyeOff } from 'lucide-react';

// Sample data for communes in Languedoc-Roussillon
const communeData = [
  { name: 'Béziers', lat: 43.3414, lng: 3.2142, tonnage: 28500, type: 'Marc/Sarments', department: 'Hérault' },
  { name: 'Montpellier', lat: 43.6108, lng: 3.8767, tonnage: 24800, type: 'Marc/Liquides', department: 'Hérault' },
  { name: 'Narbonne', lat: 43.1839, lng: 3.0044, tonnage: 22300, type: 'Marc/Bois', department: 'Aude' },
  { name: 'Carcassonne', lat: 43.2130, lng: 2.3491, tonnage: 19600, type: 'Sarments/Marc', department: 'Aude' },
  { name: 'Perpignan', lat: 42.6976, lng: 2.8954, tonnage: 18900, type: 'Liquides/Marc', department: 'Pyrénées-Orientales' },
  { name: 'Nîmes', lat: 43.8367, lng: 4.3601, tonnage: 16700, type: 'Marc/Bois', department: 'Gard' },
  { name: 'Sète', lat: 43.4054, lng: 3.6972, tonnage: 14200, type: 'Liquides', department: 'Hérault' },
  { name: 'Lunel', lat: 43.6753, lng: 4.1364, tonnage: 12800, type: 'Bois/Sarments', department: 'Hérault' },
  { name: 'Limoux', lat: 43.0550, lng: 2.2169, tonnage: 11500, type: 'Marc/Rafles', department: 'Aude' },
  { name: 'Frontignan', lat: 43.4492, lng: 3.7553, tonnage: 10200, type: 'Liquides/Marc', department: 'Hérault' }
];

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [selectedCommune, setSelectedCommune] = useState<typeof communeData[0] | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken.trim()) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [3.2, 43.6], // Center on Languedoc-Roussillon
        zoom: 8,
        pitch: 0,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        addMarkers();
        setIsMapInitialized(true);
        setShowTokenInput(false);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      alert('Erreur lors de l\'initialisation de la carte. Vérifiez votre token Mapbox.');
    }
  };

  const addMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    const newMarkers: mapboxgl.Marker[] = [];

    communeData.forEach((commune) => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.cssText = `
        width: ${Math.max(20, commune.tonnage / 1000)}px;
        height: ${Math.max(20, commune.tonnage / 1000)}px;
        background: linear-gradient(135deg, hsl(var(--wine-burgundy)), hsl(var(--wine-gold)));
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      `;
      
      markerElement.innerHTML = Math.round(commune.tonnage / 1000) + 'k';

      // Add hover effects
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.2)';
        markerElement.style.zIndex = '1000';
      });

      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
        markerElement.style.zIndex = 'auto';
      });

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([commune.lng, commune.lat])
        .addTo(map.current!);

      // Add click event
      markerElement.addEventListener('click', () => {
        setSelectedCommune(commune);
      });

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        className: 'custom-popup'
      }).setHTML(`
        <div class="p-3 bg-white rounded-lg shadow-lg">
          <h3 class="font-bold text-wine-charcoal">${commune.name}</h3>
          <p class="text-sm text-wine-burgundy">${commune.department}</p>
          <p class="text-sm text-wine-charcoal mt-1">
            <strong>Production:</strong> ${commune.tonnage.toLocaleString('fr-FR')} tonnes
          </p>
          <p class="text-sm text-wine-charcoal">
            <strong>Types:</strong> ${commune.type}
          </p>
        </div>
      `);

      marker.setPopup(popup);
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  const getTonnageColor = (tonnage: number) => {
    if (tonnage > 25000) return 'text-wine-burgundy';
    if (tonnage > 20000) return 'text-wine-gold';
    if (tonnage > 15000) return 'text-wine-green';
    return 'text-wine-charcoal';
  };

  const flyToCommune = (commune: typeof communeData[0]) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: [commune.lng, commune.lat],
      zoom: 12,
      duration: 2000
    });
    setSelectedCommune(commune);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-wine-charcoal">
          <MapPin className="text-wine-burgundy" size={24} />
          Carte Interactive de Production par Commune
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {showTokenInput && (
          <div className="mb-6 p-4 bg-wine-cream/10 rounded-lg">
            <h4 className="font-semibold text-wine-charcoal mb-2">Configuration Mapbox</h4>
            <p className="text-sm text-wine-charcoal/70 mb-3">
              Pour afficher la carte interactive, veuillez entrer votre token public Mapbox.
              <br />
              Obtenez votre token sur <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-wine-burgundy underline">mapbox.com</a>
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="pk.ey... (votre token public Mapbox)"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={initializeMap} disabled={!mapboxToken.trim()}>
                Initialiser la carte
              </Button>
            </div>
          </div>
        )}

        {isMapInitialized && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTokenInput(!showTokenInput)}
            className="mb-4"
          >
            {showTokenInput ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="ml-2">{showTokenInput ? 'Masquer' : 'Afficher'} configuration</span>
          </Button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div 
              ref={mapContainer} 
              className="w-full h-96 rounded-lg border border-wine-cream/30 bg-wine-cream/10 flex items-center justify-center"
            >
              {!isMapInitialized && (
                <div className="text-center text-wine-charcoal/70">
                  <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Carte interactive disponible après configuration</p>
                </div>
              )}
            </div>
          </div>

          {/* Commune List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-wine-charcoal mb-3">Communes Principales</h4>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {communeData.map((commune, index) => (
                <div
                  key={commune.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    selectedCommune?.name === commune.name
                      ? 'border-wine-burgundy bg-wine-burgundy/5'
                      : 'border-wine-cream/30 bg-white/50 hover:border-wine-burgundy/50'
                  }`}
                  onClick={() => isMapInitialized && flyToCommune(commune)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-wine-charcoal">{commune.name}</div>
                      <div className="text-xs text-wine-charcoal/60">{commune.department}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${getTonnageColor(commune.tonnage)}`}>
                        {(commune.tonnage / 1000).toFixed(1)}k
                      </div>
                      <div className="text-xs text-wine-charcoal/60">tonnes</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-wine-charcoal/70">
                    Types: {commune.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Commune Details */}
        {selectedCommune && (
          <div className="mt-6 p-4 bg-gradient-subtle rounded-lg border border-wine-burgundy/20 animate-fade-in">
            <h4 className="font-bold text-wine-burgundy mb-2">
              📍 {selectedCommune.name} - {selectedCommune.department}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-wine-charcoal">
                  {selectedCommune.tonnage.toLocaleString('fr-FR')}
                </div>
                <div className="text-sm text-wine-charcoal/70">tonnes de biomasse/an</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-wine-gold">
                  {selectedCommune.type}
                </div>
                <div className="text-sm text-wine-charcoal/70">Types principaux</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-wine-green">
                  {Math.round((selectedCommune.tonnage / 266000) * 100)}%
                </div>
                <div className="text-sm text-wine-charcoal/70">de la production régionale</div>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 p-4 bg-wine-cream/10 rounded-lg">
          <h4 className="font-semibold text-wine-charcoal mb-3">Légende :</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-wine-burgundy to-wine-gold rounded-full border-2 border-white text-white text-xs flex items-center justify-center font-bold">25k+</div>
              <span className="text-wine-charcoal/70">&gt; 25 000 tonnes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-br from-wine-burgundy to-wine-gold rounded-full border-2 border-white text-white text-xs flex items-center justify-center font-bold">20k</div>
              <span className="text-wine-charcoal/70">20-25 000 tonnes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-wine-burgundy to-wine-gold rounded-full border-2 border-white text-white text-xs flex items-center justify-center font-bold">15k</div>
              <span className="text-wine-charcoal/70">15-20 000 tonnes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-wine-burgundy to-wine-gold rounded-full border-2 border-white"></div>
              <span className="text-wine-charcoal/70">&lt; 15 000 tonnes</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;