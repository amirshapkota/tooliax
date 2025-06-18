
import { useState } from "react";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  return (
    <section className="relative -mt-8 z-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-8 shadow-2xl shadow-blue-900/10 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 text-sm font-medium mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Search
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              Find Your Perfect AI Tool
            </h2>
            <p className="text-slate-600">
              Search through 1000+ AI tools with intelligent filtering
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-300" />
              <Input
                placeholder="Search by tool name, features, or use case..."
                className="pl-12 h-14 border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-xl text-lg transition-all duration-300 hover:shadow-md focus:shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-56 h-14 border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-xl transition-all duration-300 hover:shadow-md">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="developers">AI for Developers</SelectItem>
                <SelectItem value="marketing">Marketing Tools</SelectItem>
                <SelectItem value="image-processing">Image Processing</SelectItem>
                <SelectItem value="nlp">Natural Language Processing</SelectItem>
                <SelectItem value="video">Video Processing</SelectItem>
                <SelectItem value="audio">Audio Processing</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              size="lg" 
              className="h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <div className="flex items-center text-sm text-slate-600 mr-3">
              <TrendingUp className="h-4 w-4 mr-1 text-blue-500" />
              Trending:
            </div>
            {["ChatGPT", "Midjourney", "GitHub Copilot", "Notion AI", "Claude"].map((tool, index) => (
              <Button 
                key={tool}
                variant="ghost" 
                size="sm" 
                className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tool}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
