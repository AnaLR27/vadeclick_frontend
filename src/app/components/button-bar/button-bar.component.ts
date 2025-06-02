import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  standalone: false,
  templateUrl: './button-bar.component.html',
  styleUrl: './button-bar.component.scss',
})
export class ButtonBarComponent {
  @Input() showDelete: boolean = false;
  @Input() showFavorite: boolean = false;
  @Input() showDetails: boolean = false;
  @Input() showFarmacos: boolean = false;
  @Input() isPActivoOpened: boolean = false;
  @Input() fichaUrl: string = '';
  @Input() isFavorite?: boolean = false;

  @Output() delete = new EventEmitter<void>();
  @Output() toggleFavorite = new EventEmitter<void>();
  @Output() togglePActivo = new EventEmitter<void>();
}
