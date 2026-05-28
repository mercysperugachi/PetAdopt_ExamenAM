import { supabase } from '../../core/config/supabase';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class AuthRepositoryImpl implements AuthRepository {
  
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async register(email: string, password: string, nombre: string, rol: 'refugio' | 'adoptante') {
    // Registramos en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    // Si se creó el usuario, insertamos su perfil en nuestra tabla pública
    if (data.user) {
      const { error: profileError } = await supabase.from('perfiles').insert([
        { id: data.user.id, nombre, rol }
      ]);
      if (profileError) throw profileError;
    }
    return data;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
}