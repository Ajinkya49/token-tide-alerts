
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import AirdropGrid from '../components/AirdropGrid';
import { mockAirdrops } from '../utils/mockData';
import { FilterOptions } from '../utils/types';
import { Button } from '@/components/ui/button';
import { Sparkles, Shield, Clock, Users, TrendingUp, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose TokenTide?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of crypto enthusiasts who trust us to find the most valuable airdrops
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Projects</h3>
                <p className="text-gray-600">Every project is thoroughly vetted by our expert team to ensure legitimacy and security.</p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Updates</h3>
                <p className="text-gray-600">Get instant notifications when new airdrops go live or when deadlines approach.</p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">High Success Rate</h3>
                <p className="text-gray-600">Our curated selection focuses on projects with strong fundamentals and funding.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Airdrops Section */}
        <section id="airdrops" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Latest Opportunities
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trending Airdrops</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover and track the most promising crypto airdrops with detailed funding information
              </p>
            </div>
            
            {!isAuthenticated && (
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 mb-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
                  <div className="mb-6 lg:mb-0">
                    <h3 className="text-2xl font-bold mb-3">🚀 Unlock Premium Features</h3>
                    <p className="text-white/90 max-w-md text-lg">
                      Get exclusive access to premium airdrops, calendar sync, and personalized notifications.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg">
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
      
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">TokenTide</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-lg">
                Your gateway to the most promising crypto airdrops. Stay ahead of the curve with curated opportunities.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'youtube'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                    <div className="w-5 h-5 bg-current"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Airdrops</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Calendar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © {new Date().getFullYear()} TokenTide. All rights reserved. Not financial advice. DYOR.
              </p>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
