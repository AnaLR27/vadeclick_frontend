import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaModalComponent } from './formula-modal.component';
import { FormulaModalModule } from './formula-modal.module'; // 👈 Importás el módulo completo

describe('FormulaModalComponent', () => {
  let component: FormulaModalComponent;
  let fixture: ComponentFixture<FormulaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaModalModule], // 👈 ya incluye ReactiveForms, Material, etc.
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaModalComponent);
    component = fixture.componentInstance;

    component.modo = 'agregar';
    component.formula = {
      id_formula: 1,
      id_usuario: 'abc',
      nombre_formula: 'Test',
      patologia: 'Fiebre',
      descripcion: 'Fórmula de prueba'
    };

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
