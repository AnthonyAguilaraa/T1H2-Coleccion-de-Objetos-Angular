import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesResume } from './reportes-resume';

describe('ReportesResume', () => {
  let component: ReportesResume;
  let fixture: ComponentFixture<ReportesResume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesResume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesResume);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
