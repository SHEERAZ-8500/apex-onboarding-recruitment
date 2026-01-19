import { TestBed } from '@angular/core/testing';

import { DynamicFieldsSharingService } from './dynamic-fields-sharing.service';

describe('DynamicFieldsSharingService', () => {
  let service: DynamicFieldsSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFieldsSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
