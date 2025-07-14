
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Plus, Building2, Image, Settings, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { OrganizationSetupModal } from "@/components/organization/OrganizationSetupModal";
import { ImageGallery } from "@/components/organization/ImageGallery";
import { ExternalServiceConfig } from "@/components/organization/ExternalServiceConfig";
import { organizationService } from "@/services/organizationService";
import { useAuth } from "@/components/auth/AuthProvider";

const OrganizationProfile = () => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [editingOrgId, setEditingOrgId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrganizations();
    }
  }, [user]);

  const loadOrganizations = async () => {
    try {
      setIsLoading(true);
      const orgs = await organizationService.getOrganizations();
      setOrganizations(orgs);
      if (orgs.length > 0) {
        setSelectedOrg(orgs[0]);
      }
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrganization = () => {
    setEditingOrgId('');
    setIsSetupModalOpen(true);
  };

  const handleEditOrganization = (orgId: string) => {
    setEditingOrgId(orgId);
    setIsSetupModalOpen(true);
  };

  const handleOrganizationSaved = () => {
    loadOrganizations();
  };

  const organizationTypes = organizationService.getOrganizationTypes();

  const getTypeInfo = (typeId: string) => {
    return organizationTypes.find(t => t.id === typeId) || { name: 'غير محدد', icon: '📋' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  العودة للوحة التحكم
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                ملف المؤسسة
              </h1>
            </div>
            <Button onClick={handleCreateOrganization}>
              <Plus className="w-4 h-4 ml-2" />
              إنشاء مؤسسة جديدة
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {organizations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مؤسسات بعد</h3>
              <p className="text-gray-600 mb-6">ابدأ بإنشاء مؤسستك الأولى</p>
              <Button onClick={handleCreateOrganization}>
                <Plus className="w-4 h-4 ml-2" />
                إنشاء مؤسسة جديدة
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Organization Selector */}
            {organizations.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-right">اختر المؤسسة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organizations.map((org) => {
                      const typeInfo = getTypeInfo(org.type);
                      return (
                        <Card
                          key={org.id}
                          className={`cursor-pointer transition-all ${
                            selectedOrg?.id === org.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedOrg(org)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{org.name}</h3>
                              <Badge variant="outline">
                                {typeInfo.icon} {typeInfo.name}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{org.city}, {org.country}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organization Details */}
            {selectedOrg && (
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
                  <TabsTrigger value="images">الصور</TabsTrigger>
                  <TabsTrigger value="services">الخدمات الخارجية</TabsTrigger>
                  <TabsTrigger value="settings">الإعدادات</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-right flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                          {selectedOrg.name}
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditOrganization(selectedOrg.id)}
                        >
                          <Edit className="w-4 h-4 ml-2" />
                          تحرير
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">النوع</label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">
                                {getTypeInfo(selectedOrg.type).icon} {getTypeInfo(selectedOrg.type).name}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-500">رقم الهاتف</label>
                            <p className="text-sm text-gray-900">{selectedOrg.phone || 'غير محدد'}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-500">البريد الإلكتروني</label>
                            <p className="text-sm text-gray-900">{selectedOrg.email || 'غير محدد'}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-500">الموقع الإلكتروني</label>
                            <p className="text-sm text-gray-900">{selectedOrg.website || 'غير محدد'}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">العنوان</label>
                            <p className="text-sm text-gray-900">{selectedOrg.address || 'غير محدد'}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-500">المدينة</label>
                            <p className="text-sm text-gray-900">{selectedOrg.city || 'غير محدد'}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-500">البلد</label>
                            <p className="text-sm text-gray-900">{selectedOrg.country || 'غير محدد'}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-500">الألوان</label>
                            <div className="flex gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <div
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: selectedOrg.branding?.primary_color }}
                                />
                                <span className="text-xs">أساسي</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: selectedOrg.branding?.secondary_color }}
                                />
                                <span className="text-xs">ثانوي</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Social Media */}
                      {selectedOrg.social_media && Object.values(selectedOrg.social_media).some((v: any) => v) && (
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="font-medium mb-3">وسائل التواصل الاجتماعي</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Object.entries(selectedOrg.social_media).map(([platform, value]) => (
                              value && (
                                <div key={platform} className="flex items-center gap-2">
                                  <span className="text-sm font-medium capitalize">{platform}:</span>
                                  <span className="text-sm text-gray-600">{value as string}</span>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="images">
                  <ImageGallery />
                </TabsContent>

                <TabsContent value="services">
                  <ExternalServiceConfig organizationId={selectedOrg.id} />
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-right">إعدادات المؤسسة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          onClick={() => handleEditOrganization(selectedOrg.id)}
                        >
                          <Edit className="w-4 h-4 ml-2" />
                          تحرير بيانات المؤسسة
                        </Button>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-3">معلومات إضافية</h4>
                          <div className="text-sm text-gray-600 space-y-2">
                            <p>تاريخ الإنشاء: {new Date(selectedOrg.created_at).toLocaleDateString('ar-SA')}</p>
                            <p>آخر تحديث: {new Date(selectedOrg.updated_at).toLocaleDateString('ar-SA')}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </>
        )}
      </div>

      <OrganizationSetupModal
        open={isSetupModalOpen}
        onOpenChange={setIsSetupModalOpen}
        onOrganizationCreated={handleOrganizationSaved}
        organizationId={editingOrgId}
      />
    </div>
  );
};

export default OrganizationProfile;
