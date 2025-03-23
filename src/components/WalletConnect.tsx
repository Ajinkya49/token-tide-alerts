
import { useState, useEffect } from 'react';
import { Wallet, PlugConnect } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/components/NotificationProvider';

export type WalletType = 'MetaMask' | 'Phantom' | 'WalletConnect' | null;

interface WalletConnectProps {
  className?: string;
}

const WalletConnect = ({ className }: WalletConnectProps) => {
  const [connectedWallet, setConnectedWallet] = useState<WalletType>(null);
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  // Check local storage for previously connected wallet
  useEffect(() => {
    const savedWallet = localStorage.getItem('connectedWallet') as WalletType;
    if (savedWallet) {
      setConnectedWallet(savedWallet);
    }
  }, []);

  const connectMetaMask = async () => {
    setConnecting(true);
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          // Successfully connected
          const shortenedAddress = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
          setConnectedWallet('MetaMask');
          localStorage.setItem('connectedWallet', 'MetaMask');
          
          toast({
            title: "Wallet Connected",
            description: `Connected to MetaMask: ${shortenedAddress}`,
          });
          
          // Send notification about eligibility for airdrops
          addNotification({
            title: "Wallet Linked Successfully",
            message: "You're now eligible to track airdrops for your Ethereum address. We'll notify you about new opportunities."
          });
        }
      } else {
        toast({
          title: "MetaMask Not Found",
          description: "Please install MetaMask to connect your wallet.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to MetaMask. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const connectPhantom = async () => {
    setConnecting(true);
    try {
      // Check if Phantom is installed
      if (window.solana && window.solana.isPhantom) {
        // Connect to Phantom
        const response = await window.solana.connect();
        const address = response.publicKey.toString();
        const shortenedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
        
        setConnectedWallet('Phantom');
        localStorage.setItem('connectedWallet', 'Phantom');
        
        toast({
          title: "Wallet Connected",
          description: `Connected to Phantom: ${shortenedAddress}`,
        });
        
        // Send notification about eligibility for airdrops
        addNotification({
          title: "Phantom Wallet Linked",
          message: "You're now eligible to track Solana airdrops. We'll notify you about new opportunities on Solana."
        });
      } else {
        toast({
          title: "Phantom Not Found",
          description: "Please install Phantom wallet to connect.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Phantom wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    setConnecting(true);
    try {
      // In a real implementation, you would initialize and connect WalletConnect here
      // This is a simplified version
      setTimeout(() => {
        setConnectedWallet('WalletConnect');
        localStorage.setItem('connectedWallet', 'WalletConnect');
        
        toast({
          title: "Wallet Connected",
          description: "Connected via WalletConnect",
        });
        
        addNotification({
          title: "Wallet Connected via WalletConnect",
          message: "You're now connected via WalletConnect and eligible for multiple chain airdrops."
        });
      }, 1000);
    } catch (error) {
      console.error("Error connecting to WalletConnect:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect via WalletConnect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
    localStorage.removeItem('connectedWallet');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <div className={className}>
      {!connectedWallet ? (
        <div className="flex flex-col space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center space-x-2 w-full"
            onClick={connectMetaMask}
            disabled={connecting}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
              alt="MetaMask" 
              className="w-4 h-4" 
            />
            <span>Connect MetaMask</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center space-x-2 w-full"
            onClick={connectPhantom}
            disabled={connecting}
          >
            <img 
              src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F3582698326-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FPBuhFqmvuZDuYRQEDFad%252Ficon%252FB0mmwNmQZbvz4DgbZ5S8%252Fphantom-favicon-purple.png%3Falt%3Dmedia%26token%3Dc6d4edf3-51c7-4731-a0e4-d44e7966f7a2" 
              alt="Phantom" 
              className="w-4 h-4" 
            />
            <span>Connect Phantom</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center space-x-2 w-full"
            onClick={connectWalletConnect}
            disabled={connecting}
          >
            <PlugConnect className="w-4 h-4" />
            <span>WalletConnect</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex items-center justify-center space-x-2"
          >
            <Wallet className="w-4 h-4" />
            <span>{connectedWallet} Connected</span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
