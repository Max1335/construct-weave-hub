import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { z } from 'zod';
import { Calendar, Clock } from 'lucide-react';

const campaignSchema = z.object({
  name: z.string().trim().min(3, 'Назва має бути мінімум 3 символи').max(100, 'Назва занадто довга'),
  subject: z.string().trim().min(5, 'Тема має бути мінімум 5 символів').max(200, 'Тема занадто довга'),
  template: z.enum(['promo', 'product', 'welcome', 'reminder'], {
    errorMap: () => ({ message: 'Оберіть шаблон' })
  }),
  scheduledDate: z.string().min(1, 'Оберіть дату відправки'),
  scheduledTime: z.string().min(1, 'Оберіть час відправки'),
  content: z.string().trim().min(10, 'Контент має бути мінімум 10 символів').max(5000, 'Контент занадто довгий').optional().or(z.literal('')),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface AddCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCampaign: (campaign: any) => void;
}

const templates = [
  { id: 'promo', name: 'Промо-акція', emoji: '🎉', description: 'Ідеально для акцій та знижок' },
  { id: 'product', name: 'Новини продукту', emoji: '🚀', description: 'Анонси нових продуктів' },
  { id: 'welcome', name: 'Welcome Email', emoji: '👋', description: 'Вітання нових підписників' },
  { id: 'reminder', name: 'Нагадування', emoji: '⏰', description: 'Нагадування та followup' },
];

export const AddCampaignModal = ({ open, onOpenChange, onAddCampaign }: AddCampaignModalProps) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    subject: '',
    template: 'promo' as const,
    scheduledDate: '',
    scheduledTime: '',
    content: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('promo');

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setFormData({ ...formData, template: templateId as any });
    
    // Auto-fill example subject based on template
    const subjects: Record<string, string> = {
      promo: '🔥 Спеціальна пропозиція тільки для вас!',
      product: '🚀 Нові можливості вже доступні',
      welcome: '👋 Ласкаво просимо! Почнімо разом',
      reminder: '⏰ Нагадування: не пропустіть',
    };
    
    if (!formData.subject) {
      setFormData({ ...formData, template: templateId as any, subject: subjects[templateId] || '' });
    } else {
      setFormData({ ...formData, template: templateId as any });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = campaignSchema.parse(formData);
      
      const scheduledDateTime = `${validatedData.scheduledDate.split('-').reverse().join('.')} ${validatedData.scheduledTime}`;
      const isScheduled = new Date(`${validatedData.scheduledDate}T${validatedData.scheduledTime}`) > new Date();
      
      const newCampaign = {
        id: Date.now(),
        name: validatedData.name,
        subject: validatedData.subject,
        status: isScheduled ? 'scheduled' : 'draft',
        sent: 0,
        opened: 0,
        clicked: 0,
        date: scheduledDateTime,
        template: validatedData.template,
      };

      onAddCampaign(newCampaign);
      
      toast.success(isScheduled ? 'Кампанію заплановано!' : 'Чернетку створено!', {
        description: isScheduled 
          ? `Відправка: ${scheduledDateTime}`
          : 'Кампанія збережена як чернетка',
      });

      // Reset form
      setFormData({
        name: '',
        subject: '',
        template: 'promo',
        scheduledDate: '',
        scheduledTime: '',
        content: '',
      });
      setSelectedTemplateId('promo');
      onOpenChange(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Помилка валідації', {
          description: 'Перевірте правильність заповнення полів',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Створити нову кампанію</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Назва кампанії *</Label>
            <Input
              id="name"
              placeholder="Наприклад: Літня розпродаж 2024"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <Label>Оберіть шаблон *</Label>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                    selectedTemplateId === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{template.emoji}</span>
                    <div>
                      <p className="font-semibold">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Тема листа *</Label>
            <Input
              id="subject"
              placeholder="Привабливий заголовок для ваших підписників"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={errors.subject ? 'border-destructive' : ''}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">
              {formData.subject.length}/200 символів
            </p>
            {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
          </div>

          {/* Schedule Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Дата відправки *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="scheduledDate"
                  type="date"
                  min={today}
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className={`pl-10 ${errors.scheduledDate ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.scheduledDate && <p className="text-sm text-destructive">{errors.scheduledDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Час відправки *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="scheduledTime"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className={`pl-10 ${errors.scheduledTime ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.scheduledTime && <p className="text-sm text-destructive">{errors.scheduledTime}</p>}
            </div>
          </div>

          {/* Content Preview (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="content">Попередній перегляд контенту (опціонально)</Label>
            <Textarea
              id="content"
              placeholder="Введіть основний текст вашого email..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              maxLength={5000}
            />
            <p className="text-xs text-muted-foreground">
              Повний контент можна редагувати пізніше в конструкторі
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Скасувати
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Створення...' : 'Створити кампанію'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
