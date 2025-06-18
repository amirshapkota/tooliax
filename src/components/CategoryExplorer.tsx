
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Megaphone, Image, MessageSquare, Video, Music, Brain, Database, Shield, Zap, Palette, Bot } from "lucide-react";

const categories = [
  {
    name: "AI for Developers",
    slug: "developers",
    description: "Code assistance, debugging, and development tools",
    icon: Code,
    toolCount: 127,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    subcategories: ["Code Generation", "Debugging", "API Tools", "Testing", "Documentation"]
  },
  {
    name: "Marketing Tools",
    slug: "marketing", 
    description: "Content creation, SEO, and marketing automation",
    icon: Megaphone,
    toolCount: 89,
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-600",
    subcategories: ["SEO Tools", "Social Media", "Email Marketing", "Analytics", "Advertising"]
  },
  {
    name: "Image Processing",
    slug: "image-processing",
    description: "Image generation, editing, and enhancement",
    icon: Image,
    toolCount: 156,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
    subcategories: ["Image Generation", "Photo Editing", "Background Removal", "Style Transfer", "Upscaling"]
  },
  {
    name: "Natural Language Processing",
    slug: "nlp",
    description: "Text analysis, translation, and conversation",
    icon: MessageSquare,
    toolCount: 203,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600",
    subcategories: ["Chatbots", "Translation", "Text Analysis", "Writing Assistance", "Grammar Check"]
  },
  {
    name: "Video Processing",
    slug: "video",
    description: "Video editing, generation, and analysis",
    icon: Video,
    toolCount: 74,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    textColor: "text-red-600",
    subcategories: ["Video Editing", "Video Generation", "Motion Graphics", "Subtitles", "Compression"]
  },
  {
    name: "Audio Processing",
    slug: "audio",
    description: "Speech synthesis, music generation, and audio editing",
    icon: Music,
    toolCount: 45,
    color: "bg-yellow-500",
    lightColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    subcategories: ["Music Generation", "Voice Synthesis", "Audio Editing", "Transcription", "Sound Effects"]
  },
  {
    name: "Data & Analytics",
    slug: "data-analytics",
    description: "Data processing, visualization, and business intelligence",
    icon: Database,
    toolCount: 92,
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-600",
    subcategories: ["Data Visualization", "Business Intelligence", "Predictive Analytics", "Data Cleaning", "Reporting"]
  },
  {
    name: "Security & Privacy",
    slug: "security",
    description: "Cybersecurity, fraud detection, and privacy tools",
    icon: Shield,
    toolCount: 38,
    color: "bg-gray-500",
    lightColor: "bg-gray-50",
    textColor: "text-gray-600",
    subcategories: ["Fraud Detection", "Privacy Tools", "Security Audit", "Threat Intelligence", "Access Control"]
  },
  {
    name: "Productivity",
    slug: "productivity",
    description: "Workflow automation, task management, and efficiency tools",
    icon: Zap,
    toolCount: 164,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    subcategories: ["Task Management", "Automation", "Note Taking", "Calendar", "Project Management"]
  },
  {
    name: "Design & Creative",
    slug: "design",
    description: "Design tools, creative assistance, and artistic generation",
    icon: Palette,
    toolCount: 112,
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    textColor: "text-pink-600",
    subcategories: ["Logo Design", "UI/UX Design", "Graphic Design", "3D Modeling", "Animation"]
  },
  {
    name: "AI Assistants",
    slug: "assistants",
    description: "Virtual assistants, chatbots, and AI companions",
    icon: Bot,
    toolCount: 87,
    color: "bg-cyan-500",
    lightColor: "bg-cyan-50",
    textColor: "text-cyan-600",
    subcategories: ["Virtual Assistants", "Customer Support", "Personal AI", "Scheduling", "Research"]
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
    description: "ML models, training platforms, and AI development",
    icon: Brain,
    toolCount: 156,
    color: "bg-violet-500",
    lightColor: "bg-violet-50",
    textColor: "text-violet-600",
    subcategories: ["Model Training", "AutoML", "Computer Vision", "Deep Learning", "MLOps"]
  }
];

export const CategoryExplorer = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-16">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 text-sm font-medium mb-4">
            <Brain className="h-4 w-4 mr-2" />
            Explore by Category
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
            Find AI Tools by Category
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Browse through our comprehensive collection of AI tools organized by category to find exactly what you need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.slug} 
                to={`/category/${category.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className="relative overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 h-full border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="relative z-10 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-xl ${category.lightColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${category.textColor}`} />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors duration-300 px-2 py-1 rounded-full text-xs"
                      >
                        {category.toolCount}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-2 leading-tight">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-sm leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 pt-0">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="text-xs text-slate-500">+{category.subcategories.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
