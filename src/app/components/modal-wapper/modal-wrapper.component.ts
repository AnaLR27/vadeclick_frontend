import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  standalone: false,
  templateUrl: './modal-wrapper.component.html',
  styleUrl: './modal-wrapper.component.scss',
})
export class ModalWrapperComponent {
  @Input() titulo: string = '';
  @Output() cerrado = new EventEmitter<void>();

  cerrar(): void {
    this.cerrado.emit();
  }
}
