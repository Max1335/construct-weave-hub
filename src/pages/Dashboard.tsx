import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, UserPlus, Target, ArrowUp, ArrowDown } from 'lucide-react';

const trafficData = [
  { date: '1', current: 2400, previous: 2100 },
  { date: '5', current: 1398, previous: 1800 },
  { date: '10', current: 9800, previous: 7800 },
  { date: '15', current: 3908, previous: 3200 },
  { date: '20', current: 4800, previous: 4100 },
  { date: '25', current: 3800, previous: 3400 },
  { date: '30', current: 4300, previous: 3900 },
];

const sourceData = [
  { name: 'Organic Search', value: 45, color: 'hsl(var(--secondary))' },
  { name: 'Paid Ads', value: 25, color: 'hsl(var(--primary))' },
  { name: 'Social Media', value: 15, color: 'hsl(262 83% 58%)' },
  { name: 'Direct', value: 10, color: 'hsl(var(--accent))' },
  { name: 'Referral', value: 5, color: 'hsl(var(--muted))' },
];

const conversionData = [
  { channel: 'Email', conversions: 45 },
  { channel: 'Social', conversions: 32 },
  { channel: 'Paid', conversions: 28 },
  { channel: 'Organic', conversions: 25 },
  { channel: 'Direct', conversions: 12 },
];

const Dashboard = () => {
  const metrics = [
    {
      title: 'Відвідувачі сайту',
      value: '12,458',
      change: '+23%',
      isPositive: true,
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Конверсії',
      value: '342',
      change: '+12%',
      isPositive: true,
      icon: Target,
      color: 'secondary',
    },
    {
      title: 'ROI кампаній',
      value: '285%',
      change: '+8%',
      isPositive: true,
      icon: TrendingUp,
      color: 'accent',
    },
    {
      title: 'Активні ліди',
      value: '89',
      change: '+18 нових',
      isPositive: true,
      icon: UserPlus,
      color: 'secondary',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <p className="text-muted-foreground mt-1">Огляд ключових метрик та аналітики</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <div className="flex items-center gap-1 text-sm">
                      {metric.isPositive ? (
                        <ArrowUp className="w-4 h-4 text-secondary" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className={metric.isPositive ? 'text-secondary' : 'text-destructive'}>
                        {metric.change}
                      </span>
                      <span className="text-muted-foreground">від минулого місяця</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-${metric.color}/10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Traffic Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Трафік за останні 30 днів</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="current" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorCurrent)"
                name="Цей місяць"
              />
              <Area 
                type="monotone" 
                dataKey="previous" 
                stroke="hsl(var(--muted-foreground))" 
                fillOpacity={1} 
                fill="url(#colorPrevious)"
                name="Минулий місяць"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Source & Conversion Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Джерела трафіку</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Конверсії за каналами</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="channel" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="conversions" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
