import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useRegion } from "@/contexts/RegionContext";

interface ValidationError {
  component: string;
  field: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkLatency: number;
}

const ErrorHandling = () => {
  const { toast } = useToast();
  const { currentData } = useRegion();
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Real data validation rules for SAF calculations
  const validateData = () => {
    const validationErrors: ValidationError[] = [];

    // Validate core SAF data
    const biomassVolume = currentData.annualPomace; // tonnes
    const conversionRate = 280; // L/tonne
    const efficiency = 0.70; // 70%
    const safPrice = 1.22; // €/L

    if (biomassVolume < 200000 || biomassVolume > 350000) {
      validationErrors.push({
        component: 'BiomassCalculation',
        field: 'volume',
        message: 'Volume biomasse hors plage réaliste (200-350k tonnes)',
        severity: 'high'
      });
    }

    if (conversionRate < 250 || conversionRate > 300) {
      validationErrors.push({
        component: 'ConversionRate',
        field: 'rate',
        message: 'Taux conversion SAF anormal (250-300L/tonne)',
        severity: 'medium'
      });
    }

    if (efficiency < 0.6 || efficiency > 0.8) {
      validationErrors.push({
        component: 'ProcessEfficiency',
        field: 'efficiency',
        message: 'Efficacité procédé ATJ hors normes (60-80%)',
        severity: 'high'
      });
    }

    if (safPrice < 1.0 || safPrice > 2.0) {
      validationErrors.push({
        component: 'PricingModel',
        field: 'safPrice',
        message: 'Prix SAF aberrant - vérifier source marché',
        severity: 'critical'
      });
    }

    // Validate financial calculations
    const annualRevenue = biomassVolume * conversionRate * efficiency * safPrice / 1000000;
    const expectedRevenue = currentData.revenue; // €M

    if (Math.abs(annualRevenue - expectedRevenue) > 5) {
      validationErrors.push({
        component: 'RevenueCalculation',
        field: 'annualRevenue',
        message: `Revenus calculés (${annualRevenue.toFixed(1)}M€) vs attendus (${expectedRevenue}M€)`,
        severity: 'critical'
      });
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  // Performance monitoring
  const measurePerformance = () => {
    if ('performance' in window && window.performance.getEntriesByType) {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintTiming = window.performance.getEntriesByType('paint');
      
      setPerformance({
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        renderTime: paintTiming.length > 0 ? paintTiming[0].startTime : 0,
        memoryUsage: (window.performance as any).memory?.usedJSHeapSize || 0,
        networkLatency: navigation.responseStart - navigation.requestStart
      });
    }
  };

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connexion rétablie",
        description: "Synchronisation des données en cours...",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Connexion perdue",
        description: "Mode hors ligne activé. Données en cache disponibles.",
        variant: "destructive"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial validation and performance check
    validateData();
    measurePerformance();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    
    setTimeout(() => {
      const isValid = validateData();
      measurePerformance();
      
      if (isValid) {
        toast({
          title: "Validation réussie",
          description: "Toutes les données sont cohérentes.",
        });
      }
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-yellow-200 bg-yellow-50';
      case 'medium': return 'border-orange-200 bg-orange-50';
      case 'high': return 'border-red-200 bg-red-50';
      case 'critical': return 'border-red-500 bg-red-100';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="h-4 w-4 text-yellow-600" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-700" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Network Status */}
      <div className="flex items-center justify-between p-3 bg-wine-cream/20 rounded-lg border border-wine-cream/40">
        <div className="flex items-center gap-3">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-wine-green" />
          ) : (
            <WifiOff className="w-4 h-4 text-wine-burgundy" />
          )}
          <span className="text-sm font-medium text-wine-charcoal">
            {isOnline ? 'En ligne' : 'Hors ligne'}
          </span>
        </div>
        
        <Button 
          onClick={handleRetry} 
          variant="outline" 
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Revalider ({retryCount})
        </Button>
      </div>

      {/* Data Validation Errors */}
      {errors.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-wine-charcoal">
            Erreurs de Validation Détectées ({errors.length})
          </h4>
          {errors.map((error, index) => (
            <Alert key={index} className={getSeverityColor(error.severity)}>
              {getSeverityIcon(error.severity)}
              <AlertDescription>
                <div className="font-medium text-wine-charcoal">
                  {error.component} - {error.field}
                </div>
                <div className="text-sm text-wine-charcoal/80 mt-1">
                  {error.message}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Performance Metrics */}
      {performance && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-wine-cream/10 rounded-lg border border-wine-cream/30">
          <div className="text-center">
            <div className="text-lg font-bold text-wine-charcoal">
              {(performance.loadTime / 1000).toFixed(2)}s
            </div>
            <div className="text-xs text-wine-charcoal/70">Temps de chargement</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-wine-charcoal">
              {performance.renderTime.toFixed(0)}ms
            </div>
            <div className="text-xs text-wine-charcoal/70">Temps de rendu</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-wine-charcoal">
              {(performance.memoryUsage / 1024 / 1024).toFixed(1)}MB
            </div>
            <div className="text-xs text-wine-charcoal/70">Mémoire utilisée</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-wine-charcoal">
              {performance.networkLatency.toFixed(0)}ms
            </div>
            <div className="text-xs text-wine-charcoal/70">Latence réseau</div>
          </div>
        </div>
      )}

      {/* Success State */}
      {errors.length === 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            <div className="font-medium text-green-800">
              Validation des données réussie
            </div>
            <div className="text-sm text-green-700 mt-1">
              Toutes les données SAF {currentData.name} sont cohérentes et validées.
              Dernière vérification: {new Date().toLocaleTimeString('fr-FR')}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ErrorHandling;