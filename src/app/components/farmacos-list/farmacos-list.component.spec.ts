import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmacosListComponent } from './farmacos-list.component';

describe('FarmacosListComponent', () => {
  let component: FarmacosListComponent;
  let fixture: ComponentFixture<FarmacosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmacosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmacosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
