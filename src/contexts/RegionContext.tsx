import React, { createContext, useContext, useState, ReactNode } from 'react';

export type RegionType = 'languedoc' | 'champagne';

export interface RegionData {
  id: RegionType;
  name: string;
  displayName: string;
  // Core Production Metrics (standardized names)
  vineyardSurface: number; // hectares
  annualPomace: number; // tonnes total marc production
  availableBiomass: number; // tonnes (30% allocation)
  safProduction: number; // liters/year
  revenue: number; // millions EUR
  co2Reduction: number; // tonnes CO2/year
  jobs: number; // direct jobs
  
  // Regional Market Position
  nationalProductionShare: number; // % of French wine production
  wineIndustryRevenue: number; // billions EUR
  ranking: string;
  marketPosition: string;
  volumeDescription: string;
  hectolitres: string;
  
  // Infrastructure Capacity
  infrastructure: {
    distilleries: number;
    methanization: number;
    composting: number;
    biomass: number;
  };
  
  // Waste Allocation Hierarchy (tonnes) - FIXED NAMING
  wasteAllocation: {
    total: number;
    protected: number; // 45%
    negotiable: number; // 25%
    available: number; // 30%
    percentageAvailable: number;
    percentageNegotiable: number;
    percentageProtected: number;
    // Realistic calculations based on available biomass
    realisticSafPotential: number;
    realisticRevenue: number;
    realisticCo2Reduction: number;
    realisticJobs: number;
  };
  
  // Departmental Breakdown - FIXED NAMING
  departments: Array<{
    name: string;
    percentage: number;
    production: number;
    color: string;
  }>;
  
  // Top Producing Communes - FIXED NAMING
  topCommunes: Array<{
    name: string;
    tonnage: number; // Keep as tonnage for consistency with existing components
    percentage: number;
  }>;
}

// CALCULATION FORMULAS for validation and consistency
export const CALCULATION_FORMULAS = {
  safProduction: (availableBiomass: number) => availableBiomass * 280 * 0.7, // tonnes * L/tonne * efficiency
  revenue: (safLiters: number) => (safLiters / 1000000) * 1.22, // ML * €1.22/L
  co2Reduction: (safLiters: number) => (safLiters / 1000000) * 2.5 * 1000, // ML * 2.5kg CO2/L, convert to tonnes
  employment: (availableBiomass: number) => Math.round(availableBiomass / 444) // industry standard ratio
};

// CONSOLIDATED REGION DATA - All data in one place
const regionData: Record<RegionType, RegionData> = {
  languedoc: {
    id: 'languedoc',
    name: 'Languedoc-Roussillon',
    displayName: 'Languedoc-Roussillon',
    
    // Core Production Metrics
    vineyardSurface: 245000,
    annualPomace: 266000,
    availableBiomass: 80000, // 30% of total
    safProduction: 15680000, // Calculated: 80,000 * 280 * 0.7
    revenue: 19.1, // Calculated: 15.68M L * €1.22/L
    co2Reduction: 39200, // Calculated: 15.68ML * 2.5kg/L
    jobs: 180,
    
    // Regional Market Position
    nationalProductionShare: 38,
    wineIndustryRevenue: 3.2,
    ranking: '1er',
    marketPosition: 'Région viticole française',
    volumeDescription: 'En volume de production',
    hectolitres: '12 millions',
    
    // Infrastructure Capacity
    infrastructure: {
      distilleries: 16,
      methanization: 27,
      composting: 26,
      biomass: 4
    },
    
    // Waste Allocation Hierarchy
    wasteAllocation: {
      total: 266000,
      protected: 120000, // 45%
      negotiable: 66000, // 25%
      available: 80000, // 30%
      percentageAvailable: 30,
      percentageNegotiable: 25,
      percentageProtected: 45,
      // Realistic calculations
      realisticSafPotential: 15680000, // 80,000t × 280L/t × 70%
      realisticRevenue: 19.1, // 15.68ML × €1.22/L
      realisticCo2Reduction: 39200, // 15.68ML × 2.5kg/L
      realisticJobs: 180
    },
    
    // Departmental Breakdown
    departments: [
      { name: 'Hérault', percentage: 39, production: 103740, color: 'wine-burgundy' },
      { name: 'Aude', percentage: 29, production: 77140, color: 'wine-gold' },
      { name: 'Gard', percentage: 26, production: 69160, color: 'wine-green' },
      { name: 'Pyrénées-Orientales', percentage: 6, production: 15960, color: 'wine-charcoal' }
    ],
    
    // Top Producing Communes
    topCommunes: [
      { name: 'Vieussan', tonnage: 13300, percentage: 5.0 },
      { name: 'Saint-Thibéry', tonnage: 7980, percentage: 3.0 },
      { name: 'Trausse', tonnage: 6650, percentage: 2.5 },
      { name: 'Béziers', tonnage: 5320, percentage: 2.0 },
      { name: 'Montpellier', tonnage: 3990, percentage: 1.5 },
      { name: 'Narbonne', tonnage: 3990, percentage: 1.5 }
    ]
  },
  
  champagne: {
    id: 'champagne',
    name: 'Champagne',
    displayName: 'Champagne',
    
    // Core Production Metrics
    vineyardSurface: 34000,
    annualPomace: 24000,
    availableBiomass: 7000, // 30% of total (24,000 * 0.3 = 7,200, rounded to 7,000)
    safProduction: 1372000, // Calculated: 7,000 * 280 * 0.7
    revenue: 1.7, // Calculated: 1.372M L * €1.22/L
    co2Reduction: 3430, // Calculated: 1.372ML * 2.5kg/L
    jobs: 45,
    
    // Regional Market Position
    nationalProductionShare: 3,
    wineIndustryRevenue: 5.2,
    ranking: 'Premium',
    marketPosition: 'Région Premium Champagne',
    volumeDescription: 'Marché de prestige',
    hectolitres: '3.5 millions',
    
    // Infrastructure Capacity
    infrastructure: {
      distilleries: 2,
      methanization: 3,
      composting: 4,
      biomass: 1
    },
    
    // Waste Allocation Hierarchy
    wasteAllocation: {
      total: 24000,
      protected: 11000, // 45% (24,000 * 0.45 = 10,800, rounded)
      negotiable: 6000, // 25% (24,000 * 0.25 = 6,000)
      available: 7000, // 30% (24,000 * 0.30 = 7,200, rounded to 7,000)
      percentageAvailable: 30,
      percentageNegotiable: 25,
      percentageProtected: 45,
      // Realistic calculations
      realisticSafPotential: 1372000, // 7,000t × 280L/t × 70%
      realisticRevenue: 1.7, // 1.372ML × €1.22/L
      realisticCo2Reduction: 3430, // 1.372ML × 2.5kg/L
      realisticJobs: 45
    },
    
    // Departmental Breakdown
    departments: [
      { name: 'Marne', percentage: 85, production: 20400, color: 'wine-burgundy' },
      { name: 'Aube', percentage: 15, production: 3600, color: 'wine-gold' }
    ],
    
    // Top Producing Communes
    topCommunes: [
      { name: 'Reims', tonnage: 3200, percentage: 13.3 },
      { name: 'Épernay', tonnage: 2800, percentage: 11.7 },
      { name: 'Ay', tonnage: 2400, percentage: 10.0 },
      { name: 'Avize', tonnage: 2100, percentage: 8.8 },
      { name: 'Cramant', tonnage: 1900, percentage: 7.9 },
      { name: 'Bouzy', tonnage: 1600, percentage: 6.7 }
    ]
  }
};

interface RegionContextType {
  activeRegion: RegionType;
  setActiveRegion: (region: RegionType) => void;
  currentData: RegionData;
  allRegions: RegionData[];
  // Debug helpers
  debugMode: boolean;
  setDebugMode: (enabled: boolean) => void;
  validateData: () => string[];
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRegion, setActiveRegion] = useState<RegionType>('languedoc');
  const [debugMode, setDebugMode] = useState<boolean>(false);

  const currentData = regionData[activeRegion];
  const allRegions = Object.values(regionData);

  // Validation function for debugging
  const validateData = (): string[] => {
    const errors: string[] = [];
    const data = currentData;
    
    // Check if calculations match stored values
    const expectedSaf = CALCULATION_FORMULAS.safProduction(data.availableBiomass);
    const expectedRevenue = CALCULATION_FORMULAS.revenue(expectedSaf);
    const expectedCo2 = CALCULATION_FORMULAS.co2Reduction(expectedSaf);
    
    if (Math.abs(data.safProduction - expectedSaf) > 1000) {
      errors.push(`SAF Production mismatch: stored ${data.safProduction}, calculated ${expectedSaf}`);
    }
    
    if (Math.abs(data.revenue - expectedRevenue) > 0.1) {
      errors.push(`Revenue mismatch: stored ${data.revenue}, calculated ${expectedRevenue.toFixed(1)}`);
    }
    
    if (Math.abs(data.co2Reduction - expectedCo2) > 100) {
      errors.push(`CO2 Reduction mismatch: stored ${data.co2Reduction}, calculated ${expectedCo2}`);
    }
    
    // Check allocation percentages
    const totalAllocation = data.wasteAllocation.protected + data.wasteAllocation.negotiable + data.wasteAllocation.available;
    if (Math.abs(totalAllocation - data.annualPomace) > 1000) {
      errors.push(`Waste allocation total (${totalAllocation}) doesn't match annual pomace (${data.annualPomace})`);
    }
    
    return errors;
  };

  return (
    <RegionContext.Provider value={{
      activeRegion,
      setActiveRegion,
      currentData,
      allRegions,
      debugMode,
      setDebugMode,
      validateData
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

// Export helper function for backward compatibility
export const getRegionData = (regionId: RegionType): RegionData => {
  return regionData[regionId] || regionData.languedoc;
};
