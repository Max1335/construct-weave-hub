import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LeadDetailModal } from '@/components/LeadDetailModal';
import { Search, Plus, Filter, Download } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company: string;
  position?: string;
  status: string;
  score: number;
  source: string;
  createdAt: string;
  lastActivity: string;
  interactions: number;
  emailOpenRate: number;
  tags?: string[];
}

const mockLeads: Lead[] = [
  { 
    id: 1, 
    name: 'Олександр Коваль', 
    email: 'alex@techstart.ua', 
    phone: '+380 67 123 4567',
    company: 'TechStart', 
    position: 'CEO',
    status: 'new', 
    score: 85, 
    source: 'organic',
    createdAt: '01.11.2024',
    lastActivity: '07.11.2024',
    interactions: 12,
    emailOpenRate: 75,
    tags: ['Enterprise', 'Hot Lead']
  },
  { 
    id: 2, 
    name: 'Марія Петренко', 
    email: 'maria@marketingpro.ua', 
    phone: '+380 93 234 5678',
    company: 'Marketing Pro', 
    position: 'Marketing Director',
    status: 'contacted', 
    score: 72, 
    source: 'paid',
    createdAt: '28.10.2024',
    lastActivity: '06.11.2024',
    interactions: 8,
    emailOpenRate: 60,
    tags: ['SMB']
  },
  { 
    id: 3, 
    name: 'Іван Шевченко', 
    email: 'ivan@growthco.ua',
    phone: '+380 50 345 6789', 
    company: 'Growth Co', 
    position: 'Founder',
    status: 'qualified', 
    score: 91, 
    source: 'social',
    createdAt: '25.10.2024',
    lastActivity: '07.11.2024',
    interactions: 15,
    emailOpenRate: 80,
    tags: ['Enterprise', 'Decision Maker']
  },
  { 
    id: 4, 
    name: 'Ольга Мельник', 
    email: 'olga@digitalagency.ua',
    phone: '+380 99 456 7890', 
    company: 'Digital Agency', 
    position: 'COO',
    status: 'converted', 
    score: 95, 
    source: 'email',
    createdAt: '20.10.2024',
    lastActivity: '05.11.2024',
    interactions: 22,
    emailOpenRate: 90,
    tags: ['Customer', 'Premium']
  },
  { 
    id: 5, 
    name: 'Андрій Бойко', 
    email: 'andrii@startuphub.ua',
    phone: '+380 63 567 8901', 
    company: 'StartUp Hub', 
    position: 'Product Manager',
    status: 'new', 
    score: 68, 
    source: 'organic',
    createdAt: '03.11.2024',
    lastActivity: '06.11.2024',
    interactions: 5,
    emailOpenRate: 50,
    tags: ['Startup']
  },
];

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-status-new';
      case 'contacted': return 'bg-status-contacted';
      case 'qualified': return 'bg-status-qualified';
      case 'converted': return 'bg-status-converted';
      case 'lost': return 'bg-status-lost';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Новий';
      case 'contacted': return 'Контактований';
      case 'qualified': return 'Кваліфікований';
      case 'converted': return 'Конвертований';
      case 'lost': return 'Втрачений';
      default: return status;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'organic': return 'Органіка';
      case 'paid': return 'Реклама';
      case 'social': return 'Соцмережі';
      case 'email': return 'Email';
      default: return source;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ліди та клієнти</h1>
          <p className="text-muted-foreground mt-1">Управління вашою базою лідів • {filteredLeads.length} лідів</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Експорт
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Додати ліда
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Пошук по імені, email, компанії..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі статуси</SelectItem>
                  <SelectItem value="new">Новий</SelectItem>
                  <SelectItem value="contacted">Контактований</SelectItem>
                  <SelectItem value="qualified">Кваліфікований</SelectItem>
                  <SelectItem value="converted">Конвертований</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Джерело" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі джерела</SelectItem>
                  <SelectItem value="organic">Органіка</SelectItem>
                  <SelectItem value="paid">Реклама</SelectItem>
                  <SelectItem value="social">Соцмережі</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div 
                key={lead.id}
                onClick={() => handleLeadClick(lead)}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-3 lg:mb-0 flex-1">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(lead.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{lead.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{lead.email}</p>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 lg:gap-6">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Остання активність</p>
                    <p className="font-medium">{lead.lastActivity}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(lead.status)}>
                      {getStatusLabel(lead.status)}
                    </Badge>
                    <Badge variant="outline">
                      {getSourceLabel(lead.source)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 min-w-32">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{lead.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <LeadDetailModal 
        lead={selectedLead}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Leads;
