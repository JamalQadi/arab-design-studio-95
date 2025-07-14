
export const cvTemplates = {
  cv_professional_classic: {
    name: "السيرة الذاتية الكلاسيكية الاحترافية",
    type: "cv",
    category: "professional",
    size: { width: 800, height: 1000 },
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    elements: [
      {
        id: "header-section",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 50,
        width: 700,
        height: 60,
        fontSize: 36,
        fontWeight: "bold",
        color: "#1e293b",
        textAlign: "center"
      },
      {
        id: "title-section",
        type: "text",
        content: "{{title}}",
        x: 50,
        y: 120,
        width: 700,
        height: 30,
        fontSize: 18,
        color: "#64748b",
        textAlign: "center"
      },
      {
        id: "contact-section",
        type: "text",
        content: "📧 {{email}} | 📱 {{phone}} | 📍 {{location}}",
        x: 50,
        y: 170,
        width: 700,
        height: 25,
        fontSize: 14,
        color: "#475569",
        textAlign: "center"
      },
      {
        id: "summary-title",
        type: "text",
        content: "نبذة مختصرة",
        x: 50,
        y: 230,
        width: 300,
        height: 30,
        fontSize: 20,
        fontWeight: "bold",
        color: "#0f172a"
      },
      {
        id: "summary-content",
        type: "text",
        content: "{{summary}}",
        x: 50,
        y: 270,
        width: 700,
        height: 80,
        fontSize: 14,
        color: "#334155",
        lineHeight: 1.6
      },
      {
        id: "experience-title",
        type: "text",
        content: "الخبرات العملية",
        x: 50,
        y: 380,
        width: 300,
        height: 30,
        fontSize: 20,
        fontWeight: "bold",
        color: "#0f172a"
      },
      {
        id: "experience-content",
        type: "text",
        content: "{{experience}}",
        x: 50,
        y: 420,
        width: 700,
        height: 200,
        fontSize: 14,
        color: "#334155",
        lineHeight: 1.5
      },
      {
        id: "skills-title",
        type: "text",
        content: "المهارات",
        x: 50,
        y: 650,
        width: 300,
        height: 30,
        fontSize: 20,
        fontWeight: "bold",
        color: "#0f172a"
      },
      {
        id: "skills-content",
        type: "text",
        content: "{{skills}}",
        x: 50,
        y: 690,
        width: 700,
        height: 100,
        fontSize: 14,
        color: "#334155"
      },
      {
        id: "education-title",
        type: "text",
        content: "التعليم",
        x: 50,
        y: 820,
        width: 300,
        height: 30,
        fontSize: 20,
        fontWeight: "bold",
        color: "#0f172a"
      },
      {
        id: "education-content",
        type: "text",
        content: "{{education}}",
        x: 50,
        y: 860,
        width: 700,
        height: 100,
        fontSize: 14,
        color: "#334155"
      }
    ]
  },

  cv_modern_creative: {
    name: "السيرة الذاتية العصرية الإبداعية",
    type: "cv",
    category: "creative",
    size: { width: 800, height: 1000 },
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        id: "profile-circle",
        type: "shape",
        content: "circle",
        x: 350,
        y: 30,
        width: 100,
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "50%"
      },
      {
        id: "name-header",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 150,
        width: 700,
        height: 50,
        fontSize: 32,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center"
      },
      {
        id: "title-modern",
        type: "text",
        content: "{{title}}",
        x: 50,
        y: 210,
        width: 700,
        height: 25,
        fontSize: 16,
        color: "#e2e8f0",
        textAlign: "center"
      },
      {
        id: "sidebar-bg",
        type: "shape",
        content: "rectangle",
        x: 0,
        y: 280,
        width: 280,
        height: 720,
        backgroundColor: "rgba(0, 0, 0, 0.3)"
      },
      {
        id: "contact-info",
        type: "text",
        content: "معلومات التواصل\n\n📧 {{email}}\n📱 {{phone}}\n📍 {{location}}\n🌐 {{website}}",
        x: 20,
        y: 300,
        width: 240,
        height: 150,
        fontSize: 12,
        color: "#ffffff",
        lineHeight: 1.5
      },
      {
        id: "skills-sidebar",
        type: "text",
        content: "المهارات التقنية\n\n{{skills}}",
        x: 20,
        y: 480,
        width: 240,
        height: 200,
        fontSize: 12,
        color: "#ffffff",
        lineHeight: 1.5
      },
      {
        id: "main-content-bg",
        type: "shape",
        content: "rectangle",
        x: 300,
        y: 280,
        width: 500,
        height: 720,
        backgroundColor: "#ffffff"
      },
      {
        id: "summary-modern",
        type: "text",
        content: "نبذة شخصية\n\n{{summary}}",
        x: 320,
        y: 300,
        width: 460,
        height: 120,
        fontSize: 13,
        color: "#1e293b",
        lineHeight: 1.6
      },
      {
        id: "experience-modern",
        type: "text",
        content: "الخبرة المهنية\n\n{{experience}}",
        x: 320,
        y: 440,
        width: 460,
        height: 300,
        fontSize: 13,
        color: "#1e293b",
        lineHeight: 1.5
      },
      {
        id: "education-modern",
        type: "text",
        content: "المؤهلات العلمية\n\n{{education}}",
        x: 320,
        y: 760,
        width: 460,
        height: 200,
        fontSize: 13,
        color: "#1e293b",
        lineHeight: 1.5
      }
    ]
  },

  cv_minimalist: {
    name: "السيرة الذاتية البسيطة الأنيقة",
    type: "cv",
    category: "minimalist",
    size: { width: 800, height: 1000 },
    background: "#ffffff",
    elements: [
      {
        id: "name-minimal",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 80,
        width: 500,
        height: 50,
        fontSize: 42,
        fontWeight: "300",
        color: "#000000"
      },
      {
        id: "title-minimal",
        type: "text",
        content: "{{title}}",
        x: 50,
        y: 140,
        width: 500,
        height: 25,
        fontSize: 16,
        color: "#666666"
      },
      {
        id: "line-divider",
        type: "shape",
        content: "line",
        x: 50,
        y: 180,
        width: 700,
        height: 2,
        backgroundColor: "#e5e7eb"
      },
      {
        id: "contact-minimal",
        type: "text",
        content: "{{email}} • {{phone}} • {{location}}",
        x: 50,
        y: 200,
        width: 700,
        height: 20,
        fontSize: 12,
        color: "#999999"
      },
      {
        id: "summary-minimal",
        type: "text",
        content: "{{summary}}",
        x: 50,
        y: 250,
        width: 700,
        height: 80,
        fontSize: 14,
        color: "#333333",
        lineHeight: 1.6
      },
      {
        id: "experience-header",
        type: "text",
        content: "EXPERIENCE",
        x: 50,
        y: 360,
        width: 200,
        height: 20,
        fontSize: 12,
        fontWeight: "bold",
        color: "#000000",
        letterSpacing: "2px"
      },
      {
        id: "experience-minimal",
        type: "text",
        content: "{{experience}}",
        x: 50,
        y: 390,
        width: 700,
        height: 250,
        fontSize: 13,
        color: "#333333",
        lineHeight: 1.5
      },
      {
        id: "education-header",
        type: "text",
        content: "EDUCATION",
        x: 50,
        y: 670,
        width: 200,
        height: 20,
        fontSize: 12,
        fontWeight: "bold",
        color: "#000000",
        letterSpacing: "2px"
      },
      {
        id: "education-minimal",
        type: "text",
        content: "{{education}}",
        x: 50,
        y: 700,
        width: 700,
        height: 100,
        fontSize: 13,
        color: "#333333",
        lineHeight: 1.5
      },
      {
        id: "skills-header",
        type: "text",
        content: "SKILLS",
        x: 50,
        y: 830,
        width: 200,
        height: 20,
        fontSize: 12,
        fontWeight: "bold",
        color: "#000000",
        letterSpacing: "2px"
      },
      {
        id: "skills-minimal",
        type: "text",
        content: "{{skills}}",
        x: 50,
        y: 860,
        width: 700,
        height: 100,
        fontSize: 13,
        color: "#333333"
      }
    ]
  },

  cv_tech_professional: {
    name: "السيرة الذاتية التقنية المتقدمة",
    type: "cv",
    category: "tech",
    size: { width: 800, height: 1000 },
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    elements: [
      {
        id: "tech-header-bg",
        type: "shape",
        content: "rectangle",
        x: 0,
        y: 0,
        width: 800,
        height: 200,
        backgroundColor: "rgba(59, 130, 246, 0.1)"
      },
      {
        id: "name-tech",
        type: "text",
        content: "{{name}}",
        x: 50,
        y: 50,
        width: 500,
        height: 50,
        fontSize: 36,
        fontWeight: "bold",
        color: "#60a5fa"
      },
      {
        id: "title-tech",
        type: "text",
        content: "{{title}}",
        x: 50,
        y: 110,
        width: 500,
        height: 30,
        fontSize: 18,
        color: "#94a3b8"
      },
      {
        id: "contact-tech",
        type: "text",
        content: "💻 {{email}} | 📱 {{phone}} | 🌍 {{location}} | 🔗 {{github}}",
        x: 50,
        y: 150,
        width: 700,
        height: 25,
        fontSize: 14,
        color: "#cbd5e1"
      },
      {
        id: "summary-tech-title",
        type: "text",
        content: "// نبذة تقنية",
        x: 50,
        y: 230,
        width: 300,
        height: 25,
        fontSize: 16,
        fontWeight: "bold",
        color: "#22d3ee"
      },
      {
        id: "summary-tech",
        type: "text",
        content: "{{summary}}",
        x: 50,
        y: 265,
        width: 700,
        height: 80,
        fontSize: 14,
        color: "#e2e8f0",
        lineHeight: 1.6
      },
      {
        id: "skills-tech-title",
        type: "text",
        content: "// التقنيات والأدوات",
        x: 50,
        y: 370,
        width: 300,
        height: 25,
        fontSize: 16,
        fontWeight: "bold",
        color: "#22d3ee"
      },
      {
        id: "skills-tech",
        type: "text",
        content: "{{skills}}",
        x: 50,
        y: 405,
        width: 700,
        height: 120,
        fontSize: 14,
        color: "#e2e8f0"
      },
      {
        id: "experience-tech-title",
        type: "text",
        content: "// الخبرة المهنية",
        x: 50,
        y: 550,
        width: 300,
        height: 25,
        fontSize: 16,
        fontWeight: "bold",
        color: "#22d3ee"
      },
      {
        id: "experience-tech",
        type: "text",
        content: "{{experience}}",
        x: 50,
        y: 585,
        width: 700,
        height: 250,
        fontSize: 14,
        color: "#e2e8f0",
        lineHeight: 1.5
      },
      {
        id: "education-tech-title",
        type: "text",
        content: "// التعليم والشهادات",
        x: 50,
        y: 860,
        width: 300,
        height: 25,
        fontSize: 16,
        fontWeight: "bold",
        color: "#22d3ee"
      },
      {
        id: "education-tech",
        type: "text",
        content: "{{education}}",
        x: 50,
        y: 895,
        width: 700,
        height: 80,
        fontSize: 14,
        color: "#e2e8f0"
      }
    ]
  }
};
