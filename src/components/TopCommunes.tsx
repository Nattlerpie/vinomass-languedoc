const communes = [
  { name: 'Vieussan', tonnage: 14158 },
  { name: 'Saint-Thibéry', tonnage: 8899 },
  { name: 'Trausse', tonnage: 7984 }
];

const TopCommunes = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
      <h3 className="text-xl font-bold text-wine-charcoal mb-6 text-center">
        Communes les Plus Productrices
      </h3>
      <div className="space-y-4">
        {communes.map((commune, index) => (
          <div
            key={commune.name}
            className="flex items-center justify-between p-4 bg-gradient-subtle rounded-lg border border-wine-cream/30"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-wine-burgundy' : 
                index === 1 ? 'bg-wine-gold' : 'bg-wine-green'
              }`}>
                {index + 1}
              </div>
              <span className="font-semibold text-wine-charcoal">
                {commune.name}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-wine-charcoal">
                {commune.tonnage.toLocaleString('fr-FR')}
              </span>
              <span className="text-sm text-wine-charcoal/70 ml-1">tonnes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCommunes;