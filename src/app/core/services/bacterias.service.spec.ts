import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BacteriasService } from './bacterias.service';

describe('BacteriasService', () => {
  let service: BacteriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [BacteriasService],
    });
    service = TestBed.inject(BacteriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
