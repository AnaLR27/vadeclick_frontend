import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/user.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public usuarios: IUser[] = [];

  constructor(
    private _userService: UserService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this._cargarUsuarios();
  }

  private _cargarUsuarios(): void {
    this._userService.getAllUsers().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) =>
        this._notification.show(err.error?.msg || 'Error al cargar usuarios'),
    });
  }

  eliminarUsuario(usuario: IUser): void {
    if (!confirm(`¿Eliminar al usuario "${usuario.nombre}"?`)) return;

    this._userService.deleteUserById(usuario.id_usuario).subscribe({
      next: () => {
        this._notification.show('Usuario eliminado correctamente');
        this.usuarios = this.usuarios.filter(
          (u) => u.id_usuario !== usuario.id_usuario
        );
      },
      error: (err) =>
        this._notification.show(
          err.error?.msg || 'Error al eliminar usuario'
        ),
    });
  }
}
