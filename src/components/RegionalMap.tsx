const departments = [
  { name: 'Hérault', percentage: 39, color: 'wine-burgundy' },
  { name: 'Aude', percentage: 29, color: 'wine-gold' },
  { name: 'Gard', percentage: 26, color: 'wine-green' },
  { name: 'Pyrénées-Orientales', percentage: 6, color: 'wine-charcoal' }
];

const RegionalMap = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
      <h3 className="text-xl font-bold text-wine-charcoal mb-4 text-center">
        Répartition Départementale de la Production
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className={`p-4 rounded-lg border-2 border-${dept.color}/20 bg-gradient-to-br from-${dept.color}/5 to-${dept.color}/10 hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="text-center space-y-2">
              <div className={`w-12 h-12 rounded-full bg-${dept.color}/20 flex items-center justify-center mx-auto`}>
                <div className={`w-6 h-6 rounded-full bg-${dept.color}`} />
              </div>
              <h4 className="font-semibold text-wine-charcoal">
                {dept.name}
              </h4>
              <div className={`text-2xl font-bold text-${dept.color}`}>
                {dept.percentage}%
              </div>
              <div className="text-sm text-wine-charcoal/70">
                de la production régionale
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionalMap;