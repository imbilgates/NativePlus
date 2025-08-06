import { ThemeType } from "@/types/theme";

export const themes: ThemeType[] = [
  {
    name: 'light',
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
    textSecondary: '#666666',
    border: '#E0E0E0',
    surface: '#F5F5F5',
    error: '#FF3B30',
  },
  {
    name: 'dark',
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
    textSecondary: '#CCCCCC',
    border: '#333333',
    surface: '#1C1C1E',
    error: '#FF453A',
  },
  {
    name: 'coffee',
    background: '#3E2723',
    text: '#FFEBEE',
    primary: '#A1887F',
    textSecondary: '#D7CCC8',
    border: '#5D4037',
    surface: '#4E342E',
    error: '#D84315',
  },

  {
    name: 'forest',
    background: '#1B5E20',
    text: '#E8F5E9',
    primary: '#4CAF50',
    textSecondary: '#C8E6C9',
    border: '#2E7D32',
    surface: '#388E3C',
    error: '#D32F2F',
  },
];

export const LightTheme = themes[0];
export const DarkTheme = themes[1];
export const CoffeeTheme = themes[2];
export const ForestTheme = themes[3];
