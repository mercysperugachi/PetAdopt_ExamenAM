// Casos de uso de dominio para PetAdopt
import { Mascota, Solicitud } from '../entities';
import { MascotaRepository, SolicitudRepository } from '../repositories';

// Ejemplo: Registrar una mascota
export class RegistrarMascota {
  constructor(private mascotaRepo: MascotaRepository) {}
  async execute(mascota: Mascota) {
    return this.mascotaRepo.registrarMascota(mascota);
  }
}

// Ejemplo: Solicitar adopción
export class SolicitarAdopcion {
  constructor(private solicitudRepo: SolicitudRepository) {}
  async execute(solicitud: Solicitud) {
    return this.solicitudRepo.solicitarAdopcion(solicitud);
  }
}

// Otros casos de uso pueden agregarse aquí...
