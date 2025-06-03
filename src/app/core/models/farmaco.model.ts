/**
 * Interfaz de Farmaco
 */
export interface IFarmaco {
  id_farmaco: number;
  nombre_comercial: string;
  url_ficha_tecnica: string;
  id_principio?: number;
  esFavorito?: boolean; 
}
