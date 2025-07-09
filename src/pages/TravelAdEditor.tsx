import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Save, Eye, Undo, Redo, Layers, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { DesignCanvas } from "@/components/editor/DesignCanvas";
import { ToolboxPanel } from "@/components/editor/ToolboxPanel";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { TemplatesPanel } from "@/components/editor/TemplatesPanel";
import { LayersPanel } from "@/components/editor/LayersPanel";
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

const TravelAdEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activePanel, setActivePanel] = useState<'templates' | 'tools' | 'properties' | 'layers'>('templates');
  const [designData, setDesignData] = useState({
    template: 0,
    elements: [],
    colors: {},
    fonts: {},
    images: []
  });
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentDrawerContent, setCurrentDrawerContent] = useState<'templates' | 'tools' | 'properties' | 'layers'>('templates');
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const templates = [
    { name: "حج وعمرة VIP", type: "مميز", category: "religious", color: "from-green-500 to-emerald-600" },
    { name: "عروض الطيران", type: "شائع", category: "flights", color: "from-blue-500 to-sky-600" },
    { name: "تأشيرات سياحية", type: "جديد", category: "visa", color: "from-purple-500 to-violet-600" },
    { name: "باقات شهر العسل", type: "رومانسي", category: "honeymoon", color: "from-pink-500 to-rose-600" },
    { name: "منشور إنستغرام", type: "اجتماعي", category: "social", color: "from-purple-400 via-pink-500 to-red-500" },
    { name: "منشور فيسبوك", type: "اجتماعي", category: "social", color: "from-blue-600 to-blue-800" },
    { name: "منشور تويتر", type: "اجتماعي", category: "social", color: "from-sky-400 to-sky-600" },
    { name: "شعار الشركة", type: "هوية", category: "logo", color: "from-gray-800 to-gray-900" },
    { name: "شعار المتجر", type: "تجاري", category: "logo", color: "from-orange-500 to-red-500" }
  ];

  const saveToHistory = (data: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(data);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    console.log('Saved to history:', data);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setDesignData(history[newIndex]);
      toast({
        title: "تم التراجع",
        description: "تم التراجع عن آخر تغيير",
      });
      console.log('Undo to:', history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setDesignData(history[newIndex]);
      toast({
        title: "تم الإعادة",
        description: "تم إعادة التغيير",
      });
      console.log('Redo to:', history[newIndex]);
    }
  };

  const handleSave = async () => {
    try {
      // Determine project type based on template category
      const templateCategory = templates[selectedTemplate]?.category || 'travel';
      let projectType: 'travel' | 'social' | 'logo' | 'cv' = 'travel';
      
      if (templateCategory === 'social') {
        projectType = 'social';
      } else if (templateCategory === 'logo') {
        projectType = 'logo';
      } else {
        projectType = 'travel';
      }

      const projectData = {
        name: `تصميم ${templates[selectedTemplate]?.name}`,
        type: projectType,
        data: {
          ...designData,
          template: selectedTemplate,
          savedAt: new Date().toISOString()
        }
      };

      console.log('Saving project:', projectData);
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

  const handleTemplateChange = (templateIndex: number) => {
    console.log('Template change requested:', templateIndex, templates[templateIndex]);
    
    if (templateIndex === selectedTemplate) {
      console.log('Same template selected, ignoring');
      return;
    }
    
    const newData = { 
      template: templateIndex,
      elements: [], // Clear elements when changing template
      colors: {},
      fonts: {},
      images: designData.images || [] // Keep uploaded images
    };
    
    setSelectedTemplate(templateIndex);
    setDesignData(newData);
    saveToHistory(newData);
    
    console.log('Template changed to:', templates[templateIndex]);
    
    toast({
      title: "تم تغيير القالب",
      description: `تم اختيار قالب: ${templates[templateIndex]?.name}`,
    });

    // إغلاق الدرج بعد تغيير القالب
    setIsDrawerOpen(false);
  };

  const handleImageSelect = (imageData: any) => {
    console.log('Image selected:', imageData);
    const newData = { 
      ...designData, 
      images: [...(designData.images || []), imageData],
      template: selectedTemplate
    };
    setDesignData(newData);
    saveToHistory(newData);
    
    toast({
      title: "تم إضافة الصورة",
      description: "تم إضافة الصورة إلى التصميم",
    });
  };

  const handleDesignChange = (newDesignData: any) => {
    console.log('Design change received:', newDesignData);
    setDesignData({
      ...newDesignData,
      template: selectedTemplate // Ensure template is preserved
    });
    saveToHistory(newDesignData);
  };

  const openDrawer = (content: 'templates' | 'tools' | 'properties' | 'layers') => {
    console.log('Opening drawer with content:', content);
    setCurrentDrawerContent(content);
    setIsDrawerOpen(true);
  };

  const renderDrawerContent = () => {
    switch (currentDrawerContent) {
      case 'templates':
        return (
          <TemplatesPanel 
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateChange}
          />
        );
      case 'tools':
        return <ToolboxPanel />;
      case 'properties':
        return <PropertiesPanel />;
      case 'layers':
        return <LayersPanel />;
      default:
        return null;
    }
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
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">محرر التصميم</h1>
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
                  تصدير
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
                <Button variant="outline" size="sm">
                  المزيد
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>خيارات التصميم</DrawerTitle>
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
                    حفظ المشروع
                  </Button>
                  <ExportModal 
                    canvasRef={canvasRef}
                    trigger={
                      <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600">
                        <Download className="w-4 h-4 ml-2" />
                        تصدير التصميم
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
              { id: 'templates', label: 'القوالب', icon: '🎨' },
              { id: 'tools', label: 'الأدوات', icon: '🛠️' },
              { id: 'properties', label: 'الخصائص', icon: '⚙️' },
              { id: 'layers', label: 'الطبقات', icon: '📚' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id as any)}
                className={`flex-1 py-3 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activePanel === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="block text-lg mb-1">{tab.icon}</span>
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
                onTemplateSelect={handleTemplateChange}
              />
            )}
            {activePanel === 'tools' && <ToolboxPanel />}
            {activePanel === 'properties' && <PropertiesPanel />}
            {activePanel === 'layers' && <LayersPanel />}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-100 pb-16 lg:pb-0">
          <DesignCanvas 
            ref={canvasRef}
            selectedTemplate={selectedTemplate}
            templates={templates}
            isPreviewMode={isPreviewMode}
            designData={designData}
            onDesignChange={handleDesignChange}
          />
        </div>

        {/* Mobile Bottom Panel - تحديث مهم هنا */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around py-2">
            {[
              { id: 'templates', label: 'القوالب', icon: '🎨' },
              { id: 'tools', label: 'الأدوات', icon: '🛠️' },
              { id: 'properties', label: 'الخصائص', icon: '⚙️' },
              { id: 'layers', label: 'الطبقات', icon: '📚' }
            ].map((tab) => (
              <button 
                key={tab.id}
                className="flex flex-col items-center py-2 px-3 text-xs text-gray-600 hover:text-gray-900 transition-colors active:bg-gray-100 touch-manipulation"
                onClick={() => openDrawer(tab.id as any)}
                style={{ minHeight: '60px', WebkitTapHighlightColor: 'rgba(0,0,0,0.1)' }}
              >
                <span className="text-lg mb-1">{tab.icon}</span>
                <span className="text-center">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Drawer للهاتف المحمول */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>
                {currentDrawerContent === 'templates' && 'القوالب'}
                {currentDrawerContent === 'tools' && 'الأدوات'}
                {currentDrawerContent === 'properties' && 'الخصائص'}
                {currentDrawerContent === 'layers' && 'الطبقات'}
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto flex-1">
              {renderDrawerContent()}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default TravelAdEditor;
