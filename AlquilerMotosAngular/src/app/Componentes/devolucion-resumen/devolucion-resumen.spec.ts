import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionResumen } from './devolucion-resumen';

describe('DevolucionResumen', () => {
  let component: DevolucionResumen;
  let fixture: ComponentFixture<DevolucionResumen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucionResumen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionResumen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
