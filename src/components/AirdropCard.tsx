
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
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-700';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700';
      case 'Ended':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
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
    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={airdrop.logo} 
              alt={`${airdrop.name} logo`} 
              className="w-10 h-10 rounded-full object-contain bg-white p-1 shadow-sm"
            />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">{airdrop.name}</h3>
              <div className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                <span>{airdrop.blockchain}</span>
                <span className="mx-1">•</span>
                <span>{airdrop.tokenSymbol}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(airdrop.status)}`}>
              {airdrop.status}
            </span>
            {(airdrop.status === 'Active' || airdrop.status === 'Upcoming') && (
              <CalendarButton airdrop={airdrop} />
            )}
          </div>
        </div>
        
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
          {airdrop.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200/50 dark:border-slate-600/50">
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Est. Value</div>
            <div className="font-bold text-slate-900 dark:text-slate-100">{airdrop.estimatedValue}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200/50 dark:border-slate-600/50">
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">End Date</div>
            <div className="font-bold text-slate-900 dark:text-slate-100">{formatDate(airdrop.endDate)}</div>
          </div>
        </div>
        
        {airdrop.fundingAmount && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-4 border border-purple-200/50 dark:border-purple-700/50">
            <div className="flex justify-between">
              <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">Funding</div>
              <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">{airdrop.fundingRound || 'Funding'}</div>
            </div>
            <div className="font-bold text-purple-900 dark:text-purple-200">{airdrop.fundingAmount}</div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {airdrop.type && (
            <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-600 font-medium">
              {airdrop.type}
            </span>
          )}
          {airdrop.requiresKYC && (
            <span className="text-xs px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full border border-orange-200 dark:border-orange-700 font-medium">
              KYC Required
            </span>
          )}
          {airdrop.requiresTwitter && (
            <span className="text-xs px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700 font-medium">
              Twitter Required
            </span>
          )}
          {airdrop.requiresDiscord && (
            <span className="text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-700 font-medium">
              Discord Required
            </span>
          )}
        </div>
        
        {airdrop.steps && airdrop.steps.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-slate-900 dark:text-slate-100">How to participate:</h4>
            <ul className="text-sm text-slate-700 dark:text-slate-300 list-disc pl-5 space-y-1 leading-relaxed">
              {airdrop.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
        
        {airdrop.videoUrl && getYoutubeVideoId(airdrop.videoUrl) && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-slate-900 dark:text-slate-100">Video Tutorial:</h4>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
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
          <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
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
