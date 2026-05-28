// src/core/config/supabase.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'TU_PROJECT_URL_AQUI'; // Tus claves
const supabaseAnonKey = 'TU_ANON_PUBLIC_KEY_AQUI'; // Tus claves

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});