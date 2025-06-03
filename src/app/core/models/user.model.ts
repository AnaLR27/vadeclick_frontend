import { ERol } from "../enum/rol.enum";

/**
 * Interfaz de usuario
 */
export interface IUser {
  id_usuario: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  rol: ERol;
}
