import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Building, Calendar, TrendingUp, MessageSquare, Target, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

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

interface LeadDetailModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: (id: number) => void;
}

export const LeadDetailModal = ({ lead, open, onOpenChange, onDelete }: LeadDetailModalProps) => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    { text: 'Дуже зацікавлений у нашому продукті. Планує зустріч наступного тижня.', date: '05.11.2024', author: 'Іван Петров' }
  ]);
  
  if (!lead) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-status-new';
      case 'contacted': return 'bg-status-contacted';
      case 'qualified': return 'bg-status-qualified';
      case 'converted': return 'bg-status-converted';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Новий';
      case 'contacted': return 'Контактований';
      case 'qualified': return 'Кваліфікований';
      case 'converted': return 'Конвертований';
      default: return status;
    }
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${lead.email}?subject=Зв'язок з ${lead.company}`;
    toast.success('Email клієнт відкрито');
  };

  const handleCall = () => {
    if (lead.phone) {
      window.location.href = `tel:${lead.phone}`;
      toast.success('Дзвінок ініційовано');
    } else {
      toast.error('Номер телефону не вказано');
    }
  };

  const handleCreateDeal = () => {
    toast.success(`Угоду створено для ${lead.name}`);
    // В реальному додатку тут буде редірект на сторінку створення угоди
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(lead.id);
      onOpenChange(false);
      toast.success(`Лід ${lead.name} видалено`);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('uk-UA')}`;
      setNotes([
        { text: newNote, date: formattedDate, author: 'Поточний користувач' },
        ...notes
      ]);
      setNewNote('');
      toast.success('Нотатку додано');
    }
  };

  const activities = [
    { date: '2024-11-07 14:30', action: 'Відвідав сторінку продукту', type: 'visit' },
    { date: '2024-11-06 10:15', action: 'Відкрив email кампанію', type: 'email' },
    { date: '2024-11-05 16:45', action: 'Заповнив контактну форму', type: 'form' },
    { date: '2024-11-04 09:20', action: 'Перший візит на сайт', type: 'visit' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Профіль ліда</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6 pb-6 border-b">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getInitials(lead.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{lead.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${lead.email}`} className="hover:text-primary">{lead.email}</a>
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${lead.phone}`} className="hover:text-primary">{lead.phone}</a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="w-4 h-4" />
                  <span>{lead.company}</span>
                  {lead.position && <span>• {lead.position}</span>}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <Badge className={getStatusColor(lead.status)}>
                  {getStatusLabel(lead.status)}
                </Badge>
                {lead.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Lead Score:</span>
                <span className="text-2xl font-bold text-primary">{lead.score}</span>
              </div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${lead.score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSendEmail}>
              <Mail className="w-4 h-4 mr-2" />
              Відправити Email
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleCall}>
              <Phone className="w-4 h-4 mr-2" />
              Зателефонувати
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleCreateDeal}>
              <Target className="w-4 h-4 mr-2" />
              Створити угоду
            </Button>
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="stats" className="flex-1">Статистика</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">Активність</TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">Нотатки</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Дата створення</p>
                        <p className="text-lg font-semibold mt-1">{lead.createdAt}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Остання активність</p>
                        <p className="text-lg font-semibold mt-1">{lead.lastActivity}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-secondary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Взаємодії</p>
                        <p className="text-lg font-semibold mt-1">{lead.interactions}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Email Open Rate</p>
                        <p className="text-lg font-semibold mt-1">{lead.emailOpenRate}%</p>
                      </div>
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Чому така оцінка?</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Відвідав сайт 8 разів</span>
                      <span className="text-secondary">+20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Відкрив 6 з 10 emails</span>
                      <span className="text-secondary">+15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Заповнив контактну форму</span>
                      <span className="text-secondary">+25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Компанія з цільової індустрії</span>
                      <span className="text-secondary">+15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Переглянув ціни</span>
                      <span className="text-secondary">+10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-3 mt-6">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'email' ? 'bg-primary' :
                    activity.type === 'form' ? 'bg-secondary' : 'bg-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {notes.map((note, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm">{note.text}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {note.date} - Менеджер: {note.author}
                        </p>
                      </div>
                    ))}
                    
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Додайте нотатку про лід..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={3}
                      />
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleAddNote}
                        disabled={!newNote.trim()}
                      >
                        Додати нотатку
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
