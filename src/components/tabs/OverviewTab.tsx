import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import regionData from "@/contexts/RegionData";

export const OverviewTab: React.FC = () => {
  const { t, language } = useLanguage();
  const { region } = useRegion();

  const data = regionData[region];

  useEffect(() => {
    console.log(
      `Debug: OverviewTab mounted. Region = ${region}, Language = ${language}`
    );
  }, [region, language]);

  if (!data) {
    return <div>{t("errors.no_data")}</div>;
  }

  return (
    <div className="p-6 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          {t("overview.project_title")} {data.name}
        </h1>
        <p className="text-gray-600">{t("overview.project_subtitle")}</p>
      </div>

      {/* POINTS CLES */}
      <section>
        <h2 className="text-xl font-semibold">{t("overview.points_cles.title")}</h2>
        <p className="text-gray-500">{t("overview.points_cles.subtitle")}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-2xl font-bold">{data.production.vineyard_surface}</p>
            <p>{t("overview.production.vineyard_surface")}</p>
            <p className="text-xs text-gray-500">{t("overview.production.hectares")}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-2xl font-bold">{data.production.pomace_production}</p>
            <p>{t("overview.production.pomace_production")}</p>
            <p className="text-xs text-gray-500">{t("overview.production.tons")}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-2xl font-bold">{data.production.flow_allocation}</p>
            <p>{t("overview.production.flow_allocation")}</p>
            <p className="text-xs text-gray-500">{t("overview.production.available_for_saf")}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-2xl font-bold">{data.production.saf_potential}</p>
            <p>{t("overview.production.saf_potential")}</p>
            <p className="text-xs text-gray-500">{t("overview.production.annual_biomass")}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-2xl font-bold">{data.production.revenue_potential}</p>
            <p>{t("overview.production.revenue_potential")}</p>
            <p className="text-xs text-gray-500">{t("overview.production.market_price")}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-2xl font-bold">{data.production.co2_reduction}</p>
            <p>{t("overview.production.co2_reduction")}</p>
            <p className="text-xs text-gray-500">{t("overview.production.vs_fossil")}</p>
          </div>
        </div>
      </section>

      {/* ANALYSE REGIONALE */}
      <section>
        <h2 className="text-xl font-semibold">
          {t("overview.regional_analysis.title")}
        </h2>

        <h3 className="mt-2 font-medium">
          {t("overview.regional_analysis.department_breakdown")}
        </h3>
        <ul className="list-disc ml-6">
          {data.regional_analysis.departments.map((dept: any, i: number) => (
            <li key={i}>
              {dept.name}: {dept.share}%
            </li>
          ))}
        </ul>

        <h3 className="mt-4 font-medium">
          {t("overview.regional_analysis.current_valorization")}
        </h3>
        <ul className="list-disc ml-6">
          {data.regional_analysis.current_valorization.map(
            (item: any, i: number) => (
              <li key={i}>
                {item.method}: {item.share}%
              </li>
            )
          )}
        </ul>
      </section>

      {/* STRATEGIE BIOMASSE */}
      <section>
        <h2 className="text-xl font-semibold">
          {t("overview.regional_analysis.biomass_strategy.title")}
        </h2>
        <ul className="list-disc ml-6">
          <li>{t("overview.regional_analysis.biomass_strategy.conservative_base")}</li>
          <li>{t("overview.regional_analysis.biomass_strategy.negotiable_potential")}</li>
          <li>{t("overview.regional_analysis.biomass_strategy.total_accessible")}</li>
        </ul>
        <p className="mt-2 text-gray-600">
          {t("overview.regional_analysis.biomass_strategy.note")}
        </p>
      </section>

      {/* CONTEXTE REGIONAL */}
      <section>
        <h2 className="text-xl font-semibold">{t("overview.regional_context.title")}</h2>
        <ul className="list-disc ml-6">
          <li>{t("overview.regional_context.item1")}</li>
          <li>{t("overview.regional_context.item2")}</li>
          <li>{t("overview.regional_context.item3")}</li>
        </ul>
      </section>

      {/* ACTUALITES SAF */}
      <section>
        <h2 className="text-xl font-semibold">{t("overview.saf_news.title")}</h2>
        <ul className="list-disc ml-6">
          <li>{t("overview.saf_news.haffner")}</li>
          <li>{t("overview.saf_news.lanzajet")}</li>
          <li>{t("overview.saf_news.airbus")}</li>
          <li>{t("overview.saf_news.total")}</li>
        </ul>
      </section>

      {/* CONTEXTE REGLEMENTAIRE */}
      <section>
        <h2 className="text-xl font-semibold">{t("overview.regulatory_context.title")}</h2>
        <ul className="list-disc ml-6">
          <li>{t("overview.regulatory_context.refuel_eu")}</li>
          <li>{t("overview.regulatory_context.france_2030")}</li>
          <li>{t("overview.regulatory_context.repoweu")}</li>
          <li>{t("overview.regulatory_context.corsia")}</li>
        </ul>
      </section>
    </div>
  );
};
