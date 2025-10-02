import { ScriptOnce } from "@tanstack/react-router";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

const initialState: ThemeProviderState = {
  setTheme: () => null,
  theme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;

    const stored = localStorage.getItem("theme") as Theme | null;

    if (stored) return stored;

    return defaultTheme;
  });

  const applyTheme = useCallback((t: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(t);
  }, []);

  useEffect(() => {
    applyTheme(theme);

    localStorage.setItem("theme", theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeProviderContext {...props} value={value}>
      <ScriptOnce>
        {`
          (function() {
            var stored = localStorage.getItem('theme');
            var root = document.documentElement;
            var theme = stored || '${defaultTheme}';
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
          })();
        `}
      </ScriptOnce>
      {children}
    </ThemeProviderContext>
  );
}

export const useTheme = () => {
  const context = use(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
