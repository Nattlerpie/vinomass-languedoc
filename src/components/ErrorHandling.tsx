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
  const {
    toast
  } = useToast();
  const {
    currentData
  } = useRegion();
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
        description: "Synchronisation des données en cours..."
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
          description: "Toutes les données sont cohérentes."
        });
      }
    }, 1000);
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'border-yellow-200 bg-yellow-50';
      case 'medium':
        return 'border-orange-200 bg-orange-50';
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'critical':
        return 'border-red-500 bg-red-100';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="h-4 w-4 text-yellow-600" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-700" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };
  return (
    <div className="space-y-4">
      {/* Network Status */}
      <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
        {isOnline ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        <span className="text-sm">
          {isOnline ? 'En ligne' : 'Hors ligne'}
        </span>
      </div>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-red-600">
            Erreurs de Validation Détectées ({errors.length})
          </h3>
          {errors.map((error, index) => (
            <Alert key={index} className={getSeverityColor(error.severity)}>
              <div className="flex items-start gap-2">
                {getSeverityIcon(error.severity)}
                <div className="flex-1">
                  <AlertDescription>
                    <strong>{error.component}:</strong> {error.message}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
          <Button onClick={handleRetry} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Revalider ({retryCount})
          </Button>
        </div>
      )}

      {/* Performance Metrics */}
      {performance && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">Performance</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Chargement: {performance.loadTime.toFixed(0)}ms</div>
            <div>Rendu: {performance.renderTime.toFixed(0)}ms</div>
            <div>Mémoire: {(performance.memoryUsage / 1024 / 1024).toFixed(1)}MB</div>
            <div>Latence: {performance.networkLatency.toFixed(0)}ms</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ErrorHandling;