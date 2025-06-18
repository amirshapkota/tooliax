
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import ToolPage from "./pages/ToolPage";
import ComparePage from "./pages/ComparePage";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import DeveloperAuth from "./pages/DeveloperAuth";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Team from "./pages/Team";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/tool/:toolId" element={<ToolPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/developer/auth" element={<DeveloperAuth />} />
            <Route 
              path="/developer" 
              element={
                <ProtectedRoute>
                  <DeveloperDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/team" element={<Team />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
