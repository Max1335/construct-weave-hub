import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Ім\'я має бути мінімум 2 символи').max(100, 'Ім\'я занадто довге'),
  email: z.string().trim().email('Невірний формат email').max(255, 'Email занадто довгий'),
  phone: z.string().trim().min(10, 'Невірний формат телефону').max(20, 'Телефон занадто довгий').optional().or(z.literal('')),
  company: z.string().trim().min(2, 'Назва компанії має бути мінімум 2 символи').max(100, 'Назва занадто довга'),
  position: z.string().trim().max(100, 'Посада занадто довга').optional().or(z.literal('')),
  source: z.enum(['organic', 'paid', 'social', 'email', 'referral', 'manual'], {
    errorMap: () => ({ message: 'Оберіть джерело ліда' })
  }),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface AddLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLead: (lead: any) => void;
}

export const AddLeadModal = ({ open, onOpenChange, onAddLead }: AddLeadModalProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    source: 'organic' as const,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = leadSchema.parse(formData);
      
      const newLead = {
        id: Date.now(),
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || undefined,
        company: validatedData.company,
        position: validatedData.position || undefined,
        status: 'new',
        score: Math.floor(Math.random() * 30) + 50, // Random score 50-80 for new leads
        source: validatedData.source,
        createdAt: new Date().toLocaleDateString('uk-UA'),
        lastActivity: new Date().toLocaleDateString('uk-UA'),
        interactions: 0,
        emailOpenRate: 0,
        tags: tags.length > 0 ? tags : undefined,
      };

      onAddLead(newLead);
      
      toast.success('Ліда успішно додано!', {
        description: `${newLead.name} доданий до бази лідів`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        source: 'organic',
      });
      setTags([]);
      setNewTag('');
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

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    } else if (tags.length >= 5) {
      toast.error('Максимум 5 тегів');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Додати нового ліда</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ім'я *</Label>
              <Input
                id="name"
                placeholder="Введіть ім'я"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                placeholder="+380 XX XXX XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Компанія *</Label>
              <Input
                id="company"
                placeholder="Назва компанії"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={errors.company ? 'border-destructive' : ''}
              />
              {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Посада</Label>
              <Input
                id="position"
                placeholder="CEO, Manager, тощо"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Джерело *</Label>
              <Select 
                value={formData.source} 
                onValueChange={(value: any) => setFormData({ ...formData, source: value })}
              >
                <SelectTrigger className={errors.source ? 'border-destructive' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Органіка</SelectItem>
                  <SelectItem value="paid">Реклама</SelectItem>
                  <SelectItem value="social">Соцмережі</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="referral">Рекомендація</SelectItem>
                  <SelectItem value="manual">Вручну</SelectItem>
                </SelectContent>
              </Select>
              {errors.source && <p className="text-sm text-destructive">{errors.source}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Теги</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Додати тег"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                maxLength={20}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Додати
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Додайте до 5 тегів для категоризації ліда
            </p>
          </div>

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
              {isSubmitting ? 'Додавання...' : 'Додати ліда'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
