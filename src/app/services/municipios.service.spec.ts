import { TestBed } from '@angular/core/testing';

import { MunicipiosService } from './municipios.service';

describe('MunicipiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MunicipiosService = TestBed.get(MunicipiosService);
    expect(service).toBeTruthy();
  });
});
