
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterOptions, BlockchainType, AirdropStatus, AirdropType, InvestmentStatus } from '../utils/types';
import { blockchains } from '../utils/mockData';

interface FiltersProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K]
  ) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="w-full bg-card/50 py-6 sticky top-16 z-10 backdrop-blur-sm border-b">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Explore Airdrops</h2>
              <p className="text-muted-foreground">Discover and track the latest crypto airdrops</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm font-medium text-accent hover:underline"
              >
                {isExpanded ? 'Hide Filters' : 'Show More Filters'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Blockchain Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Blockchain</label>
              <Tabs
                value={filters.blockchain}
                onValueChange={(value) => updateFilter('blockchain', value as BlockchainType | 'All')}
                className="w-full"
              >
                <TabsList className="w-full h-auto flex flex-wrap">
                  <TabsTrigger value="All" className="flex-1">All</TabsTrigger>
                  {blockchains.map((blockchain) => (
                    <TabsTrigger key={blockchain} value={blockchain} className="flex-1">
                      {blockchain}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Tabs
                value={filters.status}
                onValueChange={(value) => updateFilter('status', value as AirdropStatus | 'All')}
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="All" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="Active" className="flex-1">Active</TabsTrigger>
                  <TabsTrigger value="Upcoming" className="flex-1">Upcoming</TabsTrigger>
                  <TabsTrigger value="Ended" className="flex-1">Ended</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Tabs
                value={filters.type}
                onValueChange={(value) => updateFilter('type', value as AirdropType | 'All')}
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="All" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="Token" className="flex-1">Token</TabsTrigger>
                  <TabsTrigger value="NFT" className="flex-1">NFT</TabsTrigger>
                  <TabsTrigger value="Governance" className="flex-1">Governance</TabsTrigger>
                  <TabsTrigger value="Other" className="flex-1">Other</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* KYC Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">KYC Required</label>
              <Tabs
                value={filters.requiresKYC === true ? 'Yes' : filters.requiresKYC === false ? 'No' : 'All'}
                onValueChange={(value) => updateFilter('requiresKYC', value === 'All' ? 'All' : value === 'Yes')}
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="All" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="Yes" className="flex-1">Yes</TabsTrigger>
                  <TabsTrigger value="No" className="flex-1">No</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              {/* Investment Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Investment Status</label>
                <Tabs
                  value={filters.investmentStatus || 'All'}
                  onValueChange={(value) => updateFilter('investmentStatus', value as InvestmentStatus | 'All')}
                  className="w-full"
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="All" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="Free" className="flex-1">Free</TabsTrigger>
                    <TabsTrigger value="Invest" className="flex-1">Invest</TabsTrigger>
                    <TabsTrigger value="Undisclosed" className="flex-1">Undisclosed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Additional filters can be added here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
