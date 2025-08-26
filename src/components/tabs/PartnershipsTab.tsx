import PartnershipOpportunities from "../PartnershipOpportunities";
import StakeholderBenefits from "../StakeholderBenefits";

const PartnershipsTab = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Partnership Opportunities */}
      <div className="animate-fade-in">
        <PartnershipOpportunities />
      </div>
      
      {/* Stakeholder Benefits */}
      <div className="animate-fade-in">
        <StakeholderBenefits />
      </div>

      {/* Partnership Framework */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 animate-fade-in">
        <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">
          Modèle de Partenariat Intégré
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Partnership Structure */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-wine-burgundy">Structure Partenariale</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-burgundy">
                <div className="font-bold text-wine-charcoal mb-1">Joint-Venture SAF Languedoc</div>
                <div className="text-sm text-wine-charcoal/70">Consortium producteurs viticoles + industriels SAF</div>
                <div className="text-xs text-wine-charcoal/50 mt-2">Gouvernance partagée, risques mutualisés</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-gold">
                <div className="font-bold text-wine-charcoal mb-1">Contrats d'Approvisionnement</div>
                <div className="text-sm text-wine-charcoal/70">15-20 ans, prix indexés, volumes garantis</div>
                <div className="text-xs text-wine-charcoal/50 mt-2">Sécurisation financière long terme</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-green">
                <div className="font-bold text-wine-charcoal mb-1">Pacte Territorial</div>
                <div className="text-sm text-wine-charcoal/70">Région, départements, intercommunalités</div>
                <div className="text-xs text-wine-charcoal/50 mt-2">Soutien réglementaire et fiscal</div>
              </div>
            </div>
          </div>

          {/* Value Distribution */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-wine-gold">Répartition de la Valeur</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-wine-charcoal">Producteurs Viticoles</span>
                  <span className="text-wine-burgundy font-bold">35%</span>
                </div>
                <div className="text-sm text-wine-charcoal/70">€35M/an revenus additionnels collectifs</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-wine-charcoal">Industriels SAF</span>
                  <span className="text-wine-gold font-bold">40%</span>
                </div>
                <div className="text-sm text-wine-charcoal/70">€40M/an marge opérationnelle</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-wine-charcoal">Territoire & Services</span>
                  <span className="text-wine-green font-bold">25%</span>
                </div>
                <div className="text-sm text-wine-charcoal/70">€25M/an retombées économiques locales</div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Roadmap */}
        <div className="bg-wine-cream/10 rounded-lg p-6">
          <h4 className="text-lg font-bold text-wine-charcoal mb-4">Feuille de Route Partenariale</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-bold text-wine-burgundy mb-2">Phase 1 - Constitution</div>
              <ul className="text-sm text-wine-charcoal/70 space-y-1">
                <li>• Signature Memorandum of Understanding</li>
                <li>• Due diligence technique et financière</li>
                <li>• Structuration juridique Joint-Venture</li>
                <li>• Premiers contrats d'approvisionnement</li>
              </ul>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-bold text-wine-gold mb-2">Phase 2 - Développement</div>
              <ul className="text-sm text-wine-charcoal/70 space-y-1">
                <li>• Levée de fonds série A (€50M)</li>
                <li>• Permis de construire installations</li>
                <li>• Certification ISCC-EU supply chain</li>
                <li>• Recrutement équipes opérationnelles</li>
              </ul>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-bold text-wine-green mb-2">Phase 3 - Exploitation</div>
              <ul className="text-sm text-wine-charcoal/70 space-y-1">
                <li>• Mise en service unité pilote</li>
                <li>• Montée en charge progressive</li>
                <li>• Optimisation yield et qualité</li>
                <li>• Expansion réseau partenaires</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipsTab;