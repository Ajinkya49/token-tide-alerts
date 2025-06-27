import { useState, useEffect } from 'react';
import { blockchains } from '../utils/mockData';
import { AirdropStatus, AirdropType, FilterOptions, FundingRange, SortOption } from '../utils/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, ChevronDown, ArrowUpDown, Bookmark } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  suggestions?: string[];
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, suggestions = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'funding-high', label: 'Highest Funding' },
    { value: 'funding-low', label: 'Lowest Funding' },
    { value: 'deadline-soon', label: 'Ending Soon' },
    { value: 'deadline-far', label: 'Ending Later' },
  ];

  useEffect(() => {
    if (filters.searchQuery && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(filters.searchQuery!.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0 && filters.searchQuery.length > 1);
    } else {
      setShowSuggestions(false);
    }
  }, [filters.searchQuery, suggestions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFilters(prev => ({ ...prev, searchQuery: suggestion }));
    setShowSuggestions(false);
  };

  const handleSortChange = (sortBy: SortOption) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const toggleBookmarks = () => {
    setFilters(prev => ({ ...prev, showBookmarked: !prev.showBookmarked }));
  };

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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mb-8">
      <div className="glass-card rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/30 backdrop-blur-xl bg-white/90 dark:bg-slate-800/90">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">Filter Airdrops</h3>
          </div>
          
          <div className="w-full lg:w-1/2 max-w-md relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search for airdrops, projects, or tokens..."
              className="pl-12 h-12 bg-white/70 dark:bg-slate-700/70 border-slate-200/50 dark:border-slate-600/50 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300"
              value={filters.searchQuery || ''}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={filters.showBookmarked ? "default" : "outline"}
              size="sm"
              onClick={toggleBookmarks}
              className="flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Bookmarked
            </Button>
            
            <button
              onClick={toggleExpanded}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-200/50 dark:border-purple-700/50 rounded-xl text-purple-700 dark:text-purple-300 font-medium transition-all duration-300 hover:scale-105"
            >
              <Filter className="w-4 h-4" />
              {isExpanded ? 'Hide Filters' : 'More Filters'}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Sort By */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Sort By
            </Label>
            <select
              className="w-full h-12 px-4 rounded-xl border border-slate-200/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-medium shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 appearance-none cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/90"
              value={filters.sortBy || 'newest'}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Blockchain
            </Label>
            <select
              className="w-full h-12 px-4 rounded-xl border border-slate-200/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-medium shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 appearance-none cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/90"
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

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Status
            </Label>
            <select
              className="w-full h-12 px-4 rounded-xl border border-slate-200/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-medium shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 appearance-none cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/90"
              value={filters.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ended">Ended</option>
            </select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Type
            </Label>
            <select
              className="w-full h-12 px-4 rounded-xl border border-slate-200/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-medium shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 appearance-none cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/90"
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

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              KYC Required
            </Label>
            <select
              className="w-full h-12 px-4 rounded-xl border border-slate-200/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-medium shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 appearance-none cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/90"
              value={
                filters.requiresKYC === true
                  ? 'yes'
                  : filters.requiresKYC === false
                  ? 'no'
                  : 'all'
              }
              onChange={(e) => handleKYCChange(e.target.value)}
            >
              <option value="all">All Options</option>
              <option value="yes">KYC Required</option>
              <option value="no">No KYC</option>
            </select>
          </div>
          
          {isExpanded && (
            <div className="space-y-3 lg:col-span-2">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Funding Range
              </Label>
              <select
                className="w-full h-12 px-4 rounded-xl border border-slate-200/50 dark:border-slate-600/50 bg-white/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-medium shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 appearance-none cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/90"
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

        {isExpanded && (
          <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-600/50">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Advanced filters available</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Real-time filtering</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
