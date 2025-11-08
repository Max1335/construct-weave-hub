import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Building2, Bell, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Профіль успішно оновлено');
    }, 1000);
  };

  const handleSavePassword = async () => {
    setIsLoading(true);
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Пароль успішно змінено');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Налаштування</h1>
        <p className="text-muted-foreground mt-2">
          Керуйте налаштуваннями свого облікового запису та параметрами системи
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Профіль
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="w-4 h-4 mr-2" />
            Компанія
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="w-4 h-4 mr-2" />
            Безпека
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Сповіщення
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Персональна інформація</CardTitle>
              <CardDescription>
                Оновіть свою особисту інформацію та контактні дані
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Змінити фото</Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG або GIF (макс. 2MB)
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Повне ім'я</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+380..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Посада</Label>
                  <Input id="position" placeholder="Менеджер з маркетингу" />
                </div>
              </div>

              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? 'Збереження...' : 'Зберегти зміни'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Інформація про компанію</CardTitle>
              <CardDescription>
                Налаштуйте дані вашої організації
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Назва компанії</Label>
                <Input id="company" defaultValue={user?.companyName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Веб-сайт</Label>
                <Input id="website" type="url" placeholder="https://example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Галузь</Label>
                <Input id="industry" placeholder="IT, Роздрібна торгівля, тощо" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адреса</Label>
                <Input id="address" placeholder="вул. Хрещатик, 1, Київ" />
              </div>

              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? 'Збереження...' : 'Зберегти зміни'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Зміна пароля</CardTitle>
              <CardDescription>
                Оновіть пароль для захисту вашого облікового запису
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Поточний пароль</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Новий пароль</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Підтвердіть пароль</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button onClick={handleSavePassword} disabled={isLoading}>
                {isLoading ? 'Збереження...' : 'Змінити пароль'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Двофакторна автентифікація</CardTitle>
              <CardDescription>
                Додайте додатковий рівень безпеки до вашого облікового запису
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Налаштувати 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email сповіщення</CardTitle>
              <CardDescription>
                Налаштуйте типи повідомлень, які ви хочете отримувати
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Звіти про кампанії</Label>
                  <p className="text-sm text-muted-foreground">
                    Отримуйте щотижневі звіти про ефективність кампаній
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Нові ліди</Label>
                  <p className="text-sm text-muted-foreground">
                    Сповіщення про нових лідів у системі
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Оновлення системи</Label>
                  <p className="text-sm text-muted-foreground">
                    Важливі оновлення та новини про платформу
                  </p>
                </div>
                <input type="checkbox" className="h-5 w-5" />
              </div>

              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? 'Збереження...' : 'Зберегти налаштування'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
