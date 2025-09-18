import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

// simple translation dictionary for Overview page
const translations = {
  en: {
    title: "SAF Languedoc-Roussillon",
    subtitle: "Valorisation of grape marc into sustainable aviation fuel",

    keyPoints: "Key Points",
    keyIndicators: "Essential economic and technical indicators",

    regionalAnalysis: "Regional Analysis",
    distribution: "Territorial distribution and valorisation opportunities",
    productionShare: "Regional Production Share",
    currentUses: "Current Valorisation Methods",
    biomassStrategy: "Biomass Supply Strategy",

    regionalContext: "Regional Context",
    leadership: "National leadership and economic potential",

    safNews: "SAF Sector News",
    regulation: "Regulatory Context",
    footer: "Our project aligns with the national SAF strategy → See Economy tab",
  },
  fr: {
    title: "SAF Languedoc-Roussillon",
    subtitle: "Valorisation du marc de raisin en carburant aviation durable",

    keyPoints: "Points Clés",
    keyIndicators: "Indicateurs économiques et techniques essentiels",

    regionalAnalysis: "Analyse Régionale",
    distribution: "Distribution territoriale et opportunités de valorisation",
    productionShare: "Répartition Départementale de la Production",
    currentUses: "Méthodes de Valorisation Actuelles",
    biomassStrategy: "Stratégie d'Approvisionnement Biomasse",

    regionalContext: "Contexte Régional",
    leadership: "Leadership national et potentiel économique",

    safNews: "Actualités Secteur SAF",
    regulation: "Contexte Réglementaire",
    footer:
      "Notre projet s'inscrit dans cette dynamique nationale → Voir onglet Économie",
  },
};

export default function OverviewTab() {
  const { language } = useLanguage();
  const { regionData } = useRegion();
  const t = translations[language];

  if (!regionData) {
    return <p>Loading regional data…</p>;
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <header>
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </header>

      {/* Key Points */}
      <Card>
        <CardHeader>
          <CardTitle>{t.keyPoints}</CardTitle>
          <p className="text-sm text-muted-foreground">{t.keyIndicators}</p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {regionData.keyPoints.map((item: any, idx: number) => (
            <div key={idx} className="text-center">
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-sm">{item.label[language]}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Regional Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>{t.regionalAnalysis}</CardTitle>
          <p className="text-sm text-muted-foreground">{t.distribution}</p>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">{t.productionShare}</h4>
          <ul className="list-disc pl-6 mb-4">
            {regionData.productionShare.map((d: any, idx: number) => (
              <li key={idx}>
                {d.department}: {d.value}% {language === "fr" ? "de la production régionale" : "of regional production"}
              </li>
            ))}
          </ul>

          <h4 className="font-semibold">{t.currentUses}</h4>
          <ul className="list-disc pl-6 mb-4">
            {regionData.currentUses.map((use: any, idx: number) => (
              <li key={idx}>
                {use.method[language]}: {use.value}%
              </li>
            ))}
          </ul>

          <h4 className="font-semibold">{t.biomassStrategy}</h4>
          <p className="text-sm">{regionData.biomassStrategy[language]}</p>
        </CardContent>
      </Card>

      {/* Regional Context */}
      <Card>
        <CardHeader>
          <CardTitle>{t.regionalContext}</CardTitle>
          <p className="text-sm text-muted-foreground">{t.leadership}</p>
        </CardHeader>
        <CardContent>
          {regionData.context.map((c: any, idx: number) => (
            <p key={idx} className="mb-2">
              {c[language]}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* SAF News */}
      <Card>
        <CardHeader>
          <CardTitle>{t.safNews}</CardTitle>
        </CardHeader>
        <CardContent>
          {regionData.news.map((news: any, idx: number) => (
            <div key={idx} className="mb-3">
              <h4 className="font-semibold">{news.title}</h4>
              <ul className="list-disc pl-6">
                {news.details[language].map((d: string, i: number) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Regulation */}
      <Card>
        <CardHeader>
          <CardTitle>{t.regulation}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            {regionData.regulation[language].map((r: string, idx: number) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Footer note */}
      <p className="text-muted-foreground italic">{t.footer}</p>
    </div>
  );
}
