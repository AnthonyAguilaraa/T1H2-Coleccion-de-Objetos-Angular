import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerResumen } from './alquiler-resumen';

describe('AlquilerResumen', () => {
  let component: AlquilerResumen;
  let fixture: ComponentFixture<AlquilerResumen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerResumen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerResumen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
