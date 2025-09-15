// Regional data for SAF production analysis
// Source: IFV, ADEME, Sustavino research compilation

export const REGION_DATA = {
  languedoc: {
    id: 'languedoc',
    name: 'Languedoc-Roussillon',
    
    // Core Production Metrics
    vineyardSurface: 245000, // hectares
    totalBiomass: 266000, // tonnes total marc production
    availableBiomass: 80000, // tonnes (30% allocation)
    safProduction: 22400000, // liters/year (22.4M)
    revenue: 27.3, // millions EUR
    co2Reduction: 61600, // tonnes CO2/year
    employment: 180, // direct jobs
    
    // Regional Market Position
    nationalProductionShare: 38, // % of French wine production
    wineIndustryRevenue: 3.2, // billions EUR
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
    
    // Waste Allocation Hierarchy (tonnes)
    wasteAllocation: {
      fluxProteges: 120000, // 45%
      fluxNegociables: 66000, // 25%
      fluxDisponibles: 80000, // 30%
      percentageAvailable: 30,
      percentageNegotiable: 25,
      percentageProtected: 45
    },
    
    // Departmental Breakdown
    departments: [
      { name: 'Hérault', percentage: 39, production: 103740 },
      { name: 'Aude', percentage: 29, production: 77140 },
      { name: 'Gard', percentage: 26, production: 69160 },
      { name: 'Pyrénées-Orientales', percentage: 6, production: 15960 }
    ],
    
    // Top Producing Communes
    communes: [
      { name: 'Vieussan', production: 13300, percentage: 5.0 },
      { name: 'Saint-Thibéry', production: 7980, percentage: 3.0 },
      { name: 'Trausse', production: 6650, percentage: 2.5 },
      { name: 'Béziers', production: 5320, percentage: 2.0 },
      { name: 'Montpellier', production: 3990, percentage: 1.5 },
      { name: 'Narbonne', production: 3990, percentage: 1.5 }
    ]
  },
  
  champagne: {
    id: 'champagne',
    name: 'Champagne',
    
    // Core Production Metrics
    vineyardSurface: 34000, // hectares
    totalBiomass: 24000, // tonnes total marc production
    availableBiomass: 7000, // tonnes (30% allocation)
    safProduction: 2000000, // liters/year (2.0M)
    revenue: 2.4, // millions EUR
    co2Reduction: 5500, // tonnes CO2/year
    employment: 45, // direct jobs
    
    // Regional Market Position
    nationalProductionShare: 3, // % of French wine production
    wineIndustryRevenue: 5.2, // billions EUR
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
    
    // Waste Allocation Hierarchy (tonnes)
    wasteAllocation: {
      fluxProteges: 11000, // 45%
      fluxNegociables: 6000, // 25%
      fluxDisponibles: 7000, // 30%
      percentageAvailable: 30,
      percentageNegotiable: 25,
      percentageProtected: 45
    },
    
    // Departmental Breakdown (Champagne is primarily Marne)
    departments: [
      { name: 'Marne', percentage: 85, production: 20400 },
      { name: 'Aube', percentage: 15, production: 3600 }
    ],
    
    // Top Producing Communes
    communes: [
      { name: 'Reims', production: 3200, percentage: 13.3 },
      { name: 'Épernay', production: 2800, percentage: 11.7 },
      { name: 'Ay', production: 2400, percentage: 10.0 },
      { name: 'Avize', production: 2100, percentage: 8.8 },
      { name: 'Cramant', production: 1900, percentage: 7.9 },
      { name: 'Bouzy', production: 1600, percentage: 6.7 }
    ]
  }
};

// Calculation formulas for validation
export const CALCULATION_FORMULAS = {
  safProduction: (availableBiomass) => availableBiomass * 280 * 0.7, // tonnes * L/tonne * efficiency
  revenue: (safLiters) => (safLiters / 1000000) * 1.22, // ML * €1.22/L
  co2Reduction: (safLiters) => (safLiters / 1000000) * 2.75, // ML * 2.75 tonnes CO2/ML
  employment: (availableBiomass) => Math.round(availableBiomass / 444) // industry standard ratio
};

// Export helper function to get region data
export const getRegionData = (regionId) => {
  return REGION_DATA[regionId] || REGION_DATA.languedoc;
};
