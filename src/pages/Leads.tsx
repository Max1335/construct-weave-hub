import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, Filter } from 'lucide-react';

// Mock data
const mockLeads = [
  { id: 1, name: 'Олександр Коваль', email: 'alex@example.com', company: 'TechStart', status: 'new', score: 85, source: 'organic' },
  { id: 2, name: 'Марія Петренко', email: 'maria@example.com', company: 'Marketing Pro', status: 'contacted', score: 72, source: 'paid' },
  { id: 3, name: 'Іван Шевченко', email: 'ivan@example.com', company: 'Growth Co', status: 'qualified', score: 91, source: 'social' },
  { id: 4, name: 'Ольга Мельник', email: 'olga@example.com', company: 'Digital Agency', status: 'converted', score: 95, source: 'email' },
  { id: 5, name: 'Андрій Бойко', email: 'andrii@example.com', company: 'StartUp Hub', status: 'new', score: 68, source: 'organic' },
];

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ліди та клієнти</h1>
          <p className="text-muted-foreground mt-1">Управління вашою базою лідів</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Додати ліда
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Пошук по імені, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Фільтри
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLeads.map((lead) => (
              <div 
                key={lead.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(lead.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={getStatusColor(lead.status)}>
                    {getStatusLabel(lead.status)}
                  </Badge>
                  <Badge variant="outline">
                    {getSourceLabel(lead.source)}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{lead.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;
