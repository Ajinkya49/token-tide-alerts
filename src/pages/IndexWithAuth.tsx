
import { useState } from 'react';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import AirdropGrid from '../components/AirdropGrid';
import { mockAirdrops } from '../utils/mockData';
import { FilterOptions } from '../utils/types';
import NavbarWithAuth from '../components/NavbarWithAuth';

const IndexWithAuth = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    blockchain: 'All',
    status: 'All',
    type: 'All',
    requiresKYC: 'All',
    investmentStatus: 'All'
  });

  return (
    <div className="min-h-screen bg-background">
      <NavbarWithAuth />
      <Hero />
      <Filters filters={filters} setFilters={setFilters} />
      <AirdropGrid airdrops={mockAirdrops} filters={filters} />
    </div>
  );
};

export default IndexWithAuth;
