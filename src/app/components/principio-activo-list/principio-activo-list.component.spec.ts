import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipioActivoListComponent } from './principio-activo-list.component';


describe('PrincipioActivoListComponent', () => {
  let component: PrincipioActivoListComponent;
  let fixture: ComponentFixture<PrincipioActivoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrincipioActivoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipioActivoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
