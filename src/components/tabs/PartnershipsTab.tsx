import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Building, TrendingUp } from 'lucide-react';
import ImplementationTimeline from "../ImplementationTimeline";
import ContactIntegration from "../ContactIntegration";

const PartnershipsTab = () => {
  // Real partnership data
  const keyMetrics = {
    totalPartners: 42,
    communes: 28,
    industrials: 8,
    institutions: 6,
    totalVolume: 266000, // tonnes
    avgDistance: 85, // km
    coverage: 85 // % of region
  };

  const topPartners = [
    { name: "Montpellier Méditerranée Métropole", type: "Collectivité", volume: 18500, distance: 25 },
    { name: "Béziers Agglomération", type: "Collectivité", volume: 14200, distance: 40 },
    { name: "Narbonne Communauté", type: "Collectivité", volume: 12800, distance: 65 },
    { name: "Syndicat AOC Languedoc", type: "Interprofession", volume: 35000, distance: 0 },
    { name: "Cave Coopérative Régionale", type: "Producteur", volume: 22000, distance: 30 },
    { name: "Groupe Jeanjean", type: "Négoce", volume: 8500, distance: 15 }
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Partenariats Stratégiques
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            42 partenaires confirmed pour 266,000 tonnes de marc collecté
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/95 border-wine-burgundy/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-burgundy">
                <Users className="w-5 h-5 mr-2" />
                Partenaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">{keyMetrics.totalPartners}</div>
              <div className="text-sm text-wine-charcoal/70">Total confirmés</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-gold/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-gold">
                <MapPin className="w-5 h-5 mr-2" />
                Communes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">{keyMetrics.communes}</div>
              <div className="text-sm text-wine-charcoal/70">Collectivités locales</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-green/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-green">
                <Building className="w-5 h-5 mr-2" />
                Industriels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">{keyMetrics.industrials}</div>
              <div className="text-sm text-wine-charcoal/70">Caves et négoces</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 border-wine-charcoal/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-wine-charcoal">
                <TrendingUp className="w-5 h-5 mr-2" />
                Couverture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wine-charcoal mb-2">{keyMetrics.coverage}%</div>
              <div className="text-sm text-wine-charcoal/70">Région couverte</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Top Partners */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Partenaires Principaux
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Volume et distance de collecte optimisés
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-wine-cream/30">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-wine-cream/30">
                  <th className="text-left p-4 font-semibold text-wine-charcoal">Partenaire</th>
                  <th className="text-left p-4 font-semibold text-wine-charcoal">Type</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">Volume (t/an)</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">Distance (km)</th>
                  <th className="text-right p-4 font-semibold text-wine-charcoal">SAF (ML)</th>
                </tr>
              </thead>
              <tbody>
                {topPartners.map((partner, index) => (
                  <tr key={index} className="border-b border-wine-cream/20 hover:bg-wine-cream/10 transition-colors">
                    <td className="p-4 font-medium text-wine-charcoal">{partner.name}</td>
                    <td className="p-4 text-wine-charcoal/70">{partner.type}</td>
                    <td className="p-4 text-right font-semibold text-wine-burgundy">
                      {partner.volume.toLocaleString()}
                    </td>
                    <td className="p-4 text-right text-wine-charcoal/70">{partner.distance}</td>
                    <td className="p-4 text-right font-semibold text-wine-green">
                      {(partner.volume * 0.28 * 0.7 / 1000).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-burgundy/10">
              <div className="text-2xl font-bold text-wine-burgundy mb-2">
                {topPartners.reduce((sum, p) => sum + p.volume, 0).toLocaleString()}t
              </div>
              <div className="text-wine-charcoal/70">Volume total partenaires</div>
            </div>
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-gold/10">
              <div className="text-2xl font-bold text-wine-gold mb-2">
                {Math.round(topPartners.reduce((sum, p) => sum + p.distance, 0) / topPartners.length)}km
              </div>
              <div className="text-wine-charcoal/70">Distance moyenne collecte</div>
            </div>
            <div className="text-center p-6 bg-gradient-subtle rounded-xl border border-wine-green/10">
              <div className="text-2xl font-bold text-wine-green mb-2">
                {(topPartners.reduce((sum, p) => sum + p.volume, 0) * 0.28 * 0.7 / 1000).toFixed(1)}ML
              </div>
              <div className="text-wine-charcoal/70">Production SAF potentielle</div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Implementation Timeline */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Planification Mise en Œuvre
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Roadmap et étapes clés du projet
          </p>
        </div>
        <ImplementationTimeline />
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Contact Section */}
      <section className="mb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Rejoindre le Réseau
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Devenir partenaire et construire l'avenir SAF ensemble
          </p>
        </div>
        <ContactIntegration />
      </section>
    </div>
  );
};

export default PartnershipsTab;