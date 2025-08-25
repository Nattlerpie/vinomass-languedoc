import { Factory, Zap, Recycle, Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const InfrastructureOverview = () => {
  const { t } = useLanguage();
  
  const facilities = [
    { name: t('infrastructure.distilleries'), count: 16, icon: Factory, color: 'text-wine-burgundy' },
    { name: t('infrastructure.methanization'), count: 27, icon: Zap, color: 'text-wine-gold' },
    { name: t('infrastructure.composting'), count: 26, icon: Recycle, color: 'text-wine-green' },
    { name: t('infrastructure.biomass'), count: 4, icon: Flame, color: 'text-wine-charcoal' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-elegant">
      <h3 className="text-xl font-bold text-wine-charcoal mb-6 text-center">
        {t('infrastructure.title')}
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {facilities.map((facility) => {
          const IconComponent = facility.icon;
          return (
            <div key={facility.name} className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-subtle border-2 border-wine-cream/30 flex items-center justify-center">
                  <IconComponent size={32} className={facility.color} />
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${facility.color}`}>
                  {facility.count}
                </div>
                <div className="text-sm text-wine-charcoal/70 font-medium">
                  {facility.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfrastructureOverview;