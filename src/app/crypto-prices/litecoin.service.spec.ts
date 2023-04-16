import { TestBed } from '@angular/core/testing';

import { LitecoinService } from './litecoin.service';

describe('LitecoinService', () => {
  let service: LitecoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LitecoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
