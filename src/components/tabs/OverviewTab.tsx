// src/components/tabs/OverviewTab.tsx
import React, { useEffect } from "react";
import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
// Use the alias you use elsewhere — change to relative path if you don't have "@/..." configured
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const OverviewTab: React.FC = () => {
  const { currentData, activeRegion } = useRegion();
  const { t, language } = useLanguage();

  // Defensive defaults if data shape changes
  const availableBiomass =
    currentData?.wasteAllocation?.available ?? currentData?.wasteAllocation?.fluxDisponibles ?? currentData?.availableBiomass ?? 80000;
  const negotiableBiomass =
    currentData?.wasteAllocation?.negotiable ?? currentData?.wasteAllocation?.fluxNegociables ?? 66000;
  const protectedBiomass =
    currentData?.wasteAllocation?.protected ?? currentData?.wasteAllocation?.fluxProteges ?? 120000;

  // Calculations (liters, revenues in M€, CO2 in tonnes)
  const safLiters = availableBiomass * 280 * 0.7; // L (availableBiomass * L/tonne * efficiency)
  const safML = safLiters / 1_000_000; // millions of liters
  const revenueMillions = safML * 1.22; // € million
  const co2Tonnes = safML * 2.75; // using 2.75 t CO2 per ML (consistent with region formulas)

  useEffect(() => {
    console.log("OverviewTab rendering with:", { activeRegion, language, regionName: currentData?.name });
  }, [activeRegion, language, currentData?.name]);

  return (
    <div className="min-h-screen w-full p-4 space-y-8">
      {/* Debug Banner */}
      <div className="p-2 mb-2 bg-yellow-200 text-black font-mono text-sm">
        Debug: <strong>OverviewTab</strong> mounted. Region = {activeRegion || "undefined"}, Language = {language || "undefined"}
      </div>

      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-3">
          {t("header.title").replace("{region}", currentData?.name || "")}
        </h1>
        <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
          {t("header.subtitle")}
        </p>
      </section>

      {/* Key Points / Hero */}
      <section>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-10 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-2">{t("points_cles.title")}</h2>
            <p className="text-lg text-wine-charcoal/70">{t("points_cles.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Vineyard surface */}
            <div className="text-center p-6 rounded-xl border">
              <div className="text-4xl font-bold mb-2">
                {currentData?.vineyardSurface ? `${Math.round(currentData.vineyardSurface / 1000)}k` : "—"}
              </div>
              <div className="font-semibold">{t("production.vineyard_surface")}</div>
              <div className="text-sm text-muted">{t("production.hectares")}</div>
              <div className="text-xs text-muted mt-1">{t("production.regional_base")}</div>
            </div>

            {/* Production / marc */}
            <div className="text-center p-6 rounded-xl border">
              <div className="text-4xl font-bold mb-2">
                {currentData?.totalBiomass ? `${Math.round(currentData.totalBiomass / 1000)}k` : "—"}
              </div>
              <div className="font-semibold">{t("production.pomace_production")}</div>
              <div className="text-sm text-muted">{t("production.tons")}</div>
              <div className="text-xs text-muted mt-1">{t("production.raw_material")}</div>
            </div>

            {/* Available for SAF */}
            <div className="text-center p-6 rounded-xl border">
              <div className="text-4xl font-bold mb-2">{`${Math.round(availableBiomass / 1000)}k`}</div>
              <div className="font-semibold">{t("production.flow_allocation")}</div>
              <div className="text-sm text-muted">{t("production.tons")}</div>
              <div className="text-xs text-muted mt-1">
                {t("production.available_for_saf") ? `${t("production.available_for_saf")}` : `30% ${t("production.available_for_saf")}`}
              </div>
            </div>

            {/* SAF potential */}
            <div className="text-center p-6 rounded-xl border">
              <div className="text-4xl font-bold mb-2">{`${safML.toFixed(1)}M`}</div>
              <div className="font-semibold">{t("production.saf_potential")}</div>
              <div className="text-sm text-muted">{t("production.annual_biomass")}</div>
              <div className="text-xs text-muted mt-1">
                {t("production.available_for_saf") ? t("production.available_for_saf") : ""} — {`${Math.round(availableBiomass / 1000)}kt`}
              </div>
            </div>

            {/* Revenue */}
            <div className="text-center p-6 rounded-xl border relative group">
              <div className="text-4xl font-bold mb-2">€{revenueMillions.toFixed(1)}M</div>
              <div className="font-semibold">{t("production.revenue_potential")}</div>
              <div className="text-sm text-muted">/an</div>
              <div className="text-xs text-muted mt-1">{t("production.market_price")}</div>

              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-2 rounded text-xs whitespace-nowrap z-10">
                {`${safML.toFixed(1)}M L × €1.22/L`}
              </div>
            </div>

            {/* CO2 reduction */}
            <div className="text-center p-6 rounded-xl border">
              <div className="text-4xl font-bold mb-2">{`${(co2Tonnes / 1000).toFixed(1)}kt`}</div>
              <div className="font-semibold">{t("production.co2_reduction")}</div>
              <div className="text-sm text-muted">{t("production.vs_fossil")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-8"></div>

      {/* Regional Analysis */}
      <section>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-wine-charcoal">{t("regional_analysis.title") || t("regional_analysis") || t("regional_analysis.title")}</h2>
          <p className="text-lg text-wine-charcoal/70">{t("regional_analysis.department_breakdown")}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            {/* Department breakdown + top communes */}
            <div className="bg-white/90 rounded-xl p-4 border">
              <h3 className="font-bold mb-2">{t("regional_analysis.department_breakdown")}</h3>
              <ul className="text-sm">
                {currentData?.departments?.map((d, i) => (
                  <li key={i} className="flex justify-between py-1">
                    <span>{d.name}</span>
                    <span>{d.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <ValoorizationChart />

            <div className="bg-wine-cream/10 border rounded-xl p-4 mt-6">
              <h4 className="font-bold mb-2">{t("regional_analysis.biomass_strategy.title")}</h4>
              <div className="text-sm space-y-2">
                <div>• {t("regional_analysis.biomass_strategy.conservative_base")}</div>
                <div>• {t("regional_analysis.biomass_strategy.negotiable_potential")}</div>
                <div>• {t("regional_analysis.biomass_strategy.total_accessible")}</div>
                <div className="mt-2 italic text-xs">{t("regional_analysis.biomass_strategy.note")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining sections use translations from overview.json/footer.json via t('...') */}
    </div>
  );
};

export default OverviewTab;
