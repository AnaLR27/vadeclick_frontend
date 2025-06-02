import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPrincipioActivo } from '../../core/models/principio-activo.model';
import { IFarmaco } from '../../core/models/farmaco.model';

@Component({
  selector: 'app-principio-activo-list',
  standalone: false,
  templateUrl: './principio-activo-list.component.html',
  styleUrl: './principio-activo-list.component.scss',
})
export class PrincipioActivoListComponent {
  @Input() resultados!: IPrincipioActivo[];
  @Input() farmacosAsociados!: IFarmaco[];
  @Output() eliminar = new EventEmitter<number>();
  @Output() togglePActivo = new EventEmitter<IPrincipioActivo>();

  public onDelete(id: number) {
    this.eliminar.emit(id);
  }
  public onToggle(pActivo: IPrincipioActivo) {
    this.togglePActivo.emit(pActivo);
  }
}
