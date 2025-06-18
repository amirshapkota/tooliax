
import { HeroSection } from "@/components/HeroSection";
import { FeaturedTools } from "@/components/FeaturedTools";
import { PopularCategories } from "@/components/PopularCategories";
import { SearchSection } from "@/components/SearchSection";
import { PromotionalBanner } from "@/components/PromotionalBanner";

const Index = () => {
  // Mock promotional content - in real app this would come from admin settings
  const contentBannerContent = {
    title: "🎯 Boost Your Productivity with AI",
    description: "Join thousands of professionals using AI tools to streamline their workflow and achieve better results.",
    ctaText: "Get Started Free",
    ctaLink: "https://example.com/signup",
    backgroundColor: "#6e3ce7",
    textColor: "white"
  };

  return (
    <div className="space-y-12">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <SearchSection />
        <FeaturedTools />
        <PromotionalBanner 
          type="content" 
          content={contentBannerContent}
        />
        <PopularCategories />
      </div>
    </div>
  );
};

export default Index;
