import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this._authService.isLoggedIn(); // Verifica si hay token
    console.log('is autenticated:', isAuthenticated);
    
    if (!isAuthenticated) {
      return this._router.createUrlTree(['/login']);
    }
    return true;
  }
}
