
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Mail } from "lucide-react";

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Passionate individuals working to revolutionize how you discover and integrate AI tools
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="max-w-md shadow-2xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-500">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">JD</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2">John Doe</h3>
              <p className="text-blue-600 font-semibold mb-4">Founder & CEO</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                AI enthusiast with 10+ years of experience in tech innovation. Passionate about making AI accessible to everyone through intuitive tools and platforms.
              </p>
              
              <div className="flex justify-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer transition-colors duration-300">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="p-3 bg-sky-100 rounded-full hover:bg-sky-200 cursor-pointer transition-colors duration-300">
                  <Twitter className="h-5 w-5 text-sky-600" />
                </div>
                <div className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer transition-colors duration-300">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-lg mb-6">
                We're always looking for talented individuals who share our passion for AI innovation
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
                View Open Positions
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;
