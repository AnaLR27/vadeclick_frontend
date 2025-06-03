import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulasComponent } from './formulas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonBarModule } from '../../components/button-bar/button-bar.module';

describe('FormulasComponent', () => {
  let component: FormulasComponent;
  let fixture: ComponentFixture<FormulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulasComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule,
        ButtonBarModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
