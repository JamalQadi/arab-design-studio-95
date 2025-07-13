import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save, Eye, Undo, Redo, Menu, X, ChevronLeft, ChevronRight, Share2, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { DesignCanvas } from "@/components/editor/DesignCanvas";
import { TemplatesPanel } from "@/components/editor/TemplatesPanel";
import { ToolboxPanel } from "@/components/editor/ToolboxPanel";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { LayersPanel } from "@/components/editor/LayersPanel";
import { ExportModal } from "@/components/ExportModal";
import { ShareDesignModal } from "@/components/sharing/ShareDesignModal";
import { AgencySetupModal } from "@/components/agency/AgencySetupModal";
import { supabaseService } from "@/services/supabaseService";
import { useToast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const TravelAdEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [activePanel, setActivePanel] = useState<'templates' | 'tools' | 'properties' | 'layers'>('templates');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAgencySetupOpen, setIsAgencySetupOpen] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string>('');
  const [agencyData, setAgencyData] = useState<any>(null);
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

  useEffect(() => {
    loadAgencyData();
  }, []);

  const loadAgencyData = async () => {
    try {
      const agency = await supabaseService.getAgencyDataForTemplate();
      setAgencyData(agency);
    } catch (error) {
      console.error('Error loading agency data:', error);
    }
  };

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
      
      // إضافة بيانات المكتب إلى التصميم
      const enrichedDesignData = {
        ...designData,
        template: selectedTemplate,
        agencyData: agencyData,
        savedAt: new Date().toISOString()
      };

      const projectData = {
        name: templateName,
        type: 'travel' as const,
        data: enrichedDesignData
      };

      const result = await supabaseService.createProject(projectData);
      
      if (result.success && result.project) {
        setCurrentProjectId(result.project.id);
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم حفظ التصميم في مشاريعك",
        });
        saveToHistory(enrichedDesignData);
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
    // إضافة بيانات المكتب إلى العنصر إذا كان نص
    if (element.type === 'text' && agencyData) {
      const enrichedElement = {
        ...element,
        agencyData: agencyData
      };
      
      const newData = {
        ...designData,
        elements: [...(designData.elements || []), enrichedElement]
      };
      handleDesignChange(newData);
    } else {
      const newData = {
        ...designData,
        elements: [...(designData.elements || []), element]
      };
      handleDesignChange(newData);
    }
  };

  const handlePrebuiltTemplateSelect = (templateData: any) => {
    console.log('Loading prebuilt template:', templateData);
    
    // ملء القالب ببيانات المكتب
    const enrichedElements = templateData.elements?.map((element: any) => {
      if (element.type === 'text' && agencyData) {
        return {
          ...element,
          agencyData: agencyData
        };
      }
      return element;
    }) || [];
    
    const newDesignData = {
      ...designData,
      elements: enrichedElements,
      size: templateData.size || { width: 800, height: 600 },
      background: templateData.background || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      templateName: templateData.name,
      agencyData: agencyData
    };
    
    setDesignData(newDesignData);
    saveToHistory(newDesignData);
    
    toast({
      title: "تم تحميل القالب",
      description: `تم تحميل قالب "${templateData.name}" مع بيانات مكتبك`,
    });

    setActivePanel('tools');
  };

  const handleShare = () => {
    if (!currentProjectId) {
      toast({
        title: "يجب حفظ التصميم أولاً",
        description: "احفظ التصميم قبل مشاركته",
        variant: "destructive",
      });
      return;
    }
    setIsShareModalOpen(true);
  };

  const handleAgencySetup = () => {
    setIsAgencySetupOpen(true);
  };

  const handleAgencyCreated = () => {
    loadAgencyData();
  };

  const SidebarContent = () => (
    <>
      {/* Agency Status */}
      {!agencyData && (
        <div className="p-4 bg-yellow-50 border-b border-yellow-200">
          <div className="text-sm text-yellow-800 mb-2">
            لم يتم إعداد بيانات مكتب السفر
          </div>
          <Button size="sm" variant="outline" onClick={handleAgencySetup}>
            <Building2 className="w-4 h-4 ml-1" />
            إعداد المكتب
          </Button>
        </div>
      )}

      {/* Panel Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {[
          { id: 'templates', label: 'القوالب', icon: '🎨' },
          { id: 'tools', label: 'الأدوات', icon: '🛠️' },
          { id: 'properties', label: 'الخصائص', icon: '⚙️' },
          { id: 'layers', label: 'الطبقات', icon: '📋' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id as any)}
            className={`flex-1 min-w-[80px] py-3 px-2 text-sm font-medium border-b-2 transition-colors flex flex-col items-center ${
              activePanel === tab.id
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg mb-1">{tab.icon}</span>
            <span className="whitespace-nowrap">{tab.label}</span>
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
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-2 sm:px-4 h-14">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Menu Toggle */}
            <Drawer open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85vh]">
                <div className="p-4 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">أدوات التصميم</h2>
                    <Button variant="ghost" size="sm" onClick={() => setIsMobileSidebarOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="h-full flex flex-col">
                    <SidebarContent />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            {/* Desktop Sidebar Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>

            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 ml-2" />
                <span className="hidden sm:inline">العودة</span>
              </Button>
            </Link>
            <div className="h-4 w-px bg-gray-300 hidden sm:block" />
            <h1 className="text-sm sm:text-lg font-semibold text-gray-900 hidden sm:block">محرر الإعلانات السياحية</h1>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="hidden sm:flex"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="hidden sm:flex"
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 sm:ml-2" />
              <span className="hidden sm:inline">{isPreviewMode ? "تحرير" : "معاينة"}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 sm:ml-2" />
              <span className="hidden sm:inline">حفظ</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 sm:ml-2" />
              <span className="hidden sm:inline">مشاركة</span>
            </Button>
            <ExportModal 
              canvasRef={canvasRef}
              trigger={
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                  <Download className="w-4 h-4 sm:ml-2" />
                  <span className="hidden sm:inline">تصدير</span>
                </Button>
              }
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className={`hidden md:flex bg-white border-r border-gray-200 flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-80'
        }`}>
          <SidebarContent />
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-100 min-w-0">
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

      {/* Modals */}
      <ShareDesignModal
        open={isShareModalOpen}
        onOpenChange={setIsShareModalOpen}
        projectId={currentProjectId}
        projectName={templates[selectedTemplate]?.name || 'إعلان سياحي'}
      />

      <AgencySetupModal
        open={isAgencySetupOpen}
        onOpenChange={setIsAgencySetupOpen}
        onAgencyCreated={handleAgencyCreated}
      />
    </div>
  );
};

export default TravelAdEditor;
