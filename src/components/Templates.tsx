
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Templates = () => {
  const categories = [
    {
      title: "إعلانات مكاتب السفر",
      templates: [
        { name: "حج وعمرة VIP", type: "مميز", image: "🕋" },
        { name: "عروض الطيران", type: "شائع", image: "✈️" },
        { name: "تأشيرات سياحية", type: "جديد", image: "📋" },
        { name: "باقات شهر العسل", type: "رومانسي", image: "💑" }
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "السير الذاتية",
      templates: [
        { name: "CV كلاسيكي", type: "رسمي", image: "📄" },
        { name: "CV إبداعي", type: "عصري", image: "🎨" },
        { name: "CV تقني", type: "متخصص", image: "💻" },
        { name: "CV للطلاب", type: "بسيط", image: "🎓" }
      ],
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "الشعارات",
      templates: [
        { name: "شعار تجاري", type: "احترافي", image: "🏢" },
        { name: "شعار مطعم", type: "غذائي", image: "🍽️" },
        { name: "شعار تقني", type: "رقمي", image: "⚡" },
        { name: "شعار طبي", type: "صحي", image: "🏥" }
      ],
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="templates" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            مكتبة القوالب الاحترافية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر من بين مئات القوالب المصممة خصيصاً للمستخدمين العرب
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                <Button variant="outline">عرض الكل</Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {category.templates.map((template, index) => (
                  <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        {/* Template Preview */}
                        <div className={`h-48 bg-gradient-to-br ${category.color} flex items-center justify-center text-6xl`}>
                          {template.image}
                        </div>
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button className="bg-white text-gray-900 hover:bg-gray-100">
                            استخدم القالب
                          </Button>
                        </div>

                        {/* Template type badge */}
                        <Badge className="absolute top-3 right-3 bg-white/90 text-gray-800 border-0">
                          {template.type}
                        </Badge>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>مجاني</span>
                          <span>⭐ 4.8</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              أكثر من 1000 قالب احترافي في انتظارك
            </h3>
            <p className="text-gray-600 mb-6">
              اشترك الآن للوصول إلى جميع القوالب والمميزات المتقدمة
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
              تصفح جميع القوالب
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
