
export const businessTemplates = {
  tech_company: {
    name: "قالب الشركة التقنية",
    type: "tech",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #1e3a8a 0%, #f97316 100%)",
    elements: [
      {
        id: "tech-logo-text",
        type: "text",
        content: "جينيس سيلوشنز",
        x: 540,
        y: 200,
        width: 400,
        height: 60,
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "tech-tagline",
        type: "text",
        content: "GENIUS SOLUTIONS",
        x: 540,
        y: 260,
        width: 350,
        height: 40,
        fontSize: 24,
        color: "#f97316",
        textAlign: "center"
      },
      {
        id: "tech-subtitle",
        type: "text",
        content: "للبرمجيات المحدودة",
        x: 540,
        y: 300,
        width: 300,
        height: 35,
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "tech-slogan",
        type: "text",
        content: "تطوير... وابتكار",
        x: 540,
        y: 340,
        width: 250,
        height: 30,
        fontSize: 18,
        color: "#f97316",
        textAlign: "center"
      },
      {
        id: "tech-services",
        type: "text",
        content: "• أنظمة مالية ومحاسبية وإدارية\n• تطوير تطبيقات الموبايل\n• تصميم وتطوير مواقع الإنترنت\n• خدمات الاستضافة",
        x: 540,
        y: 500,
        width: 450,
        height: 120,
        fontSize: 16,
        lineHeight: 1.6,
        color: "#FFFFFF",
        textAlign: "right"
      },
      {
        id: "tech-contact",
        type: "text",
        content: "771445981 - 01-401441",
        x: 540,
        y: 800,
        width: 300,
        height: 40,
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFD700",
        textAlign: "center"
      },
      {
        id: "tech-circuit1",
        type: "text",
        content: "⚡",
        x: 100,
        y: 100,
        width: 40,
        height: 40,
        fontSize: 30,
        color: "#f97316"
      },
      {
        id: "tech-circuit2",
        type: "text",
        content: "💻",
        x: 900,
        y: 150,
        width: 40,
        height: 40,
        fontSize: 30,
        color: "#f97316"
      }
    ]
  },

  business_profile: {
    name: "بروفايل تجاري",
    type: "profile",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        id: "profile-logo",
        type: "text",
        content: "🏪",
        x: 540,
        y: 200,
        width: 120,
        height: 120,
        fontSize: 100,
        textAlign: "center"
      },
      {
        id: "profile-business-name",
        type: "text",
        content: "متجر الأناقة",
        x: 540,
        y: 350,
        width: 400,
        height: 60,
        fontSize: 42,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "profile-tagline",
        type: "text",
        content: "أزياء عصرية بأسعار مناسبة",
        x: 540,
        y: 420,
        width: 500,
        height: 40,
        fontSize: 22,
        color: "#F0F8FF",
        textAlign: "center"
      },
      {
        id: "profile-services",
        type: "text",
        content: "• ملابس رجالية\n• أزياء نسائية\n• إكسسوارات\n• أحذية عصرية",
        x: 540,
        y: 550,
        width: 300,
        height: 120,
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: "right",
        lineHeight: 1.8
      },
      {
        id: "profile-contact",
        type: "text",
        content: "📱 0123456789\n📍 شارع الملك فهد، الرياض",
        x: 540,
        y: 750,
        width: 400,
        height: 60,
        fontSize: 16,
        color: "#FFD700",
        textAlign: "center",
        lineHeight: 1.6
      },
      {
        id: "profile-hours",
        type: "text",
        content: "⏰ من 9 صباحاً إلى 11 مساءً",
        x: 540,
        y: 850,
        width: 300,
        height: 30,
        fontSize: 16,
        color: "#FFFFFF",
        textAlign: "center"
      }
    ]
  }
};
