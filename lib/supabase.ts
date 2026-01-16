import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Validar que las variables de entorno estén configuradas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Crear cliente de Supabase solo si las variables están configuradas
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Función helper para verificar si Supabase está configurado
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null;
};

// Tipos para la base de datos
export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  created_at?: string;
}
