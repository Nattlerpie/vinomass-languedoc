import React from "react";
interface StaticRegionalMapProps {
  region: string;
  language: string;
}
export default function StaticRegionalMap({
  region,
  language
}: StaticRegionalMapProps) {
  console.log("StaticRegionalMap rendering...");
  console.log("Region:", region, "Language:", language);

  // Pick the correct map image based on region
  let mapSrc = "";
  if (region === "languedoc") {
    mapSrc = "/maps/occitanie.png"; // make sure file path matches your /public/maps folder
  } else if (region === "champagne") {
    mapSrc = "/maps/champagne.png";
  }
  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      {mapSrc ? (
        <img
          src={mapSrc}
          alt={`Carte de la région ${region}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Map image failed to load:", mapSrc);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">
            {language === 'fr' ? 'Carte non disponible' : 'Map not available'}
          </p>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
        <h3 className="font-semibold text-sm">
          {region === 'languedoc' ? 'Languedoc-Roussillon' : 'Champagne'}
        </h3>
      </div>
    </div>
  );
}