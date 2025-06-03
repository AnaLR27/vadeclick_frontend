import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFormulaMagistral } from '../../core/models/formula-magistral.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * FormulaModalComponent
 * Componente modal reutilizable para crear, ver o editar fórmulas magistrales.
 */
@Component({
  selector: 'app-formula-modal',
  standalone: false,
  templateUrl: './formula-modal.component.html',
  styleUrl: './formula-modal.component.scss',
})
export class FormulaModalComponent {
  /**
   * Modo de funcionamiento del modal: 'ver', 'editar' o 'agregar'
   */
  @Input() modo: 'ver' | 'editar' | 'agregar' = 'agregar';

  /**
   * Fórmula recibida en modo edición o visualización
   */
  @Input() formula?: IFormulaMagistral;

  /**
   * Evento que se emite al cerrar el modal
   */
  @Output() cerrado = new EventEmitter<void>();

  /**
   * Evento que se emite cuando se guarda la fórmula (en modo 'agregar' o 'editar')
   */
  @Output() guardado = new EventEmitter<IFormulaMagistral>();

  /**
   * Formulario reactivo para capturar los datos de la fórmula
   */
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  /**
   * Inicializa el formulario y lo desactiva si el modo es 'ver'
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_formula: [this.formula?.nombre_formula || '', Validators.required],
      patologia: [this.formula?.patologia || '', Validators.required],
      descripcion: [this.formula?.descripcion || ''],
    });

    if (this.modo === 'ver') {
      this.form.disable();
    }
  }

  /**
   * Devuelve el título adecuado según el modo del modal
   */
  get titulo(): string {
    switch (this.modo) {
      case 'ver':
        return 'Ver Fórmula Magistral';
      case 'editar':
        return 'Editar Fórmula Magistral';
      default:
        return 'Nueva Fórmula Magistral';
    }
  }

  /**
   * Emite el evento de cierre del modal
   */
  public cerrar(): void {
    this.cerrado.emit();
  }

  /**
   * Emite el evento de guardado si el formulario es válido
   */
  public guardar(): void {
    if (this.form.valid) {
      const nuevaFormula: IFormulaMagistral = {
        id_formula: this.formula?.id_formula ?? 0,
        id_usuario: this.formula?.id_usuario ?? '',
        ...this.form.value,
      };
      this.guardado.emit(nuevaFormula);
    }
  }
}
