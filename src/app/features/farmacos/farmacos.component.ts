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
  /**
   * Término de búsqueda ingresado por el usuario
   */
  public searchTerm: string = '';

  /**
   * Lista de fármacos resultantes de la búsqueda
   */
  public farmacos!: IFarmaco[];

  /**
   * ID del usuario autenticado
   */
  public userId!: string;

  constructor(
    private _authService: AuthService,
    private _farmacosService: FarmacosService,
    private _favoritosService: FavoritosService
  ) {}

  /**
   * Al inicializar el componente, obtiene el ID del usuario desde el AuthService
   */
  ngOnInit(): void {
    if (this._authService.getUserId()) {
      this.userId = this._authService.getUserId();
    }
  }

  /**
   * Ejecuta una búsqueda de fármacos por nombre (comercial o principio activo)
   * También obtiene los favoritos del usuario para marcarlos visualmente
   */
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

  /**
   * Limpia el campo de búsqueda
   */
  public clearSearch(): void {
    this.searchTerm = '';
  }
}
