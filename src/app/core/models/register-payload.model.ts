/**
 * Interfaz con los datos para el registro
 */
export interface RegisterPayload {
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  contraseña: string;
}
