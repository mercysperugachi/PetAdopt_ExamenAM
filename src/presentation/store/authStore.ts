import { create } from 'zustand';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';

const authRepo = new AuthRepositoryImpl();

interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nombre: string, rol: 'refugio' | 'adoptante') => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authRepo.login(email, password);
      set({ user: data.user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  register: async (email, password, nombre, rol) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authRepo.register(email, password, nombre, rol);
      set({ user: data.user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  logout: async () => {
    await authRepo.logout();
    set({ user: null });
  },

  checkSession: async () => {
    const user = await authRepo.getCurrentUser();
    set({ user });
  }
}));