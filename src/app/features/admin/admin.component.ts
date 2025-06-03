import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/user.model';
import { NotificationService } from '../../core/services/notification.service';

/**
 * AdminComponent
 * Componente encargado de mostrar la lista de usuarios y permitir su eliminación
 */
@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  // Lista de usuarios cargados desde la base de datos
  public usuarios: IUser[] = [];

  constructor(
    private _userService: UserService, // Servicio para gestión de usuarios
    private _notification: NotificationService // Servicio para mostrar notificaciones
  ) {}

  /**
   * Hook de inicialización
   * Carga los usuarios al montar el componente
   */
  ngOnInit(): void {
    this._cargarUsuarios();
  }

  /**
   * Obtiene todos los usuarios desde el servicio
   * y los asigna a la propiedad `usuarios`
   */
  private _cargarUsuarios(): void {
    this._userService.getAllUsers().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) =>
        this._notification.show(err.error?.msg || 'Error al cargar usuarios'),
    });
  }

  /**
   * Elimina un usuario tras confirmación y actualiza la lista local
   * @param usuario usuario a eliminar
   */
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
