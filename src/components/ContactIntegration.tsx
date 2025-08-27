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

  const formTypes = [
    {
      id: 'general',
      title: 'Information Générale',
      description: 'Demandes d\'information sur le projet',
      icon: '📋',
      color: 'wine-charcoal'
    },
    {
      id: 'partnership',
      title: 'Partenariat Stratégique',
      description: 'Collaboration et accords commerciaux',
      icon: '🤝',
      color: 'wine-burgundy'
    },
    {
      id: 'investment',
      title: 'Opportunité d\'Investissement',
      description: 'Participation financière au projet',
      icon: '💰',
      color: 'wine-gold'
    },
    {
      id: 'technical',
      title: 'Support Technique',
      description: 'Questions techniques et faisabilité',
      icon: '🔧',
      color: 'wine-green'
    }
  ];

  const interestOptions = {
    general: ['Étude de faisabilité', 'Timeline du projet', 'Impact environnemental', 'Retombées économiques'],
    partnership: ['Fourniture biomasse', 'Transformation', 'Distribution', 'R&D collaborative'],
    investment: ['Participation capitalistique', 'Financement dette', 'Subventions', 'Crédit carbone'],
    technical: ['Technologie ATJ', 'Certification SAF', 'Logistique', 'Conformité réglementaire']
  };

  const nextSteps = {
    general: [
      'Envoi de la documentation complète du projet',
      'Invitation aux prochaines présentations publiques',
      'Mise en relation avec l\'équipe technique'
    ],
    partnership: [
      'Analyse de compatibilité et potentiel de collaboration',
      'Proposition d\'accord de confidentialité (NDA)',
      'Organisation d\'une réunion de négociation préliminaire'
    ],
    investment: [
      'Transmission du business plan détaillé',
      'Due diligence et évaluation des risques',
      'Structuration de l\'investissement et négociation des termes'
    ],
    technical: [
      'Évaluation technique approfondie avec nos experts',
      'Visite des installations pilotes',
      'Proposition d\'accord de collaboration technique'
    ]
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
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

    const blob = new Blob([JSON.stringify(followUpData, null, 2)], { type: 'application/json' });
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
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-wine-green/20 shadow-elegant">
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
              {nextSteps[activeForm as keyof typeof nextSteps].map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-wine-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-wine-charcoal/80">{step}</span>
                </div>
              ))}
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
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Mail className="text-wine-burgundy w-7 h-7" />
          <span className="text-2xl text-wine-charcoal">Contact & Prochaines Étapes</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Form Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {formTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveForm(type.id)}
              className={`p-4 rounded-xl border transition-all text-left ${
                activeForm === type.id
                  ? `border-${type.color} bg-${type.color}/5`
                  : 'border-wine-cream/40 bg-gradient-subtle hover:border-wine-burgundy/30'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <h3 className={`font-semibold mb-1 ${activeForm === type.id ? `text-${type.color}` : 'text-wine-charcoal'}`}>
                {type.title}
              </h3>
              <p className="text-sm text-wine-charcoal/70">{type.description}</p>
            </button>
          ))}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-wine-charcoal">
                Nom complet *
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-wine-charcoal">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-wine-charcoal">
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-wine-charcoal">
                Entreprise/Organisation
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="role" className="text-sm font-medium text-wine-charcoal">
                Fonction/Rôle
              </Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-wine-charcoal">
                Mode de contact préféré
              </Label>
              <Select value={formData.preferredContact} onValueChange={(value: any) => setFormData(prev => ({ ...prev, preferredContact: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Téléphone</SelectItem>
                  <SelectItem value="meeting">Réunion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Specific Fields by Form Type */}
          {(activeForm === 'investment' || activeForm === 'partnership') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="timeline" className="text-sm font-medium text-wine-charcoal">
                  Horizon temporel
                </Label>
                <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immédiat (0-3 mois)</SelectItem>
                    <SelectItem value="short">Court terme (3-12 mois)</SelectItem>
                    <SelectItem value="medium">Moyen terme (1-2 ans)</SelectItem>
                    <SelectItem value="long">Long terme (2+ ans)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activeForm === 'investment' && (
                <div>
                  <Label htmlFor="budget" className="text-sm font-medium text-wine-charcoal">
                    Enveloppe d'investissement
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">€1-10M</SelectItem>
                      <SelectItem value="medium">€10-50M</SelectItem>
                      <SelectItem value="large">€50-100M</SelectItem>
                      <SelectItem value="major">€100M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Interests */}
          <div>
            <Label className="text-sm font-medium text-wine-charcoal mb-3 block">
              Centres d'intérêt (sélectionnez tous ceux qui s'appliquent)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interestOptions[activeForm as keyof typeof interestOptions].map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <Label htmlFor={interest} className="text-sm text-wine-charcoal cursor-pointer">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-wine-charcoal">
              Message détaillé
            </Label>
            <Textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Décrivez vos besoins, questions ou propositions..."
              className="mt-1"
            />
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-subtle p-6 rounded-xl border border-wine-cream/40">
            <div className="flex items-center gap-3 mb-4">
              <ArrowRight className="w-6 h-6 text-wine-burgundy" />
              <h3 className="text-lg font-semibold text-wine-charcoal">
                Après votre demande
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                <Mail className="w-5 h-5 text-wine-burgundy" />
                <div>
                  <div className="font-medium text-wine-charcoal">48h</div>
                  <div className="text-sm text-wine-charcoal/70">Réponse garantie</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                <Calendar className="w-5 h-5 text-wine-gold" />
                <div>
                  <div className="font-medium text-wine-charcoal">1 semaine</div>
                  <div className="text-sm text-wine-charcoal/70">Première réunion</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                <CheckCircle className="w-5 h-5 text-wine-green" />
                <div>
                  <div className="font-medium text-wine-charcoal">1 mois</div>
                  <div className="text-sm text-wine-charcoal/70">Proposition détaillée</div>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              <Mail className="w-5 h-5" />
              Envoyer la Demande
            </Button>
          </div>
        </form>

        {/* Contact Information */}
        <div className="bg-wine-cream/20 p-6 rounded-xl border border-wine-cream/40">
          <h3 className="text-lg font-semibold text-wine-charcoal mb-4">
            Autres moyens de nous contacter
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-wine-burgundy" />
              <div>
                <div className="font-medium text-wine-charcoal">+33 5 56 12 34 56</div>
                <div className="text-sm text-wine-charcoal/70">Ligne directe</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-wine-burgundy" />
              <div>
                <div className="font-medium text-wine-charcoal">contact@atlas-biomasse.fr</div>
                <div className="text-sm text-wine-charcoal/70">Email général</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-wine-burgundy" />
              <div>
                <div className="font-medium text-wine-charcoal">Prendre RDV</div>
                <div className="text-sm text-wine-charcoal/70">calendly.com/atlas-biomasse</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactIntegration;