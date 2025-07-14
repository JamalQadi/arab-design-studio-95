
export const logoTemplates = {
  logo_restaurant_elegant: {
    name: "شعار مطعم أنيق",
    type: "logo",
    category: "restaurant",
    size: { width: 400, height: 400 },
    background: "#ffffff",
    elements: [
      {
        id: "main-circle",
        type: "shape",
        content: "circle",
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        backgroundColor: "#8b4513",
        borderRadius: "50%"
      },
      {
        id: "inner-circle",
        type: "shape",
        content: "circle",
        x: 120,
        y: 120,
        width: 160,
        height: 160,
        backgroundColor: "#d2691e",
        borderRadius: "50%"
      },
      {
        id: "restaurant-icon",
        type: "text",
        content: "🍽️",
        x: 170,
        y: 170,
        width: 60,
        height: 60,
        fontSize: 48,
        textAlign: "center"
      },
      {
        id: "restaurant-name",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 320,
        width: 300,
        height: 40,
        fontSize: 24,
        fontWeight: "bold",
        color: "#8b4513",
        textAlign: "center"
      },
      {
        id: "restaurant-tagline",
        type: "text",
        content: "{{tagline}}",
        x: 50,
        y: 365,
        width: 300,
        height: 20,
        fontSize: 12,
        color: "#666666",
        textAlign: "center"
      }
    ]
  },

  logo_tech_modern: {
    name: "شعار تقني عصري",
    type: "logo",
    category: "tech",
    size: { width: 400, height: 400 },
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        id: "tech-square",
        type: "shape",
        content: "rectangle",
        x: 150,
        y: 100,
        width: 100,
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
        transform: "rotate(45deg)"
      },
      {
        id: "tech-icon",
        type: "text",
        content: "💻",
        x: 170,
        y: 130,
        width: 60,
        height: 60,
        fontSize: 40,
        textAlign: "center"
      },
      {
        id: "tech-name",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 250,
        width: 300,
        height: 40,
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "tech-tagline",
        type: "text",
        content: "{{tagline}}",
        x: 50,
        y: 295,
        width: 300,
        height: 20,
        fontSize: 14,
        color: "#e2e8f0",
        textAlign: "center"
      },
      {
        id: "tech-dots",
        type: "text",
        content: "• • •",
        x: 50,
        y: 330,
        width: 300,
        height: 20,
        fontSize: 20,
        color: "#60a5fa",
        textAlign: "center"
      }
    ]
  },

  logo_medical_professional: {
    name: "شعار طبي احترافي",
    type: "logo",
    category: "medical",
    size: { width: 400, height: 400 },
    background: "#ffffff",
    elements: [
      {
        id: "medical-bg",
        type: "shape",
        content: "circle",
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        backgroundColor: "#0ea5e9",
        borderRadius: "50%"
      },
      {
        id: "cross-vertical",
        type: "shape",
        content: "rectangle",
        x: 185,
        y: 140,
        width: 30,
        height: 120,
        backgroundColor: "#ffffff",
        borderRadius: "5px"
      },
      {
        id: "cross-horizontal",
        type: "shape",
        content: "rectangle",
        x: 155,
        y: 185,
        width: 90,
        height: 30,
        backgroundColor: "#ffffff",
        borderRadius: "5px"
      },
      {
        id: "medical-name",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 320,
        width: 300,
        height: 30,
        fontSize: 22,
        fontWeight: "bold",
        color: "#0ea5e9",
        textAlign: "center"
      },
      {
        id: "medical-specialty",
        type: "text",
        content: "{{specialty}}",
        x: 50,
        y: 355,
        width: 300,
        height: 20,
        fontSize: 14,
        color: "#64748b",
        textAlign: "center"
      }
    ]
  },

  logo_fashion_boutique: {
    name: "شعار بوتيك أزياء",
    type: "logo",
    category: "fashion",
    size: { width: 400, height: 400 },
    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    elements: [
      {
        id: "fashion-frame",
        type: "shape",
        content: "rectangle",
        x: 80,
        y: 80,
        width: 240,
        height: 240,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "20px"
      },
      {
        id: "fashion-inner",
        type: "shape",
        content: "rectangle",
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "15px"
      },
      {
        id: "fashion-icon",
        type: "text",
        content: "👗",
        x: 170,
        y: 170,
        width: 60,
        height: 60,
        fontSize: 48,
        textAlign: "center"
      },
      {
        id: "fashion-name",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 250,
        width: 300,
        height: 30,
        fontSize: 24,
        fontWeight: "bold",
        color: "#92400e",
        textAlign: "center"
      },
      {
        id: "fashion-tagline",
        type: "text",
        content: "{{tagline}}",
        x: 50,
        y: 285,
        width: 300,
        height: 20,
        fontSize: 12,
        color: "#451a03",
        textAlign: "center"
      },
      {
        id: "fashion-accent",
        type: "text",
        content: "✨ ✨ ✨",
        x: 50,
        y: 340,
        width: 300,
        height: 20,
        fontSize: 16,
        color: "#fbbf24",
        textAlign: "center"
      }
    ]
  },

  logo_fitness_gym: {
    name: "شعار نادي رياضي",
    type: "logo",
    category: "fitness",
    size: { width: 400, height: 400 },
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    elements: [
      {
        id: "gym-shield",
        type: "shape",
        content: "polygon",
        x: 150,
        y: 80,
        width: 100,
        height: 140,
        backgroundColor: "#ef4444",
        borderRadius: "10px"
      },
      {
        id: "gym-icon",
        type: "text",
        content: "💪",
        x: 170,
        y: 130,
        width: 60,
        height: 60,
        fontSize: 40,
        textAlign: "center"
      },
      {
        id: "gym-name",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 250,
        width: 300,
        height: 40,
        fontSize: 26,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "gym-tagline",
        type: "text",
        content: "{{tagline}}",
        x: 50,
        y: 295,
        width: 300,
        height: 20,
        fontSize: 14,
        color: "#ef4444",
        textAlign: "center"
      },
      {
        id: "gym-motto",
        type: "text",
        content: "NO PAIN • NO GAIN",
        x: 50,
        y: 330,
        width: 300,
        height: 20,
        fontSize: 12,
        color: "#9ca3af",
        textAlign: "center",
        letterSpacing: "2px"
      }
    ]
  }
};
