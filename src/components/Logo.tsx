
import React from 'react';
import { Gem, Waves, CircleDollarSign } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = ""
}) => {
  return (
    <div className={`logo-shine relative w-8 h-8 flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/70 rounded-md"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <CircleDollarSign className="w-5 h-5 text-white" />
      </div>
      <div className="absolute bottom-0 w-full">
        <Waves className="w-full h-3 text-white/80" />
      </div>
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
        <Gem className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};

export default Logo;
