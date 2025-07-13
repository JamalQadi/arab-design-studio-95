
export const socialTemplates = {
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
  }
};
