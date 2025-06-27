
import { createContext, useContext, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply disable-transitions class first to prevent visual glitches
    root.classList.add('disable-transitions');
    
    // Apply theme class before any reflow happens
    root.classList.toggle("dark", theme === "dark");
    
    // Force reflow to ensure the change is applied immediately
    document.body.offsetHeight;
    
    // Re-enable transitions after a brief delay to ensure everything is painted
    const transitionTimer = setTimeout(() => {
      root.classList.remove('disable-transitions');
    }, 50);
    
    return () => clearTimeout(transitionTimer);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
