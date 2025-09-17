import React from "react";
import { useRegion } from "../context/RegionContext";
import { useLanguage } from "../context/LanguageContext";
import { getRegionData } from "../data/regionData";

const OverviewTab: React.FC = () => {
  const { region } = useRegion();
  const { language } = useLanguage();
  const data = getRegionData(region);

  console.debug("Debug: OverviewTab mounted. Region =", region, "Language =", language);

  const translations: Record<string, { fr: string; en: string }> = {
    title: {
      fr: "Vue d’ensemble",
      en: "Overview",
    },
    intro: {
      fr: "Cette section fournit une vue d’ensemble des indicateurs clés de la région sélectionnée.",
      en: "This section provides an overview of key indicators for the selected region.",
    },
    keyIndicators: {
      fr: "Indicateurs clés",
      en: "Key Indicators",
    },
    tourismGDP: {
      fr: "Dépendance au PIB touristique",
      en: "Tourism GDP Reliance",
    },
    airDependency: {
      fr: "Dépendance au transport aérien",
      en: "Air Transport Dependency",
    },
    seasonality: {
      fr: "Concentration saisonnière",
      en: "Seasonality Concentration",
    },
    loadFactor: {
      fr: "Volatilité du taux de remplissage",
      en: "Load Factor Volatility",
    },
    insights: {
      fr: "Points clés",
      en: "Key Takeaways",
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title + Intro */}
      <h2 className="text-2xl font-bold">
        {translations.title[language]}
      </h2>
      <p>{translations.intro[language]}</p>

      {/* Key Indicators */}
      <section>
        <h3 className="text-xl font-semibold mb-2">
          {translations.keyIndicators[language]}
        </h3>
        <ul className="list-disc ml-6">
          <li>
            {translations.tourismGDP[language]}:{" "}
            <strong>{data?.tourismGDP ?? "N/A"}%</strong>
          </li>
          <li>
            {translations.airDependency[language]}:{" "}
            <strong>{data?.airDependency ?? "N/A"}%</strong>
          </li>
          <li>
            {translations.seasonality[language]}:{" "}
            <strong>{data?.seasonality ?? "N/A"}%</strong>
          </li>
          <li>
            {translations.loadFactor[language]}:{" "}
            <strong>{data?.loadFactor ?? "N/A"}%</strong>
          </li>
        </ul>
      </section>

      {/* Insights */}
      <section>
        <h3 className="text-xl font-semibold mb-2">
          {translations.insights[language]}
        </h3>
        <p>
          {language === "fr"
            ? "Cette région présente une dépendance significative aux flux touristiques et au transport aérien, ce qui la rend sensible aux variations saisonnières et économiques."
            : "This region shows a significant reliance on tourism flows and air transport, making it sensitive to seasonal and economic fluctuations."}
        </p>
      </section>
    </div>
  );
};

export default OverviewTab;
