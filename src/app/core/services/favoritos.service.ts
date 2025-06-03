import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFarmaco } from '../models/farmaco.model';

/**
 * FavoritosService
 * Servicio para gestionar los fármacos marcados como favoritos por un usuario
 */
@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  /**
   * URL base para las peticiones de favoritos
   */
  private _apiUrl = 'http://localhost:4000/api/favoritos';

  constructor(private _http: HttpClient) {}

  /**
   * Obtener todos los fármacos favoritos de un usuario
   * @param id_usuario ID del usuario
   * @returns Observable con la lista de fármacos favoritos
   */
  public getFavoritos(id_usuario: string): Observable<IFarmaco[]> {
    return this._http.get<IFarmaco[]>(`${this._apiUrl}/${id_usuario}`);
  }

  /**
   * Agregar un fármaco a favoritos
   * @param id_usuario ID del usuario
   * @param id_farmaco ID del fármaco
   * @returns Observable con mensaje de confirmación
   */
  public agregarFavorito(
    id_usuario: number,
    id_farmaco: number
  ): Observable<{ msg: string }> {
    return this._http.post<{ msg: string }>(this._apiUrl, {
      id_usuario,
      id_farmaco,
    });
  }

  /**
   * Eliminar un fármaco de favoritos
   * @param id_usuario ID del usuario
   * @param id_farmaco ID del fármaco
   * @returns Observable vacío al completar la eliminación
   */
  public eliminarFavorito(
    id_usuario: number,
    id_farmaco: number
  ): Observable<void> {
    return this._http.delete<void>(
      `${this._apiUrl}/${id_usuario}/${id_farmaco}`
    );
  }
}
