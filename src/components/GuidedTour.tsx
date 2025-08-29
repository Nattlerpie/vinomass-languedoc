import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronRight, ChevronLeft, Play, BarChart3, Database, Users, TrendingUp, MapPin } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  icon: React.ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const tourSteps: TourStep[] = [
  {
    id: 'overview',
    title: 'Vue d\'ensemble - Potentiel Biomasse',
    content: 'Découvrez le potentiel de 266 000 tonnes de marc de raisin en Languedoc-Roussillon, générant 74,5M litres de SAF pour €90,9M de revenus annuels.',
    target: 'overview-tab',
    icon: <BarChart3 className="w-5 h-5" />,
    position: 'bottom'
  },
  {
    id: 'resources',
    title: 'Ressources - Cartographie Régionale',
    content: 'Explorez les 245 000 hectares de vignobles et les 1 847 communes viticoles avec leurs capacités de production détaillées.',
    target: 'resources-tab',
    icon: <MapPin className="w-5 h-5" />,
    position: 'bottom'
  },
  {
    id: 'economy',
    title: 'Économie - Modélisation Financière',
    content: 'Analysez la rentabilité avec des calculateurs ROI basés sur les vrais taux de conversion : 280L SAF/tonne à €1,22/L.',
    target: 'economy-tab',
    icon: <TrendingUp className="w-5 h-5" />,
    position: 'bottom'
  },
  {
    id: 'partnerships',
    title: 'Partenariats - Écosystème Collaboratif',
    content: 'Identifiez les opportunités de partenariat avec analyse des distances, capacités et bénéfices mutuels.',
    target: 'partnerships-tab',
    icon: <Users className="w-5 h-5" />,
    position: 'bottom'
  },
  {
    id: 'data',
    title: 'Données - Sources et Méthodologie',
    content: 'Accédez à la documentation technique, références académiques et outils de validation des données.',
    target: 'data-tab',
    icon: <Database className="w-5 h-5" />,
    position: 'bottom'
  }
];

const GuidedTour = ({ isOpen, onClose, activeTab, onTabChange }: GuidedTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && isOpen) {
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < tourSteps.length - 1) {
            const nextStep = prev + 1;
            onTabChange(tourSteps[nextStep].id);
            return nextStep;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [isPlaying, isOpen, onTabChange]);

  if (!isOpen) return null;

  const currentTourStep = tourSteps[currentStep];

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextIndex = currentStep + 1;
      setCurrentStep(nextIndex);
      onTabChange(tourSteps[nextIndex].id);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      setCurrentStep(prevIndex);
      onTabChange(tourSteps[prevIndex].id);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
    onTabChange(tourSteps[index].id);
    setIsPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-wine-burgundy/10 rounded-lg text-wine-burgundy">
                {currentTourStep.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-wine-charcoal">{currentTourStep.title}</h3>
                <Badge variant="secondary" className="bg-wine-gold/10 text-wine-gold border-wine-gold/20">
                  Étape {currentStep + 1} sur {tourSteps.length}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-wine-charcoal/60 hover:text-wine-charcoal hover:bg-wine-burgundy/5"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-wine-cream/50 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-gold h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="mb-8">
            <p className="text-lg text-wine-charcoal/80 leading-relaxed">
              {currentTourStep.content}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentStep 
                    ? 'bg-wine-burgundy' 
                    : index < currentStep 
                      ? 'bg-wine-gold' 
                      : 'bg-wine-cream/50'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-wine-burgundy/20 text-wine-charcoal hover:bg-wine-burgundy/5"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={toggleAutoPlay}
                className={`border-wine-gold/20 text-wine-gold hover:bg-wine-gold/5 ${
                  isPlaying ? 'bg-wine-gold/10' : ''
                }`}
              >
                <Play className={`w-4 h-4 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
                {isPlaying ? 'Pause' : 'Auto'}
              </Button>
              
              <Button
                onClick={currentStep === tourSteps.length - 1 ? onClose : nextStep}
                className="bg-wine-burgundy hover:bg-wine-burgundy/90 text-white"
              >
                {currentStep === tourSteps.length - 1 ? 'Terminer' : 'Suivant'}
                {currentStep !== tourSteps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidedTour;