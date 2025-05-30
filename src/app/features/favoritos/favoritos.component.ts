import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../core/services/favoritos.service';
import { IFarmaco } from '../../core/models/farmaco.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {
  public favoritos: IFarmaco[] = [];

  constructor(
    private _favoritosService: FavoritosService,
    private _notification: NotificationService
  ) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  public cargarFavoritos() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this._favoritosService.getFavoritos(userId).subscribe({
        next: (data) => (this.favoritos = data),
        error: (err) => console.error(err),
      });
    }
  }

  public eliminarFavorito(idFarmaco: number) {
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
