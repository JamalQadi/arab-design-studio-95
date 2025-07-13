
export const personalTemplates = {
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
  }
};
