import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginPayload } from '../models/login-payload.model';
import { RegisterPayload } from '../models/register-payload.model';
import { LoginResponse } from '../models/login-response.model';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';
import { ERol } from '../enum/rol.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiUrl = 'http://localhost:4000/api/auth';
  private _isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isLoggedIn()
  );
  public isAuthenticated$ = this._isAuthenticatedSubject.asObservable();
  private _rolSubject = new BehaviorSubject<ERol | null>(this._getStoredRol());
  public rol$ = this._rolSubject.asObservable();

  constructor(private _http: HttpClient, private _router: Router) {}

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
  public logout(): void {
    localStorage.clear();
    this._isAuthenticatedSubject.next(false);
    this._rolSubject.next(null);

    this._router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private _getStoredRol(): ERol | null {
    const rol = localStorage.getItem('rol');
    return rol && Object.values(ERol).includes(rol as ERol)
      ? (rol as ERol)
      : null;
  }

  public getUserRol(): ERol | null {
    return this._rolSubject.value;
  }

  public getUserId(): string {
    return localStorage.getItem('user_id')!;
  }

  public register(payload: RegisterPayload): Observable<{ msg: string }> {
    return this._http.post<{ msg: string }>(
      `${this._apiUrl}/register`,
      payload
    );
  }

  public getUsuarioPorId(id_usuario: number): Observable<IUser> {
    return this._http.get<IUser>(`${this._apiUrl}/${id_usuario}`);
  }

  public updateUserProfile(
    id_usuario: number,
    data: Partial<IUser>
  ): Observable<{ msg: string }> {
    return this._http.put<{ msg: string }>(
      `${this._apiUrl}/${id_usuario}`,
      data
    );
  }
}
