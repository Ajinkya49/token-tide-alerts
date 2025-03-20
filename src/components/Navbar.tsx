
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4 ${
        isScrolled 
          ? 'glass-card shadow-md backdrop-blur-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tight flex items-center gap-2 page-transition hover:text-accent"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6 text-accent animate-pulse-slow"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          <span>TokenTide</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium page-transition hover:text-accent">Home</Link>
          <Link to="/" className="text-sm font-medium page-transition hover:text-accent">Airdrops</Link>
          <Link to="/" className="text-sm font-medium page-transition hover:text-accent">Calendar</Link>
          <Link to="/" className="text-sm font-medium page-transition hover:text-accent">Portfolio</Link>
        </div>
        
        <button className="hidden md:flex items-center justify-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors duration-200">
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
        
        <button className="md:hidden">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6"
          >
            <path d="M4 12h16M4 6h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
