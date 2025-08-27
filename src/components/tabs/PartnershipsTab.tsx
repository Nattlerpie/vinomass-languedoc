import PartnershipMatrix from "../PartnershipMatrix";
import ImplementationTimeline from "../ImplementationTimeline";
import StakeholderBenefitsAnalysis from "../StakeholderBenefitsAnalysis";
import PartnershipMatcher from "../PartnershipMatcher";
import ContactIntegration from "../ContactIntegration";

const PartnershipsTab = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Partnership Opportunity Matrix */}
      <div className="animate-fade-in">
        <PartnershipMatrix />
      </div>
      
      {/* Partnership Matching Algorithm */}
      <div className="animate-fade-in">
        <PartnershipMatcher />
      </div>
      
      {/* Implementation Timeline */}
      <div className="animate-fade-in">
        <ImplementationTimeline />
      </div>
      
      {/* Stakeholder Benefits Analysis */}
      <div className="animate-fade-in">
        <StakeholderBenefitsAnalysis />
      </div>
      
      {/* Contact Integration */}
      <div className="animate-fade-in">
        <ContactIntegration />
      </div>
    </div>
  );
};

export default PartnershipsTab;