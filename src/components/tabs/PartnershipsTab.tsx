import PartnershipMatrix from "../PartnershipMatrix";
import ImplementationTimeline from "../ImplementationTimeline";
import StakeholderBenefitsAnalysis from "../StakeholderBenefitsAnalysis";
import PartnershipMatcher from "../PartnershipMatcher";
import ContactIntegration from "../ContactIntegration";

const PartnershipsTab = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Partnership Matrix */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-wine-charcoal mb-4">
            Partenariats Stratégiques
          </h1>
          <p className="text-xl text-wine-charcoal/70 max-w-3xl mx-auto">
            Opportunités de collaboration et mise en réseau
          </p>
        </div>
        
        <div className="mb-8">
          <PartnershipMatrix />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Matching & Analysis Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Analyse et Correspondance
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Algorithme de matching et analyse des bénéfices
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="space-y-6">
            <PartnershipMatcher />
          </div>
          <div className="space-y-6">
            <StakeholderBenefitsAnalysis />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-wine-cream/30 mb-16"></div>

      {/* Implementation & Contact Section */}
      <section className="mb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-wine-charcoal mb-4">
            Mise en Œuvre
          </h2>
          <p className="text-lg text-wine-charcoal/70">
            Planification et prochaines étapes
          </p>
        </div>
        
        <div className="space-y-12">
          <div className="w-full">
            <ImplementationTimeline />
          </div>
          
          <div className="w-full">
            <ContactIntegration />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipsTab;