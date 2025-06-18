import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolSubmissionForm } from "@/components/ToolSubmissionForm";
import { BarChart3, Plus, Settings, TrendingUp, LogOut } from "lucide-react";

const DeveloperDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("developerAuth");
    navigate("/developer/auth");
  };

  // Mock data for developer's tools
  const developerTools = [
    {
      id: 1,
      name: "AI Code Assistant",
      category: "Developer Tools",
      status: "Approved",
      views: 1234,
      clicks: 89,
      rating: 4.5,
      reviews: 23
    },
    {
      id: 2,
      name: "Smart Analytics",
      category: "Analytics",
      status: "Under Review",
      views: 456,
      clicks: 12,
      rating: 0,
      reviews: 0
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Developer Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Submit your AI tools, track performance, and grow your user base
          </p>
        </div>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submit">Submit Tool</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{developerTools.length}</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,690</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">101</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5</div>
                <p className="text-xs text-muted-foreground">Based on 23 reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Tools List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Tools</CardTitle>
              <CardDescription>Manage and track your submitted AI tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {developerTools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{tool.name}</h3>
                      <p className="text-sm text-gray-600">{tool.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={tool.status === "Approved" ? "default" : "secondary"}>
                        {tool.status}
                      </Badge>
                      <div className="text-sm text-gray-600">
                        {tool.views} views • {tool.clicks} clicks
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submit">
          <Card>
            <CardHeader>
              <CardTitle>Submit a New AI Tool</CardTitle>
              <CardDescription>
                Share your AI tool with our community and help others discover amazing solutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ToolSubmissionForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Track your tools' performance and user engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
                <p className="text-sm text-gray-500 mt-2">
                  We're working on detailed analytics to help you understand your tool's performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your developer account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600">Settings panel coming soon...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Customize your notifications, profile, and tool submission preferences.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperDashboard;
