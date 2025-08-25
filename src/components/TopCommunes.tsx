import RegionalMap from './RegionalMap';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const communes = [
  { name: 'Vieussan', tonnage: 14158 },
  { name: 'Saint-Thibéry', tonnage: 8899 },
  { name: 'Trausse', tonnage: 7984 }
];

const TopCommunes = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant border border-wine-cream/30 hover:shadow-wine transition-all duration-500">
        <h3 className="text-xl font-bold text-wine-charcoal mb-6 text-center text-shadow">
          {t('communes.title')}
        </h3>
        <div className="space-y-4">
          {communes.map((commune, index) => (
            <div
              key={commune.name}
              className="flex items-center justify-between p-4 bg-gradient-subtle rounded-xl border border-wine-cream/40 hover:border-wine-burgundy/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110 ${
                  index === 0 ? 'bg-wine-burgundy shadow-wine' : 
                  index === 1 ? 'bg-wine-gold shadow-elegant' : 'bg-wine-green shadow-elegant'
                }`}>
                  {index + 1}
                </div>
                <span className="font-semibold text-wine-charcoal">
                  {commune.name}
                </span>
              </div>
              <div className="text-right">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center cursor-help">
                      <span className="text-xl font-bold text-wine-charcoal group-hover:text-wine-burgundy transition-colors duration-300">
                        {commune.tonnage.toLocaleString('fr-FR')}
                      </span>
                      <span className="text-sm text-wine-charcoal/70 ml-2">{t('communes.tonnes')}</span>
                      <HelpCircle size={12} className="ml-1 opacity-50" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{t('tooltip.source')}</p>
                  </TooltipContent>
                </Tooltip>
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