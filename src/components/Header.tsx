
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authService, User as UserType } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح",
    });
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ديزاين ستوديو</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">الخدمات</a>
            <Link to="/templates" className="text-gray-700 hover:text-blue-600 transition-colors">القوالب</Link>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">المميزات</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">الأسعار</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>العربية</span>
            </Button>
            
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{currentUser.name}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>خروج</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">تسجيل الدخول</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    ابدأ مجاناً
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">الخدمات</a>
              <Link to="/templates" className="text-gray-700 hover:text-blue-600 transition-colors">القوالب</Link>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">المميزات</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">الأسعار</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                {currentUser ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="outline" size="sm" className="w-full">
                        لوحة التحكم
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full">
                      تسجيل الخروج
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" size="sm" className="w-full">تسجيل الدخول</Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 w-full">
                        ابدأ مجاناً
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
