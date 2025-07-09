
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Features = () => {
  const features = [
    {
      icon: "🎨",
      title: "محرر سحب وإفلات",
      description: "واجهة بسيطة وسهلة تمكنك من تعديل التصاميم دون خبرة تقنية"
    },
    {
      icon: "🔤",
      title: "دعم الخطوط العربية",
      description: "مكتبة شاملة من الخطوط العربية الجميلة والمقروءة لجميع التصاميم"
    },
    {
      icon: "📱",
      title: "تصاميم متجاوبة",
      description: "جميع التصاميم تعمل بشكل مثالي على الهواتف والأجهزة اللوحية"
    },
    {
      icon: "☁️",
      title: "حفظ تلقائي",
      description: "احفظ مشاريعك في السحابة وارجع إليها في أي وقت من أي جهاز"
    },
    {
      icon: "📤",
      title: "تصدير متعدد الصيغ",
      description: "صدّر تصاميمك بصيغ PNG، JPG، PDF بجودة عالية للطباعة والنشر"
    },
    {
      icon: "🌙",
      title: "الوضع المظلم",
      description: "واجهة مريحة للعين مع إمكانية التبديل بين الوضع الفاتح والمظلم"
    },
    {
      icon: "🔄",
      title: "تحديثات منتظمة",
      description: "قوالب وميزات جديدة كل شهر لتواكب أحدث اتجاهات التصميم"
    },
    {
      icon: "🎯",
      title: "للسوق العربي",
      description: "مصمم خصيصاً لفهم احتياجات وثقافة المستخدمين في الوطن العربي"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            لماذا ديزاين ستوديو؟
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مميزات قوية وأدوات احترافية تجعل التصميم متعة لا عبء
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Features */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            تقنيات متقدمة للمحترفين
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                🤖
              </div>
              <h4 className="font-bold text-gray-900 mb-2">ذكاء اصطناعي</h4>
              <p className="text-gray-600">
                اقتراحات تلقائية للألوان والخطوط والتخطيطات المناسبة لنوع تصميمك
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                ⚡
              </div>
              <h4 className="font-bold text-gray-900 mb-2">سرعة فائقة</h4>
              <p className="text-gray-600">
                محرر سريع ومستجيب يعمل بسلاسة حتى مع التصاميم المعقدة والملفات الكبيرة
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                🔒
              </div>
              <h4 className="font-bold text-gray-900 mb-2">أمان عالي</h4>
              <p className="text-gray-600">
                حماية كاملة لتصاميمك ومعلوماتك مع نسخ احتياطية آمنة ومشفرة
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
