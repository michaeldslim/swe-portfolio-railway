"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { ThemeName } from "@/types";

const enableThemePersistence =
  process.env.NEXT_PUBLIC_ENABLE_THEME_SWITCHER === "true";

interface IThemeContextValue {
  theme: ThemeName;
  handleThemeChange: (nextTheme: ThemeName) => Promise<void>;
}

const ThemeContext = createContext<IThemeContextValue | undefined>(undefined);

interface IThemeProviderProps {
  initialTheme: ThemeName;
  children: React.ReactNode;
}

export function ThemeProvider({ initialTheme, children }: IThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = async (nextTheme: ThemeName) => {
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    if (!enableThemePersistence) {
      return;
    }

    try {
      await fetch("/api/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme: nextTheme }),
      });
    } catch {
      // no-op
    }
  };

  return <ThemeContext.Provider value={{ theme, handleThemeChange }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): IThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
