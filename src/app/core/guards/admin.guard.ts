import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ERol } from '../enum/rol.enum';

/**
 * AdminGuard
 * Este guard protege rutas que solo pueden ser accedidas por usuarios con rol ADMIN.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  /**
   * Método que determina si se puede activar una ruta protegida.
   * Retorna true solo si el usuario está autenticado y tiene rol ADMIN.
   * En caso contrario, redirige al login y termina la sesión.
   */
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this._authService.isLoggedIn(); // Comprueba si hay token en localStorage
    const getUserRol = this._authService.getUserRol(); // Recupera el rol del usuario actual

    // Si el usuario no está autenticado o no tiene rol ADMIN, lo desloguea y redirige al login
    if (!isAuthenticated || getUserRol != ERol.ADMIN) {
      this._authService.logout(); // Limpia token y datos de sesión
      return this._router.createUrlTree(['/login']); // Redirige al login
    }

    // Si es un admin autenticado, permite el acceso a la ruta
    return true;
  }
}
