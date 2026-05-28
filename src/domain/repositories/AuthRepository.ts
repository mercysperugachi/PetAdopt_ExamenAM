export interface AuthRepository {
  login(email: string, password: string): Promise<any>;
  register(email: string, password: string, nombre: string, rol: 'refugio' | 'adoptante'): Promise<any>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<any>;
}