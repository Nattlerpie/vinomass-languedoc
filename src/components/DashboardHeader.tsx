import vineyardBg from "@/assets/vineyard-bg.jpg";
import { ChevronDown, MapPin, Globe, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

const regions = [
  { name: "Languedoc-Roussillon", active: true, production: "12M hl", safPotential: "€84M", tonnage: 266000, revenue: 90.9 },
  { name: "Bordeaux+Sud-Ouest", active: false, production: "8M hl", safPotential: "€56M", tonnage: 180000, revenue: 61.5 },
  { name: "Sud-Est/Provence+Rhône", active: false, production: "6M hl", safPotential: "€42M", tonnage: 135000, revenue: 46.2 },
  { name: "Loire Valley", active: false, production: "4M hl", safPotential: "€28M", tonnage: 85000, revenue: 29.1 },
  { name: "Champagne", active: false, production: "3.5M hl", safPotential: "€24.5M", tonnage: 72000, revenue: 24.5 },
  { name: "Burgundy-Beaujolais", active: false, production: "2M hl", safPotential: "€14M", tonnage: 45000, revenue: 15.4 }
];

const DashboardHeader = () => {
  const { language, setLanguage, t } = useLanguage();
  const activeRegion = regions.find(r => r.active)?.name || "Languedoc-Roussillon";
  
  const getLanguageLabel = (lang: string) => {
    switch(lang) {
      case 'fr': return 'Français';
      case 'en': return 'English';
      case 'es': return 'Español';
      default: return 'Français';
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${vineyardBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-wine opacity-85" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-6 py-16 text-center">
        {/* Top Controls */}
        <div className="flex justify-center items-center gap-6 mb-8">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-wine-cream hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Globe size={16} className="mr-2" />
                {getLanguageLabel(language)}
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-wine-cream/20 shadow-elegant z-50">
              <DropdownMenuItem 
                className="transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-3"
                onClick={() => setLanguage('fr')}
              >
                <Globe size={14} className="mr-2" />
                <span className="font-medium">{t('language.french')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-3"
                onClick={() => setLanguage('en')}
              >
                <Globe size={14} className="mr-2" />
                <span className="font-medium">{t('language.english')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-3"
                onClick={() => setLanguage('es')}
              >
                <Globe size={14} className="mr-2" />
                <span className="font-medium">{t('language.spanish')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Region Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-wine-cream hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <MapPin size={16} className="mr-2" />
                {activeRegion}
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-wine-cream/20 shadow-elegant z-50 w-96">
              {regions.map((region) => (
                <DropdownMenuItem 
                  key={region.name}
                  className={`transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-4 ${
                    region.active ? 'bg-wine-burgundy/5 text-wine-burgundy font-medium' : 'text-wine-charcoal'
                  }`}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex items-center mb-2">
                      <MapPin size={14} className="mr-2 opacity-60" />
                      <span className="font-medium">{region.name}</span>
                      {!region.active && <span className="ml-auto text-xs text-muted-foreground">{t('region.coming.soon')}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-wine-charcoal/70 ml-5">
                      <div className="flex items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center cursor-help">
                              <span>{region.production} production</span>
                              <HelpCircle size={10} className="ml-1 opacity-50" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">{t('tooltip.source')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center cursor-help">
                              <span className="font-semibold text-wine-gold">{region.safPotential} SAF</span>
                              <HelpCircle size={10} className="ml-1 opacity-50" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">{t('tooltip.source')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-wine-cream mb-6 tracking-tight animate-fade-in">
          {t('atlas.title')}
        </h1>
        <div className="w-32 h-1 bg-gradient-gold mx-auto mb-6 rounded-full animate-scale-in" />
        <p className="text-2xl md:text-3xl text-wine-cream/95 font-light tracking-wide mb-3 animate-fade-in">
          {activeRegion}
        </p>
        <p className="text-base text-wine-cream/80 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          {t('region.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;