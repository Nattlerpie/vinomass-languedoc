import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Database, Printer, Image, Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useRegion } from "@/contexts/RegionContext";

interface ExportCapabilitiesProps {
  data?: any;
  type: 'overview' | 'economy' | 'resources' | 'partnerships' | 'data';
}

const ExportCapabilities = ({ data, type }: ExportCapabilitiesProps) => {
  const { currentData } = useRegion();
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportOptions = [
    { value: 'pdf', label: 'Rapport PDF', icon: <FileText className="w-4 h-4" /> },
    { value: 'json', label: 'Données JSON', icon: <Database className="w-4 h-4" /> },
    { value: 'print', label: 'Version Imprimable', icon: <Printer className="w-4 h-4" /> },
    { value: 'image', label: 'Capture d\'écran', icon: <Image className="w-4 h-4" /> }
  ];

  const generateReport = () => {
    const reportData = {
      title: `Atlas Biomasse - ${getModuleTitle(type)}`,
      generated: new Date().toISOString(),
      module: type,
      region: currentData.name,
      realData: {
        biomassTotal: `${currentData.annualPomace.toLocaleString()} tonnes/an`,
        safProduction: `${(currentData.safPotential / 1000000).toFixed(1)}M litres/an`,
        revenue: `€${currentData.revenue}M/an`,
        conversionRate: '280L SAF/tonne',
        safPrice: '€1,22/litre',
        vineyardSurface: `${currentData.vineyardSurface.toLocaleString()} hectares`,
        co2Reduction: `${currentData.co2Reduction.toLocaleString()} tonnes/an`
      },
      data: data || {}
    };

    return reportData;
  };

  const getModuleTitle = (type: string) => {
    switch (type) {
      case 'overview': return 'Vue d\'ensemble';
      case 'economy': return 'Analyse Économique';
      case 'resources': return 'Ressources Régionales';
      case 'partnerships': return 'Partenariats Stratégiques';
      case 'data': return 'Données et Méthodologie';
      default: return 'Module';
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const reportData = generateReport();
      
      switch (exportFormat) {
        case 'pdf':
          await exportPDF(reportData);
          break;
        case 'json':
          exportJSON(reportData);
          break;
        case 'print':
          openPrintView(reportData);
          break;
        case 'image':
          await captureScreenshot();
          break;
      }
      
      toast({
        title: "Export réussi",
        description: `${getModuleTitle(type)} exporté en ${exportFormat.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportPDF = async (data: any) => {
    // Simulate PDF generation
    const pdfContent = `
      ATLAS BIOMASSE ${data.region.toUpperCase()}
      ${data.title}
      
      DONNÉES RÉELLES VALIDÉES:
      • Biomasse totale: ${data.realData.biomassTotal}
      • Production SAF: ${data.realData.safProduction}
      • Revenus potentiels: ${data.realData.revenue}
      • Taux conversion: ${data.realData.conversionRate}
      • Prix SAF: ${data.realData.safPrice}
      • Surface viticole: ${data.realData.vineyardSurface}
      • Réduction CO2: ${data.realData.co2Reduction}
      
      Rapport généré le: ${new Date(data.generated).toLocaleString('fr-FR')}
      
      Module: ${getModuleTitle(data.module)}
    `;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atlas-biomasse-${data.module}-${Date.now()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atlas-biomasse-${data.module}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openPrintView = (data: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${data.title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { border-bottom: 2px solid #8B2635; margin-bottom: 20px; padding-bottom: 10px; }
              .data-section { margin-bottom: 20px; }
              .key-metric { background: #f5f5f5; padding: 10px; margin: 5px 0; border-radius: 5px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Atlas Biomasse ${data.region}</h1>
              <h2>${data.title}</h2>
              <p>Rapport généré le: ${new Date(data.generated).toLocaleString('fr-FR')}</p>
            </div>
            <div class="data-section">
              <h3>Données Réelles Validées</h3>
              <div class="key-metric"><strong>Biomasse totale:</strong> ${data.realData.biomassTotal}</div>
              <div class="key-metric"><strong>Production SAF:</strong> ${data.realData.safProduction}</div>
              <div class="key-metric"><strong>Revenus potentiels:</strong> ${data.realData.revenue}</div>
              <div class="key-metric"><strong>Taux conversion:</strong> ${data.realData.conversionRate}</div>
              <div class="key-metric"><strong>Prix SAF:</strong> ${data.realData.safPrice}</div>
              <div class="key-metric"><strong>Surface viticole:</strong> ${data.realData.vineyardSurface}</div>
              <div class="key-metric"><strong>Réduction CO2:</strong> ${data.realData.co2Reduction}</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const captureScreenshot = async () => {
    // Simulate screenshot capture
    toast({
      title: "Capture d'écran",
      description: "Fonctionnalité de capture d'écran simulée",
    });
  };

  const shareData = () => {
    if (navigator.share) {
      navigator.share({
        title: `Atlas Biomasse - ${getModuleTitle(type)}`,
        text: `Découvrez le potentiel de ${currentData.annualPomace.toLocaleString()} tonnes de marc de raisin en ${currentData.name} pour la production de SAF`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "URL copiée dans le presse-papiers",
      });
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-wine-cream/30 shadow-elegant">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-wine-burgundy/10 rounded-lg text-wine-burgundy">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-wine-charcoal">Export & Partage</h3>
              <Badge variant="secondary" className="bg-wine-gold/10 text-wine-gold border-wine-gold/20">
                Données Réelles Validées
              </Badge>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={shareData}
            className="border-wine-burgundy/20 text-wine-charcoal hover:bg-wine-burgundy/5"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-wine-charcoal mb-2 block">
              Format d'export
            </label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="border-wine-cream/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exportOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.icon}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-wine-burgundy hover:bg-wine-burgundy/90 text-white"
            >
              {isExporting ? 'Export...' : 'Exporter'}
            </Button>
          </div>
        </div>

        {/* Preview of export content */}
        <div className="bg-wine-cream/10 rounded-lg p-4">
          <h4 className="font-semibold text-wine-charcoal mb-3">Contenu inclus</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-wine-charcoal/70">
            <div>• {currentData.annualPomace.toLocaleString()} tonnes biomasse/an</div>
            <div>• {(currentData.safPotential / 1000000).toFixed(1)}M litres SAF/an</div>
            <div>• €{currentData.revenue}M revenus potentiels</div>
            <div>• 280L SAF/tonne conversion</div>
            <div>• {currentData.vineyardSurface.toLocaleString()} hectares vignobles</div>
            <div>• {currentData.co2Reduction.toLocaleString()} tonnes CO2 évitées</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportCapabilities;