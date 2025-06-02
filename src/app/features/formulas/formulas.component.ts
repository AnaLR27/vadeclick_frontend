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
  public formulas!: IFormulaMagistral[];
  public userId!: string;
  public mostrarModal: boolean = false;
  public modalModo: 'ver' | 'editar' | 'agregar' = 'agregar';
  public formulaSeleccionada?: IFormulaMagistral;

  constructor(
    private _authService: AuthService,
    private _formulasService: FormulasService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    const storedId = this._authService.getUserId();
    if (storedId) {
      this.userId = storedId;
      this._cargarFormulas();
    }
  }

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

  onVerMas(formula: IFormulaMagistral): void {
    this.formulaSeleccionada = formula;
    this.modalModo = 'ver';
    this.mostrarModal = true;
    console.log('Ver:', formula);
  }

  public onEditar(formula: IFormulaMagistral): void {
    console.log('Editar:', formula);
    this.formulaSeleccionada = formula;
    this.modalModo = 'editar';
    this.mostrarModal = true;
    this._cargarFormulas(); // recarga la lista tras guardar
  }

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

  public onNuevaFormula(): void {
    console.log('Añadir nueva fórmula');
    this.formulaSeleccionada = undefined;
    this.modalModo = 'agregar';
    this.mostrarModal = true;
    // Lógica futura: abrir formulario o navegación
  }
  public cerrarModal(): void {
    this.mostrarModal = false;
  }

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
