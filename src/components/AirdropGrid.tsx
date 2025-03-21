
import { useState, useEffect } from 'react';
import AirdropCard from './AirdropCard';
import { Airdrop, FilterOptions } from '../utils/types';

interface AirdropGridProps {
  airdrops: Airdrop[];
  filters: FilterOptions;
}

const AirdropGrid: React.FC<AirdropGridProps> = ({ airdrops, filters }) => {
  const [filteredAirdrops, setFilteredAirdrops] = useState<Airdrop[]>(airdrops);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const filtered = airdrops.filter(airdrop => {
      // Filter by blockchain
      if (filters.blockchain !== 'All' && airdrop.blockchain !== filters.blockchain) {
        return false;
      }

      // Filter by status
      if (filters.status !== 'All' && airdrop.status !== filters.status) {
        return false;
      }

      // Filter by type
      if (filters.type !== 'All' && airdrop.type !== filters.type) {
        return false;
      }

      // Filter by KYC
      if (filters.requiresKYC !== 'All' && airdrop.requiresKYC !== filters.requiresKYC) {
        return false;
      }

      return true;
    });

    setFilteredAirdrops(filtered);
    // Reset visible count when filters change
    setVisibleCount(6);
  }, [airdrops, filters]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredAirdrops.length));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-20">
      {filteredAirdrops.length === 0 ? (
        <div className="text-center py-16">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAirdrops.slice(0, visibleCount).map((airdrop, index) => (
              <div 
                key={airdrop.id} 
                className={`transition-all duration-500 delay-${index * 100} animate-fade-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AirdropCard airdrop={airdrop} />
              </div>
            ))}
          </div>

          {visibleCount < filteredAirdrops.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMore}
                className="px-6 py-2 border border-border bg-card/50 hover:bg-card text-accent rounded-lg transition-all duration-200"
              >
                Load More Airdrops
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AirdropGrid;
