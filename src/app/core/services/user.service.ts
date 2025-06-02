import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _apiUrl = 'http://localhost:4000/api/users';

  constructor(private _http: HttpClient) {}

  // Obtener todos los usuarios
  public getAllUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this._apiUrl);
  }

  // Obtener usuario por ID
  public getUsuarioPorId(id_usuario: number): Observable<IUser> {
    return this._http.get<IUser>(`${this._apiUrl}/${id_usuario}`);
  }

  // Actualizar perfil de usuario
  public updateUserProfile(
    id_usuario: number,
    data: Partial<IUser>
  ): Observable<{ msg: string }> {
    return this._http.put<{ msg: string }>(
      `${this._apiUrl}/${id_usuario}`,
      data
    );
  }

  // Eliminar usuario por ID
  public deleteUserById(id_usuario: number): Observable<{ msg: string }> {
    return this._http.delete<{ msg: string }>(`${this._apiUrl}/${id_usuario}`);
  }
}
