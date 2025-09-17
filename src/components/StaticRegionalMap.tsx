"use client";

import React from "react";
import Image from "next/image";

// Define the type for communes
type Commune = {
  name: string;
  value: string;
};

// Data for top communes by region
const communesByRegion: Record<string, Commune[]> = {
  languedoc: [
    { name: "Vieussan", value: "13.3k" },
    { name: "Saint-Thibéry", value: "8k" },
    { name: "Trausse", value: "6.7k" },
    { name: "Béziers", value: "5.3k" },
  ],
  champagne: [
    { name: "Reims", value: "3.2kt (13%)" },
    { name: "Épernay", value: "2.8kt (12%)" },
    { name: "Ay", value: "2.4kt (10%)" },
    { name: "Avize", value: "2.1kt (9%)" },
    { name: "Cramant", value: "1.9kt (8%)" },
    { name: "Bouzy", value: "1.6kt (7%)" },
  ],
};

// Image files for regions
const mapImages: Record<string, string> = {
  languedoc: "/Occitanie.png",
  champagne: "/Champagne.png",
};

interface StaticRegionalMapProps {
  activeRegion: string;
}

const StaticRegionalMap: React.FC<StaticRegionalMapProps> = ({ activeRegion }) => {
  const communes = communesByRegion[activeRegion] || [];
  const mapSrc = mapImages[activeRegion];

  if (!mapSrc) {
    return (
      <div className="flex flex-col items-center p-6">
        <p className="text-gray-500">No map available for this region.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="relative w-full max-w-xl h-96">
        <Image
          src={mapSrc}
          alt={`${activeRegion} map`}
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Top Communes</h3>
        <ul className="space-y-1">
          {communes.map((commune, index) => (
            <li key={index} className="text-gray-700">
              {commune.name}: <span className="font-medium">{commune.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StaticRegionalMap;
