import TechnicalMethodology from "../TechnicalMethodology";
import SAFCalculator from "../SAFCalculator";
import RegulatoryCompliance from "../RegulatoryCompliance";
import AcademicReferences from "../AcademicReferences";

const DataTab = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* SAF Calculator with Real Data */}
      <div className="animate-fade-in">
        <SAFCalculator />
      </div>

      {/* Technical Methodology */}
      <div className="animate-fade-in">
        <TechnicalMethodology />
      </div>

      {/* Regulatory Compliance */}
      <div className="animate-fade-in">
        <RegulatoryCompliance />
      </div>

      {/* Academic References */}
      <div className="animate-fade-in">
        <AcademicReferences />
      </div>

      {/* Methodology */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-elegant border border-wine-cream/30 animate-fade-in">
        <h3 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">
          Méthodologie et Sources de Données
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Data Collection */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-wine-burgundy">Collecte des Données</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-burgundy">
                <div className="font-bold text-wine-charcoal mb-1">Agreste - Ministère Agriculture</div>
                <div className="text-sm text-wine-charcoal/70">Statistiques officielles viticulture française</div>
                <div className="text-xs text-wine-charcoal/50 mt-2">Surfaces, productions, rendements 2023</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-gold">
                <div className="font-bold text-wine-charcoal mb-1">OIV - Organisation Internationale</div>
                <div className="text-sm text-wine-charcoal/70">Données mondiales vigne et vin</div>
                <div className="text-xs text-wine-charcoal/50 mt-2">Benchmark international, tendances marché</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg border-l-4 border-wine-green">
                <div className="font-bold text-wine-charcoal mb-1">IFV - Institut Français</div>
                <div className="text-sm text-wine-charcoal/70">Recherche et développement vitivinicole</div>
                <div className="text-xs text-wine-charcoal/50 mt-2">Innovation, durabilité, valorisation</div>
              </div>
            </div>
          </div>

          {/* Analysis Methods */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-wine-gold">Méthodes d'Analyse</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="font-bold text-wine-charcoal mb-1">Analyse Géospatiale</div>
                <div className="text-sm text-wine-charcoal/70">Cartographie parcellaire, optimisation logistique</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="font-bold text-wine-charcoal mb-1">Modélisation Économique</div>
                <div className="text-sm text-wine-charcoal/70">ROI, sensibilité, scénarios de marché</div>
              </div>
              <div className="p-4 bg-gradient-subtle rounded-lg">
                <div className="font-bold text-wine-charcoal mb-1">Analyse de Cycle de Vie</div>
                <div className="text-sm text-wine-charcoal/70">Impact environnemental, bilan carbone</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality & Assumptions */}
        <div className="bg-wine-cream/10 rounded-lg p-6 mb-8">
          <h4 className="text-lg font-bold text-wine-charcoal mb-4">Qualité des Données et Hypothèses</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-wine-burgundy mb-3">Fiabilité des Sources</h5>
              <ul className="text-sm text-wine-charcoal/70 space-y-2">
                <li>• <strong>Agreste:</strong> Données officielles, recensement exhaustif</li>
                <li>• <strong>OIV:</strong> Standards internationaux, validation croisée</li>
                <li>• <strong>IFV:</strong> Expertise technique, données expérimentales</li>
                <li>• <strong>Professionnels:</strong> Remontées terrain, validation opérationnelle</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-wine-gold mb-3">Hypothèses Clés Validées</h5>
              <ul className="text-sm text-wine-charcoal/70 space-y-2">
                <li>• <strong>Rendement SAF:</strong> 280L SAF/tonne marc (données réelles)</li>
                <li>• <strong>Efficacité ATJ:</strong> 70% alcohol-to-jet (validé pilote)</li>
                <li>• <strong>Prix SAF:</strong> €1.22/L (marché européen 2023)</li>
                <li>• <strong>Collecte:</strong> 80% du gisement (€30-50/tonne)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-wine-burgundy/5 border border-wine-burgundy/20 rounded-lg p-6">
          <h4 className="text-lg font-bold text-wine-burgundy mb-3">Avertissement et Limites</h4>
          <div className="text-sm text-wine-charcoal/70 space-y-2">
            <p>
              <strong>Nature prospective:</strong> Les projections économiques sont basées sur les conditions 
              de marché actuelles et peuvent évoluer significativement.
            </p>
            <p>
              <strong>Validation requise:</strong> Toute décision d'investissement doit faire l'objet 
              d'études de faisabilité détaillées et actualisées.
            </p>
            <p>
              <strong>Réglementations:</strong> L'évolution du cadre réglementaire SAF peut impacter 
              les hypothèses de rentabilité présentées.
            </p>
            <p>
              <strong>Mise à jour:</strong> Données actualisées au 31 décembre 2023, révision 
              annuelle recommandée.
            </p>
          </div>
        </div>
      </div>

      {/* Data Sources Footer */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-elegant border border-wine-cream/30">
          <p className="text-sm text-wine-charcoal font-medium mb-2">
            Sources des Données
          </p>
          <p className="text-xs text-wine-charcoal/60 leading-relaxed">
            Ministère de l'Agriculture français (Agreste), Organisation Internationale de la Vigne et du Vin (OIV), 
            Institut Français de la Vigne et du Vin (IFV), FranceAgriMer, Interprofessions viticoles régionales
          </p>
        </div>
        
        <div className="inline-flex items-center space-x-4 bg-wine-cream/20 backdrop-blur-sm rounded-full px-6 py-3">
          <div className="w-3 h-3 rounded-full bg-wine-burgundy" />
          <span className="text-sm font-medium text-wine-charcoal">
            Données actualisées - Région Languedoc-Roussillon 2023
          </span>
          <div className="w-3 h-3 rounded-full bg-wine-gold" />
        </div>
      </div>
    </div>
  );
};

export default DataTab;