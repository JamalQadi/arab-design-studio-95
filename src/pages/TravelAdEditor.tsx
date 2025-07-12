
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save, Eye, Undo, Redo } from "lucide-react";
import { Link } from "react-router-dom";
import { DesignCanvas } from "@/components/editor/DesignCanvas";
import { TemplatesPanel } from "@/components/editor/TemplatesPanel";
import { ToolboxPanel } from "@/components/editor/ToolboxPanel";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { LayersPanel } from "@/components/editor/LayersPanel";
import { ExportModal } from "@/components/ExportModal";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

const TravelAdEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [activePanel, setActivePanel] = useState<'templates' | 'tools' | 'properties' | 'layers'>('templates');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [designData, setDesignData] = useState({
    template: 0,
    elements: [],
    images: [],
    size: { width: 800, height: 600 },
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  });
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const templates = [
    { name: "حج وعمرة كلاسيكي", type: "religious", category: "religious", color: "from-green-500 to-emerald-600" },
    { name: "عروض الطيران", type: "flights", category: "flights", color: "from-blue-500 to-sky-600" },
    { name: "تأشيرات سريعة", type: "visa", category: "visa", color: "from-purple-500 to-violet-600" },
    { name: "شهر العسل", type: "honeymoon", category: "honeymoon", color: "from-pink-500 to-rose-600" },
    { name: "وسائل التواصل", type: "social", category: "social", color: "from-indigo-500 to-blue-600" },
    { name: "تصميم شعار", type: "logo", category: "logo", color: "from-orange-500 to-red-600" }
  ];

  const saveToHistory = (data: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...data, timestamp: Date.now() });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDesignData(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDesignData(history[historyIndex + 1]);
    }
  };

  const handleSave = async () => {
    try {
      const templateName = templates[selectedTemplate]?.name || 'إعلان سياحي';
      const projectData = {
        name: templateName,
        type: 'travel' as const,
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
          description: "تم حفظ التصميم في مشاريعك",
        });
        saveToHistory(designData);
      } else {
        toast({
          title: "خطأ في الحفظ",
          description: result.error || "حدث خطأ أثناء حفظ التصميم",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ التصميم",
        variant: "destructive",
      });
    }
  };

  const handleDesignChange = (newDesignData: any) => {
    setDesignData(newDesignData);
    saveToHistory(newDesignData);
  };

  const handleAddElement = (element: any) => {
    const newData = {
      ...designData,
      elements: [...(designData.elements || []), element]
    };
    handleDesignChange(newData);
  };

  const handlePrebuiltTemplateSelect = (templateData: any) => {
    console.log('Loading prebuilt template:', templateData);
    
    const newDesignData = {
      ...designData,
      elements: templateData.elements || [],
      size: templateData.size || { width: 800, height: 600 },
      background: templateData.background || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      templateName: templateData.name
    };
    
    setDesignData(newDesignData);
    saveToHistory(newDesignData);
    
    toast({
      title: "تم تحميل القالب",
      description: `تم تحميل قالب "${templateData.name}" بنجاح`,
    });

    // Switch to tools panel after loading template
    setActivePanel('tools');
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
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">محرر الإعلانات السياحية</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
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
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
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
              { id: 'properties', label: 'الخصائص', icon: '⚙️' },
              { id: 'layers', label: 'الطبقات', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id as any)}
                className={`flex-1 py-3 px-2 text-sm font-medium border-b-2 transition-colors flex flex-col items-center ${
                  activePanel === tab.id
                    ? 'border-green-500 text-green-600 bg-green-50'
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
              <TemplatesPanel 
                templates={templates}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
                onPrebuiltTemplateSelect={handlePrebuiltTemplateSelect}
              />
            )}
            {activePanel === 'tools' && (
              <ToolboxPanel onAddElement={handleAddElement} />
            )}
            {activePanel === 'properties' && <PropertiesPanel />}
            {activePanel === 'layers' && <LayersPanel />}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-100">
          <DesignCanvas 
            ref={canvasRef}
            selectedTemplate={selectedTemplate}
            templates={templates}
            isPreviewMode={isPreviewMode}
            designData={designData}
            onDesignChange={handleDesignChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelAdEditor;
