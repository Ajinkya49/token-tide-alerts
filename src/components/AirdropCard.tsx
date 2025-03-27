
import { Airdrop } from '../utils/types';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import CalendarButton from './CalendarButton';

interface AirdropCardProps {
  airdrop: Airdrop;
}

const AirdropCard: React.FC<AirdropCardProps> = ({ airdrop }) => {
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get status badge class
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Ended':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400';
    }
  };

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url?: string) => {
    if (!url) return null;
    
    // Handle various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="card-gradient rounded-xl overflow-hidden transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={airdrop.logo} 
              alt={`${airdrop.name} logo`} 
              className="w-10 h-10 rounded-full object-contain bg-white p-1"
            />
            <div>
              <h3 className="font-bold">{airdrop.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{airdrop.blockchain}</span>
                <span className="mx-1">•</span>
                <span>{airdrop.tokenSymbol}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(airdrop.status)}`}>
              {airdrop.status}
            </span>
            {(airdrop.status === 'Active' || airdrop.status === 'Upcoming') && (
              <CalendarButton airdrop={airdrop} />
            )}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {airdrop.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-secondary/50 rounded p-2">
            <div className="text-xs text-muted-foreground">Est. Value</div>
            <div className="font-medium">{airdrop.estimatedValue}</div>
          </div>
          <div className="bg-secondary/50 rounded p-2">
            <div className="text-xs text-muted-foreground">End Date</div>
            <div className="font-medium">{formatDate(airdrop.endDate)}</div>
          </div>
        </div>
        
        {airdrop.fundingAmount && (
          <div className="bg-accent/10 rounded p-2 mb-4">
            <div className="flex justify-between">
              <div className="text-xs text-accent">Funding</div>
              <div className="text-xs text-accent">{airdrop.fundingRound || 'Funding'}</div>
            </div>
            <div className="font-medium">{airdrop.fundingAmount}</div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {airdrop.type && (
            <span className="text-xs px-2 py-1 bg-secondary rounded-full">
              {airdrop.type}
            </span>
          )}
          {airdrop.requiresKYC && (
            <span className="text-xs px-2 py-1 bg-secondary rounded-full">
              KYC Required
            </span>
          )}
          {airdrop.requiresTwitter && (
            <span className="text-xs px-2 py-1 bg-secondary rounded-full">
              Twitter Required
            </span>
          )}
          {airdrop.requiresDiscord && (
            <span className="text-xs px-2 py-1 bg-secondary rounded-full">
              Discord Required
            </span>
          )}
        </div>
        
        {airdrop.steps && airdrop.steps.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">How to participate:</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              {airdrop.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
        
        {airdrop.videoUrl && getYoutubeVideoId(airdrop.videoUrl) && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Video Tutorial:</h4>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
              <iframe 
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(airdrop.videoUrl)}`}
                title={`${airdrop.name} tutorial video`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        
        <div className="flex justify-end items-center">          
          <Button asChild>
            <a href={airdrop.link} target="_blank" rel="noopener noreferrer">
              Participate
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-1.5 h-4 w-4"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AirdropCard;
