
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface Template {
  name: string;
  type: string;
  category: string;
  color: string;
}

interface TemplatesPanelProps {
  templates: Template[];
  selectedTemplate: number;
  onTemplateSelect: (index: number) => void;
}

export const TemplatesPanel = ({ templates, selectedTemplate, onTemplateSelect }: TemplatesPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryIcon = (category: string) => {
    const icons = {
      religious: '🕋',
      flights: '✈️',
      visa: '📋',
      honeymoon: '💑'
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">القوالب المتاحة</h3>
      
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="البحث في القوالب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Company Info Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-3 text-gray-900">معلومات مكتب السفر</h4>
        <div className="space-y-3">
          <Input 
            type="text" 
            placeholder="اسم المكتب"
            className="text-sm"
          />
          <Input 
            type="text" 
            placeholder="رقم التواصل"
            className="text-sm"
          />
          <Input 
            type="text" 
            placeholder="العنوان"
            className="text-sm"
          />
          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
            تطبيق المعلومات
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="space-y-3">
        {filteredTemplates.map((template, index) => (
          <Card 
            key={index} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === index ? 'ring-2 ring-blue-500 shadow-md' : ''
            }`}
            onClick={() => onTemplateSelect(index)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <Badge variant="secondary" className="text-xs">{template.type}</Badge>
              </div>
              <div className={`w-full h-16 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center text-2xl text-white shadow-inner`}>
                {getCategoryIcon(template.category)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Template Button */}
      <Button variant="outline" className="w-full mt-4" size="sm">
        + إضافة قالب مخصص
      </Button>
    </div>
  );
};
