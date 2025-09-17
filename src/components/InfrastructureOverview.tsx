import React from "react";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InfrastructureOverview({ region, language }: { region: string; language: string }) {
  const { currentData } = useRegion();
  const { language: ctxLang } = useLanguage();
  const lang = language || ctxLang || "fr";

  if (!currentData) {
    return (
      <div className="p-2 bg-red-200 text-black font-mono text-sm">
        Debug: InfrastructureOverview → no data for {region}
      </div>
    );
  }

  const infraLabels = {
    fr: {
      title: "Infrastructures Régionales",
      distilleries: "Distilleries",
      methanization: "Unités de méthanisation",
      composting: "Sites de compostage",
      biomass: "Centrales biomasse",
      communes: "Communes principales",
    },
    en: {
      title: "Regional Infrastructure",
      distilleries: "Distilleries",
      methanization: "Methanization Units",
      composting: "Composting Sites",
      biomass: "Biomass Plants",
      communes: "Top Communes",
    },
  };

  const t = infraLabels[lang as "fr" | "en"];

  return (
    <div className="space-y-4">
      {/* Debug Banner */}
      <div className="p-2 mb-2 bg-green-200 text-black font-mono text-sm">
        Debug: <strong>InfrastructureOverview</strong> loaded. Region ={" "}
        {region || "undefined"}, Language = {lang}
      </div>

      <h2 className="text-xl font-bold">{t.title}</h2>

      {/* Infrastructure Counts */}
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>{currentData.infrastructure?.distilleries || 0} {t.distilleries}</li>
        <li>{currentData.infrastructure?.methanization || 0} {t.methanization}</li>
        <li>{currentData.infrastructure?.composting || 0} {t.composting}</li>
        <li>{currentData.infrastructure?.biomass || 0} {t.biomass}</li>
      </ul>

      {/* Communes Table */}
      {currentData.communes && currentData.communes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{t.communes}</h3>
          <table className="w-full mt-2 border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">{lang === "fr" ? "Commune" : "Commune"}</th>
                <th className="p-2 text-right">{lang === "fr" ? "Tonnage (t)" : "Tonnage (t)"}</th>
              </tr>
            </thead>
            <tbody>
              {currentData.communes.map((c: { name: string; tonnage: number }, idx: number) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2 text-right">{c.tonnage.toLocaleString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
