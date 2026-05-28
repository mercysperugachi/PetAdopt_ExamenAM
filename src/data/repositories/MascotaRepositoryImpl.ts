import { supabase } from '../../core/config/supabase';
import { Mascota } from '../../domain/entities';

export class MascotaRepositoryImpl {
  
  // 1. Sube la foto al Storage y devuelve la URL pública
  private async uploadImage(imageUri: string, fileName: string): Promise<string> {
    try {
      // Convertimos la URI local en un archivo Blob que Supabase pueda entender
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Subimos al bucket 'mascotas'
      const { error } = await supabase.storage
        .from('mascotas')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: false, // No sobreescribir imágenes con el mismo nombre
        });

      if (error) throw error;

      // Obtenemos la URL pública para guardarla en la base de datos
      const { data } = supabase.storage.from('mascotas').getPublicUrl(fileName);
      return data.publicUrl;
      
    } catch (error: any) {
      throw new Error(`Error subiendo la imagen: ${error.message}`);
    }
  }

  // 2. Guarda el registro de la mascota en PostgreSQL
  async registrarMascota(mascota: Omit<Mascota, 'id' | 'imagenUrl'>, imageUri: string): Promise<void> {
    // Generamos un nombre único para la foto
    const fileName = `${Date.now()}_${mascota.nombre.replace(/\s+/g, '_')}.jpg`;
    
    // Primero subimos la foto
    const imagenUrl = await this.uploadImage(imageUri, fileName);

    // Luego guardamos los datos en la tabla (asegúrate de que los nombres de las columnas coincidan con tu SQL)
    const { error } = await supabase.from('mascotas').insert([
      {
        nombre: mascota.nombre,
        especie: mascota.tipo,
        edad: mascota.edad,
        descripcion: mascota.descripcion,
        imagen_url: imagenUrl,
        refugio_id: mascota.refugioId,
      }
    ]);

    if (error) throw error;
  }

  // 3. Obtiene las mascotas de un refugio específico
  async getMascotasPorRefugio(refugioId: string): Promise<Mascota[]> {
    const { data, error } = await supabase
      .from('mascotas')
      .select('*')
      .eq('refugio_id', refugioId)
      .order('id', { ascending: false }); // Las más recientes primero

    if (error) throw error;

    // Mapeamos los datos de la BD al formato de nuestra Entidad (Domain)
    return data.map((item: any) => ({
      id: item.id,
      nombre: item.nombre,
      tipo: item.especie,
      edad: item.edad,
      descripcion: item.descripcion,
      imagenUrl: item.imagen_url,
      refugioId: item.refugio_id,
    }));
  }

  // 4. Obtiene todas las mascotas disponibles para el feed de adoptantes
  async getMascotasDisponibles(): Promise<Mascota[]> {
    const { data, error } = await supabase
      .from('mascotas')
      .select('*')
      .eq('estado', 'disponible')
      .order('id', { ascending: false });

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      nombre: item.nombre,
      tipo: item.especie,
      edad: item.edad,
      descripcion: item.descripcion,
      imagenUrl: item.imagen_url,
      refugioId: item.refugio_id,
    }));
  }
}