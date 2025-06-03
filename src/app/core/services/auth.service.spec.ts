import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LoginPayload } from '../models/login-payload.model';
import { ERol } from '../enum/rol.enum';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../../../enviroments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: mockRouter }],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // asegura que no quedan requests pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true and role on successful login', () => {
    const mockPayload: LoginPayload = {
      email: 'test@example.com',
      contraseña: '123456',
    };

    const mockResponse: LoginResponse = {
      token: 'mockToken',
      user_id: '1',
      rol: ERol.ADMIN,
    };

    let authValue: boolean | undefined;
    let rolValue: ERol | null | undefined;

    service.isAuthenticated$.subscribe((val) => (authValue = val));
    service.rol$.subscribe((val) => (rolValue = val));

    service.login(mockPayload).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const expectedUrl = `${environment.apiUrl}/auth/login`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(authValue).toBeTrue();
    expect(rolValue).toBe(ERol.ADMIN);
  });

  it('should clear localStorage and navigate on logout', () => {
    spyOn(localStorage, 'clear');
    service.logout();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
