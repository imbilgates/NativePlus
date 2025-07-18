export type ThemeName = 'light' | 'dark' | 'coffee' | 'sunset' | 'forest' | null;

export type ThemeType = {
  name: ThemeName;
  background: string;
  text: string;
  primary: string;
};
