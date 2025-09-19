import { useRegion } from '@/contexts/RegionContext';
import { useLanguage } from '@/contexts/LanguageContext';

const RegionalMap = () => {
  const { currentData, debugMode } = useRegion();
  const { t, debugMode: langDebugMode } = useLanguage();
  
  const departments = currentData.departments || [];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 hover:shadow-wine transition-all duration-500">
      {/* DEBUG BANNER */}
      {(debugMode || langDebugMode) && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded mb-4">
          <strong className="font-bold">🔍 RegionalMap Debug</strong>
          <div className="text-sm mt-1">
            <div>Region: {currentData.displayName} ({currentData.id})</div>
            <div>Departments: {departments.length} loaded</div>
            <div>Data: {departments.map(d => `${d.name} (${d.percentage}%)`).join(', ')}</div>
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center text-shadow">
        {t('repartition.departementale')}
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        {departments.map((dept, index) => (
          <div
            key={dept.name}
            className={`p-6 rounded-xl border-2 border-${dept.color}/20 bg-gradient-to-br from-${dept.color}/5 to-${dept.color}/10 hover:scale-[1.05] transition-all duration-500 hover:shadow-lg group animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center space-y-3">
              <div className={`w-16 h-16 rounded-full bg-${dept.color}/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <div className={`w-8 h-8 rounded-full bg-${dept.color} group-hover:shadow-lg transition-shadow duration-300`} />
              </div>
              <h4 className="font-bold text-wine-charcoal text-lg">
                {dept.name}
              </h4>
              <div className={`text-3xl font-bold text-${dept.color} group-hover:scale-110 transition-transform duration-300`}>
                {dept.percentage}%
              </div>
              <div className="text-base text-wine-charcoal/70">
                {t('production.regionale')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionalMap;
