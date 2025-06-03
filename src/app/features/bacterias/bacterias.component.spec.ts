import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacteriasComponent } from './bacterias.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../components/button/button.component';
import { PrincipioActivoListComponent } from '../../components/principio-activo-list/principio-activo-list.component';

describe('BacteriasComponent', () => {
  let component: BacteriasComponent;
  let fixture: ComponentFixture<BacteriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacteriasComponent, ButtonComponent, PrincipioActivoListComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BacteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
