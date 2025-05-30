import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent  {
 public isAuthenticated$!: Observable<boolean>;

  constructor(private _authService: AuthService) {
    this.isAuthenticated$ = this._authService.isAuthenticated$;
  }

  logout() {
    this._authService.logout();
  }
}
