import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  variant?: "burgundy" | "gold" | "green" | "charcoal";
  className?: string;
}

const StatCard = ({ title, value, unit, variant = "burgundy", className }: StatCardProps) => {
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
      "transition-all duration-300 hover:scale-[1.02] border-2",
      variants[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <span className={cn("text-3xl font-bold", valueColors[variant])}>
              {value}
            </span>
            <span className="text-lg text-muted-foreground font-medium">
              {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;