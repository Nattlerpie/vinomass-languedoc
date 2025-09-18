import React from "react";
import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const OverviewTab: React.FC = () => {
  const { currentData } = useRegion();
  const { t } = useLanguage();

  // Debug
  console.log("OverviewTab rendering, currentData:", currentData);

  // Support multiple possible key names (safe fallbacks)
  const availableBiomass =
    currentData.wasteAllocation?.available ??
    currentData.wasteAllocation?.availableForSAF ??
    currentData.wasteAllocation?.fluxDisponibles ?? // older keys you had
    80000;

  const negotiableBiomass =
    currentData.wasteAllocation?.negotiable ??
    currentData.wasteAllocation?.fluxNegociables ??
    66000;

  const protectedBiomass =
    currentData.wasteAllocation?.protected ??
    currentData.wasteAllocation?.fluxProteges ??
    120000;

  // total biomass: prefer explicit fields, fall back to annualPomace
  const totalBiomass =
    // some components expect totalBiomass
    (currentData as any).totalBiomass ?? currentData.annualPomace ?? 266000;

  // Realistic SAF calculations (availableBiomass × 280 L/tonne × 70% efficiency)
  // realisticSafProduction in millions of liters
  const realisticSafProduction = (availableBiomass * 280 * 0.7) / 1_000_000;
  const realisticRevenue = realisticSafProduction * 1.22; // €1.22 / L
  // CO2 reduction estimate (2.5 kg CO2 avoided per liter), convert kg -> tonnes
  const realisticCO2Reduction = (realisticSafProduction * 1_000_000 * 2.5) / 1000;

  // helpers for formatting
  const fmtThousands = (n: number) => `${Math.round(n / 1000)}k`;
  const fmtMillions = (n: number) => `${n.toFixed(1)}M`;

  return (
    <div className="min-h-screen w-full p-4 space-y-8">
      {/* Debug Banner */}
      <div className="p-2 mb-2 bg-yellow-200 text-black font-mono text-sm">
        Debug: <strong>OverviewTab</strong> mounted. Region ={" "}
        <strong>{currentData?.id ?? "undefined"}</strong>
      </div>

      {/* Hero / Header */}
      <section className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-3">
          {t("header.title").replace("{region}", currentData.name)}
        </h1>
        <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
          {t("header.subtitle")}
        </p>
      </section>

      {/* Points Clés / Key metrics */}
      <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-10 shadow-elegant border border-wine-cream/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-2">
            {t("points.cles")}
          </h2>
          <p className="text-lg text-wine-charcoal/70">{t("points.cles.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Vineyard surface */}
          <div className="text-center p-6 rounded-xl border border-wine-burgundy/10">
            <div className="text-4xl font-bold text-wine-burgundy mb-2">
              {fmtThousands(currentData.vineyardSurface)}
            </div>
            <div className="text-lg font-semibold text-wine-charcoal mb-1">
              {t("superficie.viticole")}
            </div>
            <div className="text-sm text-wine-charcoal/60">{t("hectares")}</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">{t("base.regionale")}</div>
          </div>

          {/* Total biomass & annual pomace */}
          <div className="text-center p-6 rounded-xl border border-wine-gold/10">
            <div className="text-4xl font-bold text-wine-gold mb-2">
              {fmtThousands(totalBiomass)}{" "}
              <span className="mx-2 text-gray-400">/</span>{" "}
              {fmtThousands(currentData.annualPomace ?? totalBiomass)}
            </div>
            <div className="text-lg font-semibold text-wine-charcoal mb-1">
              {t("production.marc")}
            </div>
            <div className="text-sm text-wine-charcoal/60">{t("tonnes")}</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">{t("matiere.premiere")}</div>
          </div>

          {/* Available for SAF */}
          <div className="text-center p-6 rounded-xl border border-wine-green/10">
            <div className="text-4xl font-bold text-wine-green mb-2">
              {fmtThousands(availableBiomass)}
            </div>
            <div className="text-lg font-semibold text-wine-charcoal mb-1">
              {t("allocation.flux")}
            </div>
            <div className="text-sm text-wine-charcoal/60">{t("tonnes")}</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">30% {t("disponible.saf")}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* SAF production */}
          <div className="text-center p-6 rounded-xl border border-wine-burgundy/10">
            <div className="text-4xl font-bold text-wine-burgundy mb-2">
              {fmtMillions(realisticSafProduction)}
            </div>
            <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("potentiel.saf")}</div>
            <div className="text-sm text-wine-charcoal/60">{t("litres.an")}</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">
              {t("resources.safPotentialSubtitle", { tonnage: `${availableBiomass}` }) || `Basé sur ${fmtThousands(availableBiomass)} disponibles`}
            </div>
          </div>

          {/* Revenue */}
          <div className="text-center p-6 rounded-xl border border-wine-gold/10 relative group">
            <div className="text-4xl font-bold text-wine-gold mb-2">€{realisticRevenue.toFixed(1)}M</div>
            <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("revenue.potential")}</div>
            <div className="text-sm text-wine-charcoal/60">/an</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">{t("prix.marche")}</div>

            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-2 rounded text-xs">
              {fmtMillions(realisticSafProduction)} L × €1.22/L
            </div>
          </div>

          {/* CO2 reduction */}
          <div className="text-center p-6 rounded-xl border border-wine-green/10">
            <div className="text-4xl font-bold text-wine-green mb-2">{(realisticCO2Reduction / 1000).toFixed(1)}kt</div>
            <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("reduction.co2")}</div>
            <div className="text-sm text-wine-charcoal/60">{t("tonnes.an")}</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">{t("vs.fossile")}</div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30"></div>

      {/* Regional Analysis */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-2">{t("analyse.regionale")}</h2>
          <p className="text-lg text-wine-charcoal/70">{t("analyse.regionale.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <TopCommunes topCommunes={currentData.topCommunes} />
          </div>

          <div>
            <ValoorizationChart regionData={currentData} />

            <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-6 mt-6">
              <h4 className="text-lg font-bold text-wine-charcoal mb-3">{t("strategie.biomasse")}</h4>
              <div className="space-y-3 text-sm text-wine-charcoal/70">
                <div>
                  <strong>• {t("base.conservative")}:</strong>{" "}
                  {`30% disponible (${fmtThousands(availableBiomass)}) - ${t("flux.elimination")}`}
                </div>
                <div>
                  <strong>• {t("potentiel.negociable")}:</strong>{" "}
                  {`+25% (${fmtThousands(negotiableBiomass)}) - ${t("surplus.excedents")}`}
                </div>
                <div>
                  <strong>• {t("total.accessible")}:</strong>{" "}
                  {`Jusqu'à 55% (${fmtThousands(availableBiomass + negotiableBiomass)}) ${t("avec.partenariats")}`}
                </div>
              </div>
              <p className="text-sm text-wine-charcoal/60 mt-4 italic border-t border-wine-gold/20 pt-3">
                {t("respecte.filieres")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Context */}
      <section className="mb-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold">{t("contexte.regional")}</h3>
            <p className="text-lg text-wine-charcoal/70">{t("contexte.regional.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl border border-wine-burgundy/10">
              <div className="text-3xl font-bold mb-2">{currentData.id === "languedoc" ? "1er" : "Premium"}</div>
              <div className="font-semibold">{currentData.id === "languedoc" ? t("region.viticole.francaise") : t("region.premium.champagne")}</div>
              <div className="text-sm mt-1">{currentData.id === "languedoc" ? t("volume.production") : t("marche.prestige")}</div>
            </div>

            <div className="text-center p-6 rounded-xl border border-wine-gold/10">
              <div className="text-3xl font-bold mb-2">{currentData.id === "languedoc" ? "38%" : "3%"}</div>
              <div className="font-semibold">{t("production.nationale")}</div>
              <div className="text-sm mt-1">
                {currentData.id === "languedoc"
                  ? `12 ${t("millions")} ${t("hectolitres")}`
                  : `3.5 ${t("millions")} ${t("hectolitres")} (${t("segment.premium")})`}
              </div>
            </div>

            <div className="text-center p-6 rounded-xl border border-wine-green/10">
              <div className="text-3xl font-bold mb-2">€{currentData.id === "languedoc" ? "3.2" : "5.2"}B</div>
              <div className="font-semibold">{t("ca.annuel")}</div>
              <div className="text-sm mt-1">{t("secteur.vitivinicole")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry News & Regulatory */}
      <section>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold">{t("actualites.saf")}</h3>
            <p className="text-lg text-wine-charcoal/70">{t("actualites.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="p-4 rounded-xl border border-wine-burgundy/10">
              <h4 className="font-bold text-wine-burgundy">HAFFNER ENERGY</h4>
              <div className="text-sm text-wine-charcoal/70 mt-2">
                • <strong>{t("investissement")}:</strong> €180M<br />
                • <strong>{t("capacite")}:</strong> 50,000 {t("tonnes.saf.an")} {t("des.2025")}<br />
                • <strong>{t("technologie")}:</strong> Biomasse-to-liquids (BTL)
              </div>
            </div>

            <div className="p-4 rounded-xl border border-wine-gold/10">
              <h4 className="font-bold text-wine-gold">LANZAJET</h4>
              <div className="text-sm text-wine-charcoal/70 mt-2">
                • Premier site commercial ATJ en Europe<br />
                • <strong>{t("capacite")}:</strong> 125,000 {t("tonnes.saf.an")}
              </div>
            </div>
          </div>

          <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-4 text-sm">
            <strong>{t("contexte.reglementaire")}</strong>
            <div className="mt-2">
              • ReFuelEU Aviation: 2% SAF minimum 2025<br />
              • France 2030: €4 {t("milliards")} {t("fonds.verts")}
            </div>
          </div>

          <div className="text-center mt-6 text-sm italic">{t("projet.inscrit")}</div>
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
