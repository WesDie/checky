export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          profile_colors: string | null;
          username: string;
          theme: string;
          highlight_colors: string;
        };
        Insert: {
          id: string;
          profile_colors?: string | null;
          username: string;
          theme?: string;
          highlight_colors?: string;
        };
        Update: {
          id?: string;
          profile_colors?: string | null;
          username?: string;
          theme?: string;
          highlight_colors?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
