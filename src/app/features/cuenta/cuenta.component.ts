import { Component } from '@angular/core';
import { IUser } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-cuenta',
  standalone: false,
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss',
})
export class CuentaComponent {
  public perfilForm!: FormGroup;
  public user!: IUser;
  public userId!: string;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('user_id');
    if (storedId) this.userId = storedId;

    this._authService.getUsuarioPorId(Number(this.userId)).subscribe({
      next: (user: IUser) => {
        this.perfilForm = this._fb.group(
          {
            nombre: [user.nombre, Validators.required],
            primer_apellido: [user.primer_apellido, Validators.required],
            segundo_apellido: [user.segundo_apellido, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
            nueva_contraseña: [''],
            confirmar_contraseña: [''],
          },
          { validators: this._passwordsMatchValidator }
        );
      },
      error: (err) => {
        this._notification.show(
          err.error?.msg || 'Error al cargar datos del perfil'
        );
      },
    });
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) {
      if (this.perfilForm.errors?.['passwordsMismatch']) {
        this._notification.show('Las contraseñas no coinciden');
      }
      return;
    }

    const { nueva_contraseña, confirmar_contraseña, ...restoDatos } =
      this.perfilForm.getRawValue();

    const datosActualizados: any = { ...restoDatos };

    if (nueva_contraseña && nueva_contraseña.trim()) {
      datosActualizados.contraseña = nueva_contraseña;
    }

    this._authService
      .updateUserProfile(Number(this.userId), datosActualizados)
      .subscribe({
        next: () => {
          this._notification.show('Perfil actualizado con éxito');
        },
        error: (err) => {
          this._notification.show(
            err.error?.msg || 'Error al actualizar el perfil'
          );
        },
      });
  }

  private _passwordsMatchValidator(form: FormGroup) {
    const nueva = form.get('nueva_contraseña')?.value;
    const confirmar = form.get('confirmar_contraseña')?.value;

    if (nueva && confirmar && nueva !== confirmar) {
      return { passwordsMismatch: true };
    }
    return null;
  }
}
