import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, FileText, Users, Award, Globe } from 'lucide-react';

const ProfessionalFooter = () => {
  const { currentData } = useRegion();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  // ✅ FIX: Use correct property names and translations
  const methodologyLinks = [
    {
      title: t('methodology.atj.title'),
      description: t('methodology.atj.description'),
      url: "https://www.astm.org/Standards/D7566.htm",
      icon: FileText
    },
    {
      title: t('methodology.agreste.title'),
      description: t('methodology.agreste.description'),
      url: "https://agreste.agriculture.gouv.fr/",
      icon: Award
    },
    {
      title: t('methodology.ifv.title'),
      description: t('methodology.ifv.description'),
      url: "https://www.ifvoccitanie.fr/",
      icon: Users
    },
    {
      title: t('methodology.corsia.title'),
      description: t('methodology.corsia.description'),
      url: "https://www.icao.int/environmental-protection/CORSIA/",
      icon: Globe
    }
  ];

  const credentials = [
    t('credentials.bureau.veritas'),
    t('credentials.astm.compliance'),
    t('credentials.corsia.validation'),
    t('credentials.quarterly.audit'),
    t('credentials.peer.reviewed')
  ];

  // ✅ FIX: Dynamic partners based on region
  const partners = currentData.id === 'languedoc' ? [
    t('partners.region.occitanie'),
    t('partners.ifv'),
    t('partners.safer.languedoc'),
    t('partners.chamber.herault'),
    t('partners.vignerons.union')
  ] : [
    t('partners.region.grand.est'),
    t('partners.ifv'),
    t('partners.safer.champagne'),
    t('partners.chamber.champagne'),
    t('partners.champagne.union')
  ];

  const dataSources = [
    t('data.sources.agreste'),
    t('data.sources.ifv'),
    t('data.sources.oiv'),
    t('data.sources.aviation.fuel')
  ];

  const scientificValidation = [
    t('validation.peer.review'),
    t('validation.bureau.veritas'),
    t('validation.iso.compliance'),
    t('validation.carbon.audit')
  ];

  const internationalStandards = [
    t('standards.astm.d7566'),
    t('standards.corsia.icao'),
    t('standards.red.ii'),
    t('standards.iscc.eu')
  ];

  return (
    <footer className="bg-wine-charcoal text-white mt-16 print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Project Info */}
          <div>
            <h3 className="text-xl font-bold text-wine-cream mb-4">
              {t('header.title').replace('{region}', currentData.name)}
            </h3>
            <p className="text-wine-cream/80 text-sm mb-4">
              {t('footer.project.description')}
            </p>
            <div className="space-y-2">
              <Badge className="bg-wine-burgundy/20 text-wine-burgundy border-wine-burgundy/30">
                {/* ✅ FIX: Use correct property name */}
                {(currentData.annualPomace || 0).toLocaleString()} {t('tonnes.an')}
              </Badge>
              <Badge className="bg-wine-green/20 text-wine-green border-wine-green/30">
                €{currentData.revenue}M {t('footer.revenues')}
              </Badge>
              <Badge className="bg-wine-gold/20 text-wine-gold border-wine-gold/30">
                {(currentData.co2Reduction / 1000).toFixed(1)}kt {t('footer.co2.avoided')}
              </Badge>
            </div>
          </div>

          {/* Methodology & Standards */}
          <div>
            <h4 className="text-lg font-semibold text-wine-cream mb-4">
              {t('footer.methodology.standards')}
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
              {t('footer.certifications.audits')}
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
              {t('footer.institutional.partners')}
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
                  {t('footer.primary.data.sources')}
                </h5>
                <div className="text-xs text-wine-cream/70 space-y-1">
                  {dataSources.map((source, index) => (
                    <div key={index}>• {source}</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-wine-cream/10 border-wine-cream/20">
              <CardContent className="p-4">
                <h5 className="font-semibold text-wine-cream mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-wine-burgundy" />
                  {t('footer.scientific.validation')}
                </h5>
                <div className="text-xs text-wine-cream/70 space-y-1">
                  {scientificValidation.map((validation, index) => (
                    <div key={index}>• {validation}</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-wine-cream/10 border-wine-cream/20">
              <CardContent className="p-4">
                <h5 className="font-semibold text-wine-cream mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-wine-green" />
                  {t('footer.international.standards')}
                </h5>
                <div className="text-xs text-wine-cream/70 space-y-1">
                  {internationalStandards.map((standard, index) => (
                    <div key={index}>• {standard}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-wine-cream/20 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-wine-cream/60">
          <div className="mb-4 md:mb-0">
            <div className="mb-1">
              © {currentYear} {t('footer.copyright', { region: currentData.name })}
            </div>
            <div className="text-xs">
              {t('footer.data.updated')} | {t('footer.next.revision')}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-wine-cream transition-colors">
              {t('footer.legal.notices')}
            </a>
            <span>•</span>
            <a href="#" className="hover:text-wine-cream transition-colors">
              {t('footer.data.protection')}
            </a>
            <span>•</span>
            <a href="#" className="hover:text-wine-cream transition-colors">
              {t('footer.terms.of.use')}
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-wine-burgundy/20 border border-wine-burgundy/30 rounded-lg text-xs text-wine-cream/70">
          <p>
            <strong>{t('footer.disclaimer.title')}</strong> {t('footer.disclaimer.text')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
