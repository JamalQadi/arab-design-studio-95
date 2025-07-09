
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const footerLinks = {
    الخدمات: [
      "إعلانات مكاتب السفر",
      "منشئ السير الذاتية", 
      "صانع الشعارات",
      "قوالب التواصل الاجتماعي"
    ],
    الشركة: [
      "من نحن",
      "فريق العمل",
      "الوظائف",
      "الشراكات"
    ],
    الدعم: [
      "مركز المساعدة",
      "دروس الفيديو",
      "تواصل معنا",
      "الأسئلة الشائعة"
    ],
    القانونية: [
      "سياسة الخصوصية",
      "شروط الاستخدام",
      "سياسة الاسترداد",
      "حقوق الطبع والنشر"
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">DS</span>
              </div>
              <span className="text-2xl font-bold">ديزاين ستوديو</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              منصة التصميم الأولى في الوطن العربي. نساعدك في إنشاء تصاميم احترافية 
              بسهولة وسرعة لتنمية أعمالك وتحقيق أهدافك.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-800">
                📧 تواصل معنا
              </Button>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-lg mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section */}
        <div className="border-t border-gray-800 pt-12 mb-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">اشترك في النشرة الإخبارية</h3>
            <p className="text-gray-400 mb-6">
              احصل على آخر التحديثات والقوالب الجديدة مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6">
                اشتراك
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 ديزاين ستوديو. جميع الحقوق محفوظة.
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <span>صنع بـ ❤️ في الوطن العربي</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">📱 تليجرام</a>
                <a href="#" className="hover:text-white transition-colors">📘 فيسبوك</a>
                <a href="#" className="hover:text-white transition-colors">📷 انستغرام</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
