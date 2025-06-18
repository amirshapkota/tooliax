
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PromotionalBanner } from "./PromotionalBanner";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [topBannerVisible, setTopBannerVisible] = useState(true);

  // Mock promotional content - in real app this would come from admin settings
  const topBannerContent = {
    title: "🚀 Special Offer: Get 50% off Premium AI Tools",
    description: "",
    ctaText: "Claim Now",
    ctaLink: "https://example.com/promotion",
    backgroundColor: "#4628dd",
    textColor: "white"
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero-style gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 -z-20"></div>
      <div className="fixed inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      {/* Animated gradient blobs like homepage */}
      <div className="fixed top-0 -left-4 w-72 h-72 bg-[#4628dd]/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob -z-10"></div>
      <div className="fixed top-0 -right-4 w-72 h-72 bg-[#6e3ce7]/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>
      <div className="fixed -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 -z-10"></div>
      
      <PromotionalBanner 
        type="top" 
        content={topBannerContent}
        isVisible={topBannerVisible}
        onClose={() => setTopBannerVisible(false)}
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};
