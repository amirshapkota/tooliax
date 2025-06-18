import { useState } from "react";
import { Check, X, Flag, Users, BarChart, Eye, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BannerCreationDialog from "@/components/BannerCreationDialog";

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [banners, setBanners] = useState([
    {
      id: "1",
      type: "top",
      title: "🚀 Special Offer: Get 50% off Premium AI Tools",
      description: "",
      ctaText: "Claim Now",
      ctaLink: "https://example.com/promotion",
      backgroundColor: "#4628dd",
      textColor: "white",
      isActive: true
    },
    {
      id: "2", 
      type: "content",
      title: "🎯 Boost Your Productivity with AI",
      description: "Join thousands of professionals using AI tools to streamline their workflow.",
      ctaText: "Get Started Free",
      ctaLink: "https://example.com/signup",
      backgroundColor: "#6e3ce7",
      textColor: "white",
      isActive: true
    }
  ]);

  const handleCreateBanner = (newBanner: any) => {
    setBanners([...banners, newBanner]);
  };

  // Mock data for pending tools with detailed information
  const pendingTools = [
    {
      id: "1",
      name: "New AI Tool",
      developer: "john@example.com",
      category: "NLP",
      submittedDate: "2024-01-20",
      description: "An innovative AI tool for natural language processing",
      features: ["Advanced NLP", "Multi-language support", "API integration"],
      useCases: ["Content analysis", "Sentiment analysis", "Text generation"],
      pricing: "Freemium",
      website: "https://newaitool.com",
      integrations: ["Slack", "Discord", "API"],
      supportedLanguages: ["English", "Spanish", "French"]
    },
    {
      id: "2",
      name: "Image Generator Pro",
      developer: "mary@example.com", 
      category: "Image Processing",
      submittedDate: "2024-01-19",
      description: "Advanced image generation with AI",
      features: ["High-res generation", "Style transfer", "Batch processing"],
      useCases: ["Marketing", "Design", "Art creation"],
      pricing: "Paid",
      website: "https://imagegenpro.com",
      integrations: ["Photoshop", "Figma", "API"],
      supportedLanguages: ["English"]
    }
  ];

  const developers = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      company: "AI Innovations Inc.",
      joinDate: "2024-01-15",
      toolsSubmitted: 3,
      toolsApproved: 2,
      status: "Active"
    },
    {
      id: "2",
      name: "Mary Johnson",
      email: "mary@example.com",
      company: "TechStart LLC",
      joinDate: "2024-01-10",
      toolsSubmitted: 5,
      toolsApproved: 4,
      status: "Active"
    }
  ];

  // Mock data for flagged reviews
  const flaggedReviews = [
    {
      id: "1",
      toolName: "ChatGPT",
      reviewer: "user@example.com",
      content: "This tool is terrible and doesn't work at all!",
      flagReason: "Inappropriate content",
      flaggedDate: "2024-01-21"
    }
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Admin Login</CardTitle>
            <CardDescription>Administrator access required</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
              <input 
                id="adminEmail" 
                type="email" 
                placeholder="admin@tooliax.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                id="adminPassword" 
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent transition-all duration-200"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-[#4628dd] to-[#6e3ce7] hover:opacity-90"
              onClick={() => setIsAdmin(true)}
            >
              Admin Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Flag className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{pendingTools.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
              <BarChart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">1,234</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Developers</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{developers.length}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
              <Flag className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{flaggedReviews.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending-tools" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white">
            <TabsTrigger value="pending-tools">Pending Tools</TabsTrigger>
            <TabsTrigger value="developers">Developers</TabsTrigger>
            <TabsTrigger value="flagged-reviews">Flagged Reviews</TabsTrigger>
            <TabsTrigger value="user-activity">User Activity</TabsTrigger>
            <TabsTrigger value="promotional-banners">Banners</TabsTrigger>
          </TabsList>

          <TabsContent value="pending-tools" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Tools Pending Approval</h2>
            {pendingTools.map((tool) => (
              <Card key={tool.id} className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-slate-800">{tool.name}</h3>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">{tool.category}</Badge>
                        <Badge variant="outline" className="bg-green-100 text-green-800">{tool.pricing}</Badge>
                      </div>
                      <p className="text-slate-600">{tool.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-slate-800">Submitted by:</span> {tool.developer}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Date:</span> {new Date(tool.submittedDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Website:</span> {tool.website}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{tool.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-slate-600">{tool.description}</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Features</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                  {tool.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Use Cases</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                  {tool.useCases.map((useCase, index) => (
                                    <li key={index}>{useCase}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Integrations</h4>
                              <div className="flex flex-wrap gap-2">
                                {tool.integrations.map((integration, index) => (
                                  <Badge key={index} variant="secondary">{integration}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="developers" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Registered Developers</h2>
            {developers.map((developer) => (
              <Card key={developer.id} className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-slate-800">{developer.name}</h3>
                        <Badge variant={developer.status === "Active" ? "default" : "secondary"}>
                          {developer.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-slate-800">Email:</span> {developer.email}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Company:</span> {developer.company}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Join Date:</span> {new Date(developer.joinDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Tools Submitted:</span> {developer.toolsSubmitted}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Tools Approved:</span> {developer.toolsApproved}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        <Eye className="h-4 w-4 mr-1" />
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" className="text-slate-600 border-slate-600 hover:bg-slate-50">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="flagged-reviews" className="space-y-4">
            <h2 className="text-xl font-semibold">Flagged Reviews</h2>
            {flaggedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{review.toolName}</h3>
                        <Badge variant="destructive">Flagged</Badge>
                      </div>
                      <p className="text-gray-600">"{review.content}"</p>
                      <div className="text-sm text-gray-500">
                        <p>By: {review.reviewer}</p>
                        <p>Reason: {review.flagReason}</p>
                        <p>Flagged: {new Date(review.flaggedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        Keep Review
                      </Button>
                      <Button size="sm" variant="destructive">
                        Remove Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="user-activity" className="space-y-4">
            <h2 className="text-xl font-semibold">User Activity Monitor</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  User activity monitoring features would be implemented here, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  <li>Recent user registrations</li>
                  <li>Rating patterns and potential manipulation</li>
                  <li>Tool submission frequency by developers</li>
                  <li>User engagement metrics</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotional-banners" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Promotional Banners</h2>
              <BannerCreationDialog onCreateBanner={handleCreateBanner} />
            </div>
            {banners.map((banner) => (
              <Card key={banner.id} className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-800">{banner.title}</h3>
                        <Badge variant={banner.type === "top" ? "default" : "secondary"}>
                          {banner.type === "top" ? "Top Banner" : "Content Banner"}
                        </Badge>
                        <Badge variant={banner.isActive ? "default" : "secondary"}>
                          {banner.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {banner.description && (
                        <p className="text-gray-600">{banner.description}</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-800">CTA:</span> {banner.ctaText}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">Link:</span> {banner.ctaLink}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">Background:</span> 
                          <span 
                            className="ml-2 inline-block w-4 h-4 rounded"
                            style={{ backgroundColor: banner.backgroundColor }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-gray-600 border-gray-600 hover:bg-gray-50">
                        {banner.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
