import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, CheckCircle, ArrowRight, Download } from "lucide-react";
interface ContactForm {
  type: 'general' | 'partnership' | 'investment' | 'technical';
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  interests: string[];
  message: string;
  timeline: string;
  budget: string;
  preferredContact: 'email' | 'phone' | 'meeting';
}
const ContactIntegration = () => {
  const [activeForm, setActiveForm] = useState<string>('general');
  const [formData, setFormData] = useState<ContactForm>({
    type: 'general',
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    interests: [],
    message: '',
    timeline: '',
    budget: '',
    preferredContact: 'email'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formTypes = [{
    id: 'general',
    title: 'Information Générale',
    description: 'Demandes d\'information sur le projet',
    icon: '📋',
    color: 'wine-charcoal'
  }, {
    id: 'partnership',
    title: 'Partenariat Stratégique',
    description: 'Collaboration et accords commerciaux',
    icon: '🤝',
    color: 'wine-burgundy'
  }, {
    id: 'investment',
    title: 'Opportunité d\'Investissement',
    description: 'Participation financière au projet',
    icon: '💰',
    color: 'wine-gold'
  }, {
    id: 'technical',
    title: 'Support Technique',
    description: 'Questions techniques et faisabilité',
    icon: '🔧',
    color: 'wine-green'
  }];
  const interestOptions = {
    general: ['Étude de faisabilité', 'Timeline du projet', 'Impact environnemental', 'Retombées économiques'],
    partnership: ['Fourniture biomasse', 'Transformation', 'Distribution', 'R&D collaborative'],
    investment: ['Participation capitalistique', 'Financement dette', 'Subventions', 'Crédit carbone'],
    technical: ['Technologie ATJ', 'Certification SAF', 'Logistique', 'Conformité réglementaire']
  };
  const nextSteps = {
    general: ['Envoi de la documentation complète du projet', 'Invitation aux prochaines présentations publiques', 'Mise en relation avec l\'équipe technique'],
    partnership: ['Analyse de compatibilité et potentiel de collaboration', 'Proposition d\'accord de confidentialité (NDA)', 'Organisation d\'une réunion de négociation préliminaire'],
    investment: ['Transmission du business plan détaillé', 'Due diligence et évaluation des risques', 'Structuration de l\'investissement et négociation des termes'],
    technical: ['Évaluation technique approfondie avec nos experts', 'Visite des installations pilotes', 'Proposition d\'accord de collaboration technique']
  };
  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter(i => i !== interest)
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Simulate form submission
    setTimeout(() => {
      // Generate PDF or document with form data
      generateFollowUpDocument();
    }, 1000);
  };
  const generateFollowUpDocument = () => {
    const followUpData = {
      formType: activeForm,
      submissionDate: new Date().toLocaleDateString('fr-FR'),
      contactInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        role: formData.role
      },
      interests: formData.interests,
      message: formData.message,
      nextSteps: nextSteps[activeForm as keyof typeof nextSteps],
      projectDetails: {
        capacity: '250,000 tonnes biomasse/an',
        safProduction: '70M litres/an',
        investment: '€150M',
        jobs: '85 emplois directs',
        co2Reduction: '234kt CO₂/an'
      }
    };
    const blob = new Blob([JSON.stringify(followUpData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atlas-biomasse-suivi-${activeForm}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const resetForm = () => {
    setFormData({
      type: 'general',
      name: '',
      email: '',
      phone: '',
      company: '',
      role: '',
      interests: [],
      message: '',
      timeline: '',
      budget: '',
      preferredContact: 'email'
    });
    setIsSubmitted(false);
  };
  if (isSubmitted) {
    return <Card className="bg-white/95 backdrop-blur-sm border-wine-green/20 shadow-elegant">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-wine-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-wine-charcoal mb-4">
            Demande Envoyée avec Succès !
          </h2>
          <p className="text-wine-charcoal/70 mb-6">
            Merci pour votre intérêt pour le projet Atlas Biomasse Vitivinicole. 
            Notre équipe vous contactera dans les 48 heures.
          </p>

          <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40 mb-6">
            <h3 className="font-semibold text-wine-charcoal mb-4">Prochaines Étapes</h3>
            <div className="space-y-3 text-left">
              {nextSteps[activeForm as keyof typeof nextSteps].map((step, index) => <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-wine-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-wine-charcoal/80">{step}</span>
                </div>)}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={resetForm} variant="outline">
              Nouvelle Demande
            </Button>
            <Button onClick={generateFollowUpDocument} className="gap-2">
              <Download className="w-4 h-4" />
              Télécharger le Suivi
            </Button>
          </div>
        </CardContent>
      </Card>;
  }
  return;
};
export default ContactIntegration;