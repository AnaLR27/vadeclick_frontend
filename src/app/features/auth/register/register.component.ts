import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMsg: string = '';

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _notification: NotificationService
  ) {
    this.registerForm = this._fb.group({
      nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      segundo_apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this._auth.register(this.registerForm.value).subscribe({
        next: () => {
          this._router.navigate(['/login']);
          this._notification.show('Registro exitoso');
        },
        error: (err) => {
          this.errorMsg = err.error?.msg || 'Error al registrar el usuario';
          console.error(err);
        },
      });
    }
  }
}
