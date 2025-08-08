import { useState } from "react";
import { Calculator, TrendingUp, Leaf, Euro } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SAFCalculator = () => {
  const [wineProduction, setWineProduction] = useState<number>(1000);
  
  // Calculation constants
  const marcPerWineRatio = 0.2; // 20% marc de raisin per wine production
  const safPerMarcRatio = 250; // liters SAF per tonne of marc
  const safPricePerLiter = 2.5; // €2.50 per liter SAF
  const co2ReductionPerLiter = 2.5; // kg CO2 per liter
  const wasteDisposalSavings = 50; // €50 per tonne disposal cost savings
  
  // Calculations
  const marcProduced = wineProduction * marcPerWineRatio;
  const safProduced = marcProduced * safPerMarcRatio;
  const totalRevenue = safProduced * safPricePerLiter;
  const disposalSavings = marcProduced * wasteDisposalSavings;
  const totalBenefit = totalRevenue + disposalSavings;
  const co2Reduction = (safProduced * co2ReductionPerLiter) / 1000; // in tonnes
  
  const handleCalculate = () => {
    // Trigger recalculation (already reactive)
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant hover:shadow-wine transition-all duration-500">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl text-wine-charcoal">
          <Calculator className="text-wine-burgundy" size={28} />
          Calculateur SAF - Outil de Partenariat
        </CardTitle>
        <p className="text-wine-charcoal/70">
          Estimez le potentiel de valorisation de vos sous-produits viticoles
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Input Section */}
        <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
          <Label htmlFor="wine-production" className="text-base font-semibold text-wine-charcoal mb-4 block">
            Volume de production viticole annuel
          </Label>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                id="wine-production"
                type="number"
                value={wineProduction}
                onChange={(e) => setWineProduction(Number(e.target.value))}
                className="text-xl p-4 border-wine-burgundy/30 focus:border-wine-burgundy"
                min="0"
                step="100"
              />
              <span className="text-sm text-wine-charcoal/70 mt-1 block">tonnes de raisin</span>
            </div>
            <Button 
              onClick={handleCalculate}
              className="bg-wine-burgundy hover:bg-wine-burgundy/90 text-white px-8 py-4 text-base"
            >
              Calculer
            </Button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-wine-green/5 to-wine-green/10 rounded-xl border border-wine-green/20">
            <Leaf className="text-wine-green mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-wine-green mb-2">
              {marcProduced.toLocaleString('fr-FR')}
            </div>
            <div className="text-sm text-wine-charcoal/70">tonnes de marc</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-wine-burgundy/5 to-wine-burgundy/10 rounded-xl border border-wine-burgundy/20">
            <TrendingUp className="text-wine-burgundy mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-wine-burgundy mb-2">
              {(safProduced / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })}k
            </div>
            <div className="text-sm text-wine-charcoal/70">litres SAF</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-wine-gold/5 to-wine-gold/10 rounded-xl border border-wine-gold/20">
            <Euro className="text-wine-gold mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-wine-gold mb-2">
              {(totalBenefit / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })}k€
            </div>
            <div className="text-sm text-wine-charcoal/70">bénéfice total</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-wine-charcoal/5 to-wine-charcoal/10 rounded-xl border border-wine-charcoal/20">
            <Leaf className="text-wine-charcoal mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-wine-charcoal mb-2">
              {co2Reduction.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}
            </div>
            <div className="text-sm text-wine-charcoal/70">tonnes CO₂ évitées</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-wine-cream/30 p-6 rounded-xl space-y-4">
          <h4 className="font-semibold text-wine-charcoal text-lg mb-4">Détail des bénéfices économiques</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-wine-charcoal/70">Revenus SAF:</span>
              <span className="font-semibold text-wine-burgundy">
                {totalRevenue.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-wine-charcoal/70">Économies traitement déchets:</span>
              <span className="font-semibold text-wine-green">
                {disposalSavings.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€
              </span>
            </div>
          </div>
          <div className="pt-4 border-t border-wine-cream/50">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-wine-charcoal">Total annuel:</span>
              <span className="text-wine-burgundy">
                {totalBenefit.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€
              </span>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-wine-charcoal/60 bg-wine-cream/20 p-3 rounded">
          <strong>Note:</strong> Estimations basées sur les technologies actuelles et les prix du marché européen SAF 2024
        </div>
      </CardContent>
    </Card>
  );
};

export default SAFCalculator;