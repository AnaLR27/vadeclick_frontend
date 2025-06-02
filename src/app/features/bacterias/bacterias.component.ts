import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { IPrincipioActivo } from '../../core/models/principio-activo.model';
import { BacteriasService } from '../../core/services/bacterias.service';
import { FarmacosService } from '../../core/services/farmacos.service';
import { IFarmaco } from '../../core/models/farmaco.model';
import { forkJoin } from 'rxjs';
import { FavoritosService } from '../../core/services/favoritos.service';

@Component({
  selector: 'app-bacterias',
  standalone: false,
  templateUrl: './bacterias.component.html',
  styleUrl: './bacterias.component.scss',
})
export class BacteriasComponent implements OnInit {
  public form = new FormGroup({
    bacterias: new FormControl<string[]>([]),
  });
  public resultados!: (IPrincipioActivo & {
    isPActivoOpened: boolean;
    farmacosAsociados: (IFarmaco & { esFavorito: boolean })[];
  })[];
  public inputValue: string = '';
  public userId: string = '';

  constructor(
    private _bacteriasService: BacteriasService,
    private _farmacosService: FarmacosService,
    private _favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('user_id');
    if (storedId) this.userId = storedId;
  }

  // Cuando el usuario añade una bacteria nueva
  public addBacteria(bacteria: string): void {
    const current = this.form.get('bacterias')?.value || [];
    if (!current.includes(bacteria)) {
      this.form.get('bacterias')?.setValue([...current, bacteria]);
    }
  }

  // Cuando elimina una bacteria del chip
  public removeBacteria(bacteria: string): void {
    const current = this.form.get('bacterias')?.value || [];
    this.form.get('bacterias')?.setValue(current.filter((b) => b !== bacteria));
  }

  public onSubmit(): void {
    const bacterias = this.form.value.bacterias || [];

    if (!bacterias.length) return;

    // Paso 1: obtenemos favoritos y principios en paralelo
    forkJoin({
      principios: this._bacteriasService.getPrincipiosEficaces(bacterias),
      favoritos: this._favoritosService.getFavoritos(this.userId),
    }).subscribe({
      next: ({ principios, favoritos }) => {
        const idsFavoritos = new Set(favoritos.map((f) => f.id_farmaco));

        this.resultados = principios.map((p) => ({
          ...p,
          isPActivoOpened: false,
          farmacosAsociados: [],
        }));

        // Paso 2: por cada principio, obtenemos sus fármacos
        this.resultados.forEach((res) => {
          this._farmacosService
            .getFarmacosPorIdPrincipio(String(res.id_principio))
            .subscribe({
              next: (farmacos) => {
                res.farmacosAsociados = farmacos.map((f) => ({
                  ...f,
                  esFavorito: idsFavoritos.has(f.id_farmaco),
                }));
              },
              error: (err) =>
                console.error(
                  `Error al cargar fármacos del principio ${res.id_principio}:`,
                  err
                ),
            });
        });
      },
      error: (err) =>
        console.error('Error al cargar principios o favoritos:', err),
    });
  }

  public clearSearch() {
    this.form.get('bacterias')?.setValue([]);
  }

  public togglePActivo(pActivo: IPrincipioActivo) {
    pActivo.isPActivoOpened = !pActivo.isPActivoOpened;
  }
}
