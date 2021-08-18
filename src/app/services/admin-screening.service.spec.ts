import { TestBed } from '@angular/core/testing';

import { AdminScreeningService } from './admin-screening.service';

describe('AdminScreeningService', () => {
  let service: AdminScreeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminScreeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
