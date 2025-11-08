import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddCampaignModal } from '@/components/AddCampaignModal';
import { 
  Plus, Mail, Send, Users, Eye, MousePointer, TrendingUp, 
  Edit, Trash2, Copy, Play, Pause, MoreVertical 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const initialCampaigns = [
  {
    id: 1,
    name: 'Літня промо-акція 2024',
    status: 'active',
    sent: 12458,
    opened: 8932,
    clicked: 3421,
    date: '05.11.2024',
    subject: '🔥 Знижка 30% на всі послуги',
  },
  {
    id: 2,
    name: 'Новинки продуктів',
    status: 'scheduled',
    sent: 0,
    opened: 0,
    clicked: 0,
    date: '10.11.2024',
    subject: 'Ознайомтесь з нашими новинками',
  },
  {
    id: 3,
    name: 'Осіння розсилка',
    status: 'completed',
    sent: 8745,
    opened: 6234,
    clicked: 2156,
    date: '28.10.2024',
    subject: 'Восени кращі пропозиції для вас',
  },
  {
    id: 4,
    name: 'Welcome Series - Part 1',
    status: 'active',
    sent: 3421,
    opened: 2987,
    clicked: 1543,
    date: '01.11.2024',
    subject: 'Ласкаво просимо! 🎉',
  },
];

const templates = [
  {
    id: 1,
    name: 'Промо-акція',
    category: 'Marketing',
    thumbnail: '🎉',
  },
  {
    id: 2,
    name: 'Новини продукту',
    category: 'Product',
    thumbnail: '🚀',
  },
  {
    id: 3,
    name: 'Welcome Email',
    category: 'Onboarding',
    thumbnail: '👋',
  },
  {
    id: 4,
    name: 'Нагадування',
    category: 'Engagement',
    thumbnail: '⏰',
  },
];

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddCampaign = (newCampaign: any) => {
    setCampaigns([newCampaign, ...campaigns]);
  };

  const handleEdit = (campaignId: number) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    toast.info('Редагування кампанії', {
      description: `Відкривається редактор для "${campaign?.name}"`,
    });
  };

  const handleDuplicate = (campaignId: number) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      const duplicated = {
        ...campaign,
        id: Date.now(),
        name: `${campaign.name} (копія)`,
        status: 'draft',
        sent: 0,
        opened: 0,
        clicked: 0,
      };
      setCampaigns([duplicated, ...campaigns]);
      toast.success('Кампанію продубльовано!', {
        description: `Створено копію "${campaign.name}"`,
      });
    }
  };

  const handleDelete = (campaignId: number) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    setCampaigns(campaigns.filter(c => c.id !== campaignId));
    toast.success('Кампанію видалено', {
      description: `"${campaign?.name}" успішно видалено`,
    });
  };

  const handlePauseResume = (campaignId: number) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    const newStatus = campaign?.status === 'active' ? 'paused' : 'active';
    setCampaigns(campaigns.map(c => 
      c.id === campaignId ? { ...c, status: newStatus } : c
    ));
    toast.info(
      newStatus === 'paused' ? 'Кампанію призупинено' : 'Кампанію відновлено',
      { description: campaign?.name }
    );
  };

  const handleSendNow = (campaignId: number) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    toast.success('Відправка розпочата!', {
      description: `Кампанія "${campaign?.name}" відправляється підписникам`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary';
      case 'scheduled': return 'bg-accent';
      case 'completed': return 'bg-muted-foreground';
      case 'draft': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активна';
      case 'scheduled': return 'Заплановано';
      case 'completed': return 'Завершено';
      case 'draft': return 'Чернетка';
      default: return status;
    }
  };

  const calculateRate = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Email-кампанії</h1>
          <p className="text-muted-foreground mt-1">Створюйте та керуйте email розсилками</p>
        </div>
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Нова кампанія
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Send className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-secondary">+12%</span>
            </div>
            <p className="text-2xl font-bold">24,624</p>
            <p className="text-sm text-muted-foreground">Відправлено emails</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-secondary" />
              <span className="text-sm font-medium text-secondary">72%</span>
            </div>
            <p className="text-2xl font-bold">18,153</p>
            <p className="text-sm text-muted-foreground">Відкрито</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <MousePointer className="w-8 h-8 text-accent" />
              <span className="text-sm font-medium text-secondary">28%</span>
            </div>
            <p className="text-2xl font-bold">7,120</p>
            <p className="text-sm text-muted-foreground">Кліків</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-secondary">+8%</span>
            </div>
            <p className="text-2xl font-bold">3.8%</p>
            <p className="text-sm text-muted-foreground">CTR середній</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Кампанії</TabsTrigger>
          <TabsTrigger value="templates">Шаблони</TabsTrigger>
          <TabsTrigger value="analytics">Аналітика</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {getStatusLabel(campaign.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{campaign.subject}</p>
                    <p className="text-xs text-muted-foreground">Дата: {campaign.date}</p>
                  </div>

                  {campaign.status !== 'scheduled' && campaign.sent > 0 && (
                    <div className="grid grid-cols-3 gap-6 min-w-[400px]">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Send className="w-4 h-4 text-muted-foreground" />
                          <p className="text-xl font-bold">{campaign.sent.toLocaleString()}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Відправлено</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <p className="text-xl font-bold">{campaign.opened.toLocaleString()}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Відкрито ({calculateRate(campaign.opened, campaign.sent)}%)
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <MousePointer className="w-4 h-4 text-muted-foreground" />
                          <p className="text-xl font-bold">{campaign.clicked.toLocaleString()}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Кліків ({calculateRate(campaign.clicked, campaign.sent)}%)
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {campaign.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleSendNow(campaign.id)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Відправити зараз
                      </Button>
                    )}
                    
                    {campaign.status === 'active' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePauseResume(campaign.id)}
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Призупинити
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleEdit(campaign.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Редагувати
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(campaign.id)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Дублювати
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(campaign.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Видалити
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl mb-4">{template.thumbnail}</div>
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <Badge variant="outline">{template.category}</Badge>
                  <Button variant="outline" className="w-full mt-4">
                    Використати
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Топ кампаній по відкриттях</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns
                    .filter(c => c.status === 'completed' || c.status === 'active')
                    .sort((a, b) => b.opened - a.opened)
                    .map((campaign, index) => (
                      <div key={campaign.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Open Rate: {calculateRate(campaign.opened, campaign.sent)}%
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-semibold">{campaign.opened.toLocaleString()}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Топ кампаній по кліках</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns
                    .filter(c => c.status === 'completed' || c.status === 'active')
                    .sort((a, b) => b.clicked - a.clicked)
                    .map((campaign, index) => (
                      <div key={campaign.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-sm text-muted-foreground">
                              CTR: {calculateRate(campaign.clicked, campaign.sent)}%
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-semibold">{campaign.clicked.toLocaleString()}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AddCampaignModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAddCampaign={handleAddCampaign}
      />
    </div>
  );
};

export default Campaigns;
