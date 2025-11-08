import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, ArrowLeft, BarChart3, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setEmailSent(true);
      setIsLoading(false);
      toast.success('Посилання для відновлення паролю відправлено!');
    }, 1500);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <div className="w-full max-w-md">
          <div className="glass rounded-2xl p-8 shadow-glass backdrop-blur-xl bg-card/90">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Перевірте пошту</h1>
              <p className="text-muted-foreground mt-2 text-center">
                Ми відправили посилання для скидання паролю на {email}
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/login">
                <Button className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Повернутись до входу
                </Button>
              </Link>
              
              <button
                onClick={() => setEmailSent(false)}
                className="w-full text-sm text-primary hover:underline"
              >
                Не отримали email? Спробуйте ще раз
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 shadow-glass backdrop-blur-xl bg-card/90">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Забули пароль?</h1>
            <p className="text-muted-foreground mt-2 text-center">
              Введіть ваш email і ми відправимо посилання для відновлення
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Відправити посилання'
              )}
            </Button>
          </form>

          <div className="mt-6">
            <Link to="/login" className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Повернутись до входу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
