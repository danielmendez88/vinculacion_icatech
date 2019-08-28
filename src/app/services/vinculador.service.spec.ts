import { TestBed } from '@angular/core/testing';

import { VinculadorService } from './vinculador.service';

describe('VinculadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VinculadorService = TestBed.get(VinculadorService);
    expect(service).toBeTruthy();
  });
});
