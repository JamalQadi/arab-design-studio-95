import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import TravelAdEditor from "./pages/TravelAdEditor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CVEditor from "./pages/CVEditor";
import LogoEditor from "./pages/LogoEditor";
import SocialMediaEditor from "./pages/SocialMediaEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/travel-ad-editor" element={
            <ProtectedRoute>
              <TravelAdEditor />
            </ProtectedRoute>
          } />
          <Route path="/logo-editor" element={
            <ProtectedRoute>
              <LogoEditor />
            </ProtectedRoute>
          } />
          <Route path="/social-media-editor" element={
            <ProtectedRoute>
              <SocialMediaEditor />
            </ProtectedRoute>
          } />
          <Route path="/cv-editor" element={
            <ProtectedRoute>
              <CVEditor />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
