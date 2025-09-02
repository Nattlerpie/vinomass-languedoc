import TechnicalMethodology from "../TechnicalMethodology";
import RegulatoryCompliance from "../RegulatoryCompliance";
import AcademicReferences from "../AcademicReferences";

const DataTab = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Methodology Focus */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Données et Méthodologie
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            Sources certifiées et validation scientifique des calculs
          </p>
        </div>
        
        {/* Key Data Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Données Clés Validées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">266,000t</div>
              <div className="text-sm text-blue-600">Marc de raisin/an</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">280L</div>
              <div className="text-sm text-blue-600">SAF/tonne marc</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">70%</div>
              <div className="text-sm text-blue-600">Efficacité ATJ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">€1.22</div>
              <div className="text-sm text-blue-600">Prix SAF/litre</div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Methodology & Compliance */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Méthodologie et Conformité
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Approche technique et cadre réglementaire
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="space-y-6">
            <TechnicalMethodology />
          </div>
          <div className="space-y-6">
            <RegulatoryCompliance />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* References & Methodology Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Références et Méthodologie
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Documentation scientifique et validation des données
          </p>
        </div>
        
        <div className="space-y-12">
          <div className="w-full">
            <AcademicReferences />
          </div>

          {/* Methodology Detail */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-elegant border border-wine-cream/30">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-wine-charcoal mb-4">
                Méthodologie et Sources de Données
              </h3>
              <p className="text-lg text-wine-charcoal/70">
                Validation scientifique et fiabilité des informations
              </p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
              {/* Data Collection */}
              <div className="space-y-8">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-wine-burgundy mb-6">Collecte des Données</h4>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-burgundy">
                    <div className="text-xl font-bold text-wine-charcoal mb-2">Agreste - Ministère Agriculture</div>
                    <div className="text-wine-charcoal/70 mb-2">Statistiques officielles viticulture française</div>
                    <div className="text-sm text-wine-charcoal/50">Surfaces, productions, rendements 2023</div>
                  </div>
                  <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-gold">
                    <div className="text-xl font-bold text-wine-charcoal mb-2">OIV - Organisation Internationale</div>
                    <div className="text-wine-charcoal/70 mb-2">Données mondiales vigne et vin</div>
                    <div className="text-sm text-wine-charcoal/50">Benchmark international, tendances marché</div>
                  </div>
                  <div className="p-6 bg-gradient-subtle rounded-xl border-l-4 border-wine-green">
                    <div className="text-xl font-bold text-wine-charcoal mb-2">IFV - Institut Français</div>
                    <div className="text-wine-charcoal/70 mb-2">Recherche et développement vitivinicole</div>
                    <div className="text-sm text-wine-charcoal/50">Innovation, durabilité, valorisation</div>
                  </div>
                </div>
              </div>

              {/* Analysis Methods */}
              <div className="space-y-8">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-wine-gold mb-6">Méthodes d'Analyse</h4>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                    <div className="text-xl font-bold text-wine-charcoal mb-2">Analyse Géospatiale</div>
                    <div className="text-wine-charcoal/70">Cartographie parcellaire, optimisation logistique</div>
                  </div>
                  <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                    <div className="text-xl font-bold text-wine-charcoal mb-2">Modélisation Économique</div>
                    <div className="text-wine-charcoal/70">ROI, sensibilité, scénarios de marché</div>
                  </div>
                  <div className="p-6 bg-gradient-subtle rounded-xl border border-wine-gold/20">
                    <div className="text-xl font-bold text-wine-charcoal mb-2">Analyse de Cycle de Vie</div>
                    <div className="text-wine-charcoal/70">Impact environnemental, bilan carbone</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Quality & Assumptions */}
            <div className="bg-wine-cream/10 rounded-xl p-8 mb-12">
              <h4 className="text-2xl font-bold text-wine-charcoal mb-8 text-center">Qualité des Données et Hypothèses</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h5 className="text-xl font-semibold text-wine-burgundy mb-4">Fiabilité des Sources</h5>
                  <div className="space-y-3">
                    <div className="p-4 bg-white/70 rounded-lg">
                      <span className="font-bold text-wine-charcoal">Agreste:</span>
                      <span className="text-wine-charcoal/70 ml-2">Données officielles, recensement exhaustif</span>
                    </div>
                    <div className="p-4 bg-white/70 rounded-lg">
                      <span className="font-bold text-wine-charcoal">OIV:</span>
                      <span className="text-wine-charcoal/70 ml-2">Standards internationaux, validation croisée</span>
                    </div>
                    <div className="p-4 bg-white/70 rounded-lg">
                      <span className="font-bold text-wine-charcoal">IFV:</span>
                      <span className="text-wine-charcoal/70 ml-2">Expertise technique, données expérimentales</span>
                    </div>
                    <div className="p-4 bg-white/70 rounded-lg">
                      <span className="font-bold text-wine-charcoal">Professionnels:</span>
                      <span className="text-wine-charcoal/70 ml-2">Remontées terrain, validation opérationnelle</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="text-xl font-semibold text-wine-gold mb-4">Hypothèses Clés Validées</h5>
                  <div className="space-y-3">
                    <div className="p-4 bg-white/70 rounded-lg">
                      <span className="font-bold text-wine-charcoal">Rendement SAF:</span>
                      <span className="text-wine-charcoal/70 ml-2">280L SAF/tonne marc (données réelles)</span>
                    </div>
                    <div className="p-4 bg-white/70 rounded-lg">
                      <span className="font-bold text-wine-charcoal">Efficacité ATJ:</span>
                      <span className="text-wine-charcoal/70 ml-2">70% alcohol-to-jet (validé pilote)</span>
                    </div>
                    <div className="p-4 bg-white/70 rounded-lg">
                      <span className="font-bold text-wine-charcoal">Prix SAF:</span>
                      <span className="text-wine-charcoal/70 ml-2">€1.22/L (marché européen 2023)</span>
                    </div>
                    <div className="p-4 bg-white/70 rounded-lg">
                      <span className="font-bold text-wine-charcoal">Collecte:</span>
                      <span className="text-wine-charcoal/70 ml-2">80% du gisement (€30-50/tonne)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-wine-burgundy/5 border border-wine-burgundy/20 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-wine-burgundy mb-6 text-center">Avertissement et Limites</h4>
              <div className="space-y-4 text-wine-charcoal/70">
                <div className="p-4 bg-white/50 rounded-lg">
                  <strong className="text-wine-charcoal">Nature prospective:</strong> Les projections économiques sont basées sur les conditions 
                  de marché actuelles et peuvent évoluer significativement.
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <strong className="text-wine-charcoal">Validation requise:</strong> Toute décision d'investissement doit faire l'objet 
                  d'études de faisabilité détaillées et actualisées.
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <strong className="text-wine-charcoal">Réglementations:</strong> L'évolution du cadre réglementaire SAF peut impacter 
                  les hypothèses de rentabilité présentées.
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <strong className="text-wine-charcoal">Mise à jour:</strong> Données actualisées au 31 décembre 2023, révision 
                  annuelle recommandée.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Footer */}
      <section className="mb-8">
        <div className="text-center space-y-6">
          <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl px-8 lg:px-12 py-8 shadow-elegant border border-wine-cream/30">
            <h3 className="text-xl font-bold text-wine-charcoal mb-4">
              Sources des Données
            </h3>
            <p className="text-wine-charcoal/70 leading-relaxed">
              Ministère de l'Agriculture français (Agreste), Organisation Internationale de la Vigne et du Vin (OIV), 
              Institut Français de la Vigne et du Vin (IFV), FranceAgriMer, Interprofessions viticoles régionales
            </p>
          </div>
          
          <div className="inline-flex items-center space-x-6 bg-wine-cream/20 backdrop-blur-sm rounded-full px-8 py-4 border border-wine-cream/30">
            <div className="w-4 h-4 rounded-full bg-wine-burgundy"></div>
            <span className="text-lg font-semibold text-wine-charcoal">
              Données actualisées - Région Languedoc-Roussillon 2023
            </span>
            <div className="w-4 h-4 rounded-full bg-wine-gold"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataTab;