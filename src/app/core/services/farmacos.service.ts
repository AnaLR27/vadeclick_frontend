import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFarmaco } from '../models/farmaco.model';

@Injectable({
  providedIn: 'root',
})
export class FarmacosService {
  private _apiUrl = 'http://localhost:4000/api/farmacos';

  constructor(private http: HttpClient) {}

  getFarmacos(): Observable<IFarmaco[]> {
    return this.http.get<IFarmaco[]>(this._apiUrl);
  }

  getFarmacoById(id: string): Observable<IFarmaco> {
    return this.http.get<IFarmaco>(`${this._apiUrl}/${id}`);
  }

  // Si más adelante quieres buscar por nombre desde el backend
  searchFarmacos(nombre: string): Observable<IFarmaco[]> {
    return this.http.get<IFarmaco[]>(`${this._apiUrl}?nombre=${nombre}`);
  }
}
