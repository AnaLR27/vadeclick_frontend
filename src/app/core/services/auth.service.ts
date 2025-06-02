import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginPayload } from '../models/login-payload.model';
import { RegisterPayload } from '../models/register-payload.model';
import { LoginResponse } from '../models/login-response.model';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiUrl = 'http://localhost:4000/api/auth';
  private _isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isLoggedIn()
  );
  public isAuthenticated$ = this._isAuthenticatedSubject.asObservable();

  constructor(private _http: HttpClient, private _router: Router) {}

  public login(payload: LoginPayload): Observable<LoginResponse> {
    this._isAuthenticatedSubject.next(true);
    return this._http.post<LoginResponse>(`${this._apiUrl}/login`, payload);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._isAuthenticatedSubject.next(false);
    this._router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
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
