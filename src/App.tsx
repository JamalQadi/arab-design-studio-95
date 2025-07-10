
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import CVEditor from "./pages/CVEditor";
import TravelAdEditor from "./pages/TravelAdEditor";
import LogoEditor from "./pages/LogoEditor";
import SocialMediaEditor from "./pages/SocialMediaEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/templates"
              element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cv-editor"
              element={
                <ProtectedRoute>
                  <CVEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/travel-editor"
              element={
                <ProtectedRoute>
                  <TravelAdEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logo-editor"
              element={
                <ProtectedRoute>
                  <LogoEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/social-editor"
              element={
                <ProtectedRoute>
                  <SocialMediaEditor />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
