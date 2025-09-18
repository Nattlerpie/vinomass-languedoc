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
  Send
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
  };

  // Safe data access with fallbacks
  const totalBiomass = currentData?.totalBiomass || 266000;
  const totalRevenue = currentData?.totalRevenue || 90900000;
  const biomassDisplay = Math.round(totalBiomass / 1000);
  const revenueDisplay = Math.round(totalRevenue / 1000000);

  const businessOpportunities = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: t('contact.strategicPartnership'),
      description: t('contact.strategicDesc'),
      value: 'strategic-partnership'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('contact.investmentOpportunity'),
      description: t('contact.investmentDesc'),
      value: 'investment'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('contact.technicalSupport'),
      description: t('contact.technicalDesc'),
      value: 'technical-support'
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: t('contact.generalInfo'),
      description: t('contact.generalDesc'),
      value: 'general-info'
    }
  ];

  const interestAreas = [
    { key: 'feasibility', label: t('contact.feasibilityStudy') },
    { key: 'timeline', label: t('contact.projectTimeline') },
    { key: 'environmental', label: t('contact.environmentalImpact') },
    { key: 'economic', label: t('contact.economicBenefits') }
  ];

  const nextSteps = [
    {
      icon: <Clock className="h-4 w-4" />,
      timeframe: t('time.hours48'),
      description: t('contact.guaranteedResponse')
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      timeframe: t('time.week'),
      description: t('contact.firstMeeting')
    },
    {
      icon: <FileText className="h-4 w-4" />,
      timeframe: t('time.month'),
      description: t('contact.detailedProposal')
    }
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-wine-burgundy mb-4">
              {t('contact.thankYou')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('contact.thankYouMessage')}
            </p>
            <Button onClick={() => setSubmitted(false)} className="bg-wine-burgundy hover:bg-wine-burgundy/90">
              {t('contact.newInquiry')}
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
          {t('contact.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Business Opportunities */}
        <div>
          <h2 className="text-3xl font-bold text-wine-burgundy mb-8">
            {t('contact.businessOpportunities')}
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
                {t('contact.otherContactMethods')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">+33 5 56 12 34 56</div>
                  <div className="text-sm text-gray-500">
                    {t('contact.directLine')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-medium">contact@atlas-biomasse.fr</div>
                  <div className="text-sm text-gray-500">
                    {t('contact.generalEmail')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <Button variant="outline" className="text-sm">
                    {t('contact.scheduleMeeting')}
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
                {t('contact.projectInfoRequest')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.fullName')} *
                    </label>
                    <Input
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder={t('contact.yourName')}
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
                      {t('contact.phone')}
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+33 X XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.company')}
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder={t('contact.companyPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.role')}
                    </label>
                    <Input
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      placeholder={t('contact.yourPosition')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.preferredContact')}
                    </label>
                    <Select value={formData.contactMethod} onValueChange={(value) => handleInputChange('contactMethod', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">{t('contact.telephone')}</SelectItem>
                        <SelectItem value="meeting">{t('contact.meeting')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    {t('contact.interests')}
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
                    {t('contact.detailedMessage')}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={t('contact.messagePlaceholder')}
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-wine-burgundy hover:bg-wine-burgundy/90"
                  size="lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t('contact.sendInquiry')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-wine-burgundy" />
                {t('contact.afterInquiry')}
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
