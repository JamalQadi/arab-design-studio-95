
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  FileText, 
  Download, 
  Star, 
  Clock,
  Plus,
  Eye,
  Share2,
  Building2,
  Edit,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { supabaseService } from "@/services/supabaseService";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [sharedDesigns, setSharedDesigns] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalDownloads: 0,
    averageRating: 0,
    workingHours: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [projectsData, statsData, sharesData] = await Promise.all([
        supabaseService.getProjects(),
        supabaseService.getUserStats(),
        supabaseService.getMySharedDesigns()
      ]);
      
      setProjects(projectsData);
      setStats(statsData);
      setSharedDesigns(sharesData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('خطأ في تحميل بيانات اللوحة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectCreated = () => {
    loadDashboardData();
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      const result = await supabaseService.deleteProject(projectId);
      if (result.success) {
        loadDashboardData();
      }
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'travel': return '✈️';
      case 'cv': return '📄';
      case 'logo': return '🎨';
      case 'social': return '📱';
      default: return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'قيد التطوير': return 'bg-yellow-100 text-yellow-800';
      case 'مسودة': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-600">مرحباً بك، {user?.user_metadata?.full_name || user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/agency-profile">
              <Button variant="outline">
                <Building2 className="w-4 h-4 ml-2" />
                ملف مكتب السفر
              </Button>
            </Link>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 ml-2" />
              مشروع جديد
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedProjects}</div>
              <p className="text-xs text-muted-foreground">
                من {stats.totalProjects} مشروع
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي التحميلات</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDownloads}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">من 5 نجوم</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ساعات العمل</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.workingHours}</div>
              <p className="text-xs text-muted-foreground">ساعة</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <CardTitle>مشاريعي الحديثة</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مشاريع بعد</h3>
                <p className="text-gray-600 mb-4">ابدأ بإنشاء مشروعك الأول</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="w-4 h-4 ml-2" />
                  إنشاء مشروع جديد
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getProjectTypeIcon(project.type)}</div>
                      <div>
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(project.created_at).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shared Designs Section */}
        {sharedDesigns.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                التصاميم المشاركة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedDesigns.slice(0, 5).map((share) => (
                  <div key={share.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{share.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={share.is_public ? "default" : "secondary"}>
                          {share.is_public ? 'عام' : 'خاص'}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {share.view_count || 0} مشاهدة
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(share.created_at).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <CreateProjectModal 
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onProjectCreated={handleProjectCreated}
        />
      </div>
    </div>
  );
};

export default Dashboard;
