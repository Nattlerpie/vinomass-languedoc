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
    safPotential: 22400000, // Updated to realistic 22.4M liters
    revenue: 27.0, // Updated to realistic €27M 
    co2Reduction: 200000, // Updated to reflect 80,000t available
    jobs: 180, // Updated to realistic figure for 80,000t
    wasteAllocation: {
      total: 266000,
      protected: 120000, // 45%
      negotiable: 66000, // 25%
      available: 80000, // 30%
      realisticSafPotential: 22400000, // 22.4M liters
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
      { name: 'Vieussan', tonnage: 13300 }, // 5% of 266,000t
      { name: 'Saint-Thibéry', tonnage: 7980 }, // 3% of 266,000t
      { name: 'Trausse', tonnage: 6650 }, // 2.5% of 266,000t
      { name: 'Béziers', tonnage: 5320 }, // 2% of 266,000t
      { name: 'Montpellier', tonnage: 3990 }, // 1.5% of 266,000t
      { name: 'Narbonne', tonnage: 3990 } // 1.5% of 266,000t
    ]
  },
  champagne: {
    id: 'champagne',
    name: 'Champagne',
    vineyardSurface: 34000,
    annualPomace: 24000,
    safPotential: 6700000,
    revenue: 8.2,
    co2Reduction: 18400,
    jobs: 150, // Updated from 85 to reflect regional context
    departments: [
      { name: 'Marne', percentage: 85, color: 'wine-burgundy' }, // Updated from 64% to 85%
      { name: 'Aube', percentage: 15, color: 'wine-gold' } // Updated from 23% to 15%, removed other departments
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