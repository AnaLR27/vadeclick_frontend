import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPayload } from '../../../core/models/login-payload.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: string | null = null;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _notification: NotificationService
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginPayload = this.loginForm.value;

      this._authService.login(loginData).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this._router.navigate(['/dashboard']);
          this._notification.show('Login exitoso');
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Credenciales inválidas';
        },
      });
    }
  }
}
