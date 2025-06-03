import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPayload } from '../../../core/models/login-payload.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ERol } from '../../../core/enum/rol.enum';

/**
 * LoginComponent
 * Componente responsable de la autenticación del usuario a través de un formulario.
 */
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * Formulario reactivo de login con validaciones de email y contraseña
   */
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _notification: NotificationService
  ) {
    // Inicializa el formulario con campos y validadores
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
    });
  }

  /**
   * Maneja el envío del formulario de login
   * - Verifica validez del formulario
   * - Llama al servicio de autenticación
   * - Guarda datos del usuario en localStorage
   * - Redirige según el rol (ADMIN o USER)
   * - Muestra notificaciones de éxito o error
   */
  public onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: LoginPayload = this.loginForm.value;

      this._authService.login(loginData).subscribe({
        next: (res) => {
          // Almacena datos esenciales en localStorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('user_id', res.user_id);
          localStorage.setItem('rol', res.rol);

          // Redirige según el rol del usuario
          const rol = localStorage.getItem('rol');
          if (rol === ERol.ADMIN) {
            this._router.navigate(['/admin']);
          } else {
            this._router.navigate(['/dashboard/info']);
          }

          this._notification.show('Login exitoso');
        },
        error: (err) => {
          console.error(err);
          this._notification.show(err.error?.msg || 'Credenciales inválidas');
        },
      });
    }
  }
}
