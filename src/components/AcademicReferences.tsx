import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Download, Search, ExternalLink, Calendar, User, Building } from 'lucide-react';

const AcademicReferences = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const references = [
    {
      id: 1,
      title: "Sustainable Aviation Fuels from Grape Pomace: Technical and Economic Feasibility",
      authors: ["Dr. Marie Dubois", "Prof. Jean-Luc Martin", "Dr. Sophie Bernard"],
      institution: "Institut Français de la Vigne et du Vin (IFV)",
      journal: "Bioresource Technology",
      year: 2023,
      category: "research",
      impact: 4.2,
      citations: 47,
      doi: "10.1016/j.biortech.2023.128456",
      abstract: "Cette étude examine la faisabilité technique et économique de la production de carburants d'aviation durables à partir de marc de raisin en région Languedoc-Roussillon...",
      keywords: ["SAF", "marc de raisin", "ATJ", "biocarburant", "aviation durable"],
      url: "https://doi.org/10.1016/j.biortech.2023.128456"
    },
    {
      id: 2,
      title: "Alcohol-to-Jet Conversion: Optimizing Catalyst Performance for Wine Industry Residues",
      authors: ["Dr. Pierre Rossi", "Prof. Catherine Laurent", "Dr. Antoine Moreau"],
      institution: "INRAE Montpellier",
      journal: "Applied Catalysis B: Environmental",
      year: 2023,
      category: "research",
      impact: 5.1,
      citations: 32,
      doi: "10.1016/j.apcatb.2023.122567",
      abstract: "Optimisation des catalyseurs HZSM-5 modifiés pour la conversion éthanol-kérosène à partir de résidus vitivinicoles...",
      keywords: ["catalyse", "HZSM-5", "ATJ", "optimisation", "sélectivité"],
      url: "https://doi.org/10.1016/j.apcatb.2023.122567"
    },
    {
      id: 3,
      title: "Life Cycle Assessment of Vineyard Waste-to-SAF Pathways in Mediterranean Regions",
      authors: ["Dr. Elena Gonzalez", "Prof. Marco Rossi", "Dr. Lucie Moreau"],
      institution: "Université de Montpellier",
      journal: "Journal of Cleaner Production",
      year: 2023,
      category: "environmental",
      impact: 3.8,
      citations: 28,
      doi: "10.1016/j.jclepro.2023.137234",
      abstract: "Analyse du cycle de vie complet des filières SAF issues de résidus viticoles méditerranéens...",
      keywords: ["ACV", "impact environnemental", "méditerranée", "déchets viticoles"],
      url: "https://doi.org/10.1016/j.jclepro.2023.137234"
    },
    {
      id: 4,
      title: "Economic Impact Analysis: SAF Production from Agricultural Residues in Southern France",
      authors: ["Prof. François Dubois", "Dr. Isabelle Martin"],
      institution: "INRAE Economics",
      journal: "Energy Policy",
      year: 2022,
      category: "economic",
      impact: 4.7,
      citations: 63,
      doi: "10.1016/j.enpol.2022.113045",
      abstract: "Évaluation de l'impact économique régional de la production de SAF à partir de résidus agricoles...",
      keywords: ["impact économique", "SAF", "résidus agricoles", "politique énergétique"],
      url: "https://doi.org/10.1016/j.enpol.2022.113045"
    },
    {
      id: 5,
      title: "Regulatory Framework and Market Dynamics for European SAF Development",
      authors: ["Prof. Hans Mueller", "Dr. Anna Schmidt", "Dr. Thomas Weber"],
      institution: "European Aviation Safety Agency",
      journal: "Transportation Research Part D",
      year: 2023,
      category: "regulatory",
      impact: 3.9,
      citations: 41,
      doi: "10.1016/j.trd.2023.103654",
      abstract: "Analyse du cadre réglementaire européen et des dynamiques de marché pour le développement des SAF...",
      keywords: ["réglementation", "marché SAF", "politique européenne", "aviation"],
      url: "https://doi.org/10.1016/j.trd.2023.103654"
    },
    {
      id: 6,
      title: "Technical Report: SAF Production Pilot Plant - Languedoc-Roussillon",
      authors: ["Dr. Alain Dupont", "Équipe Technique IFV"],
      institution: "Institut Français de la Vigne et du Vin",
      journal: "Rapport Technique IFV",
      year: 2023,
      category: "technical",
      impact: null,
      citations: 15,
      doi: "IFV-RT-2023-SAF-01",
      abstract: "Rapport technique détaillé du pilote de production SAF installé sur le site de Pech Rouge...",
      keywords: ["pilote", "production", "technique", "validation"],
      url: "https://ifv.fr/rapports/saf-pilot-2023"
    }
  ];

  const filteredReferences = references.filter(ref => {
    const matchesSearch = searchTerm === '' || 
      ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ref.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || ref.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || ref.year.toString() === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  const downloadReference = (ref: any) => {
    const citation = `${ref.authors.join(', ')} (${ref.year}). ${ref.title}. ${ref.journal}. DOI: ${ref.doi}`;
    const blob = new Blob([citation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reference-${ref.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAllReferences = () => {
    const bibliography = {
      title: "Bibliographie SAF - Atlas Biomasse Languedoc-Roussillon",
      generated: new Date().toISOString(),
      totalReferences: filteredReferences.length,
      references: filteredReferences.map(ref => ({
        citation: `${ref.authors.join(', ')} (${ref.year}). ${ref.title}. ${ref.journal}. DOI: ${ref.doi}`,
        category: ref.category,
        impact: ref.impact,
        citations: ref.citations,
        keywords: ref.keywords,
        url: ref.url
      }))
    };

    const blob = new Blob([JSON.stringify(bibliography, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bibliographie-saf-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'research': return 'bg-wine-burgundy text-white';
      case 'environmental': return 'bg-wine-green text-white';
      case 'economic': return 'bg-wine-gold text-white';
      case 'regulatory': return 'bg-wine-charcoal text-white';
      case 'technical': return 'bg-blue-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'research': return 'Recherche';
      case 'environmental': return 'Environnement';
      case 'economic': return 'Économie';
      case 'regulatory': return 'Réglementaire';
      case 'technical': return 'Technique';
      default: return 'Autre';
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-wine-burgundy/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="text-wine-burgundy" size={28} />
            <span className="text-2xl text-wine-charcoal">Références Académiques</span>
          </div>
          <Button onClick={exportAllReferences} variant="outline" size="sm" className="gap-2">
            <Download size={16} />
            Bibliographie
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gradient-subtle rounded-lg">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wine-charcoal/40" size={20} />
              <Input
                placeholder="Rechercher par titre, auteur ou mot-clé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="research">Recherche</SelectItem>
                <SelectItem value="environmental">Environnement</SelectItem>
                <SelectItem value="economic">Économie</SelectItem>
                <SelectItem value="regulatory">Réglementaire</SelectItem>
                <SelectItem value="technical">Technique</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* References List */}
        <div className="space-y-4">
          {filteredReferences.map((ref) => (
            <div key={ref.id} className="p-6 bg-gradient-subtle rounded-xl border border-wine-cream/40">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getCategoryColor(ref.category)}>
                      {getCategoryLabel(ref.category)}
                    </Badge>
                    {ref.impact && (
                      <Badge variant="outline" className="text-wine-charcoal">
                        Impact: {ref.impact}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-wine-charcoal">
                      {ref.citations} citations
                    </Badge>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-wine-charcoal mb-2">
                    {ref.title}
                  </h4>
                  
                  <div className="flex items-center gap-4 text-sm text-wine-charcoal/70 mb-3">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {ref.authors.join(', ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building size={14} />
                      {ref.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {ref.year}
                    </span>
                  </div>
                  
                  <p className="text-sm text-wine-charcoal/80 mb-3 line-clamp-2">
                    {ref.abstract}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {ref.keywords.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-sm text-wine-charcoal/60">
                    <strong>Journal:</strong> {ref.journal} | <strong>DOI:</strong> {ref.doi}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(ref.url, '_blank')}
                    className="gap-2"
                  >
                    <ExternalLink size={14} />
                    Lire
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => downloadReference(ref)}
                    className="gap-2"
                  >
                    <Download size={14} />
                    Citer
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-wine-cream/30">
          <div className="text-center p-4 bg-gradient-to-br from-wine-burgundy/10 to-wine-burgundy/5 rounded-lg">
            <div className="text-2xl font-bold text-wine-burgundy mb-1">
              {filteredReferences.length}
            </div>
            <div className="text-sm text-wine-charcoal/70">Références</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-wine-gold/10 to-wine-gold/5 rounded-lg">
            <div className="text-2xl font-bold text-wine-gold mb-1">
              {filteredReferences.filter(r => r.impact && r.impact > 4).length}
            </div>
            <div className="text-sm text-wine-charcoal/70">Impact élevé</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-wine-green/10 to-wine-green/5 rounded-lg">
            <div className="text-2xl font-bold text-wine-green mb-1">
              {filteredReferences.reduce((acc, ref) => acc + ref.citations, 0)}
            </div>
            <div className="text-sm text-wine-charcoal/70">Citations totales</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-wine-charcoal/10 to-wine-charcoal/5 rounded-lg">
            <div className="text-2xl font-bold text-wine-charcoal mb-1">
              {Math.round(filteredReferences.filter(r => r.impact).reduce((acc, ref) => acc + (ref.impact || 0), 0) / filteredReferences.filter(r => r.impact).length * 10) / 10}
            </div>
            <div className="text-sm text-wine-charcoal/70">Impact moyen</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicReferences;