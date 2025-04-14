import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-gradient py-16 md:py-24 lg:py-32 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Discover the Next <span className="text-balance">Crypto Opportunities</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-md">
            Stay ahead with TokenTide's curated list of the most promising airdrops, complete with funding information provided by Ajinkya Kamble
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 text-primary transform transition-transform duration-300 hover:-translate-y-1" 
              asChild
            >
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white hover:bg-white/10 transform transition-transform duration-300 hover:-translate-y-1" 
              asChild
            >
              <a href="#airdrops">Explore Airdrops</a>
            </Button>
          </div>
        </div>
        
        <div className="relative flex justify-center opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] animate-float">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-full animate-pulse"></div>
            <div className="absolute top-20 left-16 w-16 h-16 glass-card rounded-lg flex items-center justify-center rotate-12 animate-float hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                <circle cx="12" cy="12" r="10" />
                <path d="m8 12 3 3 5-5" />
              </svg>
            </div>
            <div className="absolute bottom-20 right-16 w-20 h-20 glass-card rounded-lg flex items-center justify-center -rotate-12 animate-float animation-delay-300 hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="absolute top-10 right-24 w-14 h-14 glass-card rounded-lg flex items-center justify-center rotate-45 animate-float animation-delay-500 hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-white">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
              </svg>
            </div>
            <div className="absolute bottom-10 left-24 w-16 h-16 glass-card rounded-lg flex items-center justify-center -rotate-12 animate-float animation-delay-400 hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
