import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Distillation', value: 45, color: 'hsl(var(--wine-burgundy))' },
  { name: 'Compostage', value: 25, color: 'hsl(var(--wine-gold))' },
  { name: 'Méthanisation', value: 20, color: 'hsl(var(--wine-green))' },
  { name: 'Épandage direct', value: 10, color: 'hsl(var(--wine-charcoal))' }
];

const ValoorizationChart = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
      <h3 className="text-xl font-bold text-wine-charcoal mb-6 text-center">
        Méthodes de Valorisation Actuelles
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
            formatter={(value) => [`${value}%`, 'Pourcentage']}
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