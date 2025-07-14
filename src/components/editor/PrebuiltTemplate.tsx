
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Download } from "lucide-react";

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
      case 'cv': return '📄';
      case 'logo': return '🏷️';
      case 'advertisement': return '📢';
      case 'sale': return '🏷️';
      case 'event': return '🎉';
      case 'service': return '⚙️';
      case 'social': return '📱';
      case 'medical': return '⚕️';
      case 'fashion': return '👗';
      case 'fitness': return '💪';
      default: return '📋';
    }
  };

  const getTemplateGradient = (type: string, category: string) => {
    if (type === 'cv') {
      switch (category) {
        case 'professional': return 'from-blue-500 to-blue-700';
        case 'creative': return 'from-purple-500 to-pink-600';
        case 'minimalist': return 'from-gray-400 to-gray-600';
        case 'tech': return 'from-indigo-600 to-blue-800';
        default: return 'from-blue-500 to-blue-700';
      }
    }
    
    if (type === 'logo') {
      switch (category) {
        case 'restaurant': return 'from-orange-500 to-red-600';
        case 'tech': return 'from-blue-600 to-purple-600';
        case 'medical': return 'from-blue-400 to-blue-600';
        case 'fashion': return 'from-pink-400 to-rose-500';
        case 'fitness': return 'from-red-500 to-red-700';
        default: return 'from-gray-500 to-gray-700';
      }
    }

    if (type === 'advertisement') {
      switch (category) {
        case 'sale': return 'from-red-500 to-orange-600';
        case 'restaurant': return 'from-yellow-500 to-orange-600';
        case 'event': return 'from-purple-500 to-indigo-600';
        case 'service': return 'from-green-500 to-green-700';
        case 'social': return 'from-pink-500 to-purple-600';
        default: return 'from-blue-500 to-blue-700';
      }
    }

    // Default gradients for other types
    switch (type) {
      case 'restaurant': return 'from-orange-500 to-red-600';
      case 'tech': return 'from-blue-600 to-orange-500';
      case 'wedding': return 'from-blue-400 to-blue-600';
      case 'solidarity': return 'from-gray-800 to-gray-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-purple-100 text-purple-800';
      case 'minimalist': return 'bg-gray-100 text-gray-800';
      case 'tech': return 'bg-indigo-100 text-indigo-800';
      case 'restaurant': return 'bg-orange-100 text-orange-800';
      case 'medical': return 'bg-blue-100 text-blue-800';
      case 'fashion': return 'bg-pink-100 text-pink-800';
      case 'fitness': return 'bg-red-100 text-red-800';
      case 'sale': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Template Preview */}
          <div className={`h-48 bg-gradient-to-br ${getTemplateGradient(template.type, template.category)} flex items-center justify-center text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            
            {/* Template Type Badge */}
            <div className="absolute top-3 right-3">
              <Badge className={getCategoryBadgeColor(template.category)}>
                {template.category === 'professional' && 'احترافي'}
                {template.category === 'creative' && 'إبداعي'}
                {template.category === 'minimalist' && 'بسيط'}
                {template.category === 'tech' && 'تقني'}
                {template.category === 'restaurant' && 'مطعم'}
                {template.category === 'medical' && 'طبي'}
                {template.category === 'fashion' && 'أزياء'}
                {template.category === 'fitness' && 'رياضي'}
                {template.category === 'sale' && 'تخفيضات'}
                {template.category === 'event' && 'فعالية'}
                {template.category === 'service' && 'خدمة'}
                {template.category === 'social' && 'تواصل'}
                {!['professional', 'creative', 'minimalist', 'tech', 'restaurant', 'medical', 'fashion', 'fitness', 'sale', 'event', 'service', 'social'].includes(template.category) && template.category}
              </Badge>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-3">{getTemplateIcon(template.type)}</div>
              <div className="text-sm font-medium px-4 leading-tight">{template.name}</div>
            </div>
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
              <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onPreview(); }}>
                <Eye className="w-4 h-4 ml-2" />
                معاينة
              </Button>
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
                <Edit className="w-4 h-4 ml-2" />
                استخدام
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 text-sm leading-tight">{template.name}</h4>
            <Badge variant="outline" className="text-xs">
              {template.type === 'cv' && 'سيرة ذاتية'}
              {template.type === 'logo' && 'شعار'}
              {template.type === 'advertisement' && 'إعلان'}
              {!['cv', 'logo', 'advertisement'].includes(template.type) && template.type}
            </Badge>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center justify-between">
              <span>الأبعاد: {template.size?.width}×{template.size?.height}</span>
              <span>العناصر: {template.elements?.length || 0}</span>
            </div>
            {template.background && (
              <div className="text-gray-500">
                خلفية: {template.background.includes('gradient') ? 'متدرجة' : 'لون واحد'}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
