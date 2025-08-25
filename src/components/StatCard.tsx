import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  variant?: "burgundy" | "gold" | "green" | "charcoal";
  className?: string;
}

const StatCard = ({ title, value, unit, variant = "burgundy", className }: StatCardProps) => {
  const { t } = useLanguage();
  
  const variants = {
    burgundy: "border-wine-burgundy/20 bg-gradient-to-br from-wine-burgundy/5 to-wine-burgundy/10 hover:shadow-wine",
    gold: "border-wine-gold/20 bg-gradient-to-br from-wine-gold/5 to-wine-gold/10 hover:shadow-elegant",
    green: "border-wine-green/20 bg-gradient-to-br from-wine-green/5 to-wine-green/10 hover:shadow-elegant",
    charcoal: "border-wine-charcoal/20 bg-gradient-to-br from-wine-charcoal/5 to-wine-charcoal/10 hover:shadow-elegant"
  };

  const valueColors = {
    burgundy: "text-wine-burgundy",
    gold: "text-wine-gold",
    green: "text-wine-green",
    charcoal: "text-wine-charcoal"
  };

  return (
    <Card className={cn(
      "transition-all duration-500 hover:scale-[1.05] hover:shadow-lg border-2 group animate-fade-in hover-glow",
      variants[variant],
      className
    )}>
      <CardContent className="p-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline space-x-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <span className={cn("text-4xl font-bold transition-colors duration-300 group-hover:scale-110", valueColors[variant])}>
                    {value}
                  </span>
                  <HelpCircle size={16} className="ml-2 opacity-50 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{t('tooltip.source')}</p>
              </TooltipContent>
            </Tooltip>
            <span className="text-xl text-muted-foreground font-medium">
              {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;