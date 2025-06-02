import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ERol } from '../../core/enum/rol.enum';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public isAuthenticated$!: Observable<boolean>;
  public rol$!: Observable<ERol | null>;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this._authService.isAuthenticated$;
    this.rol$ = this._authService.rol$;
  }

  logout(): void {
    this._authService.logout();
  }
}
