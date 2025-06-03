import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * ButtonComponent Botón reutilizable
 */
@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /**
   * Recoge el texto del boton
   */
  @Input() text?: string;
  /**
   * Recoge el icono del boton
   */
  @Input() icon?: string;
  /**
   * Recoge el tipo de boton
   */
  @Input() type: 'button' | 'submit' = 'button';
  /**
   * Recoge si el botón estará desactivado
   */
  @Input() disabled: boolean = false;

  /**
   * Crea el emisor de evento
   */
  @Output() clicked = new EventEmitter<void>();

  /**
   * Emite el evento al hacer click en el boton
   */
  onClick() {
    this.clicked.emit();
  }
}
