import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * ModalWrapperComponent
 * Componente contenedor reutilizable para modales.
 * Aporta estructura y cabecera con título, además de botón para cerrar.
 */
@Component({
  selector: 'app-modal-wrapper',
  standalone: false,
  templateUrl: './modal-wrapper.component.html',
  styleUrl: './modal-wrapper.component.scss',
})
export class ModalWrapperComponent {
  /**
   * Título del modal que se mostrará en la cabecera
   */
  @Input() titulo: string = '';

  /**
   * Evento emitido al hacer clic en cerrar
   */
  @Output() cerrado = new EventEmitter<void>();

  /**
   * Método para emitir el evento de cerrado
   */
  public cerrar(): void {
    this.cerrado.emit();
  }
}
