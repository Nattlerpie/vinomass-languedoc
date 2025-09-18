import React, { createContext, useContext, useState, ReactNode } from "react";

export type RegionType = "languedoc" | "champagne";

export interface DepartmentData {
  name: string;
  percentage: number;
  color: string;
}

export interface CommuneData {
  name: string;
  tonnage: number;
}

export interface WasteAllocation {
  total: number;
  protected: number;
  negotiable: number;
  available: number;
  realisticSafPotential: number;
  realisticRevenue: number;
  realisticCo2Reduction: number;
  realisticJobs: number;
}

export interface RegionData {
  id: RegionType;
  name: string;
  vineyardSurface: number;
  annualPomace: number;
  safPotential: number;
  revenue: number;
  co2Reduction: number;
  jobs: number;
  wasteAllocation?: WasteAllocation;
  departments?: DepartmentData[];
  topCommunes?: CommuneData[];

  // New general socio-economic fields
  population?: number;
  gdp?: number;
  arrivals?: number;
  tourismGDP?: number;
  seasonalityIndex?: number;

  // Derived/calculated fields
  tourismGDPShare?: number;
  arrivalsPerCapita?: number;
  gdpPerCapita?: number;
}

// Base raw data
const rawRegionData: Record<RegionType, RegionData> = {
  languedoc: {
    id: "languedoc",
    name: "Languedoc-Roussillon",
    vineyardSurface: 245000,
    annualPomace: 266000,
    safPotential: 22400000,
    revenue: 27.3,
    co2Reduction: 61600,
    jobs: 180,
    population: 2700000,
    gdp: 72000000000,
    arrivals: 15000000,
    tourismGDP: 5000000000,
    seasonalityIndex: 0.45,
    wasteAllocation: {
      total: 266000,
      protected: 120000,
      negotiable: 66000,
      available: 80000,
      realisticSafPotential: 22400000,
      realisticRevenue: 27.3,
      realisticCo2Reduction: 61600,
      realisticJobs: 180,
    },
    departments: [
      { name: "Hérault", percentage: 39, color: "wine-burgundy" },
      { name: "Aude", percentage: 29, color: "wine-gold" },
      { name: "Gard", percentage: 26, color: "wine-green" },
      { name: "Pyrénées-Orientales", percentage: 6, color: "wine-charcoal" },
    ],
    topCommunes: [
      { name: "Vieussan", tonnage: 13300 },
      { name: "Saint-Thibéry", tonnage: 7980 },
      { name: "Trausse", tonnage: 6650 },
      { name: "Béziers", tonnage: 5320 },
      { name: "Montpellier", tonnage: 3990 },
      { name: "Narbonne", tonnage: 3990 },
    ],
  },
  champagne: {
    id: "champagne",
    name: "Champagne",
    vineyardSurface: 34000,
    annualPomace: 24000,
    safPotential: 2000000,
    revenue: 2.4,
    co2Reduction: 5500,
    jobs: 45,
    population: 1100000,
    gdp: 32000000000,
    arrivals: 3500000,
    tourismGDP: 1800000000,
    seasonalityIndex: 0.38,
    wasteAllocation: {
      total: 24000,
      protected: 11000,
      negotiable: 6000,
      available: 7000,
      realisticSafPotential: 2000000,
      realisticRevenue: 2.4,
      realisticCo2Reduction: 5500,
      realisticJobs: 45,
    },
    departments: [
      { name: "Marne", percentage: 85, color: "wine-burgundy" },
      { name: "Aube", percentage: 15, color: "wine-gold" },
    ],
    topCommunes: [
      { name: "Reims", tonnage: 3200 },
      { name: "Épernay", tonnage: 2800 },
      { name: "Ay", tonnage: 2400 },
      { name: "Avize", tonnage: 2100 },
      { name: "Cramant", tonnage: 1900 },
      { name: "Bouzy", tonnage: 1600 },
    ],
  },
};

// Function to compute derived values
const calculateDerivedFields = (region: RegionData): RegionData => {
  return {
    ...region,
    tourismGDPShare:
      region.gdp && region.tourismGDP ? region.tourismGDP / region.gdp : undefined,
    arrivalsPerCapita:
      region.population && region.arrivals
        ? region.arrivals / region.population
        : undefined,
    gdpPerCapita:
      region.gdp && region.population ? region.gdp / region.population : undefined,
  };
};

interface RegionContextType {
  activeRegion: RegionType;
  setActiveRegion: (region: RegionType) => void;
  currentData: RegionData;
  allRegions: RegionData[];
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRegion, setActiveRegion] = useState<RegionType>("languedoc");

  const currentData = calculateDerivedFields(rawRegionData[activeRegion]);
  const allRegions = (Object.values(rawRegionData) as RegionData[]).map((r) =>
    calculateDerivedFields(r)
  );

  return (
    <RegionContext.Provider
      value={{
        activeRegion,
        setActiveRegion,
        currentData,
        allRegions,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};
