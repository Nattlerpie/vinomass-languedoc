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
    safPotential: 74500000,
    revenue: 90.9,
    co2Reduction: 238400,
    jobs: 600,
    departments: [
      { name: 'Hérault', percentage: 39, color: 'wine-burgundy' },
      { name: 'Aude', percentage: 29, color: 'wine-gold' },
      { name: 'Gard', percentage: 26, color: 'wine-green' },
      { name: 'Pyrénées-Orientales', percentage: 6, color: 'wine-charcoal' }
    ],
    topCommunes: [
      { name: 'Vieussan', tonnage: 14158 },
      { name: 'Saint-Thibéry', tonnage: 8899 },
      { name: 'Trausse', tonnage: 7984 }
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