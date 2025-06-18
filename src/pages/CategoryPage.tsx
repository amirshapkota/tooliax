
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List, Star, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PromotionalBanner } from "@/components/PromotionalBanner";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState("popularity");
  const [filterPricing, setFilterPricing] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");

  // Categories and subcategories data
  const categoryData = {
    "developers": {
      name: "AI for Developers",
      subcategories: ["Code Generation", "Debugging", "API Tools", "Testing", "Documentation", "Code Review"]
    },
    "marketing": {
      name: "Marketing Tools", 
      subcategories: ["SEO Tools", "Social Media", "Email Marketing", "Analytics", "Advertising", "Content Creation"]
    },
    "image-processing": {
      name: "Image Processing",
      subcategories: ["Image Generation", "Photo Editing", "Background Removal", "Style Transfer", "Upscaling", "Face Recognition"]
    },
    "nlp": {
      name: "Natural Language Processing",
      subcategories: ["Chatbots", "Translation", "Text Analysis", "Writing Assistance", "Grammar Check", "Sentiment Analysis"]
    },
    "video": {
      name: "Video Processing",
      subcategories: ["Video Editing", "Video Generation", "Motion Graphics", "Subtitles", "Compression", "Live Streaming"]
    },
    "audio": {
      name: "Audio Processing",
      subcategories: ["Music Generation", "Voice Synthesis", "Audio Editing", "Transcription", "Sound Effects", "Podcast Tools"]
    }
  };

  // Mock data - in a real app, this would be fetched from an API
  const tools = [
    {
      id: "1",
      name: "ChatGPT",
      description: "Advanced AI chatbot for conversations, content creation, and problem-solving.",
      category: "Natural Language Processing",
      subcategory: "Chatbots",
      rating: 4.8,
      reviewCount: 1234,
      pricing: "Freemium",
      features: ["Natural Language", "Code Generation", "Creative Writing"],
      logo: "/placeholder.svg"
    },
    {
      id: "2",
      name: "GitHub Copilot",
      description: "AI-powered code completion and assistance for developers.",
      category: "AI for Developers",
      subcategory: "Code Generation",
      rating: 4.7,
      reviewCount: 892,
      pricing: "Paid",
      features: ["Code Completion", "AI Suggestions", "Multi-language Support"],
      logo: "/placeholder.svg"
    },
    {
      id: "3",
      name: "Midjourney",
      description: "AI art generator that creates images from textual descriptions.",
      category: "Image Processing",
      subcategory: "Image Generation",
      rating: 4.7,
      reviewCount: 910,
      pricing: "Paid",
      features: ["Image Generation", "Art Creation", "Style Transfer"],
      logo: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Remove.bg",
      description: "AI-powered background removal tool for images.",
      category: "Image Processing",
      subcategory: "Background Removal",
      rating: 4.6,
      reviewCount: 543,
      pricing: "Freemium",
      features: ["Background Removal", "Bulk Processing", "API Access"],
      logo: "/placeholder.svg"
    },
    {
      id: "5",
      name: "Jasper",
      description: "AI writing assistant for creating marketing copy, blog posts, and more.",
      category: "Marketing Tools",
      subcategory: "Content Creation",
      rating: 4.9,
      reviewCount: 1567,
      pricing: "Paid",
      features: ["Content Generation", "Copywriting", "SEO Optimization"],
      logo: "/placeholder.svg"
    },
    {
      id: "6",
      name: "SEMrush AI",
      description: "AI-powered SEO and marketing tools for digital marketers.",
      category: "Marketing Tools",
      subcategory: "SEO Tools",
      rating: 4.4,
      reviewCount: 321,
      pricing: "Paid",
      features: ["Keyword Research", "Competitor Analysis", "Site Audit"],
      logo: "/placeholder.svg"
    }
  ];

  const contentBannerContent = {
    title: "🎯 Find Your Perfect AI Tool",
    description: "Discover curated AI tools that match your specific needs. Compare features, pricing, and user reviews.",
    ctaText: "Start Free Trial",
    ctaLink: "https://example.com/trial",
    backgroundColor: "#4628dd",
    textColor: "white"
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];
  
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || tool.category.toLowerCase().includes(currentCategory?.name.toLowerCase() || "");
    const matchesSubcategory = selectedSubcategory === "all" || tool.subcategory === selectedSubcategory;
    const matchesPricing = filterPricing === "all" || tool.pricing.toLowerCase() === filterPricing;
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesPricing;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-sm text-gray-500">Categories</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              {currentCategory?.name || "All Categories"}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {currentCategory?.name || "All AI Tools"}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover and compare the best AI tools in this category
          </p>
        </div>

        {/* Promotional Banner */}
        <div className="mb-6">
          <PromotionalBanner 
            type="content" 
            content={contentBannerContent}
          />
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Categories & Subcategories */}
          {currentCategory && (
            <div className="w-64 flex-shrink-0">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Subcategories
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedSubcategory("all")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedSubcategory === "all"
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      All {currentCategory.name}
                    </button>
                    {currentCategory.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => setSelectedSubcategory(subcategory)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedSubcategory === subcategory
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search and Filters */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search tools..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterPricing} onValueChange={setFilterPricing}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Pricing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Pricing</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="freemium">Freemium</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tools Grid/List */}
            <div className={`grid gap-4 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img 
                        src={tool.logo} 
                        alt={tool.name}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
                          <Badge variant="outline" className="text-xs">{tool.pricing}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{tool.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({tool.reviewCount})</span>
                          <Badge variant="secondary" className="text-xs">{tool.subcategory}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-gray-600 text-lg">No tools found matching your criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
