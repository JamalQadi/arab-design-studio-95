import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  FileText, 
  Download, 
  Star, 
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Sparkles
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService, type Project } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { prebuiltTemplates } from "@/data/prebuiltTemplates";
import { PrebuiltTemplateCard } from "@/components/PrebuiltTemplateCard";
import { TemplatePreviewModal } from "@/components/TemplatePreviewModal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalDownloads: 0,
    averageRating: 0,
    workingHours: 0,
  });
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [projectsData, templatesData, statsData] = await Promise.all([
        authService.getProjects(),
        authService.getTemplates(),
        authService.getUserStats(),
      ]);

      setProjects(projectsData);
      setTemplates(templatesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل البيانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (type: 'travel' | 'cv' | 'logo' | 'social') => {
    const projectNames = {
      travel: "مشروع سفر جديد",
      cv: "سيرة ذاتية جديدة", 
      logo: "شعار جديد",
      social: "منشور اجتماعي جديد"
    };

    const result = await authService.createProject({
      name: projectNames[type],
      type,
      data: {}
    });

    if (result.success) {
      toast({
        title: "تم إنشاء المشروع",
        description: `تم إنشاء ${projectNames[type]} بنجاح`,
      });
      loadData();
      
      // التوجه إلى المحرر المناسب
      if (type === 'travel') {
        navigate('/travel-editor');
      } else if (type === 'cv') {
        navigate('/cv-editor');
      } else if (type === 'logo') {
        navigate('/logo-editor');
      } else if (type === 'social') {
        navigate('/social-editor');
      }
    } else {
      toast({
        title: "خطأ",
        description: result.error || "حدث خطأ أثناء إنشاء المشروع",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      const result = await authService.deleteProject(projectId);
      
      if (result.success) {
        toast({
          title: "تم حذف المشروع",
          description: "تم حذف المشروع بنجاح",
        });
        loadData();
      } else {
        toast({
          title: "خطأ",
          description: result.error || "حدث خطأ أثناء حذف المشروع",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpdateDownloads = async (projectId: string) => {
    const result = await authService.updateProject(projectId, {
      downloads: (projects.find(p => p.id === projectId)?.downloads || 0) + 1
    });

    if (result.success) {
      loadData();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل": return "bg-green-100 text-green-800 border-green-200";
      case "مسودة": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "قيد التطوير": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "travel": return "🧳";
      case "cv": return "📄";
      case "logo": return "🎨";
      case "social": return "📱";
      default: return "📋";
    }
  };

  const handlePreviewTemplate = (template: any) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const prebuiltTemplatesList = Object.values(prebuiltTemplates);

  const currentUser = authService.getCurrentUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">DS</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">ديزاين ستوديو</span>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
                  onChange={(e) => handleCreateProject(e.target.value as any)}
                  value=""
                >
                  <option value="">مشروع جديد</option>
                  <option value="travel">إعلان سفر</option>
                  <option value="cv">سيرة ذاتية</option>
                  <option value="logo">شعار</option>
                  <option value="social">منشور اجتماعي</option>
                </select>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً، {currentUser?.name || 'المستخدم'}
          </h1>
          <p className="text-gray-600">
            إليك نظرة سريعة على إنجازاتك وأحدث مشاريعك
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">المشاريع المكتملة</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedProjects}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">إجمالي التحميلات</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
                </div>
                <Download className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">التقييم المتوسط</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">ساعات العمل</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.workingHours}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "projects", name: "مشاريعي", count: projects.length },
              { id: "prebuilt-templates", name: "القوالب الجاهزة", count: prebuiltTemplatesList.length },
              { id: "templates", name: "القوالب المحفوظة", count: templates.length },
              { id: "downloads", name: "التحميلات", count: stats.totalDownloads },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
                <Badge variant="secondary" className="mr-2">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </nav>
        </div>

        {/* Projects Content */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">مشاريعي</h2>
              <div className="relative">
                <select 
                  className="bg-blue-600 text-white border border-blue-600 rounded-md px-4 py-2 text-sm"
                  onChange={(e) => handleCreateProject(e.target.value as any)}
                  value=""
                >
                  <option value="">+ مشروع جديد</option>
                  <option value="travel">إعلان سفر</option>
                  <option value="cv">سيرة ذاتية</option>
                  <option value="logo">شعار</option>
                  <option value="social">منشور اجتماعي</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{getTypeIcon(project.type)}</div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>
                      آخر تعديل: {new Date(project.updated_at).toLocaleDateString('ar-SA')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">
                        <Download className="w-4 h-4 inline ml-1" />
                        {project.downloads} تحميل
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleUpdateDownloads(project.id)}
                      >
                        <Eye className="w-4 h-4 ml-2" />
                        معاينة
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          if (project.type === 'travel') {
                            navigate('/travel-editor');
                          } else if (project.type === 'cv') {
                            navigate('/cv-editor');
                          } else if (project.type === 'logo') {
                            navigate('/logo-editor');
                          } else if (project.type === 'social') {
                            navigate('/social-editor');
                          }
                        }}
                      >
                        <Edit className="w-4 h-4 ml-2" />
                        تحرير
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Prebuilt Templates Content */}
        {activeTab === "prebuilt-templates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Sparkles className="w-6 h-6 ml-2 text-yellow-500" />
                  القوالب الجاهزة
                </h2>
                <p className="text-gray-600 mt-1">قوالب مكتملة وجاهزة للاستخدام والتعديل</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prebuiltTemplatesList.map((template, index) => (
                <PrebuiltTemplateCard
                  key={index}
                  template={template}
                  onPreview={() => handlePreviewTemplate(template)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Templates Content */}
        {activeTab === "templates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">القوالب المحفوظة</h2>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                إضافة قالب
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">🎨</div>
                      <Badge variant="secondary">{template.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>
                      تم الإنشاء: {new Date(template.created_at).toLocaleDateString('ar-SA')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 ml-2" />
                        معاينة
                      </Button>
                      <Button size="sm" className="flex-1">
                        استخدام
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Downloads Content */}
        {activeTab === "downloads" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">سجل التحميلات</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  إجمالي التحميلات: {stats.totalDownloads}
                </h3>
                <p className="text-gray-600">
                  سجل مفصل لجميع التحميلات
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={previewTemplate}
      />
    </div>
  );
};

export default Dashboard;
