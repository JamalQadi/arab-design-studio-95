import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Templates } from "@/components/Templates";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Quick Access to Editors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ابدأ التصميم الآن
            </h2>
            <p className="text-xl text-gray-600">
              اختر نوع التصميم الذي تريد إنشاءه
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/travel-ad-editor" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                    🧳
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    إعلانات السفر
                  </h3>
                  <p className="text-gray-600 text-sm">
                    قم بتصميم إعلانات احترافية لمكاتب السفر والعمرة
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/logo-editor" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                    🎨
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    صانع الشعارات
                  </h3>
                  <p className="text-gray-600 text-sm">
                    اصنع شعارات احترافية لشركتك أو مشروعك بسهولة
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/social-media-editor" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                    📱
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    منشورات التواصل
                  </h3>
                  <p className="text-gray-600 text-sm">
                    صمم منشورات جذابة لجميع منصات التواصل الاجتماعي
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/cv-editor" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                    📄
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    السيرة الذاتية
                  </h3>
                  <p className="text-gray-600 text-sm">
                    انشئ سيرة ذاتية احترافية تبرز مهاراتك وخبراتك
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Services />
      <Templates />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
