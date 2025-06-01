import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacteriasComponent } from './bacterias.component';

describe('BacteriasComponent', () => {
  let component: BacteriasComponent;
  let fixture: ComponentFixture<BacteriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacteriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
