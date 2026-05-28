import { create } from 'zustand';
import { MascotaRepositoryImpl } from '../../data/repositories/MascotaRepositoryImpl';
import { Mascota } from '../../domain/entities';

const mascotaRepo = new MascotaRepositoryImpl();

interface MascotasState {
  mascotas: Mascota[];
  isLoading: boolean;
  error: string | null;
  fetchMascotasDelRefugio: (refugioId: string) => Promise<void>;
  agregarMascota: (mascota: Omit<Mascota, 'id' | 'imagenUrl'>, imageUri: string) => Promise<boolean>;
}

export const useMascotasStore = create<MascotasState>((set, get) => ({
  mascotas: [],
  isLoading: false,
  error: null,

  fetchMascotasDelRefugio: async (refugioId) => {
    set({ isLoading: true, error: null });
    try {
      const mascotas = await mascotaRepo.getMascotasPorRefugio(refugioId);
      set({ mascotas, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  agregarMascota: async (mascota, imageUri) => {
    set({ isLoading: true, error: null });
    try {
      await mascotaRepo.registrarMascota(mascota, imageUri);
      // Volvemos a cargar la lista para que aparezca la nueva mascota automáticamente
      await get().fetchMascotasDelRefugio(mascota.refugioId);
      set({ isLoading: false });
      return true; // Retornamos true si fue exitoso para cerrar modales/formularios
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  }
}));