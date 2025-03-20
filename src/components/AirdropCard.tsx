
import { useState } from 'react';
import { Airdrop } from '../utils/types';

interface AirdropCardProps {
  airdrop: Airdrop;
}

const AirdropCard: React.FC<AirdropCardProps> = ({ airdrop }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-500';
      case 'Upcoming':
        return 'bg-blue-500/10 text-blue-500';
      case 'Ended':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div 
      className="group relative flex flex-col h-full glass-card rounded-xl overflow-hidden transform transition-all duration-300 ease-in-out animate-scale-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background indicator line based on blockchain */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/50" />
      
      <div className="p-6 flex flex-col h-full">
        {/* Header with logo and status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {airdrop.logo ? (
              <div className="w-12 h-12 mr-3 rounded-full overflow-hidden bg-white/50 p-1 flex items-center justify-center shadow-sm">
                <img
                  src={airdrop.logo}
                  alt={`${airdrop.name} logo`}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://cryptologos.cc/logos/ethereum-eth-logo.png'; // Fallback image
                  }}
                />
              </div>
            ) : (
              <div className="w-12 h-12 mr-3 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-bold text-lg">{airdrop.name.charAt(0)}</span>
              </div>
            )}
            
            <div>
              <h3 className="font-semibold text-lg">{airdrop.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{airdrop.blockchain}</span>
                <span className="mx-1">•</span>
                <span>{airdrop.tokenSymbol}</span>
              </div>
            </div>
          </div>
          
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(airdrop.status)}`}>
            {airdrop.status}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {airdrop.description.length > 120 
            ? `${airdrop.description.substring(0, 120)}...` 
            : airdrop.description}
        </p>
        
        {/* Details */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div className="text-xs">
            <span className="block text-muted-foreground">Est. Value</span>
            <span className="font-medium">{airdrop.estimatedValue}</span>
          </div>
          
          <div className="text-xs">
            <span className="block text-muted-foreground">Type</span>
            <span className="font-medium">{airdrop.type}</span>
          </div>
          
          <div className="text-xs">
            <span className="block text-muted-foreground">Start Date</span>
            <span className="font-medium">{formatDate(airdrop.startDate)}</span>
          </div>
          
          <div className="text-xs">
            <span className="block text-muted-foreground">End Date</span>
            <span className="font-medium">{formatDate(airdrop.endDate)}</span>
          </div>
        </div>
        
        {/* Requirements */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {airdrop.requiresKYC && (
            <div className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 rounded text-xs font-medium">
              KYC
            </div>
          )}
          
          {airdrop.requiresTwitter && (
            <div className="px-2 py-0.5 bg-blue-400/10 text-blue-400 rounded text-xs font-medium">
              Twitter
            </div>
          )}
          
          {airdrop.requiresDiscord && (
            <div className="px-2 py-0.5 bg-indigo-400/10 text-indigo-400 rounded text-xs font-medium">
              Discord
            </div>
          )}
        </div>
        
        {/* Action button */}
        <a 
          href={airdrop.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-2 text-center bg-accent/10 hover:bg-accent/20 text-accent font-medium rounded-lg transition-colors duration-200 text-sm"
        >
          View Details
        </a>
      </div>
      
      {/* Hover overlay with steps */}
      <div className={`absolute inset-0 bg-card/95 backdrop-blur-sm p-6 transform transition-all duration-300 ease-out 
        ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <h3 className="font-semibold text-lg mb-3">How to Participate</h3>
        
        {airdrop.steps ? (
          <ol className="list-decimal list-inside space-y-2 text-sm mb-4">
            {airdrop.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            Visit the official website for detailed participation instructions.
          </p>
        )}
        
        <a 
          href={airdrop.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full py-2 text-center bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200 text-sm mt-auto"
        >
          Go to Official Site
        </a>
      </div>
    </div>
  );
};

export default AirdropCard;
