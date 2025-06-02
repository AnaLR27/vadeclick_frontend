import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFormulaMagistral } from '../../core/models/formula-magistral.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formula-modal',
  standalone: false,
  templateUrl: './formula-modal.component.html',
  styleUrl: './formula-modal.component.scss',
})
export class FormulaModalComponent {
  @Input() modo: 'ver' | 'editar' | 'agregar' = 'agregar';
  @Input() formula?: IFormulaMagistral;

  @Output() cerrado = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<IFormulaMagistral>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_formula: [this.formula?.nombre_formula|| '', Validators.required],
      patologia: [this.formula?.patologia || '', Validators.required],
      descripcion: [this.formula?.descripcion || ''],
    });

    if (this.modo === 'ver') {
      this.form.disable();
    }
  }

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

  cerrar(): void {
    this.cerrado.emit();
  }

  guardar(): void {
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
