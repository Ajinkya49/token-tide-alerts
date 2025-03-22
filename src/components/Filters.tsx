
import { useState } from 'react';
import { blockchains } from '../utils/mockData';
import { AirdropStatus, AirdropType, FilterOptions, FundingRange } from '../utils/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBlockchainChange = (blockchain: string) => {
    setFilters(prev => ({ ...prev, blockchain: blockchain as FilterOptions['blockchain'] }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({ ...prev, status: status as FilterOptions['status'] }));
  };

  const handleTypeChange = (type: string) => {
    setFilters(prev => ({ ...prev, type: type as FilterOptions['type'] }));
  };

  const handleKYCChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      requiresKYC: value === 'yes' 
        ? true 
        : value === 'no' 
          ? false 
          : 'All' 
    }));
  };

  const handleFundingRangeChange = (range: string) => {
    setFilters(prev => ({ ...prev, fundingRange: range as FundingRange }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mb-8">
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h3 className="text-lg font-medium">Filter Airdrops</h3>
          
          <div className="w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Search airdrops..."
              className="glass-input"
              value={filters.searchQuery || ''}
              onChange={handleSearchChange}
            />
          </div>
          
          <button
            onClick={toggleExpanded}
            className="flex items-center text-sm font-medium text-accent hover:text-accent/90 transition-colors"
          >
            {isExpanded ? 'Hide Filters' : 'Show All Filters'}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`ml-1 w-4 h-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <Label className="mb-2 block">Blockchain</Label>
            <select
              className="w-full p-2 rounded-md border border-input bg-background"
              value={filters.blockchain}
              onChange={(e) => handleBlockchainChange(e.target.value)}
            >
              <option value="All">All Blockchains</option>
              {blockchains.map((blockchain) => (
                <option key={blockchain} value={blockchain}>
                  {blockchain}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="mb-2 block">Status</Label>
            <select
              className="w-full p-2 rounded-md border border-input bg-background"
              value={filters.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ended">Ended</option>
            </select>
          </div>

          <div>
            <Label className="mb-2 block">Type</Label>
            <select
              className="w-full p-2 rounded-md border border-input bg-background"
              value={filters.type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Token">Token</option>
              <option value="NFT">NFT</option>
              <option value="Governance">Governance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <Label className="mb-2 block">Requires KYC</Label>
            <select
              className="w-full p-2 rounded-md border border-input bg-background"
              value={
                filters.requiresKYC === true
                  ? 'yes'
                  : filters.requiresKYC === false
                  ? 'no'
                  : 'all'
              }
              onChange={(e) => handleKYCChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          
          {isExpanded && (
            <div>
              <Label className="mb-2 block">Funding Range</Label>
              <select
                className="w-full p-2 rounded-md border border-input bg-background"
                value={filters.fundingRange || 'All'}
                onChange={(e) => handleFundingRangeChange(e.target.value)}
              >
                <option value="All">All Funding Ranges</option>
                <option value="Under $50M">Under $50M</option>
                <option value="$50M-$100M">$50M-$100M</option>
                <option value="$100M-$200M">$100M-$200M</option>
                <option value="Over $200M">Over $200M</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
