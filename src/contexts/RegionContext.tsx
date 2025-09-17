import React, { createContext, useContext, useState, ReactNode } from 'react';

export type RegionType = 'languedoc' | 'champagne';

export interface RegionData {
  id: RegionType;
  name: string;
  vineyardSurface: number;
  annualPomace: number;
  safPotential: number;
  revenue: number;
  co2Reduction: number;
  jobs: number;
  wasteAllocation?: {
    total: number;
    protected: number;
    negotiable: number;
    available: number;
    realisticSafPotential: number;
    realisticRevenue: number;
    realisticCo2Reduction: number;
    realisticJobs: number;
  };
  departments?: DepartmentData[];
  topCommunes?: CommuneData[];
}

export interface DepartmentData {
  name: string;
  percentage: number;
  color: string;
}

export interface CommuneData {
  name: string;
  tonnage: number;
}

const regionData: Record<RegionType, RegionData> = {
  languedoc: {
    id: 'languedoc',
    name: 'Languedoc-Roussillon',
    vineyardSurface: 245000,
    annualPomace: 266000,
    safPotential: 22400000, // 22.4M liters (realistic)
    revenue: 27.3, // €27.3M (realistic)
    co2Reduction: 61600, // 61,600 tonnes (realistic)
    jobs: 180,
    wasteAllocation: {
      total: 266000,
      protected: 120000, // 45%
      negotiable: 66000, // 25%
      available: 80000, // 30%
      realisticSafPotential: 22400000,
      realisticRevenue: 27.3,
      realisticCo2Reduction: 61600,
      realisticJobs: 180
    },
    departments: [
      { name: 'Hérault', percentage: 39, color: 'wine-burgundy' },
      { name: 'Aude', percentage: 29, color: 'wine-gold' },
      { name: 'Gard', percentage: 26, color: 'wine-green' },
      { name: 'Pyrénées-Orientales', percentage: 6, color: 'wine-charcoal' }
    ],
    topCommunes: [
      { name: 'Vieussan', tonnage: 13300 },
      { name: 'Saint-Thibéry', tonnage: 7980 },
      { name: 'Trausse', tonnage: 6650 },
      { name: 'Béziers', tonnage: 5320 },
      { name: 'Montpellier', tonnage: 3990 },
      { name: 'Narbonne', tonnage: 3990 }
    ]
  },
  champagne: {
    id: 'champagne',
    name: 'Champagne',
    vineyardSurface: 34000,
    annualPomace: 24000,
    safPotential: 2000000, // 2.0M liters (realistic)
    revenue: 2.4, // €2.4M (realistic)
    co2Reduction: 5500, // 5,500 tonnes (realistic)
    jobs: 45, // Scaled appropriately
    wasteAllocation: {
      total: 24000,
      protected: 11000, // 45%
      negotiable: 6000, // 25%
      available: 7000, // 30%
      realisticSafPotential: 2000000,
      realisticRevenue: 2.4,
      realisticCo2Reduction: 5500,
      realisticJobs: 45
    },
    departments: [
      { name: 'Marne', percentage: 85, color: 'wine-burgundy' },
      { name: 'Aube', percentage: 15, color: 'wine-gold' }
    ],
    topCommunes: [
      { name: 'Reims', tonnage: 3200 },
      { name: 'Épernay', tonnage: 2800 },
      { name: 'Ay', tonnage: 2400 },
      { name: 'Avize', tonnage: 2100 },
      { name: 'Cramant', tonnage: 1900 },
      { name: 'Bouzy', tonnage: 1600 }
    ]
  }
};

interface RegionContextType {
  activeRegion: RegionType;
  setActiveRegion: (region: RegionType) => void;
  currentData: RegionData;
  allRegions: RegionData[];
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRegion, setActiveRegion] = useState<RegionType>('languedoc');

  const currentData = regionData[activeRegion];
  const allRegions = Object.values(regionData);

  return (
    <RegionContext.Provider value={{
      activeRegion,
      setActiveRegion,
      currentData,
      allRegions
    }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};
