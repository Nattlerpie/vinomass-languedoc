import vineyardBg from "@/assets/vineyard-bg.jpg";
import { ChevronDown, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const regions = [
  { name: "Languedoc-Roussillon", active: true, tonnage: 266000, revenue: 90.9 },
  { name: "Bordeaux", active: false, tonnage: 180000, revenue: 61.5 },
  { name: "Burgundy", active: false, tonnage: 45000, revenue: 15.4 },
  { name: "Loire Valley", active: false, tonnage: 85000, revenue: 29.1 }
];

const DashboardHeader = () => {
  const activeRegion = regions.find(r => r.active)?.name || "Languedoc-Roussillon";

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
                Français
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-wine-cream/20 shadow-elegant z-50">
              <DropdownMenuItem className="transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-3">
                <Globe size={14} className="mr-2" />
                <span className="font-medium">Français</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-3">
                <Globe size={14} className="mr-2" />
                <span className="font-medium">English</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-3">
                <Globe size={14} className="mr-2" />
                <span className="font-medium">Español</span>
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
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-wine-cream/20 shadow-elegant z-50 w-80">
              {regions.map((region) => (
                <DropdownMenuItem 
                  key={region.name}
                  className={`transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer p-4 ${
                    region.active ? 'bg-wine-burgundy/5 text-wine-burgundy font-medium' : 'text-wine-charcoal'
                  }`}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex items-center mb-1">
                      <MapPin size={14} className="mr-2 opacity-60" />
                      <span className="font-medium">{region.name}</span>
                      {!region.active && <span className="ml-auto text-xs text-muted-foreground">(Bientôt)</span>}
                    </div>
                    <div className="flex justify-between text-xs text-wine-charcoal/70 ml-5">
                      <span>{region.tonnage.toLocaleString('fr-FR')}t pomace</span>
                      <span className="font-semibold text-wine-gold">€{region.revenue}M ROI</span>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-wine-cream mb-6 tracking-tight animate-fade-in">
          Atlas Biomasse Vitivinicole
        </h1>
        <div className="w-32 h-1 bg-gradient-gold mx-auto mb-6 rounded-full animate-scale-in" />
        <p className="text-2xl md:text-3xl text-wine-cream/95 font-light tracking-wide mb-3 animate-fade-in">
          {activeRegion}
        </p>
        <p className="text-base text-wine-cream/80 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Tableau de bord des ressources biomasse du secteur vitivinicole
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;