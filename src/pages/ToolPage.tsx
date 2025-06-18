import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Globe, Calendar, Users, CheckCircle, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromotionalBanner } from "@/components/PromotionalBanner";

const ToolPage = () => {
  const { id } = useParams();
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: ""
  });

  // Mock tool data - in a real app, this would be fetched based on the ID
  const tool = {
    id: id || "1",
    name: "ChatGPT",
    description: "ChatGPT is an AI language model that can generate human-like text responses to prompts and questions.",
    category: "Natural Language Processing",
    website: "https://chat.openai.com",
    logo: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 1234,
    features: [
      "Natural language understanding",
      "Code generation and debugging", 
      "Creative writing assistance",
      "Question answering",
      "Language translation"
    ],
    useCases: [
      "Content creation",
      "Customer support",
      "Education and tutoring",
      "Programming assistance",
      "Research and analysis"
    ],
    pricingPlans: [
      {
        name: "Free",
        price: "$0/month",
        features: ["Limited usage", "GPT-3.5 model", "Basic support"]
      },
      {
        name: "Plus",
        price: "$20/month", 
        features: ["Unlimited usage", "GPT-4 access", "Priority support", "Faster response times"]
      }
    ],
    integrations: ["API", "Slack", "Discord", "Microsoft Teams"],
    supportedLanguages: ["English", "Spanish", "French", "German", "Japanese", "Chinese"],
    lastUpdated: "2024-01-15"
  };

  // Alternative tools in the same category
  const alternativeTools = [
    {
      id: "2",
      name: "Claude",
      description: "AI assistant by Anthropic focused on being helpful, harmless, and honest.",
      category: "Natural Language Processing",
      rating: 4.7,
      reviewCount: 856,
      pricing: "Freemium",
      logo: "/placeholder.svg"
    },
    {
      id: "3", 
      name: "Bard",
      description: "Google's conversational AI service powered by LaMDA technology.",
      category: "Natural Language Processing",
      rating: 4.5,
      reviewCount: 642,
      pricing: "Free",
      logo: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Perplexity AI",
      description: "AI-powered search and answer engine that provides accurate, real-time information.",
      category: "Natural Language Processing", 
      rating: 4.6,
      reviewCount: 423,
      pricing: "Freemium",
      logo: "/placeholder.svg"
    }
  ];

  const contentBannerContent = {
    title: "🚀 Try AI Tools Risk-Free",
    description: "Get started with the best AI tools today. Most offer free trials or freemium plans to test their capabilities.",
    ctaText: "Browse Free Tools",
    ctaLink: "/category/all?pricing=free",
    backgroundColor: "#6e3ce7",
    textColor: "white"
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", reviewForm);
    // Reset form
    setReviewForm({
      name: "",
      email: "",
      rating: 5,
      comment: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Tool Header */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <img 
                src={tool.logo} 
                alt={tool.name}
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl object-cover border-2 border-gray-200 mx-auto lg:mx-0"
              />
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{tool.name}</h1>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 w-fit">{tool.category}</Badge>
                  </div>
                  <p className="text-gray-600 text-base lg:text-lg">{tool.description}</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tool.rating}</span>
                    <span className="text-gray-600">({tool.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {new Date(tool.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-gradient-to-r from-[#4628dd] to-[#6e3ce7] hover:opacity-90">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                  <Button variant="outline" className="border-[#4628dd] text-[#4628dd] hover:bg-[#4628dd] hover:text-white">
                    Add to Compare
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promotional Banner */}
        <PromotionalBanner 
          type="content" 
          content={contentBannerContent}
        />

        {/* Tool Details */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Use Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tool.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Supported Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.supportedLanguages.map((language, index) => (
                    <Badge key={index} variant="secondary">{language}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tool.pricingPlans.map((plan, index) => (
                <Card key={index} className="shadow-lg border-0 relative overflow-hidden">
                  {index === 1 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[#4628dd] to-[#6e3ce7] text-white px-3 py-1 text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-gray-900">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-[#4628dd] to-[#6e3ce7] hover:opacity-90">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {/* Add Review Form */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Add Your Review</CardTitle>
                <CardDescription>Share your experience with {tool.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="p-1"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= reviewForm.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review *
                    </label>
                    <textarea
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Share your experience with this tool..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
                    />
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-[#4628dd] to-[#6e3ce7] hover:opacity-90">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Reviews */}
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6">
                <p className="text-gray-600 text-center py-8">
                  User reviews would be displayed here. This would show existing reviews with ratings, comments, and user information.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Available Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {tool.integrations.map((integration, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-sm">{integration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Alternative Tools */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Alternative Tools</CardTitle>
            <CardDescription>Similar tools in the {tool.category} category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {alternativeTools.map((altTool) => (
                <Card key={altTool.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <img 
                        src={altTool.logo} 
                        alt={altTool.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{altTool.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{altTool.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({altTool.reviewCount})</span>
                          <Badge variant="outline" className="text-xs">{altTool.pricing}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{altTool.description}</p>
                    <Button size="sm" variant="outline" className="w-full border-[#4628dd] text-[#4628dd] hover:bg-[#4628dd] hover:text-white">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ToolPage;
