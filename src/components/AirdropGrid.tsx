
import { useState, useEffect, useRef } from 'react';
import AirdropCard from './AirdropCard';
import { Airdrop, FilterOptions } from '../utils/types';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface AirdropGridProps {
  airdrops: Airdrop[];
  filters: FilterOptions;
}

const AirdropGrid: React.FC<AirdropGridProps> = ({ airdrops, filters }) => {
  const [filteredAirdrops, setFilteredAirdrops] = useState<Airdrop[]>(airdrops);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchResults = airdrops.filter(airdrop => {
      // Search functionality
      if (searchTerm && !airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !airdrop.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !airdrop.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

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

      // Filter by investment status
      if (filters.investmentStatus && filters.investmentStatus !== 'All' && 
          airdrop.investmentStatus !== filters.investmentStatus) {
        return false;
      }

      return true;
    });

    setFilteredAirdrops(searchResults);
    // Reset visible count when filters change
    setVisibleCount(6);
  }, [airdrops, filters, searchTerm]);

  // Implement infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredAirdrops.length) {
          // Load more items when the target element is visible
          setVisibleCount(prev => Math.min(prev + 6, filteredAirdrops.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [visibleCount, filteredAirdrops.length]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-20">
      {/* Search bar */}
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search airdrops by name, symbol, or description..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
          <p className="text-muted-foreground">Try adjusting your filters or search terms to see more results.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {Math.min(visibleCount, filteredAirdrops.length)} of {filteredAirdrops.length} results
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAirdrops.slice(0, visibleCount).map((airdrop, index) => (
              <div 
                key={airdrop.id} 
                className="transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AirdropCard airdrop={airdrop} />
              </div>
            ))}
          </div>

          {/* Invisible element for intersection observer */}
          {visibleCount < filteredAirdrops.length && (
            <div ref={observerTarget} className="h-10 w-full" />
          )}
        </>
      )}
    </div>
  );
};

export default AirdropGrid;
