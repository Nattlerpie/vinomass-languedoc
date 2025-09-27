import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const ValoorizationChart = () => {
  const { t, debugMode: langDebugMode } = useLanguage();
  const { currentData, debugMode } = useRegion();
  
  // FIXED: Using correct translation keys that match JSON files (valorisation not valorization)
  const data = [
    { 
      name: t('valorisation.distillation'), 
      value: 45, 
      color: '#722F37', // wine-burgundy
      description: t('valorisation.distillation.desc')
    },
    { 
      name: t('valorisation.composting'), 
      value: 25, 
      color: '#B8860B', // wine-gold
      description: t('valorisation.composting.desc')
    },
    { 
      name: t('valorisation.methanization'), 
      value: 20, 
      color: '#2D5A27', // wine-green
      description: t('valorisation.methanization.desc')
    },
    { 
      name: t('valorisation.direct.spreading'), 
      value: 10, 
      color: '#1C1C1C', // wine-charcoal
      description: t('valorisation.spreading.desc')
    }
  ];

  // Calculate actual tonnages based on regional data
  const totalBiomass = currentData.annualPomace;
  const calculateTonnage = (percentage: number) => Math.round((totalBiomass * percentage) / 100);

  // Get biomass allocation data
  const availableBiomass = currentData.wasteAllocation.available;
  const negotiableBiomass = currentData.wasteAllocation.negotiable;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const tonnage = calculateTonnage(data.value);
      
      return (
        <div className="bg-white p-4 border border-wine-charcoal rounded-lg shadow-lg">
          <p className="font-semibold text-wine-charcoal">{data.name}</p>
          <p className="text-wine-charcoal/70">{data.value}% - {tonnage.toLocaleString()} {t('units.tonnes')}</p>
          <p className="text-xs text-wine-charcoal/60 mt-1">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-bold"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30">
      {/* DEBUG BANNER */}
      {(debugMode || langDebugMode) && (
        <div className="bg-orange-100 border border-orange-400 text-orange-700 px-3 py-2 rounded mb-4">
          <strong className="font-bold">📊 ValoorizationChart Debug</strong>
          <div className="text-sm mt-1">
            <div>Region: {currentData.displayName}</div>
            <div>Total Biomass: {totalBiomass?.toLocaleString()} t</div>
            <div>Distillation: {calculateTonnage(45).toLocaleString()} t (45%)</div>
            <div>Data Points: {data.length} valorization methods</div>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-wine-charcoal mb-4">
          {t('valorisation.title')}
        </h2>
        <p className="text-lg text-wine-charcoal/70">
          {t('valorisation.subtitle')} - {currentData.displayName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with Tonnages */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-wine-charcoal mb-4">
            {t('valorisation.breakdown')} ({totalBiomass?.toLocaleString()} {t('units.tonnes')} {t('tonnage.total')})
          </h3>
          
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 bg-gradient-subtle rounded-lg border border-wine-cream/30 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full border border-white"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <div className="font-medium text-wine-charcoal">
                    {item.name}
                  </div>
                  <div className="text-xs text-wine-charcoal/60">
                    {item.description}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-wine-charcoal">
                  {item.value}%
                </div>
                <div className="text-sm text-wine-charcoal/70">
                  {calculateTonnage(item.value).toLocaleString()} {t('units.tonnes')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FIXED: Biomass Strategy Context with proper translation keys */}
      <div className="mt-8 p-6 bg-wine-cream/10 border border-wine-gold/20 rounded-xl">
        <h4 className="text-lg font-bold text-wine-charcoal mb-4">{t('strategie.biomasse')}</h4>
        <div className="space-y-3 text-sm text-wine-charcoal/70">
          <div className="flex items-start space-x-2">
            <span className="font-medium text-wine-charcoal">• {t('base.conservative')}:</span>
            <span>30% {t('disponible')} ({(availableBiomass / 1000).toFixed(0)} {t('units.kilotonnes')}) - {t('flux.elimination')}</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium text-wine-charcoal">• {t('potentiel.negociable')}:</span>
            <span>+25% ({(negotiableBiomass / 1000).toFixed(0)} {t('units.kilotonnes')}) - {t('surplus.excedents')}</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium text-wine-charcoal">• {t('total.accessible')}:</span>
            <span>{t('jusqua')} 55% ({((availableBiomass + negotiableBiomass) / 1000).toFixed(0)} {t('units.kilotonnes')}) {t('avec.partenariats')}</span>
          </div>
        </div>
        <p className="text-sm text-wine-charcoal/60 mt-4 italic border-t border-wine-gold/20 pt-3">
          {t('respecte.filieres')}
        </p>
      </div>

      {/* FIXED: Methodology Note with proper translation key */}
      <div className="mt-6 text-center p-4 bg-wine-charcoal/5 rounded-lg">
        <p className="text-xs text-wine-charcoal/60 italic">
          * {t('valorisation.methodology.note')}
        </p>
      </div>
    </div>
  );
};

export default ValoorizationChart;
