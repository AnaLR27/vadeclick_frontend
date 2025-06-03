import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormulasService } from './formulas.service';

describe('FormulasService', () => {
  let service: FormulasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(FormulasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
