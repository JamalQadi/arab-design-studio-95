
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Building } from "lucide-react";
import { forwardRef } from "react";

interface CVData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
    photo?: any;
  };
  experience: any[];
  education: any[];
  skills: {
    technical: string[];
    languages: string[];
    soft: string[];
  };
  achievements: string[];
  certifications: string[];
}

interface Template {
  name: string;
  type: string;
  category: string;
  color: string;
}

interface CVDesignCanvasProps {
  selectedTemplate: number;
  templates: Template[];
  cvData: CVData;
  isPreviewMode: boolean;
}

export const CVDesignCanvas = forwardRef<HTMLDivElement, CVDesignCanvasProps>(
  ({ selectedTemplate, templates, cvData, isPreviewMode }, ref) => {
    const template = templates[selectedTemplate];
    
    const renderClassicTemplate = () => (
      <div className="bg-white min-h-full p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-blue-600">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {cvData.personal.name || "اسم المتقدم"}
          </h1>
          <h2 className="text-xl text-blue-600 font-semibold mb-4">
            {cvData.personal.title || "المسمى الوظيفي"}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {cvData.personal.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {cvData.personal.email}
              </div>
            )}
            {cvData.personal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {cvData.personal.phone}
              </div>
            )}
            {cvData.personal.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {cvData.personal.location}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {cvData.personal.summary && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              نبذة مختصرة
            </h3>
            <p className="text-gray-700 leading-relaxed">{cvData.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              الخبرة المهنية
            </h3>
            <div className="space-y-4">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="border-r-4 border-blue-600 pr-4">
                  <h4 className="font-semibold text-lg text-gray-900">{exp.position}</h4>
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{exp.company}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              التعليم
            </h3>
            <div className="space-y-3">
              {cvData.education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-blue-600 font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="grid md:grid-cols-2 gap-6">
          {cvData.skills.technical.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">المهارات التقنية</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.technical.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {cvData.skills.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">اللغات</h3>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="border-blue-600 text-blue-600">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );

    const renderModernTemplate = () => (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-full">
        <div className="grid md:grid-cols-3 gap-0 min-h-full">
          {/* Sidebar */}
          <div className="bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
                {cvData.personal.name ? cvData.personal.name.charAt(0) : "A"}
              </div>
              <h1 className="text-2xl font-bold mb-2">{cvData.personal.name || "اسم المتقدم"}</h1>
              <p className="text-purple-100">{cvData.personal.title || "المسمى الوظيفي"}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <h3 className="font-bold text-lg border-b border-white/30 pb-2">تواصل معي</h3>
              {cvData.personal.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {cvData.personal.email}
                </div>
              )}
              {cvData.personal.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {cvData.personal.phone}
                </div>
              )}
              {cvData.personal.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  {cvData.personal.location}
                </div>
              )}
            </div>

            {/* Skills */}
            {cvData.skills.technical.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-lg border-b border-white/30 pb-2 mb-4">المهارات</h3>
                <div className="space-y-2">
                  {cvData.skills.technical.map((skill, index) => (
                    <div key={index} className="bg-white/20 rounded-full px-3 py-1 text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 p-8 bg-white">
            {/* Summary */}
            {cvData.personal.summary && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-purple-600">نبذة مختصرة</h3>
                <p className="text-gray-700 leading-relaxed">{cvData.personal.summary}</p>
              </div>
            )}

            {/* Experience */}
            {cvData.experience.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-purple-600 mb-6">الخبرة المهنية</h3>
                <div className="space-y-6">
                  {cvData.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 border-r-4 border-purple-300">
                      <div className="absolute w-4 h-4 bg-purple-600 rounded-full -right-2.5 top-2"></div>
                      <h4 className="font-bold text-lg text-gray-900">{exp.position}</h4>
                      <p className="text-purple-600 font-semibold mb-2">{exp.company} | {exp.duration}</p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-purple-600 mb-6">التعليم</h3>
                <div className="space-y-4">
                  {cvData.education.map((edu, index) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                      <p className="text-purple-600 font-semibold">{edu.institution}</p>
                      <p className="text-sm text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const getTemplateRenderer = () => {
      switch (template?.category) {
        case 'modern':
        case 'creative':
          return renderModernTemplate();
        case 'classic':
        case 'tech':
        case 'academic':
        case 'executive':
        default:
          return renderClassicTemplate();
      }
    };

    return (
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white">
                قالب: {template?.name || "كلاسيكي"}
              </Badge>
              {isPreviewMode && (
                <Badge className="bg-green-100 text-green-800">
                  وضع المعاينة
                </Badge>
              )}
            </div>
          </div>
          
          <Card className="shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div ref={ref} className="min-h-[297mm] bg-white" style={{ aspectRatio: '210/297' }}>
                {getTemplateRenderer()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
);

CVDesignCanvas.displayName = 'CVDesignCanvas';
