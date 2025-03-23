
import React from 'react';
import { DollarSign, Waves, Gem } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = ""
}) => {
  return (
    <div className={`logo-shine relative w-8 h-8 flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Waves className="text-primary/60 w-8 h-8" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <DollarSign className="text-primary w-5 h-5" />
      </div>
      <div className="absolute -top-1 -right-1">
        <Gem className="text-accent w-3 h-3" />
      </div>
    </div>
  );
};

export default Logo;
