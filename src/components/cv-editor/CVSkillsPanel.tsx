
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Plus, X, Code, MessageCircle, Users, Lightbulb } from "lucide-react";
import { useState } from "react";

interface Skills {
  technical: string[];
  languages: string[];
  soft: string[];
}

interface CVSkillsPanelProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export const CVSkillsPanel = ({ data, onChange }: CVSkillsPanelProps) => {
  const [newSkill, setNewSkill] = useState({ technical: "", languages: "", soft: "" });

  const addSkill = (category: keyof Skills) => {
    const skill = newSkill[category].trim();
    if (skill && !data[category].includes(skill)) {
      onChange({
        ...data,
        [category]: [...data[category], skill]
      });
      setNewSkill({ ...newSkill, [category]: "" });
    }
  };

  const removeSkill = (category: keyof Skills, skillToRemove: string) => {
    onChange({
      ...data,
      [category]: data[category].filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof Skills) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const commonTechnicalSkills = [
    "JavaScript", "React", "Node.js", "Python", "HTML/CSS", "TypeScript",
    "Vue.js", "Angular", "Express.js", "MongoDB", "MySQL", "Git",
    "Docker", "AWS", "Figma", "Photoshop", "WordPress", "PHP"
  ];

  const commonLanguages = [
    "العربية - اللغة الأم", "الإنجليزية - متقدم", "الإنجليزية - متوسط", 
    "الفرنسية - مبتدئ", "الألمانية - متوسط", "الإسبانية - مبتدئ"
  ];

  const commonSoftSkills = [
    "التواصل الفعال", "العمل الجماعي", "حل المشكلات", "إدارة الوقت",
    "القيادة", "التفكير النقدي", "الإبداع", "التكيف", "التنظيم", "التفاوض"
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">المهارات والقدرات</h3>
      </div>

      {/* Technical Skills */}
      <Card className="border-r-4 border-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Code className="w-4 h-4" />
            المهارات التقنية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill.technical}
              onChange={(e) => setNewSkill({ ...newSkill, technical: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, 'technical')}
              placeholder="أضف مهارة تقنية..."
              className="flex-1"
            />
            <Button 
              onClick={() => addSkill('technical')} 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                {skill}
                <button
                  onClick={() => removeSkill('technical', skill)}
                  className="mr-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div>
            <Label className="text-xs text-gray-500 mb-2 block">اقتراحات:</Label>
            <div className="flex flex-wrap gap-1">
              {commonTechnicalSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!data.technical.includes(skill)) {
                      onChange({
                        ...data,
                        technical: [...data.technical, skill]
                      });
                    }
                  }}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-blue-100 rounded text-gray-700 hover:text-blue-700 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card className="border-r-4 border-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            اللغات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill.languages}
              onChange={(e) => setNewSkill({ ...newSkill, languages: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, 'languages')}
              placeholder="أضف لغة مع المستوى..."
              className="flex-1"
            />
            <Button 
              onClick={() => addSkill('languages')} 
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.languages.map((language, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                {language}
                <button
                  onClick={() => removeSkill('languages', language)}
                  className="mr-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div>
            <Label className="text-xs text-gray-500 mb-2 block">اقتراحات:</Label>
            <div className="flex flex-wrap gap-1">
              {commonLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => {
                    if (!data.languages.includes(language)) {
                      onChange({
                        ...data,
                        languages: [...data.languages, language]
                      });
                    }
                  }}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-green-100 rounded text-gray-700 hover:text-green-700 transition-colors"
                >
                  + {language}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card className="border-r-4 border-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            المهارات الشخصية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill.soft}
              onChange={(e) => setNewSkill({ ...newSkill, soft: e.target.value })}
              onKeyPress={(e) => handleKeyPress(e, 'soft')}
              placeholder="أضف مهارة شخصية..."
              className="flex-1"
            />
            <Button 
              onClick={() => addSkill('soft')} 
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                {skill}
                <button
                  onClick={() => removeSkill('soft', skill)}
                  className="mr-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div>
            <Label className="text-xs text-gray-500 mb-2 block">اقتراحات:</Label>
            <div className="flex flex-wrap gap-1">
              {commonSoftSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!data.soft.includes(skill)) {
                      onChange({
                        ...data,
                        soft: [...data.soft, skill]
                      });
                    }
                  }}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-purple-100 rounded text-gray-700 hover:text-purple-700 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-1">
          <Lightbulb className="w-4 h-4" />
          نصائح لكتابة المهارات
        </h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• اكتب فقط المهارات التي تتقنها فعلاً</li>
          <li>• رتب المهارات حسب الأهمية للوظيفة</li>
          <li>• استخدم مصطلحات دقيقة ومعروفة</li>
          <li>• اذكر مستوى إتقانك للغات</li>
          <li>• ركز على المهارات المطلوبة في إعلان الوظيفة</li>
        </ul>
      </div>
    </div>
  );
};
