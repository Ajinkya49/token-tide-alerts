
import { useState } from 'react';
import { WalletType } from './WalletConnect';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import WalletConnect from './WalletConnect';
import { Wallet, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';

const WalletWidget = () => {
  const [isConnectMenuOpen, setIsConnectMenuOpen] = useState(false);
  
  // Check local storage for connected wallet on component mount
  const savedWallet = localStorage.getItem('connectedWallet') as WalletType;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Wallet Status</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsConnectMenuOpen(!isConnectMenuOpen)}>
                {isConnectMenuOpen ? 'Hide Connect Options' : 'Show Connect Options'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-xs">
          Connect your wallet to track airdrop eligibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        {savedWallet ? (
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">{savedWallet} Connected</div>
              <div className="text-xs text-muted-foreground">Tracking airdrop eligibility</div>
            </div>
            <div className="ml-auto">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-secondary p-2 rounded-full">
              <Wallet className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-sm font-medium">No Wallet Connected</div>
              <div className="text-xs text-muted-foreground">Connect to track eligibility</div>
            </div>
            <div className="ml-auto">
              <XCircle className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        )}
        
        {(isConnectMenuOpen || !savedWallet) && (
          <WalletConnect />
        )}
      </CardContent>
    </Card>
  );
};

export default WalletWidget;
