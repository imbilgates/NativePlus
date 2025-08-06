export type ThemeName = 'light' | 'dark' | 'coffee' | 'forest' | null;

export type ThemeType = {
  name: ThemeName;
  background: string;
  text: string;
  primary: string;
  textSecondary?: string;
  border?: string;
  surface?: string;
  error?: string;
};
