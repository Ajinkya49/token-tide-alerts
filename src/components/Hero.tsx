
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Zap, Globe, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm border border-white/20">
              <TrendingUp className="w-4 h-4" />
              <span>Trending in Crypto</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Discover the 
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
                Next Big
              </span>
              <span className="text-white">Airdrops</span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-lg leading-relaxed">
              Stay ahead of the curve with curated crypto airdrops. Get exclusive access to the most promising projects before they moon.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transform transition-all duration-300 hover:-translate-y-1 hover:scale-105" 
                asChild
              >
                <Link to="/signup">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full font-semibold text-lg transform transition-all duration-300 hover:-translate-y-1" 
                asChild
              >
                <a href="#airdrops">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Airdrops
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-white/60 text-sm">Active Airdrops</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$2.5M+</div>
                <div className="text-white/60 text-sm">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-white/60 text-sm">Happy Users</div>
              </div>
            </div>
          </div>
          
          {/* Visual Elements */}
          <div className="relative flex justify-center items-center opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
            <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
              {/* Central glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
              
              {/* Floating cards */}
              <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center rotate-12 animate-float hover:scale-110 transition-transform duration-300 shadow-2xl">
                <Award className="w-10 h-10 text-white" />
              </div>
              
              <div className="absolute bottom-12 right-12 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center -rotate-12 animate-float animation-delay-300 hover:scale-110 transition-transform duration-300 shadow-2xl">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
              
              <div className="absolute top-16 right-8 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center rotate-45 animate-float animation-delay-500 hover:scale-110 transition-transform duration-300 shadow-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute bottom-16 left-12 w-18 h-18 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center -rotate-12 animate-float animation-delay-400 hover:scale-110 transition-transform duration-300 shadow-2xl p-4">
                <Globe className="w-10 h-10 text-white" />
              </div>

              {/* Center piece */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                <div className="text-4xl">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-auto">
          <path fill="#f8fafc" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
