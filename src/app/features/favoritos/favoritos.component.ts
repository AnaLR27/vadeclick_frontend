import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../core/services/favoritos.service';
import { IFarmaco } from '../../core/models/farmaco.model';
import { NotificationService } from '../../core/services/notification.service';

/**
 * FavoritosComponent
 * Componente encargado de mostrar y gestionar la lista de fármacos favoritos del usuario.
 */
@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {
  /**
   * Lista de fármacos marcados como favoritos
   */
  public favoritos: IFarmaco[] = [];

  constructor(
    private _favoritosService: FavoritosService,
    private _notification: NotificationService
  ) {}

  /**
   * Al inicializar el componente, se cargan los favoritos del usuario
   */
  ngOnInit() {
    this.cargarFavoritos();
  }

  /**
   * Llama al servicio para obtener los fármacos favoritos del usuario actual
   */
  public cargarFavoritos(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this._favoritosService.getFavoritos(userId).subscribe({
        next: (data) => (this.favoritos = data),
        error: (err) => console.error(err),
      });
    }
  }

  /**
   * Elimina un fármaco de la lista de favoritos
   * @param idFarmaco ID del fármaco a eliminar
   */
  public deleteFavorite(idFarmaco: number) {
    const userId = Number(localStorage.getItem('user_id'));
    this._favoritosService.eliminarFavorito(userId, idFarmaco).subscribe({
      next: () => {
        this.cargarFavoritos();
        this._notification.show('Favorito eliminado');
      },
      error: (err) => {
        console.error(err);
        this._notification.show('Se ha producido un error');
      },
    });
  }
}
