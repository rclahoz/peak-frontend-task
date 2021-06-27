import { TestBed } from '@angular/core/testing';

import { RequestInterceptor } from './request-interceptor.service';

describe('RequestInterceptor', () => {
  let service: RequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
