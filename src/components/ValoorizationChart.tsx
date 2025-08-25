import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";

const ValoorizationChart = () => {
  const { t } = useLanguage();
  
  const data = [
    { name: t('valorization.distillation'), value: 45, color: 'hsl(var(--wine-burgundy))' },
    { name: t('valorization.composting'), value: 25, color: 'hsl(var(--wine-gold))' },
    { name: t('valorization.methanization'), value: 20, color: 'hsl(var(--wine-green))' },
    { name: t('valorization.direct.spreading'), value: 10, color: 'hsl(var(--wine-charcoal))' }
  ];
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30">
      <h3 className="text-xl font-bold text-wine-charcoal mb-6 text-center">
        {t('valorization.title')}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value}%`, t('valorization.percentage')]}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid hsl(var(--wine-charcoal))',
              borderRadius: '8px'
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ValoorizationChart;