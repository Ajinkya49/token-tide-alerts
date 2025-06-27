
export type BlockchainType = 
  | 'Ethereum' 
  | 'Solana' 
  | 'Binance Smart Chain' 
  | 'Polygon' 
  | 'Avalanche' 
  | 'Arbitrum' 
  | 'Optimism'
  | 'Near'
  | 'Other';

export type AirdropStatus = 'Active' | 'Upcoming' | 'Ended';

export type AirdropType = 'Token' | 'NFT' | 'Governance' | 'Other';

export type FundingRange = 'All' | 'Under $50M' | '$50M-$100M' | '$100M-$200M' | 'Over $200M';

export type SortOption = 'newest' | 'oldest' | 'funding-high' | 'funding-low' | 'deadline-soon' | 'deadline-far';

export interface Airdrop {
  id: string;
  name: string;
  description: string;
  logo: string;
  blockchain: BlockchainType;
  tokenSymbol: string;
  estimatedValue: string;
  startDate: string;
  endDate: string;
  status: AirdropStatus;
  type: AirdropType;
  requiresKYC: boolean;
  requiresTwitter?: boolean;
  requiresDiscord?: boolean;
  link: string;
  steps?: string[];
  fundingAmount?: string;
  fundingRound?: string;
  videoUrl?: string;
  isBookmarked?: boolean;
  userProgress?: 'not-started' | 'in-progress' | 'completed';
  riskLevel?: 'low' | 'medium' | 'high';
  communityRating?: number;
}

export interface FilterOptions {
  blockchain: BlockchainType | 'All';
  status: AirdropStatus | 'All';
  type: AirdropType | 'All';
  requiresKYC: boolean | 'All';
  fundingRange?: FundingRange;
  searchQuery?: string;
  sortBy?: SortOption;
  showBookmarked?: boolean;
}
