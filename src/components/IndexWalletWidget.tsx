
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import WalletConnect from './WalletConnect';
import { useNotifications } from './NotificationProvider';

const IndexWalletWidget = () => {
  const [showConnect, setShowConnect] = useState(false);
  const { addNotification } = useNotifications();
  
  useEffect(() => {
    // Check if we should show a notification about connecting wallet
    const hasShownWalletPrompt = localStorage.getItem('hasShownWalletPrompt');
    const connectedWallet = localStorage.getItem('connectedWallet');
    
    if (!hasShownWalletPrompt && !connectedWallet) {
      // Add notification to prompt wallet connection
      setTimeout(() => {
        addNotification({
          title: "Connect Your Wallet",
          message: "Link your wallet to auto-track eligibility for airdrops on Ethereum, Solana and more chains!",
          type: 'wallet',
        });
        localStorage.setItem('hasShownWalletPrompt', 'true');
      }, 3000);
    }
  }, [addNotification]);

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Track Airdrop Eligibility</CardTitle>
        <CardDescription>
          Connect your wallet to automatically track eligibility for all airdrops
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showConnect ? (
          <Button 
            className="w-full" 
            onClick={() => setShowConnect(true)}
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        ) : (
          <WalletConnect />
        )}
      </CardContent>
    </Card>
  );
};

export default IndexWalletWidget;
