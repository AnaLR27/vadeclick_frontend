import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NavbarModule } from './navbar.module';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { ERol } from '../../core/enum/rol.enum';
import { RouterTestingModule } from '@angular/router/testing';

// Mock del AuthService
class MockAuthService {
  isAuthenticated$ = of(true);
  rol$ = of(ERol.ADMIN);
  logout = jasmine.createSpy('logout');
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarModule, RouterTestingModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout on AuthService when logout() is triggered', () => {
    component.logout();
    expect((component as any)._authService.logout).toHaveBeenCalled();
  });
});
