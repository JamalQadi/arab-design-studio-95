
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Copy, Eye, Lock, Calendar, Globe } from 'lucide-react';
import { supabaseService } from '@/services/supabaseService';
import { toast } from 'sonner';

interface ShareDesignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName: string;
}

export const ShareDesignModal = ({ 
  open, 
  onOpenChange, 
  projectId, 
  projectName 
}: ShareDesignModalProps) => {
  const [shareData, setShareData] = useState({
    title: projectName,
    description: '',
    is_public: true,
    password_protected: false,
    password: '',
    expires_at: ''
  });
  const [shareUrl, setShareUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateShare = async () => {
    setIsLoading(true);

    try {
      const result = await supabaseService.createSharedDesign({
        project_id: projectId,
        title: shareData.title,
        description: shareData.description,
        is_public: shareData.is_public,
        password_protected: shareData.password_protected,
        password: shareData.password_protected ? shareData.password : undefined,
        expires_at: shareData.expires_at || undefined
      });

      if (result.success && result.share) {
        const url = `${window.location.origin}/shared/${result.share.share_token}`;
        setShareUrl(url);
        toast.success('تم إنشاء رابط المشاركة بنجاح');
      }
    } catch (error) {
      console.error('Error creating share:', error);
      toast.error('حدث خطأ أثناء إنشاء رابط المشاركة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('تم نسخ الرابط');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            مشاركة التصميم
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!shareUrl ? (
            <>
              {/* معلومات المشاركة */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="title">عنوان المشاركة</Label>
                    <Input
                      id="title"
                      value={shareData.title}
                      onChange={(e) => setShareData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="عنوان التصميم"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">وصف التصميم</Label>
                    <Textarea
                      id="description"
                      value={shareData.description}
                      onChange={(e) => setShareData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="وصف مختصر للتصميم"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* إعدادات المشاركة */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold">إعدادات المشاركة</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <Label>مشاركة عامة</Label>
                    </div>
                    <Switch
                      checked={shareData.is_public}
                      onCheckedChange={(checked) => setShareData(prev => ({ ...prev, is_public: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <Label>حماية بكلمة مرور</Label>
                    </div>
                    <Switch
                      checked={shareData.password_protected}
                      onCheckedChange={(checked) => setShareData(prev => ({ 
                        ...prev, 
                        password_protected: checked,
                        password: checked ? prev.password : ''
                      }))}
                    />
                  </div>

                  {shareData.password_protected && (
                    <div>
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Input
                        id="password"
                        type="password"
                        value={shareData.password}
                        onChange={(e) => setShareData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="أدخل كلمة المرور"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="expires_at" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      تاريخ انتهاء الصلاحية (اختياري)
                    </Label>
                    <Input
                      id="expires_at"
                      type="datetime-local"
                      value={shareData.expires_at}
                      onChange={(e) => setShareData(prev => ({ ...prev, expires_at: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleCreateShare} disabled={isLoading}>
                  {isLoading ? 'جاري الإنشاء...' : 'إنشاء رابط المشاركة'}
                </Button>
              </div>
            </>
          ) : (
            /* عرض رابط المشاركة */
            <Card>
              <CardContent className="p-4 space-y-4 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <Share2 className="w-8 h-8 text-green-600" />
                </div>
                
                <h3 className="font-semibold text-lg">تم إنشاء رابط المشاركة بنجاح!</h3>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">رابط المشاركة:</p>
                  <div className="flex items-center gap-2">
                    <Input
                      value={shareUrl}
                      readOnly
                      className="text-center"
                    />
                    <Button size="sm" onClick={handleCopyUrl}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <Button variant="outline" onClick={() => setShareUrl('')}>
                    إنشاء رابط آخر
                  </Button>
                  <Button onClick={() => onOpenChange(false)}>
                    إغلاق
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
