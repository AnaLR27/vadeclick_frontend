import { Component, OnInit } from '@angular/core';
import { IFarmaco } from '../../core/models/farmaco.model';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-farmacos',
  standalone: false,
  templateUrl: './farmacos.component.html',
  styleUrl: './farmacos.component.scss'
})
export class FarmacosComponent implements OnInit {
  farmacos: IFarmaco[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getFarmacos().subscribe({
      next: (res) => {
        this.farmacos = res;
        console.log('Fármacos cargados:', res);
      },
      error: (err) => {
        console.error('Error al obtener fármacos:', err);
      }
    });
  }
}