import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import {
  LightTheme,
  DarkTheme,
  CoffeeTheme,
  ForestTheme,
  SunsetTheme,
} from "../constants/theme";
import { ThemeType, ThemeName } from "../types/theme";

interface ThemeContextType {
  theme: ThemeType;
  setCustomTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme(); // 'light' or 'dark'
  const [customTheme, setCustomTheme] = useState<ThemeName>(null);

  const theme = useMemo((): ThemeType => {
    if (customTheme === "coffee") return CoffeeTheme;
    if (customTheme === "dark") return DarkTheme;
    if (customTheme === "light") return LightTheme;
    if (customTheme === "forest") return ForestTheme;
    if (customTheme === "sunset") return SunsetTheme;

    return systemTheme === "dark" ? DarkTheme : LightTheme;
  }, [customTheme, systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
