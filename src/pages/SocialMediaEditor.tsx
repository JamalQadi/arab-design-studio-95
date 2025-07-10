
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Save, Eye, Undo, Redo, Image as ImageIcon, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SocialCanvas } from "@/components/social-editor/SocialCanvas";
import { SocialTemplates } from "@/components/social-editor/SocialTemplates";
import { SocialToolbox } from "@/components/social-editor/SocialToolbox";
import { SocialFilters } from "@/components/social-editor/SocialFilters";
import { ExportModal } from "@/components/ExportModal";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

const SocialMediaEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [activePanel, setActivePanel] = useState<'templates' | 'tools' | 'filters' | 'effects'>('templates');
  const [platform, setPlatform] = useState<'instagram' | 'facebook' | 'twitter' | 'linkedin'>('instagram');
  const [designData, setDesignData] = useState({
    template: 0,
    elements: [],
    platform: 'instagram',
    size: { width: 1080, height: 1080 },
    filters: { brightness: 100, contrast: 100, saturation: 100 },
    effects: []
  });
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const socialTemplates = {
    instagram: [
      { name: "بوست ترويجي", type: "promotional", size: { width: 1080, height: 1080 } },
      { name: "ستوري", type: "story", size: { width: 1080, height: 1920 } },
      { name: "ريلز كفر", type: "reels", size: { width: 1080, height: 1920 } },
      { name: "كاروسيل", type: "carousel", size: { width: 1080, height: 1080 } }
    ],
    facebook: [
      { name: "بوست عادي", type: "post", size: { width: 1200, height: 630 } },
      { name: "كفر الصفحة", type: "cover", size: { width: 1640, height: 859 } },
      { name: "إعلان", type: "ad", size: { width: 1200, height: 628 } }
    ],
    twitter: [
      { name: "تغريدة مصورة", type: "tweet", size: { width: 1024, height: 512 } },
      { name: "كفر الملف", type: "header", size: { width: 1500, height: 500 } }
    ],
    linkedin: [
      { name: "بوست شخصي", type: "personal", size: { width: 1200, height: 627 } },
      { name: "بوست الشركة", type: "company", size: { width: 1200, height: 627 } }
    ]
  };

  const platformSizes = {
    instagram: { width: 1080, height: 1080 },
    facebook: { width: 1200, height: 630 },
    twitter: { width: 1024, height: 512 },
    linkedin: { width: 1200, height: 627 }
  };

  const saveToHistory = (data: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...data, timestamp: Date.now() });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handlePlatformChange = (newPlatform: typeof platform) => {
    setPlatform(newPlatform);
    const newSize = platformSizes[newPlatform];
    const newData = {
      ...designData,
      platform: newPlatform,
      size: newSize,
      template: 0
    };
    setDesignData(newData);
    setSelectedTemplate(0);
    saveToHistory(newData);

    toast({
      title: "تم تغيير المنصة",
      description: `تم التبديل إلى ${newPlatform}`,
    });
  };

  const handleSave = async () => {
    try {
      const templateName = socialTemplates[platform][selectedTemplate]?.name || 'منشور';
      const projectData = {
        name: `${platform} - ${templateName}`,
        type: 'social' as const,
        data: {
          ...designData,
          template: selectedTemplate,
          savedAt: new Date().toISOString()
        }
      };

      const result = await authService.createProject(projectData);
      
      if (result.success) {
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم حفظ المنشور في مشاريعك",
        });
        saveToHistory(designData);
      } else {
        toast({
          title: "خطأ في الحفظ",
          description: result.error || "حدث خطأ أثناء حفظ المنشور",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ المنشور",
        variant: "destructive",
      });
    }
  };

  const handleDesignChange = (newDesignData: any) => {
    setDesignData(newDesignData);
    saveToHistory(newDesignData);
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
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">محرر وسائل التواصل</h1>
            
            {/* Platform Selector */}
            <div className="flex items-center space-x-2 mr-4">
              {Object.keys(socialTemplates).map((p) => (
                <Button
                  key={p}
                  variant={platform === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePlatformChange(p as typeof platform)}
                  className="capitalize"
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <ExportModal 
              canvasRef={canvasRef}
              trigger={
                <Button size="sm" className="bg-gradient-to-r from-pink-600 to-orange-600">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير
                </Button>
              }
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Panel Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'templates', label: 'القوالب', icon: '🎨' },
              { id: 'tools', label: 'الأدوات', icon: '🛠️' },
              { id: 'filters', label: 'الفلاتر', icon: '✨' },
              { id: 'effects', label: 'التأثيرات', icon: '🎭' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id as any)}
                className={`flex-1 py-3 px-2 text-sm font-medium border-b-2 transition-colors flex flex-col items-center ${
                  activePanel === tab.id
                    ? 'border-pink-500 text-pink-600 bg-pink-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg mb-1">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {activePanel === 'templates' && (
              <SocialTemplates 
                templates={socialTemplates[platform]}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
                platform={platform}
              />
            )}
            {activePanel === 'tools' && (
              <SocialToolbox 
                onAddElement={(element) => {
                  const newData = {
                    ...designData,
                    elements: [...designData.elements, element]
                  };
                  handleDesignChange(newData);
                }}
              />
            )}
            {activePanel === 'filters' && (
              <SocialFilters 
                filters={designData.filters}
                onFilterChange={(filters) => handleDesignChange({ ...designData, filters })}
              />
            )}
            {activePanel === 'effects' && (
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">التأثيرات المرئية</h3>
                <div className="space-y-2">
                  {['تدرج', 'ظلال', 'توهج', 'تشويش'].map((effect) => (
                    <Button key={effect} variant="outline" className="w-full justify-start" size="sm">
                      <Sparkles className="w-4 h-4 ml-2" />
                      {effect}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-100">
          <SocialCanvas 
            ref={canvasRef}
            selectedTemplate={selectedTemplate}
            templates={socialTemplates[platform]}
            designData={designData}
            onDesignChange={handleDesignChange}
            platform={platform}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaEditor;
