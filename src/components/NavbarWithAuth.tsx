
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';

const NavbarWithAuth = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">CryptoDrops</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/explore" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Explore
            </Link>
            <Link to="/projects" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Projects
            </Link>
            <Link to="/calendar" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Calendar
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default NavbarWithAuth;
