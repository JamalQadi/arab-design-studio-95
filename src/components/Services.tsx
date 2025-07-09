
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const Services = () => {
  const services = [
    {
      id: "travel-ads",
      title: "تصميم إعلانات مكاتب السفر والسياحة",
      description: "قوالب احترافية للحج والعمرة والتأشيرات والحجوزات مع إمكانية إضافة معلومات مكتبك تلقائياً",
      features: ["قوالب الحج والعمرة", "إعلانات التأشيرات", "عروض الطيران", "بطاقات الحجز"],
      color: "from-green-500 to-emerald-600",
      badge: "الأكثر طلباً",
      status: "متاح",
      link: "/travel-ad-editor"
    },
    {
      id: "cv-builder",
      title: "منشئ السير الذاتية الاحترافية",
      description: "أنشئ سيرتك الذاتية بتصاميم عصرية وقوالب متنوعة تناسب جميع المهن والتخصصات مع تصدير PDF فوري",
      features: ["6+ قوالب احترافية", "تصاميم متجاوبة", "تصدير PDF فوري", "واجهة سهلة الاستخدام"],
      color: "from-blue-500 to-indigo-600",
      badge: "محدث",
      status: "متاح",  
      link: "/cv-editor"
    },
    {
      id: "logo-maker",
      title: "صانع الشعارات الذكي",
      description: "اصنع شعار مميز لعملك أو مشروعك باستخدام الذكاء الاصطناعي وأدوات التخصيص المتقدمة",
      features: ["ذكاء اصطناعي", "اقتراحات ألوان", "خطوط عربية", "أيقونات متنوعة"],
      color: "from-purple-500 to-pink-600",
      badge: "",
      status: "قريباً",
      link: "#"
    }
  ];

  const futureServices = [
    "منشورات التواصل الاجتماعي",
    "بطاقات العمل الرقمية", 
    "تصاميم المناسبات الدينية",
    "لافتات المحلات التجارية"
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            خدماتنا الاحترافية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة شاملة من أدوات التصميم المتخصصة للسوق العربي
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                    <span className="text-white text-xl">🎨</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {service.badge && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                        {service.badge}
                      </Badge>
                    )}
                    <Badge 
                      variant={service.status === "متاح" ? "default" : "secondary"}
                      className={service.status === "متاح" ? "bg-green-100 text-green-800 border-green-200" : ""}
                    >
                      {service.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">المميزات الرئيسية:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {service.status === "متاح" ? (
                    <Link to={service.link}>
                      <Button className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}>
                        ابدأ التصميم
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
                      disabled
                    >
                      قريباً
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Future Services */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">خدمات قادمة</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {futureServices.map((service, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
