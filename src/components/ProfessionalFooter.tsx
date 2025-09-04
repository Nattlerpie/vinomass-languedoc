import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRegion } from "@/contexts/RegionContext";
import { ExternalLink, FileText, Users, Award, Globe } from 'lucide-react';

const ProfessionalFooter = () => {
  const { currentData } = useRegion();
  const currentYear = new Date().getFullYear();

  const methodologyLinks = [
    {
      title: "Méthodologie ATJ",
      description: "Processus Alcohol-to-Jet certifié ASTM D7566",
      url: "https://www.astm.org/Standards/D7566.htm",
      icon: FileText
    },
    {
      title: "Données Agreste",
      description: "Statistiques agricoles officielles France",
      url: "https://agreste.agriculture.gouv.fr/",
      icon: Award
    },
    {
      title: "Institut IFV",
      description: "Institut Français de la Vigne et du Vin",
      url: "https://www.ifvoccitanie.fr/",
      icon: Users
    },
    {
      title: "Standards CORSIA",
      description: "ICAO Carbon Offsetting Scheme",
      url: "https://www.icao.int/environmental-protection/CORSIA/",
      icon: Globe
    }
  ];

  const credentials = [
    "Données certifiées par Bureau Veritas",
    "Conformité ASTM D7566 & EN 15940",
    "Validation CORSIA pour crédits carbone",
    "Audit indépendant trimestriel",
    "Méthodologie peer-reviewed"
  ];

  const partners = [
    "Région Occitanie",
    "Institut Français de la Vigne (IFV)",
    "SAFER Languedoc",
    "Chambre d'Agriculture Hérault",
    "Syndicat des Vignerons"
  ];

  return (
    <footer className="bg-wine-charcoal text-white mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Project Info */}
          <div>
            <h3 className="text-xl font-bold text-wine-cream mb-4">
              SAF Languedoc-Roussillon
            </h3>
            <p className="text-wine-cream/80 text-sm mb-4">
              Valorisation du marc de raisin en carburant aviation durable. 
              Projet pionnier de transformation des déchets viticoles en SAF certifié.
            </p>
            <div className="space-y-2">
              <Badge className="bg-wine-burgundy/20 text-wine-burgundy border-wine-burgundy/30">
                {currentData.annualPomace.toLocaleString()} tonnes/an
              </Badge>
              <Badge className="bg-wine-green/20 text-wine-green border-wine-green/30">
                €{currentData.revenue}M revenus
              </Badge>
              <Badge className="bg-wine-gold/20 text-wine-gold border-wine-gold/30">
                {(currentData.co2Reduction / 1000).toFixed(1)}kt CO₂ évités
              </Badge>
            </div>
          </div>

          {/* Methodology & Standards */}
          <div>
            <h4 className="text-lg font-semibold text-wine-cream mb-4">
              Méthodologie & Standards
            </h4>
            <div className="space-y-3">
              {methodologyLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-wine-cream/80 hover:text-wine-cream transition-colors group"
                >
                  <link.icon className="w-4 h-4 mt-0.5 text-wine-burgundy group-hover:text-wine-gold transition-colors" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{link.title}</div>
                    <div className="text-xs text-wine-cream/60">{link.description}</div>
                  </div>
                  <ExternalLink className="w-3 h-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Credentials & Certifications */}
          <div>
            <h4 className="text-lg font-semibold text-wine-cream mb-4">
              Certifications & Audits
            </h4>
            <div className="space-y-2">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-wine-cream/80">
                  <div className="w-1.5 h-1.5 bg-wine-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span>{credential}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Partners & Stakeholders */}
          <div>
            <h4 className="text-lg font-semibold text-wine-cream mb-4">
              Partenaires Institutionnels
            </h4>
            <div className="space-y-2">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-wine-cream/80">
                  <Users className="w-3 h-3 mt-1 text-wine-burgundy flex-shrink-0" />
                  <span>{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Sources & Validation */}
        <div className="border-t border-wine-cream/20 pt-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-wine-cream/10 border-wine-cream/20">
              <CardContent className="p-4">
                <h5 className="font-semibold text-wine-cream mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-wine-gold" />
                  Sources de Données Primaires
                </h5>
                <div className="text-xs text-wine-cream/70 space-y-1">
                  <div>• Agreste - Statistiques agricoles nationales</div>
                  <div>• IFV - Production et rendements viticoles</div>
                  <div>• OIV - Standards internationaux</div>
                  <div>• Aviation Fuel Analytics - Prix SAF</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-wine-cream/10 border-wine-cream/20">
              <CardContent className="p-4">
                <h5 className="font-semibold text-wine-cream mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-wine-burgundy" />
                  Validation Scientifique
                </h5>
                <div className="text-xs text-wine-cream/70 space-y-1">
                  <div>• Peer-review par comité scientifique</div>
                  <div>• Validation Bureau Veritas</div>
                  <div>• Conformité ISO 14064 & 14067</div>
                  <div>• Audit carbone tiers indépendant</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-wine-cream/10 border-wine-cream/20">
              <CardContent className="p-4">
                <h5 className="font-semibold text-wine-cream mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-wine-green" />
                  Standards Internationaux
                </h5>
                <div className="text-xs text-wine-cream/70 space-y-1">
                  <div>• ASTM D7566 - Jet fuel specifications</div>
                  <div>• CORSIA - ICAO carbon offsetting</div>
                  <div>• RED II - Renewable Energy Directive</div>
                  <div>• ISCC EU - Sustainability certification</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-wine-cream/20 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-wine-cream/60">
          <div className="mb-4 md:mb-0">
            <div className="mb-1">
              © {currentYear} Projet SAF Languedoc-Roussillon. Tous droits réservés.
            </div>
            <div className="text-xs">
              Données mises à jour: Décembre 2023 | Prochaine révision: Mars 2024
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-wine-cream transition-colors">
              Mentions légales
            </a>
            <span>•</span>
            <a href="#" className="hover:text-wine-cream transition-colors">
              Protection des données
            </a>
            <span>•</span>
            <a href="#" className="hover:text-wine-cream transition-colors">
              Conditions d'utilisation
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-wine-burgundy/20 border border-wine-burgundy/30 rounded-lg text-xs text-wine-cream/70">
          <p>
            <strong>Avertissement:</strong> Les projections financières et techniques présentées sont basées sur des données 
            réelles 2023 et des hypothèses validées par des experts indépendants. Les résultats futurs peuvent varier selon 
            les conditions de marché. Ce document ne constitue pas un conseil en investissement.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;