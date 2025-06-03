import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFormulaMagistral } from '../models/formula-magistral.model';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

/**
 * FormulasService
 * Servicio para gestionar las fórmulas magistrales del usuario
 */
@Injectable({
  providedIn: 'root',
})
export class FormulasService {
  /**
   * URL base para las peticiones relacionadas con fórmulas
   */
  private readonly _apiUrl = `${environment.apiUrl}/formulas`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las fórmulas asociadas a un usuario
   * @param id_usuario ID del usuario
   * @returns Observable con la lista de fórmulas
   */
  public getFormulasByUserId(
    id_usuario: string
  ): Observable<IFormulaMagistral[]> {
    return this.http.get<IFormulaMagistral[]>(`${this._apiUrl}/${id_usuario}`);
  }

  /**
   * Crear una nueva fórmula magistral
   * @param formula Datos parciales de la fórmula
   * @returns Observable con mensaje de éxito
   */
  public addFormula(
    formula: Partial<IFormulaMagistral>
  ): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(`${this._apiUrl}`, formula);
  }

  /**
   * Eliminar una fórmula existente por su ID
   * @param id_formula ID de la fórmula a eliminar
   * @returns Observable con mensaje de éxito
   */
  public deleteFormula(id_formula: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this._apiUrl}/${id_formula}`);
  }

  /**
   * Actualizar una fórmula existente
   * @param id_formula ID de la fórmula
   * @param formula Nuevos datos parciales de la fórmula
   * @returns Observable con la respuesta del servidor
   */
  public updateFormula(
    id_formula: number,
    formula: Partial<IFormulaMagistral>
  ): Observable<any> {
    return this.http.put(`${this._apiUrl}/${id_formula}`, formula);
  }
}
