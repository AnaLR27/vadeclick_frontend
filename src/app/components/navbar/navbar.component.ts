import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ERol } from '../../core/enum/rol.enum';

/**
 * NavbarComponent
 * Componente encargado de mostrar la barra de navegación superior.
 * Su contenido se adapta en función de si el usuario está autenticado y su rol.
 */
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  /**
   * Observable que indica si el usuario está autenticado
   */
  public isAuthenticated$!: Observable<boolean>;

  /**
   * Observable que expone el rol actual del usuario (USER o ADMIN)
   */
  public rol$!: Observable<ERol | null>;

  constructor(private _authService: AuthService) {}

  /**
   * Inicializa los observables de autenticación y rol al cargar el componente
   */
  ngOnInit(): void {
    this.isAuthenticated$ = this._authService.isAuthenticated$;
    this.rol$ = this._authService.rol$;
  }

  /**
   * Cierra sesión y limpia los datos del usuario
   */
  logout(): void {
    this._authService.logout();
  }
}
