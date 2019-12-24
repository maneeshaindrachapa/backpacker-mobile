import { TestBed } from '@angular/core/testing';

import { SensorsService } from './sensors.service';

describe('SensorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorsService = TestBed.get(SensorsService);
    expect(service).toBeTruthy();
  });
});
