import { TestBed } from '@angular/core/testing';

import { PosItemService } from './pos-item.service';

describe('PosItemService', () => {
  let service: PosItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
