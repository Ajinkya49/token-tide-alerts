
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Moon, Sun, Search } from "lucide-react";
import Logo from './Logo';

interface NavbarProps {
  onSearchChange?: (value: string) => void;
  searchQuery?: string;
}

const Navbar = ({ onSearchChange, searchQuery = '' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);

    // Check dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = darkModePreference ? darkModePreference === 'true' : prefersDark;
    
    setIsDarkMode(initialDarkMode);
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    }

    // Handle scroll for navbar styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    toast({
      title: newMode ? "Dark mode enabled" : "Light mode enabled",
      duration: 1500,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    window.location.href = '/login';
  };

  const isDashboard = location.pathname === '/dashboard';
  const isHomePage = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-xl text-left hidden sm:inline">AJINKYA CRYPTO AIRDROP ALERTS</span>
          <span className="font-bold text-xl text-left sm:hidden">ACAA</span>
        </Link>
        
        {isHomePage && (
          <div className={`relative transition-all duration-300 ${showSearch ? 'w-full md:w-1/3 mx-4' : 'w-10'}`}>
            {showSearch ? (
              <Input
                type="text"
                placeholder="Search airdrops..."
                className="glass-input"
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                onBlur={() => !searchQuery && setShowSearch(false)}
              />
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearch(true)}
                className="hover:bg-accent/10"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
              Home
            </Link>
            <a href="#airdrops" className="text-sm font-medium hover:text-accent transition-colors">
              Airdrops
            </a>
            <a href="#" className="text-sm font-medium hover:text-accent transition-colors">
              Learn
            </a>
            <a href="#" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </a>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="hover:bg-accent/10"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              isDashboard ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Sign out
                </Button>
              ) : (
                <Button variant="default" size="sm" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              )
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
