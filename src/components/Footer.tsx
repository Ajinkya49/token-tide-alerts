
import { Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-accent"
              >
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M7.5 12C7.5 14.5 9.5 16.5 12 16.5C14.5 16.5 16.5 14.5 16.5 12C16.5 9.5 14.5 7.5 12 7.5"
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M7.5 7.5H16.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-2xl font-medium bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">TokenTide</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Simplifying crypto airdrops discovery
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 md:mb-0">
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">API</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-full bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-accent">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-accent">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-accent">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-accent">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TokenTide. All rights reserved. 
            <span className="block sm:inline sm:ml-1">Not financial advice. DYOR.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
