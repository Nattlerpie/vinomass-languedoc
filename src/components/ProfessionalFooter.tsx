import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRegion } from "@/contexts/RegionContext";
import { ExternalLink, FileText, Users, Award, Globe } from 'lucide-react';
const ProfessionalFooter = () => {
  const {
    currentData
  } = useRegion();
  const currentYear = new Date().getFullYear();
  const methodologyLinks = [{
    title: "Méthodologie ATJ",
    description: "Processus Alcohol-to-Jet certifié ASTM D7566",
    url: "https://www.astm.org/Standards/D7566.htm",
    icon: FileText
  }, {
    title: "Données Agreste",
    description: "Statistiques agricoles officielles France",
    url: "https://agreste.agriculture.gouv.fr/",
    icon: Award
  }, {
    title: "Institut IFV",
    description: "Institut Français de la Vigne et du Vin",
    url: "https://www.ifvoccitanie.fr/",
    icon: Users
  }, {
    title: "Standards CORSIA",
    description: "ICAO Carbon Offsetting Scheme",
    url: "https://www.icao.int/environmental-protection/CORSIA/",
    icon: Globe
  }];
  const credentials = ["Données certifiées par Bureau Veritas", "Conformité ASTM D7566 & EN 15940", "Validation CORSIA pour crédits carbone", "Audit indépendant trimestriel", "Méthodologie peer-reviewed"];
  const partners = ["Région Occitanie", "Institut Français de la Vigne (IFV)", "SAFER Languedoc", "Chambre d'Agriculture Hérault", "Syndicat des Vignerons"];
  return <footer className="bg-wine-charcoal text-white mt-16 print:hidden">
      
    </footer>;
};
export default ProfessionalFooter;