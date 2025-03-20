
import { Airdrop, BlockchainType } from './types';

export const blockchains: BlockchainType[] = [
  'Ethereum',
  'Solana',
  'Binance Smart Chain',
  'Polygon',
  'Avalanche',
  'Arbitrum',
  'Optimism',
  'Near',
  'Other',
];

export const mockAirdrops: Airdrop[] = [
  {
    id: '1',
    name: 'Arbitrum Odyssey',
    description: 'Participate in the Arbitrum Odyssey event to earn ARB tokens as a reward for early adoption.',
    logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
    blockchain: 'Arbitrum',
    tokenSymbol: 'ARB',
    estimatedValue: '$50-200',
    startDate: '2023-12-01',
    endDate: '2024-01-15',
    status: 'Active',
    type: 'Token',
    requiresKYC: false,
    requiresTwitter: true,
    requiresDiscord: true,
    link: 'https://arbitrum.io',
    steps: [
      'Connect your wallet to Arbitrum',
      'Complete at least 5 transactions on the network',
      'Interact with at least 3 different protocols',
      'Hold a minimum balance until the snapshot date'
    ]
  },
  {
    id: '2',
    name: 'Solana Saga Drop',
    description: 'Early users of the Solana Saga phone will receive a special token airdrop.',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    blockchain: 'Solana',
    tokenSymbol: 'SOL',
    estimatedValue: '$100-500',
    startDate: '2023-11-15',
    endDate: '2024-02-28',
    status: 'Active',
    type: 'Token',
    requiresKYC: true,
    link: 'https://solana.com',
    steps: [
      'Purchase a Solana Saga phone',
      'Activate and set up the device',
      'Register your wallet on the Solana Saga platform',
      'Complete KYC verification'
    ]
  },
  {
    id: '3',
    name: 'Uniswap V4',
    description: 'Potential airdrop for early users of Uniswap V4 when it launches.',
    logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    blockchain: 'Ethereum',
    tokenSymbol: 'UNI',
    estimatedValue: '$200-1000',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'Upcoming',
    type: 'Governance',
    requiresKYC: false,
    link: 'https://uniswap.org',
    steps: [
      'Use Uniswap V4 when it launches',
      'Provide liquidity to eligible pools',
      'Hold your position for the required period',
      'Vote on at least one governance proposal'
    ]
  },
  {
    id: '4',
    name: 'Optimism Grants',
    description: 'Contribute to Optimism ecosystem projects to qualify for OP tokens distribution.',
    logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
    blockchain: 'Optimism',
    tokenSymbol: 'OP',
    estimatedValue: '$20-150',
    startDate: '2023-10-10',
    endDate: '2024-01-10',
    status: 'Active',
    type: 'Token',
    requiresKYC: false,
    requiresTwitter: true,
    link: 'https://optimism.io',
    steps: [
      'Contribute to an Optimism ecosystem project',
      'Submit your contribution for review',
      'Get verified by the Optimism team',
      'Connect your wallet for distribution'
    ]
  },
  {
    id: '5',
    name: 'Polygon zkEVM Beta',
    description: 'Participate in the zkEVM Beta testing to qualify for MATIC rewards.',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    blockchain: 'Polygon',
    tokenSymbol: 'MATIC',
    estimatedValue: '$30-120',
    startDate: '2023-11-20',
    endDate: '2024-02-20',
    status: 'Active',
    type: 'Token',
    requiresKYC: false,
    requiresDiscord: true,
    link: 'https://polygon.technology',
    steps: [
      'Join the Polygon zkEVM Beta program',
      'Bridge assets to zkEVM',
      'Complete test transactions and provide feedback',
      'Report bugs or suggest improvements'
    ]
  },
  {
    id: '6',
    name: 'Avalanche Multiverse',
    description: 'NFT collection for Avalanche subnet creators and early supporters.',
    logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    blockchain: 'Avalanche',
    tokenSymbol: 'AVAX',
    estimatedValue: '$50-200',
    startDate: '2023-12-15',
    endDate: '2024-03-15',
    status: 'Active',
    type: 'NFT',
    requiresKYC: true,
    requiresTwitter: true,
    requiresDiscord: true,
    link: 'https://avax.network',
    steps: [
      'Create or support an Avalanche subnet',
      'Submit your project for review',
      'Complete KYC verification',
      'Mint your NFT during the eligible period'
    ]
  },
  {
    id: '7',
    name: 'BNB Chain Pioneers',
    description: 'Early adopters program for BNB Chain applications with token rewards.',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    blockchain: 'Binance Smart Chain',
    tokenSymbol: 'BNB',
    estimatedValue: '$40-160',
    startDate: '2023-09-01',
    endDate: '2024-01-31',
    status: 'Active',
    type: 'Token',
    requiresKYC: true,
    link: 'https://www.bnbchain.org',
    steps: [
      'Create a BNB Chain wallet',
      'Complete KYC verification',
      'Use at least 5 different BNB Chain applications',
      'Hold eligible tokens until the snapshot date'
    ]
  },
  {
    id: '8',
    name: 'Near Protocol Horizon',
    description: 'Community program for NEAR developers with token incentives.',
    logo: 'https://cryptologos.cc/logos/near-protocol-near-logo.png',
    blockchain: 'Near',
    tokenSymbol: 'NEAR',
    estimatedValue: '$75-300',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    status: 'Upcoming',
    type: 'Token',
    requiresKYC: false,
    requiresDiscord: true,
    link: 'https://near.org',
    steps: [
      'Join the NEAR developer community',
      'Contribute to at least one NEAR project',
      'Participate in community calls and events',
      'Register your wallet for the distribution'
    ]
  },
  {
    id: '9',
    name: 'Ethereum Staking Rewards',
    description: 'Special distribution for long-term ETH stakers post-Shapella upgrade.',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    blockchain: 'Ethereum',
    tokenSymbol: 'ETH',
    estimatedValue: '$100-1000',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    status: 'Upcoming',
    type: 'Token',
    requiresKYC: false,
    link: 'https://ethereum.org',
    steps: [
      'Stake ETH through a participating service',
      'Maintain your stake for the minimum required period',
      'Register your address on the rewards portal',
      'Claim your rewards after the distribution date'
    ]
  },
  {
    id: '10',
    name: 'Cosmos Hub Governance',
    description: 'Distribution for active governance participants in the Cosmos ecosystem.',
    logo: 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
    blockchain: 'Other',
    tokenSymbol: 'ATOM',
    estimatedValue: '$50-250',
    startDate: '2023-12-10',
    endDate: '2024-03-10',
    status: 'Active',
    type: 'Governance',
    requiresKYC: false,
    link: 'https://cosmos.network',
    steps: [
      'Hold ATOM in a non-custodial wallet',
      'Participate in at least 10 governance proposals',
      'Maintain a minimum balance throughout the period',
      'Register for the distribution after the qualifying period'
    ]
  }
];
