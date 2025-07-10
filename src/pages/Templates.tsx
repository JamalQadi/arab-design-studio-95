import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Eye, Download } from "lucide-react";

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "جميع القوالب", count: 150 },
    { id: "travel", name: "إعلانات السفر", count: 45 },
    { id: "cv", name: "السير الذاتية", count: 38 },
    { id: "logo", name: "الشعارات", count: 32 },
    { id: "social", name: "التواصل الاجتماعي", count: 35 }
  ];

  const templates = [
    { id: 1, name: "حج وعمرة فاخر", category: "travel", type: "مميز", downloads: 1250, rating: 4.9, premium: true },
    { id: 2, name: "عروض الطيران", category: "travel", type: "شائع", downloads: 890, rating: 4.7, premium: false },
    { id: 3, name: "CV كلاسيكي", category: "cv", type: "احترافي", downloads: 2100, rating: 4.8, premium: false },
    { id: 4, name: "شعار تجاري", category: "logo", type: "عصري", downloads: 756, rating: 4.6, premium: true },
    { id: 5, name: "منشور انستغرام", category: "social", type: "ترويجي", downloads: 1890, rating: 4.9, premium: false },
    { id: 6, name: "تأشيرات سياحية", category: "travel", type: "رسمي", downloads: 543, rating: 4.5, premium: false },
    { id: 7, name: "CV إبداعي", category: "cv", type: "مبدع", downloads: 1456, rating: 4.8, premium: true },
    { id: 8, name: "شعار مطعم", category: "logo", type: "غذائي", downloads: 432, rating: 4.4, premium: false }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      travel: "from-green-500 to-emerald-600",
      cv: "from-blue-500 to-indigo-600", 
      logo: "from-purple-500 to-pink-600",
      social: "from-orange-500 to-red-600"
    };
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      travel: "🧳",
      cv: "📄",
      logo: "🎨",
      social: "📱"
    };
    return icons[category as keyof typeof icons] || "📋";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            مكتبة القوالب الاحترافية
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            اكثر من 1000 قالب جاهز للاستخدام، مصمم خصيصاً للسوق العربي
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="mr-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Template Preview */}
                    <div className={`h-48 bg-gradient-to-br ${getCategoryColor(template.category)} flex items-center justify-center text-6xl relative`}>
                      {getCategoryIcon(template.category)}
                      
                      {/* Premium Badge */}
                      {template.premium && (
                        <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900 border-0">
                          مميز
                        </Badge>
                      )}
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                      <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                        <Eye className="w-4 h-4 ml-2" />
                        معاينة
                      </Button>
                      <Link to="/travel-ad-editor">
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                          استخدام
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Download className="w-4 h-4 ml-1" />
                        {template.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        ⭐ {template.rating}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              تحميل المزيد من القوالب
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Templates;
