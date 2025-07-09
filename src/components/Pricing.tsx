
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Pricing = () => {
  const plans = [
    {
      name: "مجاني",
      price: "0",
      period: "إلى الأبد",
      description: "مثالي للمبتدئين والاستخدام الشخصي",
      features: [
        "5 تصاميم شهرياً",
        "قوالب أساسية محدودة",
        "تصدير بدقة متوسطة",
        "دعم مجتمعي",
        "علامة مائية صغيرة"
      ],
      buttonText: "ابدأ مجاناً",
      popular: false,
      color: "from-gray-500 to-gray-600"
    },
    {
      name: "احترافي",
      price: "49",
      period: "شهرياً",
      description: "الأفضل للمهنيين وأصحاب الأعمال",
      features: [
        "تصاميم غير محدودة",
        "جميع القوالب المميزة",
        "تصدير بجودة عالية",
        "دعم أولوية",
        "بدون علامة مائية",
        "خطوط مميزة",
        "صور عالية الجودة"
      ],
      buttonText: "اشترك الآن",
      popular: true,
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "الشركات",
      price: "149",
      period: "شهرياً",
      description: "للفرق والمؤسسات الكبيرة",
      features: [
        "كل ميزات الخطة الاحترافية",
        "5 مستخدمين",
        "إدارة الفريق",
        "قوالب مخصصة",
        "API للتكامل",
        "تقارير مفصلة",
        "دعم مخصص",
        "تدريب فريق العمل"
      ],
      buttonText: "تواصل معنا",
      popular: false,
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            خطط تناسب جميع الاحتياجات
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر الخطة المناسبة لك وابدأ في إنشاء تصاميم احترافية اليوم
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1">
                  الأكثر شعبية
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                  <span className="text-white text-2xl">
                    {index === 0 ? '🚀' : index === 1 ? '⭐' : '👑'}
                  </span>
                </div>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "0" && <span className="text-gray-600 mr-2">ريال</span>}
                  <div className="text-gray-600">{plan.period}</div>
                </div>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full text-lg py-3 ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ضمان استرداد الأموال لمدة 30 يوماً
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            جرب خدماتنا بدون مخاطر. إذا لم تكن راضياً بنسبة 100%، سنسترد أموالك كاملة خلال 30 يوماً
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              ابدأ تجربتك المجانية
            </Button>
            <Button variant="outline" size="lg">
              تحدث مع فريق المبيعات
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
