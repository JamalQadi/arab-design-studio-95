
export const advertisementTemplates = {
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
