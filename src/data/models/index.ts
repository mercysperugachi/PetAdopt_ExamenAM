// DTOs para la capa de datos
export interface MascotaDTO {
  id: string;
  nombre: string;
  edad: number;
  tipo: string;
  descripcion: string;
  imagen_url: string;
  refugio_id: string;
}

export interface UsuarioDTO {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
}

export interface RefugioDTO {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  lat: number;
  lng: number;
}

export interface SolicitudDTO {
  id: string;
  mascota_id: string;
  usuario_id: string;
  estado: string;
  fecha: string;
}
