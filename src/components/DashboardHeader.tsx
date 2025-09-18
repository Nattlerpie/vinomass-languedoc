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
import { useRegion } from "@/contexts/RegionContext";

const upcomingRegions = [
  { name: "Bordeaux+Sud-Ouest", production: "8M hl", safPotential: "€56M" },
  { name: "Sud-Est/Provence+Rhône", production: "6M hl", safPotential: "€42M" },
  { name: "Loire Valley", production: "4M hl", safPotential: "€28M" },
  { name: "Burgundy-Beaujolais", production: "2M hl", safPotential: "€14M" }
];

const DashboardHeader = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currentData, allRegions, activeRegion, setActiveRegion } = useRegion();
  
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
          {/* Region Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-wine-cream hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <MapPin size={16} className="mr-2" />
                {currentData.name}
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-wine-cream/20 shadow-elegant z-50 w-96">
              {/* Active Regions */}
              {allRegions.map((region) => (
                <DropdownMenuItem 
                  key={region.id}
                  className={`transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-4 ${
                    region.id === activeRegion ? 'bg-wine-burgundy/5 text-wine-burgundy font-medium' : 'text-wine-charcoal'
                  }`}
                  onClick={() => setActiveRegion(region.id)}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex items-center mb-2">
                      <MapPin size={14} className="mr-2 opacity-60" />
                      <span className="font-medium">{region.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-wine-charcoal/70 ml-5">
                      <div className="flex items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center cursor-help">
                              <span>{region.annualPomace?.toLocaleString() || 'N/A'}t production</span>
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
                              <span className="font-semibold text-wine-gold">€{region.revenue}M SAF</span>
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
              
              {/* Coming Soon Regions */}
              {upcomingRegions.map((region) => (
                <DropdownMenuItem 
                  key={region.name}
                  className="transition-all duration-200 text-wine-charcoal/50 cursor-not-allowed p-4"
                >
                  <div className="flex flex-col w-full">
                    <div className="flex items-center mb-2">
                      <MapPin size={14} className="mr-2 opacity-60" />
                      <span className="font-medium">{region.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{t('region.coming.soon')}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-wine-charcoal/50 ml-5">
                      <div className="flex items-center">
                        <span>{region.production} production</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold text-wine-gold/50">{region.safPotential} SAF</span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                className={`transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-3 ${
                  language === 'fr' ? 'bg-wine-burgundy/5 text-wine-burgundy font-medium' : 'text-wine-charcoal'
                }`}
                onClick={() => setLanguage('fr')}
              >
                <Globe size={14} className="mr-2 opacity-60" />
                Français
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-3 ${
                  language === 'en' ? 'bg-wine-burgundy/5 text-wine-burgundy font-medium' : 'text-wine-charcoal'
                }`}
                onClick={() => setLanguage('en')}
              >
                <Globe size={14} className="mr-2 opacity-60" />
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-wine-cream mb-6 tracking-tight animate-fade-in">
          {t('atlas.title')}
        </h1>
        <div className="w-32 h-1 bg-gradient-gold mx-auto mb-6 rounded-full animate-scale-in" />
        <p className="text-2xl md:text-3xl text-wine-cream/95 font-light tracking-wide mb-3 animate-fade-in">
          {currentData.name}
        </p>
        <p className="text-base text-wine-cream/80 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          {t('region.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
