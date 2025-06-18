
import { Users, Target, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            About Tooliax
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing how teams discover, compare, and integrate AI tools. Our platform connects 
            innovative AI solutions with the people who need them most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">10,000+</h3>
              <p className="text-slate-600">Active Users</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">500+</h3>
              <p className="text-slate-600">AI Tools Listed</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">98%</h3>
              <p className="text-slate-600">Satisfaction Rate</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-xl border-0 bg-white/70 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <div className="p-4 bg-orange-100 rounded-full w-fit mx-auto mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">50+</h3>
              <p className="text-slate-600">Countries</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              At Tooliax, we believe that the right AI tool can transform how you work, create, and innovate. 
              Our mission is to democratize access to AI technology by making it easier for everyone to discover 
              and implement the perfect tools for their unique needs.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We're building a comprehensive ecosystem where AI tool developers can showcase their innovations 
              and users can make informed decisions through detailed comparisons, genuine reviews, and expert insights.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-3"></div>
            <Card className="relative shadow-xl border-0 bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Why Choose Tooliax?</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Curated collection of premium AI tools
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    In-depth comparisons and reviews
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Expert recommendations and insights
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Direct integration support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
