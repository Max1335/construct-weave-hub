import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Calendar, TrendingUp, Users, Mail, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const initialReports = [
  {
    id: 1,
    name: 'Щомісячний звіт - Січень 2025',
    type: 'monthly',
    date: '01.02.2025',
    status: 'ready',
    size: '2.4 MB',
  },
  {
    id: 2,
    name: 'Аналітика веб-трафіку Q1 2025',
    type: 'quarterly',
    date: '01.04.2025',
    status: 'ready',
    size: '5.8 MB',
  },
  {
    id: 3,
    name: 'Email кампанії - Квітень',
    type: 'campaign',
    date: '30.04.2025',
    status: 'ready',
    size: '1.2 MB',
  },
  {
    id: 4,
    name: 'Звіт по лідах - Травень',
    type: 'leads',
    date: '31.05.2025',
    status: 'ready',
    size: '3.1 MB',
  },
];

const scheduledReports = [
  {
    id: 1,
    name: 'Щомісячний звіт',
    frequency: 'Щомісяця 1-го числа',
    nextRun: '01.06.2025',
    recipients: ['admin@example.com', 'manager@example.com'],
  },
  {
    id: 2,
    name: 'Щотижневий дайджест',
    frequency: 'Щопонеділка 9:00',
    nextRun: '05.06.2025',
    recipients: ['team@example.com'],
  },
];

const Reports = () => {
  const [reports, setReports] = useState(initialReports);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'monthly': return 'Щомісячний';
      case 'quarterly': return 'Квартальний';
      case 'campaign': return 'Кампанія';
      case 'leads': return 'Ліди';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'monthly': return 'bg-primary';
      case 'quarterly': return 'bg-secondary';
      case 'campaign': return 'bg-accent';
      case 'leads': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const handleGenerateReport = () => {
    if (!selectedType || !selectedPeriod) {
      toast.error('Оберіть тип звіту та період', {
        description: 'Для генерації звіту потрібно вибрати обидва параметри',
      });
      return;
    }

    const typeLabels: { [key: string]: string } = {
      'analytics': 'Веб-аналітика',
      'crm': 'CRM та ліди',
      'email': 'Email кампанії',
      'social': 'Соц. мережі',
    };

    const newReport = {
      id: Date.now(),
      name: `${typeLabels[selectedType]} - ${selectedPeriod}`,
      type: selectedType === 'email' ? 'campaign' : selectedType === 'crm' ? 'leads' : 'monthly',
      date: new Date().toLocaleDateString('uk-UA'),
      status: 'ready',
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
    };

    setReports([newReport, ...reports]);
    
    toast.success('Звіт успішно згенеровано!', {
      description: `${typeLabels[selectedType]} за період "${selectedPeriod}"`,
    });

    setSelectedType('');
    setSelectedPeriod('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Звіти</h1>
          <p className="text-muted-foreground mt-1">Генеруйте та завантажуйте детальні звіти</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Створити звіт
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <p className="text-2xl font-bold">28</p>
            <p className="text-sm text-muted-foreground">Згенеровано звітів</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-2xl font-bold">342</p>
            <p className="text-sm text-muted-foreground">Проаналізовано лідів</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Email кампаній</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Share2 className="w-8 h-8 text-primary" />
            </div>
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">Соц. мережі</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Доступні звіти</TabsTrigger>
          <TabsTrigger value="scheduled">Автоматичні звіти</TabsTrigger>
          <TabsTrigger value="custom">Створити звіт</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{report.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {report.date}
                        </div>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={getTypeColor(report.type)}>
                      {getTypeLabel(report.type)}
                    </Badge>
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Завантажити
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{report.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        Частота: <span className="text-foreground font-medium">{report.frequency}</span>
                      </p>
                      <p className="text-muted-foreground">
                        Наступна відправка: <span className="text-foreground font-medium">{report.nextRun}</span>
                      </p>
                      <p className="text-muted-foreground">
                        Отримувачі: <span className="text-foreground font-medium">{report.recipients.join(', ')}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Редагувати</Button>
                    <Button variant="destructive">Видалити</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Створити кастомний звіт</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                  <h3 className="font-semibold">Оберіть тип звіту</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: TrendingUp, label: 'Веб-аналітика', value: 'analytics' },
                      { icon: Users, label: 'CRM та ліди', value: 'crm' },
                      { icon: Mail, label: 'Email кампанії', value: 'email' },
                      { icon: Share2, label: 'Соц. мережі', value: 'social' },
                    ].map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setSelectedType(type.value)}
                          className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left ${
                            selectedType === type.value ? 'bg-primary/10 border-primary' : ''
                          }`}
                        >
                          <Icon className="w-6 h-6 mb-2 text-primary" />
                          <p className="font-medium text-sm">{type.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Оберіть період</h3>
                  <div className="space-y-2">
                    {[
                      'Останні 7 днів',
                      'Останні 30 днів',
                      'Останні 90 днів',
                      'Цей місяць',
                      'Минулий місяць',
                      'Кастомний період',
                    ].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`w-full p-3 border rounded-lg hover:bg-muted/50 transition-colors text-left ${
                          selectedPeriod === period ? 'bg-primary/10 border-primary' : ''
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleGenerateReport}
                  disabled={!selectedType || !selectedPeriod}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Згенерувати звіт
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
