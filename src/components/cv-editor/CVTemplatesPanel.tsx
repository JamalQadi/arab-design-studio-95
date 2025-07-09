
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Palette, Code, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import { useState } from "react";

interface Template {
  name: string;
  type: string;
  category: string;
  color: string;
}

interface CVTemplatesPanelProps {
  templates: Template[];
  selectedTemplate: number;
  onTemplateSelect: (index: number) => void;
}

export const CVTemplatesPanel = ({ templates, selectedTemplate, onTemplateSelect }: CVTemplatesPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryIcon = (category: string) => {
    const icons = {
      classic: <FileText className="w-6 h-6" />,
      modern: <Palette className="w-6 h-6" />,
      tech: <Code className="w-6 h-6" />,
      academic: <GraduationCap className="w-6 h-6" />,
      executive: <Briefcase className="w-6 h-6" />,
      creative: <Sparkles className="w-6 h-6" />
    };
    return icons[category as keyof typeof icons] || <FileText className="w-6 h-6" />;
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">قوالب السيرة الذاتية</h3>
      
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="البحث في القوالب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Template Categories Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium mb-3 text-blue-900">أنواع القوالب المتاحة</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-blue-700">
            <FileText className="w-4 h-4" />
            <span>رسمي وكلاسيكي</span>
          </div>
          <div className="flex items-center gap-2 text-purple-700">
            <Palette className="w-4 h-4" />
            <span>عصري وإبداعي</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Code className="w-4 h-4" />
            <span>تقني ومتخصص</span>
          </div>
          <div className="flex items-center gap-2 text-orange-700">
            <GraduationCap className="w-4 h-4" />
            <span>أكاديمي وطلابي</span>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="space-y-4">
        {filteredTemplates.map((template, index) => (
          <Card 
            key={index} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === index ? 'ring-2 ring-blue-500 shadow-md' : ''
            }`}
            onClick={() => onTemplateSelect(index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <Badge variant="secondary" className="text-xs">{template.type}</Badge>
              </div>
              <div className={`w-full h-20 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center text-white shadow-inner relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  {getCategoryIcon(template.category)}
                </div>
                <div className="text-center">
                  {getCategoryIcon(template.category)}
                  <div className="text-xs mt-1 font-medium">CV</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>مجاني</span>
                <span>⭐ 4.9</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">💡 نصائح للحصول على أفضل النتائج</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• اختر القالب المناسب لمجال عملك</li>
          <li>• املأ جميع البيانات المطلوبة</li>
          <li>• استخدم كلمات مفتاحية قوية</li>
          <li>• اجعل السيرة موجزة ومركزة</li>
        </ul>
      </div>
    </div>
  );
};
