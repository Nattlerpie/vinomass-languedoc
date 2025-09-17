import React from "react";
import BiomassBreakdownChart from "../BiomassBreakdownChart";
import StaticRegionalMap from "../StaticRegionalMap";
import SeasonalTimeline from "../SeasonalTimeline";
import InfrastructureOverview from "../InfrastructureOverview";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResourcesTab() {
  const { activeRegion, currentData } = useRegion(); // ✅ pull the right values
  const { language } = useLanguage();

  console.log("ResourcesTab rendering with:", activeRegion, currentData);

  return (
    <div className="p-4 space-y-6">
      {/* Debug Banner */}
      <div className="p-2 mb-2 bg-yellow-200 text-black font-mono text-sm">
        Debug: <strong>ResourcesTab</strong> mounted. Region ={" "}
        {activeRegion || "undefined"}, Language = {language || "undefined"}
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
      <StaticRegionalMap region={activeRegion} language={language} />

      {/* Biomass Breakdown */}
      <BiomassBreakdownChart region={activeRegion} language={language} />

      {/* Seasonal Availability */}
      <SeasonalTimeline region={activeRegion} language={language} />

      {/* Infrastructure */}
      <InfrastructureOverview region={activeRegion} language={language} />
    </div>
  );
}
