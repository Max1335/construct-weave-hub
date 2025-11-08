import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, Send, Eye, MousePointer, Calendar, Users, 
  TrendingUp, Edit, Copy, Trash2, Play, Pause 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Campaign {
  id: number;
  name: string;
  status: string;
  sent: number;
  opened: number;
  clicked: number;
  date: string;
  subject: string;
}

interface CampaignDetailModalProps {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (id: number) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
  onPauseResume: (id: number) => void;
}

const opensByHour = [
  { hour: '00:00', opens: 45 },
  { hour: '03:00', opens: 12 },
  { hour: '06:00', opens: 89 },
  { hour: '09:00', opens: 456 },
  { hour: '12:00', opens: 892 },
  { hour: '15:00', opens: 1234 },
  { hour: '18:00', opens: 2156 },
  { hour: '21:00', opens: 678 },
];

const topLinks = [
  { url: 'Homepage', clicks: 892, percentage: 26 },
  { url: 'Product Page', clicks: 765, percentage: 22 },
  { url: 'Pricing', clicks: 543, percentage: 16 },
  { url: 'Blog Article', clicks: 421, percentage: 12 },
  { url: 'Contact', clicks: 234, percentage: 7 },
];

export const CampaignDetailModal = ({ 
  campaign, 
  open, 
  onOpenChange,
  onEdit,
  onDuplicate,
  onDelete,
  onPauseResume 
}: CampaignDetailModalProps) => {
  if (!campaign) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary';
      case 'scheduled': return 'bg-accent';
      case 'completed': return 'bg-muted-foreground';
      case 'paused': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активна';
      case 'scheduled': return 'Заплановано';
      case 'completed': return 'Завершено';
      case 'paused': return 'Призупинено';
      default: return status;
    }
  };

  const calculateRate = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
  };

  const openRate = calculateRate(campaign.opened, campaign.sent);
  const clickRate = calculateRate(campaign.clicked, campaign.sent);
  const clickToOpenRate = calculateRate(campaign.clicked, campaign.opened);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl mb-2">{campaign.name}</DialogTitle>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(campaign.status)}>
                  {getStatusLabel(campaign.status)}
                </Badge>
                <span className="text-sm text-muted-foreground">{campaign.date}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(campaign.id)}>
                <Edit className="w-4 h-4 mr-2" />
                Редагувати
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDuplicate(campaign.id)}>
                <Copy className="w-4 h-4 mr-2" />
                Дублювати
              </Button>
              {campaign.status === 'active' && (
                <Button variant="outline" size="sm" onClick={() => onPauseResume(campaign.id)}>
                  <Pause className="w-4 h-4 mr-2" />
                  Призупинити
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Email Subject */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Тема листа</p>
                  <p className="text-lg font-semibold">{campaign.subject}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          {campaign.sent > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{campaign.sent.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Відправлено</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-8 h-8 text-secondary" />
                    <span className="text-sm font-medium text-secondary">{openRate}%</span>
                  </div>
                  <p className="text-2xl font-bold">{campaign.opened.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Відкрито</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <MousePointer className="w-8 h-8 text-accent" />
                    <span className="text-sm font-medium text-accent">{clickRate}%</span>
                  </div>
                  <p className="text-2xl font-bold">{campaign.clicked.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Кліків</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <span className="text-sm font-medium text-primary">{clickToOpenRate}%</span>
                  </div>
                  <p className="text-2xl font-bold">CTOR</p>
                  <p className="text-sm text-muted-foreground">Click-to-Open</p>
                </CardContent>
              </Card>
            </div>
          )}

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performance">Ефективність</TabsTrigger>
              <TabsTrigger value="links">Посилання</TabsTrigger>
              <TabsTrigger value="audience">Аудиторія</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Відкриття по годинах</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={opensByHour}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="opens" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Відкриття"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="links" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Топ посилань за кліками</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topLinks.map((link, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{link.url}</span>
                          <div className="text-right">
                            <span className="font-semibold">{link.clicks}</span>
                            <span className="text-sm text-muted-foreground ml-2">({link.percentage}%)</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${link.percentage * 3}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Інформація про аудиторію</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Відправлено</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xl font-bold">{campaign.sent.toLocaleString()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Доставлено</p>
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xl font-bold">{Math.floor(campaign.sent * 0.98).toLocaleString()}</span>
                        <span className="text-sm text-secondary">98%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Відмовилися</p>
                      <span className="text-xl font-bold">{Math.floor(campaign.sent * 0.002).toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-2">0.2%</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Скарги на спам</p>
                      <span className="text-xl font-bold">{Math.floor(campaign.sent * 0.001).toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-2">0.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="destructive" 
              onClick={() => {
                onDelete(campaign.id);
                onOpenChange(false);
              }}
              className="ml-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Видалити кампанію
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
