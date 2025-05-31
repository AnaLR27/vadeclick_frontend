import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFarmaco } from '../models/farmaco.model';

@Injectable({
  providedIn: 'root',
})
export class FarmacosService {
  private _apiUrl = 'http://localhost:4000/api/farmacos';

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
}
