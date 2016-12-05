/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlashDetectService } from './flash-detect.service';

describe('Service: FlashDetect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashDetectService]
    });
  });

  it('should ...', inject([FlashDetectService], (service: FlashDetectService) => {
    expect(service).toBeTruthy();
  }));
});
