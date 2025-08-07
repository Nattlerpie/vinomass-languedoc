import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const communes = [
  { name: 'Vieussan', tonnage: 14158, coordinates: [3.1667, 43.5167] as [number, number], department: 'Hérault' },
  { name: 'Saint-Thibéry', tonnage: 8899, coordinates: [3.4167, 43.3833] as [number, number], department: 'Hérault' },
  { name: 'Trausse', tonnage: 7984, coordinates: [2.4833, 43.2167] as [number, number], department: 'Aude' }
];

const departments = [
  { name: 'Hérault', production: 'Très élevée', color: '#8B0000' }, // Dark red
  { name: 'Aude', production: 'Élevée', color: '#CD853F' }, // Saddle brown  
  { name: 'Gard', production: 'Modérée', color: '#DAA520' }, // Goldenrod
  { name: 'Pyrénées-Orientales', production: 'Faible', color: '#6B8E23' } // Olive drab
];

const RegionalMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [3.0, 43.6], // Languedoc-Roussillon center
      zoom: 7,
      pitch: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add commune markers
      communes.forEach((commune) => {
        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'commune-marker';
        markerElement.style.cssText = `
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--wine-burgundy));
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        `;

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="font-family: system-ui; padding: 8px;">
            <strong style="color: hsl(var(--wine-charcoal));">${commune.name}</strong><br/>
            <span style="color: hsl(var(--wine-charcoal))/70);">${commune.department}</span><br/>
            <strong style="color: hsl(var(--wine-burgundy));">${commune.tonnage.toLocaleString('fr-FR')} tonnes</strong>
          </div>
        `);

        new mapboxgl.Marker(markerElement)
          .setLngLat(commune.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    setShowTokenInput(false);
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
        <h3 className="text-xl font-bold text-wine-charcoal mb-4 text-center">
          Carte Régionale - Configuration
        </h3>
        <div className="space-y-4">
          <p className="text-sm text-wine-charcoal/70 text-center">
            Pour afficher la carte, veuillez entrer votre token Mapbox public.
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-wine-burgundy hover:underline"
            >
              Obtenez votre token sur mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbG..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit} variant="default">
              Charger
            </Button>
          </div>
          <div className="text-xs text-wine-charcoal/60 bg-wine-cream/20 p-3 rounded">
            <strong>Note:</strong> Si ce projet est connecté à Supabase, vous pouvez ajouter votre token Mapbox 
            dans les secrets des Edge Functions Supabase pour une configuration permanente.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-elegant">
      <div className="p-4 border-b border-wine-cream/30">
        <h3 className="text-lg font-bold text-wine-charcoal text-center">
          Carte de Production - Languedoc-Roussillon
        </h3>
      </div>
      
      <div className="relative">
        <div ref={mapContainer} className="h-[400px] w-full" />
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-sm font-semibold text-wine-charcoal mb-2">Départements</div>
          <div className="space-y-1 text-xs">
            {departments.map((dept) => (
              <div key={dept.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: dept.color }}
                />
                <span className="text-wine-charcoal">{dept.name}</span>
                <span className="text-wine-charcoal/60">({dept.production})</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-wine-cream/30">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-wine-burgundy border border-white" />
              <span className="text-wine-charcoal">Communes productrices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalMap;