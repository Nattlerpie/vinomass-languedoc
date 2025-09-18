"use client";

import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverviewTab() {
  const { region } = useRegion();
  const { t } = useLanguage();

  if (!region) return null;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-6 border-b">
        <h1 className="text-3xl font-bold">{region.name}</h1>
        <p className="text-lg text-muted-foreground">{region.description}</p>
      </section>

      {/* 6 Key Metrics */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("keyMetrics")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {region.metrics.map((metric, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader>
                <CardTitle>{t(metric.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{t(metric.context)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Regional Analysis */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">{t("regionalAnalysis")}</h2>
        <p className="text-muted-foreground">{region.analysis}</p>
      </section>

      {/* Biomass Strategy */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">{t("biomassStrategy")}</h2>
        <p className="text-muted-foreground">{region.biomassStrategy}</p>
      </section>

      {/* Context */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">{t("context")}</h2>
        <p className="text-muted-foreground">{region.context}</p>
      </section>

      {/* Industry News */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">{t("industryNews")}</h2>
        <ul className="list-disc pl-5 space-y-1">
          {region.industryNews.map((news, i) => (
            <li key={i}>{news}</li>
          ))}
        </ul>
      </section>

      {/* Regulations */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">{t("regulations")}</h2>
        <ul className="list-disc pl-5 space-y-1">
          {region.regulations.map((reg, i) => (
            <li key={i}>{reg}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
