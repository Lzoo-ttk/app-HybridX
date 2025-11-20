import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          goal: 'lose' | 'gain' | 'maintain';
          level: 'beginner' | 'intermediate' | 'advanced';
          days_per_week: number;
          diet_preference: string | null;
          restrictions: string[] | null;
          weight: number | null;
          height: number | null;
          age: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      workout_plans: {
        Row: {
          id: string;
          user_id: string;
          plan_data: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['workout_plans']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['workout_plans']['Insert']>;
      };
      daily_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          completed: boolean;
          energy: number;
          mood: string;
          weight: number | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_logs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['daily_logs']['Insert']>;
      };
    };
  };
};
