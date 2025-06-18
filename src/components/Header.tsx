
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignIn = () => {
    navigate("/developer");
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center transition-all duration-300 hover:scale-105">
            <img 
              src="/images/logo.png" 
              alt="Tooliax"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-[#4628dd] font-medium transition-all duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4628dd] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/categories" 
              className="text-gray-600 hover:text-[#4628dd] font-medium transition-all duration-300 relative group"
            >
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4628dd] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/compare" 
              className="text-gray-600 hover:text-[#4628dd] font-medium transition-all duration-300 relative group"
            >
              Compare
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4628dd] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/developer" 
              className="text-gray-600 hover:text-[#4628dd] font-medium transition-all duration-300 relative group"
            >
              For Developers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4628dd] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search AI tools..."
                className="pl-10 w-80 border-gray-200 focus:border-[#4628dd] focus:ring-1 focus:ring-[#4628dd] transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button 
              onClick={handleSignIn}
              variant="outline" 
              className="border-[#4628dd] text-[#4628dd] hover:bg-[#4628dd] hover:text-white transition-all duration-300"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white animate-fade-in">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search AI tools..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-[#4628dd] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-600 hover:text-[#4628dd] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/compare" 
                className="text-gray-600 hover:text-[#4628dd] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Compare
              </Link>
              <Link 
                to="/developer" 
                className="text-gray-600 hover:text-[#4628dd] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                For Developers
              </Link>
              <Button 
                onClick={() => {
                  handleSignIn();
                  setIsMenuOpen(false);
                }}
                variant="outline" 
                className="w-full mt-4 border-[#4628dd] text-[#4628dd] hover:bg-[#4628dd] hover:text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
