
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SocialTemplatesProps {
  templates: any[];
  selectedTemplate: number;
  onTemplateSelect: (index: number) => void;
  platform: string;
}

export const SocialTemplates = ({ templates, selectedTemplate, onTemplateSelect, platform }: SocialTemplatesProps) => {
  const getPlatformColor = () => {
    switch (platform) {
      case 'instagram': return 'from-pink-500 to-purple-600';
      case 'facebook': return 'from-blue-500 to-blue-700';
      case 'twitter': return 'from-sky-400 to-blue-500';
      case 'linkedin': return 'from-blue-600 to-blue-800';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'post': return '📱';
      case 'story': return '📸';
      case 'reels': return '🎬';
      case 'carousel': return '🔄';
      case 'cover': return '🖼️';
      case 'ad': return '📢';
      case 'tweet': return '🐦';
      case 'header': return '🎭';
      case 'personal': return '👤';
      case 'company': return '🏢';
      default: return '📄';
    }
  };

  const getSizeLabel = (size: any) => {
    if (!size) return '';
    const ratio = size.width / size.height;
    if (ratio === 1) return 'مربع';
    if (ratio > 1) return 'أفقي';
    return 'عمودي';
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4 capitalize">قوالب {platform}</h3>
      
      {/* Platform Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2 text-gray-900">معلومات المنصة</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>المنصة: <span className="font-medium capitalize">{platform}</span></div>
          <div>الأبعاد المقترحة: حسب نوع المنشور</div>
          <div>الجودة: عالية الدقة</div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="space-y-3">
        {templates.map((template, index) => (
          <Card 
            key={index} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === index ? 'ring-2 ring-pink-500 shadow-md' : ''
            }`}
            onClick={() => onTemplateSelect(index)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <Badge variant="secondary" className="text-xs">{template.type}</Badge>
              </div>
              
              {/* Template Preview */}
              <div 
                className={`w-full rounded-lg flex items-center justify-center text-white shadow-inner relative overflow-hidden bg-gradient-to-br ${getPlatformColor()}`}
                style={{
                  height: template.size?.height > template.size?.width ? '80px' : '60px',
                  aspectRatio: template.size ? `${template.size.width}/${template.size.height}` : '16/9'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 text-center">
                  <div className="text-2xl mb-1">{getTemplateIcon(template.type)}</div>
                  <div className="text-xs font-medium">{getSizeLabel(template.size)}</div>
                </div>
              </div>

              {/* Template Info */}
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-600">
                  {template.size && (
                    <span>{template.size.width}×{template.size.height}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-500">جاهز</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 space-y-2">
        <Button variant="outline" className="w-full" size="sm">
          + قالب مخصص
        </Button>
        <Button variant="ghost" className="w-full" size="sm">
          استيراد من ملف
        </Button>
      </div>

      {/* Platform Tips */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">نصائح للمنصة</h5>
        <div className="text-xs text-blue-800 space-y-1">
          {platform === 'instagram' && (
            <>
              <div>• استخدم صور عالية الجودة</div>
              <div>• أضف هاشتاغات مناسبة</div>
              <div>• اهتم بالألوان الجذابة</div>
            </>
          )}
          {platform === 'facebook' && (
            <>
              <div>• النصوص الواضحة مهمة</div>
              <div>• استخدم دعوة للفعل</div>
              <div>• راعي المحتوى التفاعلي</div>
            </>
          )}
          {platform === 'linkedin' && (
            <>
              <div>• المحتوى المهني أولاً</div>
              <div>• استخدم الإحصائيات</div>
              <div>• اختر ألوان محافظة</div>
            </>
          )}
          {platform === 'twitter' && (
            <>
              <div>• النصوص المختصرة</div>
              <div>• الصور البسيطة</div>
              <div>• الرسائل الواضحة</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
