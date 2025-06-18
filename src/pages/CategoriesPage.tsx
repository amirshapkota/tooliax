
import { CategoryExplorer } from "@/components/CategoryExplorer";
import { PromotionalBanner } from "@/components/PromotionalBanner";

const CategoriesPage = () => {
  const contentBannerContent = {
    title: "🚀 Discover AI Tools by Category",
    description: "Find the perfect AI tool for your specific use case. Browse through our comprehensive collection organized by category.",
    ctaText: "Submit Your Tool",
    ctaLink: "/developer",
    backgroundColor: "#6e3ce7",
    textColor: "white"
  };

  return (
    <div className="space-y-12">
      <CategoryExplorer />
      <div className="max-w-7xl mx-auto px-4">
        <PromotionalBanner 
          type="content" 
          content={contentBannerContent}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
