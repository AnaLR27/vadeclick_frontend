import { ERol } from "../enum/rol.enum";

/**
 * Interfaz de la respuesta de login
 */
export interface LoginResponse {
  token: string;
  user_id: string;
  rol: ERol;
}
