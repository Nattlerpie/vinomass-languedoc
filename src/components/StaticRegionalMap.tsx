import React from "react";
import { useRegion } from "../context/RegionContext";

interface StaticRegionalMapProps {
  region: string;
  language: string;
}

export default function StaticRegionalMap({ region, language }: StaticRegionalMapProps) {
  console.log("StaticRegionalMap rendering...");
  console.log("Region:", region, "Language:", language);

  const { currentData } = useRegion();

  // Pick the correct map image based on region
  let mapSrc = "";
  if (region === "languedoc") {
    mapSrc = "/maps/occitanie.png"; // make sure file path matches /public/maps
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
        <div className="w-full flex justify-center mb-4">
          <img
            src={mapSrc}
            alt={language === "fr" ? "Carte régionale" : "Regional map"}
            className="rounded-lg shadow-md max-h-96 object-contain"
          />
        </div>
      ) : (
        <div className="text-gray-500 italic mb-4">
          {language === "fr"
            ? "Aucune carte disponible pour cette région."
            : "No map available for this region."}
        </div>
      )}

      {/* Communes principales */}
      <div>
        <h3 className="text-md font-semibold mb-2">
          {language === "fr" ? "Communes principales" : "Main communes"}
        </h3>
        {currentData?.topCommunes && currentData.topCommunes.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {currentData.topCommunes.map((commune, idx) => (
              <li key={idx}>
                {commune.name} — {commune.tonnage.toLocaleString("fr-FR")}{" "}
                {language === "fr" ? "tonnes" : "tons"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            {language === "fr"
              ? "Aucune donnée communale disponible."
              : "No commune data available."}
          </p>
        )}
      </div>
    </div>
  );
}
