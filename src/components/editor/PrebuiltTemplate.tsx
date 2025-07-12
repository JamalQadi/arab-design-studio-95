
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

interface PrebuiltTemplateProps {
  template: any;
  onSelect: () => void;
  onPreview: () => void;
}

export const PrebuiltTemplate = ({ template, onSelect, onPreview }: PrebuiltTemplateProps) => {
  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return '🍽️';
      case 'tech': return '💻';
      case 'wedding': return '💒';
      case 'solidarity': return '🤝';
      default: return '📄';
    }
  };

  const getTemplateGradient = (type: string) => {
    switch (type) {
      case 'restaurant': return 'from-orange-500 to-red-600';
      case 'tech': return 'from-blue-600 to-orange-500';
      case 'wedding': return 'from-blue-400 to-blue-600';
      case 'solidarity': return 'from-gray-800 to-gray-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500">
      <CardContent className="p-0">
        <div className="relative">
          {/* Template Preview */}
          <div className={`h-40 bg-gradient-to-br ${getTemplateGradient(template.type)} flex items-center justify-center text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 text-center">
              <div className="text-4xl mb-2">{getTemplateIcon(template.type)}</div>
              <div className="text-sm font-medium px-2">{template.name}</div>
            </div>
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
              <Button size="sm" variant="secondary" onClick={onPreview}>
                <Eye className="w-4 h-4 ml-2" />
                معاينة
              </Button>
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={onSelect}>
                <Edit className="w-4 h-4 ml-2" />
                استخدام
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{template.name}</h4>
            <Badge variant="outline" className="capitalize">{template.type}</Badge>
          </div>
          <div className="text-sm text-gray-600">
            <div>الأبعاد: {template.size.width}×{template.size.height}</div>
            <div>العناصر: {template.elements?.length || 0} عنصر</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
