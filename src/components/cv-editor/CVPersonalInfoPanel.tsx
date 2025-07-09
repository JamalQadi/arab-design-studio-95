
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface PersonalData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

interface CVPersonalInfoPanelProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
}

export const CVPersonalInfoPanel = ({ data, onChange }: CVPersonalInfoPanelProps) => {
  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">البيانات الشخصية</h3>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">المعلومات الأساسية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">الاسم الكامل *</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="title" className="text-sm font-medium">المسمى الوظيفي *</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="مثال: مطور ويب، مصمم جرافيك"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">معلومات التواصل</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
              <Mail className="w-4 h-4" />
              البريد الإلكتروني *
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="example@email.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1">
              <Phone className="w-4 h-4" />
              رقم الهاتف
            </Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+966 50 123 4567"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              العنوان
            </Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="الرياض، المملكة العربية السعودية"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">الروابط المهنية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="website" className="text-sm font-medium flex items-center gap-1">
              <Globe className="w-4 h-4" />
              الموقع الشخصي
            </Label>
            <Input
              id="website"
              value={data.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              value={data.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="github" className="text-sm font-medium flex items-center gap-1">
              <Github className="w-4 h-4" />
              GitHub
            </Label>
            <Input
              id="github"
              value={data.github}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="https://github.com/username"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">نبذة مختصرة</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="summary" className="text-sm font-medium">اكتب نبذة مختصرة عنك وخبراتك</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="مطور ويب متخصص بخبرة 5 سنوات في تطوير تطبيقات الويب باستخدام React و Node.js..."
            className="mt-1 min-h-[100px]"
            maxLength={500}
          />
          <div className="text-xs text-gray-500 mt-1">
            {data.summary.length}/500 حرف
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 نصائح لكتابة البيانات الشخصية</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• استخدم اسمك الكامل كما هو في الوثائق الرسمية</li>
          <li>• اكتب مسمى وظيفي واضح ومحدد</li>
          <li>• تأكد من صحة بيانات التواصل</li>
          <li>• اجعل النبذة المختصرة تركز على نقاط قوتك</li>
        </ul>
      </div>
    </div>
  );
};
