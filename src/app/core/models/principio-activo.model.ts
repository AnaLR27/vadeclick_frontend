import { IFarmaco } from './farmaco.model';

/**
 * Interfaz Principio Activo
 */
export interface IPrincipioActivo {
  id_principio: number;
  principio_activo: string;
  isPActivoOpened: boolean;
  farmacosAsociados: IFarmaco[];
}
