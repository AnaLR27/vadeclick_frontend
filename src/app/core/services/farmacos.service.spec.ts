import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FarmacosService } from './farmacos.service';

describe('FarmacosService', () => {
  let service: FarmacosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [FarmacosService],
    });
    service = TestBed.inject(FarmacosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
