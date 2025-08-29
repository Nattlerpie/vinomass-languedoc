import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Info, TrendingUp, Calculator, Database, CheckCircle } from 'lucide-react';

interface TooltipProps {
  title: string;
  content: string;
  type?: 'info' | 'calculation' | 'data' | 'insight';
  value?: string;
  source?: string;
  children: React.ReactNode;
}

const getTooltipIcon = (type: string) => {
  switch (type) {
    case 'calculation':
      return <Calculator className="w-4 h-4" />;
    case 'data':
      return <Database className="w-4 h-4" />;
    case 'insight':
      return <TrendingUp className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
};

const getTooltipColor = (type: string) => {
  switch (type) {
    case 'calculation':
      return 'text-wine-gold border-wine-gold/20 bg-wine-gold/10';
    case 'data':
      return 'text-wine-green border-wine-green/20 bg-wine-green/10';
    case 'insight':
      return 'text-wine-burgundy border-wine-burgundy/20 bg-wine-burgundy/10';
    default:
      return 'text-wine-charcoal/60 border-wine-charcoal/20 bg-wine-charcoal/5';
  }
};

const InteractiveTooltip = ({ 
  title, 
  content, 
  type = 'info', 
  value, 
  source, 
  children 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          <Card className="w-80 bg-white/95 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-1.5 rounded-lg ${getTooltipColor(type)}`}>
                  {getTooltipIcon(type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-wine-charcoal text-sm mb-1">
                    {title}
                  </h4>
                  {value && (
                    <div className="text-lg font-bold text-wine-burgundy mb-2">
                      {value}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-wine-charcoal/70 leading-relaxed mb-3">
                {content}
              </p>

              {/* Source validation */}
              {source && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-wine-green" />
                  <Badge variant="outline" className="border-wine-green/20 text-wine-green text-xs">
                    {source}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveTooltip;