
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
  fundingAmount?: string; // Funding amount field
  fundingRound?: string; // Funding round field
  videoUrl?: string; // YouTube tutorial URL
}

export interface FilterOptions {
  blockchain: BlockchainType | 'All';
  status: AirdropStatus | 'All';
  type: AirdropType | 'All';
  requiresKYC: boolean | 'All';
  fundingRange?: FundingRange;
  searchQuery?: string;
}
