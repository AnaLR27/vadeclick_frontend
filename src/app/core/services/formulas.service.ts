import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFormulaMagistral } from '../models/formula-magistral.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormulasService {
  private _apiUrl = 'http://localhost:4000/api/formulas';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las fórmulas de un usuario por su ID
   */
  public getFormulasByUserId(
    id_usuario: string
  ): Observable<IFormulaMagistral[]> {
    return this.http.get<IFormulaMagistral[]>(`${this._apiUrl}/${id_usuario}`);
  }

  /**
   * Añadir una nueva fórmula
   */
  public addFormula(
    formula: Partial<IFormulaMagistral>
  ): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(`${this._apiUrl}`, formula);
  }

  /**
   * Eliminar una fórmula por su ID
   */
  public deleteFormula(id_formula: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this._apiUrl}/${id_formula}`);
  }

  // Editar fórmula existente por ID
  public updateFormula(
    id_formula: number,
    formula: Partial<IFormulaMagistral>
  ): Observable<any> {
    return this.http.put(`${this._apiUrl}/${id_formula}`, formula);
  }
}
