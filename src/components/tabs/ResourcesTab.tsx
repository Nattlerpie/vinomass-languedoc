import InfrastructureOverview from "../InfrastructureOverview";
import SAFOpportunities from "../SAFOpportunities";

const ResourcesTab = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* SAF Opportunities */}
      <div className="animate-fade-in">
        <SAFOpportunities />
      </div>
      
      {/* Infrastructure Overview */}
      <div className="animate-fade-in">
        <InfrastructureOverview />
      </div>

      {/* Resource Availability */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 animate-fade-in">
        <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">
          Disponibilité des Ressources Biomasse
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border border-wine-burgundy/10">
            <div className="text-2xl font-bold text-wine-burgundy mb-2">266 000t</div>
            <div className="text-sm text-wine-charcoal/70">Marc de raisin annuel</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">Saison septembre-novembre</div>
          </div>
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border border-wine-gold/10">
            <div className="text-2xl font-bold text-wine-gold mb-2">480 000hl</div>
            <div className="text-sm text-wine-charcoal/70">Sous-produits liquides</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">Lies, bourbes, eaux de process</div>
          </div>
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border border-wine-green/10">
            <div className="text-2xl font-bold text-wine-green mb-2">45 000t</div>
            <div className="text-sm text-wine-charcoal/70">Bois de taille</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">Disponible toute l'année</div>
          </div>
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border border-wine-charcoal/10">
            <div className="text-2xl font-bold text-wine-charcoal mb-2">12 000t</div>
            <div className="text-sm text-wine-charcoal/70">Autres résidus</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">Rafles, bourbes, etc.</div>
          </div>
        </div>

        {/* Seasonal Distribution */}
        <div className="bg-wine-cream/10 rounded-lg p-6">
          <h4 className="text-lg font-bold text-wine-charcoal mb-4">Répartition Saisonnière</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-semibold text-wine-burgundy mb-1">Septembre - Novembre</div>
              <div className="text-wine-charcoal/70">85% du marc de raisin disponible</div>
              <div className="text-xs text-wine-charcoal/50 mt-2">Pic de disponibilité ressources</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-semibold text-wine-gold mb-1">Décembre - Mars</div>
              <div className="text-wine-charcoal/70">Processing des lies et bourbes</div>
              <div className="text-xs text-wine-charcoal/50 mt-2">Stabilisation et clarification</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-semibold text-wine-green mb-1">Avril - Août</div>
              <div className="text-wine-charcoal/70">Maintenance et préparation</div>
              <div className="text-xs text-wine-charcoal/50 mt-2">Optimisation des équipements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;