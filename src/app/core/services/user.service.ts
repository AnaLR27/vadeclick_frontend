import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

/**
 * UserService
 * Servicio para gestionar las operaciones relacionadas con los usuarios del sistema
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * URL base para las peticiones relacionadas con usuarios
   */
  private readonly _apiUrl = 'http://localhost:4000/api/users';

  constructor(private _http: HttpClient) {}

  /**
   * Obtener todos los usuarios registrados
   * @returns Observable con lista de usuarios
   */
  public getAllUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this._apiUrl);
  }

  /**
   * Obtener un usuario específico por su ID
   * @param id_usuario ID del usuario
   * @returns Observable con los datos del usuario
   */
  public getUsuarioPorId(id_usuario: number): Observable<IUser> {
    return this._http.get<IUser>(`${this._apiUrl}/${id_usuario}`);
  }

  /**
   * Actualizar el perfil de un usuario
   * @param id_usuario ID del usuario
   * @param data Datos a actualizar (parciales)
   * @returns Observable con mensaje de confirmación
   */
  public updateUserProfile(
    id_usuario: number,
    data: Partial<IUser>
  ): Observable<{ msg: string }> {
    return this._http.put<{ msg: string }>(
      `${this._apiUrl}/${id_usuario}`,
      data
    );
  }

  /**
   * Eliminar un usuario del sistema por su ID
   * @param id_usuario ID del usuario a eliminar
   * @returns Observable con mensaje de confirmación
   */
  public deleteUserById(id_usuario: number): Observable<{ msg: string }> {
    return this._http.delete<{ msg: string }>(`${this._apiUrl}/${id_usuario}`);
  }
}
