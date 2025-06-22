
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "../components/ThemeProvider";
import { useAuth } from "../components/AuthProvider";
import Logo from "./Logo";
import Notifications from "./Notifications";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // We would handle the search functionality here
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log("Search for:", searchQuery);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "glass-navbar shadow-lg shadow-purple-500/10" : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Logo />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-purple-100/50 dark:hover:bg-purple-900/50" }),
                      location.pathname === "/" && "text-purple-600 dark:text-purple-400"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {user && (
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-purple-100/50 dark:hover:bg-purple-900/50" }),
                        location.pathname === "/dashboard" && "text-purple-600 dark:text-purple-400"
                      )}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative">
            <Input
              type="search"
              placeholder="Search airdrops..."
              className="w-[200px] lg:w-[300px] glass-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button size="icon" variant="ghost" className="absolute right-0 hover:bg-purple-100/50 dark:hover:bg-purple-900/50" type="submit">
              <Search className="h-5 w-5" />
            </Button>
          </form>

          {user && <Notifications />}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-purple-100/50 dark:hover:bg-purple-900/50">
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card">
              <DropdownMenuItem onClick={toggleTheme}>
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!user && (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-purple-100/50 dark:hover:bg-purple-900/50">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
