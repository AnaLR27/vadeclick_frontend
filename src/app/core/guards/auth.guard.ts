import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ERol } from '../enum/rol.enum';

/**
 * AuthGuard
 * Guard que restringe el acceso a rutas protegidas, permitiendo solo a usuarios autenticados
 * con rol de tipo USER.
 */
@Injectable({
  providedIn: 'root', 
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  /**
   * Método que determina si se puede activar una ruta.
   * Retorna true si el usuario está autenticado y tiene rol USER.
   * En caso contrario, redirige al login y retorna una UrlTree.
   */
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this._authService.isLoggedIn(); // Verifica si existe token
    const getUserRol = this._authService.getUserRol(); // Obtiene el rol actual del usuario

    // Si no está autenticado o no es del rol USER, lo redirige al login
    if (!isAuthenticated || getUserRol != ERol.USER) {
      this._authService.logout(); // Limpia sesión
      return this._router.createUrlTree(['/login']); // Redirige
    }

    // Usuario autenticado y con rol USER → acceso permitido
    return true;
  }
}
