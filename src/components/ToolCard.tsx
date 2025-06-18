
import { Star, ExternalLink, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  ratingCount: number;
  pricing: string;
  image: string;
  featured?: boolean;
}

interface ToolCardProps {
  tool: Tool;
  showCompareButton?: boolean;
}

export const ToolCard = ({ tool, showCompareButton = false }: ToolCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 transition-colors duration-300 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group relative bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col border border-slate-200 rounded-2xl overflow-hidden">
      {tool.featured && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          Featured
        </div>
      )}
      
      <CardHeader className="pb-4 relative">
        <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-4 overflow-hidden relative group/image">
          <img 
            src={tool.image} 
            alt={tool.name}
            className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="flex justify-between items-start mb-3">
          <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
            {tool.name}
          </CardTitle>
          <Badge 
            variant={tool.pricing === "Free" ? "secondary" : "outline"} 
            className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
              tool.pricing === "Free" 
                ? "bg-green-100 text-green-700 border-green-200" 
                : tool.pricing === "Freemium"
                ? "bg-blue-100 text-blue-700 border-blue-200"
                : "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {tool.pricing}
          </Badge>
        </div>
        
        <CardDescription className="text-slate-600 leading-relaxed line-clamp-2">
          {tool.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <Badge 
            variant="outline" 
            className="w-fit text-xs border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors duration-300"
          >
            {tool.category}
          </Badge>
          
          <div className="flex items-center space-x-3">
            <div className="flex">{renderStars(tool.rating)}</div>
            <span className="text-sm font-semibold text-slate-900">{tool.rating}</span>
            <span className="text-sm text-slate-500">({tool.ratingCount.toLocaleString()})</span>
            {tool.rating > 4.5 && (
              <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3 mr-1" />
                Top Rated
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button 
            asChild 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Link to={`/tool/${tool.id}`} className="flex items-center justify-center">
              View Details
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
          {showCompareButton && (
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-300 hover:border-blue-300 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Compare
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
