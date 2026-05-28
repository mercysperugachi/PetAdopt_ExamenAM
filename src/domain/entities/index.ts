// Modelos de dominio para PetAdopt
// Mascota, Usuario, Refugio, Solicitud

export interface Mascota {
  id: string;
  nombre: string;
  edad: number;
  tipo: 'perro' | 'gato' | 'otro';
  descripcion: string;
  imagenUrl: string;
  refugioId: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
}

export interface Refugio {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
}

export interface Solicitud {
  id: string;
  mascotaId: string;
  usuarioId: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  fecha: string;
}
