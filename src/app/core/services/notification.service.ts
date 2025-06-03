import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * NotificationService
 * Servicio para mostrar notificaciones tipo snackbar usando Angular Material
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * Mostrar un mensaje en un snackbar
   * @param message Texto principal del mensaje
   * @param action Texto del botón de acción (por defecto: 'Cerrar')
   * @param duration Duración en milisegundos (por defecto: 3000 ms)
   */
  public show(message: string, action: string = 'Cerrar', duration: number = 3000): void {
    this._snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
