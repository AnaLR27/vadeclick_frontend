import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPrincipioActivo } from '../models/principio-activo.model';
import { Observable } from 'rxjs';

/**
 * BacteriasService
 * Servicio para obtener principios activos eficaces contra bacterias específicas
 */
@Injectable({
  providedIn: 'root',
})
export class BacteriasService {
  /**
   * URL base para las peticiones relacionadas con bacterias
   */
  private _apiUrl = 'http://localhost:4000/api/bacterias';

  constructor(private _http: HttpClient) {}

  /**
   * Obtener principios activos eficaces contra bacterias específicas
   * @param bacterias Lista de bacterias objetivo
   * @param resistentes (Opcional) Lista de bacterias resistentes a evitar
   * @returns Observable con los principios activos compatibles
   */
  public getPrincipiosEficaces(
    bacterias: string[],
    resistentes: string[] = []
  ): Observable<IPrincipioActivo[]> {
    let params = new HttpParams().set('bacterias', bacterias.join(','));

    if (resistentes.length) {
      params = params.set('resistentes', resistentes.join(','));
    }

    return this._http.get<IPrincipioActivo[]>(`${this._apiUrl}/principios`, {
      params,
    });
  }
}
