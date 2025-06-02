import { TestBed } from '@angular/core/testing';

import { BacteriasService } from './bacterias.service';

describe('BacteriasService', () => {
  let service: BacteriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BacteriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
