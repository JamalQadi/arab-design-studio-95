
export const advertisementTemplates = {
  sale_promotion_modern: {
    name: "إعلان عروض تخفيضات عصري",
    type: "advertisement",
    category: "sale",
    size: { width: 800, height: 600 },
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    elements: [
      {
        id: "sale-badge",
        type: "shape",
        content: "circle",
        x: 50,
        y: 50,
        width: 120,
        height: 120,
        backgroundColor: "#ffffff",
        borderRadius: "50%"
      },
      {
        id: "sale-percentage",
        type: "text",
        content: "50%",
        x: 70,
        y: 90,
        width: 80,
        height: 40,
        fontSize: 32,
        fontWeight: "bold",
        color: "#ff6b6b",
        textAlign: "center"
      },
      {
        id: "sale-text",
        type: "text",
        content: "خصم",
        x: 70,
        y: 130,
        width: 80,
        height: 20,
        fontSize: 14,
        color: "#ff6b6b",
        textAlign: "center"
      },
      {
        id: "main-title",
        type: "text",
        content: "{{title}}",
        x: 200,
        y: 80,
        width: 550,
        height: 60,
        fontSize: 48,
        fontWeight: "bold",
        color: "#ffffff"
      },
      {
        id: "subtitle",
        type: "text",
        content: "{{subtitle}}",
        x: 200,
        y: 150,
        width: 550,
        height: 30,
        fontSize: 20,
        color: "#ffe8e8"
      },
      {
        id: "promotion-details",
        type: "text",
        content: "{{details}}",
        x: 50,
        y: 250,
        width: 700,
        height: 100,
        fontSize: 16,
        color: "#ffffff",
        lineHeight: 1.6
      },
      {
        id: "cta-button",
        type: "shape",
        content: "rectangle",
        x: 300,
        y: 400,
        width: 200,
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius: "30px"
      },
      {
        id: "cta-text",
        type: "text",
        content: "اشتري الآن",
        x: 320,
        y: 420,
        width: 160,
        height: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: "#ff6b6b",
        textAlign: "center"
      },
      {
        id: "contact-info",
        type: "text",
        content: "{{contact}}",
        x: 50,
        y: 520,
        width: 700,
        height: 30,
        fontSize: 14,
        color: "#ffe8e8",
        textAlign: "center"
      }
    ]
  },

  restaurant_menu_promo: {
    name: "إعلان قائمة طعام",
    type: "advertisement",
    category: "restaurant",
    size: { width: 800, height: 600 },
    background: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)",
    elements: [
      {
        id: "header-bg",
        type: "shape",
        content: "rectangle",
        x: 0,
        y: 0,
        width: 800,
        height: 150,
        backgroundColor: "rgba(237, 137, 54, 0.9)"
      },
      {
        id: "restaurant-logo",
        type: "text",
        content: "🍽️",
        x: 50,
        y: 50,
        width: 80,
        height: 80,
        fontSize: 64,
        textAlign: "center"
      },
      {
        id: "restaurant-name",
        type: "text",
        content: "{{name}}",
        x: 150,
        y: 50,
        width: 600,
        height: 50,
        fontSize: 36,
        fontWeight: "bold",
        color: "#ffffff"
      },
      {
        id: "restaurant-slogan",
        type: "text",
        content: "{{slogan}}",
        x: 150,
        y: 105,
        width: 600,
        height: 25,
        fontSize: 18,
        color: "#fff7ed"
      },
      {
        id: "menu-title",
        type: "text",
        content: "قائمة اليوم المميزة",
        x: 50,
        y: 200,
        width: 700,
        height: 40,
        fontSize: 28,
        fontWeight: "bold",
        color: "#ed8936",
        textAlign: "center"
      },
      {
        id: "menu-items",
        type: "text",
        content: "{{menu}}",
        x: 50,
        y: 260,
        width: 700,
        height: 200,
        fontSize: 16,
        color: "#e2e8f0",
        lineHeight: 1.8
      },
      {
        id: "special-offer",
        type: "text",
        content: "عرض خاص: {{offer}}",
        x: 50,
        y: 480,
        width: 700,
        height: 30,
        fontSize: 20,
        fontWeight: "bold",
        color: "#fbbf24",
        textAlign: "center"
      },
      {
        id: "restaurant-contact",
        type: "text",
        content: "{{contact}} | {{address}}",
        x: 50,
        y: 530,
        width: 700,
        height: 30,
        fontSize: 14,
        color: "#cbd5e1",
        textAlign: "center"
      }
    ]
  },

  event_announcement: {
    name: "إعلان فعالية أو حدث",
    type: "advertisement",
    category: "event",
    size: { width: 800, height: 600 },
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        id: "event-header",
        type: "text",
        content: "حدث مميز",
        x: 50,
        y: 50,
        width: 700,
        height: 30,
        fontSize: 16,
        color: "#e2e8f0",
        textAlign: "center",
        letterSpacing: "3px"
      },
      {
        id: "event-title",
        type: "text",
        content: "{{title}}",
        x: 50,
        y: 100,
        width: 700,
        height: 80,
        fontSize: 42,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "event-icon",
        type: "text",
        content: "🎉",
        x: 370,
        y: 200,
        width: 60,
        height: 60,
        fontSize: 48,
        textAlign: "center"
      },
      {
        id: "event-date",
        type: "text",
        content: "📅 {{date}}",
        x: 50,
        y: 300,
        width: 350,
        height: 30,
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "event-time",
        type: "text",
        content: "🕐 {{time}}",
        x: 400,
        y: 300,
        width: 350,
        height: 30,
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "event-location",
        type: "text",
        content: "📍 {{location}}",
        x: 50,
        y: 350,
        width: 700,
        height: 30,
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "event-description",
        type: "text",
        content: "{{description}}",
        x: 50,
        y: 400,
        width: 700,
        height: 80,
        fontSize: 16,
        color: "#e2e8f0",
        textAlign: "center",
        lineHeight: 1.6
      },
      {
        id: "registration-info",
        type: "text",
        content: "للتسجيل: {{registration}}",
        x: 50,
        y: 520,
        width: 700,
        height: 30,
        fontSize: 16,
        fontWeight: "bold",
        color: "#fbbf24",
        textAlign: "center"
      }
    ]
  },

  service_promotion: {
    name: "إعلان ترويج خدمة",
    type: "advertisement",
    category: "service",
    size: { width: 800, height: 600 },
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    elements: [
      {
        id: "service-badge",
        type: "shape",
        content: "rectangle",
        x: 50,
        y: 50,
        width: 150,
        height: 40,
        backgroundColor: "#ffffff",
        borderRadius: "20px"
      },
      {
        id: "service-badge-text",
        type: "text",
        content: "خدمة جديدة",
        x: 60,
        y: 60,
        width: 130,
        height: 20,
        fontSize: 14,
        fontWeight: "bold",
        color: "#10b981",
        textAlign: "center"
      },
      {
        id: "service-title",
        type: "text",
        content: "{{title}}",
        x: 50,
        y: 120,
        width: 700,
        height: 60,
        fontSize: 40,
        fontWeight: "bold",
        color: "#ffffff"
      },
      {
        id: "service-subtitle",
        type: "text",
        content: "{{subtitle}}",
        x: 50,
        y: 190,
        width: 700,
        height: 30,
        fontSize: 20,
        color: "#d1fae5"
      },
      {
        id: "service-features",
        type: "text",
        content: "{{features}}",
        x: 50,
        y: 250,
        width: 700,
        height: 150,
        fontSize: 16,
        color: "#ffffff",
        lineHeight: 1.8
      },
      {
        id: "price-section",
        type: "text",
        content: "ابتداءً من {{price}} ريال",
        x: 50,
        y: 430,
        width: 700,
        height: 40,
        fontSize: 24,
        fontWeight: "bold",
        color: "#fbbf24",
        textAlign: "center"
      },
      {
        id: "contact-cta",
        type: "text",
        content: "اتصل بنا الآن: {{phone}}",
        x: 50,
        y: 500,
        width: 700,
        height: 30,
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "service-website",
        type: "text",
        content: "{{website}}",
        x: 50,
        y: 540,
        width: 700,
        height: 20,
        fontSize: 14,
        color: "#d1fae5",
        textAlign: "center"
      }
    ]
  },

  social_media_post: {
    name: "منشور وسائل التواصل الاجتماعي",
    type: "advertisement",
    category: "social",
    size: { width: 600, height: 600 },
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    elements: [
      {
        id: "social-frame",
        type: "shape",
        content: "rectangle",
        x: 50,
        y: 50,
        width: 500,
        height: 500,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "20px"
      },
      {
        id: "social-icon",
        type: "text",
        content: "📱",
        x: 270,
        y: 100,
        width: 60,
        height: 60,
        fontSize: 48,
        textAlign: "center"
      },
      {
        id: "social-title",
        type: "text",
        content: "{{title}}",
        x: 80,
        y: 200,
        width: 440,
        height: 60,
        fontSize: 32,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "social-content",
        type: "text",
        content: "{{content}}",
        x: 80,
        y: 280,
        width: 440,
        height: 120,
        fontSize: 16,
        color: "#ffffff",
        textAlign: "center",
        lineHeight: 1.6
      },
      {
        id: "hashtags",
        type: "text",
        content: "{{hashtags}}",
        x: 80,
        y: 420,
        width: 440,
        height: 40,
        fontSize: 14,
        color: "#ffe8e8",
        textAlign: "center"
      },
      {
        id: "social-handle",
        type: "text",
        content: "{{handle}}",
        x: 80,
        y: 480,
        width: 440,
        height: 30,
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
      }
    ]
  }
};
