import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Building2, 
  Users, 
  TrendingUp, 
  Leaf,
  CheckCircle,
  Clock,
  FileText,
  Send,
  Globe,
  Briefcase
} from 'lucide-react';

const ContactIntegration = () => {
  const { t, language } = useLanguage();
  const { currentData } = useRegion();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    contactMethod: 'email',
    interests: [] as string[],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real implementation, send data to backend
  };

  const businessOpportunities = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: language === 'fr' ? 'Partenariat Stratégique' : 'Strategic Partnership',
      description: language === 'fr' 
        ? 'Collaboration et accords commerciaux' 
        : 'Business collaboration and commercial agreements',
      value: 'strategic-partnership'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: language === 'fr' ? 'Opportunité d\'Investissement' : 'Investment Opportunity',
      description: language === 'fr' 
        ? 'Participation financière au projet' 
        : 'Financial participation in the project',
      value: 'investment'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: language === 'fr' ? 'Support Technique' : 'Technical Support',
      description: language === 'fr' 
        ? 'Questions techniques et faisabilité' 
        : 'Technical questions and feasibility',
      value: 'technical-support'
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: language === 'fr' ? 'Information Générale' : 'General Information',
      description: language === 'fr' 
        ? 'Demandes d\'information sur le projet' 
        : 'Project information requests',
      value: 'general-info'
    }
  ];

  const interestAreas = [
    { key: 'feasibility', label: language === 'fr' ? 'Étude de faisabilité' : 'Feasibility study' },
    { key: 'timeline', label: language === 'fr' ? 'Timeline du projet' : 'Project timeline' },
    { key: 'environmental', label: language === 'fr' ? 'Impact environnemental' : 'Environmental impact' },
    { key: 'economic', label: language === 'fr' ? 'Retombées économiques' : 'Economic benefits' }
  ];

  const nextSteps = [
    {
      icon: <Clock className="h-4 w-4" />,
      timeframe: '48h',
      description: language === 'fr' ? 'Réponse garantie' : 'Guaranteed response'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      timeframe: language === 'fr' ? '1 semaine' : '1 week',
      description: language === 'fr' ? 'Première réunion' : 'First meeting'
    },
    {
      icon: <FileText className="h-4 w-4" />,
      timeframe: language === 'fr' ? '1 mois' : '1 month',
      description: language === 'fr' ? 'Proposition détaillée' : 'Detailed proposal'
    }
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-wine-burgundy mb-4">
              {language === 'fr' ? 'Merci pour votre demande!' : 'Thank you for your inquiry!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'fr' 
                ? 'Nous vous contacterons dans les 48 heures pour discuter des opportunités de collaboration.'
                : 'We will contact you within 48 hours to discuss collaboration opportunities.'
              }
            </p>
            <Button onClick={() => setSubmitted(false)} className="bg-wine-burgundy hover:bg-wine-burgundy/90">
              {language === 'fr' ? 'Nouvelle demande' : 'New inquiry'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-wine-burgundy mb-4">
          📋 {language === 'fr' ? 'Contact & Prochaines Étapes' : 'Contact & Next Steps'}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {language === 'fr' 
            ? 'Transformons ensemble les déchets viticoles en opportunité d\'avenir'
            : 'Transform vineyard waste into future opportunities together'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Business Opportunities */}
        <div>
          <h2 className="text-3xl font-bold text-wine-burgundy mb-8">
            🤝 {language === 'fr' ? 'Opportunités de Collaboration' : 'Business Opportunities'}
          </h2>
          
          <div className="grid gap-6 mb-12">
            {businessOpportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-wine-burgundy">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-wine-burgundy">
                      {opportunity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{opportunity.title}</h3>
                      <p className="text-gray-600">{opportunity.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

              {/* Direct Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'fr' ? 'Autres moyens de nous contacter' : 'Other ways to contact us'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">+33 5 56 12 34 56</div>
                  <div className="text-sm text-gray-500">
                    {language === 'fr' ? 'Ligne directe' : 'Direct line'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">contact@atlas-biomasse.fr</div>
                  <div className="text-sm text-gray-500">
                    {language === 'fr' ? 'Email général' : 'General email'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <Button variant="outline" className="text-sm">
                    {language === 'fr' ? 'Prendre RDV' : 'Schedule Meeting'}
                  </Button>
                  <div className="text-sm text-gray-500 mt-1">
                    calendly.com/atlas-biomasse
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-wine-burgundy" />
                {language === 'fr' ? 'Demandes d\'information sur le projet' : 'Project Information Request'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'fr' ? 'Nom complet' : 'Full name'} *
                    </label>
                    <Input
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'fr' ? 'Téléphone' : 'Phone'}
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+33 X XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'fr' ? 'Entreprise/Organisation' : 'Company/Organization'}
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder={language === 'fr' ? 'Nom de votre entreprise' : 'Your company name'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'fr' ? 'Fonction/Rôle' : 'Role/Position'}
                    </label>
                    <Input
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      placeholder={language === 'fr' ? 'Votre fonction' : 'Your position'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'fr' ? 'Mode de contact préféré' : 'Preferred contact method'}
                    </label>
                    <Select value={formData.contactMethod} onValueChange={(value) => handleInputChange('contactMethod', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">{language === 'fr' ? 'Téléphone' : 'Phone'}</SelectItem>
                        <SelectItem value="meeting">{language === 'fr' ? 'Réunion' : 'Meeting'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    {language === 'fr' 
                      ? 'Centres d\'intérêt (sélectionnez tous ceux qui s\'appliquent)' 
                      : 'Areas of interest (select all that apply)'
                    }
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestAreas.map((interest) => (
                      <Badge
                        key={interest.key}
                        variant={formData.interests.includes(interest.key) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.interests.includes(interest.key)
                            ? 'bg-wine-burgundy hover:bg-wine-burgundy/90'
                            : 'hover:bg-wine-cream'
                        }`}
                        onClick={() => toggleInterest(interest.key)}
                      >
                        {interest.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'fr' ? 'Message détaillé' : 'Detailed message'}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={language === 'fr' 
                      ? 'Décrivez vos besoins, questions ou propositions...'
                      : 'Describe your needs, questions or proposals...'
                    }
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-wine-burgundy hover:bg-wine-burgundy/90"
                  size="lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Envoyer la Demande' : 'Send Inquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-wine-burgundy" />
                {language === 'fr' ? 'Après votre demande' : 'After your inquiry'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-wine-burgundy">
                      {step.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-wine-burgundy">
                        {step.timeframe}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactIntegration;
