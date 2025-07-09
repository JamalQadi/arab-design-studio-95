
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Plus, Trash2, Calendar, Building } from "lucide-react";
import { useState } from "react";

interface Experience {
  id: string;
  position: string;
  company: string;
  duration: string;
  description: string;
  current: boolean;
}

interface CVExperiencePanelProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const CVExperiencePanel = ({ data, onChange }: CVExperiencePanelProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      position: '',
      company: '',
      duration: '',
      description: '',
      current: false
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">الخبرة المهنية</h3>
        </div>
        <Button onClick={addExperience} size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 ml-1" />
          إضافة خبرة
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>لم تتم إضافة أي خبرة مهنية بعد</p>
          <Button onClick={addExperience} variant="outline" className="mt-3">
            إضافة أول خبرة
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <Card key={experience.id} className="border-r-4 border-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      خبرة {index + 1}
                    </span>
                  </CardTitle>
                  <Button
                    onClick={() => removeExperience(experience.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">المسمى الوظيفي *</Label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    placeholder="مثال: مطور واجهات أمامية"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    اسم الشركة *
                  </Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="مثال: شركة التقنية المتقدمة"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    المدة الزمنية
                  </Label>
                  <Input
                    value={experience.duration}
                    onChange={(e) => updateExperience(experience.id, 'duration', e.target.value)}
                    placeholder="مثال: يناير 2020 - مارس 2023"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">وصف المهام والإنجازات</Label>
                  <Textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                    placeholder="اكتب وصفاً مفصلاً عن مهامك وإنجازاتك في هذا المنصب..."
                    className="mt-1 min-h-[80px]"
                    maxLength={300}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {experience.description.length}/300 حرف
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-sm">
                    أعمل حالياً في هذا المنصب
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-medium text-orange-900 mb-2">💡 نصائح لكتابة الخبرة المهنية</h4>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• رتب الخبرات من الأحدث إلى الأقدم</li>
          <li>• ركز على الإنجازات وليس المهام فقط</li>
          <li>• استخدم أرقام وإحصائيات عند الإمكان</li>
          <li>• اكتب بصيغة الماضي للوظائف السابقة</li>
          <li>• استخدم الحاضر للوظيفة الحالية</li>
        </ul>
      </div>
    </div>
  );
};
