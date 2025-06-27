
import { useState, useEffect, useMemo } from 'react';
import AirdropCard from './AirdropCard';
import AirdropSkeleton from './AirdropSkeleton';
import { Airdrop, FilterOptions } from '../utils/types';

interface AirdropGridProps {
  airdrops: Airdrop[];
  filters: FilterOptions;
  isLoading?: boolean;
}

const AirdropGrid: React.FC<AirdropGridProps> = ({ airdrops, filters, isLoading = false }) => {
  const [visibleCount, setVisibleCount] = useState(9);

  // Sort and filter airdrops
  const filteredAndSortedAirdrops = useMemo(() => {
    let filtered = [...airdrops];
    
    // Apply filters
    filtered = filtered.filter(airdrop => {
      if (filters.blockchain !== 'All' && airdrop.blockchain !== filters.blockchain) {
        return false;
      }
      if (filters.status !== 'All' && airdrop.status !== filters.status) {
        return false;
      }
      if (filters.type !== 'All' && airdrop.type !== filters.type) {
        return false;
      }
      if (filters.requiresKYC !== 'All' && airdrop.requiresKYC !== filters.requiresKYC) {
        return false;
      }
      if (filters.showBookmarked && !airdrop.isBookmarked) {
        return false;
      }
      
      if (filters.fundingRange && filters.fundingRange !== 'All') {
        const fundingStr = airdrop.fundingAmount || '0';
        const fundingAmount = parseInt(fundingStr.replace(/[^0-9]/g, '')) || 0;
        
        switch (filters.fundingRange) {
          case 'Under $50M':
            if (fundingAmount >= 50) return false;
            break;
          case '$50M-$100M':
            if (fundingAmount < 50 || fundingAmount > 100) return false;
            break;
          case '$100M-$200M':
            if (fundingAmount < 100 || fundingAmount > 200) return false;
            break;
          case 'Over $200M':
            if (fundingAmount <= 200) return false;
            break;
        }
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          airdrop.name.toLowerCase().includes(query) ||
          airdrop.description.toLowerCase().includes(query) ||
          airdrop.tokenSymbol.toLowerCase().includes(query) ||
          (airdrop.fundingRound && airdrop.fundingRound.toLowerCase().includes(query))
        );
      }

      return true;
    });

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
          case 'oldest':
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          case 'funding-high':
            const aFunding = parseInt(a.fundingAmount?.replace(/[^0-9]/g, '') || '0');
            const bFunding = parseInt(b.fundingAmount?.replace(/[^0-9]/g, '') || '0');
            return bFunding - aFunding;
          case 'funding-low':
            const aFundingLow = parseInt(a.fundingAmount?.replace(/[^0-9]/g, '') || '0');
            const bFundingLow = parseInt(b.fundingAmount?.replace(/[^0-9]/g, '') || '0');
            return aFundingLow - bFundingLow;
          case 'deadline-soon':
            return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          case 'deadline-far':
            return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [airdrops, filters]);

  useEffect(() => {
    setVisibleCount(9);
  }, [filters]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, filteredAndSortedAirdrops.length));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        visibleCount < filteredAndSortedAirdrops.length
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, filteredAndSortedAirdrops.length]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <AirdropSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-20">
      {filteredAndSortedAirdrops.length === 0 ? (
        <div className="text-center py-16 card-gradient rounded-lg">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50"
          >
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          <h3 className="text-xl font-medium mb-2">No airdrops found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min(visibleCount, filteredAndSortedAirdrops.length)} of {filteredAndSortedAirdrops.length} airdrops
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedAirdrops.slice(0, visibleCount).map((airdrop, index) => (
              <div 
                key={airdrop.id} 
                className="airdrop-card animate-fade-in"
                style={{ animationDelay: `${index % 9 * 100}ms` }}
              >
                <AirdropCard airdrop={airdrop} />
              </div>
            ))}
          </div>

          {visibleCount < filteredAndSortedAirdrops.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMore}
                className="px-6 py-2 border border-border bg-card/50 hover:bg-card text-accent rounded-lg transition-all duration-200 hover:scale-105"
              >
                Load More Airdrops ({filteredAndSortedAirdrops.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AirdropGrid;
