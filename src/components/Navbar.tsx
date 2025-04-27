
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { name: "writing", path: "/writing" },
    { name: "about", path: "/about" },
    { name: "photos", path: "/photography" },
    { name: "projects", path: "/projects" },
    { name: "CV", path: "/cv" },
    { name: "contact", path: "/contact" },
  ];

  const isHomePage = location.pathname === '/';
  const currentPage = navItems.find(item => item.path === location.pathname)?.name;
  
  const capitalizeFirstLetter = (string: string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  };

  return (
    <nav className="py-6 px-6 md:px-12 flex justify-between items-center relative">
      <div className="flex items-center gap-4">
        {!isHomePage && (
          <div className="flex items-center">
            <Link to="/" className="text-foreground hover:text-foreground/80 flex items-center">
              <Home className="w-5 h-5" />
            </Link>
            {isMobile && currentPage && (
              <span className="ml-3 text-lg font-medium">{capitalizeFirstLetter(currentPage)}</span>
            )}
          </div>
        )}
        {isHomePage && (
          <Link to="/" className="text-lg md:text-2xl font-bold">
            Shreyas Kumar
          </Link>
        )}
      </div>

      {isMobile ? (
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground"
            >
              <path
                d={isMenuOpen ? "M11.25 3.75L3.75 11.25M3.75 3.75L11.25 11.25" : "M2.5 4.5H12.5M2.5 7.5H12.5M2.5 10.5H12.5"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="flex items-center gap-x-3 md:gap-x-4 lg:gap-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`hover:text-primary transition-colors duration-200 whitespace-nowrap ${
                  location.pathname === item.path ? 'border-b-2 border-primary' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors ml-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      )}

      {isMobile && isMenuOpen && (
        <div className="absolute top-20 right-6 glass-card p-6 z-50 min-w-[200px] bg-background/30">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block py-2 hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
