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
} from "../constants/theme";
import { ThemeType, ThemeName } from "../types/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  theme: ThemeType;
  setCustomTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme(); // 'light' or 'dark'
  const [customTheme, setCustomThemeState] = useState<ThemeName>(null);

  // Load theme from AsyncStorage on mount
  React.useEffect(() => {
    (async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('APP_THEME');
        if (storedTheme) {
          setCustomThemeState(storedTheme as ThemeName);
        }
      } catch (e) {
        // handle error if needed
      }
    })();
  }, []);

  // Save theme to AsyncStorage whenever it changes
  const setCustomTheme = React.useCallback(async (themeName: ThemeName) => {
    setCustomThemeState(themeName);
    try {
      if (themeName) {
        await AsyncStorage.setItem('APP_THEME', themeName);
      } else {
        await AsyncStorage.removeItem('APP_THEME');
      }
    } catch (e) {
      // handle error if needed
    }
  }, []);

  const theme = useMemo((): ThemeType => {
    if (customTheme === "coffee") return CoffeeTheme;
    if (customTheme === "dark") return DarkTheme;
    if (customTheme === "light") return LightTheme;
    if (customTheme === "forest") return ForestTheme;

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
