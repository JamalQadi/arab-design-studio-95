
export const religiousTemplates = {
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
  }
};
