import { Component, OnInit } from '@angular/core';
import { FarmacosService } from '../../core/services/farmacos.service';
import { IFarmaco } from '../../core/models/farmaco.model';
import { forkJoin } from 'rxjs';
import { FavoritosService } from '../../core/services/favoritos.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-farmacos',
  standalone: false,
  templateUrl: './farmacos.component.html',
  styleUrls: ['./farmacos.component.scss'],
})
export class FarmacosComponent implements OnInit {
  public searchTerm: string = '';
  public farmacos!: IFarmaco[];
  public userId!: string;

  constructor(
    private _authService: AuthService,
    private _farmacosService: FarmacosService,
    private _favoritosService: FavoritosService
  ) {}
  ngOnInit(): void {
    if (this._authService.getUserId()) {
      this.userId = this._authService.getUserId();
    }
  }

  onSearch(): void {
    const term = this.searchTerm.trim();
    if (!term) return;

    forkJoin({
      resultados: this._farmacosService.searchFarmacosByName(term),
      favoritos: this._favoritosService.getFavoritos(this.userId),
    }).subscribe({
      next: ({ resultados, favoritos }) => {
        const idsFavoritos = new Set(favoritos.map((f) => f.id_farmaco));
        this.farmacos = resultados.map((farmaco) => ({
          ...farmaco,
          esFavorito: idsFavoritos.has(farmaco.id_farmaco),
        }));
        console.log(this.farmacos);
      },
      error: (err) => {
        console.error('Error al cargar fármacos y favoritos:', err);
      },
    });
  }

  public clearSearch() {
    this.searchTerm = '';
  }

  public toggleFavorite(farmaco: IFarmaco): void {

    if (farmaco.esFavorito) {
      // Si ya es favorito, eliminar
      this._favoritosService
        .eliminarFavorito(Number(this.userId), farmaco.id_farmaco)
        .subscribe({
          next: () => {
            farmaco.esFavorito = false;
          },
          error: (err) => {
            console.error('Error al eliminar favorito:', err);
          },
        });
    } else {
      // Si no es favorito, agregar
      this._favoritosService
        .agregarFavorito(Number(this.userId), farmaco.id_farmaco)
        .subscribe({
          next: () => {
            farmaco.esFavorito = true;
          },
          error: (err) => {
            console.error('Error al añadir favorito:', err);
          },
        });
    }
  }
}
