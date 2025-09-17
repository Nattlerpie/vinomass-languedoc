import React from "react";

interface StaticRegionalMapProps {
  region: string;
  language: string;
}

export default function StaticRegionalMap({ region, language }: StaticRegionalMapProps) {
  // Capitalize region key to match filenames
  const regionKey = region ? region.charAt(0).toUpperCase() + region.slice(1) : "Occitanie";
  const imagePath = `/${regionKey}.png`;

  console.log("Debug: StaticRegionalMap loaded. Region =", region, "Language =", language);

  return (
    <div className="space-y-4">
      {/* Debug Banner */}
      <div className="p-2 mb-2 bg-blue-200 text-black font-mono text-sm">
        Debug: <strong>StaticRegionalMap</strong> loaded. Region ={" "}
        {region || "undefined"}, Language = {language || "undefined"}
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold">
        {language === "fr" ? "Carte Régionale" : "Regional Map"}
      </h2>
      <p className="text-gray-600">
        {language === "fr"
          ? "Répartition Détaillée de la Biomasse"
          : "Detailed Biomass Distribution"}
      </p>

      {/* Map */}
      <div className="flex justify-center">
        <img
          src={imagePath}
          alt={`${regionKey} map`}
          className="max-w-full h-auto rounded-lg shadow"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/fallback.png";
          }}
        />
      </div>
    </div>
  );
}
