export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Size {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ComponentSize = 'sm' | 'md' | 'lg';
export type Status = 'idle' | 'loading' | 'success' | 'error';
