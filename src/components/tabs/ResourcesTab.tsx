import React from "react";
import BiomassBreakdownChart from "../BiomassBreakdownChart";
import StaticRegionalMap from "../StaticRegionalMap";
import SeasonalTimeline from "../SeasonalTimeline";
import InfrastructureOverview from "../InfrastructureOverview";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResourcesTab() {
  const { region } = useRegion();
  const { language } = useLanguage();

  return (
    <div className="p-2 bg-yellow-200 text-black">
    Debug: ResourcesTab mounted. Region = {region || "undefined"}, Language = {language || "undefined"}
  </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold">
        {language === "fr" ? "Ressources Biomasse" : "Biomass Resources"}
      </h1>
      <p className="text-gray-600">
        {language === "fr"
          ? "Cartographie et analyse des ressources régionales disponibles"
          : "Mapping and analysis of available regional resources"}
      </p>

      {/* Regional Map */}
      <StaticRegionalMap region={region} language={language} />

      {/* Biomass Breakdown */}
      <BiomassBreakdownChart region={region} language={language} />

      {/* Seasonal Availability */}
      <SeasonalTimeline region={region} language={language} />

      {/* Infrastructure */}
      <InfrastructureOverview region={region} language={language} />
    </div>
  );
}
