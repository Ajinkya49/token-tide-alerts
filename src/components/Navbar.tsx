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
import { cn } from "@/lib/utils";
import { useTheme } from "../components/ThemeProvider";
import Logo from "./Logo";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
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
          
          {/* Single Theme Toggle Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTheme}
            className="hover:bg-purple-100/50 dark:hover:bg-purple-900/50"
          >
            {theme === 'dark' ? (
              <>
                <SunIcon className="h-4 w-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <MoonIcon className="h-4 w-4 mr-2" />
                Dark Mode
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
