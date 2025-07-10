
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-sm border-b" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              استوديو التصميم العربي
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-reverse space-x-8">
              <Link to="/#features" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                المميزات
              </Link>
              <Link to="/#services" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                خدماتنا
              </Link>
              <Link to="/#templates" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                قوالب
              </Link>
              <Link to="/#pricing" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                الأسعار
              </Link>
              {user && (
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                  لوحة التحكم
                </Link>
              )}
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-reverse space-x-4">
            {user ? (
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="flex items-center space-x-reverse space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">تسجيل الدخول</Button>
                </Link>
                <Link to="/login">
                  <Button>ابدأ الآن</Button>
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
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                to="/#features"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                المميزات
              </Link>
              <Link
                to="/#services"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                خدماتنا
              </Link>
              <Link
                to="/#templates"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                قوالب
              </Link>
              <Link
                to="/#pricing"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                الأسعار
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  لوحة التحكم
                </Link>
              )}
              <div className="border-t pt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-700">
                      مرحباً، {user.name}
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                      تسجيل الخروج
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">تسجيل الدخول</Button>
                    </Link>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">ابدأ الآن</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
