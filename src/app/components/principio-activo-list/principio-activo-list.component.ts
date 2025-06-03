import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPrincipioActivo } from '../../core/models/principio-activo.model';
import { IFarmaco } from '../../core/models/farmaco.model';

/**
 * PrincipioActivoListComponent
 * Componente que muestra una lista de principios activos junto con sus fármacos asociados.
 * Permite eliminar un principio activo o desplegar información adicional.
 */
@Component({
  selector: 'app-principio-activo-list',
  standalone: false,
  templateUrl: './principio-activo-list.component.html',
  styleUrl: './principio-activo-list.component.scss',
})
export class PrincipioActivoListComponent {
  /**
   * Lista de principios activos a mostrar
   */
  @Input() resultados!: IPrincipioActivo[];

  /**
   * Lista de fármacos asociados al principio activo
   */
  @Input() farmacosAsociados!: IFarmaco[];

  /**
   * Evento emitido al solicitar eliminar un principio activo
   */
  @Output() eliminar = new EventEmitter<number>();

  /**
   * Evento emitido al expandir o contraer un principio activo para ver más detalles
   */
  @Output() togglePActivo = new EventEmitter<IPrincipioActivo>();

  /**
   * Método que emite el evento de eliminar con el ID del principio activo
   * @param id ID del principio activo a eliminar
   */
  public onDelete(id: number) {
    this.eliminar.emit(id);
  }

  /**
   * Método que emite el evento de mostrar/ocultar detalles del principio activo
   * @param pActivo Principio activo que se desea expandir o contraer
   */
  public onToggle(pActivo: IPrincipioActivo) {
    this.togglePActivo.emit(pActivo);
  }
}
