import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const ValoorizationChart = () => {
  const { t, debugMode: langDebugMode } = useLanguage();
  const { currentData, debugMode } = useRegion();
  
  // Valorization data - same percentages for both regions but contextualized
  const data = [
    { 
      name: t('valorization.distillation'), 
      value: 45, 
      color: '#722F37', // wine-burgundy
      description: t('valorization.distillation.desc')
    },
    { 
      name: t('valorization.composting'), 
      value: 25, 
      color: '#B8860B', // wine-gold
      description: t('valorization.composting.desc')
    },
    { 
      name: t('valorization.methanization'), 
      value: 20, 
      color: '#2D5A27', // wine-green
      description: t('valorization.methanization.desc')
    },
    { 
      name: t('valorization.direct.spreading'), 
      value: 10, 
      color: '#1C1C1C', // wine-charcoal
      description: t('valorization.spreading.desc')
    }
  ];

  // Calculate actual tonnages based on regional data
  const totalBiomass = currentData.annualPomace;
  const calculateTonnage = (percentage: number) => Math.round((totalBiomass * percentage) / 100);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const tonnage = calculateTonnage(data.value);
      
      return (
        <div className="bg-white p-4 border border-wine-charcoal rounded-lg shadow-lg">
          <p className="font-semibold text-wine-charcoal">{data.name}</p>
          <p className="text-wine-charcoal/70">{data.value}% - {tonnage.toLocaleString()}t</p>
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
            <div>Total Biomass: {totalBiomass?.toLocaleString()}t</div>
            <div>Distillation: {calculateTonnage(45).toLocaleString()}t (45%)</div>
            <div>Data Points: {data.length} valorization methods</div>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-wine-charcoal mb-4">
          {t('valorization.title')}
        </h2>
        <p className="text-lg text-wine-charcoal/70">
          {t('valorization.subtitle')} - {currentData.displayName}
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
            {t('valorization.breakdown')} ({totalBiomass?.toLocaleString()}t {t('tonnes.total')})
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
                  {calculateTonnage(item.value).toLocaleString()}t
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Context */}
      <div className="mt-8 p-6 bg-wine-cream/10 border border-wine-gold/20 rounded-xl">
        <h4 className="font-bold text-wine-charcoal mb-3">
          {t('valorization.regional.context')}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-wine-charcoal/70">
          <div>• <span className="font-medium">{t('valorization.established.chains')}:</span> {t('valorization.mature.infrastructure')}</div>
          <div>• <span className="font-medium">{t('valorization.saf.opportunity')}:</span> 30% {t('valorization.new.allocation')}</div>
          <div>• <span className="font-medium">{t('valorization.compliance')}:</span> {t('valorization.eu.directive')}</div>
          <div>• <span className="font-medium">{t('valorization.economic.impact')}:</span> {currentData.wasteAllocation?.realisticJobs} {t('valorization.jobs.supported')}</div>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-6 text-center p-4 bg-wine-charcoal/5 rounded-lg">
        <p className="text-xs text-wine-charcoal/60 italic">
          * {t('valorization.methodology.note')}
        </p>
      </div>
    </div>
  );
};

export default ValoorizationChart;
