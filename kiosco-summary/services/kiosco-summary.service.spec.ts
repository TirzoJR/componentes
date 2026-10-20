import { TestBed } from '@angular/core/testing';

import { KioscoSummaryService } from '../kiosco-summary/kiosco-summary.service';

describe('KioscoSummaryService', () => {
  let service: KioscoSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KioscoSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
