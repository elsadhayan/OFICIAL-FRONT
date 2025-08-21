import { TestBed } from '@angular/core/testing';

import { AsistenciaServiceService } from './asistencia-service.service';

describe('AsistenciaServiceService', () => {
  let service: AsistenciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
