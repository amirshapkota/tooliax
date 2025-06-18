
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#4628dd]/10 to-[#6e3ce7]/10 rounded-full text-[#4628dd] text-sm font-medium mb-6 animate-pulse-slow border border-[#4628dd]/20">
            <Sparkles className="h-4 w-4 mr-2" />
            Discover Next-Gen AI Tools
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Find the Perfect
            <span className="block brand-gradient-text animate-gradient">
              AI Tools
            </span>
            <span className="block text-slate-700">for Your Workflow</span>
          </h1>
        </div>
        
        <div className="animate-fade-in-up animation-delay-200">
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover, compare, and integrate cutting-edge AI solutions that will transform 
            your productivity. From development to marketing, we've curated the best tools for you.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Button 
            size="lg" 
            asChild 
            className="group brand-gradient hover:opacity-90 text-white px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Link to="/category/all" className="flex items-center">
              Explore AI Tools
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="group border-2 border-[#4628dd] text-[#4628dd] hover:bg-[#4628dd] hover:text-white px-8 py-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <Link to="/developer" className="flex items-center">
              Submit Your Tool
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
