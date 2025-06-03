import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmacosComponent } from './farmacos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ necesario
import { ButtonComponent } from '../../components/button/button.component';
import { FarmacosListComponent } from '../../components/farmacos-list/farmacos-list.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('FarmacosComponent', () => {
  let component: FarmacosComponent;
  let fixture: ComponentFixture<FarmacosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmacosComponent, ButtonComponent, FarmacosListComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmacosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
