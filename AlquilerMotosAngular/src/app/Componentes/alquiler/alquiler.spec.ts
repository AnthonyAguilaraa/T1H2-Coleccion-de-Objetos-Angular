import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alquiler } from './alquiler';

describe('Alquiler', () => {
  let component: Alquiler;
  let fixture: ComponentFixture<Alquiler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alquiler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alquiler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
