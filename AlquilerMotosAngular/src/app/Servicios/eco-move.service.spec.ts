import { TestBed } from '@angular/core/testing';

import { EcoMoveService } from './eco-move.service';

describe('EcoMoveService', () => {
  let service: EcoMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcoMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
