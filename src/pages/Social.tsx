import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AddSocialPostModal } from '@/components/AddSocialPostModal';
import { Facebook, Instagram, Twitter, Linkedin, Plus, TrendingUp, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

const socialAccounts = [
  { platform: 'Facebook', followers: 12458, engagement: 4.2, icon: Facebook, color: 'text-[#1877F2]' },
  { platform: 'Instagram', followers: 8932, engagement: 6.8, icon: Instagram, color: 'text-[#E4405F]' },
  { platform: 'Twitter', followers: 5421, engagement: 3.1, icon: Twitter, color: 'text-[#1DA1F2]' },
  { platform: 'LinkedIn', followers: 3156, engagement: 5.4, icon: Linkedin, color: 'text-[#0A66C2]' },
];

const initialRecentPosts = [
  {
    id: 1,
    platform: 'instagram',
    content: 'Наша нова колекція вже доступна! 🎉',
    date: '07.11.2024 14:30',
    likes: 423,
    comments: 56,
    shares: 23,
    views: 8932,
    image: '📸',
  },
  {
    id: 2,
    platform: 'facebook',
    content: 'Дякуємо за підтримку! Ми досягли 10к підписників 🙌',
    date: '06.11.2024 10:15',
    likes: 892,
    comments: 124,
    shares: 67,
    views: 12458,
    image: '🎊',
  },
  {
    id: 3,
    platform: 'linkedin',
    content: 'Ми шукаємо таланти! Приєднуйтесь до нашої команди',
    date: '05.11.2024 16:45',
    likes: 234,
    comments: 45,
    shares: 89,
    views: 5421,
    image: '💼',
  },
];

const scheduledPosts = [
  {
    id: 1,
    platform: 'Instagram',
    content: 'Нова публікація про продукт X',
    scheduledFor: '10.11.2024 12:00',
    status: 'scheduled',
  },
  {
    id: 2,
    platform: 'Facebook',
    content: 'Промо акція на вихідні',
    scheduledFor: '09.11.2024 09:00',
    status: 'scheduled',
  },
];

const Social = () => {
  const [recentPosts, setRecentPosts] = useState(initialRecentPosts);
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);

  const handleAddPost = (newPost: any) => {
    setRecentPosts([newPost, ...recentPosts]);
  };
  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    const account = socialAccounts.find(a => a.platform.toLowerCase() === platformLower);
    return account ? account.icon : Share2;
  };

  const getPlatformColor = (platform: string) => {
    const platformLower = platform.toLowerCase();
    const account = socialAccounts.find(a => a.platform.toLowerCase() === platformLower);
    return account ? account.color : 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Соціальні мережі</h1>
          <p className="text-muted-foreground mt-1">Управління всіма вашими соціальними акаунтами</p>
        </div>
        <Button onClick={() => setAddPostModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Новий пост
        </Button>
      </div>

      {/* Social Accounts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialAccounts.map((account) => {
          const Icon = account.icon;
          return (
            <Card key={account.platform} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-10 h-10 ${account.color}`} />
                  <Badge variant="outline">Активний</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{account.platform}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Підписники</span>
                    <span className="font-semibold">{account.followers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Engagement</span>
                    <span className="font-semibold text-secondary">{account.engagement}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts">Публікації</TabsTrigger>
          <TabsTrigger value="scheduled">Заплановано</TabsTrigger>
          <TabsTrigger value="analytics">Аналітика</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {recentPosts.map((post) => {
            const Icon = getPlatformIcon(post.platform);
            const colorClass = getPlatformColor(post.platform);
            
            return (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="text-6xl">{post.image}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${colorClass}`} />
                        <span className="font-semibold">{post.platform}</span>
                        <span className="text-sm text-muted-foreground">• {post.date}</span>
                      </div>
                      
                      <p className="text-lg mb-4">{post.content}</p>
                      
                      <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-destructive" />
                          <span className="font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-primary" />
                          <span className="font-medium">{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Share2 className="w-4 h-4 text-secondary" />
                          <span className="font-medium">{post.shares}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{post.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledPosts.map((post) => {
            const Icon = getPlatformIcon(post.platform);
            const colorClass = getPlatformColor(post.platform);
            
            return (
              <Card key={post.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Icon className={`w-8 h-8 ${colorClass}`} />
                      <div>
                        <p className="font-semibold mb-1">{post.content}</p>
                        <p className="text-sm text-muted-foreground">
                          Заплановано на: {post.scheduledFor}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Редагувати</Button>
                      <Button variant="destructive" size="sm">Скасувати</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {scheduledPosts.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">Немає запланованих публікацій</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Запланувати пост
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Зростання підписників</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialAccounts.map((account) => {
                    const Icon = account.icon;
                    return (
                      <div key={account.platform} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-6 h-6 ${account.color}`} />
                          <span className="font-medium">{account.platform}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{account.followers.toLocaleString()}</p>
                          <p className="text-sm text-secondary flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +{Math.round(account.followers * 0.08)} цього місяця
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement по платформах</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialAccounts
                    .sort((a, b) => b.engagement - a.engagement)
                    .map((account, index) => {
                      const Icon = account.icon;
                      return (
                        <div key={account.platform}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-5 h-5 ${account.color}`} />
                              <span className="font-medium">{account.platform}</span>
                            </div>
                            <span className="font-semibold">{account.engagement}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(account.engagement / 7) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AddSocialPostModal
        open={addPostModalOpen}
        onOpenChange={setAddPostModalOpen}
        onAddPost={handleAddPost}
      />
    </div>
  );
};

export default Social;
