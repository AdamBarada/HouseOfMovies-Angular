import { TestBed } from '@angular/core/testing';

import { AdminMoviesService } from './admin-movies.service';

describe('AdminMoviesService', () => {
  let service: AdminMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
