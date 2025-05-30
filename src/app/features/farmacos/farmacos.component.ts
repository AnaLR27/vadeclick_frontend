import { Component } from '@angular/core';

@Component({
  selector: 'app-farmacos',
  standalone: false,
  templateUrl: './farmacos.component.html',
  styleUrls: ['./farmacos.component.scss'],
})
export class FarmacosComponent {
  searchTerm: string = '';

  onSearch() {
    console.log('Buscando:', this.searchTerm);
    // Lógica para buscar por nombre o principio activo
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
