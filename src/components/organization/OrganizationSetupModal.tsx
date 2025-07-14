
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { organizationService } from "@/services/organizationService";
import { Upload, X } from "lucide-react";

interface OrganizationSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrganizationCreated?: () => void;
  organizationId?: string;
}

export const OrganizationSetupModal = ({ 
  open, 
  onOpenChange, 
  onOrganizationCreated,
  organizationId 
}: OrganizationSetupModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    type: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    country: 'المملكة العربية السعودية',
    logo: '',
    social_media: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      tiktok: '',
      snapchat: ''
    },
    branding: {
      primary_color: '#1e40af',
      secondary_color: '#f59e0b',
      font_family: 'Arial'
    }
  });

  const organizationTypes = organizationService.getOrganizationTypes();

  useEffect(() => {
    if (organizationId && open) {
      loadOrganization();
    }
  }, [organizationId, open]);

  const loadOrganization = async () => {
    if (!organizationId) return;
    
    setIsLoading(true);
    try {
      const result = await organizationService.getOrganization(organizationId);
      if (result.success && result.organization) {
        const org = result.organization;
        setFormData({
          name: org.name || '',
          name_en: (org as any).name_en || '',
          type: org.type || '',
          phone: org.phone || '',
          email: org.email || '',
          website: org.website || '',
          address: org.address || '',
          city: (org as any).city || '',
          country: (org as any).country || 'المملكة العربية السعودية',
          logo: org.logo || '',
          social_media: (org.social_media as any) || {
            facebook: '', twitter: '', instagram: '', linkedin: '', 
            youtube: '', tiktok: '', snapchat: ''
          },
          branding: (org.branding as any) || {
            primary_color: '#1e40af',
            secondary_color: '#f59e0b',
            font_family: 'Arial'
          }
        });
      }
    } catch (error) {
      console.error('Error loading organization:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type) return;

    setIsLoading(true);
    try {
      const result = organizationId 
        ? await organizationService.updateOrganization(organizationId, formData)
        : await organizationService.createOrganization(formData);

      if (result.success) {
        onOrganizationCreated?.();
        onOpenChange(false);
        setFormData({
          name: '', name_en: '', type: '', phone: '', email: '', website: '',
          address: '', city: '', country: 'المملكة العربية السعودية', logo: '',
          social_media: { facebook: '', twitter: '', instagram: '', linkedin: '', 
                         youtube: '', tiktok: '', snapchat: '' },
          branding: { primary_color: '#1e40af', secondary_color: '#f59e0b', font_family: 'Arial' }
        });
      }
    } catch (error) {
      console.error('Error saving organization:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      social_media: {
        ...prev.social_media,
        [platform]: value
      }
    }));
  };

  const handleBrandingChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        [key]: value
      }
    }));
  };

  const selectedType = organizationTypes.find(t => t.id === formData.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">
            {organizationId ? 'تحديث بيانات المؤسسة' : 'إعداد بيانات المؤسسة'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">المعلومات الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">اسم المؤسسة *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="اسم المؤسسة"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name_en">اسم المؤسسة (بالإنجليزية)</Label>
                  <Input
                    id="name_en"
                    value={formData.name_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                    placeholder="Organization Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">نوع المؤسسة *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المؤسسة" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <span>{type.icon}</span>
                            <span>{type.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedType && (
                  <Badge variant="outline" className="w-fit">
                    {selectedType.icon} {selectedType.name}
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">معلومات الاتصال</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+966 50 123 4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="info@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">الموقع الإلكتروني</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="العنوان الكامل"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="الرياض"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">البلد</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      placeholder="المملكة العربية السعودية"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">وسائل التواصل الاجتماعي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(formData.social_media).map(([platform, value]) => (
                  <div key={platform} className="space-y-2">
                    <Label htmlFor={platform}>{platform}</Label>
                    <Input
                      id={platform}
                      value={value}
                      onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                      placeholder={`@${platform}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Branding */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">هوية المؤسسة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary_color">اللون الأساسي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary_color"
                      type="color"
                      value={formData.branding.primary_color}
                      onChange={(e) => handleBrandingChange('primary_color', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={formData.branding.primary_color}
                      onChange={(e) => handleBrandingChange('primary_color', e.target.value)}
                      placeholder="#1e40af"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary_color">اللون الثانوي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary_color"
                      type="color"
                      value={formData.branding.secondary_color}
                      onChange={(e) => handleBrandingChange('secondary_color', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={formData.branding.secondary_color}
                      onChange={(e) => handleBrandingChange('secondary_color', e.target.value)}
                      placeholder="#f59e0b"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font_family">خط المؤسسة</Label>
                  <Select value={formData.branding.font_family} onValueChange={(value) => handleBrandingChange('font_family', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الخط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Verdana">Verdana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'جاري الحفظ...' : (organizationId ? 'تحديث' : 'إنشاء')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
