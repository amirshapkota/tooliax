
import { useState } from "react";
import { Star, CheckCircle, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PromotionalBanner } from "@/components/PromotionalBanner";

const ComparePage = () => {
  const [compareTools, setCompareTools] = useState([
    {
      id: "1",
      name: "ChatGPT",
      description: "Advanced AI chatbot for conversations and content creation",
      category: "Natural Language Processing",
      rating: 4.8,
      reviewCount: 1234,
      pricing: "Freemium",
      logo: "/placeholder.svg",
      features: ["Natural Language Processing", "Code Generation", "Creative Writing", "Translation", "Q&A Support"],
      pricing_plans: [
        { name: "Free", price: "$0/month", features: ["Limited usage", "GPT-3.5", "Basic support"] },
        { name: "Plus", price: "$20/month", features: ["Unlimited usage", "GPT-4", "Priority support", "Plugin access"] }
      ],
      useCases: ["Content Creation", "Customer Support", "Education", "Programming"],
      integrations: ["API", "Slack", "Microsoft Teams", "Zapier"],
      supportedLanguages: ["English", "Spanish", "French", "German", "Chinese"],
      apiAvailable: "Yes",
      freeTrialDuration: "Free tier available",
      website: "https://chat.openai.com"
    },
    {
      id: "2", 
      name: "Claude",
      description: "AI assistant focused on being helpful, harmless, and honest",
      category: "Natural Language Processing",
      rating: 4.7,
      reviewCount: 856,
      pricing: "Freemium",
      logo: "/placeholder.svg",
      features: ["Natural Language Processing", "Code Analysis", "Document Processing", "Safety Focus", "Long Context"],
      pricing_plans: [
        { name: "Free", price: "$0/month", features: ["Limited usage", "Claude Instant", "Basic support"] },
        { name: "Pro", price: "$20/month", features: ["Unlimited usage", "Claude 2", "Priority access", "Higher limits"] }
      ],
      useCases: ["Research", "Writing", "Analysis", "Coding"],
      integrations: ["API", "Slack", "Web Interface"],
      supportedLanguages: ["English", "Spanish", "French", "German"],
      apiAvailable: "Yes",
      freeTrialDuration: "Free tier available",
      website: "https://claude.ai"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const availableTools = [
    {
      id: "3",
      name: "Bard",
      description: "Google's conversational AI service",
      category: "Natural Language Processing",
      rating: 4.5,
      reviewCount: 642,
      pricing: "Free",
      logo: "/placeholder.svg",
      features: ["Natural Language Processing", "Web Search Integration", "Real-time Information"],
      pricing_plans: [
        { name: "Free", price: "$0/month", features: ["Unlimited usage", "Real-time info", "Web integration"] }
      ],
      useCases: ["Research", "Q&A", "Creative Writing"],
      integrations: ["Google Workspace", "Web Interface"],
      supportedLanguages: ["English", "Japanese", "Korean"],
      apiAvailable: "Limited",
      freeTrialDuration: "Free to use",
      website: "https://bard.google.com"
    },
    {
      id: "4",
      name: "Midjourney",
      description: "AI-powered image generation tool",
      category: "Image Generation",
      rating: 4.7,
      reviewCount: 1520,
      pricing: "Paid",
      logo: "/placeholder.svg",
      features: ["Image Generation", "Art Creation", "Style Transfer", "High Resolution Output"],
      pricing_plans: [
        { name: "Basic", price: "$10/month", features: ["200 images/month", "General commercial use", "Member gallery"] },
        { name: "Standard", price: "$30/month", features: ["Unlimited images", "Stealth mode", "Priority queue"] }
      ],
      useCases: ["Art", "Design", "Marketing", "Concept Art"],
      integrations: ["Discord", "API"],
      supportedLanguages: ["English"],
      apiAvailable: "Yes",
      freeTrialDuration: "Limited free generations",
      website: "https://midjourney.com"
    },
    {
      id: "5",
      name: "GitHub Copilot",
      description: "AI pair programmer for code completion",
      category: "Developer Tools",
      rating: 4.6,
      reviewCount: 890,
      pricing: "Paid",
      logo: "/placeholder.svg",
      features: ["Code Completion", "AI Pair Programming", "Multi-language Support", "Context Awareness"],
      pricing_plans: [
        { name: "Individual", price: "$10/month", features: ["AI code completion", "Chat support", "CLI assistance"] },
        { name: "Business", price: "$19/month", features: ["Everything in Individual", "Policy management", "Audit logs"] }
      ],
      useCases: ["Coding", "Development", "Code Review", "Learning"],
      integrations: ["VS Code", "GitHub", "JetBrains", "Neovim"],
      supportedLanguages: ["Python", "JavaScript", "Java", "C++", "Go", "Rust"],
      apiAvailable: "No",
      freeTrialDuration: "30 days",
      website: "https://github.com/features/copilot"
    }
  ];

  const contentBannerContent = {
    title: "🔍 Compare AI Tools Side by Side",
    description: "Make informed decisions by comparing features, pricing, and user reviews of top AI tools.",
    ctaText: "View All Tools",
    ctaLink: "/category/all",
    backgroundColor: "#6e3ce7",
    textColor: "white"
  };

  const addToolToCompare = (tool: any) => {
    if (compareTools.length < 3 && !compareTools.find(t => t.id === tool.id)) {
      setCompareTools([...compareTools, tool]);
    }
  };

  const removeToolFromCompare = (toolId: string) => {
    setCompareTools(compareTools.filter(t => t.id !== toolId));
  };

  const filteredAvailableTools = availableTools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !compareTools.find(t => t.id === tool.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Compare AI Tools
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compare features, pricing, and capabilities of different AI tools to find the best fit for your needs
        </p>
      </div>

      {/* Promotional Banner */}
      <PromotionalBanner 
        type="content" 
        content={contentBannerContent}
      />

      {/* Add Tools Section */}
      {compareTools.length < 3 && (
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Add Tools to Compare</CardTitle>
            <CardDescription>You can compare up to 3 tools at once</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search for tools to add..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAvailableTools.slice(0, 6).map((tool) => (
                <div key={tool.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToolToCompare(tool)}
                    className="w-full bg-[#4628dd] hover:bg-[#6e3ce7]"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Compare
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Comparison Table */}
      {compareTools.length > 0 && (
        <div className="overflow-x-auto">
          <Card className="shadow-lg border-0 min-w-[1000px]">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {compareTools.map((tool, index) => (
                  <div key={tool.id} className={`p-6 ${index < compareTools.length - 1 ? 'border-r border-gray-200' : ''} flex flex-col h-full`}>
                    {/* Tool Header - Fixed Height */}
                    <div className="text-center mb-6 min-h-[200px] flex flex-col justify-center">
                      <div className="relative">
                        <img src={tool.logo} alt={tool.name} className="w-16 h-16 rounded-xl mx-auto mb-4" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeToolFromCompare(tool.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{tool.rating}</span>
                        </div>
                        <span className="text-gray-500 text-sm">({tool.reviewCount})</span>
                      </div>
                      <Badge variant="outline" className="mb-4">{tool.pricing}</Badge>
                    </div>

                    {/* Features - Fixed Height */}
                    <div className="mb-6 min-h-[180px]">
                      <h4 className="font-semibold mb-3 text-[#4628dd]">Key Features</h4>
                      <ul className="space-y-2">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Use Cases - Fixed Height */}
                    <div className="mb-6 min-h-[120px]">
                      <h4 className="font-semibold mb-3 text-[#4628dd]">Use Cases</h4>
                      <div className="flex flex-wrap gap-2">
                        {tool.useCases.map((useCase, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Integrations - Fixed Height */}
                    <div className="mb-6 min-h-[120px]">
                      <h4 className="font-semibold mb-3 text-[#4628dd]">Integrations</h4>
                      <div className="flex flex-wrap gap-2">
                        {tool.integrations.map((integration, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Technical Details - Fixed Height */}
                    <div className="mb-6 min-h-[120px]">
                      <h4 className="font-semibold mb-3 text-[#4628dd]">Technical Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">API Available:</span>
                          <span className="font-medium">{tool.apiAvailable}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Free Trial:</span>
                          <span className="font-medium">{tool.freeTrialDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Languages:</span>
                          <span className="font-medium">{tool.supportedLanguages.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Plans - Fixed Height */}
                    <div className="mb-6 min-h-[240px]">
                      <h4 className="font-semibold mb-3 text-[#4628dd]">Pricing Plans</h4>
                      <div className="space-y-3">
                        {tool.pricing_plans?.map((plan, idx) => (
                          <div key={idx} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{plan.name}</span>
                              <span className="text-[#4628dd] font-bold">{plan.price}</span>
                            </div>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {plan.features.map((feature, fidx) => (
                                <li key={fidx}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA - Fixed at bottom */}
                    <div className="mt-auto">
                      <Button className="w-full bg-gradient-to-r from-[#4628dd] to-[#6e3ce7] hover:opacity-90">
                        Visit {tool.name}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {compareTools.length === 0 && (
        <Card className="shadow-lg border-0">
          <CardContent className="pt-6 text-center py-12">
            <p className="text-gray-600 text-lg">No tools selected for comparison.</p>
            <p className="text-gray-500 mt-2">Search and add tools above to start comparing.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComparePage;
