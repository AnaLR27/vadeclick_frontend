import { Component } from '@angular/core';
import { IUser } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-cuenta',
  standalone: false,
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss',
})
export class CuentaComponent {
  /**
   * Formulario reactivo para editar los datos del perfil
   */
  public perfilForm!: FormGroup;

  /**
   * Datos del usuario actual
   */
  public user!: IUser;

  /**
   * ID del usuario obtenido del localStorage
   */
  public userId!: string;

  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _notification: NotificationService
  ) {}

  /**
   * Carga inicial del componente
   * - Obtiene el ID del usuario desde el localStorage
   * - Carga los datos del perfil y construye el formulario
   */
  ngOnInit(): void {
    const storedId = localStorage.getItem('user_id');
    if (storedId) this.userId = storedId;

    this._userService.getUsuarioPorId(Number(this.userId)).subscribe({
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

  /**
   * Se ejecuta al enviar el formulario
   * - Verifica la validez del formulario
   * - Muestra error si las contraseñas no coinciden
   * - Actualiza los datos del usuario en el servidor
   */
  public onSubmit(): void {
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

    this._userService
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

  /**
   * Validador personalizado para comprobar si las contraseñas coinciden
   * @param form FormGroup del perfil
   * @returns null si coinciden, o error `passwordsMismatch`
   */
  private _passwordsMatchValidator(form: FormGroup) {
    const nueva = form.get('nueva_contraseña')?.value;
    const confirmar = form.get('confirmar_contraseña')?.value;

    if (nueva && confirmar && nueva !== confirmar) {
      return { passwordsMismatch: true };
    }
    return null;
  }
}
