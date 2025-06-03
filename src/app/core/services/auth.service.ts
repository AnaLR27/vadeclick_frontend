import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginPayload } from '../models/login-payload.model';
import { RegisterPayload } from '../models/register-payload.model';
import { LoginResponse } from '../models/login-response.model';
import { Router } from '@angular/router';
import { ERol } from '../enum/rol.enum';
import { environment } from '../../../environments/environment';

/**
 * AuthService
 * Servicio de autenticación centralizado para manejar login, logout y estado del usuario
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * URL base para las peticiones de autenticación
   */
  private readonly _apiUrl = `${environment.apiUrl}/auth`;
  /**
   * Estado reactivo: si el usuario está autenticado
   */
  private _isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isLoggedIn()
  );
  public isAuthenticated$ = this._isAuthenticatedSubject.asObservable();
  /**
   * Estado reactivo: rol actual del usuario
   */
  private _rolSubject = new BehaviorSubject<ERol | null>(this._getStoredRol());
  public rol$ = this._rolSubject.asObservable();

  constructor(private _http: HttpClient, private _router: Router) {}

  /**
   * Iniciar sesión del usuario
   * @param payload credenciales de login
   * @returns observable con respuesta del servidor
   */
  public login(payload: LoginPayload): Observable<LoginResponse> {
    return this._http
      .post<LoginResponse>(`${this._apiUrl}/login`, payload)
      .pipe(
        tap((res) => {
          this._isAuthenticatedSubject.next(true);
          this._rolSubject.next(res.rol);
        })
      );
  }
  /**
   * Cerrar sesión del usuario
   * - Limpia localStorage
   * - Actualiza estados reactivos
   * - Redirige a la ruta de login
   */
  public logout(): void {
    localStorage.clear();
    this._isAuthenticatedSubject.next(false);
    this._rolSubject.next(null);

    this._router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está logueado (token en localStorage)
   * @returns true si existe token
   */
  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   *  Obtiene el rol guardado en localStorage si es válido
   * @returns Rol del usuario o null
   */
  private _getStoredRol(): ERol | null {
    const rol = localStorage.getItem('rol');
    return rol && Object.values(ERol).includes(rol as ERol)
      ? (rol as ERol)
      : null;
  }

  /**
   * Acceso directo al rol actual desde el BehaviorSubject
   * @returns  ERol | null
   */
  public getUserRol(): ERol | null {
    return this._rolSubject.value;
  }

  /**
   * Obtiene el ID del usuario desde localStorage
   * @returns string con el ID
   */
  public getUserId(): string {
    return localStorage.getItem('user_id')!;
  }

  /**
   * Registra un nuevo usuario
   * @param payload datos del formulario de registro
   * @returns observable con mensaje de éxito
   */
  public register(payload: RegisterPayload): Observable<{ msg: string }> {
    return this._http.post<{ msg: string }>(
      `${this._apiUrl}/register`,
      payload
    );
  }
}
