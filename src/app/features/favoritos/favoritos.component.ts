import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../core/services/favoritos.service';
import { IFarmaco } from '../../core/models/farmaco.model';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {
 public favoritos: IFarmaco[] = [];

  constructor(private _favoritosService: FavoritosService) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    const userId = Number(localStorage.getItem('id_usuario'));
    this._favoritosService.getFavoritos(userId).subscribe({
      next: (data) => (this.favoritos = data),
      error: (err) => console.error(err),
    });
  }

  eliminarFavorito(idFarmaco: number) {
    const userId = Number(localStorage.getItem('id_usuario'));
    this._favoritosService.eliminarFavorito(userId, idFarmaco).subscribe({
      next: () => this.cargarFavoritos(),
      error: (err) => console.error(err),
    });
  }
}
