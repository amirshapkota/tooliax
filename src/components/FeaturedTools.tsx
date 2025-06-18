
import { Button } from "@/components/ui/button";
import { ToolCard } from "./ToolCard";
import { Crown, ArrowRight } from "lucide-react";

// Mock data for featured tools
const featuredTools = [
  {
    id: "1",
    name: "ChatGPT",
    description: "Advanced conversational AI for various tasks including writing, coding, and analysis.",
    category: "Natural Language Processing",
    rating: 4.8,
    ratingCount: 15420,
    pricing: "Freemium",
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: "2",
    name: "Midjourney",
    description: "AI-powered image generation tool that creates stunning artwork from text descriptions.",
    category: "Image Processing",
    rating: 4.7,
    ratingCount: 8930,
    pricing: "Paid",
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: "3",
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster with intelligent suggestions.",
    category: "AI for Developers",
    rating: 4.6,
    ratingCount: 12750,
    pricing: "Paid",
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: "4",
    name: "Notion AI",
    description: "Integrated AI assistant for productivity, writing, and content creation within Notion.",
    category: "Productivity",
    rating: 4.5,
    ratingCount: 6820,
    pricing: "Freemium",
    image: "/placeholder.svg",
    featured: true
  }
];

export const FeaturedTools = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-orange-700 text-sm font-medium mb-4">
              <Crown className="h-4 w-4 mr-2" />
              Editor's Choice
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Featured AI Tools
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl">
              Handpicked tools that are making waves in the AI community
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="group border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up animation-delay-200"
          >
            View All Tools
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool, index) => (
            <div 
              key={tool.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
