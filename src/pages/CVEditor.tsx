
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save, Eye, Undo, Redo, FileText, User, Briefcase, GraduationCap, Award, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { CVDesignCanvas } from "@/components/cv-editor/CVDesignCanvas";
import { CVTemplatesPanel } from "@/components/cv-editor/CVTemplatesPanel";
import { CVPersonalInfoPanel } from "@/components/cv-editor/CVPersonalInfoPanel";
import { CVSkillsPanel } from "@/components/cv-editor/CVSkillsPanel";
import { CVExperiencePanel } from "@/components/cv-editor/CVExperiencePanel";
import { CVEducationPanel } from "@/components/cv-editor/CVEducationPanel";
import { ImageUpload } from "@/components/ImageUpload";
import { ExportModal } from "@/components/ExportModal";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

const CVEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activePanel, setActivePanel] = useState<'templates' | 'personal' | 'experience' | 'education' | 'skills'>('templates');
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const templates = [
    { name: "كلاسيكي احترافي", type: "رسمي", category: "classic", color: "from-blue-500 to-indigo-600" },
    { name: "عصري إبداعي", type: "مبدع", category: "modern", color: "from-purple-500 to-pink-600" },
    { name: "تقني متقدم", type: "تقني", category: "tech", color: "from-green-500 to-teal-600" },
    { name: "أكاديمي للطلاب", type: "طلابي", category: "academic", color: "from-orange-500 to-red-600" },
    { name: "تنفيذي راقي", type: "تنفيذي", category: "executive", color: "from-gray-700 to-gray-900" },
    { name: "إبداعي ملون", type: "فني", category: "creative", color: "from-pink-500 to-rose-600" }
  ];

  const [cvData, setCvData] = useState({
    personal: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      summary: "",
      photo: null
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      languages: [],
      soft: []
    },
    achievements: [],
    certifications: []
  });

  const saveToHistory = (data: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(data);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCvData(history[newIndex]);
      toast({
        title: "تم التراجع",
        description: "تم التراجع عن آخر تغيير",
      });
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCvData(history[newIndex]);
      toast({
        title: "تم الإعادة",
        description: "تم إعادة التغيير",
      });
    }
  };

  const handleSave = async () => {
    try {
      const result = await authService.saveCVData({
        ...cvData,
        template: selectedTemplate,
        savedAt: new Date().toISOString()
      });
      
      if (result.success) {
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم حفظ السيرة الذاتية",
        });
        saveToHistory(cvData);
      } else {
        toast({
          title: "خطأ في الحفظ",
          description: result.error || "حدث خطأ أثناء الحفظ",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ السيرة الذاتية",
        variant: "destructive",
      });
    }
  };

  const handleDataChange = (section: string, data: any) => {
    const newCvData = { ...cvData, [section]: data };
    setCvData(newCvData);
    saveToHistory(newCvData);
  };

  const handleImageSelect = (imageData: any) => {
    const newCvData = { 
      ...cvData, 
      personal: { ...cvData.personal, photo: imageData }
    };
    setCvData(newCvData);
    saveToHistory(newCvData);
    toast({
      title: "تم إضافة الصورة",
      description: "تم إضافة صورة شخصية للسيرة الذاتية",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">العودة</span>
              </Button>
            </Link>
            <div className="h-4 w-px bg-gray-300 hidden sm:block" />
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">محرر السيرة الذاتية</h1>
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="w-4 h-4" />
            </Button>
            <div className="h-4 w-px bg-gray-300" />
            <ImageUpload 
              onImageSelect={handleImageSelect}
              trigger={
                <Button variant="outline" size="sm">
                  <ImageIcon className="w-4 h-4 ml-2" />
                  صورة
                </Button>
              }
            />
            <Button variant="outline" size="sm" onClick={() => setIsPreviewMode(!isPreviewMode)}>
              <Eye className="w-4 h-4 ml-2" />
              {isPreviewMode ? "تحرير" : "معاينة"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <ExportModal 
              canvasRef={canvasRef}
              trigger={
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير PDF
                </Button>
              }
            />
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">المزيد</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>خيارات السيرة الذاتية</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-3">
                  <ImageUpload 
                    onImageSelect={handleImageSelect}
                    trigger={
                      <Button variant="outline" className="w-full justify-start">
                        <ImageIcon className="w-4 h-4 ml-2" />
                        إضافة صورة
                      </Button>
                    }
                  />
                  <Button variant="outline" className="w-full justify-start" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                    <Eye className="w-4 h-4 ml-2" />
                    {isPreviewMode ? "تحرير" : "معاينة"}
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleSave}>
                    <Save className="w-4 h-4 ml-2" />
                    حفظ السيرة
                  </Button>
                  <ExportModal 
                    canvasRef={canvasRef}
                    trigger={
                      <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600">
                        <Download className="w-4 h-4 ml-2" />
                        تصدير PDF
                      </Button>
                    }
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-80 bg-white border-r border-gray-200 flex-col">
          {/* Panel Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'templates', label: 'القوالب', icon: FileText },
              { id: 'personal', label: 'البيانات', icon: User },
              { id: 'experience', label: 'الخبرة', icon: Briefcase },
              { id: 'education', label: 'التعليم', icon: GraduationCap },
              { id: 'skills', label: 'المهارات', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id as any)}
                className={`flex-1 py-3 px-2 text-xs font-medium border-b-2 transition-colors ${
                  activePanel === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4 mx-auto mb-1" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {activePanel === 'templates' && (
              <CVTemplatesPanel 
                templates={templates}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
              />
            )}
            {activePanel === 'personal' && (
              <CVPersonalInfoPanel 
                data={cvData.personal}
                onChange={(personal) => handleDataChange('personal', personal)}
              />
            )}
            {activePanel === 'experience' && (
              <CVExperiencePanel 
                data={cvData.experience}
                onChange={(experience) => handleDataChange('experience', experience)}
              />
            )}
            {activePanel === 'education' && (
              <CVEducationPanel 
                data={cvData.education}
                onChange={(education) => handleDataChange('education', education)}
              />
            )}
            {activePanel === 'skills' && (
              <CVSkillsPanel 
                data={cvData.skills}
                onChange={(skills) => handleDataChange('skills', skills)}
              />
            )}
          </div>
        </div>

        {/* Mobile Bottom Panel */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
          <div className="flex justify-around py-2">
            {[
              { id: 'templates', label: 'القوالب', icon: FileText },
              { id: 'personal', label: 'البيانات', icon: User },
              { id: 'experience', label: 'الخبرة', icon: Briefcase },
              { id: 'education', label: 'التعليم', icon: GraduationCap },
              { id: 'skills', label: 'المهارات', icon: Award }
            ].map((tab) => (
              <Drawer key={tab.id}>
                <DrawerTrigger asChild>
                  <button className="flex flex-col items-center py-2 px-3 text-xs text-gray-600">
                    <tab.icon className="w-4 h-4 mb-1" />
                    <span>{tab.label}</span>
                  </button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[70vh]">
                  <DrawerHeader>
                    <DrawerTitle>{tab.label}</DrawerTitle>
                  </DrawerHeader>
                  <div className="overflow-y-auto">
                    {tab.id === 'templates' && (
                      <CVTemplatesPanel 
                        templates={templates}
                        selectedTemplate={selectedTemplate}
                        onTemplateSelect={setSelectedTemplate}
                      />
                    )}
                    {tab.id === 'personal' && (
                      <CVPersonalInfoPanel 
                        data={cvData.personal}
                        onChange={(personal) => handleDataChange('personal', personal)}
                      />
                    )}
                    {tab.id === 'experience' && (
                      <CVExperiencePanel 
                        data={cvData.experience}
                        onChange={(experience) => handleDataChange('experience', experience)}
                      />
                    )}
                    {tab.id === 'education' && (
                      <CVEducationPanel 
                        data={cvData.education}
                        onChange={(education) => handleDataChange('education', education)}
                      />
                    )}
                    {tab.id === 'skills' && (
                      <CVSkillsPanel 
                        data={cvData.skills}
                        onChange={(skills) => handleDataChange('skills', skills)}
                      />
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-100 pb-16 lg:pb-0">
          <CVDesignCanvas 
            ref={canvasRef}
            selectedTemplate={selectedTemplate}
            templates={templates}
            cvData={cvData}
            isPreviewMode={isPreviewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default CVEditor;
