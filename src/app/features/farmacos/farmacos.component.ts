import { Component } from '@angular/core';
import { FarmacosService } from '../../core/services/farmacos.service';
import { IFarmaco } from '../../core/models/farmaco.model';

@Component({
  selector: 'app-farmacos',
  standalone: false,
  templateUrl: './farmacos.component.html',
  styleUrls: ['./farmacos.component.scss'],
})
export class FarmacosComponent {
  public searchTerm: string = '';
  public farmacos!: IFarmaco[];

  constructor(private _farmacosService: FarmacosService) {}

  onSearch() {
    if (!this.searchTerm.trim()) return;
    console.log('Buscando:', this.searchTerm);
    this._farmacosService
      .searchFarmacosByName(this.searchTerm.trim())
      .subscribe({
        next: (data) => {
          this.farmacos = data;
          console.log('Resultados:', this.farmacos);
        },
        error: (err) => {
          console.error('Error al buscar fármacos:', err);
        },
      });
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
