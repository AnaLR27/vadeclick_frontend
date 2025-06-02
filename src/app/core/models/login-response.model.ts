import { ERol } from "../enum/rol.enum";


export interface LoginResponse {
  token: string;
  user_id: string;
  rol: ERol;
}
