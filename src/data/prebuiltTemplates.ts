
export const prebuiltTemplates = {
  restaurant: {
    name: "قالب المطعم",
    type: "restaurant",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
    elements: [
      {
        id: "restaurant-title",
        type: "text",
        content: "احجز ذبيحة العيد",
        x: 540,
        y: 150,
        width: 400,
        height: 80,
        fontSize: 42,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "restaurant-subtitle",
        type: "text", 
        content: "عن طريق المطعم الإلهي",
        x: 540,
        y: 220,
        width: 350,
        height: 40,
        fontSize: 24,
        color: "#FFD700",
        textAlign: "center"
      },
      {
        id: "restaurant-phone",
        type: "text",
        content: "او عن طريق الاتصال على +32470707470",
        x: 540,
        y: 280,
        width: 400,
        height: 30,
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "restaurant-offer",
        type: "text",
        content: "واحصل علي خصم 20% علي الخبيزة",
        x: 540,
        y: 650,
        width: 300,
        height: 60,
        fontSize: 20,
        fontWeight: "bold",
        color: "#FF6B35",
        textAlign: "center",
        backgroundColor: "#FFD700",
        borderRadius: "15px",
        padding: "10px"
      },
      {
        id: "restaurant-decorative1",
        type: "text",
        content: "✦ ✦ ✦ ✦ ✦",
        x: 540,
        y: 320,
        width: 200,
        height: 30,
        fontSize: 16,
        color: "#FFD700",
        textAlign: "center"
      },
      {
        id: "restaurant-decorative2", 
        type: "text",
        content: "🕌",
        x: 100,
        y: 800,
        width: 60,
        height: 60,
        fontSize: 40,
        textAlign: "center"
      },
      {
        id: "restaurant-decorative3",
        type: "text", 
        content: "✨",
        x: 150,
        y: 400,
        width: 40,
        height: 40,
        fontSize: 30,
        textAlign: "center"
      }
    ]
  },

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

  wedding_card: {
    name: "قالب دعوة زواج",
    type: "wedding",
    size: { width: 1080, height: 1350 },
    background: "linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)",
    elements: [
      {
        id: "wedding-header",
        type: "text",
        content: "أفراح آل القحوم",
        x: 540,
        y: 100,
        width: 400,
        height: 60,
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        backgroundColor: "#1e40af",
        borderRadius: "20px",
        padding: "15px"
      },
      {
        id: "wedding-decoration1",
        type: "text",
        content: "وردة وفواحة",
        x: 200,
        y: 200,
        width: 200,
        height: 80,
        fontSize: 28,
        fontWeight: "bold",
        color: "#DC143C",
        textAlign: "center",
        transform: "rotate(-15deg)"
      },
      {
        id: "wedding-groom-info",
        type: "text",
        content: "مرحبا مصطفى",
        x: 300,
        y: 350,
        width: 250,
        height: 60,
        fontSize: 24,
        fontWeight: "bold", 
        color: "#000000",
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: "10px",
        padding: "10px"
      },
      {
        id: "wedding-occasion-text",
        type: "text",
        content: "بمناسبة زفاف ابننا الدكتور",
        x: 540,
        y: 420,
        width: 300,
        height: 30,
        fontSize: 18,
        color: "#000000",
        textAlign: "center"
      },
      {
        id: "wedding-bride-info",
        type: "text",
        content: "بنشرف اولاد المرحوم على خالب مهدي القحوم",
        x: 540,
        y: 470,
        width: 400,
        height: 40,
        fontSize: 16,
        color: "#000000",
        textAlign: "center"
      },
      {
        id: "wedding-invitation",
        type: "text",
        content: "بدعوتكم لحضور الحفيل والزفة",
        x: 540,
        y: 520,
        width: 350,
        height: 30,
        fontSize: 18,
        color: "#000000",
        textAlign: "center"
      },
      {
        id: "wedding-hall-name",
        type: "text",
        content: "صالة نجوم سبأ",
        x: 540,
        y: 570,
        width: 200,
        height: 50,
        fontSize: 24,
        fontWeight: "bold",
        color: "#FF0000",
        textAlign: "center"
      },
      {
        id: "wedding-location",
        type: "text",
        content: "الكائنة في جولة سبأ\nحلم في جامع ذي النورين",
        x: 540,
        y: 620,
        width: 300,
        height: 50,
        fontSize: 16,
        color: "#000000",
        textAlign: "center",
        lineHeight: 1.4
      },
      {
        id: "wedding-date",
        type: "text",
        content: "الخميس 30/11/2023",
        x: 540,
        y: 750,
        width: 200,
        height: 50,
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        backgroundColor: "#DC143C",
        borderRadius: "25px",
        padding: "10px"
      }
    ]
  },

  palestine_support: {
    name: "قالب دعم فلسطين",
    type: "solidarity",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #000000 0%, #666666 100%)",
    elements: [
      {
        id: "palestine-main-text",
        type: "text",
        content: "جمعة مباركة",
        x: 200,
        y: 800,
        width: 300,
        height: 60,
        fontSize: 32,
        fontWeight: "bold",
        color: "#4CAF50",
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: "15px",
        padding: "10px"
      },
      {
        id: "palestine-prayer",
        type: "text",
        content: "اللهم انصر إخواننا المجاهدين في غزة\nآلا إن نصر الله قريب",
        x: 540,
        y: 950,
        width: 400,
        height: 60,
        fontSize: 16,
        color: "#4CAF50",
        textAlign: "center",
        lineHeight: 1.5
      },
      {
        id: "palestine-flag-element",
        type: "text",
        content: "🇵🇸",
        x: 540,
        y: 400,
        width: 100,
        height: 100,
        fontSize: 80,
        textAlign: "center"
      },
      {
        id: "palestine-landmarks",
        type: "text",
        content: "🕌",
        x: 150,
        y: 200,
        width: 60,
        height: 60,
        fontSize: 40,
        textAlign: "center"
      },
      {
        id: "palestine-landmarks2",
        type: "text",
        content: "🏛️",
        x: 850,
        y: 300,
        width: 60,
        height: 60,
        fontSize: 40,
        textAlign: "center"
      },
      {
        id: "palestine-tech-logo",
        type: "text",
        content: "ITTech",
        x: 100,
        y: 950,
        width: 120,
        height: 40,
        fontSize: 18,
        fontWeight: "bold",
        color: "#2196F3",
        textAlign: "center"
      }
    ]
  },

  // القوالب الجديدة
  whatsapp_status: {
    name: "حالة واتساب",
    type: "status",
    size: { width: 1080, height: 1920 },
    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
    elements: [
      {
        id: "status-quote",
        type: "text",
        content: "الحمد لله رب العالمين",
        x: 540,
        y: 600,
        width: 600,
        height: 100,
        fontSize: 48,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "status-author",
        type: "text",
        content: "- القرآن الكريم -",
        x: 540,
        y: 720,
        width: 300,
        height: 50,
        fontSize: 24,
        color: "#F0F8FF",
        textAlign: "center"
      },
      {
        id: "status-decoration",
        type: "text",
        content: "✨ • ✨ • ✨",
        x: 540,
        y: 850,
        width: 200,
        height: 40,
        fontSize: 28,
        color: "#FFD700",
        textAlign: "center"
      },
      {
        id: "status-emoji",
        type: "text",
        content: "🤲",
        x: 540,
        y: 450,
        width: 100,
        height: 100,
        fontSize: 80,
        textAlign: "center"
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
  },

  personal_profile: {
    name: "بروفايل شخصي",
    type: "profile",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    elements: [
      {
        id: "personal-avatar",
        type: "text",
        content: "👤",
        x: 540,
        y: 200,
        width: 150,
        height: 150,
        fontSize: 120,
        textAlign: "center"
      },
      {
        id: "personal-name",
        type: "text",
        content: "أحمد محمد",
        x: 540,
        y: 380,
        width: 300,
        height: 60,
        fontSize: 36,
        fontWeight: "bold",
        color: "#2C3E50",
        textAlign: "center"
      },
      {
        id: "personal-title",
        type: "text",
        content: "مطور برمجيات",
        x: 540,
        y: 450,
        width: 250,
        height: 40,
        fontSize: 20,
        color: "#34495E",
        textAlign: "center"
      },
      {
        id: "personal-quote",
        type: "text",
        content: "\"البرمجة فن وعلم في نفس الوقت\"",
        x: 540,
        y: 550,
        width: 500,
        height: 60,
        fontSize: 18,
        fontStyle: "italic",
        color: "#7F8C8D",
        textAlign: "center"
      },
      {
        id: "personal-skills",
        type: "text",
        content: "JavaScript • React • Node.js • Python",
        x: 540,
        y: 650,
        width: 400,
        height: 30,
        fontSize: 16,
        color: "#2C3E50",
        textAlign: "center"
      },
      {
        id: "personal-contact",
        type: "text",
        content: "📧 ahmed@example.com\n💼 linkedin.com/in/ahmed",
        x: 540,
        y: 750,
        width: 350,
        height: 60,
        fontSize: 14,
        color: "#34495E",
        textAlign: "center",
        lineHeight: 1.8
      }
    ]
  },

  sale_ad: {
    name: "إعلان تخفيضات",
    type: "advertisement",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    elements: [
      {
        id: "sale-main-text",
        type: "text",
        content: "تخفيضات كبرى",
        x: 540,
        y: 200,
        width: 500,
        height: 80,
        fontSize: 48,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "sale-discount",
        type: "text",
        content: "خصم 50%",
        x: 540,
        y: 350,
        width: 300,
        height: 100,
        fontSize: 72,
        fontWeight: "bold",
        color: "#FFD700",
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: "20px",
        padding: "20px"
      },
      {
        id: "sale-products",
        type: "text",
        content: "على جميع المنتجات",
        x: 540,
        y: 480,
        width: 350,
        height: 40,
        fontSize: 24,
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "sale-duration",
        type: "text",
        content: "العرض ساري لمدة أسبوع فقط",
        x: 540,
        y: 650,
        width: 400,
        height: 30,
        fontSize: 18,
        color: "#FFF8DC",
        textAlign: "center"
      },
      {
        id: "sale-cta",
        type: "text",
        content: "تسوق الآن",
        x: 540,
        y: 750,
        width: 200,
        height: 60,
        fontSize: 24,
        fontWeight: "bold",
        color: "#FF6B6B",
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: "30px",
        padding: "15px"
      },
      {
        id: "sale-emoji",
        type: "text",
        content: "🛍️",
        x: 100,
        y: 100,
        width: 80,
        height: 80,
        fontSize: 60,
        textAlign: "center"
      },
      {
        id: "sale-emoji2",
        type: "text",
        content: "💰",
        x: 900,
        y: 900,
        width: 80,
        height: 80,
        fontSize: 60,
        textAlign: "center"
      }
    ]
  },

  real_estate_ad: {
    name: "إعلان عقاري",
    type: "advertisement",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #2C5530 0%, #6B8E23 100%)",
    elements: [
      {
        id: "estate-title",
        type: "text",
        content: "شقة للبيع",
        x: 540,
        y: 150,
        width: 300,
        height: 60,
        fontSize: 42,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "estate-location",
        type: "text",
        content: "في حي الملك فهد - الرياض",
        x: 540,
        y: 220,
        width: 400,
        height: 40,
        fontSize: 22,
        color: "#F0F8FF",
        textAlign: "center"
      },
      {
        id: "estate-specs",
        type: "text",
        content: "🏠 3 غرف نوم\n🚿 2 حمام\n🍽️ صالة واسعة\n🚗 موقف سيارة",
        x: 540,
        y: 400,
        width: 300,
        height: 120,
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: "right",
        lineHeight: 1.8
      },
      {
        id: "estate-price",
        type: "text",
        content: "450,000 ريال",
        x: 540,
        y: 600,
        width: 350,
        height: 80,
        fontSize: 48,
        fontWeight: "bold",
        color: "#FFD700",
        textAlign: "center"
      },
      {
        id: "estate-contact",
        type: "text",
        content: "للتواصل: 0501234567",
        x: 540,
        y: 750,
        width: 300,
        height: 40,
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "estate-agency",
        type: "text",
        content: "مكتب العقارات المتميز",
        x: 540,
        y: 850,
        width: 350,
        height: 30,
        fontSize: 16,
        color: "#90EE90",
        textAlign: "center"
      },
      {
        id: "estate-icon",
        type: "text",
        content: "🏢",
        x: 540,
        y: 280,
        width: 100,
        height: 100,
        fontSize: 80,
        textAlign: "center"
      }
    ]
  },

  motivational_quote: {
    name: "اقتباس تحفيزي",
    type: "quote",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        id: "quote-text",
        type: "text",
        content: "\"النجاح ليس نهاية المطاف،\nوالفشل ليس قاتلاً،\nإنما الشجاعة للاستمرار\nهي التي تُحدث الفرق\"",
        x: 540,
        y: 450,
        width: 700,
        height: 200,
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        lineHeight: 1.4
      },
      {
        id: "quote-author",
        type: "text",
        content: "- ونستون تشرشل -",
        x: 540,
        y: 700,
        width: 300,
        height: 40,
        fontSize: 20,
        color: "#FFD700",
        textAlign: "center"
      },
      {
        id: "quote-decoration-top",
        type: "text",
        content: "✨",
        x: 200,
        y: 200,
        width: 60,
        height: 60,
        fontSize: 40,
        textAlign: "center"
      },
      {
        id: "quote-decoration-bottom",
        type: "text",
        content: "✨",
        x: 820,
        y: 820,
        width: 60,
        height: 60,
        fontSize: 40,
        textAlign: "center"
      },
      {
        id: "quote-marks",
        type: "text",
        content: "❝",
        x: 100,
        y: 300,
        width: 80,
        height: 80,
        fontSize: 60,
        color: "rgba(255,255,255,0.3)",
        textAlign: "center"
      },
      {
        id: "quote-marks2",
        type: "text",
        content: "❞",
        x: 900,
        y: 600,
        width: 80,
        height: 80,
        fontSize: 60,
        color: "rgba(255,255,255,0.3)",
        textAlign: "center"
      }
    ]
  },

  service_ad: {
    name: "إعلان خدمة",
    type: "service",
    size: { width: 1080, height: 1080 },
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    elements: [
      {
        id: "service-title",
        type: "text",
        content: "خدمات التنظيف المنزلي",
        x: 540,
        y: 180,
        width: 500,
        height: 60,
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "service-subtitle",
        type: "text",
        content: "نظافة مضمونة بأيدي خبيرة",
        x: 540,
        y: 250,
        width: 400,
        height: 40,
        fontSize: 20,
        color: "#F0FFFF",
        textAlign: "center"
      },
      {
        id: "service-features",
        type: "text",
        content: "✅ عمالة مدربة\n✅ مواد تنظيف عالية الجودة\n✅ أسعار منافسة\n✅ ضمان على الخدمة",
        x: 540,
        y: 400,
        width: 400,
        height: 120,
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: "right",
        lineHeight: 1.8
      },
      {
        id: "service-offer",
        type: "text",
        content: "خصم 25% للعملاء الجدد",
        x: 540,
        y: 600,
        width: 400,
        height: 60,
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFD700",
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: "15px",
        padding: "15px"
      },
      {
        id: "service-contact",
        type: "text",
        content: "احجز الآن: 0551234567",
        x: 540,
        y: 750,
        width: 300,
        height: 40,
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center"
      },
      {
        id: "service-hours",
        type: "text",
        content: "متاحون 24/7",
        x: 540,
        y: 820,
        width: 200,
        height: 30,
        fontSize: 16,
        color: "#F0FFFF",
        textAlign: "center"
      },
      {
        id: "service-icon",
        type: "text",
        content: "🧽",
        x: 540,
        y: 320,
        width: 60,
        height: 60,
        fontSize: 50,
        textAlign: "center"
      }
    ]
  }
};
