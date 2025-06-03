/**
 * Interfaz de fórmula magistral
 */
export interface IFormulaMagistral {
  id_formula: number;
  nombre_formula: string;
  patologia: string;
  descripcion?: string;
  id_usuario: string;
}
