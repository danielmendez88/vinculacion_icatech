import { TestBed } from '@angular/core/testing';

import { TipovisitaService } from './tipovisita.service';

describe('TipovisitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipovisitaService = TestBed.get(TipovisitaService);
    expect(service).toBeTruthy();
  });
});
