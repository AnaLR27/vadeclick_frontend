import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  /**
   * Formulario reactivo para capturar los datos del nuevo usuario
   */
  registerForm: FormGroup;

  /**
   * Mensaje de error (no se está usando activamente en la plantilla)
   */
  errorMsg: string = '';

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _notification: NotificationService
  ) {
    // Inicializa el formulario con validaciones requeridas
    this.registerForm = this._fb.group({
      nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      segundo_apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
    });
  }

  /**
   * Envía el formulario si es válido
   * - Llama al servicio de autenticación para registrar al usuario
   * - Redirige al login si tiene éxito
   * - Muestra un mensaje de error si falla
   */
  public onSubmit(): void {
    if (this.registerForm.valid) {
      this._auth.register(this.registerForm.value).subscribe({
        next: () => {
          this._router.navigate(['/login']);
          this._notification.show('Registro exitoso');
        },
        error: (err) => {
          this._notification.show(
            err.error?.msg || 'Error al registrar el usuario'
          );
        },
      });
    }
  }
}
