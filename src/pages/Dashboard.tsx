import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import AirdropGrid from '../components/AirdropGrid';
import { FilterOptions } from '../utils/types';
import { mockAirdrops } from '../utils/mockData';
import { useNotifications } from '../components/NotificationProvider';
import AirdropCardCalendar from '../components/AirdropCardCalendar';

const Dashboard = () => {
  const [user, setUser] = useState<{email: string} | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    blockchain: 'All',
    status: 'All',
    type: 'All',
    requiresKYC: 'All',
    sortBy: 'newest',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [seenAirdrops, setSeenAirdrops] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('seenAirdrops');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Generate search suggestions from airdrop data
  const searchSuggestions = useMemo(() => {
    const suggestions = new Set<string>();
    mockAirdrops.forEach(airdrop => {
      suggestions.add(airdrop.name);
      suggestions.add(airdrop.tokenSymbol);
      suggestions.add(airdrop.blockchain);
      if (airdrop.fundingRound) suggestions.add(airdrop.fundingRound);
    });
    return Array.from(suggestions);
  }, []);

  const handleBookmarkToggle = (airdropId: string) => {
    // Update local storage or backend
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedAirdrops') || '[]');
    const isBookmarked = bookmarks.includes(airdropId);
    
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== airdropId);
      localStorage.setItem('bookmarkedAirdrops', JSON.stringify(updated));
      toast({
        title: "Bookmark removed",
        description: "Airdrop removed from your bookmarks.",
      });
    } else {
      bookmarks.push(airdropId);
      localStorage.setItem('bookmarkedAirdrops', JSON.stringify(bookmarks));
      toast({
        title: "Bookmark added",
        description: "Airdrop added to your bookmarks.",
      });
    }
  };

  const handleProgressUpdate = (airdropId: string, progress: 'not-started' | 'in-progress' | 'completed') => {
    // Update local storage or backend
    const progressData = JSON.parse(localStorage.getItem('airdropProgress') || '{}');
    progressData[airdropId] = progress;
    localStorage.setItem('airdropProgress', JSON.stringify(progressData));
    
    toast({
      title: "Progress updated",
      description: `Airdrop marked as ${progress.replace('-', ' ')}.`,
    });
  };

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Check for new airdrops and send notifications
  useEffect(() => {
    const checkForNewAirdrops = () => {
      const newAirdrops = mockAirdrops.filter(airdrop => !seenAirdrops.has(airdrop.id));
      
      if (newAirdrops.length > 0) {
        const updatedSeenAirdrops = new Set(seenAirdrops);
        newAirdrops.forEach(airdrop => {
          updatedSeenAirdrops.add(airdrop.id);
          
          addNotification({
            title: `New Airdrop: ${airdrop.name}`,
            message: `A new ${airdrop.blockchain} ${airdrop.type} airdrop is available!`,
            airdropId: airdrop.id
          });
        });
        
        setSeenAirdrops(updatedSeenAirdrops);
        localStorage.setItem('seenAirdrops', JSON.stringify([...updatedSeenAirdrops]));
        
        if (newAirdrops.length === 1) {
          toast({
            title: "New Airdrop Available",
            description: `${newAirdrops[0].name} has been added to the list.`,
          });
        } else {
          toast({
            title: "New Airdrops Available",
            description: `${newAirdrops.length} new airdrops have been added to the list.`,
          });
        }
      }
    };
    
    checkForNewAirdrops();
    const interval = setInterval(checkForNewAirdrops, 60000);
    return () => clearInterval(interval);
  }, [seenAirdrops, addNotification, toast]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background app-gradient">
      <Navbar />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        
        <Hero />
        
        <section id="airdrops" className="py-10">
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <h2 className="text-3xl font-bold text-center">Latest Airdrops</h2>
            <p className="text-center text-muted-foreground mt-2 mb-10">
              Discover and track the most promising crypto airdrops
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Upcoming Airdrops</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAirdrops
                  .filter(airdrop => airdrop.status === 'Upcoming')
                  .slice(0, 3)
                  .map(airdrop => (
                    <div key={airdrop.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-card/70 transition-all duration-200 hover:scale-105">
                      <div className="flex items-center gap-3">
                        <img src={airdrop.logo} alt={airdrop.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <h4 className="font-medium">{airdrop.name}</h4>
                          <p className="text-sm text-muted-foreground">{airdrop.tokenSymbol}</p>
                        </div>
                      </div>
                      <AirdropCardCalendar airdrop={airdrop} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
          <Filters 
            filters={filters} 
            setFilters={setFilters} 
            suggestions={searchSuggestions}
          />
          <AirdropGrid 
            airdrops={mockAirdrops} 
            filters={filters} 
            isLoading={isLoading}
          />
        </section>
      </main>
      
      <footer className="bg-card py-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5 text-accent"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <span className="text-xl font-medium">TokenTide</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Stay ahead of the crypto curve
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} TokenTide. All rights reserved. 
              <span className="block sm:inline sm:ml-1">Not financial advice. DYOR.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
