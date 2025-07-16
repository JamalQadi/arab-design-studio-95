import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plus, Eye, RefreshCw, Edit, Trash2, Settings, Building } from "lucide-react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabaseService } from "@/services/supabaseService";
import { organizationService } from "@/services/organizationService";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const Dashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
    loadOrganizations();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const projectsData = await supabaseService.getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadOrganizations = async () => {
    try {
      const orgs = await organizationService.getOrganizations();
      setOrganizations(orgs);
    } catch (error) {
      console.error('Error loading organizations:', error);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      await supabaseService.deleteProject(projectId);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const editProject = (project: any) => {
    // Implement edit functionality here
    console.log("Editing project:", project);
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'travel': return 'bg-green-100 text-green-600';
      case 'cv': return 'bg-blue-100 text-blue-600';
      case 'logo': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'travel': return '🧳';
      case 'cv': return '📄';
      case 'logo': return '🎨';
      default: return '📁';
    }
  };

  const getProjectTypeLabel = (type: string) => {
    switch (type) {
      case 'travel': return 'إعلان سياحي';
      case 'cv': return 'سيرة ذاتية';
      case 'logo': return 'شعار';
      default: return 'مشروع';
    }
  };

  const templateCategories = [
    { name: "إعلانات السفر", icon: "🧳", count: 45 },
    { name: "السير الذاتية", icon: "📄", count: 38 },
    { name: "الشعارات", icon: "🎨", count: 32 },
    { name: "التواصل الاجتماعي", icon: "📱", count: 35 }
  ];

  const quickActions = [
    {
      title: "تصميم إعلان سياحي",
      description: "ابدأ بإنشاء إعلان احترافي للرحلات والسفر",
      icon: "🧳",
      color: "from-green-500 to-emerald-600",
      href: "/travel-ad-editor"
    },
    {
      title: "إنشاء سيرة ذاتية",
      description: "صمم سيرة ذاتية احترافية تبرز مهاراتك",
      icon: "📄",
      color: "from-blue-500 to-indigo-600",
      href: "/cv-editor"
    },
    {
      title: "تصميم شعار",
      description: "أنشئ شعاراً مميزاً لعلامتك التجارية",
      icon: "🎨",
      color: "from-purple-500 to-pink-600",
      href: "/logo-editor"
    },
    {
      title: "منشورات اجتماعية",
      description: "صمم محتوى جذاب لوسائل التواصل الاجتماعي",
      icon: "📱",
      color: "from-orange-500 to-red-600",
      href: "/social-media-editor"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
              <p className="text-gray-600">مرحباً بك في منصة التصميم الاحترافية</p>
            </div>
            <div className="flex space-x-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/travel-ad-editor">
                  <Plus className="w-4 h-4 ml-2" />
                  مشروع جديد
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/templates">
                  <Eye className="w-4 h-4 ml-2" />
                  تصفح القوالب
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">البدء السريع</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">المشاريع الأخيرة</h2>
              <Button variant="ghost" size="sm" onClick={loadProjects}>
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${getProjectTypeColor(project.type)}`}>
                            {getProjectTypeIcon(project.type)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{project.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{getProjectTypeLabel(project.type)}</span>
                              <span>•</span>
                              <span>{format(new Date(project.created_at), 'dd/MM/yyyy', { locale: ar })}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{project.status}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editProject(project)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {projects.length > 5 && (
                  <div className="text-center">
                    <Button variant="outline" className="mt-4">
                      عرض جميع المشاريع ({projects.length})
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 text-6xl mb-4">📁</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مشاريع حتى الآن</h3>
                  <p className="text-gray-600 mb-6">ابدأ بإنشاء مشروعك الأول باستخدام أحد القوالب المتاحة</p>
                  <Button asChild>
                    <Link to="/travel-ad-editor">إنشاء مشروع جديد</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Organizations & Stats */}
          <div className="space-y-8">
            {/* Organizations Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">المؤسسات</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/organization-profile">
                    <Settings className="w-4 h-4 ml-2" />
                    إدارة
                  </Link>
                </Button>
              </div>
              
              {organizations.length > 0 ? (
                <div className="space-y-3">
                  {organizations.slice(0, 3).map((org) => (
                    <Card key={org.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          {org.logo ? (
                            <img src={org.logo} alt={org.name} className="w-10 h-10 rounded-lg object-cover" />
                          ) : (
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Building className="w-5 h-5 text-blue-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{org.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{org.type}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {organizations.length === 0 && (
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Building className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">لم يتم إضافة مؤسسات بعد</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link to="/organization-profile">إضافة مؤسسة</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Building className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">لم يتم إضافة مؤسسات بعد</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/organization-profile">إضافة مؤسسة</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Template Categories */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">فئات القوالب</h2>
              <div className="grid grid-cols-2 gap-3">
                {templateCategories.map((category, index) => (
                  <Link key={index} to="/templates">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="font-medium text-sm text-gray-900">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.count} قالب</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-4">إحصائيات سريعة</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">إجمالي المشاريع</span>
                    <span className="font-medium">{projects.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">المؤسسات</span>
                    <span className="font-medium">{organizations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">المشاريع المكتملة</span>
                    <span className="font-medium">
                      {projects.filter(p => p.status === 'مكتمل').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
