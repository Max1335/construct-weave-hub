import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { z } from 'zod';
import { Facebook, Instagram, Twitter, Linkedin, Calendar, Clock, Image as ImageIcon } from 'lucide-react';

const postSchema = z.object({
  content: z.string().trim().min(10, 'Текст має бути мінімум 10 символів').max(2000, 'Текст занадто довгий'),
  platforms: z.array(z.string()).min(1, 'Оберіть хоча б одну платформу'),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
  imageUrl: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface AddSocialPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPost: (post: any) => void;
}

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-[#1877F2]', maxChars: 63206 },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-[#E4405F]', maxChars: 2200 },
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-[#1DA1F2]', maxChars: 280 },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-[#0A66C2]', maxChars: 3000 },
];

export const AddSocialPostModal = ({ open, onOpenChange, onAddPost }: AddSocialPostModalProps) => {
  const [formData, setFormData] = useState<PostFormData>({
    content: '',
    platforms: [],
    scheduledDate: '',
    scheduledTime: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const handlePlatformToggle = (platformId: string) => {
    const newPlatforms = formData.platforms.includes(platformId)
      ? formData.platforms.filter(p => p !== platformId)
      : [...formData.platforms, platformId];
    setFormData({ ...formData, platforms: newPlatforms });
  };

  const getMaxChars = () => {
    if (formData.platforms.length === 0) return 2000;
    const selectedPlatforms = platforms.filter(p => formData.platforms.includes(p.id));
    return Math.min(...selectedPlatforms.map(p => p.maxChars));
  };

  const maxChars = getMaxChars();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = postSchema.parse(formData);
      
      const isScheduled = validatedData.scheduledDate && validatedData.scheduledTime;
      const scheduledDateTime = isScheduled 
        ? `${validatedData.scheduledDate.split('-').reverse().join('.')} ${validatedData.scheduledTime}`
        : new Date().toLocaleString('uk-UA');
      
      const newPost = {
        id: Date.now(),
        platform: validatedData.platforms[0], // Use first platform as primary
        platforms: validatedData.platforms,
        content: validatedData.content,
        date: scheduledDateTime,
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        image: validatedData.imageUrl || '📱',
        status: isScheduled ? 'scheduled' : 'published',
      };

      onAddPost(newPost);
      
      const platformNames = platforms
        .filter(p => validatedData.platforms.includes(p.id))
        .map(p => p.name)
        .join(', ');

      toast.success(isScheduled ? 'Пост заплановано!' : 'Пост опубліковано!', {
        description: `${platformNames} • ${isScheduled ? `Публікація: ${scheduledDateTime}` : 'Опубліковано зараз'}`,
      });

      // Reset form
      setFormData({
        content: '',
        platforms: [],
        scheduledDate: '',
        scheduledTime: '',
        imageUrl: '',
      });
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
          <DialogTitle className="text-2xl">Створити новий пост</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Platform Selection */}
          <div className="space-y-3">
            <Label>Оберіть платформи для публікації *</Label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = formData.platforms.includes(platform.id);
                
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-8 h-8 ${platform.color}`} />
                      <div className="flex-1">
                        <p className="font-semibold">{platform.name}</p>
                        <p className="text-xs text-muted-foreground">
                          До {platform.maxChars} символів
                        </p>
                      </div>
                      <Checkbox checked={isSelected} />
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.platforms && <p className="text-sm text-destructive">{errors.platforms}</p>}
          </div>

          {/* Post Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Текст посту *</Label>
            <Textarea
              id="content"
              placeholder="Що ви хочете розповісти своїй аудиторії?"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className={errors.content ? 'border-destructive' : ''}
              rows={8}
              maxLength={maxChars}
            />
            <div className="flex justify-between items-center">
              {errors.content ? (
                <p className="text-sm text-destructive">{errors.content}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {formData.platforms.length > 0 && `Ліміт: ${maxChars} символів для обраних платформ`}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {formData.content.length}/{maxChars}
              </p>
            </div>
          </div>

          {/* Image URL (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL зображення (опціонально)</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Введіть URL зображення або залиште порожнім для текстового посту
            </p>
          </div>

          {/* Schedule Options */}
          <div className="space-y-3">
            <Label>Час публікації</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="date"
                    min={today}
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="pl-10"
                    placeholder="Дата (опціонально)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                    className="pl-10"
                    placeholder="Час (опціонально)"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Залиште порожнім для миттєвої публікації або оберіть дату та час для планування
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
              {isSubmitting 
                ? 'Публікація...' 
                : (formData.scheduledDate && formData.scheduledTime ? 'Запланувати пост' : 'Опублікувати зараз')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
