import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosComponent } from './favoritos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonBarModule } from '../../components/button-bar/button-bar.module';

describe('FavoritosComponent', () => {
  let component: FavoritosComponent;
  let fixture: ComponentFixture<FavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritosComponent],
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

    fixture = TestBed.createComponent(FavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
