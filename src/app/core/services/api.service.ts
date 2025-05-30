import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFarmaco } from '../models/farmaco.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _baseUrl = 'http://localhost:4000/api';

  constructor(private _http: HttpClient) {}

  // 🔐 AUTENTICACIÓN
  login(data: any): Observable<any> {
    return this._http.post(`${this._baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this._http.post(`${this._baseUrl}/auth/register`, data);
  }

  getUsuarioPorId(id_usuario: number): Observable<any> {
    return this._http.get(`${this._baseUrl}/auth/${id_usuario}`);
  }

  // 💊 FÁRMACOS
  getFarmacos(): Observable<IFarmaco[]> {
    return this._http.get<any[]>(`${this._baseUrl}/farmacos`);
  }

  buscarFarmacos(q: string): Observable<IFarmaco[]> {
    return this._http.get<any[]>(`${this._baseUrl}/farmacos/buscar?q=${q}`);
  }

  getFarmacosPorIdPrincipio(id: number): Observable<IFarmaco[]> {
    return this._http.get<any[]>(`${this._baseUrl}/farmacos/principio/${id}`);
  }

  // ⭐ FAVORITOS
  getFavoritos(id_usuario: number): Observable<any[]> {
    return this._http.get<any[]>(`${this._baseUrl}/favoritos/${id_usuario}`);
  }

  agregarFavorito(data: { id_usuario: number, id_farmaco: number }): Observable<any> {
    return this._http.post(`${this._baseUrl}/favoritos`, data);
  }

  eliminarFavorito(id_usuario: number, id_farmaco: number): Observable<any> {
    return this._http.delete(`${this._baseUrl}/favoritos/${id_usuario}/${id_farmaco}`);
  }

  // 🧪 FÓRMULAS
  getFormulas(id_usuario: number): Observable<any[]> {
    return this._http.get<any[]>(`${this._baseUrl}/formulas/${id_usuario}`);
  }

  agregarFormula(data: any): Observable<any> {
    return this._http.post(`${this._baseUrl}/formulas`, data);
  }

  eliminarFormula(id_formula: number): Observable<any> {
    return this._http.delete(`${this._baseUrl}/formulas/${id_formula}`);
  }

  // 🦠 PRINCIPIOS ACTIVOS POR BACTERIA
  getPrincipiosPorBacterias(bacterias: string[], resistentes?: string[]): Observable<any[]> {
    const query = new URLSearchParams();
    query.set('bacterias', bacterias.join(','));
    if (resistentes && resistentes.length > 0) {
      query.set('resistentes', resistentes.join(','));
    }
    return this._http.get<any[]>(`${this._baseUrl}/bacterias/principios?${query.toString()}`);
  }
}
