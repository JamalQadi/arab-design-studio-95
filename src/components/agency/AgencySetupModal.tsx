
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Phone, Mail, Globe, MapPin, Calendar, X, Plus } from 'lucide-react';
import { supabaseService } from '@/services/supabaseService';
import { toast } from 'sonner';

interface AgencySetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgencyCreated: () => void;
  existingAgency?: any;
}

export const AgencySetupModal = ({ 
  open, 
  onOpenChange, 
  onAgencyCreated,
  existingAgency 
}: AgencySetupModalProps) => {
  const [agencyData, setAgencyData] = useState({
    agency_name: existingAgency?.agency_name || '',
    agency_name_en: existingAgency?.agency_name_en || '',
    license_number: existingAgency?.license_number || '',
    phone: existingAgency?.phone || '',
    email: existingAgency?.email || '',
    website: existingAgency?.website || '',
    address: existingAgency?.address || '',
    city: existingAgency?.city || '',
    country: existingAgency?.country || 'المملكة العربية السعودية',
    established_year: existingAgency?.established_year || '',
    description: existingAgency?.description || '',
    slogan: existingAgency?.slogan || '',
    services: existingAgency?.services || [],
    social_media: existingAgency?.social_media || {},
    colors: existingAgency?.colors || { primary: '#1e40af', secondary: '#f59e0b' }
  });

  const [newService, setNewService] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleServiceAdd = () => {
    if (newService.trim()) {
      setAgencyData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleServiceRemove = (index: number) => {
    setAgencyData(prev => ({
      ...prev,
      services: prev.services.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setAgencyData(prev => ({
      ...prev,
      social_media: {
        ...prev.social_media,
        [platform]: value
      }
    }));
  };

  const handleColorChange = (type: 'primary' | 'secondary', color: string) => {
    setAgencyData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [type]: color
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = existingAgency 
        ? await supabaseService.updateTravelAgency(existingAgency.id, agencyData)
        : await supabaseService.createTravelAgency(agencyData);

      if (result.success) {
        toast.success(existingAgency ? 'تم تحديث بيانات المكتب بنجاح' : 'تم إنشاء مكتب السفر بنجاح');
        onAgencyCreated();
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error saving agency:', error);
      toast.error('حدث خطأ أثناء حفظ البيانات');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            {existingAgency ? 'تحديث بيانات مكتب السفر' : 'إعداد مكتب السفر'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* المعلومات الأساسية */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">المعلومات الأساسية</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agency_name">اسم المكتب *</Label>
                  <Input
                    id="agency_name"
                    value={agencyData.agency_name}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, agency_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="agency_name_en">الاسم بالإنجليزية</Label>
                  <Input
                    id="agency_name_en"
                    value={agencyData.agency_name_en}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, agency_name_en: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="license_number">رقم الرخصة</Label>
                  <Input
                    id="license_number"
                    value={agencyData.license_number}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, license_number: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="established_year">سنة التأسيس</Label>
                  <Input
                    id="established_year"
                    type="number"
                    min="1900"
                    max="2024"
                    value={agencyData.established_year}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, established_year: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">وصف المكتب</Label>
                <Textarea
                  id="description"
                  value={agencyData.description}
                  onChange={(e) => setAgencyData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="slogan">الشعار</Label>
                <Input
                  id="slogan"
                  value={agencyData.slogan}
                  onChange={(e) => setAgencyData(prev => ({ ...prev, slogan: e.target.value }))}
                  placeholder="شعار مكتب السفر"
                />
              </div>
            </CardContent>
          </Card>

          {/* معلومات الاتصال */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Phone className="w-4 h-4" />
                معلومات الاتصال
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={agencyData.phone}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={agencyData.email}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="website">الموقع الإلكتروني</Label>
                  <Input
                    id="website"
                    value={agencyData.website}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="address">العنوان</Label>
                  <Input
                    id="address"
                    value={agencyData.address}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="city">المدينة</Label>
                  <Input
                    id="city"
                    value={agencyData.city}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="country">الدولة</Label>
                  <Input
                    id="country"
                    value={agencyData.country}
                    onChange={(e) => setAgencyData(prev => ({ ...prev, country: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* الخدمات */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">الخدمات المقدمة</h3>
              
              <div className="flex gap-2">
                <Input
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="أضف خدمة جديدة"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleServiceAdd())}
                />
                <Button type="button" onClick={handleServiceAdd} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {agencyData.services.map((service: string, index: number) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {service}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => handleServiceRemove(index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* وسائل التواصل الاجتماعي */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">وسائل التواصل الاجتماعي</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['twitter', 'instagram', 'facebook', 'linkedin', 'youtube', 'snapchat'].map((platform) => (
                  <div key={platform}>
                    <Label htmlFor={platform} className="capitalize">{platform}</Label>
                    <Input
                      id={platform}
                      value={agencyData.social_media[platform] || ''}
                      onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                      placeholder={`رابط ${platform}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* الألوان */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-lg">ألوان الهوية البصرية</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary_color">اللون الأساسي</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="primary_color"
                      type="color"
                      value={agencyData.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={agencyData.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      placeholder="#1e40af"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary_color">اللون الثانوي</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="secondary_color"
                      type="color"
                      value={agencyData.colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={agencyData.colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      placeholder="#f59e0b"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* أزرار التحكم */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'جاري الحفظ...' : existingAgency ? 'تحديث البيانات' : 'حفظ البيانات'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
