
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/images/logo.png" 
                alt="Tooliax"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Discover, compare, and find the best AI tools for your needs. 
              The ultimate directory for AI-powered solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/category/developers" className="hover:text-white transition-colors duration-300">AI for Developers</Link></li>
              <li><Link to="/category/marketing" className="hover:text-white transition-colors duration-300">Marketing Tools</Link></li>
              <li><Link to="/category/image-processing" className="hover:text-white transition-colors duration-300">Image Processing</Link></li>
              <li><Link to="/category/nlp" className="hover:text-white transition-colors duration-300">Natural Language Processing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">For Developers</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/developer" className="hover:text-white transition-colors duration-300">Submit Your Tool</Link></li>
              <li><Link to="/developer" className="hover:text-white transition-colors duration-300">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors duration-300">Team</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Tooliax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
