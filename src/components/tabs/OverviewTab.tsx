// src/components/tabs/OverviewTab.tsx
import React, { useEffect } from "react";
import TopCommunes from "../TopCommunes";
import ValoorizationChart from "../ValoorizationChart";
import { useRegion } from "../../contexts/RegionContext";
import { useLanguage } from "../../contexts/LanguageContext";

const OverviewTab: React.FC = () => {
  const { currentData, activeRegion } = useRegion();
  const { t, language } = useLanguage();

  useEffect(() => {
    // helpful debug in console to trace region/language problems
    // keep this while you're debugging; remove in production if you want
    // eslint-disable-next-line no-console
    console.debug(`Debug: OverviewTab mounted. Region = ${activeRegion}, Language = ${language}`);
  }, [activeRegion, language]);

  // --- safe, flexible data extraction (handles multiple data shapes) ---
  const waste = currentData?.wasteAllocation ?? (currentData as any)?.wasteAllocation ?? {};
  // try several common field names used across your different files:
  const availableBiomass =
    waste.available ??
    waste.fluxDisponibles ??
    (currentData as any).availableBiomass ??
    (currentData as any).available ??
    80000;

  const negotiableBiomass =
    waste.negotiable ??
    waste.fluxNegociables ??
    (currentData as any).negotiableBiomass ??
    (currentData as any).fluxNegociables ??
    66000;

  const protectedBiomass =
    waste.protected ??
    waste.fluxProteges ??
    (currentData as any).protectedBiomass ??
    (currentData as any).fluxProteges ??
    120000;

  // calculations (realistic: L/tonne * efficiency)
  const SAF_YIELD_L_PER_T = 280;
  const ATJ_EFFICIENCY = 0.7;
  const MARKET_PRICE_PER_L = 1.22;

  const realisticSafLiters = availableBiomass * SAF_YIELD_L_PER_T * ATJ_EFFICIENCY; // liters
  const realisticSafMillions = realisticSafLiters / 1_000_000; // millions of liters
  const realisticRevenueMillions = (realisticSafLiters / 1_000_000) * MARKET_PRICE_PER_L; // M€
  // CO2 — prefer canonical value in currentData when present, otherwise estimate:
  const co2FromData = (currentData as any).co2Reduction ?? (currentData as any).realisticCo2Reduction;
  // fallback estimate (if you later want different factor, change here)
  const co2EstimateTonnes = co2FromData ?? Math.round((realisticSafLiters * 2.75) / 1000);

  // formatting helpers
  const fmt = (v: number, opts?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", opts).format(v);

  // avoid crash if currentData not loaded
  if (!currentData) {
    return (
      <div className="min-h-screen w-full p-8">
        <p>{t("loading") || "Loading..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Debug banner */}
      <div className="text-xs p-2 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded mb-4">
        <strong>Debug:</strong> {` OverviewTab mounted. Region = ${activeRegion}, Language = ${language}`}
      </div>

      {/* Hero / Header */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-2">
            {t("header.title").replace("{region}", currentData.name)}
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">{t("header.subtitle")}</p>
        </div>

        {/* Points clés card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-2">{t("points.cles")}</h2>
            <p className="text-lg text-wine-charcoal/70">{t("points.cles.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vineyard surface */}
            <div className="text-center p-6 rounded-xl border border-wine-burgundy/10">
              <div className="text-4xl font-bold text-wine-burgundy mb-2">
                {fmt(currentData.vineyardSurface / 1000, { maximumFractionDigits: 0 })}k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("superficie.viticole")}</div>
              <div className="text-sm text-wine-charcoal/60">{t("hectares")}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t("base.regionale")}</div>
            </div>

            {/* Biomass / marc production */}
            <div className="text-center p-6 rounded-xl border border-wine-gold/10">
              <div className="text-4xl font-bold text-wine-gold mb-2">
                {fmt((currentData as any).totalBiomass / 1000, { maximumFractionDigits: 0 })}k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("production.marc")}</div>
              <div className="text-sm text-wine-charcoal/60">{t("tonnes")}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t("matiere.premiere")}</div>
            </div>

            {/* Available biomass (30%) */}
            <div className="text-center p-6 rounded-xl border border-wine-green/10">
              <div className="text-4xl font-bold text-wine-green mb-2">
                {fmt(availableBiomass / 1000, { maximumFractionDigits: 0 })}k
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("allocation.flux")}</div>
              <div className="text-sm text-wine-charcoal/60">{t("tonnes")}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">
                {t("disponible.saf")} ({t("sur.ans", { years: "—" }) /* placeholder if you want */})
                {/* you can remove the sur.ans if not needed */}
              </div>
            </div>

            {/* SAF potential */}
            <div className="text-center p-6 rounded-xl border border-wine-burgundy/10">
              <div className="text-4xl font-bold text-wine-burgundy mb-2">
                {fmt(realisticSafMillions, { maximumFractionDigits: 1 })}M
              </div>
              <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("potentiel.saf")}</div>
              <div className="text-sm text-wine-charcoal/60">{t("litres.an")}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">
                {t("resources.safPotentialSubtitle").replace("{tonnage}", `${fmt(availableBiomass)} `) ||
                  `${t("resources.safPotentialSubtitle")}`}
              </div>
            </div>

            {/* Revenue */}
            <div className="text-center p-6 rounded-xl border border-wine-gold/10 relative group">
              <div className="text-4xl font-bold text-wine-gold mb-2">€{fmt(realisticRevenueMillions, { maximumFractionDigits: 1 })}M</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("revenue.potential")}</div>
              <div className="text-sm text-wine-charcoal/60">/an</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t("prix.marche")}</div>

              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-wine-charcoal text-white p-2 rounded text-xs whitespace-nowrap z-10">
                {fmt(realisticSafMillions, { maximumFractionDigits: 1 })}M L × €{MARKET_PRICE_PER_L || "1.22"}/L
              </div>
            </div>

            {/* CO2 reduction */}
            <div className="text-center p-6 rounded-xl border border-wine-green/10">
              <div className="text-4xl font-bold text-wine-green mb-2">{fmt(co2EstimateTonnes / 1000, { maximumFractionDigits: 1 })}kt</div>
              <div className="text-lg font-semibold text-wine-charcoal mb-1">{t("reduction.co2")}</div>
              <div className="text-sm text-wine-charcoal/60">{t("tonnes.an")}</div>
              <div className="text-xs text-wine-charcoal/50 mt-1">{t("vs.fossile")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-12" />

      {/* Regional Analysis */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-2">{t("analyse.regionale")}</h2>
          <p className="text-lg text-wine-charcoal/70">{t("analyse.regionale.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <TopCommunes />
          </div>

          <div className="space-y-4">
            <ValoorizationChart />

            {/* Biomass strategy card */}
            <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-6 mt-2">
              <h4 className="text-lg font-bold text-wine-charcoal mb-3">{t("strategie.biomasse")}</h4>

              <div className="space-y-2 text-sm text-wine-charcoal/70">
                <div className="flex items-start space-x-2">
                  <span className="font-medium">• {t("base.conservative") || t("base.conservative")}</span>
                  <span>
                    {`${t("sur.ans", { years: "" }) /* placeholder if wanted */} ${t("disponible.saf")}: ${fmt(availableBiomass / 1000, {
                      maximumFractionDigits: 0,
                    })}kt`}{" "}
                    — {t("flux.elimination")}
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="font-medium">• {t("potentiel.negociable")}</span>
                  <span>
                    +{fmt((negotiableBiomass / availableBiomass) * 100 || 25, { maximumFractionDigits: 0 })}% (
                    {fmt(negotiableBiomass / 1000, { maximumFractionDigits: 0 })}kt) — {t("surplus.excedents")}
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="font-medium">• {t("total.accessible")}</span>
                  <span>
                    {t("total.accessible")} : {t("avec.partenariats")} — {fmt((availableBiomass + negotiableBiomass) / 1000, { maximumFractionDigits: 0 })}kt
                  </span>
                </div>
              </div>

              <p className="text-sm text-wine-charcoal/60 mt-4 italic border-t border-wine-gold/20 pt-3">{t("respecte.filieres")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Context & Industry News (compact) */}
      <section className="mb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-wine-cream/30">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-wine-charcoal mb-2">{t("contexte.regional")}</h2>
            <p className="text-lg text-wine-charcoal/70">{t("contexte.regional.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl border border-wine-burgundy/10">
              <div className="text-3xl font-bold text-wine-burgundy">{currentData.ranking ?? t("region.viticole.francaise")}</div>
              <div className="text-lg font-semibold mt-1">{currentData.marketPosition ?? t("region.viticole.francaise")}</div>
              <div className="text-sm text-wine-charcoal/60 mt-1">{currentData.volumeDescription ?? t("volume.production")}</div>
            </div>

            <div className="text-center p-4 rounded-xl border border-wine-gold/10">
              <div className="text-3xl font-bold text-wine-gold">{fmt(currentData.nationalProductionShare ?? (currentData as any).nationalProductionShare ?? "")}%</div>
              <div className="text-lg font-semibold mt-1">{t("production.nationale")}</div>
              <div className="text-sm text-wine-charcoal/60 mt-1">{currentData.hectolitres ?? ""} {t("millions")}</div>
            </div>

            <div className="text-center p-4 rounded-xl border border-wine-green/10">
              <div className="text-3xl font-bold text-wine-green">€{fmt(currentData.wineIndustryRevenue ?? (currentData as any).wineIndustryRevenue ?? currentData.revenue ?? 0, { maximumFractionDigits: 1 })}B</div>
              <div className="text-lg font-semibold mt-1">{t("ca.annuel")}</div>
              <div className="text-sm text-wine-charcoal/60 mt-1">{t("secteur.vitivinicole")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry News + Regulatory block */}
      <section className="mb-12">
        <div className="bg-white/90 p-6 rounded-2xl border border-wine-cream/30">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">{t("actualites.saf")}</h3>
            <p className="text-sm text-wine-charcoal/70">{t("actualites.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Example news cards (texts via t keys where possible) */}
            <div className="p-4 rounded-xl border border-wine-burgundy/10">
              <h4 className="font-bold text-wine-burgundy">HAFFNER ENERGY</h4>
              <div className="text-sm text-wine-charcoal/70 mt-2">
                <div>{t("haffner.title") || "Bioraffinerie Marolles-en-Hurepoix (Essonne)"}</div>
                <div>• {t("investissement")}: €180M</div>
                <div>• {t("capacite")}: 50,000 {t("tonnes.saf.an")} {t("des.2025")}</div>
                <div>• {t("technologie")}: Biomasse-to-liquids (BTL)</div>
                <div>• {t("partenariat")}: Région Île-de-France</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-wine-gold/10">
              <h4 className="font-bold text-wine-gold">LANZAJET</h4>
              <div className="text-sm text-wine-charcoal/70 mt-2">
                <div>Freedom Pines Fuels - Partenariat Total Energies</div>
                <div>• Premier site commercial ATJ en Europe</div>
                <div>• {t("capacite")}: 125,000 {t("tonnes.saf.an")}</div>
                <div>• Feedstock: Éthanol de déchets agricoles</div>
                <div>• Certification: ASTM D7566</div>
              </div>
            </div>
          </div>

          {/* Regulatory */}
          <div className="bg-wine-cream/10 border border-wine-gold/20 rounded-xl p-4 mt-6">
            <h4 className="font-semibold">{t("contexte.reglementaire")}</h4>
            <div className="text-sm text-wine-charcoal/70 mt-2">
              <div>• ReFuelEU Aviation: 2% SAF minimum 2025</div>
              <div>• France 2030: €4 {t("milliards")} {t("fonds.verts")}</div>
              <div>• EU REPowerEU: €210 {t("milliards")} {t("energies.renouvelables")}</div>
              <div>• CORSIA ICAO: {t("objectif")} {t("neutralite.carbone")} 2050</div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm italic text-wine-charcoal/60">{t("projet.inscrit")}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
