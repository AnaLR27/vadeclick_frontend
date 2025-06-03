import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * ButtonBarComponent Botonera reutilizable
 */
@Component({
  selector: 'app-button-bar',
  standalone: false,
  templateUrl: './button-bar.component.html',
  styleUrl: './button-bar.component.scss',
})
export class ButtonBarComponent {
  /**
   * Recoge el booleano que muestra el boton de eliminar
   */
  @Input() showDelete: boolean = false;
  /**
   * Recoge el booleano que muestra el boton de favorito
   */
  @Input() showFavorite: boolean = false;
  /**
   * Recoge el booleano que muestra el boton de detalles
   */
  @Input() showDetails: boolean = false;
  /**
   * Recoge el booleano que muestra el boton de mostrar
   */
  @Input() showFarmacos: boolean = false;
  /**
   * Controla si el principio activo está desplegado
   */
  @Input() isPActivoOpened: boolean = false;
  /**
   * Recibe la url de la ficha técnica
   */
  @Input() fichaUrl: string = '';
  /**
   * Recibe si está marcado como favorito
   */
  @Input() isFavorite?: boolean = false;

  /**
   * Emite evento de eliminar
   */
  @Output() delete = new EventEmitter<void>();
  /**
   * Emite evento de cambio en el favorito
   */
  @Output() toggleFavorite = new EventEmitter<void>();
  /**
   * Emite evento de cambio en el botón desplegar principio activo
   */
  @Output() togglePActivo = new EventEmitter<void>();
}
