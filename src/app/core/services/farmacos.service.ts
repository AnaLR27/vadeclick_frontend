import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFarmaco } from '../models/farmaco.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FarmacosService {
  private readonly _apiUrl = `${environment.apiUrl}/farmacos`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los farmacos de la base de datos
   * @returns Observable<IFarmaco[]>
   */
  public getFarmacos(): Observable<IFarmaco[]> {
    return this.http.get<IFarmaco[]>(this._apiUrl);
  }

  /**
   * Obtiene la informacion de un farmaco por su id
   * @param id_farmaco string
   * @returns Observable<IFarmaco>
   */
  public getFarmacoById(id_farmaco: string): Observable<IFarmaco> {
    return this.http.get<IFarmaco>(`${this._apiUrl}/${id_farmaco}`);
  }

  // Si más adelante quieres buscar por nombre desde el backend

  /**
   * Devuelve los fármacos que coinciden por el nombre comercial o principio activo
   * @param nombre string
   * @returns Observable<IFarmaco[]>
   */
  public searchFarmacosByName(nombre: string): Observable<IFarmaco[]> {
    const params = new HttpParams().set('q', nombre);
    return this.http.get<IFarmaco[]>(`${this._apiUrl}/buscar`, { params });
  }

  /**
   * Obtiene todos los fármacos relacionados con un principio activo por su ID
   * @param idPrincipio string
   * @returns Observable<IFarmaco[]>
   */
  public getFarmacosPorIdPrincipio(
    idPrincipio: string
  ): Observable<IFarmaco[]> {
    return this.http.get<IFarmaco[]>(
      `${this._apiUrl}/principio/${idPrincipio}`
    );
  }
}
