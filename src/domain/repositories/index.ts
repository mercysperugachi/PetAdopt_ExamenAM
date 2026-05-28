// Interfaces de repositorios para la capa de dominio
import { Mascota, Refugio, Solicitud, Usuario } from './entities';

export interface MascotaRepository {
  getMascotas(): Promise<Mascota[]>;
  getMascotaById(id: string): Promise<Mascota | null>;
  registrarMascota(mascota: Mascota): Promise<void>;
}

export interface UsuarioRepository {
  getUsuarioById(id: string): Promise<Usuario | null>;
  registrarUsuario(usuario: Usuario): Promise<void>;
}

export interface RefugioRepository {
  getRefugios(): Promise<Refugio[]>;
  getRefugioById(id: string): Promise<Refugio | null>;
}

export interface SolicitudRepository {
  getSolicitudesByUsuario(usuarioId: string): Promise<Solicitud[]>;
  solicitarAdopcion(solicitud: Solicitud): Promise<void>;
}
