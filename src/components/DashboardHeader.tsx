import vineyardBg from "@/assets/vineyard-bg.jpg";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const regions = [
  { name: "Languedoc-Roussillon", active: true },
  { name: "Bordeaux", active: false },
  { name: "Bourgogne", active: false },
  { name: "Champagne", active: false },
  { name: "Vallée du Rhône", active: false },
  { name: "Loire", active: false }
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
        {/* Region Selector */}
        <div className="flex justify-center mb-8">
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
            <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-wine-cream/20 shadow-elegant z-50">
              {regions.map((region) => (
                <DropdownMenuItem 
                  key={region.name}
                  className={`transition-all duration-200 hover:bg-wine-burgundy/10 hover:text-wine-burgundy cursor-pointer ${
                    region.active ? 'bg-wine-burgundy/5 text-wine-burgundy font-medium' : 'text-wine-charcoal'
                  }`}
                >
                  <MapPin size={14} className="mr-2 opacity-60" />
                  {region.name}
                  {!region.active && <span className="ml-auto text-xs text-muted-foreground">(Bientôt)</span>}
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