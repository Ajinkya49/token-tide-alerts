
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboard = location.pathname === '/dashboard';

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-xl">TokenTide</span>
        </Link>
        
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
        
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            isDashboard ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
              >
                Sign out
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                asChild
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            )
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
              >
                <Link to="/login">Sign in</Link>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                asChild
              >
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
