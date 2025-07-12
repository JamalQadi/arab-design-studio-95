
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

interface PrebuiltTemplateCardProps {
  template: any;
  onPreview: () => void;
}

export const PrebuiltTemplateCard = ({ template, onPreview }: PrebuiltTemplateCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleCreateProject = async () => {
    try {
      const projectData = {
        name: `${template.name} - مشروع جديد`,
        type: 'travel' as const,
        data: {
          elements: template.elements || [],
          size: template.size || { width: 800, height: 600 },
          background: template.background || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          templateName: template.name,
          savedAt: new Date().toISOString()
        }
      };

      const result = await authService.createProject(projectData);
      
      if (result.success) {
        toast({
          title: "تم إنشاء المشروع",
          description: `تم إنشاء مشروع جديد من قالب "${template.name}"`,
        });
        navigate('/travel-editor');
      } else {
        toast({
          title: "خطأ",
          description: result.error || "حدث خطأ أثناء إنشاء المشروع",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Create project error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء المشروع",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500">
      <CardContent className="p-0">
        <div className="relative">
          {/* Template Preview */}
          <div className={`h-48 bg-gradient-to-br ${getTemplateGradient(template.type)} flex items-center justify-center text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-2">{getTemplateIcon(template.type)}</div>
              <div className="text-lg font-bold px-2">{template.name}</div>
            </div>
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
              <Button size="sm" variant="secondary" onClick={onPreview}>
                <Eye className="w-4 h-4 ml-2" />
                معاينة
              </Button>
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleCreateProject}>
                <Edit className="w-4 h-4 ml-2" />
                تحرير
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-gray-900 text-lg">{template.name}</h4>
            <Badge variant="outline" className="capitalize">{template.type}</Badge>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <div>الأبعاد: {template.size.width}×{template.size.height}</div>
            <div>العناصر: {template.elements?.length || 0} عنصر</div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={onPreview}>
              <Eye className="w-4 h-4 ml-2" />
              معاينة
            </Button>
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleCreateProject}>
              <Copy className="w-4 h-4 ml-2" />
              استخدام
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
