
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Plus, Trash2, Calendar, School } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade: string;
  field: string;
}

interface CVEducationPanelProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const CVEducationPanel = ({ data, onChange }: CVEducationPanelProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      year: '',
      grade: '',
      field: ''
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const degrees = [
    "دكتوراه",
    "ماجستير", 
    "بكالوريوس",
    "دبلوم عالي",
    "دبلوم",
    "ثانوية عامة",
    "شهادة مهنية"
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">التعليم والمؤهلات</h3>
        </div>
        <Button onClick={addEducation} size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 ml-1" />
          إضافة مؤهل
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>لم تتم إضافة أي مؤهلات تعليمية بعد</p>
          <Button onClick={addEducation} variant="outline" className="mt-3">
            إضافة أول مؤهل
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <Card key={education.id} className="border-r-4 border-green-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      مؤهل {index + 1}
                    </span>
                  </CardTitle>
                  <Button
                    onClick={() => removeEducation(education.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium">نوع المؤهل *</Label>
                    <Select
                      value={education.degree}
                      onValueChange={(value) => updateEducation(education.id, 'degree', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="اختر المؤهل" />
                      </SelectTrigger>
                      <SelectContent>
                        {degrees.map((degree) => (
                          <SelectItem key={degree} value={degree}>
                            {degree}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      سنة التخرج
                    </Label>
                    <Input
                      value={education.year}
                      onChange={(e) => updateEducation(education.id, 'year', e.target.value)}
                      placeholder="2023"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <School className="w-4 h-4" />
                    اسم المؤسسة التعليمية *
                  </Label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    placeholder="مثال: جامعة الملك سعود"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">التخصص</Label>
                  <Input
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                    placeholder="مثال: علوم الحاسب الآلي"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">التقدير/المعدل</Label>
                  <Input
                    value={education.grade}
                    onChange={(e) => updateEducation(education.id, 'grade', e.target.value)}
                    placeholder="مثال: ممتاز، 4.5/5.0، 85%"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Add Templates */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-3">🎓 إضافة سريعة</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newEdu: Education = {
                id: Date.now().toString(),
                degree: 'بكالوريوس',
                institution: '',
                year: '',
                grade: '',
                field: ''
              };
              onChange([...data, newEdu]);
            }}
            className="text-blue-700 border-blue-300 hover:bg-blue-100"
          >
            + بكالوريوس
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newEdu: Education = {
                id: Date.now().toString(),
                degree: 'ماجستير',
                institution: '',
                year: '',
                grade: '',
                field: ''
              };
              onChange([...data, newEdu]);
            }}
            className="text-blue-700 border-blue-300 hover:bg-blue-100"
          >
            + ماجستير
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">💡 نصائح لكتابة المؤهلات التعليمية</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• رتب المؤهلات من الأحدث إلى الأقدم</li>
          <li>• اذكر التقدير إذا كان جيداً أو ممتازاً</li>
          <li>• أضف التخصص بوضوح</li>
          <li>• اكتب الاسم الكامل للمؤسسة</li>
          <li>• يمكنك إضافة دورات مهمة كمؤهلات</li>
        </ul>
      </div>
    </div>
  );
};
