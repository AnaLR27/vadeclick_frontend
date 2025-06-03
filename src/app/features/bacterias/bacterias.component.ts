import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPrincipioActivo } from '../../core/models/principio-activo.model';
import { BacteriasService } from '../../core/services/bacterias.service';
import { FarmacosService } from '../../core/services/farmacos.service';
import { IFarmaco } from '../../core/models/farmaco.model';
import { forkJoin } from 'rxjs';
import { FavoritosService } from '../../core/services/favoritos.service';

/**
 * BacteriasComponent
 * Permite buscar principios activos eficaces contra bacterias específicas y ver fármacos asociados
 */
@Component({
  selector: 'app-bacterias',
  standalone: false,
  templateUrl: './bacterias.component.html',
  styleUrl: './bacterias.component.scss',
})
export class BacteriasComponent implements OnInit {
  /**
   * Formulario reactivo con bacterias seleccionadas y resistencias
   */
  public form = new FormGroup({
    bacterias: new FormControl<string[]>([]),
    resistencias: new FormControl<string[]>([]),
  });

  /**
   * Resultados obtenidos de la búsqueda
   */
  public resultados!: (IPrincipioActivo & {
    isPActivoOpened: boolean;
    farmacosAsociados: (IFarmaco & { esFavorito: boolean })[];
  })[];

  /**
   * Texto del input (búsqueda)
   */
  public inputValue: string = '';

  /**
   * ID del usuario actual (obtenido de localStorage)
   */
  public userId: string = '';

  constructor(
    private _bacteriasService: BacteriasService,
    private _farmacosService: FarmacosService,
    private _favoritosService: FavoritosService
  ) {}

  /**
   * Al iniciar el componente, se obtiene el ID del usuario desde localStorage
   */
  ngOnInit(): void {
    const storedId = localStorage.getItem('user_id');
    if (storedId) this.userId = storedId;
  }

  /**
   * Añadir bacteria al formulario si no está ya incluida
   * @param bacteria string
   */
  public addBacteria(bacteria: string): void {
    const current = this.form.get('bacterias')?.value || [];
    if (!current.includes(bacteria)) {
      this.form.get('bacterias')?.setValue([...current, bacteria]);
    }
  }

  /**
   * Eliminar bacteria del formulario
   * @param bacteria string
   */
  public removeBacteria(bacteria: string): void {
    const current = this.form.get('bacterias')?.value || [];
    this.form.get('bacterias')?.setValue(current.filter((b) => b !== bacteria));
  }

  /**
   * Ejecuta la búsqueda de principios activos y fármacos asociados
   */
  public onSubmit(): void {
    const bacterias = this.form.value.bacterias || [];
    const resistencias = this.form.value.resistencias || [];

    if (!bacterias.length) return;

    forkJoin({
      principios: this._bacteriasService.getPrincipiosEficaces(bacterias, resistencias),
      favoritos: this._favoritosService.getFavoritos(this.userId),
    }).subscribe({
      next: ({ principios, favoritos }) => {
        const idsFavoritos = new Set(favoritos.map((f) => f.id_farmaco));

        // Inicializar resultados
        this.resultados = principios.map((p) => ({
          ...p,
          isPActivoOpened: false,
          farmacosAsociados: [],
        }));

        // Para cada principio activo, cargar sus fármacos asociados
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

  /**
   * Vacía el campo de bacterias
   */
  public clearBacterias() {
    this.form.get('bacterias')?.setValue([]);
  }

  /**
   * Vacía el campo de resistencias
   */
  public clearResistencias() {
    this.form.get('resistencias')?.setValue([]);
  }

  /**
   * Alterna la visualización de los fármacos asociados a un principio activo
   * @param pActivo principio activo
   */
  public togglePActivo(pActivo: IPrincipioActivo) {
    pActivo.isPActivoOpened = !pActivo.isPActivoOpened;
  }

  /**
   * Añadir una resistencia si aún no está en el formulario
   * @param nombre nombre de la resistencia
   */
  public addResistencia(nombre: string): void {
    const current = this.form.get('resistencias')?.value || [];
    if (!current.includes(nombre)) {
      this.form.get('resistencias')?.setValue([...current, nombre]);
    }
  }

  /**
   * Eliminar resistencia del formulario
   * @param nombre resistencia a eliminar
   */
  public removeResistencia(nombre: string): void {
    const current = this.form.get('resistencias')?.value || [];
    this.form.get('resistencias')?.setValue(current.filter((r) => r !== nombre));
  }
}
