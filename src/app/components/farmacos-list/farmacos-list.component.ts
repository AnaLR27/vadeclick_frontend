import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFarmaco } from '../../core/models/farmaco.model';
import { AuthService } from '../../core/services/auth.service';
import { FarmacosService } from '../../core/services/farmacos.service';
import { FavoritosService } from '../../core/services/favoritos.service';

@Component({
  selector: 'app-farmacos-list',
  standalone: false,
  templateUrl: './farmacos-list.component.html',
  styleUrl: './farmacos-list.component.scss',
})
export class FarmacosListComponent {
  @Input() farmacos: IFarmaco[] = [];
  @Output() eliminar = new EventEmitter<number>();
  @Output() toggleFavorite = new EventEmitter<IFarmaco>();
  public userId: string = '';

  constructor(private _favoritosService: FavoritosService) {}

  onDelete(id: number) {
    this.eliminar.emit(id);
  }
  ngOnInit(): void {
    const storedId = localStorage.getItem('user_id');
    if (storedId) this.userId = storedId;
  }

  addFavorite(farmaco: IFarmaco) {
    if (farmaco.esFavorito) {
      // Si ya es favorito, eliminar
      this._favoritosService
        .eliminarFavorito(Number(this.userId), farmaco.id_farmaco)
        .subscribe({
          next: () => {
            farmaco.esFavorito = false;
          },
          error: (err) => {
            console.error('Error al eliminar favorito:', err);
          },
        });
    } else {
      // Si no es favorito, agregar
      this._favoritosService
        .agregarFavorito(Number(this.userId), farmaco.id_farmaco)
        .subscribe({
          next: () => {
            farmaco.esFavorito = true;
          },
          error: (err) => {
            console.error('Error al añadir favorito:', err);
          },
        });
    }
  }
}
