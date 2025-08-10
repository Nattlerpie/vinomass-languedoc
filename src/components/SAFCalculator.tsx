import { useState } from "react";
import { Calculator, TrendingUp, Leaf, Euro } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const SAFCalculator = () => {
  const { t } = useLanguage();
  const [grapePomace, setGrapePomace] = useState<number>(266000);
  const [collectionCost, setCollectionCost] = useState<number>(40);
  const [processingEfficiency, setProcessingEfficiency] = useState<number>(70);
  
  // Calculations using the new formulas
  const safProduction = grapePomace * 280 * (processingEfficiency / 100);
  const potentialRevenue = safProduction * 1.22;
  const co2Reduction = safProduction * 0.0032;
  const collectionCosts = grapePomace * collectionCost;
  
  const handleCalculate = () => {
    // Trigger recalculation (already reactive)
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant hover:shadow-wine transition-all duration-500">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl text-wine-charcoal">
          <Calculator className="text-wine-burgundy" size={28} />
          {t('saf.title')}
        </CardTitle>
        <p className="text-wine-charcoal/70">
          {t('saf.description')}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Input Section */}
        <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="grape-pomace" className="text-base font-semibold text-wine-charcoal mb-2 block">
                {t('saf.grape.pomace')}
              </Label>
              <Input
                id="grape-pomace"
                type="number"
                value={grapePomace}
                onChange={(e) => setGrapePomace(Number(e.target.value))}
                className="text-lg p-3 border-wine-burgundy/30 focus:border-wine-burgundy"
                min="0"
                step="1000"
              />
              <span className="text-sm text-wine-charcoal/70 mt-1 block">tonnes</span>
            </div>
            
            <div>
              <Label htmlFor="collection-cost" className="text-base font-semibold text-wine-charcoal mb-2 block">
                {t('saf.collection.cost')}
              </Label>
              <Input
                id="collection-cost"
                type="number"
                value={collectionCost}
                onChange={(e) => setCollectionCost(Number(e.target.value))}
                className="text-lg p-3 border-wine-burgundy/30 focus:border-wine-burgundy"
                min="0"
                step="5"
              />
              <span className="text-sm text-wine-charcoal/70 mt-1 block">€/tonne</span>
            </div>
            
            <div>
              <Label htmlFor="efficiency" className="text-base font-semibold text-wine-charcoal mb-2 block">
                {t('saf.processing.efficiency')}
              </Label>
              <Input
                id="efficiency"
                type="number"
                value={processingEfficiency}
                onChange={(e) => setProcessingEfficiency(Number(e.target.value))}
                className="text-lg p-3 border-wine-burgundy/30 focus:border-wine-burgundy"
                min="0"
                max="100"
                step="5"
              />
              <span className="text-sm text-wine-charcoal/70 mt-1 block">%</span>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-wine-burgundy/5 to-wine-burgundy/10 rounded-xl border border-wine-burgundy/20">
            <TrendingUp className="text-wine-burgundy mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-wine-burgundy mb-2">
              {(safProduction / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}M
            </div>
            <div className="text-sm text-wine-charcoal/70">{t('saf.production')}</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-wine-gold/5 to-wine-gold/10 rounded-xl border border-wine-gold/20">
            <Euro className="text-wine-gold mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-wine-gold mb-2">
              €{(potentialRevenue / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}M
            </div>
            <div className="text-sm text-wine-charcoal/70">{t('saf.revenue')}</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-wine-green/5 to-wine-green/10 rounded-xl border border-wine-green/20">
            <Leaf className="text-wine-green mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-wine-green mb-2">
              {(co2Reduction / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}k
            </div>
            <div className="text-sm text-wine-charcoal/70">{t('saf.co2.reduction')}</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-wine-charcoal/5 to-wine-charcoal/10 rounded-xl border border-wine-charcoal/20">
            <Calculator className="text-wine-charcoal mx-auto mb-3" size={32} />
            <div className="text-3xl font-bold text-wine-charcoal mb-2">
              €{(collectionCosts / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}M
            </div>
            <div className="text-sm text-wine-charcoal/70">{t('saf.collection.costs')}</div>
          </div>
        </div>

        {/* Market Context Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 p-4 rounded-xl border border-wine-burgundy/20">
            <h5 className="font-bold text-wine-burgundy text-sm mb-2">{t('saf.eu.mandate')}</h5>
            <div className="text-xs text-wine-charcoal/80">
              <div className="flex justify-between mb-1">
                <span>2025:</span>
                <span className="font-semibold">2%</span>
              </div>
              <div className="flex justify-between">
                <span>2050:</span>
                <span className="font-semibold">70%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-wine-gold/10 to-wine-gold/5 p-4 rounded-xl border border-wine-gold/20">
            <h5 className="font-bold text-wine-gold text-sm mb-2">{t('saf.current.supply')}</h5>
            <div className="text-xl font-bold text-wine-charcoal mb-1">0.53%</div>
            <div className="text-xs text-wine-charcoal/70">de la demande actuelle</div>
          </div>
          
          <div className="bg-gradient-to-br from-wine-green/10 to-wine-green/5 p-4 rounded-xl border border-wine-green/20">
            <h5 className="font-bold text-wine-green text-sm mb-2">{t('saf.atj.market')}</h5>
            <div className="text-xl font-bold text-wine-charcoal mb-1">8%</div>
            <div className="text-xs text-wine-charcoal/70">capacité annoncée 2030</div>
          </div>
          
          <div className="bg-gradient-to-br from-wine-charcoal/10 to-wine-charcoal/5 p-4 rounded-xl border border-wine-charcoal/20">
            <h5 className="font-bold text-wine-charcoal text-sm mb-2">{t('saf.price.premium')}</h5>
            <div className="text-xs text-wine-charcoal/80">
              <div className="flex justify-between mb-1">
                <span>SAF:</span>
                <span className="font-semibold">€1.22/L</span>
              </div>
              <div className="flex justify-between">
                <span>Kérosène:</span>
                <span className="font-semibold">€0.45/L</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-wine-charcoal/60 bg-wine-cream/20 p-3 rounded">
          <strong>Note:</strong> {t('saf.note')}
        </div>
      </CardContent>
    </Card>
  );
};

export default SAFCalculator;