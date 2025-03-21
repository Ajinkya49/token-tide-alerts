
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tight flex items-center gap-2 page-transition hover:text-accent"
        >
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-accent"
          >
            <path 
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M7.5 12C7.5 14.5 9.5 16.5 12 16.5C14.5 16.5 16.5 14.5 16.5 12C16.5 9.5 14.5 7.5 12 7.5"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M7.5 7.5H16.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">TokenTide</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all">Home</Link>
          <Link to="/" className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all">Airdrops</Link>
          <Link to="/" className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all">Calendar</Link>
          <Link to="/" className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all">Portfolio</Link>
        </div>
        
        <button className="hidden md:flex items-center justify-center px-4 py-2 bg-gradient-to-r from-accent to-purple-400 hover:opacity-90 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-4 h-4 mr-2"
          >
            <path d="M20 4v16H4V4h16z" />
            <path d="M4 4v4h16V4" />
            <path d="M4 12h16" />
            <path d="M10 8v8" />
          </svg>
          <span className="text-sm font-medium">Connect Wallet</span>
        </button>
        
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="px-6 py-6 space-y-4">
          <Link to="/" className="block py-2 text-base font-medium hover:text-accent">Home</Link>
          <Link to="/" className="block py-2 text-base font-medium hover:text-accent">Airdrops</Link>
          <Link to="/" className="block py-2 text-base font-medium hover:text-accent">Calendar</Link>
          <Link to="/" className="block py-2 text-base font-medium hover:text-accent">Portfolio</Link>
          
          <button className="flex w-full items-center justify-center px-4 py-2 mt-4 bg-gradient-to-r from-accent to-purple-400 hover:opacity-90 text-white rounded-lg transition-all duration-200">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 mr-2"
            >
              <path d="M20 4v16H4V4h16z" />
              <path d="M4 4v4h16V4" />
              <path d="M4 12h16" />
              <path d="M10 8v8" />
            </svg>
            <span className="text-sm font-medium">Connect Wallet</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
