import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, Target, Users, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  icon: any;
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Оптимізуйте час відправки email',
    description: 'Ваші клієнти найбільш активні у вівторок та четвер між 10:00-12:00. Відправка в цей час може підвищити open rate на 23%.',
    impact: 'high',
    category: 'Email',
    icon: TrendingUp,
  },
  {
    id: 2,
    title: 'Сегментуйте неактивних лідів',
    description: '34% ваших лідів не показували активності більше 30 днів. Створіть реактиваційну кампанію для повернення їхньої уваги.',
    impact: 'high',
    category: 'Ліди',
    icon: Users,
  },
  {
    id: 3,
    title: 'Покращте показник конверсії',
    description: 'Ліди з lead score вище 80 мають конверсію 45%. Фокусуйтесь на лідах з високим рейтингом для кращих результатів.',
    impact: 'medium',
    category: 'Конверсія',
    icon: Target,
  },
];

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'bg-secondary text-secondary-foreground';
    case 'medium':
      return 'bg-accent text-accent-foreground';
    case 'low':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted';
  }
};

const getImpactLabel = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'Високий вплив';
    case 'medium':
      return 'Середній вплив';
    case 'low':
      return 'Низький вплив';
    default:
      return impact;
  }
};

export const RecommendationsCard = () => {
  const handleApplyRecommendation = (rec: Recommendation) => {
    toast.success('Рекомендацію застосовано!', {
      description: `"${rec.title}" додано до списку завдань`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <CardTitle>AI Рекомендації</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Автоматичні підказки на основі аналізу ваших даних
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <div
                key={rec.id}
                className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <Badge variant="outline" className={getImpactColor(rec.impact)}>
                        {getImpactLabel(rec.impact)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {rec.category}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleApplyRecommendation(rec)}
                  >
                    Застосувати
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};