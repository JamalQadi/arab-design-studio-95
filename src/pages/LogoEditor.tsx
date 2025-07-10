
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Save, Eye, Undo, Redo, Palette, Type, Shapes } from "lucide-react";
import { Link } from "react-router-dom";
import { LogoCanvas } from "@/components/logo-editor/LogoCanvas";
import { LogoToolbox } from "@/components/logo-editor/LogoToolbox";
import { LogoTemplates } from "@/components/logo-editor/LogoTemplates";
import { ColorPalette } from "@/components/logo-editor/ColorPalette";
import { FontSelector } from "@/components/logo-editor/FontSelector";
import { ExportModal } from "@/components/ExportModal";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

const LogoEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [activePanel, setActivePanel] = useState<'templates' | 'tools' | 'colors' | 'fonts'>('templates');
  const [designData, setDesignData] = useState({
    template: 0,
    elements: [],
    colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#EF4444' },
    fonts: { primary: 'Arial', secondary: 'Helvetica' },
    logoType: 'text' as 'text' | 'icon' | 'combination'
  });
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const logoTemplates = [
    { name: "نص بسيط", type: "minimalist", category: "text", colors: ["#000000", "#FFFFFF"] },
    { name: "دائري احترافي", type: "professional", category: "icon", colors: ["#3B82F6", "#1E40AF"] },
    { name: "مركب عصري", type: "modern", category: "combination", colors: ["#8B5CF6", "#A855F7"] },
    { name: "هندسي", type: "geometric", category: "icon", colors: ["#EF4444", "#DC2626"] },
    { name: "خط عربي", type: "arabic", category: "text", colors: ["#059669", "#047857"] },
    { name: "تقني", type: "tech", category: "combination", colors: ["#0EA5E9", "#0284C7"] }
  ];

  const saveToHistory = (data: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...data, timestamp: Date.now() });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const historyData = history[newIndex];
      setDesignData(historyData);
      setSelectedTemplate(historyData.template || 0);
      
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
      const historyData = history[newIndex];
      setDesignData(historyData);
      setSelectedTemplate(historyData.template || 0);
      
      toast({
        title: "تم الإعادة",
        description: "تم إعادة التغيير",
      });
    }
  };

  const handleSave = async () => {
    try {
      const projectData = {
        name: `شعار ${logoTemplates[selectedTemplate]?.name}`,
        type: 'logo' as const,
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
          description: "تم حفظ الشعار في مشاريعك",
        });
        saveToHistory(designData);
      } else {
        toast({
          title: "خطأ في الحفظ",
          description: result.error || "حدث خطأ أثناء حفظ الشعار",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ الشعار",
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
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">محرر الشعارات</h1>
          </div>
          
          <div className="flex items-center space-x-2">
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
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 ml-2" />
              حفظ
            </Button>
            <ExportModal 
              canvasRef={canvasRef}
              trigger={
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
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
              { id: 'templates', label: 'القوالب', icon: <Shapes className="w-4 h-4" /> },
              { id: 'tools', label: 'الأدوات', icon: <Type className="w-4 h-4" /> },
              { id: 'colors', label: 'الألوان', icon: <Palette className="w-4 h-4" /> },
              { id: 'fonts', label: 'الخطوط', icon: <Type className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id as any)}
                className={`flex-1 py-3 px-2 text-sm font-medium border-b-2 transition-colors flex flex-col items-center ${
                  activePanel === tab.id
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="mt-1">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {activePanel === 'templates' && (
              <LogoTemplates 
                templates={logoTemplates}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
              />
            )}
            {activePanel === 'tools' && (
              <LogoToolbox 
                onAddElement={(element) => {
                  const newData = {
                    ...designData,
                    elements: [...designData.elements, element]
                  };
                  handleDesignChange(newData);
                }}
              />
            )}
            {activePanel === 'colors' && (
              <ColorPalette 
                colors={designData.colors}
                onColorChange={(colors) => handleDesignChange({ ...designData, colors })}
              />
            )}
            {activePanel === 'fonts' && (
              <FontSelector 
                fonts={designData.fonts}
                onFontChange={(fonts) => handleDesignChange({ ...designData, fonts })}
              />
            )}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-100">
          <LogoCanvas 
            ref={canvasRef}
            selectedTemplate={selectedTemplate}
            templates={logoTemplates}
            designData={designData}
            onDesignChange={handleDesignChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoEditor;
