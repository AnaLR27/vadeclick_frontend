import { Component } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { IPrincipioActivo } from '../../core/models/principio-activo.model';
import { BacteriasService } from '../../core/services/bacterias.service';
import { FarmacosService } from '../../core/services/farmacos.service';

@Component({
  selector: 'app-bacterias',
  standalone: false,
  templateUrl: './bacterias.component.html',
  styleUrl: './bacterias.component.scss',
})
export class BacteriasComponent {
  public form = new FormGroup({
    bacterias: new FormControl<string[]>([]),
  });
  public resultados!: IPrincipioActivo[];
  public inputValue: string = '';

  constructor(
    private _bacteriasService: BacteriasService,
    private _farmacosService: FarmacosService
  ) {}

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
    console.log('Enviar consulta con bacterias:', bacterias);

    if (!bacterias.length) return;

    this._bacteriasService.getPrincipiosEficaces(bacterias).subscribe({
      next: (data) => {
        this.resultados = data.map((res) => ({
          ...res,
          isPActivoOpened: false,
          farmacosAsociados: [],
        }));

        this.resultados.forEach((res) => {
          this._farmacosService
            .getFarmacosPorIdPrincipio(String(res.id_principio))
            .subscribe({
              next: (farmacos) => {
                res.farmacosAsociados = farmacos;
              },
              error: (err) => {
                console.error(
                  `Error al cargar fármacos del principio ${res.id_principio}:`,
                  err
                );
              },
            });
        });
      },
      error: (err) => {
        console.error('Error al buscar principios activos:', err);
      },
    });
  }

  public clearSearch() {
    this.form.get('bacterias')?.setValue([]);
  }

  public togglePActivo(pActivo: IPrincipioActivo) {
    pActivo.isPActivoOpened = !pActivo.isPActivoOpened;
  }
}
