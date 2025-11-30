import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Devolucion } from './devolucion';

describe('Devolucion', () => {
  let component: Devolucion;
  let fixture: ComponentFixture<Devolucion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Devolucion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Devolucion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
