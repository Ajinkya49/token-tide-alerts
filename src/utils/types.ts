
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

export type InvestmentStatus = 'Free' | 'Invest' | 'Undisclosed';

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
  fundingAmount?: string; // For tracking funding
  fundingRound?: string; // For tracking funding round
  investmentStatus?: InvestmentStatus; // New field for investment status
  timeline?: string; // For tracking project timeline (Q1, Q2-Q3, etc.)
}

export interface FilterOptions {
  blockchain: BlockchainType | 'All';
  status: AirdropStatus | 'All';
  type: AirdropType | 'All';
  requiresKYC: boolean | 'All';
  investmentStatus?: InvestmentStatus | 'All';
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  savedAirdrops?: string[]; // Array of airdrop IDs that the user has saved
}
