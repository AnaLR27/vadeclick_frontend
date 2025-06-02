import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaModalComponent } from './formula-modal.component';

describe('FormulaModalComponent', () => {
  let component: FormulaModalComponent;
  let fixture: ComponentFixture<FormulaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
