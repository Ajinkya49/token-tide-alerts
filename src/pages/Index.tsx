
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import AirdropGrid from '../components/AirdropGrid';
import Footer from '../components/Footer';
import { mockAirdrops } from '../utils/mockData';
import { FilterOptions } from '../utils/types';

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    blockchain: 'All',
    status: 'All',
    type: 'All',
    requiresKYC: 'All',
    investmentStatus: 'All'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      <main>
        <Hero />
        
        <section id="airdrops" className="py-10">
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Latest Airdrops
            </h2>
            <p className="text-center text-muted-foreground mt-2 mb-10 max-w-2xl mx-auto">
              Discover and track the most promising crypto airdrops, funding information, and participation details all in one place
            </p>
          </div>
          
          <Filters filters={filters} setFilters={setFilters} />
          <AirdropGrid airdrops={mockAirdrops} filters={filters} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
