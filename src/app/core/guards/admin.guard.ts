import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ERol } from '../enum/rol.enum';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this._authService.isLoggedIn(); // Verifica si hay token
    const getUserRol = this._authService.getUserRol();

    if (!isAuthenticated || getUserRol != ERol.ADMIN) {
      this._authService.logout();
      return this._router.createUrlTree(['/login']);
    }
    return true;
  }
}
