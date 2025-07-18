import { ThemeType } from "@/types/theme";

export const themes: ThemeType[] = [
  {
    name: 'light',
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
  },
  {
    name: 'dark',
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
  },
  {
    name: 'coffee',
    background: '#3E2723',
    text: '#FFEBEE',
    primary: '#A1887F',
  },
  {
    name: 'sunset',
    background: '#FF6F61', // soft reddish background
    text: '#FFF3E0',        // warm light text
    primary: '#FF8A65',     // orange accent
  },
  {
    name: 'forest',
    background: '#1B5E20', // deep green
    text: '#E8F5E9',        // light greenish text
    primary: '#4CAF50',     // fresh green primary
  },
];

export const LightTheme = themes[0];
export const DarkTheme = themes[1];
export const CoffeeTheme = themes[2];
export const SunsetTheme = themes[3];
export const ForestTheme = themes[4];
