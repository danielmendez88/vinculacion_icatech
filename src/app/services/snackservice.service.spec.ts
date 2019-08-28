import { TestBed } from '@angular/core/testing';

import { SnackserviceService } from './snackservice.service';

describe('SnackserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackserviceService = TestBed.get(SnackserviceService);
    expect(service).toBeTruthy();
  });
});
