
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { organizationService } from "@/services/organizationService";
import { Link2, Check, X, RefreshCw } from "lucide-react";

interface ExternalServiceConfigProps {
  organizationId: string;
}

export const ExternalServiceConfig = ({ organizationId }: ExternalServiceConfigProps) => {
  const [services, setServices] = useState([
    {
      id: 'custom_api',
      name: 'واجهة برمجية مخصصة',
      description: 'اربط مع خدمة برمجية مخصصة',
      icon: '🔗',
      enabled: false,
      config: {
        endpoint: '',
        apiKey: '',
        method: 'GET',
        headers: {},
        fallbackEnabled: true
      }
    },
    {
      id: 'restaurant_pos',
      name: 'نظام نقاط البيع',
      description: 'اربط مع نظام نقاط البيع للمطاعم',
      icon: '🍽️',
      enabled: false,
      config: {
        endpoint: '',
        apiKey: '',
        menuSync: true,
        priceSync: true,
        fallbackEnabled: true
      }
    },
    {
      id: 'booking_system',
      name: 'نظام الحجوزات',
      description: 'اربط مع نظام إدارة الحجوزات',
      icon: '📅',
      enabled: false,
      config: {
        endpoint: '',
        apiKey: '',
        realTimeSync: true,
        fallbackEnabled: true
      }
    },
    {
      id: 'inventory_system',
      name: 'نظام المخزون',
      description: 'اربط مع نظام إدارة المخزون',
      icon: '📦',
      enabled: false,
      config: {
        endpoint: '',
        apiKey: '',
        stockSync: true,
        fallbackEnabled: true
      }
    }
  ]);

  const [activeService, setActiveService] = useState('custom_api');
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>({});

  const currentService = services.find(s => s.id === activeService);

  const updateServiceConfig = (serviceId: string, config: any) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, config: { ...service.config, ...config } }
        : service
    ));
  };

  const toggleService = (serviceId: string, enabled: boolean) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, enabled }
        : service
    ));
  };

  const testConnection = async (service: any) => {
    if (!service.config.endpoint) return;

    setIsTesting(true);
    try {
      const result = await organizationService.syncWithExternalAPI(
        organizationId,
        service.config.endpoint,
        service.config.apiKey
      );

      setTestResults(prev => ({
        ...prev,
        [service.id]: {
          success: result.success,
          message: result.success ? 'تم الاتصال بنجاح' : result.error,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [service.id]: {
          success: false,
          message: 'خطأ في الاتصال',
          timestamp: new Date().toISOString()
        }
      }));
    } finally {
      setIsTesting(false);
    }
  };

  const saveConfiguration = async () => {
    try {
      // Save service configurations to organization
      // This would typically be saved to the organization's external_services field
      console.log('Saving service configurations:', services);
      // Implementation depends on your backend structure
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-right flex items-center gap-2">
          <Link2 className="w-5 h-5" />
          إعدادات الخدمات الخارجية
        </CardTitle>
        <p className="text-sm text-gray-600 text-right">
          اربط مؤسستك مع خدمات خارجية مع الحفاظ على قاعدة البيانات المحلية كبديل
        </p>
      </CardHeader>

      <CardContent>
        <Tabs value={activeService} onValueChange={setActiveService}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {services.map((service) => (
              <TabsTrigger key={service.id} value={service.id} className="text-xs">
                {service.icon} {service.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={service.enabled}
                    onCheckedChange={(checked) => toggleService(service.id, checked)}
                  />
                  <Badge variant={service.enabled ? "default" : "secondary"}>
                    {service.enabled ? 'مفعل' : 'معطل'}
                  </Badge>
                </div>
              </div>

              {service.enabled && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${service.id}-endpoint`}>رابط الخدمة (API Endpoint)</Label>
                      <Input
                        id={`${service.id}-endpoint`}
                        value={service.config.endpoint}
                        onChange={(e) => updateServiceConfig(service.id, { endpoint: e.target.value })}
                        placeholder="https://api.example.com/v1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`${service.id}-apikey`}>مفتاح API</Label>
                      <Input
                        id={`${service.id}-apikey`}
                        type="password"
                        value={service.config.apiKey}
                        onChange={(e) => updateServiceConfig(service.id, { apiKey: e.target.value })}
                        placeholder="sk-..."
                      />
                    </div>
                  </div>

                  {service.id === 'custom_api' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="method">طريقة الطلب</Label>
                        <Select 
                          value={service.config.method} 
                          onValueChange={(value) => updateServiceConfig(service.id, { method: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="headers">Headers إضافية (JSON)</Label>
                        <Textarea
                          id="headers"
                          value={JSON.stringify(service.config.headers, null, 2)}
                          onChange={(e) => {
                            try {
                              const headers = JSON.parse(e.target.value);
                              updateServiceConfig(service.id, { headers });
                            } catch (error) {
                              // Invalid JSON, don't update
                            }
                          }}
                          placeholder='{"Content-Type": "application/json"}'
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {service.id === 'restaurant_pos' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="menuSync">مزامنة القائمة</Label>
                        <Switch
                          id="menuSync"
                          checked={service.config.menuSync}
                          onCheckedChange={(checked) => updateServiceConfig(service.id, { menuSync: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="priceSync">مزامنة الأسعار</Label>
                        <Switch
                          id="priceSync"
                          checked={service.config.priceSync}
                          onCheckedChange={(checked) => updateServiceConfig(service.id, { priceSync: checked })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Label htmlFor="fallbackEnabled">تفعيل النظام البديل (قاعدة البيانات المحلية)</Label>
                    <Switch
                      id="fallbackEnabled"
                      checked={service.config.fallbackEnabled}
                      onCheckedChange={(checked) => updateServiceConfig(service.id, { fallbackEnabled: checked })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => testConnection(service)}
                      disabled={isTesting || !service.config.endpoint}
                    >
                      {isTesting ? (
                        <RefreshCw className="w-4 h-4 animate-spin ml-2" />
                      ) : (
                        <Link2 className="w-4 h-4 ml-2" />
                      )}
                      اختبار الاتصال
                    </Button>

                    <Button onClick={saveConfiguration}>
                      حفظ الإعدادات
                    </Button>
                  </div>

                  {testResults[service.id] && (
                    <div className={`p-3 rounded-lg border ${
                      testResults[service.id].success 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        {testResults[service.id].success ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          testResults[service.id].success ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {testResults[service.id].message}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(testResults[service.id].timestamp).toLocaleString('ar-SA')}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
