import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Users, Eye, MousePointer, Clock } from 'lucide-react';

const pageViewsData = [
  { date: '01.11', views: 4200, unique: 3100, bounce: 45 },
  { date: '02.11', views: 3800, unique: 2900, bounce: 48 },
  { date: '03.11', views: 5100, unique: 3800, bounce: 42 },
  { date: '04.11', views: 4600, unique: 3400, bounce: 44 },
  { date: '05.11', views: 5400, unique: 4100, bounce: 40 },
  { date: '06.11', views: 6200, unique: 4800, bounce: 38 },
  { date: '07.11', views: 5800, unique: 4400, bounce: 41 },
];

const topPagesData = [
  { page: '/home', views: 12458, avgTime: '3:24', bounceRate: 35 },
  { page: '/products', views: 8932, avgTime: '4:15', bounceRate: 28 },
  { page: '/about', views: 6421, avgTime: '2:48', bounceRate: 42 },
  { page: '/blog', views: 5234, avgTime: '5:30', bounceRate: 25 },
  { page: '/contact', views: 3156, avgTime: '2:10', bounceRate: 55 },
];

const deviceData = [
  { device: 'Desktop', sessions: 45, color: 'hsl(var(--primary))' },
  { device: 'Mobile', sessions: 40, color: 'hsl(var(--secondary))' },
  { device: 'Tablet', sessions: 15, color: 'hsl(var(--accent))' },
];

const behaviorFlowData = [
  { step: 'Landing', users: 10000 },
  { step: 'Product Page', users: 6500 },
  { step: 'Add to Cart', users: 3200 },
  { step: 'Checkout', users: 1800 },
  { step: 'Purchase', users: 1200 },
];

const Analytics = () => {
  const metrics = [
    { title: 'Всього переглядів', value: '156,429', change: '+18%', icon: Eye, color: 'primary' },
    { title: 'Унікальні відвідувачі', value: '45,231', change: '+12%', icon: Users, color: 'secondary' },
    { title: 'Середня тривалість', value: '4:23', change: '+5%', icon: Clock, color: 'accent' },
    { title: 'Показник відмов', value: '38.2%', change: '-3%', icon: MousePointer, color: 'primary' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Веб-аналітика</h1>
          <p className="text-muted-foreground mt-1">Детальна статистика відвідувачів та поведінки</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Останні 7 днів</SelectItem>
              <SelectItem value="30">Останні 30 днів</SelectItem>
              <SelectItem value="90">Останні 90 днів</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Експорт
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 text-${metric.color}`} />
                  <span className="text-sm font-medium text-secondary">{metric.change}</span>
                </div>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{metric.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Огляд</TabsTrigger>
          <TabsTrigger value="pages">Сторінки</TabsTrigger>
          <TabsTrigger value="behavior">Поведінка</TabsTrigger>
          <TabsTrigger value="devices">Пристрої</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Page Views Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Перегляди сторінок</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={pageViewsData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorViews)"
                    name="Всього переглядів"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="unique" 
                    stroke="hsl(var(--secondary))" 
                    fillOpacity={1} 
                    fill="url(#colorUnique)"
                    name="Унікальні"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bounce Rate Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Показник відмов (%)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={pageViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="bounce" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name="Відмови"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Топ сторінок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 pb-2 border-b font-semibold text-sm">
                  <div>Сторінка</div>
                  <div className="text-right">Перегляди</div>
                  <div className="text-right">Середній час</div>
                  <div className="text-right">Відмови</div>
                </div>
                {topPagesData.map((page, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b last:border-0 hover:bg-muted/50 transition-colors rounded-lg px-2">
                    <div className="font-medium">{page.page}</div>
                    <div className="text-right">{page.views.toLocaleString()}</div>
                    <div className="text-right text-muted-foreground">{page.avgTime}</div>
                    <div className="text-right">
                      <span className={page.bounceRate > 50 ? 'text-destructive' : 'text-secondary'}>
                        {page.bounceRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Воронка поведінки користувачів</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={behaviorFlowData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="step" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Bar dataKey="users" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-5 gap-4">
                {behaviorFlowData.map((step, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold">{((step.users / behaviorFlowData[0].users) * 100).toFixed(0)}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{step.step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Розподіл по пристроях</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{device.device}</span>
                        <span className="text-muted-foreground">{device.sessions}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${device.sessions}%`,
                            backgroundColor: device.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Браузери</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Chrome', percentage: 58 },
                    { name: 'Safari', percentage: 22 },
                    { name: 'Firefox', percentage: 12 },
                    { name: 'Edge', percentage: 6 },
                    { name: 'Інші', percentage: 2 },
                  ].map((browser, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span className="font-medium">{browser.name}</span>
                      <span className="text-muted-foreground">{browser.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
