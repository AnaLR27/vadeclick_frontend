import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFarmaco } from '../models/farmaco.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private _apiUrl = 'http://localhost:4000/api/favoritos';

  constructor(private _http: HttpClient) {}

  // Obtener todos los fármacos favoritos de un usuario
  getFavoritos(id_usuario: number): Observable<IFarmaco[]> {
    return this._http.get<IFarmaco[]>(`${this._apiUrl}/${id_usuario}`);
  }

  // Agregar un fármaco a favoritos
  agregarFavorito(
    id_usuario: number,
    id_farmaco: number
  ): Observable<{ msg: string }> {
    return this._http.post<{ msg: string }>(this._apiUrl, {
      id_usuario,
      id_farmaco,
    });
  }

  // Eliminar un fármaco de favoritos
  eliminarFavorito(id_usuario: number, id_farmaco: number): Observable<void> {
    return this._http.delete<void>(
      `${this._apiUrl}/${id_usuario}/${id_farmaco}`
    );
  }
}
