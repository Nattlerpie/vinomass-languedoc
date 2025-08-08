import RegionalMap from './RegionalMap';

const communes = [
  { name: 'Vieussan', tonnage: 14158 },
  { name: 'Saint-Thibéry', tonnage: 8899 },
  { name: 'Trausse', tonnage: 7984 }
];

const TopCommunes = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 hover:shadow-wine transition-all duration-500">
        <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center text-shadow">
          Communes les Plus Productrices
        </h3>
        <div className="space-y-6">
          {communes.map((commune, index) => (
            <div
              key={commune.name}
              className="flex items-center justify-between p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40 hover:border-wine-burgundy/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110 ${
                  index === 0 ? 'bg-wine-burgundy shadow-wine' : 
                  index === 1 ? 'bg-wine-gold shadow-elegant' : 'bg-wine-green shadow-elegant'
                }`}>
                  {index + 1}
                </div>
                <span className="font-semibold text-wine-charcoal text-lg">
                  {commune.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-wine-charcoal group-hover:text-wine-burgundy transition-colors duration-300">
                  {commune.tonnage.toLocaleString('fr-FR')}
                </span>
                <span className="text-base text-wine-charcoal/70 ml-2">tonnes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <RegionalMap />
    </div>
  );
};

export default TopCommunes;