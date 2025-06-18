
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Megaphone, Image, MessageSquare, Video, Music, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "AI for Developers",
    slug: "developers",
    description: "Code assistance, debugging, and development tools",
    icon: Code,
    toolCount: 127,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    name: "Marketing Tools",
    slug: "marketing", 
    description: "Content creation, SEO, and marketing automation",
    icon: Megaphone,
    toolCount: 89,
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-600"
  },
  {
    name: "Image Processing",
    slug: "image-processing",
    description: "Image generation, editing, and enhancement",
    icon: Image,
    toolCount: 156,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600"
  },
  {
    name: "Natural Language Processing",
    slug: "nlp",
    description: "Text analysis, translation, and conversation",
    icon: MessageSquare,
    toolCount: 203,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600"
  },
  {
    name: "Video Processing",
    slug: "video",
    description: "Video editing, generation, and analysis",
    icon: Video,
    toolCount: 74,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    textColor: "text-red-600"
  },
  {
    name: "Audio Processing",
    slug: "audio",
    description: "Speech synthesis, music generation, and audio editing",
    icon: Music,
    toolCount: 45,
    color: "bg-yellow-500",
    lightColor: "bg-yellow-50",
    textColor: "text-yellow-600"
  }
];

export const PopularCategories = () => {
  return (
    <section className="py-20 relative">
      <div className="text-center mb-16 animate-fade-in-up">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 text-sm font-medium mb-4">
          <MessageSquare className="h-4 w-4 mr-2" />
          Explore by Category
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
          Popular Categories
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          Discover AI tools organized by category to find exactly what you need for your projects and workflows.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link 
              key={category.slug} 
              to={`/category/${category.slug}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="relative overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-3 h-full border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-2xl ${category.lightColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${category.textColor}`} />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors duration-300 px-3 py-1 rounded-full"
                    >
                      {category.toolCount} tools
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                    Explore Category
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
