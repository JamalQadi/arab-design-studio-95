import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Templates from "@/components/Templates";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { CreateProjectModal } from "@/components/CreateProjectModal";

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />
      <Hero onCreateProject={() => setIsCreateModalOpen(true)} />
      <Features />
      <Services />
      <Templates />
      <Pricing />
      <Footer />
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
