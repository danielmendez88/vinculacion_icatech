import { TestBed } from '@angular/core/testing';

import { NavserviceService } from './navservice.service';

describe('NavserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavserviceService = TestBed.get(NavserviceService);
    expect(service).toBeTruthy();
  });
});
