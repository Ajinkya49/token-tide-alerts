
import { useState, useEffect } from 'react';
import { FilterOptions, BlockchainType, AirdropStatus, AirdropType } from '../utils/types';
import { blockchains } from '../utils/mockData';

interface FiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    blockchain: 'All',
    status: 'All',
    type: 'All',
    requiresKYC: 'All',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: BlockchainType | AirdropStatus | AirdropType | boolean | 'All'
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={`relative w-full max-w-7xl mx-auto px-6 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="glass-card rounded-xl mb-8 overflow-hidden transition-all duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row justify-between items-center p-6">
          <h2 className="text-xl font-medium mb-4 md:mb-0">Filter Airdrops</h2>
          
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={filters.status as string}
                onChange={(e) => handleFilterChange('status', e.target.value as AirdropStatus | 'All')}
                className="glass-input px-4 py-2 pr-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent/40 min-w-[120px]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ended">Ended</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={filters.type as string}
                onChange={(e) => handleFilterChange('type', e.target.value as AirdropType | 'All')}
                className="glass-input px-4 py-2 pr-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent/40 min-w-[120px]"
              >
                <option value="All">All Types</option>
                <option value="Token">Token</option>
                <option value="NFT">NFT</option>
                <option value="Governance">Governance</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* KYC Filter */}
            <div className="relative">
              <select
                value={filters.requiresKYC as string}
                onChange={(e) => {
                  const value = e.target.value;
                  let boolValue: boolean | 'All' = 'All';
                  if (value === 'true') boolValue = true;
                  if (value === 'false') boolValue = false;
                  handleFilterChange('requiresKYC', boolValue);
                }}
                className="glass-input px-4 py-2 pr-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent/40 min-w-[120px]"
              >
                <option value="All">KYC: Any</option>
                <option value="true">KYC: Required</option>
                <option value="false">KYC: Not Required</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="glass-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 flex items-center space-x-1"
            >
              <span>Blockchains</span>
              <svg
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable blockchain filters */}
        <div
          className={`px-6 pb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className={`cursor-pointer rounded-lg px-3 py-2 text-center text-sm transition-colors ${
              filters.blockchain === 'All'
                ? 'bg-accent text-white'
                : 'glass-input hover:bg-accent/10'
            }`}
            onClick={() => handleFilterChange('blockchain', 'All')}
          >
            All Blockchains
          </div>

          {blockchains.map((blockchain) => (
            <div
              key={blockchain}
              className={`cursor-pointer rounded-lg px-3 py-2 text-center text-sm transition-colors ${
                filters.blockchain === blockchain
                  ? 'bg-accent text-white'
                  : 'glass-input hover:bg-accent/10'
              }`}
              onClick={() => handleFilterChange('blockchain', blockchain)}
            >
              {blockchain}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
