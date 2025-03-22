
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Search } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthProvider';
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboard = location.pathname === '/dashboard';

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-xl text-left">AJINKYA CRYPTO AIRDROP ALERTS</span>
        </Link>
        
        <div className="flex-1 mx-4 hidden md:block">
          {isSearchOpen ? (
            <div className="max-w-md mx-auto">
              <Input 
                type="search" 
                placeholder="Search airdrops..." 
                className="w-full"
                autoFocus
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
              />
            </div>
          ) : (
            <nav className="flex items-center justify-center space-x-6">
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
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:inline-flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="md:inline-flex">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {user ? (
            isDashboard ? (
              <Button variant="outline" size="sm" onClick={logout}>
                Sign out
              </Button>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            )
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
