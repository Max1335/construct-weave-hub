import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Users, TrendingUp, UserPlus, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface Segment {
  id: number;
  name: string;
  description: string;
  leadsCount: number;
  criteria: string;
  conversionRate: number;
  color: string;
}

const activitySegments: Segment[] = [
  {
    id: 1,
    name: 'Активні клієнти',
    description: 'Клієнти з активністю за останні 7 днів',
    leadsCount: 156,
    criteria: 'Остання активність < 7 днів',
    conversionRate: 45,
    color: 'bg-secondary',
  },
  {
    id: 2,
    name: 'Неактивні клієнти',
    description: 'Клієнти без активності 30+ днів',
    leadsCount: 89,
    criteria: 'Остання активність > 30 днів',
    conversionRate: 12,
    color: 'bg-muted',
  },
  {
    id: 3,
    name: 'Нові клієнти',
    description: 'Додані за останні 14 днів',
    leadsCount: 67,
    criteria: 'Дата створення < 14 днів',
    conversionRate: 28,
    color: 'bg-primary',
  },
];

const engagementSegments: Segment[] = [
  {
    id: 4,
    name: 'High Engagement',
    description: 'Ліди з високою взаємодією (80%+ open rate)',
    leadsCount: 94,
    criteria: 'Email open rate ≥ 80%',
    conversionRate: 52,
    color: 'bg-secondary',
  },
  {
    id: 5,
    name: 'Medium Engagement',
    description: 'Середня взаємодія (50-79% open rate)',
    leadsCount: 132,
    criteria: 'Email open rate 50-79%',
    conversionRate: 34,
    color: 'bg-accent',
  },
  {
    id: 6,
    name: 'Low Engagement',
    description: 'Низька взаємодія (<50% open rate)',
    leadsCount: 86,
    criteria: 'Email open rate < 50%',
    conversionRate: 15,
    color: 'bg-muted',
  },
];

const Segments = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const handleCreateCampaign = (segment: Segment) => {
    toast.success('Створення кампанії', {
      description: `Відкривається редактор для сегменту "${segment.name}"`,
    });
  };

  const handleExportSegment = (segment: Segment) => {
    toast.success('Експорт розпочато!', {
      description: `Експортується ${segment.leadsCount} лідів з сегменту "${segment.name}"`,
    });
  };

  const currentSegments = activeTab === 'activity' ? activitySegments : engagementSegments;
  const totalLeads = currentSegments.reduce((sum, seg) => sum + seg.leadsCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Сегментація клієнтів</h1>
          <p className="text-muted-foreground mt-1">
            Формування та управління сегментами для таргетованих кампаній
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Новий сегмент
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <p className="text-2xl font-bold">{totalLeads}</p>
            <p className="text-sm text-muted-foreground">Всього лідів</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-2xl font-bold">{currentSegments.length}</p>
            <p className="text-sm text-muted-foreground">Активних сегментів</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <UserPlus className="w-8 h-8 text-accent" />
            </div>
            <p className="text-2xl font-bold">
              {Math.round(
                currentSegments.reduce((sum, seg) => sum + seg.conversionRate, 0) /
                  currentSegments.length
              )}
              %
            </p>
            <p className="text-sm text-muted-foreground">Середня конверсія</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Активних кампаній</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="activity">За активністю</TabsTrigger>
          <TabsTrigger value="engagement">За рівнем взаємодії</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activitySegments.map((segment) => (
              <Card key={segment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{segment.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{segment.description}</p>
                    </div>
                    <Badge className={segment.color}>{segment.leadsCount}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Критерії:</p>
                      <p className="text-sm font-medium">{segment.criteria}</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Конверсія</span>
                        <span className="font-semibold">{segment.conversionRate}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${segment.conversionRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleExportSegment(segment)}
                      >
                        Експорт
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCreateCampaign(segment)}
                      >
                        Кампанія
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {engagementSegments.map((segment) => (
              <Card key={segment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{segment.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{segment.description}</p>
                    </div>
                    <Badge className={segment.color}>{segment.leadsCount}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Критерії:</p>
                      <p className="text-sm font-medium">{segment.criteria}</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Конверсія</span>
                        <span className="font-semibold">{segment.conversionRate}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${segment.conversionRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleExportSegment(segment)}
                      >
                        Експорт
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCreateCampaign(segment)}
                      >
                        Кампанія
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Segments;