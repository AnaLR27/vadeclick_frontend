import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWapperComponent } from './modal-wrapper.component';

describe('ModalWapperComponent', () => {
  let component: ModalWapperComponent;
  let fixture: ComponentFixture<ModalWapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalWapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
