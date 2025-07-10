
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LogoTemplatesProps {
  templates: any[];
  selectedTemplate: number;
  onTemplateSelect: (index: number) => void;
}

export const LogoTemplates = ({ templates, selectedTemplate, onTemplateSelect }: LogoTemplatesProps) => {
  const getTemplateIcon = (category: string) => {
    switch (category) {
      case 'text': return '📝';
      case 'icon': return '🎯';
      case 'combination': return '🔗';
      default: return '🎨';
    }
  };

  const getTemplateColors = (template: any) => {
    return template.colors || ['#3B82F6', '#1E40AF'];
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">قوالب الشعارات</h3>
      
      {/* Logo Type Selector */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-3 text-gray-900">نوع الشعار</h4>
        <div className="grid grid-cols-3 gap-2">
          {['text', 'icon', 'combination'].map((type) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {type === 'text' && 'نصي'}
              {type === 'icon' && 'أيقونة'}
              {type === 'combination' && 'مختلط'}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="space-y-3">
        {templates.map((template, index) => (
          <Card 
            key={index} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === index ? 'ring-2 ring-purple-500 shadow-md' : ''
            }`}
            onClick={() => onTemplateSelect(index)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <Badge variant="secondary" className="text-xs">{template.type}</Badge>
              </div>
              
              {/* Template Preview */}
              <div className="w-full h-20 rounded-lg flex items-center justify-center text-white shadow-inner relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${getTemplateColors(template)[0]} 0%, ${getTemplateColors(template)[1]} 100%)`
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10 text-center">
                  <div className="text-2xl mb-1">{getTemplateIcon(template.category)}</div>
                  <div className="text-xs font-medium">
                    {template.category === 'text' && 'نص'}
                    {template.category === 'icon' && 'أيقونة'}
                    {template.category === 'combination' && 'نص + أيقونة'}
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex space-x-1">
                  {getTemplateColors(template).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{template.category}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Custom Template */}
      <Button variant="outline" className="w-full mt-4" size="sm">
        + إنشاء قالب مخصص
      </Button>
    </div>
  );
};
