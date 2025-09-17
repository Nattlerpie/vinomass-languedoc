import React from "react";
import BiomassBreakdownChart from "../BiomassBreakdownChart";
import SeasonalTimeline from "../SeasonalTimeline";
import InfrastructureOverview from "../InfrastructureOverview";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, Building2, Leaf, Recycle, TrendingUp, Globe } from "lucide-react";

export default function ResourcesTab() {
  const { currentData } = useRegion();
  const { language } = useLanguage();

  if (!currentData) return null;

  const totalTonnage = currentData.annualPomace;
  const safTonnage = currentData.wasteAllocation?.available || 0;
  const otherTonnage = totalTonnage - safTonnage;
  const safPercentage = Math.round((safTonnage / totalTonnage) * 100);
  const otherPercentage = 100 - safPercentage;
  const safProductionM = Math.round(currentData.safPotential / 100000) / 10; // millions L
  const safRevenueM = currentData.revenue;

  return (
    <div className="p-4 space-y-6 min-h-screen">
      {/* Debug Banner */}
      <div className="p-2 mb-2 bg-yellow-200 text-black font-mono text-sm">
        Debug: <strong>ResourcesTab</strong> mounted. Region = {currentData.name}, Language = {language}
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold">{language === "fr" ? "Ressources Biomasse" : "Biomass Resources"}</h1>
      <p className="text-gray-600">
        {language === "fr"
          ? "Cartographie et analyse des ressources régionales disponibles"
          : "Mapping and analysis of available regional resources"}
      </p>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-wine-burgundy">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">{language === "fr" ? "Biomasse Totale" : "Total Biomass"}</p>
            <p className="text-2xl font-bold text-wine-burgundy">{Math.round(totalTonnage / 1000)}k</p>
            <p className="text-xs text-gray-500">{language === "fr" ? "tonnes/an" : "tons/year"}</p>
            <Leaf className="h-8 w-8 text-wine-burgundy opacity-60 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">{language === "fr" ? "Disponible SAF" : "Available for SAF"}</p>
            <p className="text-2xl font-bold text-green-600">{Math.round(safTonnage / 1000)}k</p>
            <p className="text-xs text-gray-500">{safPercentage}% {language === "fr" ? "du total" : "of total"}</p>
            <Recycle className="h-8 w-8 text-green-500 opacity-60 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-blue-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">{language === "fr" ? "Production SAF" : "SAF Production"}</p>
            <p className="text-2xl font-bold text-blue-600">{safProductionM}M</p>
            <p className="text-xs text-gray-500">{language === "fr" ? "litres/an" : "liters/year"}</p>
            <BarChart3 className="h-8 w-8 text-blue-500 opacity-60 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">{language === "fr" ? "Potentiel Revenus" : "Revenue Potential"}</p>
            <p className="text-2xl font-bold text-purple-600">€{safRevenueM}M</p>
            <p className="text-xs text-gray-500">{language === "fr" ? "estimation" : "estimated"}</p>
            <TrendingUp className="h-8 w-8 text-purple-500 opacity-60 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-wine-burgundy" />
              {language === "fr" ? "Allocation Réaliste des Flux" : "Realistic Flow Allocation"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-green-700 mb-1">
                <span>{language === "fr" ? "Disponible pour SAF" : "Available for SAF"}</span>
                <span>{safTonnage.toLocaleString()} t ({safPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: `${safPercentage}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium text-amber-700 mb-1">
                <span>{language === "fr" ? "Autres Valorisations" : "Other Valorizations"}</span>
                <span>{otherTonnage.toLocaleString()} t ({otherPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div className="bg-amber-500 h-4 rounded-full" style={{ width: `${otherPercentage}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-wine-burgundy" />
              {language === "fr" ? "Méthodologie & Sources" : "Methodology & Sources"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold">{language === "fr" ? "Hiérarchie des Déchets" : "Waste Hierarchy"}</h4>
              <ul className="list-disc pl-5">
                <li>{language === "fr" ? "45% Protégé" : "45% Protected"}</li>
                <li>{language === "fr" ? "25% Négociable" : "25% Negotiable"}</li>
                <li>{language === "fr" ? "30% Disponible" : "30% Available"}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">{language === "fr" ? "Sources Scientifiques" : "Scientific Sources"}</h4>
              <ul className="list-disc pl-5">
                <li>IFV - French Institute of Vine and Wine</li>
                <li>Agreste - Agricultural statistics</li>
                <li>Sustavino - Waste methodology</li>
                <li>ADEME - Environmental data</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Communes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-wine-burgundy" />
            {language === "fr" ? "Principales Communes Productrices" : "Top Producing Communes"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentData.topCommunes && currentData.topCommunes.length > 0 && (
            <div className="space-y-2">
              {currentData.topCommunes.slice(0, 5).map((commune, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="font-medium">{commune.name}</span>
                  <div className="flex items-center gap-2 w-36">
                    <span className="text-gray-600">{commune.tonnage.toLocaleString()} t</span>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-wine-burgundy h-2 rounded-full"
                        style={{ width: `${(commune.tonnage / currentData.topCommunes[0].tonnage) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Biomass Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-wine-burgundy" />
            {language === "fr" ? "Répartition de la Biomasse" : "Biomass Breakdown"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BiomassBreakdownChart />
        </CardContent>
      </Card>

      {/* Seasonal Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-wine-burgundy" />
            {language === "fr" ? "Calendrier Saisonnier" : "Seasonal Timeline"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SeasonalTimeline />
        </CardContent>
      </Card>

      {/* Infrastructure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-wine-burgundy" />
            {language === "fr" ? "Infrastructure Existante" : "Existing Infrastructure"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfrastructureOverview />
        </CardContent>
      </Card>
    </div>
  );
}
