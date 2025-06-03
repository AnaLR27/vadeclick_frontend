import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFarmaco } from '../../core/models/farmaco.model';
import { FavoritosService } from '../../core/services/favoritos.service';

/**
 * FarmacosListComponent
 * Componente que muestra una lista de fármacos con opciones para eliminar y marcar como favorito.
 */
@Component({
  selector: 'app-farmacos-list',
  standalone: false,
  templateUrl: './farmacos-list.component.html',
  styleUrl: './farmacos-list.component.scss',
})
export class FarmacosListComponent {
  /**
   * Lista de fármacos a mostrar
   */
  @Input() farmacos: IFarmaco[] = [];

  /**
   * Evento emitido al eliminar un fármaco
   */
  @Output() eliminar = new EventEmitter<number>();

  /**
   * Evento emitido al marcar/desmarcar un fármaco como favorito
   */
  @Output() toggleFavorite = new EventEmitter<IFarmaco>();

  /**
   * ID del usuario autenticado (usado para acciones de favoritos)
   */
  public userId: string = '';

  constructor(private _favoritosService: FavoritosService) {}

  /**
   * Inicializa el componente recuperando el ID del usuario del localStorage
   */
  ngOnInit(): void {
    const storedId = localStorage.getItem('user_id');
    if (storedId) this.userId = storedId;
  }

  /**
   * Método que emite el evento de eliminar un fármaco por ID
   * @param id ID del fármaco a eliminar
   */
  onDelete(id: number) {
    this.eliminar.emit(id);
  }

  /**
   * Añade o elimina el fármaco de los favoritos según su estado actual
   * @param farmaco Fármaco sobre el cual aplicar la acción de favorito
   */
  addFavorite(farmaco: IFarmaco) {
    if (farmaco.esFavorito) {
      // Si ya es favorito, eliminarlo del listado
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
      // Si no es favorito, agregarlo al listado
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
