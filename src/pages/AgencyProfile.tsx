
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, Phone, Mail, Globe, MapPin, Calendar, Edit, Plus, Palette } from 'lucide-react';
import { AgencySetupModal } from '@/components/agency/AgencySetupModal';
import { supabaseService } from '@/services/supabaseService';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';

const AgencyProfile = () => {
  const { user } = useAuth();
  const [agencyData, setAgencyData] = useState<any>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAgencyData();
    }
  }, [user]);

  const loadAgencyData = async () => {
    try {
      const result = await supabaseService.getTravelAgencyData();
      if (result.success && result.agency) {
        setAgencyData(result.agency);
      }
    } catch (error) {
      console.error('Error loading agency data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgencyCreated = () => {
    loadAgencyData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!agencyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">أنشئ ملف تعريفي لمكتب السفر</h2>
            <p className="text-gray-600 mb-6">
              قم بإنشاء الملف التعريفي لمكتب السفر لتتمكن من استخدام بياناتك في القوالب تلقائياً
            </p>
            <Button onClick={() => setIsSetupModalOpen(true)}>
              <Plus className="w-4 h-4 ml-2" />
              إنشاء ملف تعريفي
            </Button>
          </CardContent>
        </Card>

        <AgencySetupModal
          open={isSetupModalOpen}
          onOpenChange={setIsSetupModalOpen}
          onAgencyCreated={handleAgencyCreated}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ملف مكتب السفر</h1>
            <p className="text-gray-600">إدارة بيانات مكتب السفر الخاص بك</p>
          </div>
          <Button onClick={() => setIsSetupModalOpen(true)}>
            <Edit className="w-4 h-4 ml-2" />
            تعديل البيانات
          </Button>
        </div>

        {/* المعلومات الأساسية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg">{agencyData.agency_name}</h3>
                {agencyData.agency_name_en && (
                  <p className="text-gray-600">{agencyData.agency_name_en}</p>
                )}
                {agencyData.slogan && (
                  <p className="text-sm text-blue-600 italic mt-1">"{agencyData.slogan}"</p>
                )}
              </div>
              <div className="space-y-2">
                {agencyData.license_number && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">رقم الرخصة:</span>
                    <span className="text-sm font-medium">{agencyData.license_number}</span>
                  </div>
                )}
                {agencyData.established_year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">تأسس عام {agencyData.established_year}</span>
                  </div>
                )}
              </div>
            </div>
            
            {agencyData.description && (
              <div>
                <h4 className="font-medium mb-2">وصف المكتب</h4>
                <p className="text-gray-600">{agencyData.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* معلومات الاتصال */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              معلومات الاتصال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agencyData.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{agencyData.phone}</span>
                </div>
              )}
              {agencyData.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{agencyData.email}</span>
                </div>
              )}
              {agencyData.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a href={agencyData.website} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline">
                    {agencyData.website}
                  </a>
                </div>
              )}
              {(agencyData.address || agencyData.city) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>
                    {[agencyData.address, agencyData.city, agencyData.country]
                      .filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* الخدمات */}
        {agencyData.services && agencyData.services.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>الخدمات المقدمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agencyData.services.map((service: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* وسائل التواصل الاجتماعي */}
        {Object.keys(agencyData.social_media || {}).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(agencyData.social_media).map(([platform, url]) => (
                  url && (
                    <a key={platform} 
                       href={url as string} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 p-2 rounded-lg border hover:bg-gray-50 transition-colors">
                      <span className="capitalize font-medium">{platform}</span>
                    </a>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* الألوان */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              ألوان الهوية البصرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded border-2 border-gray-200"
                  style={{ backgroundColor: agencyData.colors?.primary || '#1e40af' }}
                ></div>
                <div>
                  <p className="text-sm font-medium">اللون الأساسي</p>
                  <p className="text-xs text-gray-500">{agencyData.colors?.primary || '#1e40af'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded border-2 border-gray-200"
                  style={{ backgroundColor: agencyData.colors?.secondary || '#f59e0b' }}
                ></div>
                <div>
                  <p className="text-sm font-medium">اللون الثانوي</p>
                  <p className="text-xs text-gray-500">{agencyData.colors?.secondary || '#f59e0b'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <AgencySetupModal
          open={isSetupModalOpen}
          onOpenChange={setIsSetupModalOpen}
          onAgencyCreated={handleAgencyCreated}
          existingAgency={agencyData}
        />
      </div>
    </div>
  );
};

export default AgencyProfile;
