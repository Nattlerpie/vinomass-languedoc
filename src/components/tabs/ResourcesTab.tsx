import InfrastructureOverview from "../InfrastructureOverview";
import SAFOpportunities from "../SAFOpportunities";
import BiomassBreakdownChart from "../BiomassBreakdownChart";
import InteractiveMap from "../InteractiveMap";
import SeasonalTimeline from "../SeasonalTimeline";
import EnhancedValoorizationMethods from "../EnhancedValoorizationMethods";

const ResourcesTab = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Interactive Map */}
      <div className="animate-fade-in">
        <InteractiveMap />
      </div>

      {/* Biomass Breakdown Chart */}
      <div className="animate-fade-in">
        <BiomassBreakdownChart />
      </div>

      {/* Seasonal Timeline */}
      <div className="animate-fade-in">
        <SeasonalTimeline />
      </div>

      {/* Enhanced Valorization Methods */}
      <div className="animate-fade-in">
        <EnhancedValoorizationMethods />
      </div>

      {/* SAF Opportunities */}
      <div className="animate-fade-in">
        <SAFOpportunities />
      </div>
      
      {/* Infrastructure Overview */}
      <div className="animate-fade-in">
        <InfrastructureOverview />
      </div>

      {/* Resource Availability Summary */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 animate-fade-in">
        <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">
          Synthèse des Ressources Biomasse Disponibles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border border-wine-burgundy/10 hover:scale-105 transition-transform duration-300">
            <div className="text-2xl font-bold text-wine-burgundy mb-2">266 000t</div>
            <div className="text-sm text-wine-charcoal/70">Marc de raisin annuel</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">Saison septembre-novembre</div>
          </div>
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border border-wine-gold/10 hover:scale-105 transition-transform duration-300">
            <div className="text-2xl font-bold text-wine-gold mb-2">48 000t</div>
            <div className="text-sm text-wine-charcoal/70">Sous-produits liquides</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">Lies, bourbes, eaux de process</div>
          </div>
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border border-wine-green/10 hover:scale-105 transition-transform duration-300">
            <div className="text-2xl font-bold text-wine-green mb-2">45 000t</div>
            <div className="text-sm text-wine-charcoal/70">Bois de taille</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">Disponible toute l'année</div>
          </div>
          <div className="text-center p-6 bg-gradient-subtle rounded-lg border border-wine-charcoal/10 hover:scale-105 transition-transform duration-300">
            <div className="text-2xl font-bold text-wine-charcoal mb-2">48 000t</div>
            <div className="text-sm text-wine-charcoal/70">Autres résidus</div>
            <div className="text-xs text-wine-charcoal/50 mt-2">Sarments, rafles, etc.</div>
          </div>
        </div>

        {/* Regional Positioning */}
        <div className="bg-wine-cream/10 rounded-lg p-6">
          <h4 className="text-lg font-bold text-wine-charcoal mb-4">Positionnement Régional</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-semibold text-wine-burgundy mb-1">Leadership National</div>
              <div className="text-wine-charcoal/70">38% de la production viticole française</div>
              <div className="text-xs text-wine-charcoal/50 mt-2">407 000 tonnes biomasse totale</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-semibold text-wine-gold mb-1">Potentiel SAF</div>
              <div className="text-wine-charcoal/70">66.5M litres SAF potentiels</div>
              <div className="text-xs text-wine-charcoal/50 mt-2">€84M de valeur ajoutée</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <div className="font-semibold text-wine-green mb-1">Impact Environnemental</div>
              <div className="text-wine-charcoal/70">166 000 tonnes CO₂ évitées</div>
              <div className="text-xs text-wine-charcoal/50 mt-2">vs carburant conventionnel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;