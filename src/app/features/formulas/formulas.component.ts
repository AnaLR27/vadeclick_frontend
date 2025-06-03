import { Component, OnInit } from '@angular/core';
import { IFormulaMagistral } from '../../core/models/formula-magistral.model';
import { FormulasService } from '../../core/services/formulas.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-formulas',
  standalone: false,
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.scss'],
})
export class FormulasComponent implements OnInit {
  /** Lista de fórmulas del usuario */
  public formulas!: IFormulaMagistral[];

  /** ID del usuario autenticado */
  public userId!: string;

  /** Control de visibilidad del modal */
  public mostrarModal: boolean = false;

  /** Modo actual del modal: ver, editar o agregar */
  public modalModo: 'ver' | 'editar' | 'agregar' = 'agregar';

  /** Fórmula seleccionada para ver, editar o eliminar */
  public formulaSeleccionada?: IFormulaMagistral;

  constructor(
    private _authService: AuthService,
    private _formulasService: FormulasService,
    private _notification: NotificationService
  ) {}

  /**
   * Al inicializar el componente, obtiene el ID del usuario
   * y carga sus fórmulas desde el backend.
   */
  ngOnInit(): void {
    const storedId = this._authService.getUserId();
    if (storedId) {
      this.userId = storedId;
      this._cargarFormulas();
    }
  }

  /**
   * Solicita al servicio las fórmulas asociadas al usuario actual.
   */
  private _cargarFormulas(): void {
    this._formulasService.getFormulasByUserId(this.userId).subscribe({
      next: (formulas) => {
        this.formulas = formulas;
      },
      error: (err) => {
        this._notification.show(err.error?.msg || 'Error al cargar fórmulas');
      },
    });
  }

  /**
   * Muestra el modal en modo "ver" para la fórmula seleccionada.
   * @param formula Fórmula a mostrar
   */
  onVerMas(formula: IFormulaMagistral): void {
    this.formulaSeleccionada = formula;
    this.modalModo = 'ver';
    this.mostrarModal = true;
  }

  /**
   * Muestra el modal en modo "editar" para la fórmula seleccionada.
   * @param formula Fórmula a editar
   */
  public onEditar(formula: IFormulaMagistral): void {
    this.formulaSeleccionada = formula;
    this.modalModo = 'editar';
    this.mostrarModal = true;
    this._cargarFormulas();
  }

  /**
   * Elimina una fórmula después de confirmación del usuario.
   * @param formula Fórmula a eliminar
   */
  public onEliminar(formula: IFormulaMagistral): void {
    if (!confirm(`¿Eliminar fórmula "${formula.nombre_formula}"?`)) return;

    this._formulasService.deleteFormula(formula.id_formula).subscribe({
      next: () => {
        this.formulas = this.formulas.filter(
          (f) => f.id_formula !== formula.id_formula
        );
        this._notification.show('Fórmula eliminada correctamente');
      },
      error: (err) => {
        this._notification.show(err.error?.msg || 'Error al eliminar fórmula');
      },
    });
  }

  /**
   * Abre el modal para agregar una nueva fórmula.
   */
  public onNuevaFormula(): void {
    this.formulaSeleccionada = undefined;
    this.modalModo = 'agregar';
    this.mostrarModal = true;
  }

  /**
   * Cierra el modal sin guardar cambios.
   */
  public cerrarModal(): void {
    this.mostrarModal = false;
  }

  /**
   * Guarda una nueva fórmula o actualiza una existente, según el modo del modal.
   * @param formula Datos de la fórmula a guardar
   */
  public guardarFormula(formula: IFormulaMagistral): void {
    if (this.modalModo === 'agregar') {
      const nuevaFormula = { ...formula, id_usuario: this.userId };

      this._formulasService.addFormula(nuevaFormula).subscribe({
        next: () => {
          this._notification.show('Fórmula creada correctamente');
          this.mostrarModal = false;
          this._cargarFormulas();
        },
        error: (err) => {
          this._notification.show(err.error?.msg || 'Error al crear fórmula');
        },
      });
    } else if (this.modalModo === 'editar') {
      this._formulasService
        .updateFormula(Number(formula.id_formula), formula)
        .subscribe({
          next: () => {
            this._notification.show('Fórmula actualizada correctamente');
            this.mostrarModal = false;
            this._cargarFormulas();
          },
          error: (err) => {
            this._notification.show(
              err.error?.msg || 'Error al actualizar fórmula'
            );
          },
        });
    }
  }
}
