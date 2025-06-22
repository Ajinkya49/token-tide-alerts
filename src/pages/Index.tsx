
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import AirdropGrid from '../components/AirdropGrid';
import { mockAirdrops } from '../utils/mockData';
import { FilterOptions } from '../utils/types';
import { Button } from '@/components/ui/button';
import { Sparkles, Shield, Clock, Users, TrendingUp, Zap, Award, Globe } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    blockchain: 'All',
    status: 'All',
    type: 'All',
    requiresKYC: 'All',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  return (
    <div className="min-h-screen app-gradient">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Why Choose TokenTide?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                Built for Modern Crypto Enthusiasts
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Join thousands of crypto enthusiasts who trust us to find the most valuable airdrops
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Verified Projects</h3>
                <p className="text-slate-600 dark:text-slate-300">Every project is thoroughly vetted by our expert team to ensure legitimacy and security.</p>
              </div>

              <div className="feature-card animation-delay-200">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Real-Time Updates</h3>
                <p className="text-slate-600 dark:text-slate-300">Get instant notifications when new airdrops go live or when deadlines approach.</p>
              </div>

              <div className="feature-card animation-delay-400">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">High Success Rate</h3>
                <p className="text-slate-600 dark:text-slate-300">Our curated selection focuses on projects with strong fundamentals and funding.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Airdrops Section */}
        <section id="airdrops" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Latest Opportunities
              </div>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Trending Airdrops</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Discover and track the most promising crypto airdrops with detailed funding information
              </p>
            </div>
            
            {!isAuthenticated && (
              <div className="glass-card p-8 mb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="mb-6 lg:mb-0">
                    <h3 className="text-2xl font-bold gradient-text mb-3">🚀 Unlock Premium Features</h3>
                    <p className="text-slate-600 dark:text-slate-300 max-w-md text-lg">
                      Get exclusive access to premium airdrops, calendar sync, and personalized notifications.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300">
                      <Link to="/signup">
                        <Zap className="w-4 h-4 mr-2" />
                        Sign Up Free
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Filters filters={filters} setFilters={setFilters} />
          <AirdropGrid airdrops={mockAirdrops} filters={filters} />
        </section>
      </main>
      
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FFFFFF\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">TokenTide</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md text-lg">
                Your gateway to the most promising crypto airdrops. Stay ahead of the curve with curated opportunities.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'youtube'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 glass-card hover:bg-purple-600/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <div className="w-5 h-5 bg-current"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Product</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-purple-300 transition-colors">Airdrops</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Calendar</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-purple-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-300 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 mb-4 md:mb-0">
                © {new Date().getFullYear()} TokenTide. All rights reserved. Not financial advice. DYOR.
              </p>
              <div className="flex space-x-6 text-gray-300">
                <a href="#" className="hover:text-purple-300 transition-colors">Privacy</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Terms</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
