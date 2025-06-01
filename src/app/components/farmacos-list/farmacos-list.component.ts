import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFarmaco } from '../../core/models/farmaco.model';

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

  onDelete(id: number) {
    this.eliminar.emit(id);
  }
  addFavorite(farmaco: IFarmaco) {
    this.toggleFavorite.emit(farmaco);
  }
}
