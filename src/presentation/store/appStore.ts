// Estado global con Zustand
import { create } from 'zustand';

interface AppState {
  usuario: string | null;
  setUsuario: (usuario: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  usuario: null,
  setUsuario: (usuario) => set({ usuario }),
}));
