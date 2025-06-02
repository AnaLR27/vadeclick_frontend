import { IFarmaco } from './farmaco.model';

export interface IPrincipioActivo {
  id_principio: number;
  principio_activo: string;
  isPActivoOpened: boolean;
  farmacosAsociados: IFarmaco[];
}
