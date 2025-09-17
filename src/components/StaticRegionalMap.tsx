import React from "react";

interface StaticRegionalMapProps {
  region: string;
  language: string;
}

export default function StaticRegionalMap({ region, language }: StaticRegionalMapProps) {
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
    <div className="p-4 border rounded-md bg-gray-50 relative">
      {/* Debug Banner */}
      <div className="p-2 mb-2 bg-yellow-200 text-black font-mono text-sm">
        Debug: <strong>StaticRegionalMap</strong> loaded. Region ={" "}
        {region || "undefined"}, Language = {language || "undefined"}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-2">
        {language === "fr" ? "Carte Régionale" : "Regional Map"}
      </h2>

      {/* Render map if available */}
      {mapSrc ? (
        <div className="w-full flex justify-center">
          <img
            src={mapSrc}
            alt={language === "fr" ? "Carte régionale" : "Regional map"}
            className="rounded-lg shadow-md max-h-96 object-contain"
          />
        </div>
      ) : (
        <div className="text-gray-500 italic">
          {language === "fr"
            ? "Aucune carte disponible pour cette région."
            : "No map available for this region."}
        </div>
      )}
    </div>
  );
}
