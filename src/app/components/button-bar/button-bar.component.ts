import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  standalone: false,
  templateUrl: './button-bar.component.html',
  styleUrl: './button-bar.component.scss',
})
export class ButtonBarComponent {
  @Input() showDelete = false;
  @Input() showFavorite = false;
  @Input() showDetails = false;
  @Input() fichaUrl: string = '';
  @Input() isFavorite?: boolean = false;

  @Output() delete = new EventEmitter<void>();
  @Output() toggleFavorite = new EventEmitter<void>();
}
