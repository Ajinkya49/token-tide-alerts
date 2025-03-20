
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5 z-0" />
      
      {/* Animated shapes */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl opacity-70 animate-float animation-delay-200 z-0" />
      <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-70 animate-float animation-delay-300 z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-3 py-1 mb-6 rounded-full text-xs font-medium bg-accent/10 text-accent animate-fade-in">
            Never miss an opportunity
          </div>
        </div>
        
        <h1 className={`text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 text-balance transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Discover and Track Crypto <span className="text-accent">Airdrops</span> in Real-Time
        </h1>
        
        <p className={`text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Stay ahead of the curve with TokenTide's comprehensive airdrop alerts, detailed analytics, and personalized tracking system.
        </p>
        
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button className="w-full sm:w-auto px-8 py-3 bg-accent text-white rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:bg-accent/90 transition-all duration-200">
            Explore Airdrops
          </button>
          
          <button className="w-full sm:w-auto px-8 py-3 border border-border bg-background/50 backdrop-blur-sm rounded-lg hover:bg-secondary/50 transition-all duration-200">
            Connect Wallet
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center animate-bounce animation-delay-500">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6 text-muted-foreground"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
          <span className="text-xs text-muted-foreground mt-2">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
